# Reflection Machine

An AI-powered reflection tool that combines LangChain's React agent with emotional intelligence inspired by "Inside Out". This application generates thoughtful reflections on any topic through different emotional lenses.

## Features

- 🤖 LangChain React Agent for intelligent thought processing
- 🎭 "Inside Out" inspired personality system
- 💾 Persistent thought storage with SQLite
- 🎮 RPG-style user interface
- ⚡ Real-time thought process visualization

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key for LangChain integration

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables in `.env`:
```env
OPENAI_API_KEY=your_key_here
```

4. Initialize the database:
```bash
npm run db:setup
```

### Running the Application

Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Testing

Run end-to-end tests:
```bash
npm run test:e2e
```

## Architecture

### Core Components

1. **LangChain React Agent**
   - Processes user prompts through emotional lenses
   - Generates step-by-step thought processes
   - Stores intermediate thoughts for transparency

2. **Personality System**
   - Based on "Inside Out" emotions: Joy, Sadness, Anger, Fear, and Disgust
   - Customizable emotion levels influence reflection style
   - Profile management for different thinking styles

3. **Database Structure**
   - SQLite with Prisma ORM
   - Models: Thoughts, Prompts, and PersonalitySettings
   - Optimized with indexes for better performance

4. **User Interface**
   - Built with Next.js and shadcn/ui components
   - RPG-style interface for engagement
   - Real-time thought process visualization

## Usage

### Creating a Reflection

1. Navigate to the reflection page
2. Enter your topic or question
3. Watch as the AI thinks through different emotional perspectives
4. Receive a final reflection influenced by the active personality profile

### Managing Personalities

1. Visit the personalities page
2. Create new personality profiles or modify existing ones
3. Adjust emotion levels using sliders
4. Set active profile for reflections

## Performance Optimization

- Database indexing on frequently queried fields
- Efficient thought storage with intermediate steps
- React component optimization with proper hooks usage
- Streamlined database queries with Prisma

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by Pixar's "Inside Out"
- Built with [LangChain](https://langchain.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
