export type RGB = {
  r: number;
  g: number;
  b: number;
};

export function parseColor(hexCode: string): RGB {
  const r = parseInt(hexCode.slice(0, 2), 16);
  const g = parseInt(hexCode.slice(2, 4), 16);
  const b = parseInt(hexCode.slice(4, 6), 16);
  return { r, g, b };
}

export function toCSS(color: RGB): string {
  return `rgb(${color.r},${color.g},${color.b})`;
}

export function scale(color: RGB, scl: number): RGB {
  return { r: color.r * scl, g: color.g * scl, b: color.b * scl };
}

export function sum(...colors: RGB[]): RGB {
  return colors.reduce((prev, curr) => ({
    r: prev.r + curr.r,
    g: prev.g + curr.g,
    b: prev.b + curr.b,
  }));
}
