const fs = require('fs');

const path = 'd:/project-1/frontend/src/pages/admin/AdminDashboard.tsx';
let content = fs.readFileSync(path, 'utf8');

// The old design used --secondary for dark elements and --primary for accents.
// In our new design, --primary is the dark Coffee Brown.
// So we replace all --secondary with --primary.
content = content.replace(/var\(--secondary\)/g, 'var(--primary)');

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated AdminDashboard.tsx colors.');
