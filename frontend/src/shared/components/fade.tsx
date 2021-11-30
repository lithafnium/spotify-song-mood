import React, { Children, useEffect } from "react";
import { useTrail, animated, useTransition } from "react-spring";

export const FadeIn = (props: { children: JSX.Element | JSX.Element[] }) => {
  /*
        Description:
            Wraps around children elements and applies a fade-in animation. If multiple
            children are present, each child is faded in sequentially

        Usage:
            <ZestiFadeIn>
                <div>I will fade in</div>
                <div>I will fade in slightly later</div>
            </FractalFadeIn>

        Arguments:
            children(JSX.Element | JSX.Element[]): Any children nested within this component
    */

  const items = Children.toArray(props.children);
  // const indexed_items = items.map((item, i) => ({
  //   item,
  //   i,
  // }));

  // console.log(indexed_items);
  // const transitions = useTransition(indexed_items, {
  //   from: { opacity: 0 },
  //   leave: { opacity: 0 },
  //   enter: { opacity: 1 },
  //   onRest: () => ({ opacity: 1 }),
  // });

  // console.log("transitions:", transitions);
  const trail = useTrail(items.length, {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      tension: 150,
    },
  });
  return (
    <div {...props}>
      <div>
        {/* {transitions((styles, item) => {
          console.log(item);

          return <animated.div style={styles}>{item.item}</animated.div>;
        })} */}
        {trail.map((props: any, index: number) => (
          <animated.div key={index.toString()} style={props}>
            {items[index]}
          </animated.div>
        ))}
      </div>
    </div>
  );
};
