import { ContextMenu } from "@rs-ui/context-menu"
import { Meta } from "@storybook/react"
import React from "react"
import { Menu, MenuItem } from "@chakra-ui/react"

export default {
  title: "Components/ContextMenu",
  component: ContextMenu,
} as Meta

export const Default = () => {
  return (
    <ContextMenu>
      <Menu>
        <MenuItem onClick={() => alert("OK")}>Alert</MenuItem>
        <MenuItem>Test 1</MenuItem>
        <MenuItem>Test 2</MenuItem>
      </Menu>
    </ContextMenu>
  )
}
