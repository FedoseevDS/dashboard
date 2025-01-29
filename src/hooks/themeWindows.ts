export const calculateSettingAsThemeString = () => {
  const systemSettingDark = window.matchMedia('(prefers-color-scheme: dark)');

  if (systemSettingDark.matches) {
    return 'dark';
  }

  return 'light';
};
