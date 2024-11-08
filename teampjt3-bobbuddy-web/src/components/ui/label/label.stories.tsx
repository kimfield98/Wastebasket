import { Meta, StoryObj } from '@storybook/react';
import { Label } from './label';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: 'Default Label',
  },
};

export const WithInput: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">{args.children}</Label>
      <input
        type="email"
        id="email"
        placeholder="Email"
        className="w-full rounded-md border px-3 py-2"
      />
    </div>
  ),
  args: {
    children: 'Email',
  },
};

export const Required: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="username" className="after:content-['*'] after:ml-0.5 after:text-red-500">
        {args.children}
      </Label>
      <input
        type="text"
        id="username"
        placeholder="Username"
        className="w-full rounded-md border px-3 py-2"
        required
      />
    </div>
  ),
  args: {
    children: 'Username',
  },
};

export const DisabledInput: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="disabled-input" className="peer-disabled:opacity-70">
        {args.children}
      </Label>
      <input
        type="text"
        id="disabled-input"
        placeholder="Disabled Input"
        className="w-full rounded-md border px-3 py-2"
        disabled
      />
    </div>
  ),
  args: {
    children: 'Disabled Input',
  },
};

export const WithCheckbox: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <input type="checkbox" id="terms" className="rounded border-gray-300" />
      <Label htmlFor="terms">{args.children}</Label>
    </div>
  ),
  args: {
    children: 'Accept terms and conditions',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Styled Label',
    className: 'text-blue-600 font-bold',
  },
};