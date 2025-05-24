import { Children, cloneElement, ReactElement, useState } from 'react';

import {
  Tabs as TabsUI,
  type TabsProps as TabsPropsUI,
} from '@gravity-ui/uikit';

import { Components } from '@/shared/types/components.ts';
import { cn } from '@/shared/utils/cn.ts';

interface TabsProps extends TabsPropsUI {
  controlled?: boolean;
}

export const Tabs = ({ controlled, ...props }: TabsProps) => {
  const Component = controlled ? TabsControl : TabsPrimitive;

  return <Component {...props} />;
};

Tabs.displayName = Components.Tabs;

export const TabsPrimitive = ({
  children,
  items = [],
  ...props
}: TabsProps) => {
  const [active, setActive] = useState(items[0].id);

  return (
    <>
      <TabsUI
        {...props}
        activeTab={active}
        items={items}
        onSelectTab={setActive}
      />

      <TabContents activeTab={active}>{children}</TabContents>
    </>
  );
};

export const TabsControl = ({ activeTab, children, ...props }: TabsProps) => (
  <>
    <TabsUI {...props} activeTab={activeTab} />

    <TabContents activeTab={activeTab}>{children}</TabContents>
  </>
);

export const TabContents = ({
  children,
  activeTab,
}: Pick<TabsProps, 'children' | 'activeTab'>) =>
  Children.map(children, (child) => {
    const childElement = child as ReactElement;

    if (!childElement || !childElement.props) return null;

    const id = childElement.props.id;

    if (!id) {
      throw new Error('Every Tab child must have id');
    }

    return cloneElement(childElement, {
      ...childElement.props,
      className: cn(childElement.props.className, {
        hidden: activeTab !== id,
      }),
    });
  });

export const tabErrorClass = (bool: boolean, className?: string) => {
  if (className) {
    return cn(className, {
      'g-tab-error': bool,
    });
  } else {
    return bool ? 'g-tab-error' : '';
  }
};
