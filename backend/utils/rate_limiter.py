import time
from collections import defaultdict

# Simple in-memory rate limiting (use Redis in production)
request_counts = defaultdict(dict)

def rate_limit_check(ip_address, limit=3, window_minutes=1):
    """
    Simple rate limiting check
    
    Args:
        ip_address: Client IP address
        limit: Number of requests allowed per window
        window_minutes: Time window in minutes
    
    Returns:
        bool: True if request is allowed, False if rate limited
    """
    current_time = int(time.time() / (60 * window_minutes))  # Current window
    
    # Clean old entries (keep only current and previous window)
    for ip in list(request_counts.keys()):
        request_counts[ip] = {
            window: count for window, count in request_counts[ip].items()
            if window >= current_time - 1
        }
        if not request_counts[ip]:
            del request_counts[ip]
    
    # Initialize if first request from this IP
    if ip_address not in request_counts:
        request_counts[ip_address] = {}
    
    if current_time not in request_counts[ip_address]:
        request_counts[ip_address][current_time] = 0
    
    # Check current limit
    current_requests = request_counts[ip_address][current_time]
    
    if current_requests >= limit:
        return False
    
    # Increment counter
    request_counts[ip_address][current_time] += 1
    return True

def get_rate_limit_info(ip_address, limit=10, window_minutes=1):
    """
    Get rate limit information for debugging
    
    Returns:
        dict: Rate limit status information
    """
    current_time = int(time.time() / (60 * window_minutes))
    current_requests = request_counts.get(ip_address, {}).get(current_time, 0)
    
    return {
        "ip": ip_address,
        "current_requests": current_requests,
        "limit": limit,
        "remaining": max(0, limit - current_requests),
        "window_minutes": window_minutes,
        "reset_time": (current_time + 1) * (60 * window_minutes)
    }