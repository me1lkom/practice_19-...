import { createTheme } from '@mui/material/styles';

// Основные цвета из ваших CSS файлов
const commonColors = {
  primary: '#4299e1',
  primaryDark: '#3182ce',
  success: '#38a169',
  successLight: '#c8e6c9',
  successDark: '#4caf50',
  warning: '#dd6b20',
  warningLight: '#ffe0b2',
  warningDark: '#ff9800',
  error: '#e53e3e',
  errorLight: '#ffcdd2',
  errorDark: '#f44336',
  info: '#718096',
  deadlineActive: '#28a745',
  deadlineWarning: '#ffc107',
  deadlineExpired: '#dc3545',
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: commonColors.primary,
      light: '#63b3ed',
      dark: commonColors.primaryDark,
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6c757d',
      light: '#a0aec0',
      dark: '#4a5568',
      contrastText: '#ffffff',
    },
    success: {
      main: commonColors.success,
      light: commonColors.successLight,
      dark: commonColors.successDark,
      contrastText: '#ffffff',
    },
    error: {
      main: commonColors.error,
      light: commonColors.errorLight,
      dark: commonColors.errorDark,
      contrastText: '#ffffff',
    },
    warning: {
      main: commonColors.warning,
      light: commonColors.warningLight,
      dark: commonColors.warningDark,
      contrastText: '#ffffff',
    },
    info: {
      main: commonColors.info,
      light: '#a0aec0',
      dark: '#4a5568',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffff',
      paper: '#ffff',
    },
    text: {
      primary: '#2d3748',
      secondary: '#4a5568',
      disabled: '#a0aec0',
    },
    // Дополнительные цвета для ваших компонентов
    custom: {
      deadlineActive: commonColors.deadlineActive,
      deadlineWarning: commonColors.deadlineWarning,
      deadlineExpired: commonColors.deadlineExpired,
      statusCompleted: commonColors.successDark,
      statusInProgress: commonColors.warningDark,
      statusNotStarted: commonColors.errorDark,
      statusCompletedBg: commonColors.successLight,
      statusInProgressBg: commonColors.warningLight,
      statusNotStartedBg: commonColors.errorLight,
      border: '#e2e8f0',
      borderFocus: '#4299e1',
      formBackground: '#f8f9fa',
      cardBackground: '#ffffff',
      searchBackground: '#f8fafc',
      modalBackground: '#ffffff',
      notesBackground: '#f8fafc',
    },
    divider: '#e2e8f0',
    action: {
      active: '#4299e1',
      hover: 'rgba(66, 153, 225, 0.04)',
      selected: 'rgba(66, 153, 225, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '2.2rem',
      fontWeight: 600,
      color: '#2d3748',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.8rem',
      fontWeight: 600,
      color: '#2d3748',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#2d3748',
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#2d3748',
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.1rem',
      fontWeight: 600,
      color: '#2d3748',
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#2d3748',
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#4a5568',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#4a5568',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#718096',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.875rem',
    },
    caption: {
      fontSize: '0.75rem',
      color: '#a0aec0',
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0, 0, 0, 0.05)',
    '0 2px 6px rgba(0, 0, 0, 0.08)',
    '0 4px 12px rgba(0, 0, 0, 0.12)',
    '0 8px 16px rgba(0, 0, 0, 0.16)',
    '0 8px 30px rgba(0, 0, 0, 0.08)',
    ...Array(19).fill('none'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 600,
          padding: '12px 24px',
          fontSize: '15px',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease',
          },
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e1e8ed',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          '&.page': {
            backgroundColor: '#ffffff',
            borderRadius: 16,
            padding: 24,
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e1e8ed',
          },
          '&.statistic-page': {
            backgroundColor: '#ffffff',
            borderRadius: 16,
            padding: 24,
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e1e8ed',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#e2e8f0',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4299e1',
              borderWidth: 2,
              boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.1)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          '&.MuiChip-filledSuccess': {
            backgroundColor: commonColors.successDark,
            color: 'white',
          },
          '&.MuiChip-filledWarning': {
            backgroundColor: commonColors.warningDark,
            color: 'white',
          },
          '&.MuiChip-filledError': {
            backgroundColor: commonColors.errorDark,
            color: 'white',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          height: 8,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#e2e8f0',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#2d3748',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
          '& .main-navigation': {
            backgroundColor: '#ffffff',
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#63b3ed',
      light: '#90cdf4',
      dark: '#4299e1',
      contrastText: '#1a202c',
    },
    secondary: {
      main: '#a0aec0',
      light: '#cbd5e0',
      dark: '#718096',
      contrastText: '#1a202c',
    },
    success: {
      main: '#68d391',
      light: '#d4edda',
      dark: '#38a169',
      contrastText: '#1a202c',
    },
    error: {
      main: '#fc8181',
      light: '#f8d7da',
      dark: '#e53e3e',
      contrastText: '#1a202c',
    },
    warning: {
      main: '#f6ad55',
      light: '#fff3cd',
      dark: '#dd6b20',
      contrastText: '#1a202c',
    },
    info: {
      main: '#a0aec0',
      light: '#cbd5e0',
      dark: '#718096',
      contrastText: '#1a202c',
    },
    background: {
      default: '#1a202c',
      paper: '#2d3748',
    },
    text: {
      primary: '#ffffff',
      secondary: '#e2e8f0',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    // Дополнительные цвета для темной темы
    custom: {
      deadlineActive: '#68d391',
      deadlineWarning: '#f6ad55',
      deadlineExpired: '#fc8181',
      statusCompleted: '#68d391',
      statusInProgress: '#f6ad55',
      statusNotStarted: '#fc8181',
      statusCompletedBg: 'rgba(104, 211, 145, 0.2)',
      statusInProgressBg: 'rgba(246, 173, 85, 0.2)',
      statusNotStartedBg: 'rgba(252, 129, 129, 0.2)',
      border: '#4a5568',
      borderFocus: '#63b3ed',
      formBackground: '#2d3748',
      cardBackground: '#2d3748',
      searchBackground: '#2d3748',
      modalBackground: '#2d3748',
      notesBackground: '#2d3748',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    action: {
      active: '#63b3ed',
      hover: 'rgba(99, 179, 237, 0.08)',
      selected: 'rgba(99, 179, 237, 0.16)',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
    },
  },
  typography: {
    ...lightTheme.typography,
    h1: { ...lightTheme.typography.h1, color: '#ffffff' },
    h2: { ...lightTheme.typography.h2, color: '#ffffff' },
    h3: { ...lightTheme.typography.h3, color: '#ffffff' },
    h4: { ...lightTheme.typography.h4, color: '#ffffff' },
    h5: { ...lightTheme.typography.h5, color: '#ffffff' },
    h6: { ...lightTheme.typography.h6, color: '#ffffff' },
    subtitle1: { ...lightTheme.typography.subtitle1, color: '#e2e8f0' },
    body1: { ...lightTheme.typography.body1, color: '#e2e8f0' },
    body2: { ...lightTheme.typography.body2, color: '#a0aec0' },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0, 0, 0, 0.3)',
    '0 2px 6px rgba(0, 0, 0, 0.4)',
    '0 4px 12px rgba(0, 0, 0, 0.5)',
    '0 8px 16px rgba(0, 0, 0, 0.6)',
    '0 8px 30px rgba(0, 0, 0, 0.2)',
    ...Array(19).fill('none'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          ...lightTheme.components?.MuiButton?.styleOverrides?.root,
          color: '#ffffff',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
          },
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
          border: '1px solid #4a5568',
          backgroundColor: '#2d3748',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#2d3748',
          color: '#ffffff',
          '&.page': {
            backgroundColor: '#2d3748',
            color: '#ffffff',
            border: '1px solid #4a5568',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
          },
          '&.statistic-page': {
            backgroundColor: '#2d3748',
            color: '#ffffff',
            border: '1px solid #4a5568',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4a5568',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#63b3ed',
              borderWidth: 2,
              boxShadow: '0 0 0 3px rgba(99, 179, 237, 0.1)',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#a0aec0',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          '&.MuiChip-filledSuccess': {
            backgroundColor: '#68d391',
            color: '#1a202c',
          },
          '&.MuiChip-filledWarning': {
            backgroundColor: '#f6ad55',
            color: '#1a202c',
          },
          '&.MuiChip-filledError': {
            backgroundColor: '#fc8181',
            color: '#1a202c',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          height: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 255, 255, 0.12)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#e2e8f0',
          '&:hover': {
            backgroundColor: 'rgba(99, 179, 237, 0.1)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#2d3748',
          color: '#ffffff',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          '& .main-navigation': {
            backgroundColor: '#2d3748',
            borderColor: '#4a5568',
          },
        },
      },
    },
  },
});

export default { lightTheme, darkTheme };