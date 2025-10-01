<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Period Tracker Setup</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@400;500;700;800&amp;display=swap" rel="stylesheet"/>
<script>
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#f04299",
                        "background-light": "#f8f6f7",
                        "background-dark": "#221019",
                    },
                    fontFamily: {
                        "display": ["Epilogue", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "1rem",
                        "lg": "2rem",
                        "xl": "3rem",
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
<style>
        @keyframes sway {
            0%, 100% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
        }
        .animate-sway {
            animation: sway 2.5s ease-in-out infinite;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
<div class="relative flex flex-col min-h-screen w-full bg-gradient-to-b from-[#fde8f2] to-[#e6e6fa] dark:from-[#2e1a26] dark:to-[#2a2a3e]">
<main class="flex-grow flex flex-col items-center justify-center p-6 text-center">
<div class="relative mb-8">
<svg class="w-28 h-28 text-primary/30 dark:text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg>
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl animate-sway origin-bottom">🌸</div>
</div>
<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Son adet başlangıcını seç 🌸</h1>
<p class="text-gray-600 dark:text-gray-300 max-w-sm">Döngünü hesaplayabilmem için son adetinin başladığı günü seç.</p>
<div class="w-full max-w-sm mt-8">
<label class="relative flex items-center">
<input class="form-input w-full h-14 pl-4 pr-12 bg-background-light/80 dark:bg-background-dark/80 border-2 border-primary/20 dark:border-primary/30 focus:border-primary focus:ring-primary/50 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 appearance-none" placeholder="Tarih seç" type="date"/>
<div class="absolute right-4 text-primary">
<svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM48,48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48ZM208,208H48V96H208V208Z"></path>
</svg>
</div>
</label>
</div>
</main>
<footer class="p-6">
<div class="flex items-center justify-center gap-2 mb-4">
<div class="w-2.5 h-2.5 rounded-full bg-primary"></div>
<div class="w-2.5 h-2.5 rounded-full bg-primary/20 dark:bg-primary/30"></div>
<div class="w-2.5 h-2.5 rounded-full bg-primary/20 dark:bg-primary/30"></div>
</div>
<button class="w-full h-14 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                Devam Et 🌸
            </button>
</footer>
</div>

</body></html>