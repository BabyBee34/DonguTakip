<!DOCTYPE html>
<html lang="tr"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Stitch Design</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script>
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            primary: "#f04299",
            "background-light": "#f8f6f7",
            "background-dark": "#221019",
          },
          fontFamily: {
            display: ["Fredoka", "sans-serif"],
          },
          borderRadius: {
            DEFAULT: "1rem",
            lg: "2rem",
            xl: "3rem",
            full: "9999px"
          },
        },
      },
    };
  </script>
<style>
    .pulsing-heart {
      animation: pulse 2s infinite;
      filter: drop-shadow(0 0 1rem rgba(255, 105, 180, 0.5));
    }
    @keyframes pulse {
      0%,
      100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }
    .floating-emoji-1 {
      animation: float 4s ease-in-out infinite;
    }
    .floating-emoji-2 {
      animation: float 5s ease-in-out infinite 0.5s;
    }
    .floating-emoji-3 {
      animation: float 6s ease-in-out infinite 1s;
    }
    @keyframes float {
      0%,
      100% {
        transform: translateY(0) scale(1);
        opacity: 0.9;
      }
      50% {
        transform: translateY(-25px) scale(1.05);
        opacity: 1;
      }
    }
    body {
      background-image: linear-gradient(to bottom, #d4f2e9, #fde8ed);
    }
    .button-animation {
      animation: button-pulse 2s infinite;
    }
    @keyframes button-pulse {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(220, 100, 190, 0.4);
      }
      70% {
        transform: scale(1.02);
        box-shadow: 0 0 0 10px rgba(220, 100, 190, 0);
      }
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
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="font-display">
<div class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
<div class="flex flex-1 flex-col">
<header class="flex items-center justify-end p-4">
<button class="flex h-12 w-12 items-center justify-center rounded-full text-gray-500">
<svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
<path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
</svg>
</button>
</header>
<main class="flex flex-1 flex-col items-center px-6 pt-2 pb-8 text-center text-gray-800">
<h1 class="text-4xl font-semibold leading-tight tracking-tight">Kendine küçük hatırlatmalar 💕</h1>
<p class="mt-4 max-w-sm text-lg text-gray-600">Çikolata zamanı mı? Su içme vakti mi? Senin yanında olacağım.</p>
<div class="relative mt-12 flex flex-1 items-center justify-center">
<svg class="pulsing-heart h-64 w-64" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="heartGradient" x1="0%" x2="100%" y1="0%" y2="100%">
<stop offset="0%" stop-color="#FFB6C1"></stop>
<stop offset="100%" stop-color="#C8A2C8"></stop>
</linearGradient>
</defs>
<path d="M174.5,31.5 C155.5,12.5 128.5,12.5 109.5,31.5 L100,41 L90.5,31.5 C71.5,12.5 44.5,12.5 25.5,31.5 C6.5,50.5 6.5,77.5 25.5,96.5 L100,171 L174.5,96.5 C193.5,77.5 193.5,50.5 174.5,31.5 Z" fill="url(#heartGradient)"></path>
</svg>
<div class="floating-emoji-1 absolute text-4xl opacity-80" style="top: 15%; left: 10%; filter: saturate(0.5) brightness(1.2);">🍫</div>
<div class="floating-emoji-2 absolute text-4xl opacity-80" style="top: 50%; right: 5%; filter: saturate(0.5) brightness(1.2);">💧</div>
<div class="floating-emoji-3 absolute text-4xl opacity-80" style="bottom: 10%; left: 20%; filter: saturate(0.5) brightness(1.2);">🌙</div>
</div>
</main>
</div>
<div class="px-6 pb-6">
<button class="button-animation flex h-16 w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-lg font-bold text-white">
<span class="truncate">Devam Et 💕</span>
</button>
<div class="mt-4 flex w-full flex-row items-center justify-center gap-3">
<div class="h-2.5 w-2.5 rounded-full bg-gray-300"></div>
<div class="h-2.5 w-2.5 rounded-full bg-gray-500"></div>
<div class="h-2.5 w-2.5 rounded-full bg-gray-300"></div>
</div>
</div>
</div>
</body></html>