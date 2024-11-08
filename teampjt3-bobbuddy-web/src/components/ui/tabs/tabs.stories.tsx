import { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content of Tab 1</TabsContent>
      <TabsContent value="tab2">Content of Tab 2</TabsContent>
      <TabsContent value="tab3">Content of Tab 3</TabsContent>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Home
        </TabsTrigger>
        <TabsTrigger value="tab2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Profile
        </TabsTrigger>
        <TabsTrigger value="tab3">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          Contact
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Home Content</TabsContent>
      <TabsContent value="tab2">Profile Content</TabsContent>
      <TabsContent value="tab3">Contact Content</TabsContent>
    </Tabs>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Enabled</TabsTrigger>
        <TabsTrigger value="tab2" disabled>Disabled</TabsTrigger>
        <TabsTrigger value="tab3">Enabled</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content of Enabled Tab</TabsContent>
      <TabsContent value="tab2">Content of Disabled Tab</TabsContent>
      <TabsContent value="tab3">Content of Enabled Tab</TabsContent>
    </Tabs>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tab1" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="border p-4 rounded-b-lg">Content of Tab 1</TabsContent>
      <TabsContent value="tab2" className="border p-4 rounded-b-lg">Content of Tab 2</TabsContent>
      <TabsContent value="tab3" className="border p-4 rounded-b-lg">Content of Tab 3</TabsContent>
    </Tabs>
  ),
};