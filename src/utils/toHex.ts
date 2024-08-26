import { normalize } from './basic';
import { hex2rgb, hsb2rgb, hsl2rgb } from './toRGB';

export function toHex(x: number): string {
  const hex = Math.round(x).toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

export function alphaToHex(alpha: number): string {
  return Math.round(alpha * 255)
    .toString(16)
    .padStart(2, '0');
}

export function rgb2hex(r: number, g: number, b: number): string {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function hsl2hex(h: number, s: number, l: number): string {
  const [r, g, b] = hsl2rgb(h, s, l);
  return rgb2hex(r, g, b);
}

export function hsb2hex(h: number, s: number, v: number): string {
  const [r, g, b] = hsb2rgb(h, s, v);
  return rgb2hex(r, g, b);
}

export function hue2hex(hue: number): string {
  const h = ((hue % 360) + 360) % 360; // Ensure hue is within [0, 360)
  const [r, g, b] = hsb2rgb(h, 100, 100); // Convert HSL to RGB
  return rgb2hex(r, g, b);
}

export function getContrastColor(hexColor: string): string {
  const rgbValues = hex2rgb(hexColor);

  // Calculate relative luminance for each color component
  const calculateLuminance = (value: number): number => {
    value /= 255;
    return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  };

  const luminance = rgbValues.map(calculateLuminance);

  // Calculate contrast ratio
  const calculateContrastRatio = (lumA: number, lumB: number): number => {
    return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
  };

  const backgroundLuminance = luminance[0] * 0.2126 + luminance[1] * 0.7152 + luminance[2] * 0.0722;

  // Determine which color to use for text based on contrast ratio
  if (calculateContrastRatio(backgroundLuminance, 0) > 4.5) {
    return '#000000'; // Use black for better contrast
  } else {
    return '#FFFFFF'; // Use white for better contrast
  }
}
