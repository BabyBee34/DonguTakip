import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import CalendarScreen from "../screens/CalendarScreen";
import DailyLogScreen from "../screens/DailyLogScreen";
import ReportsScreen from "../screens/ReportsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { useTheme } from "../theme/ThemeProvider";
import { useTranslation } from "../i18n";

export type MainTabParamList = {
  Calendar: undefined;
  DailyLog: undefined;
  Reports: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.inkSoft,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontFamily: theme.typography.caption.fontFamily,
          fontSize: theme.typography.caption.fontSize,
        },
        tabBarStyle: {
          borderTopLeftRadius: theme.radii.card,
          borderTopRightRadius: theme.radii.card,
          backgroundColor: theme.colors.background,
          height: 70,
          paddingBottom: 10,
        },
        tabBarIcon: ({ color, size }) => {
          const iconName = (() => {
            switch (route.name) {
              case "Calendar":
                return "calendar-clear";
              case "DailyLog":
                return "book";
              case "Reports":
                return "analytics";
              case "Settings":
                return "settings";
              default:
                return "ellipse";
            }
          })();
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Calendar" component={CalendarScreen} options={{ title: t("tabs.calendar") }} />
      <Tab.Screen name="DailyLog" component={DailyLogScreen} options={{ title: t("tabs.dailyLog") }} />
      <Tab.Screen name="Reports" component={ReportsScreen} options={{ title: t("tabs.reports") }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: t("tabs.settings") }} />
    </Tab.Navigator>
  );
};

export default MainTabs;
