export function hex2rgb(hex: string): [number, number, number] {
  const hexValue = hex.replace(/^#/, '');
  const r = parseInt(hexValue.substring(0, 2), 16);
  const g = parseInt(hexValue.substring(2, 4), 16);
  const b = parseInt(hexValue.substring(4, 6), 16);
  return [r, g, b];
}

export function hue2rgb(p: number, q: number, t: number) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

export function hsl2rgb(h: number, s: number, l: number): [number, number, number] {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // Achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 0.333);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 0.333);
  }

  return [r * 255, g * 255, b * 255];
}

export function hsb2rgb(h: number, s: number, b: number): [number, number, number] {
  h %= 360;
  h /= 60;
  s /= 100;
  b /= 100;

  const i = Math.floor(h);
  const f = h - i;
  const p = b * (1 - s);
  const q = b * (1 - s * f);
  const t = b * (1 - s * (1 - f));

  let r, g, bl;

  switch (i) {
    case 0:
      r = b;
      g = t;
      bl = p;
      break;
    case 1:
      r = q;
      g = b;
      bl = p;
      break;
    case 2:
      r = p;
      g = b;
      bl = t;
      break;
    case 3:
      r = p;
      g = q;
      bl = b;
      break;
    case 4:
      r = t;
      g = p;
      bl = b;
      break;
    default:
      r = b;
      g = p;
      bl = q;
      break;
  }

  return [r * 255, g * 255, bl * 255];
}

export function rgba2rgb(r: number, g: number, b: number, a: number): [number, number, number] {
  // Ensure alpha is within [0, 1]
  const alpha = Math.min(1, Math.max(0, a));

  // Calculate the resulting RGB values after blending with white background
  const blendedR = Math.round((1 - alpha) * 255 + alpha * r);
  const blendedG = Math.round((1 - alpha) * 255 + alpha * g);
  const blendedB = Math.round((1 - alpha) * 255 + alpha * b);

  // Convert the blended RGB values to HEX
  const toHex = (x: number): string => {
    const hexValue = Math.round(x).toString(16);
    return hexValue.length === 1 ? '0' + hexValue : hexValue;
  };

  return [blendedR, blendedG, blendedB];
}
