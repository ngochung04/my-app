import { Box, useEventListener } from "@chakra-ui/react";
import React, { useRef } from "react";

interface Props {
  children?: React.ReactNode;
}

const ContextMenu = ({ children, ...rest }: Props) => {
  let pX = 0;
  let pY = 0;

  let contextMenuRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    contextMenuRef.current!.style.display = "none";
  };

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    pX = e.x;
    pY = e.y;

    let context = contextMenuRef.current!;

    let contextX = window.innerWidth - context.offsetWidth;
    let contextY = window.innerHeight - context.offsetHeight;

    pX >= contextX
      ? (context.style.left = `${contextX - 1}px`)
      : (context.style.left = `${pX}px`);

    pY >= contextY
      ? (context.style.top = `${contextY - 1}px`)
      : (context.style.top = `${pY}px`);

    context.style.display = "block";
  };

  // 
  window.onresize = () => {
    let x = window.innerWidth - pX;
    if (x <= 0) x = 0;
    contextMenuRef.current!.style.left = `${x}px`;
    console.log(x);
  };

  useEventListener("contextmenu", handleContextMenu);
  useEventListener("click", handleClick);

  return (
    <Box
      ref={contextMenuRef}
      zIndex={1999}
      bg="white"
      minW="10rem"
      display="none"
      position="absolute"
      borderRadius="5px"
      border="1px solid #e2e2e2"
      boxShadow="0 2px 4px 0 rgba(0, 0, 0, 0.2)"
      py="0.25rem"
      css={{
        "& :hover": {
          backgroundColor: "#ff722b",
          color: "white",
          fontWeight: "bold",
        },
        "& :focus, & :active": {
          backgroundColor: "#ff5600",
          color: "white",
          fontWeight: "bold",
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export { ContextMenu };
