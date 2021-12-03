import styled from "styled-components";
import { colors } from "@app/styles/styles";

export const Button = styled.div`
  position: absolute;

  right: 10px;
  bottom: 0px;

  width: 40px;
  height: 40px;
  border-radius: 50%;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box;

  padding-left: 2px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${colors.SECONDARY};
  font-size: 0.9em;
  color: white;
  opacity: 0;

  transition: all 0.3s ease;
  transition: width none;
  transition: height none;

  &:hover {
    width: 42px;
    height: 42px;
  }
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

export const Container = styled.div<{ hide?: boolean }>`
  width: 100%;
  padding: 18px;
  background-color: ${colors.DARKSECONDARY};
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box;
  border-radius: 3px;
  transition: 0.2s;

  // opacity: ${(props) => (props.hide ? 0.0 : 1.0)};

  &:hover {
    cursor: pointer;
    background-color: #2e2e2e;
  }

  &:hover ${Button} {
    opacity: 1;
    transform: translateY(-13px);
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;
`;

export const Image = styled.img`
  border-radius: 3px;
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
