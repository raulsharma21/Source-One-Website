#!/usr/bin/env python3
"""
Standalone blog generation script for GitHub Actions.
Runs entirely in Actions (no Vercel timeout). Requires:
  - OPENAI_API_KEY (GitHub secret)
  - GITHUB_TOKEN (provided by Actions)
  - GITHUB_REPOSITORY (e.g. owner/repo, set by Actions)
"""

import json
import os
import sys
import re
import uuid
import requests
import base64
from datetime import datetime

GITHUB_API_BASE = "https://api.github.com"
BLOGS_FILE_PATH = "storage/blogs.json"
METADATA_FILE_PATH = "storage/blog_metadata.json"

TOPIC_CATEGORIES = [
    "recent U.S. tariff changes and their business impact",
    "port congestion, shipping delays, or logistics updates",
    "USMCA and trade agreement developments",
    "sustainable and ethical sourcing trends",
    "customs compliance and regulatory changes",
    "currency fluctuations and import costs",
    "industry-specific sourcing (electronics, apparel, or automotive)",
    "nearshoring vs. offshoring analysis",
    "supply chain technology (AI, blockchain, visibility tools)",
]


def load_blogs_from_github(repo: str) -> list:
    """Load blogs from GitHub (no token needed for public repo)."""
    url = f"{GITHUB_API_BASE}/repos/{repo}/contents/{BLOGS_FILE_PATH}"
    response = requests.get(url, timeout=30)
    if response.status_code == 404:
        return []
    if response.status_code != 200:
        print(f"GitHub API error: {response.status_code} - {response.text}")
        sys.exit(1)
    content = base64.b64decode(response.json()["content"]).decode("utf-8")
    return json.loads(content)


def update_github_file(file_path: str, content: str, commit_message: str, token: str, repo: str, branch: str) -> bool:
    """Create or update a file in GitHub."""
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json",
    }
    url = f"{GITHUB_API_BASE}/repos/{repo}/contents/{file_path}"
    response = requests.get(url, headers=headers)
    data = {
        "message": commit_message,
        "content": base64.b64encode(content.encode("utf-8")).decode("utf-8"),
        "branch": branch,
    }
    if response.status_code == 200:
        data["sha"] = response.json()["sha"]
    response = requests.put(url, headers=headers, json=data)
    if response.status_code not in (200, 201):
        print(f"Failed to update {file_path}: {response.status_code} - {response.text}")
        return False
    return True


def extract_title_from_content(content: str):
    """Extract h1 or title from HTML."""
    if not content:
        return None
    h1_match = re.search(r"<h1[^>]*>(.*?)</h1>", content, re.DOTALL | re.IGNORECASE)
    if h1_match:
        return re.sub(r"<[^>]+>", "", h1_match.group(1)).strip()
    title_match = re.search(r"<title[^>]*>(.*?)</title>", content, re.DOTALL | re.IGNORECASE)
    if title_match:
        return re.sub(r"<[^>]+>", "", title_match.group(1)).strip()
    return None


def get_topic_for_week() -> str:
    """Select topic based on week of year."""
    week_num = datetime.now().isocalendar()[1]
    return TOPIC_CATEGORIES[week_num % len(TOPIC_CATEGORIES)]


def generate_blog_content(api_key: str, repo: str, max_words: int = 600):
    """Generate blog content via OpenAI with model fallback chain."""
    existing_blogs = load_blogs_from_github(repo) or []
    sorted_blogs = sorted(existing_blogs, key=lambda x: x.get("generated_at", ""), reverse=True)
    recent_titles = []
    for blog in sorted_blogs[:10]:
        title = extract_title_from_content(blog.get("content", ""))
        if title:
            recent_titles.append(title)
    avoid_topics = ", ".join(recent_titles) if recent_titles else "None yet"
    today = datetime.now().strftime("%B %d, %Y")
    topic_focus = get_topic_for_week()
    print(f"Topic focus: {topic_focus}")

    system_content = (
        "You are a business trade expert who writes authoritative, professional content for "
        "industry professionals and decision-makers. Use web search to find CURRENT, RECENT "
        "developments. Create engaging, factual blog posts that are exactly 600 words long. "
        "Include a compelling title, introduction, main body with clear sections, and conclusion. "
        "Format the content in clean HTML that can be used directly on a website."
    )
    user_content = (
        f"Today is {today}. Research and write a {max_words}-word blog post about sourcing and "
        f"importing to the United States. FOCUS SPECIFICALLY on: {topic_focus}. "
        f"Use web search to find recent news, data, and developments from the past 30-60 days. "
        f"Include specific examples, data points, and implications for businesses. "
        f"Format the output as clean HTML with proper heading tags (h1, h2, h3) and paragraph tags. "
        f"CRITICAL: Do NOT write about topics similar to these recent posts: {avoid_topics}. "
        f"Choose a distinct angle or development that has not been covered."
    )

    models_to_try = [
        "gpt-4o-mini-search-preview",
        "gpt-4o-search-preview",
        "gpt-4o",
    ]
    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    messages = [
        {"role": "system", "content": system_content},
        {"role": "user", "content": user_content},
    ]

    for attempt, model in enumerate(models_to_try):
        print(f"Trying model: {model}")
        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers=headers,
            json={
                "model": model,
                "messages": messages,
                "max_tokens": 2500,
                "temperature": 0.8,
            },
            timeout=120,
        )
        if response.status_code == 200:
            content = response.json()["choices"][0]["message"]["content"]
            print(f"Generated with {model}: {len(content.split())} words")
            return content
        if attempt < len(models_to_try) - 1:
            print(f"Model {model} failed ({response.status_code}), trying fallback...")
        else:
            print(f"OpenAI error: {response.status_code} - {response.text}")
    return None


def main():
    repo = os.getenv("GITHUB_REPOSITORY", "raulsharma21/Source-One-Website")
    branch = os.getenv("GITHUB_REF_NAME", "main")
    token = os.getenv("GITHUB_TOKEN")
    api_key = os.getenv("OPENAI_API_KEY")

    if not token:
        print("Error: GITHUB_TOKEN is required")
        sys.exit(1)
    if not api_key:
        print("Error: OPENAI_API_KEY is required (add as repository secret)")
        sys.exit(1)

    print(f"Generating blog for {repo} (branch: {branch})...")
    content = generate_blog_content(api_key, repo)
    if not content:
        print("Failed to generate blog content")
        sys.exit(1)

    blog_data = {
        "id": str(uuid.uuid4()),
        "content": content,
        "generated_at": datetime.now().isoformat(),
        "word_count": len(content.split()),
        "category": "sourcing_and_importing",
        "status": "published",
    }

    existing = load_blogs_from_github(repo) or []
    existing.append(blog_data)
    if len(existing) > 50:
        existing = sorted(existing, key=lambda x: x["generated_at"], reverse=True)[:50]

    commit_msg = f"Add new blog post: {blog_data['id'][:8]}"
    if not update_github_file(BLOGS_FILE_PATH, json.dumps(existing, indent=2), commit_msg, token, repo, branch):
        sys.exit(1)

    metadata = {
        "last_generated": blog_data["generated_at"],
        "total_blogs": len(existing),
        "last_blog_id": blog_data["id"],
        "updated_at": datetime.now().isoformat(),
    }
    if not update_github_file(METADATA_FILE_PATH, json.dumps(metadata, indent=2), commit_msg, token, repo, branch):
        sys.exit(1)

    print("✅ Blog generated and saved to GitHub successfully")


if __name__ == "__main__":
    main()
