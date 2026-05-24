const fs = require('fs');

const path = 'd:/project-1/frontend/src/pages/admin/AdminDashboard.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/var\(--secondary\)/g, 'var(--primary)');
content = content.replace(/bg-\[#faf9f6\]/g, 'bg-[#FAF6F0]');

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated AdminDashboard.tsx colors.');
