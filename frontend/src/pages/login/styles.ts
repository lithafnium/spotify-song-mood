import styled from "styled-components";
import { device } from "@app/shared/components/layout/layout";
import { colors } from "@app/styles/styles";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  min-height: 100vh;

  padding-top: 20vh;
  padding-bottom: 5em;

  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box;

  background-color: ${colors.DARKPRIMARY};
`;

export const ContainerInner = styled.div`
  position: relative;
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
