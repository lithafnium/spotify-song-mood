import styled from "styled-components";

export const colors = {
  PRIMARY: "#1db954",
  SECONDARY: "#1ed760",
  TERNARY: "#FFF6E9",
  DARKPRIMARY: "#191414",
  DARKSECONDARY: "#212121",
  HIGHLIGHT: "#fefefe",
  // HIGHLIGHT: "#41B49D",
  // HIGHLIGHT: "#F46672",
};

export const fonts = {
  PRIMARY: "Montserrat, sans-serif",
  SECONDARY: '"SF Mono","Fira Code","Fira Mono","Roboto Mono",monospace',
  // PRIMARY: '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu;',
  // SECONDARY: "'Poppins', sans-serif",
};

export const Bold = styled.span`
  font-weight: 600;
  color: ${colors.HIGHLIGHT};
`;

export const Link = styled.a`
  text-decoration: none;
  color: ${colors.HIGHLIGHT};
`;
