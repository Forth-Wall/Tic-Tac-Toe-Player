# 🎮 Tic Tac Toe Player

A simple, interactive Tic Tac Toe game built with React. Play against a basic AI opponent that makes strategic moves to win or block you. Designed for quick matches and clean gameplay.

## 🚀 Features

- ✅ Player vs AI gameplay
- 🧠 AI logic that tries to win or block the player
- 🎲 Random symbol assignment (X or O)
- 🖱️ Click-based board interaction
- 🔄 Restart button to reset the game
- 📱 Responsive layout using Tailwind CSS

## 🛠️ Technologies Used

- React (Functional Components + Hooks)
- JavaScript (ES6+)
- Tailwind CSS
- Git & GitHub for version control

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/Forth-Wall/Tic-Tac-Toe-Player.git
cd Tic-Tac-Toe-Player
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

## 🧠 How the AI Works
The AI follows a simple strategy:

Try to win: If it can complete a winning combination, it does.

Block the player: If the player is about to win, it blocks.

Pick randomly: If no immediate threat or opportunity, it chooses a random empty square.

The AI stops making moves once the game is won or drawn.

## 📄 License
This project is licensed under the Apache 2.0 License. See LICENSE to learn more.

Made with ❤️ by Forth-Wall
