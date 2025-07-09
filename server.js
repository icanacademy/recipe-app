const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const Database = require('./database');
const { scaleIngredients } = require('./scaling-utils');

const app = express();
const PORT = process.env.PORT || 3002;
const db = new Database();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'recipe-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check if file is an image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve uploaded images
app.use('/uploads', express.static(uploadsDir));

// Serve static files from React app
app.use(express.static(path.join(__dirname, 'client/build')));

// API Routes

// Get all recipes
app.get('/api/recipes', (req, res) => {
  db.getAllRecipes((err, recipes) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(recipes);
  });
});

// Get recipes by cuisine
app.get('/api/recipes/cuisine/:cuisine', (req, res) => {
  const cuisine = req.params.cuisine;
  db.getRecipesByCuisine(cuisine, (err, recipes) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(recipes);
  });
});

// Get recipe by ID with ingredients
app.get('/api/recipes/:id', (req, res) => {
  const recipeId = req.params.id;
  
  db.getRecipeById(recipeId, (err, recipe) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (!recipe) {
      res.status(404).json({ error: 'Recipe not found' });
      return;
    }
    
    db.getRecipeIngredients(recipeId, (err, ingredients) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      res.json({
        ...recipe,
        ingredients: ingredients
      });
    });
  });
});

// Scale recipe ingredients
app.post('/api/recipes/:id/scale', (req, res) => {
  const recipeId = req.params.id;
  const { servings } = req.body;
  
  db.getRecipeById(recipeId, (err, recipe) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (!recipe) {
      res.status(404).json({ error: 'Recipe not found' });
      return;
    }
    
    db.getRecipeIngredients(recipeId, (err, ingredients) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      const scaledIngredients = scaleIngredients(ingredients, recipe.servings, servings);
      
      res.json({
        ...recipe,
        servings: servings,
        ingredients: scaledIngredients
      });
    });
  });
});

// Get all ingredients
app.get('/api/ingredients', (req, res) => {
  db.getAllIngredients((err, ingredients) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(ingredients);
  });
});

// Get only ingredients used in recipes
app.get('/api/ingredients/used', (req, res) => {
  db.getUsedIngredients((err, ingredients) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(ingredients);
  });
});

// Find recipes by available ingredients
app.post('/api/recipes/find-by-ingredients', (req, res) => {
  const { ingredientIds, searchMode } = req.body;
  
  if (!ingredientIds || ingredientIds.length === 0) {
    res.status(400).json({ error: 'Ingredient IDs are required' });
    return;
  }
  
  // Choose search method based on mode
  const searchMethod = searchMode === 'exclusive' ? 
    db.findRecipesByAllIngredients.bind(db) : 
    db.findRecipesByIngredients.bind(db);
  
  searchMethod(ingredientIds, (err, recipes) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(recipes);
  });
});

// Add new recipe with ingredients
app.post('/api/recipes', upload.single('image'), async (req, res) => {
  const { recipe: recipeData, ingredients: ingredientsData } = req.body;
  const recipe = typeof recipeData === 'string' ? JSON.parse(recipeData) : recipeData;
  const ingredients = typeof ingredientsData === 'string' ? JSON.parse(ingredientsData) : ingredientsData;
  
  // Add image URL if file was uploaded
  if (req.file) {
    recipe.image_url = `/uploads/${req.file.filename}`;
  }
  
  try {
    // Add recipe
    const recipeId = await new Promise((resolve, reject) => {
      db.addRecipe(recipe, function(err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
    
    // Add ingredients for this recipe
    if (ingredients && ingredients.length > 0) {
      for (const ingredient of ingredients) {
        // Add ingredient to ingredients table if it doesn't exist
        await new Promise((resolve, reject) => {
          db.addIngredient(
            { name: ingredient.name, category: ingredient.category || 'other', unit: ingredient.unit },
            function(ingredientErr) {
              // Ignore unique constraint errors (ingredient already exists)
              if (ingredientErr && !ingredientErr.message.includes('UNIQUE constraint failed')) {
                reject(ingredientErr);
              } else {
                resolve();
              }
            }
          );
        });
        
        // Get the ingredient ID (case-insensitive)
        const ingredientRow = await new Promise((resolve, reject) => {
          db.db.get("SELECT id FROM ingredients WHERE LOWER(name) = LOWER(?)", [ingredient.name.trim()], (err, row) => {
            if (err) reject(err);
            else resolve(row);
          });
        });
        
        if (ingredientRow) {
          // Add recipe-ingredient relationship
          await new Promise((resolve, reject) => {
            db.addRecipeIngredient(recipeId, ingredientRow.id, ingredient.quantity, ingredient.unit, (err) => {
              if (err) reject(err);
              else resolve();
            });
          });
        }
      }
    }
    
    res.json({ id: recipeId, message: 'Recipe added successfully' });
    
  } catch (error) {
    console.error('Error adding recipe:', error);
    res.status(500).json({ error: error.message || 'Failed to add recipe' });
  }
});

// Update existing recipe with ingredients
app.put('/api/recipes/:id', upload.single('image'), async (req, res) => {
  const recipeId = req.params.id;
  const { recipe: recipeData, ingredients: ingredientsData } = req.body;
  const recipe = typeof recipeData === 'string' ? JSON.parse(recipeData) : recipeData;
  const ingredients = typeof ingredientsData === 'string' ? JSON.parse(ingredientsData) : ingredientsData;
  
  // Add image URL if file was uploaded
  if (req.file) {
    recipe.image_url = `/uploads/${req.file.filename}`;
  }
  
  try {
    // Update recipe
    await new Promise((resolve, reject) => {
      db.updateRecipe(recipeId, recipe, function(err) {
        if (err) reject(err);
        else resolve();
      });
    });
    
    // Delete existing recipe ingredients
    await new Promise((resolve, reject) => {
      db.deleteRecipeIngredients(recipeId, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    
    // Add updated ingredients
    if (ingredients && ingredients.length > 0) {
      for (const ingredient of ingredients) {
        // Add ingredient to ingredients table if it doesn't exist
        await new Promise((resolve, reject) => {
          db.addIngredient(
            { name: ingredient.name, category: ingredient.category || 'other', unit: ingredient.unit },
            function(ingredientErr) {
              // Ignore unique constraint errors (ingredient already exists)
              if (ingredientErr && !ingredientErr.message.includes('UNIQUE constraint failed')) {
                reject(ingredientErr);
              } else {
                resolve();
              }
            }
          );
        });
        
        // Get the ingredient ID (case-insensitive)
        const ingredientRow = await new Promise((resolve, reject) => {
          db.db.get("SELECT id FROM ingredients WHERE LOWER(name) = LOWER(?)", [ingredient.name.trim()], (err, row) => {
            if (err) reject(err);
            else resolve(row);
          });
        });
        
        if (ingredientRow) {
          // Add recipe-ingredient relationship
          await new Promise((resolve, reject) => {
            db.addRecipeIngredient(recipeId, ingredientRow.id, ingredient.quantity, ingredient.unit, (err) => {
              if (err) reject(err);
              else resolve();
            });
          });
        }
      }
    }
    
    res.json({ id: recipeId, message: 'Recipe updated successfully' });
    
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ error: error.message || 'Failed to update recipe' });
  }
});

// Delete recipe
app.delete('/api/recipes/:id', (req, res) => {
  const recipeId = req.params.id;
  
  db.deleteRecipe(recipeId, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Recipe deleted successfully' });
  });
});

// Cuisine API endpoints

// Get all cuisines
app.get('/api/cuisines', (req, res) => {
  db.getAllCuisines((err, cuisines) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(cuisines);
  });
});

// Add new cuisine
app.post('/api/cuisines', (req, res) => {
  const cuisine = req.body;
  db.addCuisine(cuisine, function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        res.status(400).json({ error: 'Cuisine already exists' });
      } else {
        res.status(500).json({ error: err.message });
      }
      return;
    }
    res.json({ id: this.lastID, message: 'Cuisine added successfully' });
  });
});

// Update cuisine
app.put('/api/cuisines/:id', (req, res) => {
  const cuisineId = req.params.id;
  const cuisine = req.body;
  
  db.updateCuisine(cuisineId, cuisine, function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        res.status(400).json({ error: 'Cuisine name already exists' });
      } else {
        res.status(500).json({ error: err.message });
      }
      return;
    }
    res.json({ id: cuisineId, message: 'Cuisine updated successfully' });
  });
});

// Delete cuisine
app.delete('/api/cuisines/:id', (req, res) => {
  const cuisineId = req.params.id;
  
  db.deleteCuisine(cuisineId, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Cuisine deleted successfully' });
  });
});

// Catch all handler: send back React's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Recipe App Server is running on port ${PORT}`);
  console.log(`📱 API endpoints available at: http://localhost:${PORT}/api`);
  console.log(`🌐 Frontend should be served from: http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  db.close();
  process.exit(0);
});