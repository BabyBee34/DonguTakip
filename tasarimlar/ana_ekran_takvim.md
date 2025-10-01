<!DOCTYPE html>
<html lang="tr"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Ana Takvim Ekranı</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
<style type="text/tailwindcss">
    :root {
      --actual-period: #FF7C9D;
      --predicted-period: #FFD6E0;
      --fertile: #7AD1C5;
      --ovulation: #CBA8FF;
      --today-ring: #7AD1C5;
      --soft-grey: #6A6A6F;
      --grad-from: #FFF3FA;
      --grad-to: #F5EDFF;
      --pink-grad-from: #FF7C9D;
      --pink-grad-to: #CBA8FF;
      --purple-grad-from: #CBA8FF;
      --purple-grad-to: #7AD1C5;
      --info-bg: #E6F3FF;
      --motiv-grad-from: #FFE7F3;
      --motiv-grad-to: #EAD9FF;
      --legend-regl-bg: var(--actual-period);
      --legend-tahmini-regl-bg: var(--predicted-period);
      --legend-fertil-bg: var(--fertile);
      --legend-ovulasyon-bg: var(--ovulation);
      --legend-bugun-bg: white;}
    body {
      min-height: 100dvh;
      font-family: 'Poppins', sans-serif;
      background-image: linear-gradient(to bottom, var(--grad-from), var(--grad-to));
    }
    .fade-in-slide-up {
      animation: fade-in-slide-up 0.6s ease-out forwards;
    }
    @keyframes fade-in-slide-up {
      from {
        opacity: 0;
        transform: translateY(24px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .quick-action-button {
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    }
    .quick-action-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px -5px rgba(203, 168, 255, 0.4);
    }
    .quick-action-button.pink-glow:hover {
        box-shadow: 0 10px 20px -5px rgba(255, 124, 157, 0.4);
    }
    .quick-action-button:active {
      animation: quick-bounce 0.3s ease-in-out;
    }
    @keyframes quick-bounce {
      0%, 100% { transform: translateY(-2px); }
      50% { transform: translateY(0) scale(0.98); }
    }
    .motiv-card-load {
      animation: motiv-bounce 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0.2s forwards;
      opacity: 0;
    }
    @keyframes motiv-bounce {
      0% { transform: scale(0.9) translateY(10px); opacity: 0; }
      60% { transform: scale(1.05); opacity: 1; }
      100% { transform: scale(1) translateY(0); opacity: 1; }
    }
    .glassmorphism {
      background: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="text-gray-800 antialiased">
<div class="mx-auto flex h-full min-h-dvh w-full max-w-[390px] flex-col px-4 pt-6 pb-28">
<header class="flex items-start justify-between py-4">
<div>
<h1 class="text-3xl font-bold text-gray-900">Merhaba Pelin 🌸</h1>
<p class="text-[var(--soft-grey)] text-base">Bugün nasılsın?</p>
</div>
<button class="transition-transform active:scale-95">
<img alt="User avatar" class="size-10 rounded-full border-2 border-white shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYYyRzeb4tQayA_NwzOVoJWkdGb5DxDklpxjw5asQBtsMRqCJE8re5DmZSsBJ-uBU9tF-0iGkLjhkWRxIxea0nA0JmsrqhE5yBbbvf_K8okqn3ZGCXCU6foza7Mky6_RsnHs44FM13zpy_M79rQ-2GXqYDPCL9IzhSVVzyIoWc2Wq41Zlm7E1VT_I_B4-PeQp6nHQHpKoW6E42S36f4021L7iVaOzQ2WF_pK7gm2s70O7uAsBXeLBFGl8QWBy7AYAb7zeXJYABv6g"/>
</button>
</header>
<main class="flex flex-1 flex-col gap-y-4">
<div class="rounded-2xl bg-white/40 p-4 shadow-lg shadow-purple-500/5 backdrop-blur-md">
<div class="flex items-center justify-between px-2">
<button class="p-2 rounded-full hover:bg-black/5 transition-colors active:scale-90">
<span class="material-symbols-outlined text-gray-700">chevron_left</span>
</button>
<h2 class="font-semibold text-lg text-gray-900">Eylül 2025</h2>
<button class="p-2 rounded-full hover:bg-black/5 transition-colors active:scale-90">
<span class="material-symbols-outlined text-gray-700">chevron_right</span>
</button>
</div>
<div class="grid grid-cols-7 gap-y-2 text-center text-sm mt-4">
<div class="font-medium text-gray-500 text-xs">PZT</div>
<div class="font-medium text-gray-500 text-xs">SAL</div>
<div class="font-medium text-gray-500 text-xs">ÇAR</div>
<div class="font-medium text-gray-500 text-xs">PER</div>
<div class="font-medium text-gray-500 text-xs">CUM</div>
<div class="font-medium text-gray-500 text-xs">CMT</div>
<div class="font-medium text-gray-500 text-xs">PAZ</div>
<div class="flex items-center justify-center"><span class="flex size-11 items-center justify-center text-gray-400 text-lg font-bold">25</span></div>
<div class="flex items-center justify-center"><span class="flex size-11 items-center justify-center text-gray-400 text-lg font-bold">26</span></div>
<div class="flex items-center justify-center"><span class="flex size-11 items-center justify-center text-gray-400 text-lg font-bold">27</span></div>
<div class="flex items-center justify-center"><span class="flex size-11 items-center justify-center text-gray-400 text-lg font-bold">28</span></div>
<div class="flex items-center justify-center"><span class="flex size-11 items-center justify-center text-gray-400 text-lg font-bold">29</span></div>
<div class="flex items-center justify-center"><span class="flex size-11 items-center justify-center text-gray-400 text-lg font-bold">30</span></div>
<div class="flex items-center justify-center"><span class="flex size-11 items-center justify-center text-gray-400 text-lg font-bold">31</span></div>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl text-lg font-bold">1</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl text-lg font-bold">2</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl text-lg font-bold">3</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl text-lg font-bold">4</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl text-lg font-bold">5</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl bg-[var(--fertile)] text-lg font-bold text-gray-900">6</span><span class="absolute top-1 right-1 text-[14px]">🌱</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl bg-[var(--fertile)] text-lg font-bold text-gray-900">7</span><span class="absolute top-1 right-1 text-[14px]">🌱</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl bg-[var(--fertile)] text-lg font-bold text-gray-900">8</span><span class="absolute top-1 right-1 text-[14px]">🌱</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl bg-[var(--fertile)] text-lg font-bold text-gray-900">9</span><span class="absolute top-1 right-1 text-[14px]">🌱</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl bg-[var(--fertile)] text-lg font-bold text-gray-900">10</span><span class="absolute top-1 right-1 text-[14px]">🌱</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl bg-[var(--fertile)] text-lg font-bold text-gray-900">11</span><span class="absolute top-1 right-1 text-[14px]">🌱</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl ring-2 ring-offset-2 ring-offset-transparent ring-[var(--today-ring)] text-lg font-bold text-gray-900">12</span><span class="absolute top-1 right-1 text-[14px]">🌟</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl bg-[var(--predicted-period)] text-lg font-bold text-gray-900">13</span><span class="absolute top-1 right-1 text-[14px]">🌷</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl bg-[var(--predicted-period)] text-lg font-bold text-gray-900">14</span><span class="absolute top-1 right-1 text-[14px]">🌷</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl bg-[var(--predicted-period)] text-lg font-bold text-gray-900">15</span><span class="absolute top-1 right-1 text-[14px]">🌷</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl bg-[var(--actual-period)] text-lg font-bold text-white">16</span><span class="absolute top-1 right-1 text-[14px]">🌸</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl bg-[var(--actual-period)] text-lg font-bold text-white">17</span><span class="absolute top-1 right-1 text-[14px]">🌸</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl bg-[var(--actual-period)] text-lg font-bold text-white">18</span><span class="absolute top-1 right-1 text-[14px]">🌸</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl text-lg font-bold">19</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl text-lg font-bold">20</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl text-lg font-bold">21</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl text-lg font-bold">22</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl text-lg font-bold">23</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl text-lg font-bold">24</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl text-lg font-bold">25</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl text-lg font-bold">26</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl bg-[var(--ovulation)] text-lg font-bold text-white">27</span><span class="absolute top-1 right-1 text-[14px]">💜</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl text-lg font-bold">28</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl text-lg font-bold">29</span></button>
<button class="transition-transform active:scale-90 relative"><span class="flex size-11 items-center justify-center rounded-xl text-lg font-bold">30</span></button>
</div>
</div>
<div class="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-2">
<div class="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-[var(--legend-regl-bg)] py-1.5 px-3 text-sm font-medium text-white">🌸 Regl</div>
<div class="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-[var(--legend-tahmini-regl-bg)] py-1.5 px-3 text-sm font-medium text-gray-800">🌷 Tahmini Regl</div>
<div class="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-[var(--legend-fertil-bg)] py-1.5 px-3 text-sm font-medium text-gray-800">🌱 Fertil</div>
<div class="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-[var(--legend-ovulasyon-bg)] py-1.5 px-3 text-sm font-medium text-white">💜 Ovulasyon</div>
<div class="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-[var(--legend-bugun-bg)] py-1.5 px-3 text-sm font-medium text-gray-800 ring-2 ring-[var(--today-ring)]">🌟 Bugün</div>
</div>
<div class="grid grid-cols-2 gap-4">
<button class="quick-action-button pink-glow group flex h-14 items-center justify-center gap-x-2.5 rounded-2xl bg-gradient-to-r from-[var(--pink-grad-from)] to-[var(--pink-grad-to)] text-sm font-bold text-white shadow-lg shadow-pink-500/20">
<span class="material-symbols-outlined transition-transform group-hover:scale-110">water_drop</span>
<span class="flex-1 text-center -ml-8">Adet Başlat</span>
</button>
<button class="quick-action-button group flex h-14 items-center justify-center gap-x-2.5 rounded-2xl bg-gradient-to-r from-[var(--purple-grad-from)] to-[var(--purple-grad-to)] text-sm font-bold text-white shadow-lg shadow-purple-500/20">
<span class="material-symbols-outlined transition-transform group-hover:scale-110">edit_calendar</span>
<span class="flex-1 text-center -ml-8">Günlük Kaydet</span>
</button>
</div>
<div class="rounded-2xl bg-[var(--info-bg)] p-4 shadow-lg shadow-blue-500/10">
<p class="font-bold text-gray-800 mb-3 flex items-center gap-2"><span>📚</span>Bilgi Kutusu</p>
<ul class="space-y-3 text-sm text-gray-700">
<li class="flex items-start gap-2.5"><span>🔥</span><span>Sıcak su torbası kasları rahatlatır.</span></li>
<li class="flex items-start gap-2.5"><span>🌿</span><span>Zencefil çayı doğal anti-inflamatuardır.</span></li>
<li class="flex items-start gap-2.5"><span>🧘</span><span>Hafif esneme egzersizleri iyi gelir.</span></li>
</ul>
</div>
<div class="motiv-card-load rounded-2xl bg-gradient-to-br from-[var(--motiv-grad-from)] to-[var(--motiv-grad-to)] p-4 shadow-lg shadow-purple-500/10">
<p class="text-base font-medium text-gray-800 text-center">☕ Papatya çayı seni rahatlatır.</p>
</div>
</main>
</div>
<footer class="fixed bottom-0 left-0 right-0 z-10 mx-auto w-full max-w-[390px]">
<div class="relative bg-white/60 backdrop-blur-xl border-t border-gray-200/50">
<div class="flex h-[80px] items-center justify-around text-gray-500">
<a class="flex flex-col items-center gap-1 p-2 text-transparent bg-clip-text bg-gradient-to-b from-[var(--pink-grad-from)] to-[var(--pink-grad-to)]" href="#">
<span class="material-symbols-outlined text-3xl">calendar_month</span>
<span class="text-xs font-bold text-gray-700">Takvim</span>
</a>
<a class="flex flex-col items-center gap-1 p-2 transition-colors hover:text-[var(--purple-grad-from)]" href="#">
<span class="material-symbols-outlined text-3xl">article</span>
<span class="text-xs font-medium">Günlük</span>
</a>
<div class="w-14"></div>
<a class="flex flex-col items-center gap-1 p-2 transition-colors hover:text-[var(--purple-grad-from)]" href="#">
<span class="material-symbols-outlined text-3xl">bar_chart</span>
<span class="text-xs font-medium">Raporlar</span>
</a>
<a class="flex flex-col items-center gap-1 p-2 transition-colors hover:text-[var(--purple-grad-from)]" href="#">
<span class="material-symbols-outlined text-3xl">settings</span>
<span class="text-xs font-medium">Ayarlar</span>
</a>
</div>
<div class="absolute bottom-[25px] left-1/2 -translate-x-1/2">
<button class="flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-[var(--pink-grad-from)] to-[var(--pink-grad-to)] text-white shadow-lg shadow-pink-400/50 transition-transform active:scale-90">
<span class="material-symbols-outlined text-4xl">add</span>
</button>
</div>
</div>
</footer>

</body></html>