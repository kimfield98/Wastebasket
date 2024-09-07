import React from "react";
import type { Preview } from "@storybook/react";
import { ThemeProvider } from "next-themes";
import '../src/index.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="min-h-screen bg-background font-sans antialiased">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;
