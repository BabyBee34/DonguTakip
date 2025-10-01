import { useMemo, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { CalendarDay } from "../components/CalendarDay";
import { QuickActionButton } from "../components/QuickActionButton";
import { Pill } from "../components/Pill";
import {
  buildMonthMatrix,
  formatDisplayDate,
  formatMonthTitle,
  formatWeekdayShort,
  monthShift,
  todayISO,
} from "../utils/date";
import {
  makeSelectCalendarMarkers,
  selectNextPredictedPeriod,
  selectOngoingPeriod,
  selectPrefs,
  selectPeriods,
} from "../store/selectors";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { endPeriod, upsertPeriod } from "../store/appSlice";
import { useTheme } from "../theme/ThemeProvider";
import type { MainTabParamList } from "../navigation/MainTabs";
import { useTranslation } from "../i18n";
import { EDUCATION_TIPS, MOTIVATION_QUOTES, PHASE_CONTENT, type PhaseInfo } from "../utils/constants";
import { getCyclePhaseInfo } from "../services/prediction";

const CalendarScreen = () => {
  const theme = useTheme();
  const { t, tList } = useTranslation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<MainTabParamList>>();
  const prefs = useAppSelector(selectPrefs);
  const periods = useAppSelector(selectPeriods);
  const ongoingPeriod = useAppSelector(selectOngoingPeriod);
  const nextPredicted = useAppSelector(selectNextPredictedPeriod);
  const [currentMonth, setCurrentMonth] = useState(() => todayISO());

  const markersSelector = useMemo(() => makeSelectCalendarMarkers(currentMonth), [currentMonth]);
  const markersMap = useAppSelector(markersSelector);
  const monthMatrix = useMemo(() => buildMonthMatrix(currentMonth), [currentMonth]);

  const cyclePhase = useMemo(() => getCyclePhaseInfo({ prefs, periods }), [prefs, periods]);
  const phaseDefinition: PhaseInfo = useMemo(
    () => PHASE_CONTENT.find((phase) => phase.id === cyclePhase.id) ?? PHASE_CONTENT[0],
    [cyclePhase.id],
  );

  const phaseName = t(phaseDefinition.titleKey);
  const phaseSummary = t(phaseDefinition.summaryKey);
  const phaseHormones = t(phaseDefinition.hormoneKey);
  const phaseFocus = phaseDefinition.focusKeys.map((key) => t(key));
  const phaseTips = phaseDefinition.tipsKeys.map((key) => t(key));
  const phaseSources = phaseDefinition.sourceKeys.map((key) => t(key));
  const fertileWindowText = t("calendar.phase.fertileWindowLabel", {
    start: cyclePhase.fertileWindowStart,
    end: cyclePhase.fertileWindowEnd,
  });

  const infoTips = (() => {
    const entries = tList("calendar.info.tips");
    return entries.length ? entries : EDUCATION_TIPS;
  })();

  const motivation = useMemo(() => {
    const index = Math.abs(
      currentMonth.charCodeAt(0) + currentMonth.charCodeAt(currentMonth.length - 1),
    ) % MOTIVATION_QUOTES.length;
    return MOTIVATION_QUOTES[index];
  }, [currentMonth]);

  const legendItems = useMemo(
    () => [
      {
        key: "actual",
        label: t("calendar.legend.actual"),
        color: "#FF7C9D",
        text: "#FFFFFF",
        icon: "🩸",
        border: undefined,
      },
      {
        key: "predicted",
        label: t("calendar.legend.predicted"),
        color: "#FFD6E0",
        text: "#232326",
        icon: "🗓️",
        border: undefined,
      },
      {
        key: "fertile",
        label: t("calendar.legend.fertile"),
        color: "#D6FFF6",
        text: "#232326",
        icon: "🌱",
        border: undefined,
      },
      {
        key: "ovulation",
        label: t("calendar.legend.ovulation"),
        color: "#CBA8FF",
        text: "#FFFFFF",
        icon: "✨",
        border: undefined,
      },
      {
        key: "today",
        label: t("calendar.legend.today"),
        color: "#FFFFFF",
        text: "#232326",
        icon: "🌟",
        border: "#7AD1C5",
      },
    ],
    [t],
  );

  const handleMonthShift = (direction: -1 | 1) => {
    setCurrentMonth((prev) => monthShift(prev, direction));
  };

  const handlePeriodAction = () => {
    const today = todayISO();
    if (ongoingPeriod) {
      dispatch(endPeriod(today));
    } else {
      dispatch(upsertPeriod({ start: today }));
    }
  };

  const handleLogNavigate = () => {
    navigation.navigate("DailyLog");
  };

  const isPeriodActive = Boolean(ongoingPeriod);
  const quickActionLabel = isPeriodActive ? t("calendar.quickActions.end") : t("calendar.quickActions.start");
  const summaryRange = nextPredicted
    ? t("calendar.summary.range", {
        start: formatDisplayDate(nextPredicted.start),
        end: formatDisplayDate(nextPredicted.end),
      })
    : t("calendar.summary.noData");

  return (
    <LinearGradient colors={["#FFF3FA", "#F5EDFF"]} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.greeting}>{t("calendar.header.greeting")}</Text>
              <Text style={styles.subtitleText}>{t("calendar.header.subtitle")}</Text>
            </View>
            <View style={styles.avatar}>
              <Ionicons name="flower" size={20} color={theme.colors.primary} />
            </View>
          </View>

          <View style={styles.monthRow}>
            <Ionicons.Button
              name="chevron-back"
              backgroundColor="transparent"
              color={theme.colors.ink}
              underlayColor="transparent"
              onPress={() => handleMonthShift(-1)}
              iconStyle={styles.monthIcon}
            />
            <Text style={styles.monthTitle}>{formatMonthTitle(currentMonth)}</Text>
            <Ionicons.Button
              name="chevron-forward"
              backgroundColor="transparent"
              color={theme.colors.ink}
              underlayColor="transparent"
              onPress={() => handleMonthShift(1)}
              iconStyle={styles.monthIcon}
            />
          </View>

          <View style={styles.weekdaysRow}>
            {Array.from({ length: 7 }, (_, index) => formatWeekdayShort(index)).map((day) => (
              <Text key={day} style={styles.weekday}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {monthMatrix.map((week, rowIndex) => (
              <View key={`week-${rowIndex}`} style={styles.weekRow}>
                {week.map((cell) => (
                  <CalendarDay
                    key={cell.date}
                    date={cell.date}
                    inCurrentMonth={cell.inCurrentMonth}
                    isToday={cell.isToday}
                    markers={markersMap[cell.date]}
                  />
                ))}
              </View>
            ))}
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.legendRow}>
            {legendItems.map((item) => (
              <Pill
                key={item.key}
                label={`${item.icon} ${item.label}`}
                backgroundColor={item.color}
                textColor={item.text}
                style={[styles.legendItem, item.border ? { borderWidth: 2, borderColor: item.border } : undefined]}
              />
            ))}
          </ScrollView>

          <View style={styles.quickActions}>
            <QuickActionButton
              label={quickActionLabel}
              onPress={handlePeriodAction}
              colors={['#FF7C9D', '#CBA8FF']}
              icon={<Ionicons name={isPeriodActive ? "water" : "water-outline"} size={22} color="#FFFFFF" />}
            />
            <QuickActionButton
              label={t("calendar.quickActions.log")}
              onPress={handleLogNavigate}
              colors={['#CBA8FF', '#7AD1C5']}
              icon={<Ionicons name="document-text-outline" size={22} color="#FFFFFF" />}
            />
          </View>

          <View style={styles.phaseCard}>
            <View style={styles.phaseHeader}>
              <Text style={styles.phaseEmoji}>{phaseDefinition.emoji}</Text>
              <View style={styles.phaseTitleGroup}>
                <Text style={styles.phaseTitle}>{phaseName}</Text>
                <View style={styles.phaseBadgesRow}>
                  <Text style={styles.phaseBadge}>{t("calendar.phase.badge", { phaseName, phaseDay: cyclePhase.phaseDay })}</Text>
                  <Text style={styles.phaseCycleBadge}>{t("calendar.phase.cycleBadge", { cycleDay: cyclePhase.cycleDay })}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.phaseSummary}>{phaseSummary}</Text>
            <View style={styles.phaseSection}>
              <Text style={styles.phaseSectionTitle}>{t("calendar.phase.hormoneLabel")}</Text>
              <Text style={styles.phaseSectionText}>{phaseHormones}</Text>
            </View>
            <View style={styles.phaseSection}>
              <Text style={styles.phaseSectionTitle}>{t("calendar.phase.focusLabel")}</Text>
              {phaseFocus.map((item) => (
                <Text key={item} style={styles.phaseListItem}>
                  {"\u2022"} {item}
                </Text>
              ))}
            </View>
            <View style={styles.phaseSection}>
              <Text style={styles.phaseSectionTitle}>{t("calendar.phase.tipsLabel")}</Text>
              {phaseTips.map((item) => (
                <Text key={item} style={styles.phaseListItem}>
                  {"\u2022"} {item}
                </Text>
              ))}
            </View>
            <Text style={styles.fertileWindow}>{fertileWindowText}</Text>
            <View style={styles.phaseSection}>
              <Text style={styles.phaseSectionTitle}>{t("calendar.phase.sourcesLabel")}</Text>
              {phaseSources.map((item) => (
                <Text key={item} style={styles.phaseSourceText}>
                  {"\u2022"} {item}
                </Text>
              ))}
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Text style={styles.infoTitle}>{t("calendar.info.title")}</Text>
              <Text style={styles.infoEmoji}>💡</Text>
            </View>
            <Text style={styles.infoSubtitle}>{t("calendar.info.subtitle")}</Text>
            {infoTips.map((tip) => (
              <View key={tip} style={styles.tipRow}>
                <Text style={styles.tipBullet}>{"\u2022"}</Text>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
            <Text style={styles.disclaimer}>{t("calendar.disclaimer")}</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>{t("calendar.summary.nextPeriodTitle")}</Text>
            <Text style={styles.summaryText}>{summaryRange}</Text>
          </View>

          <View style={styles.motivationCard}>
            <Text style={styles.motivationTitle}>{t("calendar.motivation.title")}</Text>
            <Text style={styles.motivationEmoji}>🌷</Text>
            <Text style={styles.motivationText}>{motivation}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  greeting: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 26,
    color: "#232326",
  },
  subtitleText: {
    fontFamily: "Nunito_400Regular",
    fontSize: 15,
    color: "#6A6A6F",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0,0,0,0.1)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  monthRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  monthTitle: {
    fontFamily: "Nunito_700Bold",
    fontSize: 18,
    color: "#232326",
  },
  monthIcon: {
    marginRight: -10,
    marginLeft: -10,
  },
  weekdaysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weekday: {
    width: 44,
    textAlign: "center",
    fontFamily: "Nunito_500Medium",
    fontSize: 12,
    color: "#6A6A6F",
  },
  calendarGrid: {
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 6,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  legendRow: {
    gap: 10,
    paddingRight: 20,
  },
  legendItem: {
    shadowColor: "rgba(0,0,0,0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  quickActions: {
    flexDirection: "row",
    gap: 12,
  },
  phaseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    gap: 12,
    shadowColor: "rgba(0,0,0,0.08)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  phaseHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  phaseEmoji: {
    fontSize: 32,
  },
  phaseTitleGroup: {
    flex: 1,
    gap: 4,
  },
  phaseTitle: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 20,
    color: "#232326",
  },
  phaseBadgesRow: {
    flexDirection: "row",
    gap: 8,
  },
  phaseBadge: {
    fontFamily: "Nunito_500Medium",
    fontSize: 13,
    color: "#7D3AA5",
  },
  phaseCycleBadge: {
    fontFamily: "Nunito_500Medium",
    fontSize: 13,
    color: "#6A6A6F",
  },
  phaseSummary: {
    fontFamily: "Nunito_400Regular",
    fontSize: 14,
    color: "#3F3F46",
  },
  phaseSection: {
    gap: 6,
  },
  phaseSectionTitle: {
    fontFamily: "Nunito_700Bold",
    fontSize: 14,
    color: "#232326",
  },
  phaseSectionText: {
    fontFamily: "Nunito_400Regular",
    fontSize: 13,
    color: "#3F3F46",
  },
  phaseListItem: {
    fontFamily: "Nunito_500Medium",
    fontSize: 13,
    color: "#4B4B51",
  },
  phaseSourceText: {
    fontFamily: "Nunito_400Regular",
    fontSize: 12,
    color: "#6A6A6F",
  },
  fertileWindow: {
    fontFamily: "Nunito_500Medium",
    fontSize: 13,
    color: "#7D3AA5",
  },
  infoCard: {
    backgroundColor: "#E6F3FF",
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  infoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoTitle: {
    fontFamily: "Nunito_700Bold",
    fontSize: 16,
    color: "#232326",
  },
  infoEmoji: {
    fontSize: 20,
  },
  infoSubtitle: {
    fontFamily: "Nunito_400Regular",
    fontSize: 13,
    color: "#3F3F46",
  },
  tipRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-start",
  },
  tipBullet: {
    fontSize: 16,
    color: "#6A6A6F",
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontFamily: "Nunito_400Regular",
    fontSize: 14,
    color: "#3F3F46",
  },
  disclaimer: {
    fontFamily: "Nunito_400Regular",
    fontSize: 12,
    color: "#6A6A6F",
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    shadowColor: "rgba(0,0,0,0.08)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    gap: 4,
  },
  summaryTitle: {
    fontFamily: "Nunito_500Medium",
    fontSize: 14,
    color: "#6A6A6F",
  },
  summaryText: {
    fontFamily: "Nunito_700Bold",
    fontSize: 18,
    color: "#232326",
  },
  motivationCard: {
    borderRadius: 22,
    padding: 20,
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "rgba(0,0,0,0.08)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  motivationTitle: {
    fontFamily: "Nunito_500Medium",
    fontSize: 14,
    color: "#6A6A6F",
  },
  motivationEmoji: {
    fontSize: 32,
  },
  motivationText: {
    fontFamily: "Nunito_500Medium",
    fontSize: 16,
    color: "#232326",
    textAlign: "center",
  },
});

export default CalendarScreen;












