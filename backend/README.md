# AI Transcription App Backend

This is the backend server for the AI Transcription application, built with Node.js, Express, and TypeScript.

## Features

- User authentication (signup/login)
- JWT-based authentication
- MongoDB database integration
- TypeScript support
- RESTful API endpoints

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ai-transcription
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

## Testing

Run tests:
```bash
npm test
```

## License

MIT 