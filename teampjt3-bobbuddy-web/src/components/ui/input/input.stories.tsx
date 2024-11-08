import { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter email...',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter number...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex flex-col space-y-2">
      <label htmlFor="input-with-label" className="text-sm font-medium">Label</label>
      <Input id="input-with-label" {...args} />
    </div>
  ),
  args: {
    placeholder: 'Input with label',
  },
};

export const WithError: Story = {
  render: (args) => (
    <div className="space-y-2">
      <Input {...args} className="border-red-500 focus-visible:ring-red-500" />
      <p className="text-sm text-red-500">This field is required</p>
    </div>
  ),
  args: {
    placeholder: 'Input with error',
  },
};

export const WithIcon: Story = {
  render: (args) => (
    <div className="relative">
      <Input {...args} className="pl-8" />
      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
        🔍
      </span>
    </div>
  ),
  args: {
    placeholder: 'Search...',
  },
};