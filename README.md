# Interview Prep Vault

A state-of-the-art interview preparation platform designed to help developers master coding problems and system design concepts. Built with modern web technologies, it offers an interactive and immersive learning experience.

## 🚀 Features

- **Interactive Code Editor**: A powerful Monaco-based editor with syntax highlighting and multi-language support.
- **AI Guidance**: Integrated AI assistant (powered by Gemini) to provide hints, code reviews, and complexity analysis without spoiling the solution.
- **Comprehensive Problem Set**: Curated collection of coding problems with detailed descriptions, test cases, and solutions.
- **Progress Tracking**: Visual progress indicators to track your journey through different topics.
- **System Design**: Dedicated section for system design concepts and resources.
- **Responsive Design**: Beautiful, dark-mode first UI that works seamlessly across devices.

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom animations
- **State Management**: React Context API
- **Testing**: [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/)
- **Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- **AI Integration**: Google Generative AI SDK

## 📂 Project Structure

```
src/
├── components/     # Reusable UI components
├── content/        # Markdown content for problems
├── context/        # React Context providers (Theme, Progress)
├── lib/            # Utility functions and services (AI, Logger)
├── pages/          # Application pages (Home, ProblemDetail)
├── types/          # TypeScript type definitions
└── App.tsx         # Main application component

tests/
├── unit/           # Unit tests for logic and utilities
├── system/         # Integration tests for app routing
└── UI/             # Component and interaction tests
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kraken-learns/interview-prep-vault.git
   ```

2. Navigate to the project directory:
   ```bash
   cd interview-prep-vault
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/interview-prep-vault/`.

## 🧪 Testing

This project uses a comprehensive test suite to ensure reliability and code quality.

### Running Tests

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run coverage
```

### Test Structure

- **Unit Tests**: Verify individual functions and services in isolation.
- **System Tests**: Ensure high-level application flows (like routing) work as expected.
- **UI Tests**: Validate component rendering and user interactions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
