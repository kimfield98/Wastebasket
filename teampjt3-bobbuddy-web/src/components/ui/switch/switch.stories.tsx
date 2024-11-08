import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Switch } from './switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onCheckedChange: { action: 'checked changed' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" {...args} />
      <label htmlFor="airplane-mode" className="text-sm font-medium">
        Airplane Mode
      </label>
    </div>
  ),
};

export const CustomColors: Story = {
  render: (args) => (
    <Switch
      {...args}
      className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
    />
  ),
};

// 새로운 React 컴포넌트 정의
const ControlledSwitch = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="space-y-2">
      <Switch
        checked={checked}
        onCheckedChange={setChecked}
      />
      <p>The switch is {checked ? 'on' : 'off'}</p>
    </div>
  );
};

export const ControlledComponent: Story = {
  render: () => <ControlledSwitch />,
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="flex space-x-4 items-center">
      <Switch className="h-4 w-7" />
      <Switch />
      <Switch className="h-6 w-11" />
    </div>
  ),
};
