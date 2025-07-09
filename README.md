# 🍽️ Korean & Filipino Recipe App

A full-stack web application for managing restaurant recipes with intelligent ingredient scaling, AI-powered recipe recommendations, and reverse ingredient lookup. Specialized for Korean and Filipino cuisines.

## ✨ Features

- **📊 Smart Ingredient Scaling**: Automatically scales ingredient quantities based on serving size with fraction conversion (e.g., 1.5 → "1 1/2")
- **🔍 Reverse Ingredient Lookup**: Input available ingredients → get recipe suggestions
- **🎯 Dual Search Modes**: 
  - **Partial Match**: Find recipes containing ANY of the selected ingredients
  - **Exclusive Match**: Find recipes containing ALL selected ingredients
- **🌏 Multi-Cuisine Support**: Dynamic cuisine management with focus on Korean and Filipino dishes
- **✏️ Recipe Management**: Add, edit, and delete recipes with ingredients
- **🏷️ Cuisine Management**: Add and manage different cuisine types
- **📱 Responsive Design**: Works on desktop and mobile devices
- **🔄 Real-time Updates**: Live ingredient list updates when recipes are modified

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js, SQLite3
- **Frontend**: React.js, CSS3
- **Database**: SQLite with relational schema
- **Scaling Algorithm**: Custom fraction conversion system

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## 🚀 Installation & Setup

### 1. Clone or Download
```bash
# If using git
git clone <repository-url>
cd recipe-app

# Or download and extract the project files
```

### 2. Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 3. Initialize Database
The SQLite database will be automatically created when you first run the server. It includes:
- Sample recipes (Kimchi Fried Rice, Bibimbap, Adobo, Sinigang, Kare-Kare)
- Pre-populated ingredients
- Default cuisine types

## 🏃‍♂️ Running the Application

### Method 1: Development Mode (Recommended)

**Terminal 1 - Backend Server:**
```bash
npm start
```
This starts the API server on `http://localhost:3002`

**Terminal 2 - Frontend Development Server:**
```bash
cd client
PORT=3005 npm start
```
This starts the React development server on `http://localhost:3005`

### Method 2: Production Mode

1. Build the React app:
```bash
cd client
npm run build
cd ..
```

2. Start the server:
```bash
npm start
```

Visit `http://localhost:3002` to use the app.

### Method 3: Custom Ports

If you need to use different ports:

**Backend:**
```bash
PORT=8080 npm start
```

**Frontend:**
```bash
cd client
PORT=3000 npm start
```

## 🎮 Usage Guide

### 1. Browse Recipes
- View all recipes on the main page
- Filter by cuisine type using the dropdown
- Click on any recipe card to view details

### 2. Scale Recipes
- Open a recipe to see ingredients
- Use the +/- buttons or input field to change servings
- Ingredients automatically scale with smart fraction conversion
- Reset button returns to original serving size

### 3. Find Recipes by Ingredients
- Go to "Find by Ingredients" tab
- Select your available ingredients from the checklist
- Choose search mode:
  - **Partial Match**: Shows recipes with ANY selected ingredients
  - **Exclusive Match**: Shows recipes with ALL selected ingredients
- Click "Find Recipes" to see matches

### 4. Add New Recipes
- Go to "Add Recipe" tab
- Fill in recipe details (name, cuisine, description, etc.)
- Add ingredients with quantities and units
- Submit to save the recipe

### 5. Edit Recipes
- Open any recipe and click "Edit"
- Modify recipe details and ingredients
- Save changes or cancel

### 6. Manage Cuisines
- Go to "Manage Cuisines" tab
- Add new cuisine types
- Edit existing cuisine names and descriptions
- Delete unused cuisines

## 🏗️ Project Structure

```
recipe-app/
├── server.js              # Express server and API routes
├── database.js            # SQLite database class and methods
├── scaling-utils.js       # Ingredient scaling algorithms
├── package.json           # Backend dependencies
├── recipes.db             # SQLite database file (auto-created)
├── client/                # React frontend
│   ├── src/
│   │   ├── App.js        # Main React component
│   │   ├── App.css       # Application styles
│   │   └── index.js      # React entry point
│   ├── package.json      # Frontend dependencies
│   └── public/           # Static assets
└── README.md             # This file
```

## 📊 Database Schema

### Tables:
- **recipes**: Recipe information (name, cuisine, servings, etc.)
- **ingredients**: Ingredient master list
- **recipe_ingredients**: Junction table linking recipes to ingredients
- **cuisines**: Cuisine types and descriptions

## 🔧 API Endpoints

### Recipes
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/cuisine/:cuisine` - Get recipes by cuisine
- `GET /api/recipes/:id` - Get recipe details with ingredients
- `POST /api/recipes` - Add new recipe
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe
- `POST /api/recipes/:id/scale` - Scale recipe ingredients

### Ingredients
- `GET /api/ingredients` - Get all ingredients
- `GET /api/ingredients/used` - Get ingredients used in recipes
- `POST /api/recipes/find-by-ingredients` - Find recipes by ingredients

### Cuisines
- `GET /api/cuisines` - Get all cuisines
- `POST /api/cuisines` - Add new cuisine
- `PUT /api/cuisines/:id` - Update cuisine
- `DELETE /api/cuisines/:id` - Delete cuisine

## 🐛 Troubleshooting

### Port Already in Use
If you get `EADDRINUSE` errors:
```bash
# Find and kill process using the port
lsof -ti:3002 | xargs kill -9
lsof -ti:3005 | xargs kill -9
```

### Database Issues
If you encounter database errors:
```bash
# Delete the database file to recreate
rm recipes.db
npm start
```

### Missing Dependencies
```bash
# Reinstall dependencies
rm -rf node_modules client/node_modules
npm install
cd client && npm install
```

## 🎯 Sample Data

The app comes with sample recipes:
- **Korean**: Kimchi Fried Rice, Bibimbap
- **Filipino**: Adobo, Sinigang, Kare-Kare

And pre-populated ingredients like rice, soy sauce, garlic, ginger, etc.

## 🔄 Development Notes

- The app uses case-insensitive ingredient matching
- Unused ingredients are automatically hidden from the selection list
- Recipe scaling uses a smart fraction system for practical cooking measurements
- All ingredient names are normalized to lowercase for consistency

## 📝 License

This project is for educational and personal use.

## 🚀 **Deployment**

### Deploy to Render (Recommended)
1. Fork this repository on GitHub
2. Go to [render.com](https://render.com) and create an account
3. Create a new "Web Service" 
4. Connect your GitHub repository
5. Configure:
   - **Build Command**: `npm run heroku-postbuild`
   - **Start Command**: `npm start`
   - **Environment**: Node.js
6. Deploy!

### Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub repo
3. Railway will auto-detect and deploy

### Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure as Node.js project
4. Deploy!

### Local Development
```bash
# Install dependencies
npm run setup

# Start development (both servers)
npm run dev:both

# Or start separately
npm run server  # Backend on port 3002
npm run client  # Frontend on port 3000
```

### Production Build
```bash
# Build React app
npm run build

# Seed database
npm run seed

# Start production server
npm start
```

## 🌐 **Environment Variables**

Create a `.env` file for local development:
```env
PORT=3002
NODE_ENV=development
```

For production, set these environment variables in your hosting platform.

## 📁 **File Structure**
```
recipe-app/
├── server.js              # Express server
├── database.js            # Database management
├── scaling-utils.js       # Recipe scaling logic
├── seed-data.js           # Database seeding
├── uploads/               # Uploaded images (auto-created)
├── client/                # React frontend
│   ├── src/
│   │   ├── App.js        # Main React component
│   │   └── App.css       # Styling
│   └── public/           # Static files
└── README.md
```

---

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 **License**

This project is open source and available under the [MIT License](LICENSE).

---

**Happy Cooking! 🍳**

**Built with ❤️ by ICAN Startup**