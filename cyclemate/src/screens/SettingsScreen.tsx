import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View, Pressable } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectNotifications, selectPrefs } from '../store/selectors';
import { setNotifications, updatePrefs } from '../store/appSlice';
import { notificationService } from '../services/notifications';
import type { NotificationFrequency } from '../types/app';

const AVG_PERIOD_RANGE: [number, number] = [3, 10];
const AVG_CYCLE_RANGE: [number, number] = [21, 35];

const FREQUENCY_OPTIONS: { id: NotificationFrequency; label: string; description: string }[] = [
  { id: 'low', label: 'Seyrek', description: 'Haftada 2 nazik hatırlatma' },
  { id: 'balanced', label: 'Dengeli', description: 'Her gün sabah/bir akşam' },
  { id: 'high', label: 'Sık', description: 'Günlük iki hatırlatma + yaklaşan regl uyarısı' },
];

const SettingsScreen = () => {
  const dispatch = useAppDispatch();
  const prefs = useAppSelector(selectPrefs);
  const notifications = useAppSelector(selectNotifications);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const adjustAvgPeriod = (direction: 1 | -1) => {
    const next = prefs.avgPeriodDays + direction;
    if (next < AVG_PERIOD_RANGE[0] || next > AVG_PERIOD_RANGE[1]) return;
    dispatch(updatePrefs({ avgPeriodDays: next }));
  };

  const adjustAvgCycle = (direction: 1 | -1) => {
    const next = prefs.avgCycleDays + direction;
    if (next < AVG_CYCLE_RANGE[0] || next > AVG_CYCLE_RANGE[1]) return;
    dispatch(updatePrefs({ avgCycleDays: next }));
  };

  const toggleNotifications = async (enabled: boolean) => {
    if (enabled) {
      const granted = await notificationService.ensurePermission();
      if (!granted) {
        setPermissionDenied(true);
        return;
      }
      setPermissionDenied(false);
      const schedule = notifications.schedule ?? 'balanced';
      dispatch(setNotifications({ enabled: true, schedule }));
      await notificationService.scheduleDailyReminder(schedule);
    } else {
      dispatch(setNotifications({ enabled: false, schedule: notifications.schedule }));
      await notificationService.disableReminders();
    }
  };

  const changeFrequency = async (frequency: NotificationFrequency) => {
    dispatch(setNotifications({ enabled: notifications.enabled, schedule: frequency }));
    if (notifications.enabled) {
      await notificationService.scheduleDailyReminder(frequency);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Ayarlar</Text>
      <Text style={styles.subheading}>Tercihlerini dilediğin zaman değiştirebilirsin.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Ortalama adet süresi</Text>
        <Stepper value={prefs.avgPeriodDays} onChange={adjustAvgPeriod} range={AVG_PERIOD_RANGE} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Ortalama döngü süresi</Text>
        <Stepper value={prefs.avgCycleDays} onChange={adjustAvgCycle} range={AVG_CYCLE_RANGE} />
      </View>

      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.cardTitle}>Bildirimler</Text>
            <Text style={styles.cardDescription}>Su içme, günlük kaydı ve yaklaşan regl uyarıları</Text>
          </View>
          <Switch
            value={notifications.enabled}
            onValueChange={toggleNotifications}
            thumbColor={notifications.enabled ? '#E66FD2' : '#FFFFFF'}
            trackColor={{ true: '#F6DDF2', false: '#E5E7EB' }}
          />
        </View>
        {permissionDenied ? (
          <Text style={styles.warningText}>Bildirim izni verilmedi. Lütfen cihaz ayarlarını kontrol et.</Text>
        ) : null}

        {notifications.enabled ? (
          <View style={styles.frequencyGroup}>
            {FREQUENCY_OPTIONS.map((option) => {
              const active = notifications.schedule === option.id;
              return (
                <Pressable
                  key={option.id}
                  onPress={() => changeFrequency(option.id)}
                  style={[styles.frequencyItem, active && styles.frequencyItemActive]}
                >
                  <Text style={[styles.frequencyLabel, active && styles.frequencyLabelActive]}>{option.label}</Text>
                  <Text style={styles.frequencyDescription}>{option.description}</Text>
                </Pressable>
              );
            })}
          </View>
        ) : null}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tema</Text>
        <Text style={styles.cardDescription}>Şimdilik yalnızca açık tema destekleniyor. Karanlık tema yakında!</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Dil</Text>
        <Text style={styles.cardDescription}>Uygulama Türkçe. İngilizce seçeneği için hazırlık devam ediyor.</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Veri gizliliği</Text>
        <Text style={styles.infoText}>Tüm verilerin cihazında saklanır. İstediğin zaman temizleyebilirsin.</Text>
      </View>
    </ScrollView>
  );
};

interface StepperProps {
  value: number;
  onChange: (direction: 1 | -1) => void;
  range: [number, number];
}

const Stepper = ({ value, onChange, range }: StepperProps) => {
  const isMin = value <= range[0];
  const isMax = value >= range[1];
  return (
    <View style={styles.stepper}>
      <Pressable
        onPress={() => onChange(-1)}
        style={[styles.stepperButton, isMin && styles.stepperButtonDisabled]}
        disabled={isMin}
      >
        <Text style={styles.stepperSymbol}>−</Text>
      </Pressable>
      <Text style={styles.stepperValue}>{value}</Text>
      <Pressable
        onPress={() => onChange(1)}
        style={[styles.stepperButton, isMax && styles.stepperButtonDisabled]}
        disabled={isMax}
      >
        <Text style={styles.stepperSymbol}>+</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 20,
  },
  heading: {
    fontFamily: 'Fredoka_700Bold',
    fontSize: 26,
    color: '#232326',
    marginTop: 16,
  },
  subheading: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 15,
    color: '#6A6A6F',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    gap: 16,
    shadowColor: 'rgba(0,0,0,0.08)',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
  },
  cardTitle: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    color: '#232326',
  },
  cardDescription: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 14,
    color: '#6A6A6F',
    marginTop: -4,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  warningText: {
    fontFamily: 'Nunito_500Medium',
    fontSize: 13,
    color: '#FF5A76',
  },
  frequencyGroup: {
    gap: 12,
  },
  frequencyItem: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E4E4EA',
    padding: 14,
    gap: 6,
  },
  frequencyItemActive: {
    borderColor: '#E66FD2',
    backgroundColor: '#F6DDF2',
  },
  frequencyLabel: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 15,
    color: '#232326',
  },
  frequencyLabelActive: {
    color: '#D052BE',
  },
  frequencyDescription: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 13,
    color: '#6A6A6F',
  },
  infoCard: {
    backgroundColor: '#F6F6FB',
    borderRadius: 18,
    padding: 18,
    gap: 8,
  },
  infoTitle: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    color: '#232326',
  },
  infoText: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 14,
    color: '#6A6A6F',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepperButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F6DDF2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperButtonDisabled: {
    backgroundColor: '#EFEFF4',
  },
  stepperSymbol: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 24,
    color: '#D052BE',
  },
  stepperValue: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 18,
    color: '#232326',
    minWidth: 32,
    textAlign: 'center',
  },
});

export default SettingsScreen;
