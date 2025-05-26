import { Masks } from '@/shared/constants/masks.ts';
import { Mask } from '@/shared/types/mask.ts';
import formatWithMask from '@/shared/utils/format-with-mask.ts';

export class Maskito {
  format(text?: string, mask?: Mask): string {
    return formatWithMask({ mask: mask || Masks.phone, text }).masked;
  }
}

export const maskito = new Maskito();
