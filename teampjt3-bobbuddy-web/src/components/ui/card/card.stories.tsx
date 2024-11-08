import { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card className="w-[350px]" {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  ),
};

export const WithoutFooter: Story = {
  render: (args) => (
    <Card className="w-[350px]" {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
  ),
};

export const OnlyContent: Story = {
  render: (args) => (
    <Card className="w-[350px]" {...args}>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
  ),
};

export const CustomStyles: Story = {
  render: (args) => (
    <Card className="w-[350px] bg-blue-100 border-blue-500" {...args}>
      <CardHeader className="bg-blue-200">
        <CardTitle className="text-blue-800">Custom Card</CardTitle>
        <CardDescription className="text-blue-600">With custom styles</CardDescription>
      </CardHeader>
      <CardContent className="text-blue-700">
        <p>This card has custom background colors and text colors.</p>
      </CardContent>
      <CardFooter className="bg-blue-200 text-blue-800">
        <p>Custom Footer</p>
      </CardFooter>
    </Card>
  ),
};