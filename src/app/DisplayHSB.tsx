import { roundOff } from '@/utils';

interface Props {
  hsb: [number, number, number];
}

export default function DisplayHSB({ hsb: [h, s, b] }: Props): JSX.Element {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col items-center gap-1">
        <div className="text-gray-400">Hue</div>
        <div>{roundOff(h, 0)}&deg;</div>
      </div>
      <div className="flex flex-1 flex-col items-center gap-1">
        <div className="text-gray-400">Saturation</div>
        <div>{roundOff(s, 0)}%</div>
      </div>
      <div className="flex flex-1 flex-col items-center gap-1">
        <div className="text-gray-400">Brightness</div>
        <div>{roundOff(b, 0)}%</div>
      </div>
    </div>
  );
}
