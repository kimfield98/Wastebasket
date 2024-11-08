import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from './select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

const BasicSelect = () => (
  <Select>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="orange">Orange</SelectItem>
    </SelectContent>
  </Select>
);

export const Default: Story = {
  render: () => <BasicSelect />,
};

const GroupedSelect = () => (
  <Select>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Select a vehicle" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Cars</SelectLabel>
        <SelectItem value="tesla">Tesla</SelectItem>
        <SelectItem value="ford">Ford</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>Motorcycles</SelectLabel>
        <SelectItem value="harley">Harley Davidson</SelectItem>
        <SelectItem value="ducati">Ducati</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
);

export const Grouped: Story = {
  render: () => <GroupedSelect />,
};

const DisabledSelect = () => (
  <Select disabled>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Select an option" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2">Option 2</SelectItem>
    </SelectContent>
  </Select>
);

export const Disabled: Story = {
  render: () => <DisabledSelect />,
};

const ControlledSelect = () => {
  const [value, setValue] = React.useState('');

  return (
    <div className="space-y-2">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a color" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="red">Red</SelectItem>
          <SelectItem value="green">Green</SelectItem>
          <SelectItem value="blue">Blue</SelectItem>
        </SelectContent>
      </Select>
      <p>Selected value: {value}</p>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledSelect />,
};

const CustomStyledSelect = () => (
  <Select>
    <SelectTrigger className="w-[180px] bg-blue-100 text-blue-800">
      <SelectValue placeholder="Select a shape" />
    </SelectTrigger>
    <SelectContent className="bg-blue-50">
      <SelectItem value="circle" className="text-blue-800 hover:bg-blue-200">Circle</SelectItem>
      <SelectItem value="square" className="text-blue-800 hover:bg-blue-200">Square</SelectItem>
      <SelectItem value="triangle" className="text-blue-800 hover:bg-blue-200">Triangle</SelectItem>
    </SelectContent>
  </Select>
);

export const CustomStyled: Story = {
  render: () => <CustomStyledSelect />,
};