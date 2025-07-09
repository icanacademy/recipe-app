const { scaleQuantity, decimalToFraction } = require('./scaling-utils');

// Test cases for scaling accuracy
const testCases = [
  // { original, factor, expected }
  { original: 1, factor: 1.5, description: '1 cup to 1.5 servings' },
  { original: 0.5, factor: 3, description: '1/2 cup to 3x servings' },
  { original: 2, factor: 0.5, description: '2 cups to half servings' },
  { original: 0.25, factor: 2, description: '1/4 cup doubled' },
  { original: 1.5, factor: 2.67, description: '1.5 cups to 2.67x' },
  { original: 3, factor: 1.33, description: '3 cups to 1.33x' },
  { original: 0.75, factor: 1.33, description: '3/4 cup to 1.33x' },
  { original: 4, factor: 0.75, description: '4 cups to 3/4 servings' },
];

console.log('Testing Recipe Scaling Accuracy:\n');
console.log('Original → Scale Factor → Result');
console.log('=====================================');

testCases.forEach(test => {
  const result = scaleQuantity(test.original, test.factor);
  const exactMath = test.original * test.factor;
  console.log(`${test.original} × ${test.factor} = ${result} (exact: ${exactMath.toFixed(3)})`);
  console.log(`  ${test.description}`);
  console.log('');
});

console.log('\nTesting Fraction Conversion:\n');
const fractionTests = [0.125, 0.25, 0.33, 0.5, 0.67, 0.75, 1.25, 1.5, 2.33, 3.75];
fractionTests.forEach(decimal => {
  console.log(`${decimal} → ${decimalToFraction(decimal)}`);
});