import { Box } from "@chakra-ui/layout";
import styled from "@emotion/styled";
import React, { CSSProperties } from "react";
import { BottomSheet as RSBS } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

interface Props {
  open: boolean;
  children: React.ReactNode;
  header?: React.ReactNode;
  blocking?: boolean;
  onClose: () => void;
  className?: string;
  style?: CSSProperties;
}

const RSBSStyle = styled(RSBS)`
  [data-rsbs-header] {
    box-shadow: none !important;
    padding: 0 1.5rem !important;
  }
  [data-rsbs-overlay] {
    z-index: 99;
  }
  .custom-backdrop {
    z-index: 9;
    overscroll-behavior: none;
    touch-action: none;
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    top: -60px;
    bottom: -60px;
    cursor: pointer;
    background: ${(props) => props.style?.background};
  }
  [data-rsbs-overlay],
  [data-rsbs-root]::after {
    background-color: #fff !important;
  }
  [data-rsbs-backdrop] {
    background-color: rgba(0, 0, 0, 0.6) !important;
  }
`;

const BottomSheet = (props: Props) => {
  return (
    <RSBSStyle
      open={props.open}
      onDismiss={props.onClose}
      header={props.header}
      scrollLocking={false}
      blocking={props.blocking}
      className={props.className}
      style={props.style}
      sibling={
        <Box
          className="custom-backdrop"
          onClick={(e) => {
            // Prevent interactive elements beneath overlay (iOS)
            e.preventDefault();
            e.stopPropagation();
            props.onClose();
          }}
        />
      }
    >
      {props.children}
    </RSBSStyle>
  );
};

export default BottomSheet;
