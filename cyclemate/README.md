# CycleMate

React Native (Expo) tabanlı regl döngüsü takip uygulaması. Onboarding ve kurulum akışıyla başlayıp takvim, günlük, raporlar ve ayarlar sekmeleri üzerinden tüm deneyimi sunar.

## Başlangıç

```bash
npm install
npx expo start --android
```

> iOS testi için `npx expo start --ios` komutu kullanılabilir (macOS gerektirir).

## Başlıca Özellikler

- **Onboarding & Kurulum:** Tasarımlarla uyumlu üç onboarding + üç kurulum adımı, yerel depolama ve navigasyon entegrasyonuyla tamamlandı.
- **Takvim:** Gerçek ve tahmini adet günleri, fertil pencere ve ovulasyon işaretleri; hızlı aksiyonlar, bilgi ve motivasyon kartları.
- **Günlük:** Ruh hali, belirtiler, not ve semptoma göre dinamik öneriler; kayıtlar AsyncStorage üzerinden persiste ediliyor.
- **Raporlar:** Döngü/adet ortalamaları, ruh hali trendi ve en sık belirtiler Victory grafikleriyle gösteriliyor.
- **Ayarlar:** Ortalama süreler için stepper kontrolleri, bildirim stub’u, tema ve dil placeholders, veri gizliliği bilgilendirmesi.

## Proje Yapısı

```
cyclemate/
├─ App.tsx               # Sağlayıcılar, tema ve navigasyon kökü
├─ src/
│  ├─ components/        # Ortak UI bileşenleri (GradientButton, CalendarDay vb.)
│  ├─ navigation/        # Stack & tab navigatörleri
│  ├─ screens/           # Ekranlar (onboarding, setup, calendar, daily log, reports, settings)
│  ├─ services/          # Tahmin algoritması, öneri ve bildirim servisleri
│  ├─ store/             # Redux slice, persist, selector’lar
│  ├─ theme/             # Tasarım token’ları ve ThemeProvider
│  └─ utils/             # Tarih yardımcıları, sabitler, tipler
```

## Komutlar

- `npm run start` – Expo geliştirme sunucusunu başlatır
- `npm run android` / `npm run ios` / `npm run web` – Platform bazlı başlangıç komutları
- `npx tsc --noEmit` – Tip kontrolü (projede kullanıldı)

## Notlar

- Bildirim servisi stub durumda; gerçek planlama için `expo-notifications` altyapısı hazır.
- Victory grafik tipleri için `src/types/victory-native.d.ts` içinde modül deklarasyonu tanımlandı.
- Varsayılan tema açık renk; tasarım token’ları üzerinden koyu tema geçişi kolayca eklenebilir.
