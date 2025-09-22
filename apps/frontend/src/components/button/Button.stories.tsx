import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./Button";
import { fn } from "storybook/internal/test";

const meta = {
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    variant: "blue",
    isLoading: false,
    hasRing: false,
  },
};

export const Loading: Story = {
  args: {
    children: "Button",
    variant: "blue",
    isLoading: true,
  },
};
