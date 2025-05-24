export type MaskItem = string | RegExp | [RegExp];

export type MaskArray = Array<MaskItem>;

export type Mask = MaskArray | ((value?: string) => MaskArray);

export type FormatWithMaskProps = {
  mask?: Mask;

  maskAutoComplete?: boolean;

  obfuscationCharacter?: string;

  text?: string;
};

export type FormatWithMaskResult = {
  masked: string;
  obfuscated: string;
  unmasked: string;
};

export type ParseMaskProps = {
  pattern: RegExp;

  text?: string;
};
