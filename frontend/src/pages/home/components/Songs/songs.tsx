import React from "react";
import { SongsContainer } from "./styles";
import { FaPlay } from "react-icons/fa";
import { IconContext } from "react-icons";

import { animated, useTransition } from "react-spring";
import { FadeIn } from "@app/shared/components";
import Song from "../Song/song";
// https://codesandbox.io/s/goofy-chaplygin-whvt4

const Songs = ({ songData, selectedSong, setSong }: any) => {
  const transition = useTransition(
    songData.map((s: any, i: number) => ({ ...s, key: i })),
    {
      key: (item) => item.key,
      from: { opacity: 0, transform: "translateY(50px)" },
      enter: { opacity: 1, transform: "translateY(0px)" },
      leave: { opacity: 0, transform: "translateY(50px)" },
      delay: 500,
    }
  );
  return (
    <SongsContainer>
      {/* {selectedSong && (
        <Song
          index={selectedSong.key}
          image_url={selectedSong.image_url}
          name={selectedSong.name}
          artists={selectedSong.artists}
          setSong={setSong}
        />
      )} */}
      {transition((styles, item) => {
        return (
          item && (
            <animated.div style={styles}>
              <Song
                index={item.key}
                image_url={item.image_url}
                name={item.name}
                artists={item.artists}
                setSong={setSong}
              />
            </animated.div>
          )
        );
      })}
    </SongsContainer>
  );
};

export default Songs;
