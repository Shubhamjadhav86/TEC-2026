const dotenv = require('dotenv');
const result = dotenv.config();

console.log('Dotenv config result:', result);
console.log('process.env.MONGO_URI:', process.env.MONGO_URI);
console.log('process.env.PORT:', process.env.PORT);
