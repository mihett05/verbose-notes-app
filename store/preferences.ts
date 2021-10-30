import { createEvent, createStore, forward } from 'effector';
import i18n from 'i18next';

import '../i18n';

type ColorMode = 'light' | 'dark';

interface PreferencesStore {
  language: string;
  colorMode: ColorMode;
}

export const $preferences = createStore<PreferencesStore>({
  language: 'en',
  colorMode: 'light',
});

export const changeLanguage = createEvent<string>();
export const toggleColorMode = createEvent();
const loadPreferences = createEvent();

const i18nChangeLanguage = createEvent();

const getAndSetDefaultLocalStorage = (key: string, defaultValue: string, isOk?: (value: string) => boolean): string => {
  // get value from localStorage or return defaultValue and set defaultValue to localStorage
  const value = localStorage.getItem(key);
  if (value === null || (isOk && !isOk(value))) {
    localStorage.setItem(key, defaultValue);
    return defaultValue;
  }

  return value;
};

forward({
  from: [loadPreferences, changeLanguage],
  to: i18nChangeLanguage,
});

$preferences
  .on(loadPreferences, (state) => {
    return {
      ...state,
      language: getAndSetDefaultLocalStorage('language', state.language),
      colorMode: getAndSetDefaultLocalStorage(
        'colorMode',
        state.colorMode,
        (value) => value === 'light' || value === 'dark',
      ) as ColorMode,
    };
  })
  .on(changeLanguage, (state, language: string) => {
    localStorage.setItem('language', language);
    return {
      ...state,
      language,
    };
  })
  .on(i18nChangeLanguage, (state) => {
    console.log(state.language);
    i18n.changeLanguage(state.language);
    return { ...state };
  })
  .on(toggleColorMode, (state) => {
    const newMode = state.colorMode === 'light' ? 'dark' : 'light';
    localStorage.setItem('colorMode', newMode);
    return {
      ...state,
      colorMode: newMode,
    };
  });

if (typeof window !== 'undefined') {
  loadPreferences();
}
