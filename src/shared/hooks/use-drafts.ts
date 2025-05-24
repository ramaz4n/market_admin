import { useEffect, useMemo, useRef } from 'react';

import { LS_KEYS } from '@/shared/constants/ls-keys.ts';

export interface DraftOptions<T> {
  onClear?: () => void;
  onInit?: (draft: T) => void;
  onTrigger?: (draft: T) => void;
}

export function useDrafts<T extends object>(
  key?: string,
  options?: DraftOptions<T>,
) {
  const alertRef = useRef<HTMLDivElement>(null);

  function setDrafts(
    key: string,
    object: { name: string; value: string | string[] },
  ) {
    const isEnabledSaves = !JSON.parse(
      window.localStorage.getItem(LS_KEYS.saveDrafts) || 'true',
    );

    if (isEnabledSaves) return;

    const draftsModel = JSON.parse(
      window.localStorage.getItem(LS_KEYS.drafts ?? '{}')!,
    );

    const previousByKey = draftsModel?.[key] || {};

    const updater = { ...previousByKey };

    if (object.value) {
      updater[object.name] = object.value;
    } else {
      delete updater[object.name];
    }

    window.localStorage.setItem(
      LS_KEYS.drafts,
      JSON.stringify({ ...draftsModel, [key]: updater }),
    );
  }

  function removeDraft() {
    if (!key) return;

    const draftsModel = JSON.parse(
      window.localStorage.getItem(LS_KEYS.drafts || '{}')!,
    );

    delete draftsModel?.[key];

    window.localStorage.setItem(LS_KEYS.drafts, JSON.stringify(draftsModel));
  }

  let staticDraft = useMemo(
    () => JSON.parse(window.localStorage.getItem(LS_KEYS.drafts || '{}')!),
    [],
  );

  if (key) {
    staticDraft = staticDraft?.[key] || {};
  }

  const handleTrigger = () => {
    if (alertRef.current) {
      alertRef.current.dataset.triggered = 'true';
    }

    options?.onTrigger?.(staticDraft as T);
  };

  const handleClear = () => {
    removeDraft();

    if (alertRef.current) {
      alertRef.current.dataset.triggered = 'true';
    }
    options?.onClear?.();
  };

  useEffect(() => {
    options?.onInit?.(staticDraft as T);
  }, []);

  return {
    hasDrafts: Boolean(Object.values(staticDraft as T).length),
    onClear: handleClear,
    onTrigger: handleTrigger,
    ref: alertRef,
    removeDraft,
    setDrafts,
    staticDraft,
  };
}

export type UseDraftsReturn = ReturnType<typeof useDrafts>;
