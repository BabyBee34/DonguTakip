import type { LanguageCode } from "../types/app";

type TranslationPrimitive = string | string[];

export interface TranslationMap {
  [key: string]: TranslationNode;
}

export type TranslationNode = TranslationPrimitive | TranslationMap;
export type TranslationDictionary = TranslationMap;
export type TranslationTable = Record<LanguageCode, TranslationDictionary>;

export const translations: TranslationTable = {
  tr: {
    tabs: {
      calendar: "Takvim",
      dailyLog: "Günlük",
      reports: "Raporlar",
      settings: "Ayarlar",
    },
    actions: {
      continue: "Devam Et",
      next: "İleri",
      start: "Başla",
      done: "Hazırım",
      allow: "İzin Ver",
      skip: "Atla",
    },
    onboarding: {
      welcome: {
        title: "Döngünü kolayca takip et",
        subtitle: "Regl günlerini, ruh halini ve enerjini kaydet.",
      },
      reminders: {
        title: "Küçük hatırlatmalar hep yanında",
        subtitle: "Su iç, vitamin al, dinlen. Tam zamanı geldiğinde seni nazikçe uyaracağım.",
        points: [
          "Su tüketimi, günlük log ve adet yaklaşırken bildirir.",
          "Saatini ve sıklığını istediğin gibi ayarlayabilirsin.",
          "Tüm veriler cihazında kalır, izin olmadan paylaşılmaz.",
        ],
        note: "Bildirimleri açtığında, telefonunun ayarlarındaki izinleri de kontrol etmeyi unutma.",
      },
      privacy: {
        title: "Verilerin sende güvende",
        subtitle: "Tüm kayıtlar cihazında şifreli olarak saklanır. İstersen tek dokunuşla silebilirsin.",
        points: [
          "Bulut senkronizasyonu yok; her şey offline olarak tutulur.",
          "Verileri dışa aktararak kendin saklayabilirsin.",
          "İzin vermediğin sürece üçüncü taraflarla paylaşım yapılmaz.",
        ],
        sources: [
          "ACOG · Menstrual Cycle Tracking Guidelines",
          "WHO · Digital Health Privacy Principles",
        ],
      },
      common: {
        disclaimer: "CycleMate tıbbi tavsiye sunmaz. Belirtilerin devam ederse lütfen sağlık uzmanına başvur.",
      },
    },
    setup: {
      lastPeriod: {
        title: "Son adet başlangıcını seç",
        subtitle: "Takvimi doğru doldurabilmem için son kanamanın ilk gününü işaretle.",
        helper: "Tarih seçerken emin değilsen takvim notlarını veya sağlık uygulamanı kontrol edebilirsin.",
        cta: "Devam Et",
      },
      periodLength: {
        title: "Adet süreni belirle",
        subtitle: "Kanaman genelde kaç gün sürüyor? Ortalama 5 gün.",
        helper: "Değerini istediğin zaman Ayarlar bölümünden değiştirebilirsin.",
        badge: "Seçilen {days} gün",
        cta: "Devam Et",
      },
      cycleLength: {
        title: "Döngü süreni tamamla",
        subtitle: "Adetlerin arası genelde kaç gün? Ortalama 28 gün.",
        helper: "Bu bilgi ovulasyon ve fertil pencere tahminleri için kullanılır.",
        badge: "Seçilen {days} gün",
        cta: "Başla",
      },
    },
    dailyLog: {
      heading: {
        title: "Bugünkü günlüğün 🌸",
        subtitle: "Kendini nasıl hissediyorsun?",
      },
      mood: {
        title: "Ruh halin",
        helper: "Birini seçtiğinde kaydına eklenir, dilediğinde değiştirebilirsin.",
        options: {
          ecstatic: "Harika",
          happy: "Mutlu",
          neutral: "Dengede",
          tired: "Yorgun",
          sad: "Düşük",
          angry: "Gergin",
        },
      },
      symptoms: {
        title: "Belirtiler",
        sections: {
          pain: "Ağrılar",
          mood: "Ruh hali",
          body: "Vücut",
        },
        actions: {
          select: "Seç",
          selected: "Seçildi",
        },
        items: {
          cramp: "Kasık ağrısı",
          headache: "Baş ağrısı",
          backPain: "Bel ağrısı",
          bloating: "Şişkinlik",
          breastTenderness: "Göğüs hassasiyeti",
          acne: "Cilt",
          appetite: "İştah",
          lowEnergy: "Düşük enerji",
          sleepy: "Uykulu",
          discharge: "Akıntı",
        },
      },
      note: {
        title: "Notun",
        placeholder: "Bugünü anlatmak ister misin?",
        helper: "Bugün seni etkileyen detayları buraya yazabilirsin.",
      },
      suggestion: {
        title: "Sana özel öneriler",
        loading: "Seçtiğin belirtiler için öneriler hazırlanıyor...",
        empty: "Belirti seçtiğinde sana uygun öneriler göstereceğim.",
        disclaimer: "CycleMate tıbbi tavsiye sunmaz; belirtilerin devam ederse lütfen doktoruna danış.",
      },
      smallTip: {
        title: "Küçük hatırlatma",
        text: "Gün içinde birkaç derin nefes molası kaslarını gevşetir ve zihnini yeniler.",
      },
      actions: {
        save: "Günlüğü Kaydet",
        saved: "Kaydedildi ✓",
        saveA11y: "Günlük kaydını kaydet",
      },
      feedback: {
        saved: "Bugünkü kaydın saklandı.",
      },
      suggestions: {
        fallback: {
          rest: "Kısa molalar verip esneme yapmak kaslarını rahatlatır.",
          breathe: "4-6 nefes tekniği (4 saniye al, 6 saniye ver) gerginliği azaltır.",
          music: "Sevdiğin sakin bir çalma listesi odaklanmana yardımcı olur.",
        },
        cramp: {
          heat: "Alt karına 15 dakikalık ılık kompres kasılmaları hafifletir.",
          magnesium: "Magnezyum içeren atıştırmalıklar kas gevşemesini destekler.",
          stretch: "Nazik kalça ve bel esnetmeleri kan dolaşımını artırır.",
        },
        headache: {
          hydration: "Ekstra bir bardak su içmek gerilim tipi baş ağrılarını hafifletir.",
          darkRoom: "Kısa süre karanlık ve sessiz bir odada dinlenmek rahatlatır.",
          magnesium: "Magnezyum takviyesi migren eşiğini yükseltebilir (doktoruna danış).",
        },
        backPain: {
          heat: "Bel bölgesine ılık kompres uygulamak kasları gevşetir.",
          posture: "Gün içinde otururken bel desteği kullanmak yükü azaltır.",
          walk: "10 dakikalık hafif yürüyüş kan dolaşımını canlandırır.",
        },
        bloating: {
          tea: "Rezene veya nane çayı sindirimi rahatlatır.",
          salt: "Tuz tüketimini azaltmak vücutta sıvı tutulmasını engeller.",
          stretch: "Nazik burgu hareketleri sindirimi destekler.",
        },
        breastTenderness: {
          support: "Destekleyici bir sporcu sütyeni hassasiyeti azaltır.",
          warmCompress: "Ilık duş veya kompres rahatlama sağlar.",
          caffeine: "Kafeini azaltmak şişkinlik hissini düşürür.",
        },
        acne: {
          clean: "Günde iki kez nazik temizleyiciyle cildini arındır.",
          pillow: "Yastık kılıfını sık değiştirmek bakteri birikimini azaltır.",
          hydrate: "Bol su içmek cildin bariyerini destekler.",
        },
        appetite: {
          protein: "Proteinli ara öğünler kan şekerini dengeler.",
          smallMeals: "Küçük porsiyonlarla sık beslenmek ani acıkmayı önler.",
          track: "Yeme alışkanlıklarını not etmek farkındalık sağlar.",
        },
        lowEnergy: {
          freshAir: "Kısa süre açık havaya çıkmak enerji seviyeni yeniler.",
          lunch: "Demir ve B12 içeren öğünler gün içi yorgunluğu azaltır.",
          rest: "15 dakikalık gevşeme molası zihinsel yorgunluğu düşürür.",
        },
        sleepy: {
          nap: "15 dakikalık şekerleme uyanıklığı artırır.",
          screen: "Akşam ekran süresini kısaltmak uyku kalitesini yükseltir.",
          routine: "Sabah-akşam rutinini sabitlemek biyolojik saati dengeler.",
        },
        discharge: {
          cotton: "Pamuklu iç çamaşırı tercih etmek hava akışını sağlar.",
          hydrate: "Yeterli su tüketimi vajinal sağlığı destekler.",
          track: "Akıntı rengini not etmek değişiklikleri fark etmeyi kolaylaştırır.",
        },
        sources: {
          acog: "Kaynak: ACOG – Kadın Sağlığı Kılavuzu",
          mayo: "Kaynak: Mayo Clinic",
          who: "Kaynak: Dünya Sağlık Örgütü",
          nih: "Kaynak: NIH Kadın Sağlığı",
          nhs: "Kaynak: NHS Sağlık Rehberi",
          derm: "Kaynak: American Academy of Dermatology",
        },
      },
    },
    calendar: {
      header: {
        greeting: "Merhaba!",
        subtitle: "Bugün nasılsın?",
      },
      legend: {
        actual: "Regl",
        predicted: "Tahmini Regl",
        fertile: "Fertil",
        ovulation: "Ovulasyon",
        today: "Bugün",
      },
      quickActions: {
        start: "Adet Başlat",
        end: "Adet Bitti",
        log: "Günlük Kaydet",
      },
      info: {
        title: "Bedenine iyi bak",
        subtitle: "Bugün sana iyi gelebilecek küçük öneriler:",
        tips: [
          "Gün içinde küçük molalar ver, su tüketimini ihmal etme.",
          "Demir ve magnezyum içeren atıştırmalıklar enerji verir.",
          "Nefes egzersizleri gerginliği azaltır ve rahatlatır.",
        ],
      },
      summary: {
        nextPeriodTitle: "Sıradaki tahmini adet",
        range: "{start} - {end}",
        noData: "Tahminleri gösterebilmem için birkaç döngü daha kaydetmelisin.",
      },
      motivation: {
        title: "Bugün için küçük ilham",
      },
      phase: {
        badge: "{phaseName} fazı · Gün {phaseDay}",
        cycleBadge: "Döngü günü {cycleDay}",
        hormoneLabel: "Hormon notu",
        focusLabel: "Bugün odaklan",
        tipsLabel: "Bugün dene",
        sourcesLabel: "Kaynaklar",
        fertileWindowLabel: "Fertil pencere: {start}-{end}. günler",
        menstrual: {
          title: "Menstrüel Faz",
          summary: "Rahim iç tabakası yenilenirken enerji düşebilir; bedenin dinlenmek ister.",
          hormones: "Östrojen ve progesteron seviyeleri en düşük düzeydedir.",
          focus: [
            "Demir yönünden zengin besinlerle depolarını doldur.",
            "Nazik hareketler ve sıcak kompreslerle rahatla.",
            "Uyku düzenine dikkat et; yoğun programı hafiflet.",
          ],
          tips: [
            "Ilık duş ve nefes egzersizleri kasılmaları hafifletir.",
            "Bitki çayları (papatya, zencefil) sindirimi destekler.",
            "Kısa yürüyüşler kan dolaşımını canlandırır.",
          ],
          sources: [
            "ACOG · Clinical Consensus on Menstruation",
            "Cleveland Clinic · Menstrual Health Guide",
          ],
        },
        follicular: {
          title: "Foliküler Faz",
          summary: "Enerji ve motivasyon yükselir; yeni fikirlere daha açıksın.",
          hormones: "Östrojen artmaya başlar, FSH olgun folikülleri destekler.",
          focus: [
            "Yeni projelere adım at, yaratıcılığını kullan.",
            "Yüksek tempolu egzersizlerle enerjini değerlendir.",
            "Renkli sebzeler ve proteinle beslenmeyi güçlendir.",
          ],
          tips: [
            "Güne esneme ile başla, metabolizmanı uyandır.",
            "Protein ve lif dengesi odaklanmanı korur.",
            "Su tüketimini artır, vücudunu destekle.",
          ],
          sources: [
            "Harvard Health · Follicular Phase Overview",
            "Johns Hopkins Medicine · Hormonal Cycle Basics",
          ],
        },
        ovulation: {
          title: "Ovulasyon Fazı",
          summary: "Doğurganlığın en yüksek olduğu günler; kendini güçlü hissedebilirsin.",
          hormones: "LH dalgalanması yumurtlamayı tetikler, östrojen zirvededir.",
          focus: [
            "Bol su içerek dengeyi koru.",
            "Protein ve sağlıklı yağlarla hormonlarını destekle.",
            "Sosyalleşmek ve iletişim kurmak keyif verir.",
          ],
          tips: [
            "Pelvik bölgeyi rahatlatan pilates veya esneme dene.",
            "Nefes alan pamuklu kıyafetler tercih et.",
            "Fertil pencereni not alarak plan yap.",
          ],
          sources: [
            "Mayo Clinic · Ovulation and Fertility",
            "NHS UK · Natural Fertility Indicators",
          ],
        },
        luteal: {
          title: "Luteal Faz",
          summary: "Vücut olası gebelik için hazırlanır; duygu ve iştah değişebilir.",
          hormones: "Progesteron yükselir, östrojen ikinci bir tepe yapar.",
          focus: [
            "Kompleks karbonhidratlarla kan şekerini dengele.",
            "Nazik yoga veya meditasyonla gevşe.",
            "Magnezyum ve B6 içeren besinlere yer ver.",
          ],
          tips: [
            "Akşam rutini oluştur, uyku hijyenini destekle.",
            "Şişkinlik için su ve potasyumdan zengin gıdalar tüket.",
            "Duygularını günlük yazarak ifade et.",
          ],
          sources: [
            "NIH · Luteal Phase Physiology",
            "Verywell Health · PMS Management Strategies",
          ],
        },
      },
      disclaimer: "CycleMate tıbbi tavsiye sunmaz. Belirtilerin devam ederse lütfen sağlık uzmanına başvur.",
    },
  },
  en: {
    tabs: {
      calendar: "Calendar",
      dailyLog: "Daily Log",
      reports: "Reports",
      settings: "Settings",
    },
    actions: {
      continue: "Continue",
      next: "Next",
      start: "Start",
      done: "I'm ready",
      allow: "Allow",
      skip: "Skip",
    },
    onboarding: {
      welcome: {
        title: "Track your cycle with ease",
        subtitle: "Keep your period days, mood, and energy in one place.",
      },
      reminders: {
        title: "Gentle reminders, right on time",
        subtitle: "Stay hydrated, take vitamins, rest well. I'll nudge you when it's time.",
        points: [
          "Notifies you for hydration, daily logs, and upcoming periods.",
          "Fully customizable schedule to match your routine.",
          "All alerts stay on device; no sharing without your consent.",
        ],
        note: "After enabling reminders, double-check notification permissions in your device settings.",
      },
      privacy: {
        title: "Your data stays with you",
        subtitle: "All entries are stored locally with encryption. You can wipe them anytime.",
        points: [
          "No cloud sync—everything lives offline on your phone.",
          "Export your logs to back them up manually whenever you prefer.",
          "No third-party access unless you explicitly grant it.",
        ],
        sources: [
          "ACOG · Menstrual Cycle Tracking Guidelines",
          "WHO · Digital Health Privacy Principles",
        ],
      },
      common: {
        disclaimer: "CycleMate does not provide medical advice. Please consult a health professional when symptoms persist.",
      },
    },
    setup: {
      lastPeriod: {
        title: "Select your last period start",
        subtitle: "Pick the first day of your latest bleeding to personalise the calendar.",
        helper: "Not sure about the date? Check your notes or health app for a quick refresh.",
        cta: "Continue",
      },
      periodLength: {
        title: "Set your period length",
        subtitle: "How many days do you usually bleed? Average is 5 days.",
        helper: "You can always update this value later from the Settings screen.",
        badge: "Selected {days} days",
        cta: "Continue",
      },
      cycleLength: {
        title: "Lock in your cycle length",
        subtitle: "How many days between periods? Average is 28 days.",
        helper: "We use this to forecast ovulation and fertile windows for you.",
        badge: "Selected {days} days",
        cta: "Start",
      },
    },
    dailyLog: {
      heading: {
        title: "Your daily log 🌸",
        subtitle: "How are you feeling today?",
      },
      mood: {
        title: "Mood",
        helper: "Choose the emoji that reflects you best — you can change it anytime.",
        options: {
          ecstatic: "Amazing",
          happy: "Happy",
          neutral: "Balanced",
          tired: "Tired",
          sad: "Low",
          angry: "Tense",
        },
      },
      symptoms: {
        title: "Symptoms",
        sections: {
          pain: "Pain",
          mood: "Mood",
          body: "Body",
        },
        actions: {
          select: "Select",
          selected: "Selected",
        },
        items: {
          cramp: "Cramps",
          headache: "Headache",
          backPain: "Back pain",
          bloating: "Bloating",
          breastTenderness: "Breast tenderness",
          acne: "Skin",
          appetite: "Appetite",
          lowEnergy: "Low energy",
          sleepy: "Sleepy",
          discharge: "Discharge",
        },
      },
      note: {
        title: "Notes",
        placeholder: "Anything you’d like to remember about today?",
        helper: "Add details that impacted your day so you can spot patterns later.",
      },
      suggestion: {
        title: "Personalised suggestions",
        loading: "Gathering science-backed tips for your symptoms...",
        empty: "Select a symptom and I’ll show you tailored ideas.",
        disclaimer: "CycleMate does not provide medical advice; please speak with your doctor if symptoms persist.",
      },
      smallTip: {
        title: "Gentle reminder",
        text: "A couple of deep-breathing pauses keeps muscles relaxed and mind clear.",
      },
      actions: {
        save: "Save daily log",
        saved: "Saved ✓",
        saveA11y: "Save today’s daily log",
      },
      feedback: {
        saved: "Your entry for today is stored.",
      },
      suggestions: {
        fallback: {
          rest: "Short breaks with gentle stretches release tension.",
          breathe: "Try the 4-6 breathing pattern to calm your nervous system.",
          music: "A soothing playlist can lift mood and focus.",
        },
        cramp: {
          heat: "Apply a warm compress to your lower abdomen for 15 minutes to ease cramps.",
          magnesium: "Magnesium-rich snacks help muscles relax during menstruation.",
          stretch: "Gentle hip and lower-back stretches improve circulation.",
        },
        headache: {
          hydration: "Drink an extra glass of water to reduce tension headaches.",
          darkRoom: "Resting briefly in a dark, quiet room can dial down discomfort.",
          magnesium: "Magnesium supplements may raise your migraine threshold (check with your clinician).",
        },
        backPain: {
          heat: "A warm compress on the lower back soothes tight muscles.",
          posture: "Support your lower back while sitting to reduce strain.",
          walk: "A 10-minute light walk boosts circulation and loosens stiffness.",
        },
        bloating: {
          tea: "Sip fennel or peppermint tea to aid digestion.",
          salt: "Cutting back on salt helps prevent fluid retention.",
          stretch: "Gentle twists or cat–cow stretches ease abdominal tightness.",
        },
        breastTenderness: {
          support: "Wear a supportive sports bra to reduce breast soreness.",
          warmCompress: "Warm compresses or showers offer short-term relief.",
          caffeine: "Limiting caffeine can ease cyclical breast discomfort.",
        },
        acne: {
          clean: "Cleanse twice daily with a mild product to remove excess oil.",
          pillow: "Change pillowcases regularly to avoid bacteria build-up.",
          hydrate: "Staying hydrated supports your skin barrier.",
        },
        appetite: {
          protein: "Include protein with snacks to stabilise blood sugar swings.",
          smallMeals: "Smaller, frequent meals stop sudden hunger crashes.",
          track: "Jotting down cravings helps you spot helpful routines.",
        },
        lowEnergy: {
          freshAir: "A brief step outside refreshes energy and mood.",
          lunch: "Iron and B12-rich meals beat midday slumps.",
          rest: "A 15-minute relaxation break combats mental fatigue.",
        },
        sleepy: {
          nap: "A short power nap boosts alertness without affecting sleep.",
          screen: "Limit evening screen time to protect melatonin.",
          routine: "Keep a consistent sleep–wake schedule to stabilise energy.",
        },
        discharge: {
          cotton: "Choose breathable cotton underwear for airflow.",
          hydrate: "Adequate hydration supports vaginal health.",
          track: "Logging colour/texture changes makes patterns easier to notice.",
        },
        sources: {
          acog: "Source: ACOG – Women’s Health Guidance",
          mayo: "Source: Mayo Clinic",
          who: "Source: World Health Organization",
          nih: "Source: NIH Office of Women’s Health",
          nhs: "Source: NHS Health Guide",
          derm: "Source: American Academy of Dermatology",
        },
      },
    },
    calendar: {
      header: {
        greeting: "Hi there!",
        subtitle: "How are you feeling today?",
      },
      legend: {
        actual: "Period",
        predicted: "Predicted period",
        fertile: "Fertile",
        ovulation: "Ovulation",
        today: "Today",
      },
      quickActions: {
        start: "Start period",
        end: "Mark period done",
        log: "Add daily log",
      },
      info: {
        title: "Care for your body",
        subtitle: "A few gentle ideas to feel better today:",
        tips: [
          "Take mindful breaks and keep a water bottle nearby.",
          "Pair magnesium-rich snacks with protein for steady energy.",
          "Use breathing exercises to release tension and reset.",
        ],
      },
      summary: {
        nextPeriodTitle: "Next predicted period",
        range: "{start} – {end}",
        noData: "Log a few more cycles to see your predictions here.",
      },
      motivation: {
        title: "A little boost for today",
      },
      phase: {
        badge: "{phaseName} phase · Day {phaseDay}",
        cycleBadge: "Cycle day {cycleDay}",
        hormoneLabel: "Hormone notes",
        focusLabel: "Focus on",
        tipsLabel: "Try this",
        sourcesLabel: "Sources",
        fertileWindowLabel: "Fertile window: days {start}-{end}",
        menstrual: {
          title: "Menstrual phase",
          summary: "Your body renews the uterine lining; energy may ebb.",
          hormones: "Estrogen and progesterone reach their lowest point.",
          focus: [
            "Choose iron-rich meals to replenish stores.",
            "Soothe with gentle movement and warm compresses.",
            "Protect your sleep schedule and lighten the agenda.",
          ],
          tips: [
            "Warm showers and breathing drills ease cramping.",
            "Herbal teas (chamomile, ginger) calm digestion.",
            "A short walk keeps circulation flowing.",
          ],
          sources: [
            "ACOG · Clinical Consensus on Menstruation",
            "Cleveland Clinic · Menstrual Health Guide",
          ],
        },
        follicular: {
          title: "Follicular phase",
          summary: "Motivation climbs; creativity and focus feel sharper.",
          hormones: "Estrogen rises while FSH supports follicle growth.",
          focus: [
            "Kick off new ideas and plan ahead.",
            "Channel energy into upbeat workouts.",
            "Load up on bright vegetables and lean protein.",
          ],
          tips: [
            "Start the morning with stretching to wake your body.",
            "Protein plus fiber keeps concentration steady.",
            "Hydrate generously to sustain momentum.",
          ],
          sources: [
            "Harvard Health · Follicular Phase Overview",
            "Johns Hopkins Medicine · Hormonal Cycle Basics",
          ],
        },
        ovulation: {
          title: "Ovulation phase",
          summary: "Fertility peaks and confidence often follows.",
          hormones: "A surge of LH triggers ovulation; estrogen reaches its high point.",
          focus: [
            "Stay hydrated and keep nourishment balanced.",
            "Lean on quality protein and healthy fats.",
            "Enjoy collaboration and connection.",
          ],
          tips: [
            "Pelvic-friendly stretching or Pilates eases tension.",
            "Opt for breathable, lightweight fabrics.",
            "Note your fertile window to plan intentionally.",
          ],
          sources: [
            "Mayo Clinic · Ovulation and Fertility",
            "NHS UK · Natural Fertility Indicators",
          ],
        },
        luteal: {
          title: "Luteal phase",
          summary: "Your body prepares for a possible pregnancy; mood and appetite can shift.",
          hormones: "Progesterone climbs as estrogen creates a second peak.",
          focus: [
            "Support blood sugar with complex carbohydrates.",
            "Unwind with calming yoga or meditation.",
            "Add magnesium- and B6-rich foods.",
          ],
          tips: [
            "Build a calming evening ritual to protect sleep.",
            "Choose hydrating foods to ease bloating.",
            "Jot down emotions in a journal to process them.",
          ],
          sources: [
            "NIH · Luteal Phase Physiology",
            "Verywell Health · PMS Management Strategies",
          ],
        },
      },
      disclaimer: "CycleMate does not provide medical advice. Please consult a health professional when symptoms persist.",
    },
  },
};
