import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Svg, { Path } from "react-native-svg";
import OnboardingFooter from "../../components/OnboardingFooter";
import { useTheme } from "../../theme/ThemeProvider";
import { useOnboarding } from "../onboarding/OnboardingContext";
import type { OnboardingStackParamList } from "../../navigation/RootNavigator";
import { formatDisplayDate, toISODate } from "../../utils/date";
import { useTranslation } from "../../i18n";

const calendarEmoji = "📅";

type LastPeriodNav = NativeStackNavigationProp<OnboardingStackParamList, "LastPeriod">;

const LastPeriodScreen = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<LastPeriodNav>();
  const { state, update } = useOnboarding();
  const initialDate = state.lastPeriodStart ? new Date(state.lastPeriodStart) : new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (_: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleNext = () => {
    update({ lastPeriodStart: toISODate(selectedDate) });
    navigation.navigate("PeriodLength");
  };

  return (
    <LinearGradient colors={["#FDE8F2", "#E6E6FA"]} style={styles.gradient}>
      <View style={styles.content}>
        <View style={styles.heroWrapper}>
          <Svg width={110} height={110} viewBox="0 0 24 24" fill="none">
            <Path
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              stroke="#f04299"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
          <Text style={styles.emoji}>{calendarEmoji}</Text>
        </View>
        <Text style={[styles.title, { color: theme.colors.ink }]}>{t("setup.lastPeriod.title")}</Text>
        <Text style={[styles.subtitle, { color: theme.colors.inkSoft }]}>{t("setup.lastPeriod.subtitle")}</Text>
        <Text style={[styles.helper, { color: theme.colors.inkSoft }]}>{t("setup.lastPeriod.helper")}</Text>
        <View style={styles.inputWrapper}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("setup.lastPeriod.title")}
            onPress={() => setShowPicker(true)}
            style={styles.dateButton}
          >
            <Text style={styles.dateText}>{formatDisplayDate(toISODate(selectedDate))}</Text>
          </Pressable>
          {showPicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleChange}
            />
          )}
        </View>
        <Text style={[styles.disclaimer, { color: theme.colors.inkSoft }]}>{t("onboarding.common.disclaimer")}</Text>
      </View>
      <OnboardingFooter label={t("actions.next")}
        onPress={handleNext}
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
    gap: 16,
  },
  heroWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(240, 66, 153, 0.08)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  emoji: {
    position: "absolute",
    fontSize: 48,
    top: 28,
    right: 20,
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
  inputWrapper: {
    width: "100%",
    maxWidth: 320,
  },
  dateButton: {
    height: 60,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "rgba(240,66,153,0.25)",
    backgroundColor: "rgba(255,255,255,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    fontFamily: "Nunito_700Bold",
    fontSize: 18,
    color: "#f04299",
  },
  disclaimer: {
    fontFamily: "Nunito_400Regular",
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: 12,
  },
});

export default LastPeriodScreen;
