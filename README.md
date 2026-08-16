# 🍊CheapChomp
 
CheapChomp is a recipe search and budget app that helps users find recipes based on food in their pantry and estimates costs for the missing ingredients

![CheapChomp Dashboard Demo](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExemdxdG1zczBkM2p1Yjc3bGVwbG8xMzR2Yml6YmRhODltdWhmdW1pZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/p7uRVV47h1Nb2pLCY8/giphy.gif)
![CheapChomp Recipe Page Demo](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTZtb29kM3Q3czV2cjhjNmsyZ3g4Mmd6MXJyZHN1ajQwNGRwMm01NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dewJE6Xag0a1F6niWW/giphy.gif)

🔗 **Live demo:** [https://cheapchomp.netlify.app](https://cheapchomp.netlify.app)

## Features

- 🥫 Pantry management — track what ingredients you already have
- 🔍 Recipe search powered by the Edamam API
- ❤️ LLM-based (Groq) price estimation for missing ingredients
- ⭐ Save recipes to your profile
- 👤 User accounts and profiles

## Tech Stack

- **Frontend:** React
- **Backend:** Express / Node.js
- **Database:** PostgreSQL (via Supabase)
- **APIs:** Edamam (recipe data), Groq (price estimation)

## Architecture

The React frontend talks to an Express API, which handles pantry/recipe/user data through Supabase and calls out to the Edamam API for recipe search and an LLM for price estimation on missing ingredients.

## Getting Started

### Prerequisites
- Node.js
- Supabase project

### Installation

```bash
# Clone the repo
git clone https://github.com/CheapChomp/CheapChomp.git
cd cheapchomp

# Install dependencies
npm install

# Set up environment variables
# This project's secrets are managed via Doppler (private to the team).
# To run it yourself, create a .env file using the variables below,
# populated with your own Supabase project, Edamam, and Groq credentials.

# Run the app locally
npm run dev
```
### Environment Variables

| Variable | Description |
|---|---|
| `API_BASE_URL` | Backend API base URL (http://localhost:3000 for local dev) |
| `API_ID` | Edamam API application ID |
| `API_KEY` | Edamam API application key |
| `ENDPOINT_URL` | Edamam recipe search API endpoint |
| `FRONTEND_URL` | Frontend app URL (http://localhost:3001 for local dev) |
| `GROQ_API_KEY` | Groq API key, used for LLM-based ingredient price estimation |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/publishable key |
| `PORT` | Port the backend server runs on |

## Team

Built by our team "DEVilish", as a capstone project — Nick, Max, Ha, and Amara.

## License

MIT
