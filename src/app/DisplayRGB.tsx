import { roundOff } from '@/utils';

interface Props {
  rgb: [number, number, number];
}

export default function DisplayRGB({ rgb }: Props): JSX.Element {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col items-center gap-1">
        <div className="text-gray-400">Red</div>
        <div>{roundOff(rgb[0], 0)}</div>
      </div>
      <div className="flex flex-1 flex-col items-center gap-1">
        <div className="text-gray-400">Green</div>
        <div>{roundOff(rgb[1], 0)}</div>
      </div>
      <div className="flex flex-1 flex-col items-center gap-1">
        <div className="text-gray-400">Blue</div>
        <div>{roundOff(rgb[2], 0)}</div>
      </div>
    </div>
  );
}
