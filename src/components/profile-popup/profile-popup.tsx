import { Fragment } from 'react';

import { ArrowRightFromSquare, PersonPencil } from '@gravity-ui/icons';
import { Icon, Loader, Tooltip, User } from '@gravity-ui/uikit';
import { Link } from 'react-router-dom';
import { useBoolean } from 'usehooks-ts';

import { LINKS } from '@/shared/constants/links.ts';
import { USER_ROLE_ICON } from '@/shared/constants/user-role-icon.ts';
import { useLogout } from '@/shared/hooks/api/use-logout.ts';
import { useProfile } from '@/shared/hooks/api/use-profile.ts';
import { Button } from '@/shared/ui/button/button.tsx';
import { Popover } from '@/shared/ui/popover/popover.tsx';

export const ProfilePopup = () => {
  const control = useBoolean(false);

  const { model, refetch, isLoading, isFetching } = useProfile();
  const logout = useLogout();

  const toggleOpen = async () => {
    if (control.value) {
      control.setFalse();
    } else {
      control.setTrue();
      await refetch();
    }
  };

  const getName = () => {
    if (!model) return null;

    if (model.first_name || model.last_name) {
      return `${model.first_name ?? ''} ${model.last_name ?? ''}`;
    }

    return model.email ?? '';
  };

  const getDescription = () => {
    if (!model) return null;

    if (getName() === model.email) {
      return model.role;
    }

    return model.email;
  };

  if (!model) return null;

  return (
    <Popover
      control
      isOpen={control.value}
      offset={[0, 12]}
      placement='right-end'
      content={
        <div className='flex w-72 flex-col gap-4 p-2'>
          {isLoading || isFetching ? (
            <Loader className='mx-auto' />
          ) : (
            <Fragment>
              <div className='flex-between'>
                <div className='relative w-fit'>
                  <User
                    className='g-user-aside-popup'
                    description={getDescription()}
                    name={getName()}
                    avatar={{
                      borderColor: 'rgb(70, 196, 249)',
                      imgUrl: '/images/avatar.webp',
                    }}
                  />

                  {model.role && (
                    <div className='bg-accent absolute -bottom-1 left-4.5 z-30 size-fit rounded p-0.5 flex-center'>
                      <Icon
                        className='text-white'
                        data={USER_ROLE_ICON[model.role]}
                        size={12}
                      />
                    </div>
                  )}
                </div>

                <Tooltip content='Выйти' openDelay={300} placement='left'>
                  <Button view='flat' onClick={logout}>
                    <Icon data={ArrowRightFromSquare} />
                  </Button>
                </Tooltip>
              </div>

              <Link to={LINKS.profile}>
                <Button
                  className='w-full justify-start'
                  size='l'
                  view='flat'
                  onClick={control.setFalse}
                >
                  <Icon data={PersonPencil} />
                  Редактировать профиль
                </Button>
              </Link>
            </Fragment>
          )}
        </div>
      }
      onValueChange={control.setValue}
    >
      <button
        className='px-2.5 py-1 transition duration-150 hover:bg-hover'
        onClick={toggleOpen}
      >
        <User
          avatar={{ text: model.email, theme: 'brand' }}
          className='g-user-aside-popup'
          name='Учетная запись'
        />
      </button>
    </Popover>
  );
};
