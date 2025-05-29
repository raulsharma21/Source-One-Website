import requests
import json

# Base URL of your Flask API
BASE_URL = "http://127.0.0.1:5001"

def test_health_check():
    """Test the health check endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"Health Check: {response.status_code}")
        print(f"Response: {response.json()}")
        print("-" * 50)
    except Exception as e:
        print(f"Health check failed: {e}")

def test_contact_form():
    """Test the contact form endpoint"""
    try:
        data = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Test Message",
            "message": "This is a test message from the API test script."
        }
        
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=data,
            headers={'Content-Type': 'application/json'}
        )
        
        print(f"Contact Form: {response.status_code}")
        print(f"Response: {response.json()}")
        print("-" * 50)
    except Exception as e:
        print(f"Contact form test failed: {e}")

def test_blog_generation():
    """Test the blog generation endpoint"""
    try:
        data = {
            "topic": "The benefits of renewable energy"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/generate-blog",
            json=data,
            headers={'Content-Type': 'application/json'}
        )
        
        print(f"Blog Generation: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"Topic: {result.get('topic')}")
            print(f"Content length: {len(result.get('content', ''))}")
            print(f"First 200 chars: {result.get('content', '')[:200]}...")
        else:
            print(f"Response: {response.json()}")
        print("-" * 50)
    except Exception as e:
        print(f"Blog generation test failed: {e}")

if __name__ == "__main__":
    print("Testing Flask API Endpoints")
    print("=" * 50)
    
    test_health_check()
    test_contact_form()
    test_blog_generation()