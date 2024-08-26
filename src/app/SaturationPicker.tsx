'use client';

import usePicker from '@/hooks/usePicker';
import { hue2hex } from '@/utils';
import { useEffect } from 'react';

interface Props {
  hue: number;
  updateSaturation: (saturation: number) => void;
  updateBrightness: (brightness: number) => void;
}

const BACKGROUND = 'linear-gradient(0deg, #000, transparent), linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0))';

export default function SaturationPicker({ hue, updateSaturation, updateBrightness }: Props): JSX.Element {
  const { pickerPosition, normalizedValue, pickerRef, constraintRef } = usePicker({ x: 1, y: 0 });
  const color = hue2hex(hue);

  useEffect(() => {
    const { x, y } = normalizedValue;
    console.log({ x, y });
    updateSaturation(100 * x);
    updateBrightness(100 - 100 * y);
  }, [normalizedValue, updateBrightness, updateSaturation]);

  return (
    <div
      className="shadow-inset relative h-40 rounded-lg p-px"
      style={{ backgroundImage: BACKGROUND, backgroundColor: `#${color.replace(/^#/, '')}` }}
      ref={constraintRef}
    >
      <div
        className="absolute -left-[5px] -top-[5px] z-10 size-5 rounded-full border-[5px] border-white bg-transparent shadow-[rgba(0,0,0,0.4)_0px_0px_4px_0px] transition-colors duration-200 hover:shadow-gray-700 active:shadow-gray-700"
        style={{ transform: `translateX(${pickerPosition.x}px) translateY(${pickerPosition.y}px)` }}
        ref={pickerRef}
        draggable="false"
      >
        <div className="size-full rounded-full border border-gray-200" />
      </div>
    </div>
  );
}
