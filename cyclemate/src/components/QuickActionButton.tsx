import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface QuickActionButtonProps {
  label: string;
  icon?: ReactNode;
  colors: [string, string];
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
}

export const QuickActionButton = ({ label, icon, colors, onPress, style }: QuickActionButtonProps) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.wrapper, pressed && styles.pressed, style]}>      
      <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
        {icon}
        <Text style={styles.label}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 56,
    borderRadius: 24,
    paddingHorizontal: 20,
  },
  label: {
    fontFamily: 'Nunito_700Bold',
    color: '#FFFFFF',
    fontSize: 16,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
  },
});
