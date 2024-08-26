export function clamp(val: number, max: number, min: number) {
  return Math.max(min, Math.min(max, val));
}

export function normalize(val: number, max: number, min: number) {
  return (clamp(val, max, min) - min) / (max - min);
}

export const getConstraint = (constraint: HTMLElement, element: HTMLElement) => {
  const constraintWidth = constraint.offsetWidth;
  const constraintHeight = constraint.offsetHeight;
  const pickerWidth = element.offsetWidth;
  const pickerHeight = element.offsetHeight;
  const xMax = Math.max(constraintWidth - pickerWidth / 2, 0);
  const xMin = 0;
  const yMax = Math.max(constraintHeight - pickerHeight / 2, 0);
  const yMin = 0;

  return { xMax, xMin, yMax, yMin };
};

export function roundOff(value: number, precision: number) {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}
