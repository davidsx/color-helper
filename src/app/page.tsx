'use client';

import { useEffect, useState } from 'react';
import HuePicker from './HuePicker';
import { alphaToHex, getContrastColor, hsb2hex, rgb2hex, roundOff } from '@/utils';
import SaturationPicker from './SaturationPicker';
import AlphaPicker from './AlphaPicker';
import { hsb2rgb, rgba2rgb } from '@/utils/toRGB';
import DisplayRGB from './DisplayRGB';
import DisplayHSB from './DisplayHSB';
import { IconEye, IconArrowsHorizontal, IconArrowBack } from '@tabler/icons-react';

export default function Home() {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [alpha, setAlpha] = useState(1);
  const [hex, setHex] = useState('#FF0000');

  const [viewAllAlpha, setViewAllAlpha] = useState(false);

  useEffect(() => {
    const hex = hsb2hex(hue, saturation, brightness);
    setHex(alpha < 1 ? hex + alphaToHex(alpha) : hex);
  }, [hue, saturation, brightness, alpha]);

  const rgb = hsb2rgb(hue, saturation, brightness);
  const rgbFromRgba = rgba2rgb(rgb[0], rgb[1], rgb[2], alpha);
  const hexFromRgba = rgb2hex(rgbFromRgba[0], rgbFromRgba[1], rgbFromRgba[2]);

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="fixed inset-0 flex flex-col md:flex-row">
        <div
          className="flex flex-1 flex-col items-center py-16 font-mono text-xl font-bold last:justify-end md:justify-center md:text-4xl md:last:justify-center"
          style={{ backgroundColor: hex, color: getContrastColor(hexFromRgba) }}
        >
          rgba({roundOff(rgb[0], 0)},{roundOff(rgb[1], 0)},{roundOff(rgb[2], 0)},{roundOff(alpha, 2)})
        </div>
        <div
          className="flex flex-1 flex-col items-center py-16 font-mono text-xl font-bold last:justify-end md:justify-center md:text-4xl md:last:justify-center"
          style={{ backgroundColor: hexFromRgba, color: getContrastColor(hexFromRgba) }}
        >
          rgb({roundOff(rgbFromRgba[0], 0)},{roundOff(rgbFromRgba[1], 0)},{roundOff(rgbFromRgba[2], 0)})
        </div>
      </div>
      <div className="relative z-10 flex w-[320px] select-none flex-col gap-4 rounded-xl bg-white p-4 shadow-2xl">
        <div className="flex h-10 items-center gap-px rounded-lg border border-gray-500 p-2 focus-within:outline-gray-700">
          <span className="text-gray-400">#</span>
          <input
            className="flex-1 focus:outline-none"
            value={hex.replace('#', '').toUpperCase()}
            onChange={(e): void => {
              const value = e.currentTarget.value.toUpperCase();
              console.log(/^[0-9A-F]{0,8}$/.test(value));
              if (!value) return setHex('');
              if (/^[0-9A-F]{0,8}$/.test(value)) return setHex(`#${value}`);
            }}
            pattern="[0-9A-F]"
          />
        </div>
        <SaturationPicker hue={hue} updateSaturation={setSaturation} updateBrightness={setBrightness} />
        <HuePicker updateHue={setHue} />
        <DisplayRGB rgb={rgb} />
        <DisplayHSB hsb={[hue, saturation, brightness]} />
        <AlphaPicker hue={hue} updateAlpha={setAlpha} />
        <div className="flex flex-1 items-center justify-between gap-1">
          <button className="flex items-center gap-2 text-gray-400" onClick={() => setViewAllAlpha(true)}>
            Alpha <IconEye size={16} />
          </button>
          <div>
            {roundOff(alpha * 100, 0)}% / {alphaToHex(alpha).toUpperCase()}
          </div>
        </div>
        {viewAllAlpha && (
          <div className="absolute inset-0 z-10 flex flex-col rounded-xl bg-white p-2">
            <button className="flex h-12 items-center justify-start gap-2" onClick={() => setViewAllAlpha(false)}>
              <IconArrowBack size={16} />
              Back
            </button>
            <div className="flex flex-1 flex-col gap-2 overflow-auto">
              {Array.from({ length: 101 }).map((_, i) => (
                <div key={i} className="flex h-10 items-center gap-1 rounded bg-gray-200 py-2">
                  <span className="flex-1 text-right">{i}%</span>
                  <IconArrowsHorizontal size={24} />
                  <span className="flex-1 text-left">{alphaToHex(i / 100).toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
