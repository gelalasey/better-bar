import fs from 'fs';
import path from 'path';

// Recursively list all files in a folder
function walk(dir, filelist = []) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            walk(filepath, filelist);
        } else {
            filelist.push(filepath);
        }
    });
    return filelist;
}

// Check if a file exists with exact casing
function existsExactCase(filePath) {
    const dir = path.dirname(filePath);
    const file = path.basename(filePath);
    if (!fs.existsSync(dir)) return false;
    const filesInDir = fs.readdirSync(dir);
    return filesInDir.includes(file);
}

// Scan all .astro files in src
const allFiles = walk('./src').filter((f) => f.endsWith('.astro'));

let errors = [];

allFiles.forEach((file) => {
    const content = fs.readFileSync(file, 'utf-8');
    const importRegex = /import\s+.*\s+from\s+['"](.*\.astro)['"]/g;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        const resolvedPath = path.join(path.dirname(file), importPath);
        if (!existsExactCase(resolvedPath)) {
            errors.push(`Casing mismatch or missing file: ${resolvedPath} (imported in ${file})`);
        }
    }
});

if (errors.length > 0) {
    console.log('⚠️ Casing issues found:');
    errors.forEach((e) => console.log(e));
    process.exit(1);
} else {
    console.log('✅ All .astro imports match file casing exactly.');
}
