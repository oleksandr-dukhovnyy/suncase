import enLocale from '~/locales/en-US.json';

type lazyLocale =
  | Localization.Locale
  | Promise<Localization.Locale>
  | (() => Promise<Localization.Locale>);

const locales: {
  'en-US': lazyLocale;
  'uk-UA': lazyLocale;
} = {
  'en-US': enLocale,
  'uk-UA': () => import('~/locales/uk-UA.json').then((m) => m.default || m),
};

const state = reactive<{
  locale: Localization.Lang['value'];
  messages: Localization.Locale;
}>({
  locale: 'en-US',
  messages: enLocale,
});

// TODO: use i18n
export default function useLocalization() {
  return {
    locale: computed(() => state.locale),

    t(localeKey: string, fallback?: string): string {
      if (!state.messages) {
        console.log('missing messages');

        return fallback || localeKey;
      }

      const text = extractByDottedKey<string>(localeKey, state.messages);

      if (!text)
        console.error(
          `Missing translation for ${localeKey} in ${state.locale}`
        );

      return text || fallback || localeKey;
    },

    async setLocale(locale: Localization.Lang['value']) {
      const assetLoadingResult = await loadLocale(locale);

      if (assetLoadingResult) {
        state.locale = locale;
        state.messages = locales[locale] as Localization.Locale;
      }

      return true;
    },
  };
}

function extractByDottedKey<T>(key: string, obj: object): T | undefined {
  return key.split('.').reduce((o, k) => o?.[k], obj) as T;
}

async function loadLocale(locale: Localization.Lang['value']) {
  let asset = locales[locale];

  if (!asset) return false;
  if (typeof asset === 'function') asset = asset();
  if (asset instanceof Promise) asset = await asset;
  if (locales[locale] !== asset) locales[locale] = asset;

  return true;
}
