import { memo, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import dayjs from "../utils/date";
import type { CycleDayMarker } from "../services/prediction";

interface CalendarDayProps {
  date: string;
  inCurrentMonth: boolean;
  isToday: boolean;
  markers?: Set<CycleDayMarker>;
}

const MARKER_PRIORITY: CycleDayMarker[] = ["actual", "predicted", "ovulation", "fertile"];

const MARKER_STYLES: Record<CycleDayMarker, { background: string; text: string; badge: string }> = {
  actual: { background: "#FF7C9D", text: "#FFFFFF", badge: "🩸" },
  predicted: { background: "#FFD6E0", text: "#232326", badge: "🗓️" },
  fertile: { background: "#D6FFF6", text: "#232326", badge: "🌱" },
  ovulation: { background: "#CBA8FF", text: "#FFFFFF", badge: "✨" },
};

const CalendarDayComponent = ({ date, inCurrentMonth, isToday, markers }: CalendarDayProps) => {
  const dayNumber = dayjs(date).date();

  const { backgroundColor, textColor, badge } = useMemo(() => {
    if (!markers || markers.size === 0) {
      return { backgroundColor: "transparent", textColor: "#232326", badge: "" };
    }
    const ordered = MARKER_PRIORITY.find((marker) => markers.has(marker));
    if (!ordered) {
      return { backgroundColor: "transparent", textColor: "#232326", badge: "" };
    }
    const style = MARKER_STYLES[ordered];
    return { backgroundColor: style.background, textColor: style.text, badge: style.badge };
  }, [markers]);

  const hasFertile = markers?.has("fertile");
  const hasOvulation = markers?.has("ovulation");

  return (
    <View style={[styles.wrapper, !inCurrentMonth && styles.outsideMonth]}>
      <View
        style={[
          styles.day,
          { backgroundColor },
          isToday && styles.today,
          backgroundColor !== "transparent" && styles.filled,
        ]}
      >
        {badge && backgroundColor !== "transparent" ? <Text style={styles.badge}>{badge}</Text> : null}
        <Text
          style={[
            styles.dayText,
            { color: textColor },
            !inCurrentMonth && styles.outsideText,
            backgroundColor === "transparent" && !inCurrentMonth && styles.outsideMuted,
          ]}
        >
          {dayNumber}
        </Text>
        {(backgroundColor === "transparent" || markers?.has("fertile")) && (hasFertile || hasOvulation) ? (
          <View style={styles.markerRow}>
            {hasFertile ? <Text style={styles.markerEmoji}>🌱</Text> : null}
            {hasOvulation ? <Text style={styles.markerEmoji}>✨</Text> : null}
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
  },
  day: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  filled: {
    shadowColor: "rgba(0,0,0,0.08)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  today: {
    borderWidth: 2,
    borderColor: "#7AD1C5",
  },
  dayText: {
    fontFamily: "Nunito_700Bold",
    fontSize: 16,
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -4,
    fontSize: 14,
  },
  markerRow: {
    position: "absolute",
    bottom: -4,
    flexDirection: "row",
    gap: 4,
  },
  markerEmoji: {
    fontSize: 12,
  },
  outsideMonth: {
    opacity: 0.5,
  },
  outsideText: {
    color: "#9FA0A5",
  },
  outsideMuted: {
    color: "#C0C0C5",
  },
});

export const CalendarDay = memo(CalendarDayComponent);
