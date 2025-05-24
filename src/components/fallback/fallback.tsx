import { Loader, Text } from '@gravity-ui/uikit';

export const Fallback = ({ text }: { text?: string }) => (
  <div className='h-dvh w-dvw flex-center'>
    {text ? (
      <div className='flex flex-col items-center justify-center gap-2'>
        <Text className='block text-center'>{text}</Text>
        <Loader size='l' />
      </div>
    ) : (
      <Loader size='l' />
    )}
  </div>
);
