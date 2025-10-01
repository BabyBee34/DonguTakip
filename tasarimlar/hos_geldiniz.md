<!DOCTYPE html>
<html lang="tr"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Expo React Native Onboarding</title>
<link crossorigin="" href="https://fonts.gstatic.com/" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;700&amp;family=Nunito:wght@400;700&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<style>
        body {
            font-family: 'Nunito', sans-serif;
            min-height: 100vh;
            min-height: 100dvh;
        }
        h1 {
            font-family: 'Fredoka', sans-serif;
        }
        .gradient-bg {
            background: linear-gradient(180deg, #FDE2F3 0%, #E9D5FF 100%);
        }
        .button-gradient {
             background: linear-gradient(180deg, #FBCFE8 0%, #C084FC 50%, #A855F7 100%);
        }
        @keyframes breath {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.03);
            }
        }
        .animate-breath {
            animation: breath 4s ease-in-out infinite;
        }
        @keyframes sparkle {
            0%, 100% {
                opacity: 0;
                transform: scale(0.5) translateY(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: scale(1.2) translateY(-25px) rotate(180deg);
            }
        }
        .sparkle {
            position: absolute;
            width: 12px;
            height: 12px;
            background-color: #FBBF24;
            border-radius: 50%;
            animation: sparkle 3.5s ease-in-out infinite;
            box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #f0f;
        }
        .sparkle-1 { top: 15%; left: 10%; animation-delay: 0s; background-color: #A7F3D0; }
        .sparkle-2 { top: 25%; right: 5%; animation-delay: 1.2s; }
        .sparkle-3 { bottom: 20%; left: 20%; animation-delay: 2.2s; background-color: #BFDBFE; }
        .sparkle-4 { bottom: 35%; right: 15%; animation-delay: 0.7s; background-color: #FBCFE8; }
        .sparkle-5 { top: 5%; right: 45%; animation-delay: 1.8s; background-color: #FDD2BF; }
        .sparkle-6 { bottom: 10%; left: 40%; animation-delay: 3s; background-color: #E9D5FF; }
        .cta-button {
            transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .cta-button:hover {
            transform: scale(1.05);
        }
        .cta-button:active {
            transform: scale(0.95);
        }
        @keyframes button-pulse {
            0%, 100% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.7);
            }
            70% {
                transform: scale(1.02);
                box-shadow: 0 0 0 15px rgba(168, 85, 247, 0);
            }
        }
        .animate-pulse-button {
            animation: button-pulse 2.5s infinite;
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
<body class="gradient-bg">
<div class="relative flex flex-col h-screen w-full items-center justify-center p-8 overflow-hidden">
<div class="flex-1 flex flex-col items-center justify-center text-center -mt-8">
<div class="relative w-80 h-80 sm:w-96 sm:h-96 mb-8">
<div class="sparkle sparkle-1"></div>
<div class="sparkle sparkle-2"></div>
<div class="sparkle sparkle-3"></div>
<div class="sparkle sparkle-4"></div>
<div class="sparkle sparkle-5"></div>
<div class="sparkle sparkle-6"></div>
<svg class="w-full h-full animate-breath" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
<defs>
<radialGradient cx="50%" cy="50%" fx="50%" fy="50%" id="petalGradient" r="50%">
<stop offset="0%" style="stop-color:#FBCFE8;stop-opacity:1"></stop>
<stop offset="100%" style="stop-color:#F472B6;stop-opacity:1"></stop>
</radialGradient>
</defs>
<g transform="translate(100,100)">
<path class="petal petal-1" d="M0 -80 C 40 -80, 40 -40, 0 0 C -40 -40, -40 -80, 0 -80" fill="url(#petalGradient)"></path>
<path class="petal petal-2" d="M0 -80 C 40 -80, 40 -40, 0 0 C -40 -40, -40 -80, 0 -80" fill="url(#petalGradient)" transform="rotate(60)"></path>
<path class="petal petal-3" d="M0 -80 C 40 -80, 40 -40, 0 0 C -40 -40, -40 -80, 0 -80" fill="url(#petalGradient)" transform="rotate(120)"></path>
<path class="petal petal-4" d="M0 -80 C 40 -80, 40 -40, 0 0 C -40 -40, -40 -80, 0 -80" fill="url(#petalGradient)" transform="rotate(180)"></path>
<path class="petal petal-5" d="M0 -80 C 40 -80, 40 -40, 0 0 C -40 -40, -40 -80, 0 -80" fill="url(#petalGradient)" transform="rotate(240)"></path>
<path class="petal petal-6" d="M0 -80 C 40 -80, 40 -40, 0 0 C -40 -40, -40 -80, 0 -80" fill="url(#petalGradient)" transform="rotate(300)"></path>
</g>
<circle cx="100" cy="100" fill="#FBBF24" r="25"></circle>
</svg>
</div>
<h1 class="text-4xl font-bold text-gray-800 leading-tight">Döngünü kolayca takip et</h1>
<p class="text-lg text-gray-600 mt-4 max-w-sm">Regl günlerini, ruh halini ve enerjini kaydet.</p>
</div>
<div class="w-full flex flex-col items-center pb-8">
<button class="cta-button w-full max-w-xs h-16 flex items-center justify-center rounded-full text-xl font-bold text-white button-gradient shadow-lg animate-pulse-button">
                Devam Et
                <span class="ml-2 text-2xl">🌸</span>
</button>
<div class="flex justify-center items-center gap-3 mt-6">
<div class="w-3 h-3 rounded-full bg-purple-500"></div>
<div class="w-3 h-3 rounded-full bg-purple-200"></div>
<div class="w-3 h-3 rounded-full bg-purple-200"></div>
</div>
</div>
</div>
</body></html>