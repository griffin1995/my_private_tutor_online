#!/usr/bin/env node

// Test script to trigger homepage and see enhanced debugging output
const http = require('http');

console.log('Testing Enhanced Terminal Debugging...');
console.log('Fetching homepage at http://localhost:3001/');
console.log('========================================');

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/',
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log('Check the terminal running npm run dev for extensive debugging output');

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ Homepage loaded successfully');
      console.log(`Response size: ${data.length} bytes`);
    } else {
      console.log('❌ Failed to load homepage');
    }
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.end();