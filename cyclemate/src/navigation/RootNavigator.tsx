import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import MainTabs from './MainTabs';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import RemindersScreen from '../screens/onboarding/RemindersScreen';
import PrivacyScreen from '../screens/onboarding/PrivacyScreen';
import LastPeriodScreen from '../screens/setup/LastPeriodScreen';
import PeriodLengthScreen from '../screens/setup/PeriodLengthScreen';
import CycleLengthScreen from '../screens/setup/CycleLengthScreen';
import { useTheme } from '../theme/ThemeProvider';
import { OnboardingProvider } from '../screens/onboarding/OnboardingContext';
import { navigationRef } from './RootNavigation';

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
};

export type OnboardingStackParamList = {
  Welcome: undefined;
  Reminders: undefined;
  Privacy: undefined;
  LastPeriod: undefined;
  PeriodLength: undefined;
  CycleLength: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator = () => {
  return (
    <OnboardingProvider>
      <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
        <OnboardingStack.Screen name="Welcome" component={WelcomeScreen} />
        <OnboardingStack.Screen name="Reminders" component={RemindersScreen} />
        <OnboardingStack.Screen name="Privacy" component={PrivacyScreen} />
        <OnboardingStack.Screen name="LastPeriod" component={LastPeriodScreen} />
        <OnboardingStack.Screen name="PeriodLength" component={PeriodLengthScreen} />
        <OnboardingStack.Screen name="CycleLength" component={CycleLengthScreen} />
      </OnboardingStack.Navigator>
    </OnboardingProvider>
  );
};

const RootNavigator = () => {
  const theme = useTheme();
  const { hasCompletedOnboarding, hasCompletedSetup } = useAppSelector((state) => state.app.meta);

  const navigationTheme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: theme.colors.background,
        primary: theme.colors.primary,
        card: theme.colors.background,
        text: theme.colors.ink,
        border: theme.colors.backgroundSoft,
      },
    }),
    [theme],
  );

  const shouldShowMainApp = hasCompletedOnboarding && hasCompletedSetup;

  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme}>
      <RootStack.Navigator key={shouldShowMainApp ? "main" : "onboarding"} screenOptions={{ headerShown: false }}>
        {shouldShowMainApp ? (
          <RootStack.Screen name="Main" component={MainTabs} />
        ) : (
          <RootStack.Screen name="Onboarding" component={OnboardingNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;


