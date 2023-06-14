import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@ui/button'

export default {
  title: 'Shared/Button',
  component: Button,
} satisfies Meta<typeof Button>

type Story = StoryObj<typeof Button>

export const Default: Story = {
  render: () => <Button>Button</Button>,
}
