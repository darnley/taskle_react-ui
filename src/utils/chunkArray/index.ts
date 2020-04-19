const chunkArray = <T extends unknown>(
  initialArray: T[],
  chunk: number = 3
) => {
  let temparray = new Array<Array<T>>();

  for (let i = 0, j = initialArray.length; i < j; i += chunk) {
    temparray.push(initialArray.slice(i, i + chunk));
  }

  return temparray;
};

export default chunkArray;
