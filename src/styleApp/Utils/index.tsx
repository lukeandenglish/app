import {Layout} from '../Layout';

const DEVICE_HEIGHT = Layout.window.height;
// --- DEVICE HEIGHTS ---
// 568 - SE
// 667 - 6, 6S, 7, 8, SE2
// 736 - 6 Plus, 6S Plus, 7 Plus, 8 Plus
// 812 - 12 mini, X, XS, 11 Pro
// 844 - 12, 12 Pro
// 896 - XR, XS Max, 11, 11 Pro Max
// 926 - 12 Pro Max
// --- END ---
const STANDARD_SCREEN_HEIGHT = 720;
const MAX_DEVICE_HEIGHT = Math.max(
  Math.min(DEVICE_HEIGHT * 1.05, STANDARD_SCREEN_HEIGHT),
  500,
);
const HEIGTH_K = MAX_DEVICE_HEIGHT / STANDARD_SCREEN_HEIGHT;

export function RV(value: number): number {
  const heightPercent = value * HEIGTH_K;

  return parseFloat(heightPercent.toFixed(2));
}

export const convertHexToRGBA = (hexCode: string, opacity = 1) => {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  /* Backward compatibility for whole number based opacity values. */
  if (opacity > 1 && opacity <= 100) {
    opacity /= 100;
  }

  return `rgba(${r},${g},${b},${opacity})`;
};
