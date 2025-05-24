import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { authApi } from '@/shared/api/auth.ts';
import { login } from '@/shared/models/auth.ts';
import { AuthLoginProps } from '@/shared/types/api/auth.ts';

export const useAuthPage = () => {
  const methods = useForm<AuthLoginProps>({
    defaultValues: {
      email: import.meta.env.VITE_API_DEFUALT_USERNAME,
      password: import.meta.env.VITE_API_DEFUALT_PASS,
    },
  });

  const mutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (res) => {
      // if (status === 406) {
      //   return apiErrorParse(data, { setError: methods.setError });
      // }

      login(res);
    },
  });

  const onSubmit = (data: AuthLoginProps) => mutation.mutate(data);

  return { methods, mutation, onSubmit };
};
