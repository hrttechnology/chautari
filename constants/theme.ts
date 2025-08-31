import { DefaultTheme, configureFonts } from 'react-native-paper';
import { Platform } from 'react-native';

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400' as const,
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500' as const,
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300' as const,
    },
    thin: {
      fontFamily: 'System',
      fontWeight: '100' as const,
    },
  },
  ios: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400' as const,
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500' as const,
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300' as const,
    },
    thin: {
      fontFamily: 'System',
      fontWeight: '100' as const,
    },
  },
  android: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal' as const,
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal' as const,
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal' as const,
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal' as const,
    },
  },
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1a73e8',
    accent: '#fbbc05',
    background: '#ffffff',
    surface: '#ffffff',
    error: '#d32f2f',
    text: '#202124',
    disabled: '#9e9e9e',
    placeholder: '#9e9e9e',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: '#f50057',
    border: '#e0e0e0',
    card: '#ffffff',
  },
  fonts: configureFonts(fontConfig),
  roundness: 8,
  animation: {
    scale: 1.0,
  },
};

export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: '#8ab4f8',
    accent: '#fbbc05',
    background: '#121212',
    surface: '#1e1e1e',
    error: '#cf6679',
    text: '#e1e1e1',
    disabled: '#9e9e9e',
    placeholder: '#9e9e9e',
    backdrop: 'rgba(0, 0, 0, 0.7)',
    notification: '#ff8a80',
    border: '#333333',
    card: '#1e1e1e',
  },
};
