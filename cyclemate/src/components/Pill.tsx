import { ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

interface PillProps {
  label: string;
  icon?: ReactNode;
  backgroundColor: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
}

export const Pill = ({ label, icon, backgroundColor, textColor = '#232326', style }: PillProps) => {
  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      {icon}
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  label: {
    fontFamily: 'Nunito_500Medium',
    fontSize: 13,
  },
});
