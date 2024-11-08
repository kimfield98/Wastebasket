import { Meta, StoryObj } from '@storybook/react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '../button/button';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast/toast";
import { Toaster } from "@/components/ui/toast/toaster";

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
        <ToastViewport />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: () => (
    <Toast>
      <ToastTitle>Default Toast</ToastTitle>
      <ToastDescription>This is a default toast message.</ToastDescription>
      <ToastClose />
    </Toast>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Toast variant="destructive">
      <ToastTitle>Destructive Toast</ToastTitle>
      <ToastDescription>This is a destructive toast message.</ToastDescription>
      <ToastClose />
    </Toast>
  ),
};

const ToastDemo = () => {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
      }}
    >
      Show Toast
    </Button>
  );
};

export const ToastWithHook: Story = {
  render: () => <ToastDemo />,
};

export const ToasterComponent: StoryObj<typeof Toaster> = {
  render: () => <Toaster />,
};

// 여러 토스트를 동시에 표시하는 데모
const MultipleToastsDemo = () => {
  const { toast } = useToast();

  const showMultipleToasts = () => {
    toast({
      title: "Toast 1",
      description: "This is the first toast",
    });
    setTimeout(() => {
      toast({
        title: "Toast 2",
        description: "This is the second toast",
        variant: "destructive",
      });
    }, 1000);
    setTimeout(() => {
      toast({
        title: "Toast 3",
        description: "This is the third toast",
      });
    }, 2000);
  };

  return <Button onClick={showMultipleToasts}>Show Multiple Toasts</Button>;
};

export const MultipleToasts: Story = {
  render: () => <MultipleToastsDemo />,
};