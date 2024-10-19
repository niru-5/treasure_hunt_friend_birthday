treasure-hunt-app/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── other assets (e.g., images)
├── src/
│   ├── components/
│   │   ├── HomePage.js         // The main page for entering the game code
│   │   ├── GamePage.js         // Page that displays questions and clues
│   │   ├── QuestionComponent.js// Component to display individual questions and clues
│   ├── assets/
│   │   ├── questions.yaml      // YAML file with questions, clues, and answers
│   │   └── codes.yaml          // YAML file with valid codes and user progress
│   ├── App.js                  // Main app file handling routing
│   ├── index.js                // Entry point for the React app
│   ├── styles/
│   │   └── App.css             // CSS for the application
│   └── utils/
│       └── yamlUtils.js        // Helper functions for handling YAML parsing
├── package.json
├── README.md
└── node_modules/
