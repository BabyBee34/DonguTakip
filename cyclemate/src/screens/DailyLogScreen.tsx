import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectLogs } from "../store/selectors";
import { upsertLog } from "../store/appSlice";
import { GradientButton } from "../components/GradientButton";
import { tipsService, type TipSuggestion } from "../services/tipsService";
import { useTheme } from "../theme/ThemeProvider";
import { useTranslation } from "../i18n";
import { todayISO } from "../utils/date";
import { MOOD_OPTIONS, SYMPTOM_OPTIONS, type SymptomOption } from "../utils/constants";
import type { Mood, Symptom } from "../types/app";

type SymptomCategory = "pain" | "mood" | "body";

const DailyLogScreen = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const logs = useAppSelector(selectLogs);
  const today = todayISO();
  const existingLog = useMemo(() => logs.find((log) => log.date === today), [logs, today]);

  const [selectedMood, setSelectedMood] = useState<Mood | undefined>(existingLog?.mood);
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<Symptom>>(
    () => new Set(existingLog?.symptoms ?? []),
  );
  const [note, setNote] = useState(existingLog?.note ?? "");
  const [suggestions, setSuggestions] = useState<TipSuggestion[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const symptomArray = Array.from(selectedSymptoms);
    if (!symptomArray.length) {
      setSuggestions([]);
      setLoadingSuggestions(false);
      return;
    }

    let cancelled = false;
    setLoadingSuggestions(true);

    tipsService
      .getSuggestions(symptomArray)
      .then((tips) => {
        if (!cancelled) {
          setSuggestions(tips);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoadingSuggestions(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [selectedSymptoms]);

  useEffect(() => {
    if (!saved) {
      return;
    }
    const timeout = setTimeout(() => setSaved(false), 1800);
    return () => clearTimeout(timeout);
  }, [saved]);

  const toggleSymptom = (symptom: Symptom) => {
    setSelectedSymptoms((prev) => {
      const next = new Set(prev);
      if (next.has(symptom)) {
        next.delete(symptom);
      } else {
        next.add(symptom);
      }
      return next;
    });
  };

  const handleSave = () => {
    dispatch(
      upsertLog({
        date: today,
        mood: selectedMood,
        symptoms: Array.from(selectedSymptoms),
        note: note.trim() ? note.trim() : undefined,
      }),
    );
    setSaved(true);
  };

  const groupedSymptoms = useMemo<Record<SymptomCategory, SymptomOption[]>>(
    () => ({
      pain: SYMPTOM_OPTIONS.filter((option) => option.category === "pain"),
      mood: SYMPTOM_OPTIONS.filter((option) => option.category === "mood"),
      body: SYMPTOM_OPTIONS.filter((option) => option.category === "body"),
    }),
    [],
  );

  const disableSave = !selectedMood && selectedSymptoms.size === 0 && !note.trim();

  return (
    <LinearGradient colors={["#FEF7F9", "#FFFFFF"]} style={styles.gradient}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.headingBlock}>
            <Text style={styles.heading}>{t("dailyLog.heading.title")}</Text>
            <Text style={styles.subheading}>{t("dailyLog.heading.subtitle")}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("dailyLog.mood.title")}</Text>
            <Text style={styles.helperText}>{t("dailyLog.mood.helper")}</Text>
            <View style={styles.moodRow}>
              {MOOD_OPTIONS.map((option) => {
                const active = option.id === selectedMood;
                return (
                  <View key={option.id} style={styles.moodItem}>
                    <Pressable onPress={() => setSelectedMood(active ? undefined : option.id)}>
                      <GradientBorder active={active} color={option.background}>
                        <Text style={styles.moodEmoji}>{option.emoji}</Text>
                      </GradientBorder>
                    </Pressable>
                    <Text style={styles.moodLabel}>{t(option.labelKey)}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("dailyLog.symptoms.title")}</Text>
            <SymptomGrid
              title={t("dailyLog.symptoms.sections.pain")}
              items={groupedSymptoms.pain}
              selected={selectedSymptoms}
              onToggle={toggleSymptom}
              colors={["#FFE1ED", "#FFD2E8"]}
              getLabel={(option) => t(option.labelKey)}
              selectLabel={t("dailyLog.symptoms.actions.select")}
              selectedLabel={t("dailyLog.symptoms.actions.selected")}
            />
            <SymptomGrid
              title={t("dailyLog.symptoms.sections.mood")}
              items={groupedSymptoms.mood}
              selected={selectedSymptoms}
              onToggle={toggleSymptom}
              colors={["#EDEBFF", "#D7D4FF"]}
              getLabel={(option) => t(option.labelKey)}
              selectLabel={t("dailyLog.symptoms.actions.select")}
              selectedLabel={t("dailyLog.symptoms.actions.selected")}
            />
            <SymptomGrid
              title={t("dailyLog.symptoms.sections.body")}
              items={groupedSymptoms.body}
              selected={selectedSymptoms}
              onToggle={toggleSymptom}
              colors={["#E8FFF4", "#D3F8E4"]}
              getLabel={(option) => t(option.labelKey)}
              selectLabel={t("dailyLog.symptoms.actions.select")}
              selectedLabel={t("dailyLog.symptoms.actions.selected")}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("dailyLog.note.title")}</Text>
            <TextInput
              placeholder={t("dailyLog.note.placeholder")}
              placeholderTextColor="#B0A8AE"
              multiline
              value={note}
              onChangeText={setNote}
              style={styles.noteInput}
            />
            <Text style={styles.helperText}>{t("dailyLog.note.helper")}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("dailyLog.suggestion.title")}</Text>
            {loadingSuggestions ? (
              <Text style={styles.helperText}>{t("dailyLog.suggestion.loading")}</Text>
            ) : suggestions.length ? (
              suggestions.map((tip) => (
                <View key={tip.id} style={styles.suggestionCard}>
                  <Text style={styles.suggestionEmoji}>💡</Text>
                  <View style={styles.suggestionContent}>
                    <Text style={styles.suggestionText}>{t(tip.textKey)}</Text>
                    <Text style={styles.suggestionSource}>{t(tip.sourceKey)}</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.helperText}>{t("dailyLog.suggestion.empty")}</Text>
            )}
            <Text style={styles.disclaimer}>{t("dailyLog.suggestion.disclaimer")}</Text>
            <View style={styles.smallTip}>
              <Text style={styles.smallTipEmoji}>🌿</Text>
              <View style={styles.smallTipTextWrapper}>
                <Text style={styles.smallTipTitle}>{t("dailyLog.smallTip.title")}</Text>
                <Text style={styles.smallTipText}>{t("dailyLog.smallTip.text")}</Text>
              </View>
            </View>
          </View>

          <GradientButton
            label={saved ? t("dailyLog.actions.saved") : t("dailyLog.actions.save")}
            onPress={handleSave}
            disabled={disableSave}
            accessibilityLabel={t("dailyLog.actions.saveA11y")}
          />
          {saved ? <Text style={styles.savedFeedback}>{t("dailyLog.feedback.saved")}</Text> : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

interface SymptomGridProps {
  title: string;
  items: SymptomOption[];
  selected: Set<Symptom>;
  onToggle: (id: Symptom) => void;
  colors: [string, string];
  getLabel: (option: SymptomOption) => string;
  selectLabel: string;
  selectedLabel: string;
}

const SymptomGrid = ({ title, items, selected, onToggle, colors, getLabel, selectLabel, selectedLabel }: SymptomGridProps) => (
  <View style={styles.symptomGroup}>
    <Text style={styles.symptomTitle}>{title}</Text>
    <View style={styles.symptomGrid}>
      {items.map((item) => {
        const active = selected.has(item.id);
        return (
          <Pressable key={item.id} onPress={() => onToggle(item.id)} style={styles.symptomPressable}>
            <LinearGradient colors={colors} style={[styles.symptomCard, active && styles.symptomCardActive]}>
              <Text style={styles.symptomEmoji}>{item.emoji}</Text>
              <Text style={styles.symptomLabel}>{getLabel(item)}</Text>
              <Text style={[styles.symptomToggle, active && styles.symptomToggleActive]}>
                {active ? selectedLabel : selectLabel}
              </Text>
            </LinearGradient>
          </Pressable>
        );
      })}
    </View>
  </View>
);

const GradientBorder = ({ children, active, color }: { children: ReactNode; active: boolean; color: string }) => (
  <LinearGradient
    colors={active ? [color, "#FFFFFF"] : ["rgba(0,0,0,0.05)", "rgba(0,0,0,0.05)"]}
    style={[styles.moodGradient, active && styles.moodGradientActive]}
  >
    <View style={[styles.moodInner, { backgroundColor: active ? "#FFFFFF" : color }]}>{children}</View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
    gap: 24,
    paddingBottom: 40,
  },
  headingBlock: {
    gap: 6,
  },
  heading: {
    fontFamily: "Fredoka_700Bold",
    fontSize: 26,
    color: "#3D2931",
  },
  subheading: {
    fontFamily: "Nunito_400Regular",
    fontSize: 16,
    color: "#9E8A91",
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontFamily: "Nunito_700Bold",
    fontSize: 18,
    color: "#3D2931",
  },
  helperText: {
    fontFamily: "Nunito_400Regular",
    fontSize: 13,
    color: "#9E8A91",
  },
  moodRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  moodItem: {
    alignItems: "center",
    gap: 6,
  },
  moodGradient: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  moodGradientActive: {
    shadowColor: "rgba(255, 182, 231, 0.6)",
    shadowOpacity: 0.7,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
  },
  moodInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  moodEmoji: {
    fontSize: 30,
  },
  moodLabel: {
    fontFamily: "Nunito_500Medium",
    fontSize: 13,
    color: "#6D5A60",
  },
  symptomGroup: {
    gap: 12,
  },
  symptomTitle: {
    fontFamily: "Nunito_700Bold",
    fontSize: 15,
    color: "#6D5A60",
  },
  symptomGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  symptomPressable: {
    width: "48%",
  },
  symptomCard: {
    width: "100%",
    borderRadius: 18,
    padding: 14,
    gap: 8,
  },
  symptomCardActive: {
    borderWidth: 2,
    borderColor: "#F04299",
  },
  symptomEmoji: {
    fontSize: 26,
  },
  symptomLabel: {
    fontFamily: "Nunito_700Bold",
    fontSize: 15,
    color: "#3D2931",
  },
  symptomToggle: {
    fontFamily: "Nunito_500Medium",
    fontSize: 12,
    color: "#F04299",
  },
  symptomToggleActive: {
    color: "#C02670",
  },
  noteInput: {
    minHeight: 120,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#FFD6E8",
    backgroundColor: "#FFFFFF",
    padding: 16,
    fontFamily: "Nunito_400Regular",
    fontSize: 15,
    color: "#3D2931",
  },
  suggestionCard: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#FFF3FA",
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
  },
  suggestionEmoji: {
    fontSize: 24,
  },
  suggestionContent: {
    flex: 1,
    gap: 4,
  },
  suggestionText: {
    fontFamily: "Nunito_500Medium",
    fontSize: 14,
    color: "#3D2931",
  },
  suggestionSource: {
    fontFamily: "Nunito_400Regular",
    fontSize: 12,
    color: "#6A6A6F",
  },
  disclaimer: {
    fontFamily: "Nunito_400Regular",
    fontSize: 12,
    color: "#9E8A91",
  },
  smallTip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    shadowColor: "rgba(0,0,0,0.05)",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
  },
  smallTipEmoji: {
    fontSize: 22,
  },
  smallTipTextWrapper: {
    flex: 1,
    gap: 4,
  },
  smallTipTitle: {
    fontFamily: "Nunito_700Bold",
    fontSize: 13,
    color: "#3D2931",
  },
  smallTipText: {
    fontFamily: "Nunito_400Regular",
    fontSize: 13,
    color: "#3D2931",
  },
  savedFeedback: {
    fontFamily: "Nunito_500Medium",
    fontSize: 14,
    color: "#53C7A6",
    textAlign: "center",
  },
});

export default DailyLogScreen;
