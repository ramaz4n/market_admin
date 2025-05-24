export const dataAttr = (name: string, value: unknown, toBool = true) => ({
  [`data-${name}`]: toBool ? String(Boolean(value)) : String(value),
});

export const digitPx = (v: number) => `${v}px`;
