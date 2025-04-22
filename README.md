
# Event Management App

A Vue 3 application with authentication, event management, and user assignment features.

### Features

- ✅ User authentication (login/registration)
- 🗓️ Event creation, editing, and deletion
- 👥 User assignment to events
- 📱 Responsive design with Tailwind CSS
- 🏪 State management with Pinia
- 🔌 API integration with Axios


### Requirements

- Before you begin, ensure you have met the following requirements:

- Node.js 16.x or higher
- npm 8.x or higher

### Installation

- Clone the repo - `git clone https://github.com/AllyDar2036/event-app.git`.
- Install project dependencies — `npm install`.
- Create `.env` file - `cp .env.example .env`.
- Launch the app — `npm run dev`, it will become available at [http://localhost:5173]


### Add your environment variables

- VITE_API_BASE_URL=http://localhost:8000/api

### Project Structure

src/
├── api/               # API services
├── assets/            # Static assets
├── components/        # Reusable components
├── router/            # Vue router configuration
├── stores/            # Pinia stores
├── views/             # Page components
├── App.vue            # Main app component
└── main.js            # Application entry point
