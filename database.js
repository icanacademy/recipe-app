const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
  constructor() {
    this.db = new sqlite3.Database('./recipes.db');
    this.init();
  }

  init() {
    this.db.serialize(() => {
      // Create recipes table
      this.db.run(`CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        cuisine TEXT NOT NULL,
        description TEXT,
        servings INTEGER DEFAULT 4,
        prep_time INTEGER,
        cook_time INTEGER,
        instructions TEXT,
        image_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      // Add image_url column to existing recipes table if it doesn't exist
      this.db.run(`ALTER TABLE recipes ADD COLUMN image_url TEXT`, (err) => {
        if (err && !err.message.includes('duplicate column name')) {
          console.log('Column image_url already exists or other error:', err.message);
        } else if (!err) {
          console.log('Added image_url column to recipes table');
        }
      });

      // Create ingredients table
      this.db.run(`CREATE TABLE IF NOT EXISTS ingredients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        category TEXT,
        unit TEXT
      )`);

      // Create recipe_ingredients junction table
      this.db.run(`CREATE TABLE IF NOT EXISTS recipe_ingredients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe_id INTEGER,
        ingredient_id INTEGER,
        quantity REAL,
        unit TEXT,
        FOREIGN KEY (recipe_id) REFERENCES recipes (id),
        FOREIGN KEY (ingredient_id) REFERENCES ingredients (id)
      )`);

      // Create cuisines table
      this.db.run(`CREATE TABLE IF NOT EXISTS cuisines (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);
    });
  }

  // Recipe methods
  getAllRecipes(callback) {
    this.db.all("SELECT * FROM recipes", callback);
  }

  getRecipesByCuisine(cuisine, callback) {
    this.db.all("SELECT * FROM recipes WHERE cuisine = ?", [cuisine], callback);
  }

  getRecipeById(id, callback) {
    this.db.get("SELECT * FROM recipes WHERE id = ?", [id], callback);
  }

  getRecipeIngredients(recipeId, callback) {
    const query = `
      SELECT ri.quantity, ri.unit, i.name, i.category
      FROM recipe_ingredients ri
      JOIN ingredients i ON ri.ingredient_id = i.id
      WHERE ri.recipe_id = ?
    `;
    this.db.all(query, [recipeId], callback);
  }

  addRecipe(recipe, callback) {
    const { name, cuisine, description, servings, prep_time, cook_time, instructions, image_url } = recipe;
    this.db.run(
      "INSERT OR IGNORE INTO recipes (name, cuisine, description, servings, prep_time, cook_time, instructions, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [name, cuisine, description, servings, prep_time, cook_time, instructions, image_url || null],
      callback
    );
  }

  // Ingredient methods
  getAllIngredients(callback) {
    this.db.all("SELECT * FROM ingredients ORDER BY name", callback);
  }

  // Get only ingredients that are used in recipes
  getUsedIngredients(callback) {
    const query = `
      SELECT DISTINCT i.* 
      FROM ingredients i 
      INNER JOIN recipe_ingredients ri ON i.id = ri.ingredient_id 
      ORDER BY i.name
    `;
    this.db.all(query, callback);
  }

  addIngredient(ingredient, callback) {
    const { name, category, unit } = ingredient;
    // Convert name to lowercase for consistency
    const normalizedName = name.toLowerCase().trim();
    this.db.run(
      "INSERT OR IGNORE INTO ingredients (name, category, unit) VALUES (?, ?, ?)",
      [normalizedName, category, unit],
      callback
    );
  }

  // Recipe-ingredient relationship methods
  addRecipeIngredient(recipeId, ingredientId, quantity, unit, callback) {
    this.db.run(
      "INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES (?, ?, ?, ?)",
      [recipeId, ingredientId, quantity, unit],
      callback
    );
  }

  // Update recipe methods
  updateRecipe(id, recipe, callback) {
    const { name, cuisine, description, servings, prep_time, cook_time, instructions, image_url } = recipe;
    this.db.run(
      "UPDATE recipes SET name = ?, cuisine = ?, description = ?, servings = ?, prep_time = ?, cook_time = ?, instructions = ?, image_url = ? WHERE id = ?",
      [name, cuisine, description, servings, prep_time, cook_time, instructions, image_url || null, id],
      callback
    );
  }

  deleteRecipeIngredients(recipeId, callback) {
    this.db.run("DELETE FROM recipe_ingredients WHERE recipe_id = ?", [recipeId], callback);
  }

  deleteRecipe(id, callback) {
    // First delete recipe ingredients, then the recipe itself
    this.deleteRecipeIngredients(id, (err) => {
      if (err) {
        callback(err);
        return;
      }
      // Then delete the recipe
      this.db.run("DELETE FROM recipes WHERE id = ?", [id], callback);
    });
  }

  // Find recipes by available ingredients (partial match - ANY ingredients)
  findRecipesByIngredients(ingredientIds, callback) {
    const placeholders = ingredientIds.map(() => '?').join(',');
    const query = `
      SELECT r.*, COUNT(ri.ingredient_id) as matched_ingredients
      FROM recipes r
      JOIN recipe_ingredients ri ON r.id = ri.recipe_id
      WHERE ri.ingredient_id IN (${placeholders})
      GROUP BY r.id
      ORDER BY matched_ingredients DESC
    `;
    this.db.all(query, ingredientIds, callback);
  }

  // Find recipes that contain ALL selected ingredients (exclusive match)
  findRecipesByAllIngredients(ingredientIds, callback) {
    const placeholders = ingredientIds.map(() => '?').join(',');
    const ingredientCount = ingredientIds.length;
    const query = `
      SELECT r.*, COUNT(ri.ingredient_id) as matched_ingredients,
             COUNT(total_ri.ingredient_id) as total_ingredients
      FROM recipes r
      JOIN recipe_ingredients ri ON r.id = ri.recipe_id
      JOIN recipe_ingredients total_ri ON r.id = total_ri.recipe_id
      WHERE ri.ingredient_id IN (${placeholders})
      GROUP BY r.id
      HAVING COUNT(DISTINCT ri.ingredient_id) = ?
      ORDER BY total_ingredients ASC, matched_ingredients DESC
    `;
    this.db.all(query, [...ingredientIds, ingredientCount], callback);
  }

  // Cuisine methods
  getAllCuisines(callback) {
    this.db.all("SELECT * FROM cuisines ORDER BY name", callback);
  }

  addCuisine(cuisine, callback) {
    const { name, description } = cuisine;
    this.db.run(
      "INSERT OR IGNORE INTO cuisines (name, description) VALUES (?, ?)",
      [name, description || ''],
      callback
    );
  }

  updateCuisine(id, cuisine, callback) {
    const { name, description } = cuisine;
    this.db.run(
      "UPDATE cuisines SET name = ?, description = ? WHERE id = ?",
      [name, description || '', id],
      callback
    );
  }

  deleteCuisine(id, callback) {
    this.db.run("DELETE FROM cuisines WHERE id = ?", [id], callback);
  }

  close() {
    this.db.close();
  }
}

module.exports = Database;