<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Stitch Design</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@400;500;700;900&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
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
            background: linear-gradient(180deg, #f3e7ed, #fde9f2);
        }
        .dark body {
            background: linear-gradient(180deg, #3a2d34, #2a2125);
        }
        @keyframes drop-and-glow {
            0% {
                transform: translateY(-100%) scale(0.8);
                opacity: 0;
            }
            50% {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(0) scale(1.1);
                opacity: 1;
                filter: drop-shadow(0 0 15px rgba(240, 66, 153, 0.7));
            }
        }
        .animate-drop-glow {
            animation: drop-and-glow 2s ease-in-out forwards;
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
<body class="font-display bg-background-light dark:bg-background-dark">
<div class="relative flex h-full min-h-screen w-full flex-col justify-between overflow-x-hidden">
<div class="flex-grow pt-12">
<div class="flex flex-col items-center">
<div class="flex h-48 w-48 items-center justify-center">
<span class="text-9xl animate-drop-glow" style="font-size: 8rem; line-height: 1;">🌸</span>
</div>
<div class="px-6 text-center mt-8">
<h1 class="text-3xl font-bold text-background-dark dark:text-background-light">Adet süreni seç ⏳</h1>
<p class="mt-2 text-background-dark/70 dark:text-background-light/70">Genellikle adet günlerin kaç gün sürüyor? (Ortalama: 5 gün)</p>
</div>
<div class="w-full max-w-sm px-6 pt-12 pb-6">
<div class="relative flex items-center justify-center">
<input class="w-full h-2 bg-primary/20 dark:bg-primary/40 rounded-full appearance-none cursor-pointer thumb:bg-primary" max="10" min="3" style="--thumb-color: #f04299;" type="range" value="5"/>
<div class="absolute w-full flex justify-between px-1 text-sm text-background-dark/50 dark:text-background-light/50">
<span>3</span>
<span>4</span>
<span>5</span>
<span>6</span>
<span>7</span>
<span>8</span>
<span>9</span>
<span>10</span>
</div>
</div>
</div>
</div>
</div>
<div class="px-6 pb-8 pt-4">
<div class="flex w-full items-center justify-center gap-2 mb-4">
<div class="h-2 w-2 rounded-full bg-primary/20 dark:bg-primary/30"></div>
<div class="h-2.5 w-2.5 rounded-full bg-primary"></div>
<div class="h-2 w-2 rounded-full bg-primary/20 dark:bg-primary/30"></div>
</div>
<button class="w-full rounded-full bg-primary py-4 text-base font-bold text-white shadow-lg shadow-primary/30">
            Devam Et 🌸
        </button>
</div>
</div>

</body></html>