import styled, { keyframes } from "styled-components";
import { device } from "@app/shared/components/layout/layout";
import { colors, fonts } from "@app/styles/styles";

export const Container = styled.div`
  width: 100%;
  padding: 15px;
  background-color: ${colors.DARKSECONDARY};
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box;
  border-radius: 5px;
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    background-color: #2e2e2e;
  }
`;

export const Image = styled.img`
  border-radius: 5px;
  max-width: 100%;
  width: 100%;
  height: auto;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

export const Title = styled.h3`
  color: ${colors.HIGHLIGHT};
  font-size: 15px;
  margin: 0px;
  margin-top: 1em;
  margin-bottom: 0.3em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Artists = styled.p`
  color: ${colors.HIGHLIGHT};
  opacity: 0.8;
  font-size: 13px;
  margin: 0px;
  margin-bottom: 1em;
  // text-overflow: ellipsis;
`;
