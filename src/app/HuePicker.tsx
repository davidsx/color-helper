'use client';

import usePicker from '@/hooks/usePicker';
import { useEffect } from 'react';

interface Props {
  updateHue: (hue: number) => void;
}

const BACKGROUND = 'linear-gradient(90deg, #f00 0, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00)';

export default function HuePicker({ updateHue }: Props): JSX.Element {
  const { pickerPosition, normalizedValue, pickerRef, constraintRef } = usePicker({ x: 0, y: 0.5 });

  useEffect(() => {
    const { x } = normalizedValue;
    updateHue(360 * x);
  }, [updateHue, normalizedValue]);

  return (
    <div
      className="shadow-inset relative h-2.5 rounded-full px-px"
      style={{ background: BACKGROUND }}
      ref={constraintRef}
    >
      <div
        className="absolute -left-[5px] -top-[5px] z-10 size-5 rounded-full border-[5px] border-white bg-transparent shadow-[rgba(0,0,0,0.4)_0px_0px_4px_0px] transition-colors duration-200 hover:shadow-gray-700 active:shadow-gray-700"
        style={{ transform: `translateX(${pickerPosition.x}px)` }}
        ref={pickerRef}
        draggable="false"
      >
        <div className="shadow-inset size-full rounded-full" />
      </div>
    </div>
  );
}
