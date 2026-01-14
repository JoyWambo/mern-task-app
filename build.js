const fs = require("fs");
const path = require("path");

// Build the frontend
const { execSync } = require("child_process");

console.log("Installing frontend dependencies...");
execSync("cd frontend && npm install", { stdio: "inherit" });

console.log("Building frontend...");
execSync("cd frontend && npm run build", { stdio: "inherit" });

console.log("Copying build files to backend/public...");

// Ensure backend/public exists
const publicDir = path.join(__dirname, "backend", "public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Copy files from frontend/build to backend/public
const buildDir = path.join(__dirname, "frontend", "build");

function copyDir(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(buildDir, publicDir);

console.log("Build complete.");
