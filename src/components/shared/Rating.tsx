import React, { useState, useEffect } from 'react';

export interface IRatingProps {
  /**
   * The component to be iterated.
   */
  renderComponent: any;
  /**
   * A number from 0 to outOf. The component does not currently handle fractional stars.
   */
  stars: number;
  /**
   * A number, 2 or greater. The component does not currently handle fractional stars.
   */
  outOf: number;
  /**
   * A hexadecimal color used as an active/colored star.
   */
  fullColor: string;
  /**
   * A hexadecimal color used as an inactive/empty star.
   */
  emptyColor: string;
  /**
   * A hexadecimal color used as an mouse-over star.
   */
  hoverColor: string;
  /**
   * Callback on star change.
   */
  onChange: (star: number) => void;
}

const Rating: React.FunctionComponent<IRatingProps> = props => {
  const [stars, setStars] = useState<number[]>([]);
  const [currentStarCount, setCurrentStarCount] = useState<number>(props.stars);
  const [focusOn, setFocusOn] = useState<number>(0);

  useEffect(() => {
    let starArray: number[] = [];

    for (let i = 1; i <= props.outOf; i++) starArray.push(i);

    setStars(starArray);
  }, [props.outOf]);

  const onStarChanging = (starNumber: number) => {
    setCurrentStarCount(starNumber);
    props.onChange(starNumber);
  };

  const getStyles = (starNumber: number): React.CSSProperties => {
    let returnObject: React.CSSProperties = {
      cursor: 'pointer',
    };

    // Fill
    if (starNumber <= currentStarCount) {
      returnObject.color = props.fullColor;
    } else {
      returnObject.color = props.emptyColor;
    }

    // Hover
    if (starNumber <= focusOn) {
      returnObject.color = props.hoverColor;
    }

    return returnObject;
  };

  return (
    <span>
      {stars.map((v, i) => (
        <span
          key={v}
          style={getStyles(v)}
          onClick={() => onStarChanging(v)}
          onMouseOver={() => setFocusOn(v)}
          onMouseLeave={() => setFocusOn(0)}
        >
          {props.renderComponent}
        </span>
      ))}
    </span>
  );
};

export default Rating;
