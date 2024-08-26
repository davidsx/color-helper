// import { normalize } from './basic';

// hex and alpha
// export const hexToAlpha = (alphaHexString: string) => {
//   return Math.round(normalize(parseInt(alphaHexString, 16), 255, 0) * 100);
// };

// export function rgbToHsl(r: number, g: number, b: number) {
//   (r /= 255), (g /= 255), (b /= 255);
//   const vMax = Math.max(r, g, b),
//     vMin = Math.min(r, g, b);
//   let h,
//     s,
//     l = (vMax + vMin) / 2;

//   if (vMax === vMin) {
//     return [0, 0, l]; // achromatic
//   }

//   const d = vMax - vMin;
//   s = l > 0.5 ? d / (2 - vMax - vMin) : d / (vMax + vMin);
//   if (vMax === r) h = (g - b) / d + (g < b ? 6 : 0);
//   if (vMax === g) h = (b - r) / d + 2;
//   if (vMax === b) h = (r - g) / d + 4;
//   h /= 6;

//   return [h, s, l];
// }

export * from './toHex';
export * from './basic';
