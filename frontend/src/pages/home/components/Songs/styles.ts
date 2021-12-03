import styled, { keyframes } from "styled-components";
import { device } from "@app/shared/components/layout/layout";
import { colors, fonts } from "@app/styles/styles";

export const SongsContainer = styled.div<{ selected?: boolean }>`
  margin-top: 2em;
  width: 100%;
  display: grid;
  grid-template-columns: ${(props) =>
    props.selected
      ? "minmax(0, 1fr) minmax(0, 3fr)"
      : "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0,1fr)"};

  column-gap: 25px;
  row-gap: 25px;

  position: relative;
`;
