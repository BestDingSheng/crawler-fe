export const lightTheme = {
  colors: {
    primary: '#1677ff',
    background: '#ffffff',
    text: 'rgba(0, 0, 0, 0.85)',
    textSecondary: 'rgba(0, 0, 0, 0.45)',
    border: 'rgba(0, 0, 0, 0.06)',
    cardBackground: '#ffffff',
    headerBackground: '#ffffff',
    footerBackground: '#000000',
  }
}

export const darkTheme = {
  colors: {
    primary: '#1677ff',
    background: '#141414',
    text: 'rgba(255, 255, 255, 0.85)',
    textSecondary: 'rgba(255, 255, 255, 0.45)',
    border: 'rgba(255, 255, 255, 0.06)',
    cardBackground: '#1f1f1f',
    headerBackground: '#1f1f1f',
    footerBackground: '#000000',
  }
}

export type Theme = typeof lightTheme 