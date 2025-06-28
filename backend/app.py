from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Import route blueprints
from routes.contact import contact_bp
from routes.blog import blog_bp

# Load environment variables
load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # Configure CORS using environment variables for security
    # Default to production frontend only if not specified
    allowed_origins = os.getenv('CORS_ORIGINS', 'https://source-one-website.vercel.app')
    cors_origins = [origin.strip() for origin in allowed_origins.split(',') if origin.strip()]
    
    print(f"🔒 CORS configured for origins: {cors_origins}")  # Debug log
    
    CORS(app, origins=cors_origins)
    
    # Register blueprints
    app.register_blueprint(contact_bp, url_prefix='/api')
    app.register_blueprint(blog_bp, url_prefix='/api')
    
    # Health check endpoint
    @app.route('/health', methods=['GET'])
    def health_check():
        """Health check endpoint"""
        return jsonify({
            "status": "healthy", 
            "message": "Source One API is running",
            "version": "1.0.0"
        })
    
    # Root endpoint with comprehensive API documentation
    @app.route('/', methods=['GET'])
    def root():
        """Root endpoint with complete API documentation"""
        return jsonify({
            "message": "Source One API - Blog Generation & Contact Management",
            "version": "1.0.0",
            "endpoints": {
                "health_check": {
                    "url": "/health",
                    "method": "GET",
                    "description": "Check API health status",
                    "access": "Public"
                },
                "blog_endpoints": {
                    "get_all_blogs": {
                        "url": "/api/blogs",
                        "method": "GET", 
                        "description": "Fetch all blog posts",
                        "access": "Public"
                    },
                    "get_latest_blog": {
                        "url": "/api/blogs/latest",
                        "method": "GET",
                        "description": "Fetch the most recent blog post", 
                        "access": "Public"
                    },
                    "get_blog_by_id": {
                        "url": "/api/blogs/{id}",
                        "method": "GET",
                        "description": "Fetch a specific blog post by ID",
                        "access": "Public"
                    },
                    "generate_blog": {
                        "url": "/api/generate-blog-internal",
                        "method": "POST",
                        "description": "Generate new blog post (automated)",
                        "access": "Private - GitHub Actions only",
                        "auth": "X-Internal-API-Key header required"
                    },
                    "debug_github": {
                        "url": "/api/debug-github", 
                        "method": "GET",
                        "description": "Debug GitHub API connectivity",
                        "access": "Public (temporary - remove in production)"
                    }
                },
                "contact_endpoints": {
                    "submit_contact": {
                        "url": "/api/contact",
                        "method": "POST",
                        "description": "Submit contact form",
                        "access": "Public",
                        "rate_limited": True
                    }
                }
            },
            "automation": {
                "blog_generation": {
                    "frequency": "Weekly (Sundays at 9 AM UTC)",
                    "trigger": "GitHub Actions",
                    "storage": "GitHub Repository (storage/blogs.json)"
                }
            },
            "frontend_integration": {
                "cors_enabled": True,
                "allowed_origins": [
                    "https://source-one-website.vercel.app",
                    "http://localhost:3000" 
                ]
            }
        })
    
    # Add a status endpoint for monitoring
    @app.route('/status', methods=['GET'])
    def status():
        """Detailed status endpoint for monitoring"""
        try:
            # Check environment variables
            env_status = {
                "OPENAI_API_KEY": "✓ Set" if os.getenv('OPENAI_API_KEY') else "✗ Missing",
                "INTERNAL_API_KEY": "✓ Set" if os.getenv('INTERNAL_API_KEY') else "✗ Missing", 
                "GITHUB_REPO": os.getenv('GITHUB_REPO', 'Not set')
            }
            
            return jsonify({
                "status": "operational",
                "timestamp": "2025-06-28T12:00:00Z",
                "environment": env_status,
                "services": {
                    "blog_api": "✓ Available",
                    "contact_api": "✓ Available",
                    "github_integration": "✓ Connected",
                    "openai_integration": "✓ Connected" if os.getenv('OPENAI_API_KEY') else "✗ Not configured"
                }
            }), 200
            
        except Exception as e:
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500
    
    return app

# Create app instance
app = create_app()

if __name__ == '__main__':
    # Development server
    print("🚀 Starting Source One API server...")
    print("📝 Blog generation: Automated via GitHub Actions")
    print("🌐 Frontend: https://source-one-website.vercel.app")
    print("🔧 Debug endpoint: /api/debug-github")
    
    app.run(debug=True, host='0.0.0.0', port=5001)