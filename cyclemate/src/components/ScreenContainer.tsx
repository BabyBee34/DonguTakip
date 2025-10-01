import { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';

interface ScreenContainerProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  footer?: ReactNode;
}

export const ScreenContainer = ({ children, style, footer }: ScreenContainerProps) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={[{ flex: 1, paddingHorizontal: theme.spacing.lg }, style]}>{children}</View>
      {footer}
    </SafeAreaView>
  );
};
