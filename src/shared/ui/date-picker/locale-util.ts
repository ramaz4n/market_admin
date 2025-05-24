import { configure, Lang } from '@gravity-ui/uikit';

configure({ lang: Lang.Ru });
import { settings } from '@gravity-ui/date-utils';

// Locales management
settings.getLocale();
// eslint-disable-next-line unicorn/prefer-top-level-await
settings.loadLocale(Lang.Ru).then(() => {
  settings.setLocale(Lang.Ru);
  settings.getLocale();
});

// Customization
settings.updateLocale({ weekStart: 0 }); // change first day of week
