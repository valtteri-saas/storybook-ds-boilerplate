const fs = require('fs');
const path = require('path');
const tokensFile = require('../tokens/tokens.json');

// REMOVE "design-tokens" root for all paths
const tokens = tokensFile['design-tokens'];

// CONFIGURE DEPTHS
const PAGE_DEPTH = 1; // e.g. "core"
const COMPONENT_DEPTH = 2; // e.g. "core.color.primary.brand"

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Collect all group roots at PAGE_DEPTH (these become MDX pages)
function collectPageGroups(obj, prefix = [], result = {}) {
  for (const key in obj) {
    const child = obj[key];
    const currentPath = [...prefix, key];
    if (currentPath.length === PAGE_DEPTH) {
      result[currentPath.join('.')] = child;
    } else if (typeof child === 'object' && child !== null) {
      collectPageGroups(child, currentPath, result);
    }
  }
  return result;
}

// Collect all child groups at COMPONENT_DEPTH (that are NOT leaves)
function collectComponentGroups(
  obj,
  relPrefix = [],
  absPrefix = [],
  result = {},
) {
  if (!obj) return result;
  const REL_DEPTH = COMPONENT_DEPTH - PAGE_DEPTH;
  for (const key in obj) {
    if (key === '$type' || key === '$value' || key === 'description') continue;
    const child = obj[key];
    const currRelPrefix = [...relPrefix, key];
    const currAbsPrefix = [...absPrefix, key];
    if (currRelPrefix.length === REL_DEPTH) {
      // Only include if the group is NOT a leaf token
      if (
        typeof child === 'object' &&
        child !== null &&
        !('$type' in child) &&
        !('$value' in child)
      ) {
        result[currAbsPrefix.join('.')] = child;
      }
    } else if (typeof child === 'object' && child !== null) {
      collectComponentGroups(child, currRelPrefix, currAbsPrefix, result);
    }
  }
  return result;
}

// Collect all leaf token paths beneath obj at given absPrefix
function collectLeafTokens(obj, absPrefix = [], result = {}) {
  if (!obj) return result;
  if (
    typeof obj === 'object' &&
    obj !== null &&
    '$type' in obj &&
    '$value' in obj
  ) {
    result[absPrefix.join('.')] = true;
  } else if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      if (key === '$type' || key === '$value' || key === 'description')
        continue;
      collectLeafTokens(obj[key], [...absPrefix, key], result);
    }
  }
  return result;
}

function buildStoryTitle(groupPath) {
  return ['Tokens', ...groupPath.split('.').map(capitalize)].join('/');
}
function buildFileInfo(groupPath) {
  const parts = groupPath.split('.');
  const fileName = parts.join('-') + '.mdx';
  const folder = path.join(__dirname, '../src/stories/tokens', ...parts);
  return { fileName, folder };
}
function ensureFolder(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}
function lastSegment(pathStr) {
  return capitalize(pathStr.split('.').pop());
}

const pageGroups = collectPageGroups(tokens);

for (const pagePath in pageGroups) {
  const pageObj = pageGroups[pagePath];
  const title = buildStoryTitle(pagePath);
  const heading = lastSegment(pagePath);
  const { fileName, folder } = buildFileInfo(pagePath);
  const fullPath = path.join(folder, fileName);

  // Compute relative import path to Token.tsx
  const relativeToToken = path
    .relative(folder, path.resolve(__dirname, '../src/components/Token.tsx'))
    .replace(/\\/g, '/')
    .replace(/\.tsx$/, '');

  // Find child groups within this page for Token sections
  const componentGroups = collectComponentGroups(
    pageObj,
    [],
    pagePath.split('.'),
    {},
  );

  let sectionBlocks = [];

  if (Object.keys(componentGroups).length > 0) {
    // Use the usual grouping
    sectionBlocks = Object.keys(componentGroups).map((componentPath) => {
      const groupKey = componentPath.split('.').slice(-1)[0];
      return `## ${capitalize(groupKey)}

<Unstyled>
  <Token category="${componentPath}" />
</Unstyled>`;
    });
  } else {
    // Fallback: No subgroups at desired depth, so show each LEAF token directly at/below this page
    const leaves = collectLeafTokens(pageObj, pagePath.split('.'), {});
    sectionBlocks = Object.keys(leaves).map((leafPath) => {
      const groupKey = leafPath.split('.').slice(-1)[0];
      return `## ${capitalize(groupKey)}

<Unstyled>
  <Token category="${leafPath}" />
</Unstyled>`;
    });
  }

  const mdx = `
import { Meta, Unstyled } from '@storybook/addon-docs';
import Token from '${relativeToToken}';

<Meta title="${title}" />

# ${heading}

${sectionBlocks.join('\n\n')}
`.trim();

  ensureFolder(folder);
  fs.writeFileSync(fullPath, mdx + '\n');
  console.log(`✅ Created: ${fullPath}`);
}
