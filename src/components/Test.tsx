import React, { useState } from 'react';

const Test = () => {
  const [text, setTest] = useState<string>();

  return (
    <div>
      Text: {text}
      <input type="text" onChange={e => setTest(e.target.value)} />
      <button type="button"></button>
    </div>
  );
};

export default Test;
