<!DOCTYPE html>
<html lang="tr"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Daily Mood &amp; Symptom Tracking</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<style type="text/tailwindcss">
    @layer base {
      :root {
        --pastel-pink: #FFD6E8;
        --pastel-lavender: #CDB4F9;
        --pastel-mint: #BFFAE0;
        --pastel-peach: #FFDDD2;
        --text-dark: #3d2931;
        --text-light: #9e8a91;
      }
      body {
        font-family: 'Poppins', sans-serif;
        background-color: #FEF7F9;
      }
    }
    .gradient-glow-ring {
      box-shadow: 0 0 15px 5px var(--pastel-pink), 0 0 25px 10px var(--pastel-lavender);
    }
    .confetti-button:active::after {
      content: '🎉🎊';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2rem;
      opacity: 0;
      animation: confetti-burst 0.5s ease-out;
    }
    @keyframes confetti-burst {
      0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
      100% { transform: translate(-50%, -150%) scale(2); opacity: 0; }
    }
    @keyframes bounce {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    }
    .bounce-animation {
        animation: bounce 0.5s ease-in-out;
    }
    @keyframes slide-up {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    .slide-up-animation {
        animation: slide-up 0.5s ease-out forwards;
    }
  </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="text-text-dark">
<div class="mx-auto flex h-full min-h-screen w-full max-w-md flex-col bg-white">
<header class="w-full px-6 pt-10 pb-6">
<div class="text-left">
<h1 class="text-3xl font-bold text-text-dark">Bugünkü Günlüğün 💕</h1>
<p class="text-md text-text-light">Kendini nasıl hissediyorsun bugün?</p>
</div>
</header>
<main class="flex-1 space-y-6 px-6">
<section>
<div class="flex items-center justify-between">
<button class="group" onclick="selectMood(this)">
<div class="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--pastel-pink)] p-2 ring-4 ring-transparent transition-all group-hover:scale-110 group-focus:scale-110">
<span class="text-4xl transition-transform group-hover:rotate-12">😍</span>
</div>
</button>
<button class="group" onclick="selectMood(this)">
<div class="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--pastel-peach)] p-2 ring-4 ring-transparent transition-all group-hover:scale-110 group-focus:scale-110">
<span class="text-4xl transition-transform group-hover:rotate-12">🙂</span>
</div>
</button>
<button class="group" onclick="selectMood(this)">
<div class="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--pastel-mint)] p-2 ring-4 ring-transparent transition-all group-hover:scale-110 group-focus:scale-110">
<span class="text-4xl transition-transform group-hover:rotate-12">😐</span>
</div>
</button>
<button class="group" onclick="selectMood(this)">
<div class="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--pastel-lavender)] p-2 ring-4 ring-transparent transition-all group-hover:scale-110 group-focus:scale-110">
<span class="text-4xl transition-transform group-hover:rotate-12">😢</span>
</div>
</button>
<button class="group" onclick="selectMood(this)">
<div class="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 p-2 ring-4 ring-transparent transition-all group-hover:scale-110 group-focus:scale-110">
<span class="text-4xl transition-transform group-hover:rotate-12">😡</span>
</div>
</button>
</div>
</section>
<section class="space-y-4">
<h2 class="text-xl font-bold text-text-dark">Belirtiler</h2>
<div class="grid grid-cols-2 gap-4">
<button class="group flex items-center gap-3 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-50 p-4 shadow-md transition-all hover:shadow-lg active:scale-95" onclick="selectSymptom()">
<span class="text-3xl">❤️</span>
<span class="font-semibold">Ağrılar</span>
</button>
<button class="group flex items-center gap-3 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-50 p-4 shadow-md transition-all hover:shadow-lg active:scale-95" onclick="selectSymptom()">
<span class="text-3xl">😊</span>
<span class="font-semibold">Ruh Hali</span>
</button>
<button class="group flex items-center gap-3 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-50 p-4 shadow-md transition-all hover:shadow-lg active:scale-95" onclick="selectSymptom()">
<span class="text-3xl">🌸</span>
<span class="font-semibold">Cilt &amp; Diğer</span>
</button>
</div>
</section>
<section>
<textarea class="w-full rounded-2xl border-2 border-[var(--pastel-peach)] bg-white p-4 shadow-sm transition placeholder:text-text-light focus:border-[var(--pastel-lavender)] focus:ring-0" placeholder="Bugün nasıldı? Kendine not bırak 💕" rows="4"></textarea>
</section>
<section class="space-y-4">
<div class="hidden items-center gap-4 rounded-2xl bg-gradient-to-br from-[var(--pastel-mint)] to-[var(--pastel-peach)] p-4 shadow-lg slide-up-animation" id="recommendation-card">
<span class="text-3xl">💡</span>
<div>
<h3 class="font-bold text-text-dark">Öneri</h3>
<p class="text-text-dark">Baş ağrısı için biraz esneme yapmayı dene 🧘‍♀️</p>
</div>
</div>
<div class="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-md">
<span class="text-3xl">🌿</span>
<div>
<p class="font-medium text-text-dark">Nane çayı şişkinliği azaltabilir.</p>
</div>
</div>
</section>
</main>
<footer class="sticky bottom-0 w-full bg-white/80 backdrop-blur-sm">
<div class="p-6">
<button class="confetti-button relative h-16 w-full rounded-full bg-gradient-to-r from-[var(--pastel-pink)] to-[var(--pastel-lavender)] text-lg font-bold text-white shadow-lg shadow-pink-200 transition-transform active:scale-95">
                ✨ Günlüğünü Kaydet ✨
            </button>
</div>
<div class="flex justify-around border-t border-gray-200 py-2">
<a class="flex flex-col items-center gap-1 p-2 text-text-light" href="#">
<span class="text-2xl">📅</span>
<span class="text-xs font-medium">Takvim</span>
</a>
<a class="relative flex flex-col items-center gap-1 p-2 text-text-dark" href="#">
<div class="absolute -top-3 rounded-full bg-gradient-to-tr from-[var(--pastel-pink)] to-[var(--pastel-lavender)] p-4 pt-3">
<span class="text-2xl">📖</span>
</div>
<span class="mt-10 text-xs font-bold">Günlük</span>
</a>
<a class="flex flex-col items-center gap-1 p-2 text-text-light" href="#">
<span class="text-2xl">📊</span>
<span class="text-xs font-medium">Raporlar</span>
</a>
<a class="flex flex-col items-center gap-1 p-2 text-text-light" href="#">
<span class="text-2xl">⚙️</span>
<span class="text-xs font-medium">Ayarlar</span>
</a>
</div>
</footer>
</div>
<script>
  let selectedMood = null;
  function selectMood(element) {
    // Remove glow and bounce from previously selected mood
    if (selectedMood) {
      selectedMood.classList.remove('gradient-glow-ring', 'bounce-animation');
    }
    // If clicking the same mood again, deselect it
    if (selectedMood === element.firstElementChild) {
      selectedMood = null;
      return;
    }
    // Apply glow and bounce to the new selection
    selectedMood = element.firstElementChild;
    selectedMood.classList.add('gradient-glow-ring', 'bounce-animation');
    // Remove bounce animation after it finishes
    setTimeout(() => {
        if(selectedMood) selectedMood.classList.remove('bounce-animation');
    }, 500);
  }
  function selectSymptom() {
      const recommendationCard = document.getElementById('recommendation-card');
      if (recommendationCard.classList.contains('hidden')) {
          recommendationCard.classList.remove('hidden');
      }
  }
</script>

</body></html>