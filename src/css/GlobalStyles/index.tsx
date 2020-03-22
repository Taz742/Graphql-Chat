import styled, { createGlobalStyle } from "styled-components";

interface TextProps {
  fontSize?: number,
  fontWeight?: "bold" | "none" | number,
  color?: string,
  lineHeight?: string,
}

export const GlobalStyles = createGlobalStyle`
  html, body, #root {
    height: 100%;
    background-color: white;
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

export const StyledText = styled.p`
  font-size: ${(props: TextProps) => `${props.fontSize || 12}px`};
  font-weight: ${(props: TextProps) => `${props.fontWeight || "none"}`};
  color: ${(props: TextProps) => `${props.color || '#343a40'}`};
  line-height: ${(props: TextProps) => `${props.lineHeight || 'normal'}`};
`;

export const StyledButton = styled.button`
  width: auto;
  height: auto;
  border: none;
  border-radius: 2px;
  background-color: #cf828c;
  padding: 20px 40px;
  cursor: pointer;
`;