# Frontend Application

## 🚀 Project Overview

This is the frontend of the application built to interact with the backend API. It is responsible for rendering the user interface and handling user interactions. The main essence of the application lies in the fact that various animals and birds wearing pantsuits are presented along a large picture of the central figure - the main pig. The user of the site can interact with these animals and the image of the main pig.

## 📦 Installation

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (>= 16.x.x)
- **npm** (comes with Node.js) or **yarn**

### Clone the Repository

```bash
git clone https://github.com/lukaakhalkatsi/AnimalFarmFront.git
cd your-frontend-repo
```

### Install Dependencies

```bash
npm install
# OR
yarn install
```

## 🏗️ Project Structure

```
├── src/              # Main source code
│   ├── app/         # Angular application modules
│   │   ├── components/  # Reusable components
│   │   ├── services/     # API calls and data handling
│   │   ├── app.component.html # Root component
│   │   ├── app.component.ts # Root component
│   │   ├── app.config.ts # Root configuration
│   ├── assets/       # Static assets (e.g., images, styles)
│   ├── environments/ # Environment configurations
│   ├── main.ts       # Main entry point
│   ├── styles.css    # Global styles
│
├── angular.json      # Angular project configuration
├── package.json      # Project dependencies & scripts
├── README.md         # Project documentation
```

## 🔧 Configuration

### Environment Variables

Create a `env` folder in the src and configure the required variables

## 🚀 Running the Project

### Development Mode

```bash
npm start
# OR
yarn start
```

Runs the app in development mode. Open `http://localhost:3000/` to view it in the browser.

### Production Build

```bash
npm run build
# OR
yarn build
```

Creates an optimized production build of the app.

## 🌍 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Run deployment command:
   ```bash
   vercel
   ```

### Deploy to Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
2. Run deployment command:
   ```bash
   netlify deploy
   ```

## 📜 API Endpoints Used

| Method | Endpoint                 | Description            |
| ------ | ------------------------ | ---------------------- |
| GET    | `/api/animals`           | Fetches animals list   |
| POST   | `/api/animals/{id}/feed` | Feeding Animals        |
| GET    | `/api/bidzina/status`    | Fetches bidzina status |
| POST   | `/api/music/toggle`      | Toggles music state    |

## ✨ Features

- 🎨 Modern UI
- 🔥 Fast and Responsive
- 📡 API Integration
- 🚀 Deployed and Ready for Production

## 🛠️ Technologies Used

- **Angular** (Frontend Framework)
- **CSS** (Styling)
- **Unit Tests** (For Testing)

## 🤝 Contributing

Feel free to contribute by submitting pull requests or reporting issues.

## 📄 License

This project is licensed under the MIT License.
