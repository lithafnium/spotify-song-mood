import React, { Children, useEffect } from "react";
import { useTrail, animated, useTransition } from "react-spring";
import { Transition } from "react-spring";

export const FadeTransition = (props: {
  children: JSX.Element | JSX.Element[];
}) => {
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
  const indexed_items = items.map((item, key) => ({
    item,
    key,
  }));

  return (
    <div {...props}>
      <div>
        <Transition
          items={indexed_items}
          keys={(item) => item.key}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
        >
          {({ opacity }, item) => {
            console.log(item);
            return <animated.div style={opacity}>{item.item}</animated.div>;
          }}
        </Transition>
      </div>
    </div>
  );
};
