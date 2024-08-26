'use client';

import usePicker from '@/hooks/usePicker';
import { hue2hex } from '@/utils';
import { cn } from '@/utils/tailwind';
import { useEffect } from 'react';

interface Props {
  hue: number;
  updateAlpha: (alpha: number) => void;
}

const TRANSPARENT_BACKGROUND =
  'repeating-linear-gradient(45deg, #E6E6E6 25%, transparent 25%, transparent 75%, #E6E6E6 75%, #E6E6E6), repeating-linear-gradient(45deg, #E6E6E6 25%, #EFEFEF 25%, #EFEFEF 75%, #E6E6E6 75%, #E6E6E6)';

export default function AlphaPicker({ hue, updateAlpha }: Props): JSX.Element {
  const { pickerPosition, normalizedValue, pickerRef, constraintRef } = usePicker({ x: 1, y: 0.5 });

  const color = hue2hex(hue);

  useEffect(() => {
    const { x } = normalizedValue;
    updateAlpha(x);
  }, [updateAlpha, normalizedValue]);

  return (
    <div className="shadow-inset relative h-2.5 rounded-full px-px" ref={constraintRef}>
      <div
        className="absolute inset-0 size-full rounded-full bg-[#EFEFEF] bg-[length:10px_10px] bg-[0_0,5px_5px] bg-repeat opacity-50"
        style={{ backgroundImage: TRANSPARENT_BACKGROUND }}
      />
      <div
        className="absolute inset-0 size-full rounded-full"
        style={{ background: `linear-gradient(90deg, rgba(0, 0, 0, 0), ${color} 90%, ${color})` }}
      />
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
