// Utility functions for recipe scaling with better precision and fraction display

/**
 * Convert decimal to fraction for common cooking measurements
 */
function decimalToFraction(decimal) {
  if (decimal === 0) return '0';
  if (decimal === 1) return '1';
  
  // Common cooking fractions
  const commonFractions = [
    { decimal: 0.125, fraction: '1/8' },
    { decimal: 0.1667, fraction: '1/6' },
    { decimal: 0.25, fraction: '1/4' },
    { decimal: 0.3333, fraction: '1/3' },
    { decimal: 0.375, fraction: '3/8' },
    { decimal: 0.5, fraction: '1/2' },
    { decimal: 0.625, fraction: '5/8' },
    { decimal: 0.6667, fraction: '2/3' },
    { decimal: 0.75, fraction: '3/4' },
    { decimal: 0.875, fraction: '7/8' },
    { decimal: 1.25, fraction: '1 1/4' },
    { decimal: 1.3333, fraction: '1 1/3' },
    { decimal: 1.5, fraction: '1 1/2' },
    { decimal: 1.6667, fraction: '1 2/3' },
    { decimal: 1.75, fraction: '1 3/4' },
    { decimal: 2.25, fraction: '2 1/4' },
    { decimal: 2.5, fraction: '2 1/2' },
    { decimal: 2.75, fraction: '2 3/4' },
    { decimal: 3.25, fraction: '3 1/4' },
    { decimal: 3.5, fraction: '3 1/2' },
    { decimal: 3.75, fraction: '3 3/4' }
  ];
  
  // Find closest fraction (within 0.05 tolerance)
  for (const frac of commonFractions) {
    if (Math.abs(decimal - frac.decimal) < 0.05) {
      return frac.fraction;
    }
  }
  
  // If no close fraction found, check for whole numbers
  if (Math.abs(decimal - Math.round(decimal)) < 0.05) {
    return Math.round(decimal).toString();
  }
  
  // Return rounded decimal with appropriate precision
  if (decimal < 1) {
    return decimal.toFixed(2).replace(/\.?0+$/, '');
  } else if (decimal < 10) {
    return decimal.toFixed(1).replace(/\.?0+$/, '');
  } else {
    return Math.round(decimal).toString();
  }
}

/**
 * Scale quantity with better precision and formatting
 */
function scaleQuantity(originalQuantity, scaleFactor) {
  const scaled = originalQuantity * scaleFactor;
  
  // For very small quantities, round to nearest 0.125 (1/8)
  if (scaled < 2) {
    const rounded = Math.round(scaled * 8) / 8;
    return decimalToFraction(rounded);
  }
  
  // For medium quantities, round to nearest 0.25 (1/4)
  if (scaled < 10) {
    const rounded = Math.round(scaled * 4) / 4;
    return decimalToFraction(rounded);
  }
  
  // For larger quantities, round to nearest 0.5
  if (scaled < 50) {
    const rounded = Math.round(scaled * 2) / 2;
    return decimalToFraction(rounded);
  }
  
  // For very large quantities, round to whole numbers
  return Math.round(scaled).toString();
}

/**
 * Scale ingredients for a recipe
 */
function scaleIngredients(ingredients, originalServings, newServings) {
  const scaleFactor = newServings / originalServings;
  
  return ingredients.map(ingredient => ({
    ...ingredient,
    quantity: scaleQuantity(ingredient.quantity, scaleFactor),
    originalQuantity: ingredient.quantity // Keep original for reference
  }));
}

module.exports = {
  decimalToFraction,
  scaleQuantity,
  scaleIngredients
};