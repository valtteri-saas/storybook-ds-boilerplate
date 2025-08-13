import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from 'antd';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    useTheme: true,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: 'primary',
    children: 'Primary button',
  },
};

export const Secondary: Story = {
  args: {
    type: 'default',
    children: 'Secondary button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small button',
  },
};

export const Loading: Story = {
  args: {
    type: 'primary',
    loading: true,
    children: 'Loading button',
  },
};
