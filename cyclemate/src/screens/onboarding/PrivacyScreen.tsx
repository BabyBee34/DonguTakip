import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import OnboardingFooter from "../../components/OnboardingFooter";
import { useTheme } from "../../theme/ThemeProvider";
import type { OnboardingStackParamList } from "../../navigation/RootNavigator";
import { useTranslation } from "../../i18n";

const FLOATING_EMOJIS = ["🔒", "✨", "💜", "🙊"];
const EMOJI_OFFSETS = [
  { top: 40, left: 32 },
  { top: 80, right: 32 },
  { top: 120, left: 48 },
  { top: 160, right: 48 },
];

type PrivacyNav = NativeStackNavigationProp<OnboardingStackParamList, "Privacy">;

const PrivacyScreen = () => {
  const theme = useTheme();
  const { t, tList } = useTranslation();
  const navigation = useNavigation<PrivacyNav>();
  const wobble = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(wobble, { toValue: 1, duration: 1800, useNativeDriver: true }),
        Animated.timing(wobble, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ]),
    ).start();
  }, [wobble]);

  const rotate = wobble.interpolate({ inputRange: [0, 0.5, 1], outputRange: ["0deg", "5deg", "-5deg"] });
  const scale = wobble.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] });

  const handleNext = () => {
    navigation.navigate("LastPeriod");
  };

  const points = tList("onboarding.privacy.points");
  const sources = tList("onboarding.privacy.sources");

  return (
    <LinearGradient colors={["#DCCBFF", "#F9D1ED"]} style={styles.gradient}>
      <View style={styles.content}>
        <View style={styles.heroWrapper}>
          {FLOATING_EMOJIS.map((emoji, index) => (
            <Animated.Text
              key={emoji}
              style={[
                styles.floatingEmoji,
                EMOJI_OFFSETS[index],
                {
                  transform: [
                    {
                      translateY: wobble.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [0, -10 * (index + 1) * 0.1, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              {emoji}
            </Animated.Text>
          ))}
          <Animated.View style={[styles.lockWrapper, { transform: [{ rotate }, { scale }] }]}>            
            <Svg width={200} height={200} viewBox="0 0 20 20" fill="none">
              <Path
                d="M10 2a4 4 0 00-4 4v2H4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2h-2V6a4 4 0 00-4-4zm-2 4V6a2 2 0 114 0v2H8z"
                fill="#FFFFFF"
              />
              <Path
                d="M10 12a2 2 0 00-2 2 2 2 0 103.25-1.561V11h-2.5v1.439c-.46.35-.75.9-.75 1.561a2 2 0 104 0 2 2 0 00-2-2z"
                fill="#F472B6"
              />
            </Svg>
          </Animated.View>
        </View>
        <View style={styles.textBlock}>
          <Text style={[styles.title, { color: theme.colors.ink }]}>{t("onboarding.privacy.title")}</Text>
          <Text style={[styles.subtitle, { color: theme.colors.inkSoft }]}>{t("onboarding.privacy.subtitle")}</Text>
          <View style={styles.list}>
            {points.map((item) => (
              <View key={item} style={styles.listRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={[styles.listText, { color: theme.colors.inkSoft }]}>{item}</Text>
              </View>
            ))}
          </View>
          <View style={styles.sources}>
            {sources.map((item) => (
              <Text key={item} style={[styles.sourceText, { color: theme.colors.inkSoft }]}>
                {item}
              </Text>
            ))}
          </View>
          <Text style={[styles.disclaimer, { color: theme.colors.inkSoft }]}>{t("onboarding.common.disclaimer")}</Text>
        </View>
      </View>
      <OnboardingFooter
        label={t("actions.done")}
        onPress={handleNext}
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
  lockWrapper: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FFFFFF",
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 20,
  },
  floatingEmoji: {
    position: "absolute",
    fontSize: 28,
    opacity: 0.6,
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
  sources: {
    width: "100%",
    gap: 4,
  },
  sourceText: {
    fontFamily: "Nunito_400Regular",
    fontSize: 12,
  },
  disclaimer: {
    fontFamily: "Nunito_400Regular",
    fontSize: 12,
    textAlign: "center",
  },
});

export default PrivacyScreen;
