#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up Todo App Fullstack Boilerplate...\n');

// Check if Node.js is installed
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  console.log(`✅ Node.js ${nodeVersion} detected`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js 18+ first.');
  process.exit(1);
}

// Check if npm is installed
try {
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  console.log(`✅ npm ${npmVersion} detected`);
} catch (error) {
  console.error('❌ npm is not installed. Please install npm first.');
  process.exit(1);
}

console.log('\n📦 Installing dependencies...\n');

try {
  // Install root dependencies
  console.log('Installing root dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  // Install client dependencies
  console.log('\nInstalling client dependencies...');
  execSync('cd client && npm install', { stdio: 'inherit' });
  
  // Install server dependencies
  console.log('\nInstalling server dependencies...');
  execSync('cd server && npm install', { stdio: 'inherit' });
  
  console.log('\n✅ All dependencies installed successfully!');
} catch (error) {
  console.error('\n❌ Error installing dependencies:', error.message);
  process.exit(1);
}

console.log('\n🔧 Setting up environment...\n');

// Create .env file from example
const envExamplePath = path.join(__dirname, 'server', 'env.example');
const envPath = path.join(__dirname, 'server', '.env');

if (fs.existsSync(envExamplePath) && !fs.existsSync(envPath)) {
  try {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env file from env.example');
  } catch (error) {
    console.log('⚠️  Could not create .env file automatically. Please copy server/env.example to server/.env');
  }
} else if (fs.existsSync(envPath)) {
  console.log('✅ .env file already exists');
} else {
  console.log('⚠️  Please create server/.env file manually');
}

console.log('\n🗄️  Setting up database...\n');

try {
  // Generate Prisma client
  console.log('Generating Prisma client...');
  execSync('cd server && npm run db:generate', { stdio: 'inherit' });
  
  console.log('\n✅ Prisma client generated successfully!');
} catch (error) {
  console.error('\n❌ Error generating Prisma client:', error.message);
  console.log('⚠️  You may need to set up the database manually later');
}

console.log('\n🎉 Setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Review server/.env file and update if needed');
console.log('2. Run "npm run dev" to start both frontend and backend');
console.log('3. Frontend will be available at http://localhost:3000');
console.log('4. Backend will be available at http://localhost:5000');
console.log('\n📚 See README.md for more detailed instructions');
