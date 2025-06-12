from flask import Blueprint, request, jsonify
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from utils.rate_limiter import rate_limit_check

# Create blueprint
contact_bp = Blueprint('contact', __name__)

@contact_bp.route('/contact', methods=['POST'])
def contact_form():
    """Handle contact form submissions"""
    
    # Rate limiting
    client_ip = request.remote_addr
    if not rate_limit_check(client_ip):
        return jsonify({"error": "Rate limit exceeded"}), 429
    
    try:
        # Get form data
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'phone', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone')
        message = data.get('message')
        subject = data.get('subject', 'New Contact Form Submission')
        
        # Basic email validation
        if '@' not in email or '.' not in email:
            return jsonify({"error": "Invalid email format"}), 400
        
        # Additional validation
        if len(name) > 100:
            return jsonify({"error": "Name too long"}), 400
        if len(message) > 2000:
            return jsonify({"error": "Message too long"}), 400
        
        # Send email
        success = send_contact_email(name, email, subject, phone, message)
        
        if success:
            return jsonify({"message": "Email sent successfully"}), 200
        else:
            return jsonify({"error": "Failed to send email"}), 500
            
    except Exception as e:
        print(f"Contact form error: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

def send_contact_email(name, email, phone, subject, message):
    """Send contact form email using SMTP"""
    try:
        # Email configuration from environment variables
        smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
        smtp_port = int(os.getenv('SMTP_PORT', '587'))
        sender_email = os.getenv('SENDER_EMAIL')
        sender_password = os.getenv('SENDER_PASSWORD')
        recipient_email = os.getenv('TEST_RECIPIENT_EMAIL')
        
        if not all([sender_email, sender_password, recipient_email]):
            print("Missing email configuration")
            return False
        
        # Create message
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = recipient_email
        msg['Subject'] = f"Contact Form: {subject}"
        
        # Email body
        body = f"""
        New contact form submission:
        
        Name: {name}
        Email: {email}
        Phone: {phone}
        Subject: {subject}
        
        Message:
        {message}
        
        ---
        Sent from your website contact form
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Send email
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, sender_password)
        text = msg.as_string()
        server.sendmail(sender_email, recipient_email, text)
        server.quit()
        
        print(f"Email sent successfully to {recipient_email}")
        return True
        
    except Exception as e:
        print(f"Email sending error: {str(e)}")
        return False