/* eslint-disable unicorn/prefer-ternary */

import { v4 as uuidv4 } from 'uuid';

import {
  IMAGE_EXTENSIONS_SET,
  SVG_EXTENSIONS_SET,
} from '../constants/extensions.ts';

export class Filer extends Object {
  name: string;
  size: number;
  type: string;
  sizeString: string;
  lastModified: number;
  uid: number;
  extension: string;
  isImage: boolean;
  isSvg: boolean;
  url: string;
  toFile: () => File;

  constructor(file: File) {
    super();
    this.toFile = () => file;
    this.name = file.name;
    this.size = file.size;
    this.sizeString = formatBytes(file.size);
    this.type = file.type;
    this.lastModified = file.lastModified;
    this.uid = Number(uuidv4()) || Date.now(); // Если uid не передан, используем текущее время как uid
    this.extension = file.name.split('.').pop() ?? '';
    this.isImage = IMAGE_EXTENSIONS_SET.has(this.extension);
    this.isSvg = SVG_EXTENSIONS_SET.has(this.extension);
    this.url = URL.createObjectURL(file);
  }
}

export function getSvg(file: File) {
  const fileReader = new FileReader();

  fileReader.readAsText(file);

  let svg = '';

  fileReader.onloadend = () => {
    svg = fileReader.result as string;
  };

  return svg;
}

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Б';

  const k = 1024;

  if (bytes < k) return `${Number(bytes / 1000).toFixed(1)} Кб`;

  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Б', 'Кб', 'Мб', 'Гб', 'Тб'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${
    sizes[i]
  }`;
}
