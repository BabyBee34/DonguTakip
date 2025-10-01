import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeProvider';

interface GradientButtonProps {
  label: string;
  onPress?: () => void;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  disabled?: boolean;
  accessibilityLabel?: string;
}

export const GradientButton = ({
  label,
  onPress,
  leftSlot,
  rightSlot,
  disabled = false,
  accessibilityLabel,
}: GradientButtonProps) => {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed, disabled && styles.disabled]}
    >
      <LinearGradient
        colors={theme.gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {leftSlot}
        <Text style={styles.label}>{label}</Text>
        {rightSlot}
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 32,
    overflow: 'hidden',
  },
  gradient: {
    height: 60,
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  label: {
    color: '#FFFFFF',
    fontFamily: 'Nunito_700Bold',
    fontSize: 18,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
});
