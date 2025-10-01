export interface ThemeColors {
  primary: string;
  primary600: string;
  primary200: string;
  lilac: string;
  mint: string;
  danger: string;
  info: string;
  ink: string;
  inkSoft: string;
  background: string;
  backgroundSoft: string;
  success: string;
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface ThemeRadii {
  card: number;
  button: number;
  fab: number;
  pill: number;
}

export interface ThemeTypography {
  display: { fontSize: number; lineHeight: number; fontFamily: string; fontWeight: '700' };
  h2: { fontSize: number; lineHeight: number; fontFamily: string; fontWeight: '700' };
  body: { fontSize: number; lineHeight: number; fontFamily: string; fontWeight: '400' };
  caption: { fontSize: number; lineHeight: number; fontFamily: string; fontWeight: '500' };
}

export interface ThemeShadow {
  elevation: number;
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
}

export interface ThemeGradients {
  primary: [string, string, string];
  card: [string, string];
}

export interface ThemeTokens {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  radii: ThemeRadii;
  typography: ThemeTypography;
  shadows: {
    card: ThemeShadow;
    floating: ThemeShadow;
  };
  gradients: ThemeGradients;
}

export const lightTheme: ThemeTokens = {
  colors: {
    primary: '#E66FD2',
    primary600: '#D052BE',
    primary200: '#F6DDF2',
    lilac: '#B59CFF',
    mint: '#7AD1C5',
    danger: '#FF5A76',
    info: '#6F9BFF',
    ink: '#232326',
    inkSoft: '#6A6A6F',
    background: '#FFFFFF',
    backgroundSoft: '#F7F7FA',
    success: '#53C7A6',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  radii: {
    card: 16,
    button: 24,
    fab: 28,
    pill: 999,
  },
  typography: {
    display: { fontSize: 32, lineHeight: 38, fontFamily: 'Fredoka_700Bold', fontWeight: '700' },
    h2: { fontSize: 18, lineHeight: 24, fontFamily: 'Fredoka_700Bold', fontWeight: '700' },
    body: { fontSize: 16, lineHeight: 22, fontFamily: 'Nunito_400Regular', fontWeight: '400' },
    caption: { fontSize: 13, lineHeight: 18, fontFamily: 'Nunito_500Medium', fontWeight: '500' },
  },
  shadows: {
    card: {
      elevation: 4,
      shadowColor: 'rgba(35, 35, 38, 0.1)',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
    },
    floating: {
      elevation: 8,
      shadowColor: 'rgba(35, 35, 38, 0.2)',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
    },
  },
  gradients: {
    primary: ['#FF9AD2', '#C78BFF', '#9E6BFF'],
    card: ['rgba(255, 154, 210, 0.6)', 'rgba(199, 139, 255, 0.6)'],
  },
};

export const darkTheme: ThemeTokens = {
  colors: {
    primary: "#F196DF",
    primary600: "#E07CC6",
    primary200: "#5A2F6F",
    lilac: "#A18BFF",
    mint: "#5DB8AB",
    danger: "#FF7B90",
    info: "#80A8FF",
    ink: "#F4F4FB",
    inkSoft: "#B3B3CC",
    background: "#13131A",
    backgroundSoft: "#1C1C24",
    success: "#63D1B1",
  },
  spacing: lightTheme.spacing,
  radii: lightTheme.radii,
  typography: lightTheme.typography,
  shadows: {
    card: {
      elevation: 0,
      shadowColor: "rgba(0, 0, 0, 0.4)",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 12,
    },
    floating: {
      elevation: 0,
      shadowColor: "rgba(0, 0, 0, 0.6)",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.6,
      shadowRadius: 20,
    },
  },
  gradients: {
    primary: ["#F58EDC", "#A686FF", "#7457FF"],
    card: ["rgba(122, 209, 197, 0.25)", "rgba(197, 139, 255, 0.25)"],
  },
};

