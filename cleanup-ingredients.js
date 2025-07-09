const Database = require('./database');

const db = new Database();

async function cleanupIngredients() {
  console.log('Cleaning up ingredients database...');
  
  try {
    // Get all current ingredients
    const allIngredients = await new Promise((resolve, reject) => {
      db.getAllIngredients((err, ingredients) => {
        if (err) reject(err);
        else resolve(ingredients);
      });
    });
    
    console.log(`Found ${allIngredients.length} ingredients`);
    
    // Find duplicates (case variations)
    const nameGroups = {};
    allIngredients.forEach(ingredient => {
      const normalizedName = ingredient.name.toLowerCase().trim();
      if (!nameGroups[normalizedName]) {
        nameGroups[normalizedName] = [];
      }
      nameGroups[normalizedName].push(ingredient);
    });
    
    // Process each group
    for (const [normalizedName, group] of Object.entries(nameGroups)) {
      if (group.length > 1) {
        console.log(`\nFound duplicates for "${normalizedName}":`, group.map(g => g.name));
        
        // Keep the first one, merge others
        const keepIngredient = group[0];
        const mergeIngredients = group.slice(1);
        
        // Update all recipe_ingredients to use the kept ingredient
        for (const mergeIngredient of mergeIngredients) {
          await new Promise((resolve, reject) => {
            db.db.run(
              "UPDATE recipe_ingredients SET ingredient_id = ? WHERE ingredient_id = ?",
              [keepIngredient.id, mergeIngredient.id],
              (err) => {
                if (err) reject(err);
                else resolve();
              }
            );
          });
          
          // Delete the duplicate ingredient
          await new Promise((resolve, reject) => {
            db.db.run("DELETE FROM ingredients WHERE id = ?", [mergeIngredient.id], (err) => {
              if (err) reject(err);
              else resolve();
            });
          });
          
          console.log(`  Merged "${mergeIngredient.name}" into "${keepIngredient.name}"`);
        }
        
        // Update the kept ingredient name to be lowercase
        await new Promise((resolve, reject) => {
          db.db.run(
            "UPDATE ingredients SET name = ? WHERE id = ?",
            [normalizedName, keepIngredient.id],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        });
        
        console.log(`  Normalized "${keepIngredient.name}" to "${normalizedName}"`);
      } else if (group[0].name !== normalizedName) {
        // Single ingredient but needs normalization
        await new Promise((resolve, reject) => {
          db.db.run(
            "UPDATE ingredients SET name = ? WHERE id = ?",
            [normalizedName, group[0].id],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        });
        console.log(`Normalized "${group[0].name}" to "${normalizedName}"`);
      }
    }
    
    // Remove unused ingredients (not in any recipe)
    const unusedIngredients = await new Promise((resolve, reject) => {
      db.db.all(`
        SELECT i.* FROM ingredients i 
        LEFT JOIN recipe_ingredients ri ON i.id = ri.ingredient_id 
        WHERE ri.ingredient_id IS NULL
      `, (err, ingredients) => {
        if (err) reject(err);
        else resolve(ingredients);
      });
    });
    
    console.log(`\nFound ${unusedIngredients.length} unused ingredients`);
    for (const ingredient of unusedIngredients) {
      await new Promise((resolve, reject) => {
        db.db.run("DELETE FROM ingredients WHERE id = ?", [ingredient.id], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      console.log(`Removed unused ingredient: "${ingredient.name}"`);
    }
    
    console.log('\nIngredients cleanup completed!');
    
    // Show final count
    const finalIngredients = await new Promise((resolve, reject) => {
      db.getUsedIngredients((err, ingredients) => {
        if (err) reject(err);
        else resolve(ingredients);
      });
    });
    
    console.log(`\nFinal ingredient count: ${finalIngredients.length}`);
    console.log('Used ingredients:', finalIngredients.map(i => i.name).join(', '));
    
  } catch (error) {
    console.error('Error during cleanup:', error);
  } finally {
    db.close();
  }
}

cleanupIngredients();