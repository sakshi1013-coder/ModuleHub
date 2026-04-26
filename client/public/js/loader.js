(function() {
    // Inject CSS
    const style = document.createElement('style');
    style.innerHTML = `
        /* ========== GLOBAL LOADER — REGISTRY THEME (LANDING PAGE MATCH) ========== */
        :root {
            /* Theme Colors from Tailwind Config */
            --theme-midnight: #013D5A;
            --theme-lionsmane: #FCF3E3;
            --theme-celeste: #BDD3CE;
            --theme-herb: #708C69;
            --theme-marigold: #F4A258;
            
            /* Loader Specifics */
            --loader-bg: rgba(1, 61, 90, 0.96); /* Deep midnight overlay */
            --core-color: var(--theme-marigold);
            --core-glow: rgba(244, 162, 88, 0.4);
            --node-color-1: var(--theme-herb);
            --node-color-2: var(--theme-celeste);
            --node-color-3: var(--theme-lionsmane);
            --progress-start: var(--theme-marigold);
            --progress-end: var(--theme-herb);
        }

        #global-loader-overlay {
            position: fixed;
            inset: 0;
            width: 100vw;
            height: 100vh;
            background: var(--loader-bg);
            backdrop-filter: blur(20px) saturate(160%);
            -webkit-backdrop-filter: blur(20px) saturate(160%);
            z-index: 99999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            overflow: hidden;
        }

        #global-loader-overlay.active {
            opacity: 1;
            pointer-events: all;
        }

        #global-loader-overlay *,
        #global-loader-overlay *::before,
        #global-loader-overlay *::after {
            box-sizing: border-box;
        }

        /* ── Ambient background grid (using Lionsmane for subtle texture) ── */
        .loader-grid-bg {
            position: absolute;
            inset: 0;
            background-image:
                linear-gradient(rgba(252, 243, 227, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(252, 243, 227, 0.05) 1px, transparent 1px);
            background-size: 50px 50px;
            animation: grid-drift 30s linear infinite;
        }

        @keyframes grid-drift {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
        }

        /* ── Floating particles (using theme accents) ── */
        .loader-particles {
            position: absolute;
            inset: 0;
            overflow: hidden;
        }

        .loader-particle {
            position: absolute;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            opacity: 0;
            animation: particle-float 5s infinite ease-in-out;
        }

        .loader-particle:nth-child(1) { left: 10%; top: 15%; animation-delay: 0s; background: var(--theme-marigold); }
        .loader-particle:nth-child(2) { left: 80%; top: 25%; animation-delay: 1s; background: var(--theme-herb); }
        .loader-particle:nth-child(3) { left: 35%; top: 75%; animation-delay: 2s; background: var(--theme-marigold); }
        .loader-particle:nth-child(4) { left: 90%; top: 55%; animation-delay: 3s; background: var(--theme-celeste); }
        .loader-particle:nth-child(5) { left: 20%; top: 80%; animation-delay: 0.5s; background: var(--theme-herb); }
        .loader-particle:nth-child(6) { left: 65%; top: 10%; animation-delay: 1.5s; background: var(--theme-marigold); }

        @keyframes particle-float {
            0%, 100% { opacity: 0; transform: translateY(0) scale(1); }
            50% { opacity: 0.5; transform: translateY(-40px) scale(1.4); }
        }

        /* ── Hub container ── */
        .loader-hub-container {
            position: relative;
            width: 180px;
            height: 180px;
            margin-bottom: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Outer ring */
        .loader-ring {
            position: absolute;
            inset: 0;
            border-radius: 50%;
            border: 1px solid rgba(252, 243, 227, 0.1);
            animation: ring-spin 12s linear infinite;
        }

        .loader-ring::before {
            content: '';
            position: absolute;
            top: -4px;
            left: 50%;
            transform: translateX(-50%);
            width: 8px;
            height: 8px;
            background: var(--theme-marigold);
            border-radius: 50%;
            box-shadow: 0 0 15px var(--theme-marigold);
        }

        @keyframes ring-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* ── Central Core (Registry Server) ── */
        .loader-core {
            width: 50px;
            height: 50px;
            background: var(--theme-midnight);
            border: 2px solid var(--theme-marigold);
            border-radius: 12px;
            box-shadow: 0 0 25px var(--core-glow), inset 0 0 10px rgba(244, 162, 88, 0.2);
            animation: core-breathe 2.5s infinite alternate ease-in-out;
            position: relative;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .loader-core-icon {
            width: 24px;
            height: 24px;
            display: flex;
            flex-direction: column;
            gap: 4px;
            justify-content: center;
        }

        .loader-core-icon span {
            display: block;
            height: 2px;
            background: var(--theme-marigold);
            border-radius: 1px;
        }

        .loader-core-icon span:nth-child(1) { width: 100%; animation: bar-pulse 1.5s 0s infinite; }
        .loader-core-icon span:nth-child(2) { width: 75%; animation: bar-pulse 1.5s 0.2s infinite; }
        .loader-core-icon span:nth-child(3) { width: 90%; animation: bar-pulse 1.5s 0.4s infinite; }

        @keyframes bar-pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
        }

        @keyframes core-breathe {
            0% { transform: scale(1); }
            100% { transform: scale(1.08); box-shadow: 0 0 35px var(--core-glow); }
        }

        /* ── Dependency nodes (Theme colored) ── */
        .loader-nodes {
            position: absolute;
            width: 100%;
            height: 100%;
        }

        .loader-node-arm {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 50%;
            height: 0;
            transform-origin: left center;
        }

        .loader-node-arm:nth-child(1) { transform: rotate(0deg); }
        .loader-node-arm:nth-child(2) { transform: rotate(60deg); }
        .loader-node-arm:nth-child(3) { transform: rotate(120deg); }
        .loader-node-arm:nth-child(4) { transform: rotate(180deg); }
        .loader-node-arm:nth-child(5) { transform: rotate(240deg); }
        .loader-node-arm:nth-child(6) { transform: rotate(300deg); }

        .loader-node-line {
            position: absolute;
            top: -1px;
            left: 30px;
            right: 18px;
            height: 1.5px;
            background: linear-gradient(90deg, var(--theme-marigold), transparent);
            opacity: 0;
            animation: line-trace 2.5s infinite ease-in-out;
        }

        @keyframes line-trace {
            0% { opacity: 0; clip-path: inset(0 100% 0 0); }
            40% { opacity: 0.6; clip-path: inset(0 0% 0 0); }
            100% { opacity: 0; clip-path: inset(0 0% 0 100%); }
        }

        .loader-node-dot {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%) scale(0.6);
            width: 16px;
            height: 16px;
            border-radius: 4px;
            border: 2px solid;
            opacity: 0.3;
            animation: node-activate 2.5s infinite ease-in-out;
        }

        .loader-node-arm:nth-child(1) .loader-node-dot { border-color: var(--theme-marigold); color: var(--theme-marigold); animation-delay: 0s; }
        .loader-node-arm:nth-child(2) .loader-node-dot { border-color: var(--theme-herb); color: var(--theme-herb); animation-delay: 0.4s; }
        .loader-node-arm:nth-child(3) .loader-node-dot { border-color: var(--theme-celeste); color: var(--theme-celeste); animation-delay: 0.8s; }
        .loader-node-arm:nth-child(4) .loader-node-dot { border-color: var(--theme-lionsmane); color: var(--theme-lionsmane); animation-delay: 1.2s; }
        .loader-node-arm:nth-child(5) .loader-node-dot { border-color: var(--theme-marigold); color: var(--theme-marigold); animation-delay: 1.6s; }
        .loader-node-arm:nth-child(6) .loader-node-dot { border-color: var(--theme-herb); color: var(--theme-herb); animation-delay: 2s; }

        @keyframes node-activate {
            0%, 100% { transform: translateY(-50%) scale(0.6); opacity: 0.2; box-shadow: none; }
            50% { transform: translateY(-50%) scale(1.1); opacity: 1; box-shadow: 0 0 15px currentColor; background: currentColor; }
        }

        /* ── Loader text ── */
        #loader-text {
            color: var(--theme-lionsmane);
            font-size: 1rem;
            font-weight: 500;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 30px;
            text-shadow: 0 0 10px rgba(252, 243, 227, 0.3);
            min-height: 24px;
            transition: opacity 0.3s ease;
        }

        /* ── Progress bar ── */
        .loader-progress-track {
            width: 280px;
            height: 4px;
            background: rgba(252, 243, 227, 0.08);
            border-radius: 10px;
            overflow: hidden;
            position: relative;
        }

        .loader-progress-fill {
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, var(--theme-marigold), var(--theme-herb));
            border-radius: 10px;
            box-shadow: 0 0 15px var(--theme-marigold);
            transition: width 0.3s ease-out;
            position: relative;
        }

        .loader-progress-fill::after {
            content: '';
            position: absolute;
            right: 0;
            top: -3px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: white;
            box-shadow: 0 0 12px var(--theme-marigold);
            opacity: 0;
            transition: opacity 0.3s;
        }

        #global-loader-overlay.active .loader-progress-fill::after {
            opacity: 1;
        }

        .loader-version {
            position: absolute;
            bottom: 32px;
            color: rgba(252, 243, 227, 0.15);
            font-size: 0.75rem;
            letter-spacing: 3px;
            text-transform: uppercase;
        }
    `;
    document.head.appendChild(style);

    // Build DOM
    const overlay = document.createElement('div');
    overlay.id = 'global-loader-overlay';
    overlay.innerHTML = `
        <div class="loader-grid-bg"></div>
        <div class="loader-particles">
            <div class="loader-particle"></div>
            <div class="loader-particle"></div>
            <div class="loader-particle"></div>
            <div class="loader-particle"></div>
            <div class="loader-particle"></div>
            <div class="loader-particle"></div>
        </div>
        <div class="loader-hub-container">
            <div class="loader-ring"></div>
            <div class="loader-nodes">
                <div class="loader-node-arm"><div class="loader-node-line"></div><div class="loader-node-dot"></div></div>
                <div class="loader-node-arm"><div class="loader-node-line"></div><div class="loader-node-dot"></div></div>
                <div class="loader-node-arm"><div class="loader-node-line"></div><div class="loader-node-dot"></div></div>
                <div class="loader-node-arm"><div class="loader-node-line"></div><div class="loader-node-dot"></div></div>
                <div class="loader-node-arm"><div class="loader-node-line"></div><div class="loader-node-dot"></div></div>
                <div class="loader-node-arm"><div class="loader-node-line"></div><div class="loader-node-dot"></div></div>
            </div>
            <div class="loader-core">
                <div class="loader-core-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
        <p id="loader-text">Connecting to registry...</p>
        <div class="loader-progress-track">
            <div class="loader-progress-fill" id="loader-progress"></div>
        </div>
        <span class="loader-version">modulehub v2.0 registry</span>
    `;

    if (document.body) {
        document.body.appendChild(overlay);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.appendChild(overlay);
        });
    }

    const messages = [
        "Connecting to registry...",
        "Fetching modules...",
        "Resolving dependencies...",
        "Building your workspace...",
        "Syncing packages...",
        "Verifying checksums..."
    ];

    let messageInterval = null;
    let progressInterval = null;
    let currentProgress = 0;
    let isLoaderActive = false;

    window.showLoader = function(customMessage) {
        if (isLoaderActive) return;
        isLoaderActive = true;

        const textEl = document.getElementById('loader-text');
        const progressEl = document.getElementById('loader-progress');
        if (!textEl || !progressEl) return;

        currentProgress = 0;
        progressEl.style.transition = 'none';
        progressEl.style.width = '0%';
        void progressEl.offsetWidth; // force reflow
        progressEl.style.transition = 'width 0.4s ease-out';

        overlay.classList.add('active');

        clearInterval(messageInterval);
        if (customMessage) {
            textEl.style.opacity = '0';
            setTimeout(() => {
                textEl.textContent = customMessage;
                textEl.style.opacity = '1';
            }, 150);
        } else {
            let msgIdx = 0;
            textEl.textContent = messages[msgIdx];
            textEl.style.opacity = '1';
            messageInterval = setInterval(() => {
                textEl.style.opacity = '0';
                setTimeout(() => {
                    if (!isLoaderActive) return;
                    msgIdx = (msgIdx + 1) % messages.length;
                    textEl.textContent = messages[msgIdx];
                    textEl.style.opacity = '1';
                }, 250);
            }, 1400);
        }

        clearInterval(progressInterval);
        progressInterval = setInterval(() => {
            if (currentProgress < 92) {
                const step = (92 - currentProgress) * 0.1;
                currentProgress += step;
                progressEl.style.width = currentProgress + '%';
            }
        }, 200);
    };

    window.hideLoader = function() {
        if (!isLoaderActive) return;
        isLoaderActive = false;

        clearInterval(messageInterval);
        clearInterval(progressInterval);

        const progressEl = document.getElementById('loader-progress');
        if (progressEl) {
            progressEl.style.transition = 'width 0.4s ease-out';
            progressEl.style.width = '100%';
        }

        setTimeout(() => {
            overlay.classList.remove('active');
            setTimeout(() => {
                if (progressEl) {
                    progressEl.style.transition = 'none';
                    progressEl.style.width = '0%';
                }
            }, 400);
        }, 400);
    };
})();
