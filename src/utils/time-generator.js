export function generateTime() {
  const minutes = [...Array(59).keys()].map(minute => ++minute);
  const hours = [...Array(23).keys()].map(hour => ++hour);

  return {
    hours,
    minutes
  };
}
