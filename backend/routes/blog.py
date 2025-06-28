from flask import Blueprint, request, jsonify
import os
import json
import requests
import base64
from datetime import datetime
import uuid

# Create blueprint
blog_bp = Blueprint('blog', __name__)

# GitHub configuration
GITHUB_REPO = os.getenv('GITHUB_REPO', 'raulsharma21/Source-One-Website')  # Default fallback
GITHUB_BRANCH = os.getenv('GITHUB_BRANCH', 'main')

# GitHub API base URL
GITHUB_API_BASE = "https://api.github.com"

# File paths in the repository
BLOGS_FILE_PATH = "storage/blogs.json"
METADATA_FILE_PATH = "storage/blog_metadata.json"

# Private API key for internal operations
INTERNAL_API_KEY = os.getenv('INTERNAL_API_KEY', 'your-secure-internal-key')

@blog_bp.route('/generate-blog-internal', methods=['POST'])
def generate_blog_internal():
    """Private endpoint for internal blog generation (GitHub Actions triggered)"""
    
    # Verify internal API key
    api_key = request.headers.get('X-Internal-API-Key')
    if api_key != INTERNAL_API_KEY:
        return jsonify({"error": "Unauthorized"}), 401
    
    try:
        # Get GitHub configuration from request (passed by GitHub Actions)
        data = request.get_json() or {}
        github_config = {
            'token': data.get('github_token'),  # Only for writing
            'repo': data.get('github_repo', GITHUB_REPO),
            'branch': data.get('github_branch', GITHUB_BRANCH)
        }
        
        # Generate and store new blog
        blog_data = create_weekly_blog(github_config)
        
        if blog_data:
            return jsonify({
                "message": "Blog generated and stored successfully",
                "blog_id": blog_data['id'],
                "generated_at": blog_data['generated_at'],
                "word_count": blog_data['word_count']
            }), 200
        else:
            return jsonify({"error": "Failed to generate blog"}), 500
            
    except Exception as e:
        print(f"Internal blog generation error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@blog_bp.route('/blogs', methods=['GET'])
def get_blogs():
    """Public endpoint to fetch all stored blogs from GitHub"""
    try:
        blogs = load_blogs_from_github()
        
        if blogs is None:
            return jsonify({"error": "Failed to load blogs"}), 500
        
        # Sort by date (newest first)
        sorted_blogs = sorted(blogs, key=lambda x: x['generated_at'], reverse=True)
        
        return jsonify({
            "blogs": sorted_blogs,
            "count": len(sorted_blogs)
        }), 200
        
    except Exception as e:
        print(f"Error fetching blogs: {str(e)}")
        return jsonify({"error": "Failed to fetch blogs"}), 500

@blog_bp.route('/blogs/latest', methods=['GET'])
def get_latest_blog():
    """Public endpoint to fetch the most recent blog from GitHub"""
    try:
        blogs = load_blogs_from_github()
        
        if blogs is None:
            return jsonify({"error": "Failed to load blogs"}), 500
        
        if not blogs:
            return jsonify({"message": "No blogs available"}), 404
        
        # Get the most recent blog
        latest_blog = max(blogs, key=lambda x: x['generated_at'])
        
        return jsonify(latest_blog), 200
        
    except Exception as e:
        print(f"Error fetching latest blog: {str(e)}")
        return jsonify({"error": "Failed to fetch latest blog"}), 500

@blog_bp.route('/blogs/<blog_id>', methods=['GET'])
def get_blog_by_id(blog_id):
    """Public endpoint to fetch a specific blog by ID from GitHub"""
    try:
        blogs = load_blogs_from_github()
        
        if blogs is None:
            return jsonify({"error": "Failed to load blogs"}), 500
        
        blog = next((b for b in blogs if b['id'] == blog_id), None)
        
        if not blog:
            return jsonify({"error": "Blog not found"}), 404
        
        return jsonify(blog), 200
        
    except Exception as e:
        print(f"Error fetching blog {blog_id}: {str(e)}")
        return jsonify({"error": "Failed to fetch blog"}), 500

@blog_bp.route('/debug-github', methods=['GET'])
def debug_github():
    """Debug endpoint to check GitHub API access"""
    try:
        repo = GITHUB_REPO
        url = f"{GITHUB_API_BASE}/repos/{repo}/contents/{BLOGS_FILE_PATH}"
        
        print(f"Debug: Trying to fetch from {url}")
        
        response = requests.get(url, timeout=30)
        
        return jsonify({
            "url": url,
            "status_code": response.status_code,
            "response_preview": response.text[:500] if response.text else "No response text",
            "GITHUB_REPO": repo,
            "BLOGS_FILE_PATH": BLOGS_FILE_PATH,
            "repo_from_env": os.getenv('GITHUB_REPO', 'NOT_SET')
        }), 200
        
    except Exception as e:
        return jsonify({
            "error": str(e),
            "GITHUB_REPO": GITHUB_REPO,
            "BLOGS_FILE_PATH": BLOGS_FILE_PATH,
            "repo_from_env": os.getenv('GITHUB_REPO', 'NOT_SET')
        }), 500

def create_weekly_blog(github_config=None):
    """Generate a new blog post and store it in GitHub"""
    try:
        # Generate blog content
        blog_content = generate_sourcing_blog_content()
        
        if not blog_content:
            return None
        
        # Create blog data structure
        blog_data = {
            "id": str(uuid.uuid4()),
            "content": blog_content,
            "generated_at": datetime.now().isoformat(),
            "word_count": len(blog_content.split()),
            "category": "sourcing_and_importing",
            "status": "published"
        }
        
        # Save to GitHub
        success = save_blog_to_github(blog_data, github_config)
        
        if success:
            print(f"Weekly blog generated and stored in GitHub: {blog_data['id']}")
            return blog_data
        else:
            print("Failed to save blog to GitHub")
            return None
        
    except Exception as e:
        print(f"Error creating weekly blog: {str(e)}")
        return None

def save_blog_to_github(blog_data, github_config=None):
    """Save blog to GitHub repository"""
    try:
        # Use provided config or fall back to environment variables
        if github_config:
            token = github_config.get('token')  # From GitHub Actions
            repo = github_config.get('repo', GITHUB_REPO)
            branch = github_config.get('branch', GITHUB_BRANCH)
        else:
            token = None  # No token for reading
            repo = GITHUB_REPO
            branch = GITHUB_BRANCH
        
        if not token or not repo:
            print(f"Missing GitHub configuration for writing: token={bool(token)}, repo={repo}")
            return False
        
        # Load existing blogs (no token needed for reading public repo)
        existing_blogs = load_blogs_from_github() or []
        
        # Add new blog
        existing_blogs.append(blog_data)
        
        # Keep only the last 50 blogs to manage repository size
        if len(existing_blogs) > 50:
            existing_blogs = sorted(existing_blogs, key=lambda x: x['generated_at'], reverse=True)[:50]
        
        # Update blogs file in GitHub (token needed for writing)
        blogs_success = update_github_file(
            BLOGS_FILE_PATH,
            json.dumps(existing_blogs, indent=2),
            f"Add new blog post: {blog_data['id'][:8]}",
            {'token': token, 'repo': repo, 'branch': branch}
        )
        
        if not blogs_success:
            return False
        
        # Update metadata
        metadata = {
            "last_generated": blog_data['generated_at'],
            "total_blogs": len(existing_blogs),
            "last_blog_id": blog_data['id'],
            "updated_at": datetime.now().isoformat()
        }
        
        metadata_success = update_github_file(
            METADATA_FILE_PATH,
            json.dumps(metadata, indent=2),
            f"Update metadata for blog: {blog_data['id'][:8]}",
            {'token': token, 'repo': repo, 'branch': branch}
        )
        
        return blogs_success and metadata_success
        
    except Exception as e:
        print(f"Error saving blog to GitHub: {str(e)}")
        return False

def load_blogs_from_github():
    """Load blogs from GitHub repository (no token needed for public repo)"""
    try:
        repo = GITHUB_REPO
        
        if not repo:
            print("Missing GitHub repo configuration")
            return []
        
        # Get file from GitHub (no token needed for public repos)
        url = f"{GITHUB_API_BASE}/repos/{repo}/contents/{BLOGS_FILE_PATH}"
        
        print(f"Loading blogs from: {url}")
        
        response = requests.get(url, timeout=30)
        
        print(f"GitHub API response status: {response.status_code}")
        
        if response.status_code == 404:
            # File doesn't exist yet, return empty list
            print("Blogs file not found (404) - returning empty list")
            return []
        
        if response.status_code != 200:
            print(f"GitHub API error: {response.status_code} - {response.text}")
            return None
        
        file_data = response.json()
        content = base64.b64decode(file_data['content']).decode('utf-8')
        
        blogs = json.loads(content)
        print(f"Successfully loaded {len(blogs)} blogs from GitHub")
        return blogs
        
    except Exception as e:
        print(f"Error loading blogs from GitHub: {str(e)}")
        return None

def update_github_file(file_path, content, commit_message, github_config):
    """Update or create a file in GitHub repository"""
    try:
        token = github_config.get('token')
        repo = github_config.get('repo')
        branch = github_config.get('branch', 'main')
        
        if not token or not repo:
            print(f"Missing GitHub config for update: token={bool(token)}, repo={repo}")
            return False
        
        headers = {
            'Authorization': f'token {token}',
            'Accept': 'application/vnd.github.v3+json'
        }
        
        # First, try to get the file to get its SHA (required for updates)
        url = f"{GITHUB_API_BASE}/repos/{repo}/contents/{file_path}"
        response = requests.get(url, headers=headers)
        
        # Prepare the update data
        encoded_content = base64.b64encode(content.encode('utf-8')).decode('utf-8')
        
        data = {
            'message': commit_message,
            'content': encoded_content,
            'branch': branch
        }
        
        # If file exists, include SHA for update
        if response.status_code == 200:
            file_data = response.json()
            data['sha'] = file_data['sha']
        
        # Create or update the file
        response = requests.put(url, headers=headers, json=data)
        
        if response.status_code in [200, 201]:
            print(f"Successfully updated {file_path} in GitHub")
            return True
        else:
            print(f"Failed to update {file_path}: {response.status_code} - {response.text}")
            return False
            
    except Exception as e:
        print(f"Error updating GitHub file {file_path}: {str(e)}")
        return False

def generate_sourcing_blog_content(max_words=600):
    """Generate blog content about current sourcing and importing events using OpenAI API"""
    try:
        api_key = os.getenv('OPENAI_API_KEY')
        if not api_key:
            print("Missing OpenAI API key")
            return None
        
        headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }
        
        data = {
            'model': 'gpt-4',
            'messages': [
                {
                    'role': 'system',
                    'content': 'You are a business trade expert who writes authoritative, professional content for industry professionals and decision-makers. You have access to current information and should research and write about recent developments in sourcing and importing to the United States. Create engaging, factual blog posts that are exactly 600 words long. Include a compelling title, introduction, main body with clear sections, and conclusion. Format the content in clean HTML that can be used directly on a website.'
                },
                {
                    'role': 'user',
                    'content': f'Research and write a {max_words}-word blog post about one of the current events relating to sourcing and importing to the United States. Focus on recent developments (2024-2025) such as tariff changes, supply chain shifts, trade policy impacts, or emerging sourcing trends. Include specific examples, data points, and implications for businesses. Format the output as clean HTML with proper heading tags (h1, h2, h3) and paragraph tags that can be directly inserted into a website. Make this unique and different from previous posts.'
                }
            ],
            'max_tokens': 2500,
            'temperature': 0.7
        }
        
        response = requests.post(
            'https://api.openai.com/v1/chat/completions',
            headers=headers,
            json=data,
            timeout=45
        )
        
        if response.status_code == 200:
            result = response.json()
            content = result['choices'][0]['message']['content']
            print(f"Generated weekly blog post: {len(content.split())} words")
            return content
        else:
            print(f"OpenAI API error: {response.status_code} - {response.text}")
            return None
            
    except Exception as e:
        print(f"AI generation error: {str(e)}")
        return None