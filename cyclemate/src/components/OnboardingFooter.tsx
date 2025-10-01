import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeProvider';

interface OnboardingFooterProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  currentStep: number;
  totalSteps: number;
  rightSlot?: ReactNode;
}

const OnboardingFooter = ({ label, onPress, disabled = false, currentStep, totalSteps, rightSlot }: OnboardingFooterProps) => {
  const theme = useTheme();
  const dots = Array.from({ length: totalSteps });

  return (
    <View style={styles.footer}>
      <View style={styles.dots}>
        {dots.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentStep
                ? { backgroundColor: theme.colors.primary }
                : styles.dotInactive,
            ]}
          />
        ))}
      </View>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="button"
        style={({ pressed }) => [styles.ctaWrapper, pressed && styles.pressed, disabled && styles.disabled]}
      >
        <LinearGradient colors={theme.gradients.primary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.cta}>
          <Text style={styles.label}>{label}</Text>
          {rightSlot}
        </LinearGradient>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 16,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  ctaWrapper: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  cta: {
    height: 56,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: 'rgba(168, 85, 247, 0.4)',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 14,
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

export default OnboardingFooter;
