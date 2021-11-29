import styled, { keyframes } from "styled-components";
import { device } from "@app/shared/components/layout/layout";
import { colors, fonts } from "@app/styles/styles";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  min-height: 100vh;

  padding-top: 30vh;
  padding-bottom: 5em;

  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box;

  background-color: ${colors.DARKPRIMARY};
`;

export const ContainerInner = styled.div`
  max-width: 992px;

  @media ${device.mobileS} {
    box-sizing: border-box;
    width: 80%;
  }

  @media ${device.laptopM} {
    padding: 0px 0px;
    width: 100%;
  }
`;

export const Inputs = styled.div`
  display: flex;
  width: 100%;
`;

export const Songs = styled.div`
  margin-top: 2em;
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(
      0,
      1fr
    );
  column-gap: 25px;
  row-gap: 25px;
`;
