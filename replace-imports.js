// const fs = require('fs');
import fs from 'fs';
// const path = require('path');
 import  path from 'path';

// Path to your source directory
const directory = './src';  // Change this to your source folder if needed
const fileExtension = '.ts'; // Set this to '.ts' for TypeScript files

// Function to replace directory imports with specific file imports
function replaceDirectoryImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const updatedContent = content.replace(/import (.*) from '(.*\/)([^\/]+)'/g, (match, p1, p2, p3) => {
    const resolvedPath = path.join(p2, `${p3}/index${fileExtension}`);
    return `import ${p1} from '${resolvedPath}'`;
  });

  // Write updated content back to file if any changes
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    console.log(`Updated imports in: ${filePath}`);
  }
}

// Function to walk through all files in the source directory
function walkDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);

    if (fs.lstatSync(fullPath).isDirectory()) {
      walkDirectory(fullPath);  // Recursively walk through directories
    } else if (fullPath.endsWith(fileExtension)) {
      replaceDirectoryImports(fullPath);  // Replace imports in .ts files
    }
  });
}

// Start walking through the source directory
walkDirectory(directory);
