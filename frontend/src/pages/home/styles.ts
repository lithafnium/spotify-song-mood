import styled, { keyframes } from "styled-components";
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

export const Inputs = styled.div`
  display: flex;
  width: 100%;
  z-index: 9999;
`;

export const PreloadContainer = styled.div<{ loading?: Boolean }>`
  z-index: 2;
  width: 100%;
  // height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  opacity: ${(props) => (props.loading ? 1 : 0)};

  margin-top: ${(props) => (props.loading ? "2em" : "0px")};
  transition: 0.2s;
  height: ${(props) => (props.loading ? "100px" : "0px")};
`;

const preloadAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Preloader = styled.div<{ loading?: Boolean }>`
  display: ${(props) => (props.loading ? "inline-block" : "none")};
  position: relative;
  width: 80px;
  height: 80px;

  & div {
    animation: ${preloadAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;
  }

  & div:after {
    content: " ";
    display: block;
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #fff;
    margin: -4px 0 0 -4px;
  }

  & div:nth-child(1) {
    animation-delay: -0.036s;
  }

  & div:nth-child(1):after {
    top: 63px;
    left: 63px;
  }

  & div:nth-child(2) {
    animation-delay: -0.072s;
  }
  & div:nth-child(2):after {
    top: 68px;
    left: 56px;
  }
  & div:nth-child(3) {
    animation-delay: -0.108s;
  }
  & div:nth-child(3):after {
    top: 71px;
    left: 48px;
  }
  & div:nth-child(4) {
    animation-delay: -0.144s;
  }
  & div:nth-child(4):after {
    top: 72px;
    left: 40px;
  }
  & div:nth-child(5) {
    animation-delay: -0.18s;
  }
  & div:nth-child(5):after {
    top: 71px;
    left: 32px;
  }
  & div:nth-child(6) {
    animation-delay: -0.216s;
  }
  & div:nth-child(6):after {
    top: 68px;
    left: 24px;
  }
  & div:nth-child(7) {
    animation-delay: -0.252s;
  }
  & div:nth-child(7):after {
    top: 63px;
    left: 17px;
  }
  & div:nth-child(8) {
    animation-delay: -0.288s;
  }
  & div:nth-child(8):after {
    top: 56px;
    left: 12px;
  }
`;
