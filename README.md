# Interview Application

A full-stack interview platform built with Next.js (client) and Express.js (server), featuring AI-powered interview questions and resume parsing capabilities.

## 🏗️ Project Structure

```
interview/
├── client/                 # Next.js frontend application
├── server/                 # Express.js backend API
├── python-server/          # Python API for AI features
├── docker-compose.yml      # Docker orchestration
└── .github/workflows/      # CI/CD pipeline
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.8+
- Docker & Docker Compose
- Git

### 1. Clone the Repository

```bash
git clone <repository-url>
cd interviewprep
```

### 2. Environment Setup

#### Client Environment Variables

Create `client/.env` file:

```env
# Next.js Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_PYTHON_API_URL=http://localhost:8000

# Database (if using client-side connections)
DATABASE_URL=your_database_url

# External APIs
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

#### Server Environment Variables

Create `server/.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Connection
# For local Dockerized Postgres, use:
DB_HOST=db
DB_PORT=5432
DB_NAME=interview_db
DB_USER=postgres
DB_PASSWORD=postgres

# For external DB, override these variables accordingly:
# DB_HOST=your.external.db.host
# DB_PORT=5432
# DB_NAME=yourdbname
# DB_USER=youruser
# DB_PASSWORD=yourpassword

# JWT & Authentication
JWT_SECRET=your_super_secure_jwt_secret
JWT_EXPIRES_IN=7d

# External APIs
GEMINI_API_KEY=your_gemini_api_key

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://your-domain.com
```

#### Python Server Environment Variables

Create `python-server/.env` file:

```env
# Python Server Configuration
PORT=8000
FLASK_ENV=development

# AI/ML APIs
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key

# File Upload
MAX_FILE_SIZE=10MB
UPLOAD_DIR=./uploads
```

### 3. Installation & Setup

#### Using Docker (Recommended)

```bash
# Build and start all services
docker-compose up --build

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f
```
#### Using Docker with External Database
If you want to connect the backend server to an external Postgres instance instead of running the Postgres container:

- Do not start the db service.
- Set database environment variables to your external DB:

Example command to run only the server with external DB connection:

```bash
DB_HOST=your.external.db.host \
DB_PORT=5432 \
DB_USER=youruser \
DB_PASSWORD=yourpassword \
DB_NAME=yourdbname \
docker-compose up -d server

```
> ⚠️ When using an external database, make sure **NOT** to start the `db` service to avoid conflicts.


#### Manual Setup

##### Client Setup

```bash
cd client
npm install
npm run dev
```

##### Server Setup

```bash
cd server
npm install
npm run dev
```

##### Python Server Setup

```bash
cd python-server
pip install -r requirements.txt
python main.py
```

## 📋 Available Scripts

### Client (Next.js)

```bash
cd client
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Server (Express.js)

```bash
cd server
npm run dev          # Start development server with nodemon
npm run build        # Compile TypeScript
npm run start        # Start production server
npm run test         # Run tests
```

### Python Server

```bash
cd python-server
python main.py       # Start Flask development server
python -m pytest    # Run tests
```

## 🔧 Configuration

### Docker Configuration

The project uses Docker Compose for orchestration. Key services:

- **Client**: Next.js app (Port 3000)
- **Server**: Express.js API (Port 5000)
- **Python Server**: Flask API (Port 8000)
- **Database**: PostgreSQL (Port 5432)

### Database Setup

1. Create a PostgreSQL database
2. Update connection strings in environment files
3. Run migrations:

```bash
cd server
npm run migrate
```

## 🚀 Deployment

### Heroku Deployment (Server)

The server is configured for Heroku deployment via the [CI/CD pipeline](.github/workflows/ci-cd.yml).

Required Heroku environment variables:

```env
HEROKU_API_KEY=your_heroku_api_key
HEROKU_APP_NAME=your_app_name
```

### Vercel Deployment (Client)

The client can be deployed to Vercel:

Required Vercel environment variables:

```env
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

## 🔄 CI/CD Pipeline

The project uses GitHub Actions for automated testing and deployment:

- **Triggers**: Push/PR to main branch
- **Path Detection**: Only builds changed services
- **Server**: Builds Docker image and deploys to Heroku
- **Client**: Builds and deploys to Vercel
- **Testing**: Automated health checks

## 📚 API Documentation

### Server Endpoints

- `GET /health` - Health check
- `POST /api/auth/login` - User authentication
- `GET /api/users` - User management
- `POST /api/interviews` - Interview creation

### Python API Endpoints

- `POST /api/questions/generate` - Generate AI questions
- `POST /api/resume/parse` - Parse resume files
- `POST /api/speech/transcribe` - Speech-to-text

## 🛠️ Development

### Code Structure

#### Client ([client/](client/))

- `src/app/` - Next.js App Router pages
- `src/components/` - Reusable React components
- `src/lib/` - Utility functions and configurations

#### Server ([server/src/](server/src/))

- `app.ts` - Express application setup
- `routes.ts` - API route definitions
- `database/` - Database models and migrations
- `middlewares/` - Custom middleware functions

### Key Features

- 🤖 AI-powered interview question generation
- 📄 Resume parsing and analysis
- 🎙️ Speech-to-text capabilities
- 👥 User authentication and management
- 📊 Interview analytics and reporting

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run client tests
cd client && npm run test

# Run server tests
cd server && npm run test

# Run Python tests
cd python-server && python -m pytest
```

## 🔒 Security

- JWT-based authentication
- Environment variable protection
- CORS configuration
- Input validation and sanitization
- Rate limiting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the [CI/CD pipeline](.github/workflows/ci-cd.yml) for deployment status
- Review logs: `docker-compose logs -f`

## 🔗 Live URLs

- **Client**: https://your-client-url.vercel.app
- **Server**: https://your-server-app.herokuapp.com
- **Health Check**: https://your-server-app.herokuapp.com/health
