import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { clamp, getConstraint, normalize } from '@/utils';

interface Hook<ConstraintElement extends HTMLElement = HTMLDivElement> {
  pickerPosition: { x: number; y: number };
  normalizedValue: { x: number; y: number };
  isPicking: boolean;
  pickerRef: React.RefObject<HTMLDivElement>;
  constraintRef: React.RefObject<ConstraintElement>;
}

export default function usePicker<ConstraintElement extends HTMLElement = HTMLDivElement>(
  initial: {
    x: number;
    y: number;
  } = { x: 0, y: 0 }
): Hook<ConstraintElement> {
  const [isInitialized, setIsInitialized] = useState(false);
  const [pickerPosition, setPickerPosition] = useState({ x: 0, y: 0 });
  const [isPicking, setIsPicking] = useState(false);
  const constraintRef = useRef<ConstraintElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const constraint = constraintRef.current;
    const picker = pickerRef.current;
    if (!isInitialized && initial && picker && constraint) {
      const x = clamp(initial.x, 1, 0);
      const y = clamp(initial.y, 1, 0);
      const { xMin, xMax, yMin, yMax } = getConstraint(constraint, picker);
      setPickerPosition({
        x: x * (xMax - xMin) + xMin,
        y: y * (yMax - yMin) + yMin,
      });
      setIsInitialized(true);
    }
  }, [initial, isInitialized]);

  const normalizedValue = useMemo(() => {
    const constraint = constraintRef.current;
    const picker = pickerRef.current;

    if (picker && constraint) {
      const { x, y } = pickerPosition;
      const { xMin, xMax, yMin, yMax } = getConstraint(constraint, picker);

      return {
        x: normalize(x, xMax, xMin),
        y: normalize(y, yMax, yMin),
      };
    }

    return { x: 0, y: 0 };
  }, [pickerPosition]);

  const updatePickerPosition = useCallback((mouseEvent: MouseEvent) => {
    const constraint = constraintRef.current;
    const picker = pickerRef.current;

    if (picker && constraint) {
      const { xMin, xMax, yMin, yMax } = getConstraint(constraint, picker);

      const { left, top } = constraint.getBoundingClientRect();
      const x = mouseEvent.clientX - left - picker.clientWidth / 2;
      const y = mouseEvent.clientY - top - picker.clientHeight / 2;

      setPickerPosition({
        x: clamp(x, xMax, xMin),
        y: clamp(y, yMax, yMin),
      });
    }
  }, []);

  const mouseUp = useCallback(() => setIsPicking(false), []);

  const mouseDown = useCallback(
    (mouseEvent: MouseEvent) => {
      updatePickerPosition(mouseEvent);
      setIsPicking(true);
    },
    [updatePickerPosition]
  );

  const mouseMove = useCallback(
    (mouseEvent: MouseEvent) => {
      if (isPicking) updatePickerPosition(mouseEvent);
    },
    [isPicking, updatePickerPosition]
  );

  useEffect(() => {
    const constraint = constraintRef.current;
    const picker = pickerRef.current;

    if (picker && constraint) {
      constraint.addEventListener('mousedown', mouseDown);
      window.addEventListener('mouseup', mouseUp);
      window.addEventListener('mousemove', mouseMove);

      return () => {
        constraint.removeEventListener('mousedown', mouseDown);
        window.removeEventListener('mouseup', mouseUp);
        window.removeEventListener('mousemove', mouseMove);
      };
    }
  }, [mouseDown, mouseMove, mouseUp]);

  return { pickerPosition, normalizedValue, isPicking, pickerRef, constraintRef };
}
