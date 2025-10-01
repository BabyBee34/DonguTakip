import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import OnboardingFooter from "../../components/OnboardingFooter";
import { useTheme } from "../../theme/ThemeProvider";
import { useOnboarding } from "../onboarding/OnboardingContext";
import type { OnboardingStackParamList } from "../../navigation/RootNavigator";
import { useTranslation } from "../../i18n";

const flameEmoji = "🔥";

type PeriodLengthNav = NativeStackNavigationProp<OnboardingStackParamList, "PeriodLength">;

const PeriodLengthScreen = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<PeriodLengthNav>();
  const { state, update } = useOnboarding();
  const [value, setValue] = useState<number>(state.avgPeriodDays ?? 5);

  const handleNext = () => {
    update({ avgPeriodDays: Math.round(value) });
    navigation.navigate("CycleLength");
  };

  const displayValue = Math.round(value);

  return (
    <LinearGradient colors={["#F3E7ED", "#FDE9F2"]} style={styles.gradient}>
      <View style={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.flame}>{flameEmoji}</Text>
        </View>
        <Text style={[styles.title, { color: theme.colors.ink }]}>{t("setup.periodLength.title")}</Text>
        <Text style={[styles.subtitle, { color: theme.colors.inkSoft }]}>{t("setup.periodLength.subtitle")}</Text>
        <Text style={[styles.helper, { color: theme.colors.inkSoft }]}>{t("setup.periodLength.helper")}</Text>
        <View style={styles.sliderWrapper}>
          <Slider
            style={styles.slider}
            minimumValue={3}
            maximumValue={10}
            step={1}
            value={value}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor="rgba(240,66,153,0.2)"
            thumbTintColor={theme.colors.primary}
            onValueChange={setValue}
          />
          <View style={styles.scaleLabels}>
            {[3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <Text key={item} style={styles.scaleItem}>
                {item}
              </Text>
            ))}
          </View>
          <View style={styles.valueBadge}>
            <Text style={styles.valueText}>{t("setup.periodLength.badge", { days: displayValue })}</Text>
          </View>
        </View>
        <Text style={[styles.disclaimer, { color: theme.colors.inkSoft }]}>{t("onboarding.common.disclaimer")}</Text>
      </View>
      <OnboardingFooter
        label={t("actions.next")}
        onPress={handleNext}
        currentStep={1}
        totalSteps={3}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 16,
  },
  hero: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(240, 66, 153, 0.1)",
  },
  flame: {
    fontSize: 80,
  },
  title: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 28,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Nunito_400Regular",
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
  },
  helper: {
    fontFamily: "Nunito_400Regular",
    fontSize: 13,
    textAlign: "center",
  },
  sliderWrapper: {
    width: "100%",
    maxWidth: 320,
    gap: 12,
  },
  slider: {
    width: "100%",
    height: 50,
  },
  scaleLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  scaleItem: {
    fontFamily: "Nunito_500Medium",
    fontSize: 12,
    color: "#6A6A6F",
  },
  valueBadge: {
    marginTop: 12,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    shadowColor: "rgba(240,66,153,0.25)",
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
  },
  valueText: {
    fontFamily: "Nunito_700Bold",
    fontSize: 16,
    color: "#f04299",
  },
  disclaimer: {
    fontFamily: "Nunito_400Regular",
    fontSize: 12,
    textAlign: "center",
  },
});

export default PeriodLengthScreen;
