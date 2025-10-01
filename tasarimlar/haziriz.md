<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Expo React Native Onboarding</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<style type="text/tailwindcss">
    @layer utilities {
      @keyframes pulse-glow {
        0%, 100% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(192, 132, 252, 0.4);
        }
        50% {
          transform: scale(1.02);
          box-shadow: 0 0 20px 10px rgba(192, 132, 252, 0);
        }
      }
      .animate-pulse-glow {
        animation: pulse-glow 2.5s infinite;
      }
      @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(15deg); }
        100% { transform: translateY(0px) rotate(0deg); }
      }
      .animate-float {
        animation: float 4s ease-in-out infinite;
      }
       @keyframes float-reverse {
        0% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(20px) rotate(-15deg); }
        100% { transform: translateY(0px) rotate(0deg); }
      }
      .animate-float-reverse {
        animation: float-reverse 5s ease-in-out infinite;
      }
      @keyframes lock-animation {
        0%, 100% { transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5)); }
        25% { transform: scale(1.05) rotate(5deg); }
        50% { transform: scale(1.1) rotate(-5deg); filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.8)); }
        75% { transform: scale(1.05) rotate(0deg); }
      }
      .animate-lock {
        animation: lock-animation 3s ease-in-out infinite;
      }
    }
  </style>
<script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            display: ["Fredoka", "sans-serif"],
          },
        },
      },
    };
  </script>
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
<body class="bg-gradient-to-br from-purple-200 to-pink-200 font-display text-gray-800">
<div class="flex flex-col min-h-screen">
<main class="flex-grow flex flex-col justify-center px-6 text-center relative overflow-hidden">
<span class="absolute top-1/4 left-10 text-4xl opacity-50 animate-float" style="animation-delay: 0s;">🌸</span>
<span class="absolute top-1/2 right-8 text-3xl opacity-50 animate-float-reverse" style="animation-delay: 1s;">✨</span>
<span class="absolute bottom-1/4 left-16 text-2xl opacity-50 animate-float" style="animation-delay: 2s;">🌸</span>
<span class="absolute top-20 right-20 text-3xl opacity-50 animate-float-reverse" style="animation-delay: 0.5s;">✨</span>
<div class="flex-grow flex items-center justify-center">
<div class="relative w-48 h-48 animate-lock">
<svg class="w-full h-full text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
<path clip-rule="evenodd" d="M10 2a4 4 0 00-4 4v2H4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2h-2V6a4 4 0 00-4-4zm-2 4V6a2 2 0 114 0v2H8z" fill-rule="evenodd"></path>
</svg>
<svg class="absolute w-12 h-12 text-pink-400" fill="currentColor" style="top: 55%; left: 50%; transform: translate(-50%, -50%);" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
<path clip-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" fill-rule="evenodd"></path>
</svg>
</div>
</div>
<div class="flex-shrink-0 pt-8 pb-4 z-10">
<h1 class="text-2xl font-semibold text-gray-900">Verilerin sende 🔒</h1>
<p class="mt-2 text-base text-gray-700 max-w-xs mx-auto">
        Tüm bilgiler cihazında güvende, kimseyle paylaşılmaz.
      </p>
</div>
</main>
<footer class="flex-shrink-0 p-6 space-y-4">
<div class="flex justify-center items-center space-x-2">
<div class="h-2 w-2 rounded-full bg-white/50"></div>
<div class="h-2 w-2 rounded-full bg-white/50"></div>
<div class="h-2 w-2 rounded-full bg-white"></div>
</div>
<button class="w-full bg-gradient-to-r from-pink-400 via-purple-400 to-purple-500 text-white font-bold h-14 rounded-full flex items-center justify-center text-lg shadow-lg animate-pulse-glow transition-all duration-300 transform">
<span>Başla 🌸</span>
</button>
</footer>
</div>

</body></html>