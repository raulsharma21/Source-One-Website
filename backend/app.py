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
    
    # Configure CORS - replace with your frontend URL in production
    CORS(app, origins=["http://localhost:3001", "https://your-firebase-app.web.app"])
    
    # Register blueprints
    app.register_blueprint(contact_bp, url_prefix='/api')
    app.register_blueprint(blog_bp, url_prefix='/api')
    
    # Health check endpoint
    @app.route('/health', methods=['GET'])
    def health_check():
        """Health check endpoint"""
        return jsonify({"status": "healthy", "message": "API is running"})
    
    # Root endpoint
    @app.route('/', methods=['GET'])
    def root():
        """Root endpoint with API info"""
        return jsonify({
            "message": "Flask API for contact forms and blog generation",
            "endpoints": {
                "health": "/health",
                "contact": "/api/contact",
                "blog": "/api/generate-blog"
            }
        })
    
    return app

# Create app instance
app = create_app()

if __name__ == '__main__':
    # Development server
    app.run(debug=True, host='0.0.0.0', port=5001)