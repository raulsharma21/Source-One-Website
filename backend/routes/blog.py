from flask import Blueprint, request, jsonify
import os
import requests
from datetime import datetime
from utils.rate_limiter import rate_limit_check

# Create blueprint
blog_bp = Blueprint('blog', __name__)

@blog_bp.route('/generate-blog', methods=['POST'])
def generate_blog():
    """Generate blog content using AI"""
    
    # Rate limiting (stricter for AI endpoint)
    client_ip = request.remote_addr
    if not rate_limit_check(client_ip, limit=2):
        return jsonify({"error": "Rate limit exceeded"}), 429
    
    try:
        data = request.get_json()
        
        # Validate input
        topic = data.get('topic', '').strip()
        if not topic:
            return jsonify({"error": "Topic is required"}), 400
        
        if len(topic) > 200:
            return jsonify({"error": "Topic too long (max 200 characters)"}), 400
        
        # Optional parameters
        max_words = data.get('max_words', 800)
        tone = data.get('tone', 'informative')  # informative, casual, professional
        
        # Validate tone
        allowed_tones = ['informative', 'casual', 'professional', 'creative']
        if tone not in allowed_tones:
            tone = 'informative'
        
        # Generate blog content
        blog_content = generate_ai_content(topic, max_words, tone)
        
        if blog_content:
            return jsonify({
                "topic": topic,
                "content": blog_content,
                "tone": tone,
                "max_words": max_words,
                "generated_at": datetime.now().isoformat(),
                "word_count": len(blog_content.split())
            }), 200
        else:
            return jsonify({"error": "Failed to generate content"}), 500
            
    except Exception as e:
        print(f"Blog generation error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@blog_bp.route('/blog-suggestions', methods=['GET'])
def get_blog_suggestions():
    """Get suggested blog topics"""
    suggestions = [
        "The Future of Renewable Energy",
        "Remote Work Best Practices",
        "AI in Everyday Life",
        "Sustainable Living Tips",
        "Digital Privacy in 2025",
        "The Rise of Electric Vehicles",
        "Mental Health in the Digital Age",
        "Climate Change Solutions",
        "Cryptocurrency Trends",
        "Space Exploration Updates"
    ]
    
    return jsonify({"suggestions": suggestions}), 200

def generate_ai_content(topic, max_words=800, tone='informative'):
    """Generate blog content using OpenAI API"""
    try:
        api_key = os.getenv('OPENAI_API_KEY')
        if not api_key:
            print("Missing OpenAI API key")
            return None
        
        # Create tone-specific system message
        tone_prompts = {
            'informative': 'You are a knowledgeable writer who creates well-researched, informative blog posts.',
            'casual': 'You are a friendly blogger who writes in a casual, conversational tone.',
            'professional': 'You are a business writer who creates professional, authoritative content.',
            'creative': 'You are a creative writer who uses engaging storytelling and vivid descriptions.'
        }
        
        system_message = tone_prompts.get(tone, tone_prompts['informative'])
        
        # OpenAI API call
        headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }
        
        data = {
            'model': 'gpt-3.5-turbo',
            'messages': [
                {
                    'role': 'system',
                    'content': f'{system_message} Write engaging blog posts that are around {max_words} words long. Include a compelling title, introduction, main body with subheadings, and conclusion.'
                },
                {
                    'role': 'user',
                    'content': f'Write a blog post about: {topic}'
                }
            ],
            'max_tokens': min(int(max_words * 1.5), 2000),  # Rough token estimate
            'temperature': 0.7
        }
        
        response = requests.post(
            'https://api.openai.com/v1/chat/completions',
            headers=headers,
            json=data,
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            content = result['choices'][0]['message']['content']
            print(f"Generated blog post: {len(content.split())} words")
            return content
        else:
            print(f"OpenAI API error: {response.status_code} - {response.text}")
            return None
            
    except Exception as e:
        print(f"AI generation error: {str(e)}")
        return None