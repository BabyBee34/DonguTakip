import { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Defs, G, Path, RadialGradient, Stop, Circle } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import OnboardingFooter from "../../components/OnboardingFooter";
import { useTheme } from "../../theme/ThemeProvider";
import type { OnboardingStackParamList } from "../../navigation/RootNavigator";
import { useTranslation } from "../../i18n";

type SparkleConfig = {
  position: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  delay: number;
  color: string;
};

const sparkleConfig: SparkleConfig[] = [
  { position: { top: 36, left: 32 }, delay: 0, color: "#A7F3D0" },
  { position: { top: 60, right: 24 }, delay: 400, color: "#FBBF24" },
  { position: { bottom: 48, left: 48 }, delay: 900, color: "#BFDBFE" },
  { position: { bottom: 92, right: 32 }, delay: 650, color: "#FBCFE8" },
  { position: { top: 24, right: 120 }, delay: 1100, color: "#FDD2BF" },
  { position: { bottom: 36, left: 108 }, delay: 1450, color: "#E9D5FF" },
];

type WelcomeNav = NativeStackNavigationProp<OnboardingStackParamList, "Welcome">;

const WelcomeScreen = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<WelcomeNav>();

  const pulse = useRef(new Animated.Value(0)).current;
  const sparkles = useMemo(() => sparkleConfig.map(() => new Animated.Value(0)), []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 3200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 3200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [pulse]);

  useEffect(() => {
    sparkles.forEach((value, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(sparkleConfig[index].delay),
          Animated.timing(value, {
            toValue: 1,
            duration: 1200,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 1200,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    });
  }, [sparkles]);

  const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.035] });

  const handleContinue = () => {
    navigation.navigate("Reminders");
  };

  return (
    <LinearGradient colors={["#FDE2F3", "#E9D5FF"]} style={styles.gradient}>
      <View style={styles.content}>
        <View style={styles.heroWrapper}>
          {sparkles.map((animatedValue, index) => {
            const transformStyle = {
              transform: [
                {
                  scale: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.4, 1],
                  }),
                },
              ],
              opacity: animatedValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 0.8, 0],
              }),
            };
            return (
              <Animated.View
                key={`sparkle-${index}`}
                style={[
                  styles.sparkle,
                  transformStyle,
                  sparkleConfig[index].position,
                  { backgroundColor: sparkleConfig[index].color },
                ]}
              />
            );
          })}
          <Animated.View style={[styles.hero, { transform: [{ scale }] }]}>            
            <Svg width={260} height={260} viewBox="0 0 200 200">
              <Defs>
                <RadialGradient id="petal" cx="50%" cy="50%" r="70%">
                  <Stop offset="0%" stopColor="#FBCFE8" stopOpacity="1" />
                  <Stop offset="100%" stopColor="#F472B6" stopOpacity="1" />
                </RadialGradient>
              </Defs>
              <G transform="translate(100 100)">
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                  <Path
                    key={angle}
                    d="M0 -80 C 36 -80, 36 -44, 0 0 C -36 -44, -36 -80, 0 -80"
                    fill="url(#petal)"
                    transform={`rotate(${angle})`}
                  />
                ))}
              </G>
              <Circle cx="100" cy="100" r="26" fill="#FBBF24" />
              <Circle cx="100" cy="100" r="8" fill="#FDE2F3" />
            </Svg>
          </Animated.View>
        </View>
        <View style={styles.textBlock}>
          <Text style={[styles.title, { color: theme.colors.ink }]}>{t("onboarding.welcome.title")}</Text>
          <Text style={[styles.subtitle, { color: theme.colors.inkSoft }]}>{t("onboarding.welcome.subtitle")}</Text>
        </View>
      </View>
      <OnboardingFooter
        label={t("actions.continue")}
        onPress={handleContinue}
        currentStep={0}
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
    paddingTop: 32,
    gap: 32,
  },
  heroWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  hero: {
    width: 260,
    height: 260,
    borderRadius: 130,
    alignItems: "center",
    justifyContent: "center",
  },
  sparkle: {
    position: "absolute",
    width: 14,
    height: 14,
    borderRadius: 7,
    shadowColor: "#FFFFFF",
    shadowRadius: 8,
    shadowOpacity: 0.6,
  },
  textBlock: {
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 12,
  },
  title: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 32,
    lineHeight: 38,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Nunito_400Regular",
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
  },
});

export default WelcomeScreen;
