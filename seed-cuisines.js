const Database = require('./database');

const db = new Database();

// Initial cuisines to add
const initialCuisines = [
  { name: 'Korean', description: 'Traditional Korean dishes with bold flavors and fermented ingredients' },
  { name: 'Filipino', description: 'Filipino cuisine featuring rice, coconut, and tropical ingredients' },
  { name: 'Japanese', description: 'Japanese cuisine emphasizing fresh ingredients and umami flavors' },
  { name: 'Thai', description: 'Thai cuisine known for its balance of sweet, sour, salty, and spicy flavors' },
  { name: 'Chinese', description: 'Diverse Chinese regional cuisines with various cooking techniques' },
  { name: 'Vietnamese', description: 'Vietnamese cuisine featuring fresh herbs, rice noodles, and pho' },
  { name: 'Indian', description: 'Rich Indian cuisine with aromatic spices and diverse regional styles' },
  { name: 'Italian', description: 'Classic Italian cuisine focusing on quality ingredients and simplicity' },
  { name: 'Mexican', description: 'Mexican cuisine with bold spices, corn, beans, and peppers' },
  { name: 'Mediterranean', description: 'Mediterranean diet with olive oil, fresh vegetables, and seafood' }
];

async function seedCuisines() {
  console.log('Seeding cuisines...');
  
  try {
    for (const cuisine of initialCuisines) {
      await new Promise((resolve, reject) => {
        db.addCuisine(cuisine, function(err) {
          if (err && !err.message.includes('UNIQUE constraint failed')) {
            reject(err);
          } else {
            if (err) {
              console.log(`Cuisine '${cuisine.name}' already exists, skipping...`);
            } else {
              console.log(`Added cuisine: ${cuisine.name}`);
            }
            resolve();
          }
        });
      });
    }
    
    console.log('Cuisines seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding cuisines:', error);
  } finally {
    db.close();
  }
}

// Run the seeding function
seedCuisines();