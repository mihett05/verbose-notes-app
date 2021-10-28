import { createEvent, createStore } from 'effector';

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

const getAndSetDefaultLocalStorage = (key: string, defaultValue: string, isOk?: (value: string) => boolean): string => {
  // get value from localStorage or return defaultValue and set defaultValue to localStorage
  const value = localStorage.getItem(key);
  if (value === null || (isOk && !isOk(value))) {
    localStorage.setItem(key, defaultValue);
    return defaultValue;
  }

  return value;
};

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
