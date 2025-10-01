import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "@react-native-community/slider";
import OnboardingFooter from "../../components/OnboardingFooter";
import { useTheme } from "../../theme/ThemeProvider";
import { useOnboarding } from "../onboarding/OnboardingContext";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { markOnboardingComplete, markSetupComplete, updatePrefs } from "../../store/appSlice";
import { todayISO } from "../../utils/date";
import { navigationRef, resetToMain } from "../../navigation/RootNavigation";
import { useTranslation } from "../../i18n";

const MIN_CYCLE_DAYS = 21;
const MAX_CYCLE_DAYS = 35;
const DEFAULT_CYCLE_DAYS = 28;

const CycleLengthScreen = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { state, update, reset } = useOnboarding();
  const { hasCompletedOnboarding, hasCompletedSetup } = useAppSelector((appState) => appState.app.meta);

  const [value, setValue] = useState<number>(state.avgCycleDays ?? DEFAULT_CYCLE_DAYS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const spin = useRef(new Animated.Value(0)).current;
  const shouldNavigateRef = useRef(false);
  const retryAttemptsRef = useRef(0);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      }),
    );

    animation.start();
    return () => {
      animation.stop();
    };
  }, [spin]);

  const roundedValue = useMemo(() => Math.round(value), [value]);

  useEffect(() => {
    if (!shouldNavigateRef.current) {
      return;
    }

    if (!hasCompletedOnboarding || !hasCompletedSetup) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const attemptReset = () => {
      if (!shouldNavigateRef.current) {
        return;
      }

      if (!navigationRef.isReady()) {
        if (retryAttemptsRef.current < 20) {
          retryAttemptsRef.current += 1;
          timeoutId = setTimeout(attemptReset, 50);
        } else {
          shouldNavigateRef.current = false;
          retryAttemptsRef.current = 0;
          setIsSubmitting(false);
        }
        return;
      }

      resetToMain();
      shouldNavigateRef.current = false;
      retryAttemptsRef.current = 0;
      setIsSubmitting(false);
    };

    attemptReset();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [hasCompletedOnboarding, hasCompletedSetup]);

  const handleFinish = () => {
    if (isSubmitting) {
      return;
    }

    const lastPeriod = state.lastPeriodStart ?? todayISO();
    const prefsPayload = {
      avgPeriodDays: state.avgPeriodDays,
      avgCycleDays: roundedValue,
      lastPeriodStart: lastPeriod,
    };

    setIsSubmitting(true);
    shouldNavigateRef.current = true;
    retryAttemptsRef.current = 0;

    update(prefsPayload);
    dispatch(updatePrefs(prefsPayload));
    dispatch(markOnboardingComplete());
    dispatch(markSetupComplete());
    reset();
  };

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });

  return (
    <LinearGradient colors={["#F4EEFF", "#FFE6F2"]} style={styles.gradient}>
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.ink }]}>{t("setup.cycleLength.title")}</Text>
          <Text style={[styles.subtitle, { color: theme.colors.inkSoft }]}>{t("setup.cycleLength.subtitle")}</Text>
          <Text style={[styles.helper, { color: theme.colors.inkSoft }]}>{t("setup.cycleLength.helper")}</Text>
        </View>

        <View style={styles.circleSection}>
          <Animated.View style={[styles.outerRing, { transform: [{ rotate }] }]} />
          <View style={styles.innerRing}>
            <Text style={[styles.value, { color: theme.colors.primary }]}>{roundedValue}</Text>
            <Text style={styles.valueLabel}>gün</Text>
          </View>
        </View>

        <View style={styles.sliderSection}>
          <Slider
            value={value}
            minimumValue={MIN_CYCLE_DAYS}
            maximumValue={MAX_CYCLE_DAYS}
            step={1}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor="rgba(168, 139, 255, 0.25)"
            thumbTintColor={theme.colors.primary}
            onValueChange={setValue}
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>{MIN_CYCLE_DAYS}</Text>
            <Text style={styles.sliderLabel}>{MAX_CYCLE_DAYS}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{t("setup.cycleLength.badge", { days: roundedValue })}</Text>
          </View>
        </View>
        <Text style={[styles.disclaimer, { color: theme.colors.inkSoft }]}>{t("onboarding.common.disclaimer")}</Text>
      </View>

      <OnboardingFooter
        label={t("setup.cycleLength.cta")}
        onPress={handleFinish}
        disabled={isSubmitting}
        currentStep={2}
        totalSteps={3}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 24,
  },
  header: {
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 28,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Nunito_400Regular",
    fontSize: 16,
    textAlign: "center",
  },
  helper: {
    fontFamily: "Nunito_400Regular",
    fontSize: 13,
    textAlign: "center",
  },
  circleSection: {
    width: 220,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
  },
  outerRing: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "rgba(168, 139, 255, 0.4)",
  },
  innerRing: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(168, 139, 255, 0.35)",
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
  },
  value: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 54,
  },
  valueLabel: {
    fontFamily: "Nunito_500Medium",
    fontSize: 16,
    color: "#6A6A6F",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  sliderSection: {
    width: "100%",
    maxWidth: 340,
    gap: 12,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  sliderLabel: {
    fontFamily: "Nunito_500Medium",
    fontSize: 12,
    color: "#6A6A6F",
  },
  badge: {
    alignSelf: "center",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    shadowColor: "rgba(168, 139, 255, 0.25)",
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 14,
  },
  badgeText: {
    fontFamily: "Nunito_700Bold",
    fontSize: 14,
    color: "#232326",
  },
  disclaimer: {
    fontFamily: "Nunito_400Regular",
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: 12,
  },
});

export default CycleLengthScreen;
