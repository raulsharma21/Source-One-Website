# Source One Website

A modern business website with automated blog generation and contact management system, built in partnership with Santa Clara University's Consulting Club.

🌐 **Live Website**: [https://source-one-website.vercel.app](https://source-one-website.vercel.app)

## 🤝 Project Background

This website was developed as part of a consulting engagement between **Santa Clara Consulting** and **Source One**, focusing on creating an automated digital presence that showcases expertise in global sourcing and importing while requiring minimal ongoing maintenance.

## 🏗️ Architecture

```
├── frontend/          # Next.js 14 with TypeScript
├── backend/           # Flask API with OpenAI integration
├── storage/           # GitHub-based blog storage
└── .github/workflows/ # Automated blog generation
```

## ✨ Features

### 🤖 **Automated Blog Generation**
- **Weekly blog posts** generated automatically every Sunday at 9 AM UTC
- **AI-powered content** using OpenAI GPT-4 focused on sourcing and importing
- **GitHub Actions workflow** triggers content generation
- **Smart image selection** with content analysis for relevant visuals

### 📝 **Contact Management**
- **Custom contact form** with validation and rate limiting
- **CORS-enabled** for secure cross-origin requests
- **Responsive design** across all devices

### 🎨 **Modern Tech Stack**
- **Next.js 14** with TypeScript and Tailwind CSS
- **Flask API** with OpenAI integration
- **GitHub storage** for automated content management
- **Vercel deployment** with global CDN

## 🔄 Automated Workflow

1. **GitHub Actions triggers** every Sunday at 9 AM UTC
2. **AI analyzes** current trade and sourcing trends
3. **Content generated** using GPT-4 with industry-specific prompts
4. **Blog stored** in GitHub repository with metadata
5. **Frontend automatically** displays new content

## 📡 API Endpoints

### **Public Endpoints**
- `GET /api/blogs` - Fetch all blog posts
- `GET /api/blogs/latest` - Get latest blog post
- `GET /api/blogs/{id}` - Get specific blog post
- `POST /api/contact` - Submit contact form
- `GET /health` - Health check

### **Private Endpoints**
- `POST /api/generate-blog-internal` - Generate new blog (GitHub Actions only)

## 🚀 Deployment

- **Frontend**: [https://source-one-website.vercel.app](https://source-one-website.vercel.app)
- **Backend API**: [https://source-one-backend.vercel.app](https://source-one-backend.vercel.app)
- **Storage**: GitHub repository with automated content management

## 🔐 Security

- CORS configuration for secure cross-origin requests
- Rate limiting on contact forms and API endpoints
- Environment variables for sensitive configuration
- Internal API keys for automated processes

## 📄 License

This project was developed through a consulting partnership between Santa Clara University Consulting and Source One. All content and code are proprietary and confidential.
