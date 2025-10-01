import { useMemo } from "react";
import { ScrollView, StyleSheet, Text, UIManager, View } from "react-native";
import Constants from "expo-constants";
import { VictoryArea, VictoryAxis, VictoryBar, VictoryChart, VictoryLine, VictoryTheme } from "victory-native";
import { useAppSelector } from "../store/hooks";
import { selectLogs, selectPeriods, selectPrefs } from "../store/selectors";
import dayjs from "../utils/date";
import type { Mood } from "../types/app";
import { useTranslation } from "../i18n";
import { useTheme } from "../theme/ThemeProvider";

const MOOD_SCORE: Record<Mood, number> = {
  ecstatic: 6,
  happy: 5,
  neutral: 4,
  tired: 3,
  sad: 2,
  angry: 1,
};

const ReportsScreen = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const periods = useAppSelector(selectPeriods);
  const logs = useAppSelector(selectLogs);
  const prefs = useAppSelector(selectPrefs);

  const chartsSupported = useMemo(() => {
    if (Constants.appOwnership === "expo") {
      return false;
    }
    try {
      if (typeof UIManager.getViewManagerConfig !== "function") {
        return false;
      }
      return Boolean(
        UIManager.getViewManagerConfig("RNSVGLine") ?? UIManager.getViewManagerConfig("RNSVGLineView"),
      );
    } catch (error) {
      return false;
    }
  }, []);

  const { averageCycle, averagePeriod, cycleChart, periodChart } = useMemo(() => {
    const sortedPeriods = [...periods].sort((a, b) => a.start.localeCompare(b.start));
    const cycleLengths: number[] = [];
    const periodLengths: number[] = [];

    sortedPeriods.forEach((span, index) => {
      const next = sortedPeriods[index + 1];
      if (span.end) {
        const spanDuration = dayjs(span.end).diff(dayjs(span.start), "day") + 1;
        if (spanDuration > 0) {
          periodLengths.push(spanDuration);
        }
      }
      if (next) {
        const cycleDuration = dayjs(next.start).diff(dayjs(span.start), "day");
        if (cycleDuration > 0) {
          cycleLengths.push(cycleDuration);
        }
      }
    });

    const avgCycle = cycleLengths.length
      ? Math.round(cycleLengths.reduce((acc, value) => acc + value, 0) / cycleLengths.length)
      : prefs.avgCycleDays;
    const avgPeriod = periodLengths.length
      ? Math.round(periodLengths.reduce((acc, value) => acc + value, 0) / periodLengths.length)
      : prefs.avgPeriodDays;

    const cycleChartData = cycleLengths.slice(-6).map((value, index) => ({ x: index + 1, y: value }));
    const periodChartData = periodLengths.slice(-6).map((value, index) => ({ x: index + 1, y: value }));

    return {
      averageCycle: avgCycle,
      averagePeriod: avgPeriod,
      cycleChart: cycleChartData,
      periodChart: periodChartData,
    };
  }, [periods, prefs.avgCycleDays, prefs.avgPeriodDays]);

  const { moodChart, symptomChart } = useMemo(() => {
    const recentLogs = [...logs]
      .filter((log) => log.mood)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-10);

    const moodData = recentLogs.map((log) => ({
      x: dayjs(log.date).format("DD MMM"),
      y: log.mood ? MOOD_SCORE[log.mood] : 0,
    }));

    const symptomCount: Record<string, number> = {};
    logs.forEach((log) => {
      log.symptoms.forEach((symptom) => {
        symptomCount[symptom] = (symptomCount[symptom] ?? 0) + 1;
      });
    });

    const symptomData = Object.entries(symptomCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([symptom, count]) => ({ x: symptom, y: count }));

    return {
      moodChart: moodData,
      symptomChart: symptomData,
    };
  }, [logs]);

  const summaryCards = [
    {
      id: "avgCycle",
      label: t("reports.summary.avgCycle"),
      value: t("reports.summary.days", { count: averageCycle }),
    },
    {
      id: "avgPeriod",
      label: t("reports.summary.avgPeriod"),
      value: t("reports.summary.days", { count: averagePeriod }),
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>{t("reports.heading.title")}</Text>
      <Text style={styles.subheading}>{t("reports.heading.subtitle")}</Text>

      <View style={styles.summaryRow}>
        {summaryCards.map((card) => (
          <View key={card.id} style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>{card.label}</Text>
            <Text style={styles.summaryValue}>{card.value}</Text>
          </View>
        ))}
      </View>

      {chartsSupported ? (
        <>
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>{t("reports.charts.cycleLength.title")}</Text>
            <VictoryChart theme={VictoryTheme.material} height={220} domainPadding={20}>
              <VictoryAxis tickFormat={(tick) => `#${tick}`} style={axisStyle} />
              <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}`} style={axisStyle} />
              <VictoryBar data={cycleChart} style={{ data: { fill: theme.colors.primary } }} cornerRadius={6} barRatio={0.6} />
            </VictoryChart>
          </View>

          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>{t("reports.charts.periodLength.title")}</Text>
            <VictoryChart theme={VictoryTheme.material} height={220} domainPadding={20}>
              <VictoryAxis tickFormat={(tick) => `#${tick}`} style={axisStyle} />
              <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}`} style={axisStyle} />
              <VictoryLine
                interpolation="monotoneX"
                data={periodChart}
                style={{ data: { stroke: "#FF7C9D", strokeWidth: 3 } }}
              />
            </VictoryChart>
          </View>

          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>{t("reports.charts.moodTrend.title")}</Text>
            <VictoryChart theme={VictoryTheme.material} height={240} padding={{ top: 40, bottom: 50, left: 50, right: 20 }}>
              <VictoryAxis tickFormat={(tick: string | number) => String(tick)} style={axisStyle} />
              <VictoryAxis
                dependentAxis
                tickValues={[1, 2, 3, 4, 5, 6]}
                tickFormat={(tick: number) => t(`reports.charts.moodTrend.labels.${tick}`)}
                style={axisStyle}
              />
              <VictoryArea
                data={moodChart}
                style={{
                  data: {
                    fill: "rgba(199, 139, 255, 0.35)",
                    stroke: "#C78BFF",
                    strokeWidth: 3,
                  },
                }}
              />
            </VictoryChart>
          </View>

          <View style={styles.chartCard}>
   ...

</ScrollView>
