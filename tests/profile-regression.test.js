const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'main.html'), 'utf8');
const js = fs.readFileSync(path.join(root, 'engine.js'), 'utf8');

function countOccurrences(content, value) {
  const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = content.match(new RegExp(escaped, 'g'));
  return match ? match.length : 0;
}

function assertHas(pattern, source, message) {
  assert(pattern.test(source), message);
}

// 1) Duplicate IDs that broke profile progress bars must be removed.
assert.strictEqual(countOccurrences(html, 'id="p-comp-fill"'), 0, 'Legacy duplicate id="p-comp-fill" should not exist.');
assert.strictEqual(countOccurrences(html, 'id="p-comp-label"'), 0, 'Legacy duplicate id="p-comp-label" should not exist.');
assert.strictEqual(countOccurrences(html, 'id="p-comp-fill-panel"'), 1, 'Main profile completion fill must exist once.');
assert.strictEqual(countOccurrences(html, 'id="p-comp-label-panel"'), 1, 'Main profile completion label must exist once.');
assert.strictEqual(countOccurrences(html, 'id="p-comp-fill-drawer"'), 0, 'Drawer completion fill should be removed from page layout.');
assert.strictEqual(countOccurrences(html, 'id="p-comp-label-drawer"'), 0, 'Drawer completion label should be removed from page layout.');

// 2) Left/top profile controls should not exist in page layout.
assert.strictEqual(countOccurrences(html, 'id="nav-profile-btn"'), 0, 'Top profile button should be removed.');
assert.strictEqual(countOccurrences(html, 'id="profile-toggle"'), 0, 'Left profile toggle should be removed.');

// 3) Required interactive handlers referenced by HTML must exist in engine.js.
assertHas(/function\s+toggleDrawer\s*\(/, js, 'Missing function toggleDrawer().');
assertHas(/function\s+switchTab\s*\(/, js, 'Missing function switchTab().');
assertHas(/function\s+autoResize\s*\(/, js, 'Missing function autoResize().');
assertHas(/function\s+handlePortfolioUpload\s*\(/, js, 'Missing function handlePortfolioUpload().');
assertHas(/function\s+clearSession\s*\(/, js, 'Missing function clearSession().');
assertHas(/function\s+flashTag\s*\(/, js, 'Missing function flashTag().');
assertHas(/const\s+voice\s*=\s+new\s+VoiceInput\s*\(/, js, 'Missing global voice object initialization.');

// 4) Main completion bar must be updated by profile state changes.
assertHas(/p-comp-fill-panel/, js, 'Main completion fill should be updated by engine.');
assertHas(/p-comp-label-panel/, js, 'Main completion label should be updated by engine.');

// 5) Sidebar risk/segment values should update live.
assertHas(/document\.getElementById\('sb-risk'\)/, js, 'Sidebar risk field is not updated.');
assertHas(/document\.getElementById\('sb-seg'\)/, js, 'Sidebar segment field is not updated.');

console.log('profile-regression.test.js passed');
