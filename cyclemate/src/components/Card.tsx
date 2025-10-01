import { ReactNode } from 'react';
import { StyleSheet, ViewStyle, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
  variant?: 'glass' | 'solid';
}

export const Card = ({ children, style, variant = 'solid' }: CardProps) => {
  const theme = useTheme();
  const baseStyle = [styles.base, style];

  if (variant === 'glass') {
    return <View style={[styles.base, styles.glass, style]}>{children}</View>;
  }

  return <View style={[styles.base, { backgroundColor: theme.colors.background }, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 20,
    padding: 20,
    shadowColor: 'rgba(35, 35, 38, 0.1)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 6,
  },
  glass: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
});
