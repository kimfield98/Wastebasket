import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Textarea, TextareaProps } from './textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    rows: { control: 'number' },
    className: { control: 'text' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message here.',
  },
};

export const WithValue: Story = {
  args: {
    value: 'This is some pre-filled text in the textarea.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'This textarea is disabled',
  },
};

export const WithRows: Story = {
  args: {
    rows: 5,
    placeholder: 'This textarea has 5 rows',
  },
};

export const WithCustomClass: Story = {
  args: {
    className: 'border-2 border-blue-500',
    placeholder: 'This textarea has a custom border class',
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="space-y-2">
      <label htmlFor="message" className="text-sm font-medium">Your Message</label>
      <Textarea id="message" {...args} />
    </div>
  ),
  args: {
    placeholder: 'Type your message here',
  },
};

const TextareaWithCharacterCount = (props:TextareaProps) => {
  const [value, setValue] = useState('');
  return (
    <div className="space-y-2">
      <Textarea 
        {...props} 
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p className="text-sm text-gray-500">{value.length} / 100 characters</p>
    </div>
  );
};

export const WithCharacterCount: Story = {
  render: () => <TextareaWithCharacterCount placeholder="Type your message here (max 100 characters)" maxLength={100} />,
};