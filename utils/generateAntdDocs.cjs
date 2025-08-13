const fs = require('fs');
const path = require('path');
const antd = require('antd');

const outputDir = path.join(__dirname, '../src/stories/components');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function isReactComponent(value) {
  return (
    typeof value === 'function' ||
    (typeof value === 'object' && value !== null && value.$$typeof)
  );
}

function generateExampleArgs(name) {
  const presets = {
    Button: { children: 'Click me', type: 'primary' },
    Input: { placeholder: 'Enter text' },
    Switch: { checked: true },
    Checkbox: { children: 'Checkbox' },
    Radio: { children: 'Radio' },
    Alert: { message: 'Info Message', type: 'info' },
    Badge: { count: 5, children: 'Text' },
    Tooltip: { title: 'Tooltip', children: 'Hover me' },
  };

  return presets[name] || {};
}

function generateStory(name, args = {}) {
  const argsString = JSON.stringify(args, null, 2).replace(
    /"([^"]+)":/g,
    '$1:',
  );
  return (
    `
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ${name} } from 'antd';

const meta: Meta<typeof ${name}> = {
  title: 'Components/${name}',
  component: ${name},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: ${argsString},
};
`.trim() + '\n'
  );
}

function run() {
  ensureDir(outputDir);

  Object.entries(antd).forEach(([key, value]) => {
    if (!isReactComponent(value)) return;

    const filePath = path.join(outputDir, `${key}.stories.ts`);
    const args = generateExampleArgs(key);
    const storyContent = generateStory(key, args);
    fs.writeFileSync(filePath, storyContent);
    console.log(`✅ Created: ${filePath}`);
  });
}

run();
