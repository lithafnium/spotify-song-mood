import React from "react";
import { Container, Image, Title, Artists } from "./styles";

const Song = ({ image, artist, title }: any) => {
  return (
    <Container>
      <Image src={image} />
      <Title>{title}</Title>
      <Artists>{artist}</Artists>
    </Container>
  );
};

export default Song;
