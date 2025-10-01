<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Stitch Design</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@400;500;700;900&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<style type="text/tailwindcss">
    @layer base {}
    @layer components {
      .number-picker-item {
        @apply flex h-14 w-14 cursor-pointer items-center justify-center rounded-full text-lg font-bold transition-all duration-300;
      }
    }
  </style>
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
            "display": ["Epilogue"]
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
<body class="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
<div class="flex flex-col h-screen p-6">
<div class="flex-grow flex flex-col items-center justify-center">
<div class="w-full max-w-sm text-center">
<h1 class="text-3xl font-bold text-gray-900 dark:text-white">Döngü süreni seç 🔄</h1>
<p class="mt-2 text-gray-600 dark:text-gray-400">Genellikle döngün kaç gün sürüyor? <br/> (Ortalama: 28 gün)</p>
</div>
<div class="flex flex-col items-center justify-center flex-grow">
<div class="relative w-64 h-64">
<svg class="animate-spin" style="animation-duration: 20s;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
<circle class="text-primary/20 dark:text-primary/30" cx="50" cy="50" fill="none" r="45" stroke="currentColor" stroke-width="2"></circle>
</svg>
<div class="absolute inset-0 flex items-center justify-center">
<span class="text-6xl font-bold text-primary">28</span>
</div>
</div>
<div class="w-full max-w-sm pt-8">
<input class="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer dark:bg-primary/30 [&amp;::-webkit-slider-thumb]:appearance-none [&amp;::-webkit-slider-thumb]:h-6 [&amp;::-webkit-slider-thumb]:w-6 [&amp;::-webkit-slider-thumb]:rounded-full [&amp;::-webkit-slider-thumb]:bg-primary" max="35" min="21" type="range" value="28"/>
<div class="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2 px-1">
<span>21</span>
<span>35</span>
</div>
</div>
</div>
</div>
<div class="w-full max-w-sm mx-auto pb-4">
<div class="flex w-full justify-center gap-2 mb-4">
<div class="h-2.5 w-2.5 rounded-full bg-primary/30 dark:bg-primary/40"></div>
<div class="h-2.5 w-2.5 rounded-full bg-primary/30 dark:bg-primary/40"></div>
<div class="h-2.5 w-2.5 rounded-full bg-primary"></div>
</div>
<button class="w-full bg-primary text-white font-bold py-4 px-4 rounded-full hover:bg-primary/90 transition duration-300">
        Başla 🌸
      </button>
</div>
</div>

</body></html>