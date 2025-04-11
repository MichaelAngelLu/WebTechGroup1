const crypto = require('crypto');

// Function to generate a random secret
function generateSecret(length = 64) {
  return crypto.randomBytes(length).toString('hex');
}

// Generate secrets
const jwtSecret = generateSecret();
const sessionSecret = generateSecret();

// Output the secrets to the console
console.log('Generating secrets...');
console.log('JWT_SECRET:', jwtSecret);
console.log('SESSION_SECRET:', sessionSecret);
