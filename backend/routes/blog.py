from flask import Blueprint, request, jsonify
import os
import requests
from datetime import datetime
from utils.rate_limiter import rate_limit_check

# Create blueprint
blog_bp = Blueprint('blog', __name__)

@blog_bp.route('/generate-blog', methods=['POST'])
def generate_blog():
    """Generate blog content using AI focused on sourcing and importing current events"""
    
    # Rate limiting (stricter for AI endpoint)
    client_ip = request.remote_addr
    if not rate_limit_check(client_ip, limit=2):
        return jsonify({"error": "Rate limit exceeded"}), 429
    
    try:
        data = request.get_json()
        
        # For this specialized endpoint, we don't need user topic input
        # The AI will research and select current events automatically
        
        # Optional parameters
        max_words = data.get('max_words', 600)  # Changed default to 600
        tone = data.get('tone', 'professional')  # Default to professional for business website
        
        # Validate tone
        allowed_tones = ['informative', 'professional', 'analytical', 'industry-focused']
        if tone not in allowed_tones:
            tone = 'professional'
        
        # Generate blog content about current sourcing/importing events
        blog_content = generate_sourcing_blog_content(max_words, tone)
        
        if blog_content:
            return jsonify({
                "content": blog_content,
                "tone": tone,
                "max_words": max_words,
                "generated_at": datetime.now().isoformat(),
                "word_count": len(blog_content.split()),
                "category": "sourcing_and_importing"
            }), 200
        else:
            return jsonify({"error": "Failed to generate content"}), 500
            
    except Exception as e:
        print(f"Blog generation error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@blog_bp.route('/blog-suggestions', methods=['GET'])
def get_blog_suggestions():
    """Get suggested blog topics related to sourcing and importing"""
    suggestions = [
        "Impact of US Tariffs on Global Supply Chains",
        "Nearshoring vs Offshoring: Strategic Considerations",
        "Supply Chain Diversification Strategies in 2025",
        "Trade Policy Changes and Import Cost Management",
        "Vietnam and India as Alternative Sourcing Destinations",
        "Automotive Industry Supply Chain Disruptions",
        "Technology Sector Import Dependencies",
        "Mexico's Role in North American Supply Chains",
        "Steel and Aluminum Tariff Implications",
        "Semiconductor Supply Chain Challenges"
    ]
    
    return jsonify({"suggestions": suggestions}), 200

def generate_sourcing_blog_content(max_words=600, tone='professional'):
    """Generate blog content about current sourcing and importing events using OpenAI API"""
    try:
        api_key = os.getenv('OPENAI_API_KEY')
        if not api_key:
            print("Missing OpenAI API key")
            return None
        
        # Create tone-specific system message
        tone_prompts = {
            'informative': 'You are a knowledgeable trade analyst who creates well-researched, informative content about international trade and supply chain developments.',
            'professional': 'You are a business trade expert who writes authoritative, professional content for industry professionals and decision-makers.',
            'analytical': 'You are a supply chain analyst who provides data-driven insights and strategic analysis of trade developments.',
            'industry-focused': 'You are an industry specialist who creates content tailored for supply chain and procurement professionals.'
        }
        
        system_message = tone_prompts.get(tone, tone_prompts['professional'])
        
        # OpenAI API call with specific prompt for current events research
        headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }
        
        data = {
            'model': 'gpt-4',  # Using GPT-4 for better research and analysis capabilities
            'messages': [
                {
                    'role': 'system',
                    'content': f'{system_message} You have access to current information and should research and write about recent developments in sourcing and importing to the United States. Create engaging, factual blog posts that are exactly {max_words} words long. Include a compelling title, introduction, main body with clear sections, and conclusion. Format the content in clean HTML that can be used directly on a website.'
                },
                {
                    'role': 'user',
                    'content': f'Research and write a {max_words}-word blog post about one of the current events relating to sourcing and importing to the United States. Focus on recent developments (2024-2025) such as tariff changes, supply chain shifts, trade policy impacts, or emerging sourcing trends. Include specific examples, data points, and implications for businesses. Format the output as clean HTML with proper heading tags (h1, h2, h3) and paragraph tags that can be directly inserted into a website.'
                }
            ],
            'max_tokens': min(int(max_words * 1.8), 2500),  # Increased token limit for GPT-4
            'temperature': 0.6  # Slightly lower for more factual content
        }
        
        response = requests.post(
            'https://api.openai.com/v1/chat/completions',
            headers=headers,
            json=data,
            timeout=45  # Increased timeout for GPT-4
        )
        
        if response.status_code == 200:
            result = response.json()
            content = result['choices'][0]['message']['content']
            print(f"Generated sourcing blog post: {len(content.split())} words")
            return content
        else:
            print(f"OpenAI API error: {response.status_code} - {response.text}")
            return None
            
    except Exception as e:
        print(f"AI generation error: {str(e)}")
        return None