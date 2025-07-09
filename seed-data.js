const Database = require('./database');

const db = new Database();

// Sample Korean and Filipino recipes with ingredients
const sampleData = {
  cuisines: [
    { name: 'Korean', description: 'Traditional Korean cuisine featuring fermented foods, grilled meats, and spicy flavors' },
    { name: 'Filipino', description: 'Filipino cuisine with Spanish, Chinese, and Malay influences, known for sweet and savory combinations' },
    { name: 'Japanese', description: 'Japanese cuisine emphasizing fresh ingredients, seasonality, and umami flavors' },
    { name: 'Thai', description: 'Thai cuisine known for its balance of sweet, sour, salty, and spicy flavors' },
    { name: 'Vietnamese', description: 'Vietnamese cuisine featuring fresh herbs, light broths, and rice-based dishes' },
    { name: 'Chinese', description: 'Chinese cuisine with diverse regional styles and cooking techniques' },
    { name: 'Indian', description: 'Indian cuisine with rich spices, curries, and diverse regional variations' },
    { name: 'Italian', description: 'Italian cuisine featuring pasta, pizza, and Mediterranean ingredients' },
    { name: 'Mexican', description: 'Mexican cuisine with corn, beans, chili peppers, and complex flavor combinations' },
    { name: 'American', description: 'American comfort food and regional specialties' }
  ],
  
  ingredients: [
    // Korean ingredients
    { name: 'kimchi', category: 'vegetables', unit: 'cup' },
    { name: 'gochujang', category: 'condiments', unit: 'tablespoon' },
    { name: 'soy sauce', category: 'condiments', unit: 'tablespoon' },
    { name: 'sesame oil', category: 'oils', unit: 'tablespoon' },
    { name: 'garlic', category: 'vegetables', unit: 'clove' },
    { name: 'ginger', category: 'vegetables', unit: 'tablespoon' },
    { name: 'rice', category: 'grains', unit: 'cup' },
    { name: 'beef', category: 'meat', unit: 'pound' },
    { name: 'tofu', category: 'protein', unit: 'block' },
    { name: 'egg', category: 'protein', unit: 'piece' },
    { name: 'green onion', category: 'vegetables', unit: 'stalk' },
    { name: 'carrot', category: 'vegetables', unit: 'piece' },
    { name: 'spinach', category: 'vegetables', unit: 'cup' },
    { name: 'mushroom', category: 'vegetables', unit: 'cup' },
    { name: 'onion', category: 'vegetables', unit: 'piece' },
    { name: 'napa cabbage', category: 'vegetables', unit: 'head' },
    { name: 'rice vinegar', category: 'condiments', unit: 'tablespoon' },
    { name: 'sugar', category: 'condiments', unit: 'tablespoon' },
    { name: 'korean chili flakes', category: 'spices', unit: 'tablespoon' },
    { name: 'miso paste', category: 'condiments', unit: 'tablespoon' },
    { name: 'vegetable oil', category: 'oils', unit: 'tablespoon' },
    { name: 'rice wine', category: 'condiments', unit: 'tablespoon' },
    { name: 'beef short ribs', category: 'meat', unit: 'pound' },
    { name: 'asian pear', category: 'fruits', unit: 'piece' },
    { name: 'corn starch', category: 'grains', unit: 'tablespoon' },
    { name: 'bean sprouts', category: 'vegetables', unit: 'cup' },
    { name: 'cucumber', category: 'vegetables', unit: 'piece' },
    { name: 'radish', category: 'vegetables', unit: 'cup' },
    { name: 'pork belly', category: 'meat', unit: 'pound' },
    { name: 'kimchi juice', category: 'condiments', unit: 'cup' },
    
    // Filipino ingredients
    { name: 'coconut milk', category: 'dairy', unit: 'can' },
    { name: 'fish sauce', category: 'condiments', unit: 'tablespoon' },
    { name: 'pork', category: 'meat', unit: 'pound' },
    { name: 'chicken', category: 'meat', unit: 'pound' },
    { name: 'tomato', category: 'vegetables', unit: 'piece' },
    { name: 'lime', category: 'fruits', unit: 'piece' },
    { name: 'bay leaves', category: 'herbs', unit: 'piece' },
    { name: 'black pepper', category: 'spices', unit: 'teaspoon' },
    { name: 'salt', category: 'spices', unit: 'teaspoon' },
    { name: 'vinegar', category: 'condiments', unit: 'tablespoon' },
    { name: 'potato', category: 'vegetables', unit: 'piece' },
    { name: 'bell pepper', category: 'vegetables', unit: 'piece' },
    { name: 'long beans', category: 'vegetables', unit: 'cup' },
    { name: 'eggplant', category: 'vegetables', unit: 'piece' },
    { name: 'okra', category: 'vegetables', unit: 'cup' },
    { name: 'shrimp paste', category: 'condiments', unit: 'tablespoon' },
    { name: 'peanut butter', category: 'condiments', unit: 'tablespoon' },
    { name: 'tamarind', category: 'fruits', unit: 'tablespoon' },
    { name: 'rice flour', category: 'grains', unit: 'cup' },
    { name: 'coconut', category: 'fruits', unit: 'cup' },
    { name: 'calamansi', category: 'fruits', unit: 'piece' },
    { name: 'lemongrass', category: 'herbs', unit: 'stalk' },
    { name: 'bok choy', category: 'vegetables', unit: 'head' },
    { name: 'water spinach', category: 'vegetables', unit: 'bunch' },
    { name: 'taro', category: 'vegetables', unit: 'cup' },
    { name: 'banana', category: 'fruits', unit: 'piece' },
    { name: 'shrimp', category: 'seafood', unit: 'pound' },
    { name: 'milkfish', category: 'seafood', unit: 'whole' },
    { name: 'annatto seeds', category: 'spices', unit: 'tablespoon' },
    { name: 'coconut oil', category: 'oils', unit: 'tablespoon' },
    { name: 'banana leaves', category: 'herbs', unit: 'piece' },
    { name: 'galangal', category: 'vegetables', unit: 'piece' },
    { name: 'lemon', category: 'fruits', unit: 'piece' },
    
    // Japanese ingredients
    { name: 'miso', category: 'condiments', unit: 'tablespoon' },
    { name: 'dashi', category: 'condiments', unit: 'cup' },
    { name: 'sake', category: 'condiments', unit: 'tablespoon' },
    { name: 'mirin', category: 'condiments', unit: 'tablespoon' },
    { name: 'nori', category: 'vegetables', unit: 'sheet' },
    { name: 'wasabi', category: 'condiments', unit: 'teaspoon' },
    { name: 'panko', category: 'grains', unit: 'cup' },
    { name: 'udon noodles', category: 'grains', unit: 'package' },
    
    // Thai ingredients
    { name: 'coconut cream', category: 'dairy', unit: 'can' },
    { name: 'thai chilies', category: 'spices', unit: 'piece' },
    { name: 'thai basil', category: 'herbs', unit: 'cup' },
    { name: 'fish sauce thai', category: 'condiments', unit: 'tablespoon' },
    { name: 'palm sugar', category: 'condiments', unit: 'tablespoon' },
    { name: 'kaffir lime leaves', category: 'herbs', unit: 'piece' },
    { name: 'cilantro', category: 'herbs', unit: 'cup' },
    
    // Italian ingredients
    { name: 'pasta', category: 'grains', unit: 'pound' },
    { name: 'parmesan cheese', category: 'dairy', unit: 'cup' },
    { name: 'olive oil', category: 'oils', unit: 'tablespoon' },
    { name: 'basil', category: 'herbs', unit: 'cup' },
    { name: 'mozzarella', category: 'dairy', unit: 'cup' },
    { name: 'oregano', category: 'herbs', unit: 'teaspoon' },
    
    // Mexican ingredients
    { name: 'cumin', category: 'spices', unit: 'teaspoon' },
    { name: 'chili powder', category: 'spices', unit: 'tablespoon' },
    { name: 'jalapeño', category: 'vegetables', unit: 'piece' },
    { name: 'avocado', category: 'fruits', unit: 'piece' },
    { name: 'tortilla', category: 'grains', unit: 'piece' },
    { name: 'cheddar cheese', category: 'dairy', unit: 'cup' },
    
    // Chinese ingredients
    { name: 'oyster sauce', category: 'condiments', unit: 'tablespoon' },
    { name: 'hoisin sauce', category: 'condiments', unit: 'tablespoon' },
    { name: 'chinese wine', category: 'condiments', unit: 'tablespoon' },
    { name: 'star anise', category: 'spices', unit: 'piece' },
    { name: 'five spice', category: 'spices', unit: 'teaspoon' },
    
    // Indian ingredients
    { name: 'basmati rice', category: 'grains', unit: 'cup' },
    { name: 'garam masala', category: 'spices', unit: 'teaspoon' },
    { name: 'turmeric', category: 'spices', unit: 'teaspoon' },
    { name: 'coriander seeds', category: 'spices', unit: 'teaspoon' },
    { name: 'cardamom', category: 'spices', unit: 'piece' },
    { name: 'cinnamon stick', category: 'spices', unit: 'piece' },
    { name: 'curry leaves', category: 'herbs', unit: 'piece' },
    { name: 'ghee', category: 'oils', unit: 'tablespoon' },
    { name: 'yogurt', category: 'dairy', unit: 'cup' },
    { name: 'paneer', category: 'dairy', unit: 'cup' },
    { name: 'chickpeas', category: 'protein', unit: 'cup' },
    { name: 'lentils', category: 'protein', unit: 'cup' },
    { name: 'naan bread', category: 'grains', unit: 'piece' },
    { name: 'mustard seeds', category: 'spices', unit: 'teaspoon' },
    { name: 'fenugreek', category: 'spices', unit: 'teaspoon' },
    { name: 'asafoetida', category: 'spices', unit: 'pinch' },
    { name: 'tamarind paste', category: 'condiments', unit: 'tablespoon' },
    { name: 'jaggery', category: 'condiments', unit: 'tablespoon' },
    
    // Vietnamese ingredients
    { name: 'rice noodles', category: 'grains', unit: 'package' },
    { name: 'rice paper', category: 'grains', unit: 'sheet' },
    { name: 'fish sauce vietnamese', category: 'condiments', unit: 'tablespoon' },
    { name: 'hoisin sauce vietnamese', category: 'condiments', unit: 'tablespoon' },
    { name: 'vietnamese mint', category: 'herbs', unit: 'cup' },
    { name: 'thai chilies vietnamese', category: 'spices', unit: 'piece' },
    { name: 'rice vinegar vietnamese', category: 'condiments', unit: 'tablespoon' },
    { name: 'palm sugar vietnamese', category: 'condiments', unit: 'tablespoon' },
    { name: 'peanuts', category: 'nuts', unit: 'cup' },
    { name: 'bean sprouts vietnamese', category: 'vegetables', unit: 'cup' },
    { name: 'lettuce', category: 'vegetables', unit: 'head' },
    { name: 'herbs mix', category: 'herbs', unit: 'cup' }
  ],
  
  recipes: [
    {
      name: 'Kimchi Fried Rice',
      cuisine: 'Korean',
      description: 'A popular Korean dish made with kimchi and rice, perfect for using leftover rice.',
      servings: 4,
      prep_time: 10,
      cook_time: 15,
      instructions: '1. Heat oil in a large pan or wok over medium-high heat. 2. Add garlic and ginger, stir-fry for 30 seconds. 3. Add kimchi and cook for 2-3 minutes. 4. Add rice, breaking up clumps, and stir-fry for 3-4 minutes. 5. Add soy sauce and sesame oil, mix well. 6. Push rice to one side, crack eggs into empty space and scramble. 7. Mix everything together and garnish with green onions.',
      ingredients: [
        { name: 'kimchi', quantity: 1, unit: 'cup' },
        { name: 'rice', quantity: 3, unit: 'cup' },
        { name: 'egg', quantity: 2, unit: 'piece' },
        { name: 'garlic', quantity: 3, unit: 'clove' },
        { name: 'ginger', quantity: 1, unit: 'tablespoon' },
        { name: 'soy sauce', quantity: 2, unit: 'tablespoon' },
        { name: 'sesame oil', quantity: 1, unit: 'tablespoon' },
        { name: 'green onion', quantity: 2, unit: 'stalk' }
      ]
    },
    {
      name: 'Bibimbap',
      cuisine: 'Korean',
      description: 'A mixed rice bowl with vegetables, meat, and gochujang sauce.',
      servings: 4,
      prep_time: 30,
      cook_time: 20,
      instructions: '1. Cook rice according to package instructions. 2. Marinate beef in soy sauce, garlic, and sesame oil. 3. Sauté each vegetable separately with garlic and sesame oil. 4. Cook marinated beef until done. 5. Fry eggs sunny-side up. 6. Arrange rice in bowls, top with vegetables, beef, and egg. 7. Serve with gochujang on the side.',
      ingredients: [
        { name: 'rice', quantity: 2, unit: 'cup' },
        { name: 'beef', quantity: 0.5, unit: 'pound' },
        { name: 'spinach', quantity: 1, unit: 'cup' },
        { name: 'carrot', quantity: 1, unit: 'piece' },
        { name: 'mushroom', quantity: 1, unit: 'cup' },
        { name: 'egg', quantity: 4, unit: 'piece' },
        { name: 'garlic', quantity: 4, unit: 'clove' },
        { name: 'soy sauce', quantity: 3, unit: 'tablespoon' },
        { name: 'sesame oil', quantity: 2, unit: 'tablespoon' },
        { name: 'gochujang', quantity: 2, unit: 'tablespoon' }
      ]
    },
    {
      name: 'Adobo',
      cuisine: 'Filipino',
      description: 'The national dish of the Philippines, meat braised in vinegar, soy sauce, and spices.',
      servings: 6,
      prep_time: 15,
      cook_time: 45,
      instructions: '1. Combine pork, soy sauce, vinegar, garlic, bay leaves, and black pepper in a pot. 2. Marinate for 30 minutes. 3. Bring to a boil, then reduce heat and simmer for 30 minutes. 4. Add water if needed. 5. Continue cooking until meat is tender and sauce is reduced. 6. Serve with rice.',
      ingredients: [
        { name: 'pork', quantity: 2, unit: 'pound' },
        { name: 'soy sauce', quantity: 0.5, unit: 'cup' },
        { name: 'vinegar', quantity: 0.5, unit: 'cup' },
        { name: 'garlic', quantity: 6, unit: 'clove' },
        { name: 'bay leaves', quantity: 3, unit: 'piece' },
        { name: 'black pepper', quantity: 1, unit: 'teaspoon' },
        { name: 'onion', quantity: 1, unit: 'piece' }
      ]
    },
    {
      name: 'Sinigang',
      cuisine: 'Filipino',
      description: 'A sour soup typically made with tamarind, vegetables, and meat or seafood.',
      servings: 6,
      prep_time: 20,
      cook_time: 30,
      instructions: '1. Boil water in a large pot. 2. Add pork and cook until tender. 3. Add tamarind paste and bring to a boil. 4. Add tomatoes and onions, cook for 5 minutes. 5. Add vegetables in order of cooking time needed. 6. Season with fish sauce and salt. 7. Serve hot with rice.',
      ingredients: [
        { name: 'pork', quantity: 1, unit: 'pound' },
        { name: 'tamarind', quantity: 3, unit: 'tablespoon' },
        { name: 'tomato', quantity: 2, unit: 'piece' },
        { name: 'onion', quantity: 1, unit: 'piece' },
        { name: 'long beans', quantity: 1, unit: 'cup' },
        { name: 'eggplant', quantity: 1, unit: 'piece' },
        { name: 'okra', quantity: 1, unit: 'cup' },
        { name: 'fish sauce', quantity: 2, unit: 'tablespoon' },
        { name: 'salt', quantity: 1, unit: 'teaspoon' }
      ]
    },
    {
      name: 'Kare-Kare',
      cuisine: 'Filipino',
      description: 'A rich Filipino stew with peanut sauce, vegetables, and oxtail or beef.',
      servings: 6,
      prep_time: 30,
      cook_time: 90,
      instructions: '1. Boil beef until tender, about 1 hour. 2. In a separate pan, sauté garlic and onions. 3. Add peanut butter and rice flour, mix well. 4. Add beef broth gradually to make a sauce. 5. Add cooked beef and vegetables. 6. Simmer until vegetables are tender. 7. Serve with shrimp paste and rice.',
      ingredients: [
        { name: 'beef', quantity: 2, unit: 'pound' },
        { name: 'peanut butter', quantity: 0.5, unit: 'cup' },
        { name: 'rice flour', quantity: 3, unit: 'tablespoon' },
        { name: 'eggplant', quantity: 1, unit: 'piece' },
        { name: 'long beans', quantity: 1, unit: 'cup' },
        { name: 'okra', quantity: 1, unit: 'cup' },
        { name: 'garlic', quantity: 4, unit: 'clove' },
        { name: 'onion', quantity: 1, unit: 'piece' },
        { name: 'shrimp paste', quantity: 2, unit: 'tablespoon' }
      ]
    },
    {
      name: 'Bulgogi',
      cuisine: 'Korean',
      description: 'Sweet and savory Korean marinated beef BBQ, traditionally grilled and served with rice.',
      servings: 4,
      prep_time: 20,
      cook_time: 15,
      instructions: '1. Slice beef thinly against the grain. 2. Grate asian pear and mix with soy sauce, sugar, sesame oil, garlic, and ginger. 3. Marinate beef for at least 30 minutes. 4. Heat vegetable oil in a large pan over high heat. 5. Cook marinated beef in batches until caramelized, about 3-4 minutes per batch. 6. Garnish with green onions and sesame seeds. 7. Serve with rice and lettuce wraps.',
      ingredients: [
        { name: 'beef', quantity: 1.5, unit: 'pound' },
        { name: 'asian pear', quantity: 0.5, unit: 'piece' },
        { name: 'soy sauce', quantity: 4, unit: 'tablespoon' },
        { name: 'sugar', quantity: 2, unit: 'tablespoon' },
        { name: 'sesame oil', quantity: 2, unit: 'tablespoon' },
        { name: 'garlic', quantity: 4, unit: 'clove' },
        { name: 'ginger', quantity: 1, unit: 'tablespoon' },
        { name: 'vegetable oil', quantity: 2, unit: 'tablespoon' },
        { name: 'green onion', quantity: 3, unit: 'stalk' }
      ]
    },
    {
      name: 'Kimchi Jjigae',
      cuisine: 'Korean',
      description: 'Spicy Korean kimchi stew with pork belly, tofu, and vegetables in a rich, flavorful broth.',
      servings: 4,
      prep_time: 15,
      cook_time: 25,
      instructions: '1. Cut pork belly into bite-sized pieces and brown in a pot. 2. Add chopped kimchi and cook for 5 minutes. 3. Add kimchi juice, water, and gochujang. Bring to a boil. 4. Simmer for 15 minutes. 5. Add tofu and green onions, cook for 3 minutes. 6. Season with salt if needed. 7. Serve hot with rice.',
      ingredients: [
        { name: 'pork belly', quantity: 0.5, unit: 'pound' },
        { name: 'kimchi', quantity: 2, unit: 'cup' },
        { name: 'kimchi juice', quantity: 0.5, unit: 'cup' },
        { name: 'tofu', quantity: 1, unit: 'block' },
        { name: 'gochujang', quantity: 1, unit: 'tablespoon' },
        { name: 'green onion', quantity: 2, unit: 'stalk' },
        { name: 'garlic', quantity: 3, unit: 'clove' },
        { name: 'salt', quantity: 1, unit: 'teaspoon' }
      ]
    },
    {
      name: 'Galbi',
      cuisine: 'Korean',
      description: 'Korean marinated short ribs grilled to perfection with a sweet and savory glaze.',
      servings: 4,
      prep_time: 30,
      cook_time: 20,
      instructions: '1. Score the meat on the ribs in a crosshatch pattern. 2. Mix soy sauce, sugar, asian pear, garlic, ginger, sesame oil, and rice wine for marinade. 3. Marinate ribs for at least 2 hours or overnight. 4. Preheat grill to medium-high. 5. Grill ribs for 8-10 minutes per side. 6. Brush with remaining marinade while grilling. 7. Serve with rice and banchan.',
      ingredients: [
        { name: 'beef short ribs', quantity: 3, unit: 'pound' },
        { name: 'soy sauce', quantity: 0.5, unit: 'cup' },
        { name: 'sugar', quantity: 3, unit: 'tablespoon' },
        { name: 'asian pear', quantity: 1, unit: 'piece' },
        { name: 'garlic', quantity: 6, unit: 'clove' },
        { name: 'ginger', quantity: 2, unit: 'tablespoon' },
        { name: 'sesame oil', quantity: 2, unit: 'tablespoon' },
        { name: 'rice wine', quantity: 2, unit: 'tablespoon' }
      ]
    },
    {
      name: 'Sundubu Jjigae',
      cuisine: 'Korean',
      description: 'Soft tofu stew in a spicy, savory broth with vegetables and your choice of protein.',
      servings: 2,
      prep_time: 10,
      cook_time: 15,
      instructions: '1. Heat sesame oil in a stone pot or heavy pan. 2. Sauté garlic and gochujang for 30 seconds. 3. Add water and bring to a boil. 4. Add soft tofu by spoonfuls, breaking it up gently. 5. Add mushrooms and green onions. 6. Crack an egg on top and simmer until egg is cooked to preference. 7. Season with salt and serve immediately.',
      ingredients: [
        { name: 'tofu', quantity: 1, unit: 'block' },
        { name: 'gochujang', quantity: 1.5, unit: 'tablespoon' },
        { name: 'sesame oil', quantity: 1, unit: 'tablespoon' },
        { name: 'garlic', quantity: 2, unit: 'clove' },
        { name: 'mushroom', quantity: 0.5, unit: 'cup' },
        { name: 'green onion', quantity: 1, unit: 'stalk' },
        { name: 'egg', quantity: 1, unit: 'piece' },
        { name: 'salt', quantity: 0.5, unit: 'teaspoon' }
      ]
    },
    {
      name: 'Lumpia Shanghai',
      cuisine: 'Filipino',
      description: 'Crispy Filipino spring rolls filled with seasoned ground pork and vegetables.',
      servings: 6,
      prep_time: 45,
      cook_time: 20,
      instructions: '1. Mix ground pork with minced garlic, onion, carrot, salt, and pepper. 2. Place a spoonful of filling on each spring roll wrapper. 3. Roll tightly, sealing edges with water. 4. Heat oil to 350°F in a deep pan. 5. Fry spring rolls in batches until golden brown, about 3-4 minutes. 6. Drain on paper towels. 7. Serve hot with sweet and sour sauce.',
      ingredients: [
        { name: 'pork', quantity: 1, unit: 'pound' },
        { name: 'carrot', quantity: 1, unit: 'piece' },
        { name: 'onion', quantity: 1, unit: 'piece' },
        { name: 'garlic', quantity: 3, unit: 'clove' },
        { name: 'salt', quantity: 1, unit: 'teaspoon' },
        { name: 'black pepper', quantity: 0.5, unit: 'teaspoon' },
        { name: 'vegetable oil', quantity: 2, unit: 'cup' }
      ]
    },
    {
      name: 'Chicken Tinola',
      cuisine: 'Filipino',
      description: 'Clear Filipino chicken soup with ginger, green papaya, and chili pepper leaves.',
      servings: 6,
      prep_time: 15,
      cook_time: 30,
      instructions: '1. Sauté garlic, onion, and ginger in oil until fragrant. 2. Add chicken pieces and brown lightly. 3. Add fish sauce and water, bring to a boil. 4. Simmer until chicken is tender, about 20 minutes. 5. Add green papaya and cook for 5 minutes. 6. Add chili pepper leaves or spinach and cook for 2 minutes. 7. Season with salt and serve hot.',
      ingredients: [
        { name: 'chicken', quantity: 2, unit: 'pound' },
        { name: 'ginger', quantity: 2, unit: 'tablespoon' },
        { name: 'garlic', quantity: 3, unit: 'clove' },
        { name: 'onion', quantity: 1, unit: 'piece' },
        { name: 'fish sauce', quantity: 2, unit: 'tablespoon' },
        { name: 'spinach', quantity: 2, unit: 'cup' },
        { name: 'salt', quantity: 1, unit: 'teaspoon' },
        { name: 'vegetable oil', quantity: 2, unit: 'tablespoon' }
      ]
    },
    {
      name: 'Lechon Kawali',
      cuisine: 'Filipino',
      description: 'Crispy Filipino pork belly with perfectly crispy skin and tender meat inside.',
      servings: 6,
      prep_time: 20,
      cook_time: 90,
      instructions: '1. Boil pork belly with bay leaves, salt, and peppercorns for 45 minutes until tender. 2. Let cool and pat completely dry. 3. Rub skin with salt and let sit for 30 minutes. 4. Heat oil to 350°F in a deep pan. 5. Fry pork belly skin-side down first until golden and crispy. 6. Flip and fry until all sides are crispy. 7. Slice and serve with liver sauce or vinegar dip.',
      ingredients: [
        { name: 'pork belly', quantity: 2, unit: 'pound' },
        { name: 'bay leaves', quantity: 3, unit: 'piece' },
        { name: 'salt', quantity: 2, unit: 'tablespoon' },
        { name: 'black pepper', quantity: 1, unit: 'teaspoon' },
        { name: 'vegetable oil', quantity: 4, unit: 'cup' }
      ]
    },
    {
      name: 'Pancit Canton',
      cuisine: 'Filipino',
      description: 'Filipino stir-fried noodles with vegetables, meat, and savory sauce.',
      servings: 6,
      prep_time: 20,
      cook_time: 15,
      instructions: '1. Soak canton noodles in warm water until soft. 2. Heat oil in a large wok. 3. Sauté garlic and onion until fragrant. 4. Add pork and cook until done. 5. Add shrimp and vegetables, stir-fry for 3 minutes. 6. Add drained noodles and sauce ingredients. 7. Toss everything together until well combined. 8. Garnish with green onions and calamansi.',
      ingredients: [
        { name: 'pork', quantity: 0.5, unit: 'pound' },
        { name: 'shrimp', quantity: 0.5, unit: 'pound' },
        { name: 'carrot', quantity: 1, unit: 'piece' },
        { name: 'bell pepper', quantity: 1, unit: 'piece' },
        { name: 'bok choy', quantity: 1, unit: 'head' },
        { name: 'garlic', quantity: 4, unit: 'clove' },
        { name: 'onion', quantity: 1, unit: 'piece' },
        { name: 'soy sauce', quantity: 3, unit: 'tablespoon' },
        { name: 'vegetable oil', quantity: 3, unit: 'tablespoon' },
        { name: 'green onion', quantity: 2, unit: 'stalk' },
        { name: 'calamansi', quantity: 2, unit: 'piece' }
      ]
    },
    {
      name: 'Chicken Teriyaki',
      cuisine: 'Japanese',
      description: 'Japanese grilled chicken glazed with sweet and savory teriyaki sauce.',
      servings: 4,
      prep_time: 15,
      cook_time: 20,
      instructions: '1. Mix soy sauce, mirin, sake, and sugar for teriyaki sauce. 2. Season chicken with salt and pepper. 3. Heat oil in a pan and cook chicken until golden. 4. Add teriyaki sauce and simmer until glazed. 5. Garnish with green onions and serve with rice.',
      ingredients: [
        { name: 'chicken', quantity: 2, unit: 'pound' },
        { name: 'soy sauce', quantity: 4, unit: 'tablespoon' },
        { name: 'mirin', quantity: 3, unit: 'tablespoon' },
        { name: 'sake', quantity: 2, unit: 'tablespoon' },
        { name: 'sugar', quantity: 2, unit: 'tablespoon' },
        { name: 'vegetable oil', quantity: 2, unit: 'tablespoon' },
        { name: 'green onion', quantity: 2, unit: 'stalk' },
        { name: 'salt', quantity: 1, unit: 'teaspoon' }
      ]
    },
    {
      name: 'Miso Soup',
      cuisine: 'Japanese',
      description: 'Traditional Japanese soup with miso paste, tofu, and wakame seaweed.',
      servings: 4,
      prep_time: 5,
      cook_time: 10,
      instructions: '1. Heat dashi in a pot. 2. Whisk miso paste with a little dashi until smooth. 3. Add miso mixture back to pot. 4. Add tofu cubes and simmer gently. 5. Add green onions just before serving.',
      ingredients: [
        { name: 'dashi', quantity: 4, unit: 'cup' },
        { name: 'miso', quantity: 3, unit: 'tablespoon' },
        { name: 'tofu', quantity: 0.5, unit: 'block' },
        { name: 'green onion', quantity: 2, unit: 'stalk' }
      ]
    },
    {
      name: 'Pad Thai',
      cuisine: 'Thai',
      description: 'Classic Thai stir-fried noodles with tamarind, fish sauce, and peanuts.',
      servings: 4,
      prep_time: 20,
      cook_time: 15,
      instructions: '1. Soak rice noodles in warm water until soft. 2. Heat oil in wok, scramble eggs. 3. Add garlic, then noodles and sauce mixture. 4. Add shrimp and bean sprouts, stir-fry. 5. Garnish with peanuts, lime, and cilantro.',
      ingredients: [
        { name: 'shrimp', quantity: 1, unit: 'pound' },
        { name: 'fish sauce thai', quantity: 3, unit: 'tablespoon' },
        { name: 'tamarind', quantity: 2, unit: 'tablespoon' },
        { name: 'palm sugar', quantity: 2, unit: 'tablespoon' },
        { name: 'bean sprouts', quantity: 2, unit: 'cup' },
        { name: 'egg', quantity: 2, unit: 'piece' },
        { name: 'garlic', quantity: 3, unit: 'clove' },
        { name: 'lime', quantity: 2, unit: 'piece' },
        { name: 'cilantro', quantity: 0.5, unit: 'cup' },
        { name: 'vegetable oil', quantity: 3, unit: 'tablespoon' }
      ]
    },
    {
      name: 'Green Curry',
      cuisine: 'Thai',
      description: 'Spicy Thai curry with coconut milk, vegetables, and aromatic herbs.',
      servings: 4,
      prep_time: 15,
      cook_time: 25,
      instructions: '1. Heat coconut cream in a pot until oil separates. 2. Add curry paste and fry until fragrant. 3. Add chicken and cook until done. 4. Add coconut milk, vegetables, and seasonings. 5. Simmer until vegetables are tender. 6. Garnish with thai basil.',
      ingredients: [
        { name: 'chicken', quantity: 1, unit: 'pound' },
        { name: 'coconut cream', quantity: 1, unit: 'can' },
        { name: 'coconut milk', quantity: 1, unit: 'can' },
        { name: 'thai basil', quantity: 0.5, unit: 'cup' },
        { name: 'thai chilies', quantity: 3, unit: 'piece' },
        { name: 'galangal', quantity: 1, unit: 'piece' },
        { name: 'lemongrass', quantity: 2, unit: 'stalk' },
        { name: 'fish sauce thai', quantity: 2, unit: 'tablespoon' },
        { name: 'palm sugar', quantity: 1, unit: 'tablespoon' }
      ]
    },
    {
      name: 'Spaghetti Carbonara',
      cuisine: 'Italian',
      description: 'Classic Roman pasta dish with eggs, cheese, pancetta, and black pepper.',
      servings: 4,
      prep_time: 10,
      cook_time: 15,
      instructions: '1. Cook spaghetti until al dente. 2. Fry pancetta until crispy. 3. Whisk eggs with parmesan and black pepper. 4. Toss hot pasta with pancetta, then egg mixture off heat. 5. Add pasta water as needed for creaminess.',
      ingredients: [
        { name: 'pasta', quantity: 1, unit: 'pound' },
        { name: 'pork belly', quantity: 0.5, unit: 'pound' },
        { name: 'egg', quantity: 4, unit: 'piece' },
        { name: 'parmesan cheese', quantity: 1, unit: 'cup' },
        { name: 'black pepper', quantity: 2, unit: 'teaspoon' },
        { name: 'garlic', quantity: 2, unit: 'clove' },
        { name: 'olive oil', quantity: 2, unit: 'tablespoon' }
      ]
    },
    {
      name: 'Margherita Pizza',
      cuisine: 'Italian',
      description: 'Classic Neapolitan pizza with tomato, mozzarella, and fresh basil.',
      servings: 2,
      prep_time: 30,
      cook_time: 15,
      instructions: '1. Preheat oven to highest temperature. 2. Roll out pizza dough. 3. Spread tomato sauce, leaving border for crust. 4. Add torn mozzarella pieces. 5. Bake until crust is golden and cheese bubbles. 6. Top with fresh basil and olive oil.',
      ingredients: [
        { name: 'mozzarella', quantity: 8, unit: 'cup' },
        { name: 'tomato', quantity: 4, unit: 'piece' },
        { name: 'basil', quantity: 0.25, unit: 'cup' },
        { name: 'olive oil', quantity: 2, unit: 'tablespoon' },
        { name: 'garlic', quantity: 2, unit: 'clove' },
        { name: 'salt', quantity: 1, unit: 'teaspoon' }
      ]
    },
    {
      name: 'Beef Tacos',
      cuisine: 'Mexican',
      description: 'Seasoned ground beef tacos with fresh toppings and warm tortillas.',
      servings: 4,
      prep_time: 15,
      cook_time: 20,
      instructions: '1. Brown ground beef in a pan. 2. Add onions, garlic, cumin, and chili powder. 3. Season with salt and pepper. 4. Warm tortillas. 5. Fill with beef and top with cheese, tomatoes, and avocado.',
      ingredients: [
        { name: 'beef', quantity: 1, unit: 'pound' },
        { name: 'tortilla', quantity: 8, unit: 'piece' },
        { name: 'onion', quantity: 1, unit: 'piece' },
        { name: 'garlic', quantity: 3, unit: 'clove' },
        { name: 'cumin', quantity: 2, unit: 'teaspoon' },
        { name: 'chili powder', quantity: 1, unit: 'tablespoon' },
        { name: 'cheddar cheese', quantity: 1, unit: 'cup' },
        { name: 'tomato', quantity: 2, unit: 'piece' },
        { name: 'avocado', quantity: 2, unit: 'piece' }
      ]
    },
    {
      name: 'Sweet and Sour Pork',
      cuisine: 'Chinese',
      description: 'Crispy pork pieces in a tangy sweet and sour sauce with vegetables.',
      servings: 4,
      prep_time: 25,
      cook_time: 20,
      instructions: '1. Cut pork into cubes and coat with cornstarch. 2. Deep fry until golden and crispy. 3. Stir-fry bell peppers and onions. 4. Mix sauce ingredients and bring to a boil. 5. Combine pork, vegetables, and sauce. 6. Serve immediately with rice.',
      ingredients: [
        { name: 'pork', quantity: 1.5, unit: 'pound' },
        { name: 'bell pepper', quantity: 2, unit: 'piece' },
        { name: 'onion', quantity: 1, unit: 'piece' },
        { name: 'corn starch', quantity: 3, unit: 'tablespoon' },
        { name: 'soy sauce', quantity: 2, unit: 'tablespoon' },
        { name: 'vinegar', quantity: 3, unit: 'tablespoon' },
        { name: 'sugar', quantity: 3, unit: 'tablespoon' },
        { name: 'vegetable oil', quantity: 2, unit: 'cup' }
      ]
    },
    {
      name: 'Chicken Tikka Masala',
      cuisine: 'Indian',
      description: 'Creamy tomato-based curry with marinated grilled chicken pieces.',
      servings: 4,
      prep_time: 30,
      cook_time: 40,
      instructions: '1. Marinate chicken in yogurt, garlic, ginger, and spices for 30 minutes. 2. Grill or pan-fry chicken until cooked. 3. Heat ghee and sauté onions until golden. 4. Add garlic, ginger, and spices, cook until fragrant. 5. Add tomatoes and cook until reduced. 6. Add cream and cooked chicken, simmer for 10 minutes. 7. Garnish with cilantro and serve with naan.',
      ingredients: [
        { name: 'chicken', quantity: 2, unit: 'pound' },
        { name: 'yogurt', quantity: 0.5, unit: 'cup' },
        { name: 'tomato', quantity: 4, unit: 'piece' },
        { name: 'onion', quantity: 2, unit: 'piece' },
        { name: 'garlic', quantity: 6, unit: 'clove' },
        { name: 'ginger', quantity: 2, unit: 'tablespoon' },
        { name: 'garam masala', quantity: 2, unit: 'teaspoon' },
        { name: 'turmeric', quantity: 1, unit: 'teaspoon' },
        { name: 'ghee', quantity: 3, unit: 'tablespoon' },
        { name: 'coconut cream', quantity: 0.5, unit: 'can' },
        { name: 'cilantro', quantity: 0.5, unit: 'cup' }
      ]
    },
    {
      name: 'Dal Tadka',
      cuisine: 'Indian',
      description: 'Spiced yellow lentil curry tempered with aromatic spices.',
      servings: 4,
      prep_time: 15,
      cook_time: 30,
      instructions: '1. Wash and cook lentils with turmeric until soft and mushy. 2. Heat ghee in a pan for tempering. 3. Add mustard seeds, cumin, and asafoetida. 4. Add curry leaves, garlic, and ginger, sauté until fragrant. 5. Add onions and cook until golden. 6. Add tomatoes and spices, cook until tomatoes break down. 7. Pour tempering over cooked dal and simmer. 8. Garnish with cilantro.',
      ingredients: [
        { name: 'lentils', quantity: 1, unit: 'cup' },
        { name: 'turmeric', quantity: 0.5, unit: 'teaspoon' },
        { name: 'ghee', quantity: 3, unit: 'tablespoon' },
        { name: 'mustard seeds', quantity: 1, unit: 'teaspoon' },
        { name: 'cumin', quantity: 1, unit: 'teaspoon' },
        { name: 'asafoetida', quantity: 1, unit: 'pinch' },
        { name: 'curry leaves', quantity: 8, unit: 'piece' },
        { name: 'garlic', quantity: 4, unit: 'clove' },
        { name: 'ginger', quantity: 1, unit: 'tablespoon' },
        { name: 'onion', quantity: 1, unit: 'piece' },
        { name: 'tomato', quantity: 2, unit: 'piece' },
        { name: 'cilantro', quantity: 0.5, unit: 'cup' }
      ]
    },
    {
      name: 'Biryani',
      cuisine: 'Indian',
      description: 'Fragrant basmati rice dish layered with spiced meat and aromatic herbs.',
      servings: 6,
      prep_time: 45,
      cook_time: 60,
      instructions: '1. Soak basmati rice for 30 minutes. 2. Marinate chicken with yogurt and spices. 3. Cook rice with whole spices until 70% done. 4. Fry onions until golden and crispy. 5. Layer rice and chicken alternately in a heavy-bottomed pot. 6. Top with fried onions, mint, and saffron milk. 7. Cover and cook on low heat for 45 minutes. 8. Let rest for 10 minutes before serving.',
      ingredients: [
        { name: 'basmati rice', quantity: 2, unit: 'cup' },
        { name: 'chicken', quantity: 2, unit: 'pound' },
        { name: 'yogurt', quantity: 1, unit: 'cup' },
        { name: 'onion', quantity: 3, unit: 'piece' },
        { name: 'garlic', quantity: 8, unit: 'clove' },
        { name: 'ginger', quantity: 3, unit: 'tablespoon' },
        { name: 'garam masala', quantity: 2, unit: 'teaspoon' },
        { name: 'cardamom', quantity: 6, unit: 'piece' },
        { name: 'cinnamon stick', quantity: 2, unit: 'piece' },
        { name: 'ghee', quantity: 4, unit: 'tablespoon' },
        { name: 'cilantro', quantity: 1, unit: 'cup' }
      ]
    },
    {
      name: 'Samosas',
      cuisine: 'Indian',
      description: 'Crispy triangular pastries filled with spiced potatoes and peas.',
      servings: 6,
      prep_time: 60,
      cook_time: 30,
      instructions: '1. Make dough with flour, oil, and water, rest for 30 minutes. 2. Boil and mash potatoes. 3. Heat oil and add cumin, ginger, and green chilies. 4. Add potatoes, peas, and spices, cook until dry. 5. Roll dough into circles, cut in half. 6. Form cones, fill with potato mixture, and seal. 7. Deep fry until golden and crispy. 8. Serve hot with chutney.',
      ingredients: [
        { name: 'potato', quantity: 4, unit: 'piece' },
        { name: 'rice flour', quantity: 2, unit: 'cup' },
        { name: 'cumin', quantity: 1, unit: 'teaspoon' },
        { name: 'ginger', quantity: 1, unit: 'tablespoon' },
        { name: 'garam masala', quantity: 1, unit: 'teaspoon' },
        { name: 'turmeric', quantity: 0.5, unit: 'teaspoon' },
        { name: 'cilantro', quantity: 0.5, unit: 'cup' },
        { name: 'vegetable oil', quantity: 2, unit: 'cup' },
        { name: 'salt', quantity: 1, unit: 'teaspoon' }
      ]
    },
    {
      name: 'Pho Bo',
      cuisine: 'Vietnamese',
      description: 'Traditional Vietnamese beef noodle soup with aromatic broth and fresh herbs.',
      servings: 4,
      prep_time: 30,
      cook_time: 120,
      instructions: '1. Char onion and ginger over open flame until fragrant. 2. Toast spices in a dry pan. 3. Simmer beef bones with charred vegetables and spices for 2 hours. 4. Strain broth and season with fish sauce and sugar. 5. Cook rice noodles according to package instructions. 6. Slice beef thinly. 7. Place noodles in bowls, top with raw beef, and pour hot broth over. 8. Serve with fresh herbs, lime, and bean sprouts.',
      ingredients: [
        { name: 'beef', quantity: 1, unit: 'pound' },
        { name: 'rice noodles', quantity: 1, unit: 'package' },
        { name: 'onion', quantity: 2, unit: 'piece' },
        { name: 'ginger', quantity: 3, unit: 'tablespoon' },
        { name: 'star anise', quantity: 4, unit: 'piece' },
        { name: 'cinnamon stick', quantity: 2, unit: 'piece' },
        { name: 'fish sauce vietnamese', quantity: 4, unit: 'tablespoon' },
        { name: 'palm sugar vietnamese', quantity: 2, unit: 'tablespoon' },
        { name: 'bean sprouts vietnamese', quantity: 2, unit: 'cup' },
        { name: 'vietnamese mint', quantity: 1, unit: 'cup' },
        { name: 'cilantro', quantity: 1, unit: 'cup' },
        { name: 'lime', quantity: 2, unit: 'piece' }
      ]
    },
    {
      name: 'Banh Mi',
      cuisine: 'Vietnamese',
      description: 'Vietnamese baguette sandwich with pickled vegetables, herbs, and meat.',
      servings: 4,
      prep_time: 30,
      cook_time: 15,
      instructions: '1. Pickle carrot and radish in vinegar and sugar for 30 minutes. 2. Marinate pork with garlic, lemongrass, and fish sauce. 3. Grill pork until cooked through. 4. Split baguettes and toast lightly. 5. Spread with pâté or mayo. 6. Layer with grilled pork, pickled vegetables, cucumber, cilantro, and jalapeños. 7. Serve immediately.',
      ingredients: [
        { name: 'pork', quantity: 1, unit: 'pound' },
        { name: 'carrot', quantity: 2, unit: 'piece' },
        { name: 'radish', quantity: 1, unit: 'cup' },
        { name: 'cucumber', quantity: 1, unit: 'piece' },
        { name: 'cilantro', quantity: 1, unit: 'cup' },
        { name: 'jalapeño', quantity: 2, unit: 'piece' },
        { name: 'garlic', quantity: 4, unit: 'clove' },
        { name: 'lemongrass', quantity: 2, unit: 'stalk' },
        { name: 'fish sauce vietnamese', quantity: 2, unit: 'tablespoon' },
        { name: 'rice vinegar vietnamese', quantity: 3, unit: 'tablespoon' },
        { name: 'palm sugar vietnamese', quantity: 2, unit: 'tablespoon' }
      ]
    },
    {
      name: 'Vietnamese Spring Rolls',
      cuisine: 'Vietnamese',
      description: 'Fresh rice paper rolls filled with herbs, vegetables, and shrimp or pork.',
      servings: 4,
      prep_time: 45,
      cook_time: 10,
      instructions: '1. Cook shrimp until pink and cooked through. 2. Cook rice noodles until tender. 3. Soften rice paper in warm water for 10 seconds. 4. Place lettuce, herbs, noodles, and shrimp on rice paper. 5. Roll tightly, tucking in sides. 6. Serve immediately with dipping sauce made from fish sauce, lime juice, sugar, and chili.',
      ingredients: [
        { name: 'shrimp', quantity: 1, unit: 'pound' },
        { name: 'rice paper', quantity: 12, unit: 'sheet' },
        { name: 'rice noodles', quantity: 0.5, unit: 'package' },
        { name: 'lettuce', quantity: 1, unit: 'head' },
        { name: 'vietnamese mint', quantity: 1, unit: 'cup' },
        { name: 'cilantro', quantity: 1, unit: 'cup' },
        { name: 'fish sauce vietnamese', quantity: 3, unit: 'tablespoon' },
        { name: 'lime', quantity: 2, unit: 'piece' },
        { name: 'palm sugar vietnamese', quantity: 1, unit: 'tablespoon' },
        { name: 'thai chilies vietnamese', quantity: 2, unit: 'piece' }
      ]
    },
    {
      name: 'Bun Bo Hue',
      cuisine: 'Vietnamese',
      description: 'Spicy Vietnamese beef and pork noodle soup from the city of Hue.',
      servings: 4,
      prep_time: 25,
      cook_time: 90,
      instructions: '1. Simmer beef and pork bones for 1.5 hours. 2. Sauté lemongrass, garlic, and shrimp paste. 3. Add to broth with annatto oil for color. 4. Cook thick rice noodles until tender. 5. Slice beef and pork thinly. 6. Serve noodles in bowls with meat and hot broth. 7. Garnish with herbs, bean sprouts, and lime.',
      ingredients: [
        { name: 'beef', quantity: 0.5, unit: 'pound' },
        { name: 'pork', quantity: 0.5, unit: 'pound' },
        { name: 'rice noodles', quantity: 1, unit: 'package' },
        { name: 'lemongrass', quantity: 3, unit: 'stalk' },
        { name: 'garlic', quantity: 6, unit: 'clove' },
        { name: 'shrimp paste', quantity: 1, unit: 'tablespoon' },
        { name: 'fish sauce vietnamese', quantity: 3, unit: 'tablespoon' },
        { name: 'palm sugar vietnamese', quantity: 1, unit: 'tablespoon' },
        { name: 'bean sprouts vietnamese', quantity: 2, unit: 'cup' },
        { name: 'herbs mix', quantity: 1, unit: 'cup' },
        { name: 'lime', quantity: 2, unit: 'piece' }
      ]
    }
  ]
};

// Function to seed the database
async function seedDatabase() {
  console.log('Seeding database...');
  
  // Insert cuisines first
  const cuisinePromises = sampleData.cuisines.map(cuisine => {
    return new Promise((resolve, reject) => {
      db.addCuisine(cuisine, function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, ...cuisine });
      });
    });
  });
  
  try {
    await Promise.all(cuisinePromises);
    console.log('Cuisines added successfully');
  } catch (error) {
    console.log('Some cuisines may already exist, continuing...');
  }
  
  // Insert ingredients
  const ingredientPromises = sampleData.ingredients.map(ingredient => {
    return new Promise((resolve, reject) => {
      db.addIngredient(ingredient, function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, ...ingredient });
      });
    });
  });
  
  try {
    await Promise.all(ingredientPromises);
    console.log('Ingredients added successfully');
    
    // Get all ingredients to map names to IDs
    const ingredients = await new Promise((resolve, reject) => {
      db.getAllIngredients((err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
    
    const ingredientMap = {};
    ingredients.forEach(ingredient => {
      ingredientMap[ingredient.name] = ingredient.id;
    });
    
    // Insert recipes and their ingredients
    for (const recipe of sampleData.recipes) {
      const recipeIngredients = recipe.ingredients;
      delete recipe.ingredients;
      
      const recipeId = await new Promise((resolve, reject) => {
        db.addRecipe(recipe, function(err) {
          if (err) {
            console.log(`Error adding recipe ${recipe.name}:`, err.message);
            resolve(null); // Continue with other recipes
          } else {
            console.log(`Added recipe: ${recipe.name}`);
            resolve(this.lastID);
          }
        });
      });
      
      if (!recipeId) continue; // Skip if recipe wasn't added
      
      // Add recipe ingredients
      for (const ingredient of recipeIngredients) {
        const ingredientId = ingredientMap[ingredient.name];
        if (ingredientId) {
          await new Promise((resolve, reject) => {
            db.addRecipeIngredient(recipeId, ingredientId, ingredient.quantity, ingredient.unit, (err) => {
              if (err) reject(err);
              else resolve();
            });
          });
        }
      }
    }
    
    console.log('Database seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    db.close();
  }
}

// Run the seeding function only if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { sampleData, seedDatabase };