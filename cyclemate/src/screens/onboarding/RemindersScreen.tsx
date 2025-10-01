import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import OnboardingFooter from "../../components/OnboardingFooter";
import { useTheme } from "../../theme/ThemeProvider";
import type { OnboardingStackParamList } from "../../navigation/RootNavigator";
import { useTranslation } from "../../i18n";

const EMOJIS = ["🍫", "💧", "🧘‍♀️"];
const EMOJI_POSITIONS = [
  { top: 40, left: 40 },
  { top: 120, right: 32 },
  { bottom: 20, left: 60 },
];

type RemindersNav = NativeStackNavigationProp<OnboardingStackParamList, "Reminders">;

const RemindersScreen = () => {
  const theme = useTheme();
  const { t, tList } = useTranslation();
  const navigation = useNavigation<RemindersNav>();
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 2600,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 2600,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [pulse]);

  const heartScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.05] });
  const floatingTranslate = pulse.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, -10, 0] });

  const handleNext = () => {
    navigation.navigate("Privacy");
  };

  const points = tList("onboarding.reminders.points");

  return (
    <LinearGradient colors={["#D4F2E9", "#FDE8ED"]} style={styles.gradient}>
      <View style={styles.content}>
        <View style={styles.heroWrapper}>
          {EMOJIS.map((emoji, index) => (
            <Animated.Text
              key={emoji}
              style={[
                styles.floatingEmoji,
                EMOJI_POSITIONS[index],
                { transform: [{ translateY: floatingTranslate }] },
              ]}
            >
              {emoji}
            </Animated.Text>
          ))}
          <Animated.View style={[styles.heartWrapper, { transform: [{ scale: heartScale }] }]}>            
            <Svg width={220} height={220} viewBox="0 0 200 200">
              <Defs>
                <SvgLinearGradient id="heartGradient" x1="0%" x2="100%" y1="0%" y2="100%">
                  <Stop offset="0%" stopColor="#FFB6C1" />
                  <Stop offset="100%" stopColor="#C8A2C8" />
                </SvgLinearGradient>
              </Defs>
              <Path
                d="M174.5,31.5 C155.5,12.5 128.5,12.5 109.5,31.5 L100,41 L90.5,31.5 C71.5,12.5 44.5,12.5 25.5,31.5 C6.5,50.5 6.5,77.5 25.5,96.5 L100,171 L174.5,96.5 C193.5,77.5 193.5,50.5 174.5,31.5 Z"
                fill="url(#heartGradient)"
              />
            </Svg>
          </Animated.View>
        </View>
        <View style={styles.textBlock}>
          <Text style={[styles.title, { color: theme.colors.ink }]}>{t("onboarding.reminders.title")}</Text>
          <Text style={[styles.subtitle, { color: theme.colors.inkSoft }]}>{t("onboarding.reminders.subtitle")}</Text>
          <View style={styles.list}>
            {points.map((item) => (
              <View key={item} style={styles.listRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={[styles.listText, { color: theme.colors.inkSoft }]}>{item}</Text>
              </View>
            ))}
          </View>
          <Text style={[styles.note, { color: theme.colors.inkSoft }]}>{t("onboarding.reminders.note")}</Text>
          <Text style={[styles.disclaimer, { color: theme.colors.inkSoft }]}>{t("onboarding.common.disclaimer")}</Text>
        </View>
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
    paddingTop: 32,
    gap: 32,
  },
  heroWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  heartWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  floatingEmoji: {
    position: "absolute",
    fontSize: 32,
    opacity: 0.85,
  },
  textBlock: {
    marginTop: 32,
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 12,
  },
  title: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 30,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Nunito_400Regular",
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
  },
  list: {
    width: "100%",
    gap: 10,
  },
  listRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  bullet: {
    fontSize: 16,
    color: "#E66FD2",
    lineHeight: 20,
  },
  listText: {
    flex: 1,
    fontFamily: "Nunito_500Medium",
    fontSize: 14,
    lineHeight: 20,
  },
  note: {
    fontFamily: "Nunito_400Regular",
    fontSize: 13,
    textAlign: "center",
  },
  disclaimer: {
    fontFamily: "Nunito_400Regular",
    fontSize: 12,
    textAlign: "center",
  },
});

export default RemindersScreen;
