import { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    asChild: {
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
};

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default" {...args}>Default</Button>
      <Button variant="destructive" {...args}>Destructive</Button>
      <Button variant="outline" {...args}>Outline</Button>
      <Button variant="secondary" {...args}>Secondary</Button>
      <Button variant="ghost" {...args}>Ghost</Button>
      <Button variant="link" {...args}>Link</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm" {...args}>Small</Button>
      <Button size="default" {...args}>Default</Button>
      <Button size="lg" {...args}>Large</Button>
      <Button size="icon" {...args}>
        <span className="material-icons">add</span>
      </Button>
    </div>
  ),
};

export const AsChild: Story = {
  render: (args) => (
    <Button asChild {...args}>
      <a href="https://example.com">Link Button</a>
    </Button>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <span className="material-icons mr-2">save</span>
        Save
      </>
    ),
  },
};

export const Loading: Story = {
  args: {
    children: (
      <>
        <span className="animate-spin mr-2">⏳</span>
        Loading...
      </>
    ),
    disabled: true,
  },
};