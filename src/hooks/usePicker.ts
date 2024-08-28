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

  const updatePickerPosition = useCallback((event: MouseEvent | TouchEvent) => {
    const constraint = constraintRef.current;
    const picker = pickerRef.current;

    if (picker && constraint) {
      const { xMin, xMax, yMin, yMax } = getConstraint(constraint, picker);

      const clientX = 'clientX' in event ? event.clientX : event.touches[0].clientX;
      const clientY = 'clientY' in event ? event.clientY : event.touches[0].clientY;
      const { left, top } = constraint.getBoundingClientRect();
      const x = clientX - left - picker.clientWidth / 2;
      const y = clientY - top - picker.clientHeight / 2;

      setPickerPosition({
        x: clamp(x, xMax, xMin),
        y: clamp(y, yMax, yMin),
      });
    }
  }, []);

  const pickerStop = useCallback(() => setIsPicking(false), []);

  const mouseDown = useCallback(
    (event: MouseEvent) => {
      updatePickerPosition(event);
      setIsPicking(true);
    },
    [updatePickerPosition]
  );

  const mouseMove = useCallback(
    (event: MouseEvent) => {
      if (isPicking) updatePickerPosition(event);
    },
    [isPicking, updatePickerPosition]
  );

  const touchStart = useCallback(
    (event: TouchEvent) => {
      updatePickerPosition(event);
      setIsPicking(true);
    },
    [updatePickerPosition]
  );

  const touchMove = useCallback(
    (event: TouchEvent) => {
      if (isPicking) updatePickerPosition(event);
    },
    [isPicking, updatePickerPosition]
  );

  useEffect(() => {
    const constraint = constraintRef.current;
    const picker = pickerRef.current;

    if (picker && constraint) {
      constraint.addEventListener('mousedown', mouseDown);
      constraint.addEventListener('touchstart', touchStart);
      window.addEventListener('mousemove', mouseMove);
      window.addEventListener('touchmove', touchMove);
      window.addEventListener('mouseup', pickerStop);
      window.addEventListener('touchend', pickerStop);
      window.addEventListener('touchcancel', pickerStop);

      return () => {
        constraint.removeEventListener('mousedown', mouseDown);
        constraint.removeEventListener('touchstart', touchStart);
        window.removeEventListener('mousemove', mouseMove);
        window.removeEventListener('touchmove', touchMove);
        window.removeEventListener('mouseup', pickerStop);
        window.removeEventListener('touchend', pickerStop);
        window.removeEventListener('touchcancel', pickerStop);
      };
    }
  }, [mouseDown, mouseMove, pickerStop, touchMove, touchStart]);

  return { pickerPosition, normalizedValue, isPicking, pickerRef, constraintRef };
}
