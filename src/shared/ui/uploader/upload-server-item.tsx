// import { memo } from 'react';
//
// import { IMAGE_EXTENSIONS_SET } from '../../constants/extensions.ts';
// import { ServerFile } from '../../types/global.ts';
// import { Icon } from '../icon/icon.tsx';
//
// interface UploadServerFileProps extends ServerFile {
//   onDefaultFileRemove?: (id: number) => void;
// }
//
// export const UploadServerFile = memo(
//   ({ id, publicLink, name, onDefaultFileRemove }: UploadServerFileProps) => {
//     const renderFileContent = () => {
//       if (IMAGE_EXTENSIONS_SET.has(name.split('.').pop() ?? '')) {
//         return (
//           <img
//             alt={name}
//             className='aspect-[1/1.2] w-[70px] rounded-md object-cover text-xs animated group-hover/item:brightness-50'
//             src={publicLink}
//           />
//         );
//       }
//
//       return (
//         <Icon
//           className='fill-placeholder'
//           height={70 * 1.2}
//           name='common/file'
//           width={70}
//         />
//       );
//     };
//
//     return (
//       <button
//         className='border-border group/item relative w-fit rounded-md border border-dotted p-1.5'
//         title={name}
//         type='button'
//       >
//         <div className='invisible absolute inset-0 rounded-md bg-black/50 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100' />
//
//         {renderFileContent()}
//
//         <button
//           className='invisible inline-block opacity-0 transition-all duration-300 pos-abs group-hover/item:visible group-hover/item:opacity-100'
//           type='button'
//           onClick={() => onDefaultFileRemove?.(id)}
//         >
//           <Icon className='text-white clamp-4' name='common/trash' />
//         </button>
//       </button>
//     );
//   },
// );

export const UploadServerItem = () => <div></div>;
