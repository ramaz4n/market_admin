interface FormDataParseProps {
  fileName?: string;
  files?: File[];
}

export const formDataParse = <T extends object>(
  data: T,
  { files = [], fileName = 'files' }: FormDataParseProps,
) => {
  const postData = new FormData();

  for (const [k, v] of Object.entries(data as Record<string, unknown>)) {
    postData.append(k, v as string);
  }

  if (files?.length) {
    for (const file of files) {
      postData.append(`${fileName}[]`, file);
    }
  }

  return postData;
};
