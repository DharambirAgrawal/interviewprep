# AI-Powered Interview Platform

A modern, AI-driven interview preparation platform built with Next.js, React, and TypeScript. This platform provides an immersive interview experience with audio questions, interactive coding challenges, and real-time feedback.

## 🚀 Features

### Core Interview Functionality

- **Audio-Driven Questions**: Each interview question is delivered via audio playback
- **Multi-Format Questions**: Support for audio-only, coding, behavioral, and system design questions
- **Interactive Code Editor**: Monaco Editor integration for coding challenges with syntax highlighting
- **Real-time Progress Tracking**: Live progress indicators and session management
- **Responsive Design**: Optimized for desktop and mobile experiences

### AI-Powered Experience

- **Intelligent Question Flow**: Dynamic question loading based on performance and preferences
- **Contextual Feedback**: Real-time hints and guidance during coding challenges
- **Adaptive Difficulty**: Questions adjust based on user responses and skill level
- **Multi-Language Support**: Code editor supports JavaScript, Python, Java, C++, TypeScript, and Go

### Professional Interview Environment

- **Video Call Interface**: Simulated interview environment with candidate and interviewer views
- **Audio Controls**: Full audio player with play/pause, seek, volume control, and restart functionality
- **Session Management**: Complete interview lifecycle from start to completion
- **Response Recording**: Capture and store user responses for analysis

## 🏗️ Architecture

### Frontend Structure

```
src/
├── app/
│   ├── (interview)/[id]/          # Dynamic interview sessions
│   ├── auth/                      # Authentication pages
│   └── dashboard/                 # Main dashboard and features
├── components/
│   ├── interview/                 # Interview-specific components
│   │   ├── VideoCallInterface.tsx # Main interview interface
│   │   ├── QuestionDisplay.tsx    # Question presentation
│   │   ├── AudioPlayer.tsx        # Audio controls
│   │   ├── SimpleCodeEditor.tsx   # Code editor component
│   │   └── InterviewProgress.tsx  # Progress tracking
│   └── ui/                        # Reusable UI components (shadcn/ui)
├── hooks/
│   └── useInterviewSession.ts     # Interview state management
├── services/
│   └── interview.ts               # API communication
├── types/
│   └── interview.ts               # TypeScript interfaces
└── lib/
    ├── constants/                 # Application constants
    └── schemas/                   # Validation schemas
```

### Key Components

#### 1. Interview Session Hook (`useInterviewSession`)

Central state management for interview sessions:

- Session loading and initialization
- Audio player state management
- Question progression logic
- Response submission handling
- Error handling and recovery

#### 2. Video Call Interface (`VideoCallInterface`)

Main interview container with multiple states:

- **Waiting State**: Pre-interview setup and instructions
- **Active State**: Live interview with questions and responses
- **Completed State**: Post-interview summary and next steps

#### 3. Question Display (`QuestionDisplay`)

Dynamic question presentation supporting:

- Audio playback controls
- Coding challenge interface
- System design prompts
- Behavioral question forms
- Response validation and submission

#### 4. Audio Player (`AudioPlayer`)

Professional audio controls with:

- Play/pause functionality
- Seek/scrub controls
- Volume adjustment
- Progress visualization
- Error handling for audio loading

## 🔧 Setup and Configuration

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd interview-platform

# Install dependencies
npm install

# Run development server
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
SERVER_URL=http://localhost:3001
```

## 📡 Backend Integration

### API Endpoints Expected

#### Session Management

```typescript
GET / api / interview / sessions / { sessionId };
// Returns: InterviewSession object with questions and metadata

PATCH / api / interview / sessions / { sessionId } / status;
// Body: { status: 'waiting' | 'in-progress' | 'completed' | 'paused' }
// Updates session status
```

#### Question Management

```typescript
GET / api / interview / sessions / { sessionId } / questions / { index };
// Returns: InterviewQuestion object or 404 if no more questions

POST / api / interview / sessions / { sessionId } / responses;
// Body: InterviewResponse object
// Saves user response and advances session
```

#### Audio Resources

```typescript
GET / api / audio / { audioFileName };
// Returns: Audio file stream
// Supports various audio formats (mp3, wav, etc.)
```

### Mock Data

For development, the platform includes comprehensive mock data:

- Sample interview sessions
- Various question types
- Mock audio URLs with fallback silent audio
- Realistic user progression scenarios

## 🎯 Question Types

### 1. Audio-Only Questions

- Pure listening comprehension
- Behavioral interview questions
- General discussion topics

### 2. Coding Challenges

- Algorithm problems
- Data structure questions
- Language-specific challenges
- Real-time code execution and testing

### 3. System Design

- Architecture questions
- Scalability discussions
- Technology selection scenarios

### 4. Behavioral Questions

- Experience-based queries
- Situational questions
- Team collaboration scenarios

## 🎨 UI/UX Features

### Design System

- Modern glassmorphism effects
- Gradient color schemes
- Responsive breakpoints
- Dark mode support
- Accessibility features

### Interactive Elements

- Smooth animations and transitions
- Real-time feedback indicators
- Progress visualization
- Loading states and error handling

### Audio Experience

- Waveform visualization concepts
- Intuitive playback controls
- Volume level indicators
- Audio loading states

## 🔧 Development

### Key Technologies

- **Next.js 15**: React framework with App Router
- **React 19**: Latest React features and hooks
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Modern component library
- **Monaco Editor**: VS Code-quality code editing
- **Lucide React**: Beautiful icon system

### Code Quality

- ESLint configuration
- TypeScript strict mode
- Component composition patterns
- Custom hook patterns
- Error boundary implementation

## 🚦 Usage Flow

### For Candidates

1. **Start Session**: Navigate to interview URL
2. **Pre-Interview**: Review instructions and test audio
3. **Question Flow**: Listen to audio → Respond → Submit → Next
4. **Coding Challenges**: Use integrated editor for programming questions
5. **Completion**: Review summary and next steps

### For Interviewers (Future)

- Session monitoring dashboard
- Real-time response viewing
- Performance analytics
- Custom question creation

## 🔮 Future Enhancements

### Planned Features

- **Real-time Collaboration**: Live code sharing between interviewer and candidate
- **AI Feedback**: Automated code review and suggestions
- **Video Recording**: Session recording for later review
- **Analytics Dashboard**: Detailed performance metrics
- **Custom Question Banks**: Organization-specific question sets
- **Integration APIs**: Connect with ATS and HR systems

### Technical Improvements

- WebRTC for real-time communication
- WebSocket for live collaboration
- Machine learning for adaptive questioning
- Advanced code execution environments
- Multi-language internationalization

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests for any improvements.

---

## Quick Start for Testing

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:3001`
3. Go to `/auth/login` to access the authentication system
4. After login, visit `/dashboard` to see the main interface
5. Click "Start Interview" to begin a session
6. Test with a sample session URL: `http://localhost:3001/interview/sample-session-123`

The platform includes comprehensive mock data and fallback systems to provide a full experience even without a backend API.
