import { html, css, LitElement } from '../../assets/lit-core-2.7.4.min.js';

export class OnboardingView extends LitElement {
    static styles = css`
        * {
            font-family: var(--font-primary);
            cursor: default;
            user-select: none;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :host {
            display: block;
            height: 100%;
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            overflow: hidden;
            z-index: 1000;
        }

        .liquid-glass-onboarding-container {
            position: relative;
            width: 100%;
            height: 100%;
            background: var(--background-primary);
            overflow: hidden;
            
            /* Animated Background */
            background-image: 
                radial-gradient(circle at 20% 80%, var(--accent-primary) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, var(--accent-secondary) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, var(--accent-tertiary) 0%, transparent 50%);
            background-size: 100% 100%, 100% 100%, 100% 100%;
            animation: onboardingBackgroundFlow 12s ease-in-out infinite alternate;
        }

        @keyframes onboardingBackgroundFlow {
            0% { 
                background-position: 0% 0%, 100% 100%, 50% 50%;
                filter: hue-rotate(0deg);
            }
            50% { 
                background-position: 100% 100%, 0% 0%, 25% 75%;
                filter: hue-rotate(30deg);
            }
            100% { 
                background-position: 50% 50%, 50% 50%, 75% 25%;
                filter: hue-rotate(0deg);
            }
        }

        /* Floating Particles */
        .floating-particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        }

        .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--accent-primary);
            border-radius: var(--radius-full);
            opacity: 0.6;
            animation: particleFloat 8s ease-in-out infinite;
        }

        .particle:nth-child(2n) {
            background: var(--accent-secondary);
            animation-delay: -2s;
            animation-duration: 10s;
        }

        .particle:nth-child(3n) {
            background: var(--accent-tertiary);
            animation-delay: -4s;
            animation-duration: 12s;
        }

        @keyframes particleFloat {
            0%, 100% { 
                transform: translateY(0) translateX(0) scale(1);
                opacity: 0.6;
            }
            25% { 
                transform: translateY(-20px) translateX(10px) scale(1.2);
                opacity: 1;
            }
            50% { 
                transform: translateY(-40px) translateX(-5px) scale(0.8);
                opacity: 0.4;
            }
            75% { 
                transform: translateY(-20px) translateX(-10px) scale(1.1);
                opacity: 0.8;
            }
        }

        .glass-content-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 60px;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: var(--space-8);
        }

        /* Glass Slide Container */
        .glass-slide-container {
            position: relative;
            max-width: 800px;
            width: 100%;
            
            /* Glass Morphism */
            background: var(--glass-primary);
            backdrop-filter: var(--glass-blur-strong);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-3xl);
            padding: var(--space-12);
            box-shadow: var(--glass-shadow-xl);
            
            /* Entrance Animation */
            animation: slideEnter var(--duration-slow) var(--ease-glass) forwards;
            transform: translateZ(0);
            will-change: transform, opacity, backdrop-filter;
        }

        @keyframes slideEnter {
            from {
                opacity: 0;
                transform: translateY(50px) scale(0.9);
                filter: blur(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
                filter: blur(0);
            }
        }

        /* Slide Content */
        .glass-slide {
            text-align: center;
            position: relative;
        }

        .slide-icon {
            font-size: var(--text-8xl);
            margin-bottom: var(--space-6);
            
            /* Gradient Icon */
            background: linear-gradient(135deg, 
                var(--accent-primary) 0%, 
                var(--accent-secondary) 50%, 
                var(--accent-tertiary) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            
            animation: iconPulse 3s ease-in-out infinite;
        }

        @keyframes iconPulse {
            0%, 100% { 
                transform: scale(1);
                filter: drop-shadow(0 0 20px var(--accent-primary));
            }
            50% { 
                transform: scale(1.1);
                filter: drop-shadow(0 0 40px var(--accent-secondary));
            }
        }

        .slide-title {
            font-size: var(--text-4xl);
            font-weight: var(--font-bold);
            margin-bottom: var(--space-4);
            
            /* Animated Gradient Text */
            background: linear-gradient(135deg, 
                var(--text-primary) 0%, 
                var(--accent-primary) 25%, 
                var(--accent-secondary) 50%, 
                var(--accent-tertiary) 75%, 
                var(--text-primary) 100%);
            background-size: 300% 300%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradientFlow 4s ease-in-out infinite;
        }

        @keyframes gradientFlow {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }

        .slide-description {
            font-size: var(--text-lg);
            color: var(--text-secondary);
            line-height: var(--leading-relaxed);
            margin-bottom: var(--space-8);
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        /* Glass Progress Indicator */
        .glass-progress-container {
            position: absolute;
            bottom: var(--space-6);
            left: 50%;
            transform: translateX(-50%);
            z-index: 3;
            
            display: flex;
            align-items: center;
            gap: var(--space-4);
            
            /* Glass Container */
            background: var(--glass-secondary);
            backdrop-filter: var(--glass-blur);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-2xl);
            padding: var(--space-4) var(--space-6);
            box-shadow: var(--glass-shadow);
        }

        .progress-dots {
            display: flex;
            gap: var(--space-2);
        }

        .progress-dot {
            width: 12px;
            height: 12px;
            border-radius: var(--radius-full);
            background: var(--glass-border);
            transition: all var(--duration-normal) var(--ease-glass);
            cursor: pointer;
        }

        .progress-dot.active {
            background: linear-gradient(135deg, 
                var(--accent-primary) 0%, 
                var(--accent-secondary) 100%);
            box-shadow: var(--glass-glow-primary);
            transform: scale(1.2);
        }

        .progress-dot:hover {
            background: var(--accent-primary);
            transform: scale(1.1);
        }

        /* Glass Navigation Buttons */
        .glass-nav-buttons {
            display: flex;
            gap: var(--space-4);
        }

        .glass-nav-button {
            /* Circular Glass Button */
            width: 48px;
            height: 48px;
            border-radius: var(--radius-full);
            background: var(--glass-primary);
            backdrop-filter: var(--glass-blur);
            border: 1px solid var(--glass-border);
            
            color: var(--text-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            
            transition: all var(--duration-normal) var(--ease-glass);
            transform: translateZ(0);
            will-change: transform, background, border-color, box-shadow;
        }

        .glass-nav-button:hover {
            background: var(--glass-hover);
            border-color: var(--accent-primary);
            box-shadow: var(--glass-glow-primary);
            transform: translateY(-2px) scale(1.05) translateZ(0);
        }

        .glass-nav-button:active {
            transform: translateY(0) scale(1.02) translateZ(0);
        }

        .glass-nav-button:disabled {
            background: var(--glass-disabled);
            border-color: var(--glass-border-subtle);
            color: var(--text-disabled);
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }

        .glass-nav-button.primary {
            background: linear-gradient(135deg, 
                var(--accent-primary) 0%, 
                var(--accent-secondary) 100%);
            color: white;
            border-color: rgba(255, 255, 255, 0.2);
        }

        .glass-nav-button.primary:hover {
            background: linear-gradient(135deg, 
                var(--accent-primary-light) 0%, 
                var(--accent-secondary-light) 100%);
            box-shadow: 0 8px 32px rgba(0, 212, 255, 0.4);
        }

        /* Skip Button */
        .glass-skip-button {
            position: absolute;
            top: var(--space-6);
            right: var(--space-6);
            z-index: 4;
            
            background: var(--glass-secondary);
            backdrop-filter: var(--glass-blur);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-lg);
            padding: var(--space-2) var(--space-4);
            
            color: var(--text-secondary);
            font-family: var(--font-primary);
            font-size: var(--text-sm);
            font-weight: var(--font-medium);
            
            cursor: pointer;
            transition: all var(--duration-normal) var(--ease-glass);
        }

        .glass-skip-button:hover {
            background: var(--glass-hover);
            border-color: var(--accent-primary);
            color: var(--text-primary);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .glass-content-wrapper {
                padding: var(--space-4);
            }
            
            .glass-slide-container {
                padding: var(--space-8);
            }
            
            .slide-icon {
                font-size: var(--text-6xl);
            }
            
            .slide-title {
                font-size: var(--text-3xl);
            }
            
            .slide-description {
                font-size: var(--text-base);
            }
        }

        @media (max-width: 480px) {
            .glass-slide-container {
                padding: var(--space-6);
            }
            
            .slide-icon {
                font-size: var(--text-5xl);
            }
            
            .slide-title {
                font-size: var(--text-2xl);
            }
            
            .glass-progress-container {
                bottom: var(--space-4);
                padding: var(--space-3) var(--space-4);
            }
        }

        /* Performance Optimizations */
        .gpu-accelerated {
            transform: translateZ(0);
            will-change: transform, opacity, backdrop-filter;
        }
            flex-direction: column;
            justify-content: center;
            padding: 32px 48px;
            max-width: 500px;
            color: #e5e5e5;
            overflow: hidden;
        }

        .slide-icon {
            width: 48px;
            height: 48px;
            margin-bottom: 16px;
            opacity: 0.9;
            display: block;
        }

        .slide-title {
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 12px;
            color: #ffffff;
            line-height: 1.3;
        }

        .slide-content {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 24px;
            color: #b8b8b8;
            font-weight: 400;
        }

        .context-textarea {
            width: 100%;
            height: 100px;
            padding: 16px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.05);
            color: #e5e5e5;
            font-size: 14px;
            font-family: inherit;
            resize: vertical;
            transition: all 0.2s ease;
            margin-bottom: 24px;
        }

        .context-textarea::placeholder {
            color: rgba(255, 255, 255, 0.4);
            font-size: 14px;
        }

        .context-textarea:focus {
            outline: none;
            border-color: rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.08);
        }

        .feature-list {
            max-width: 100%;
        }

        .feature-item {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            font-size: 15px;
            color: #b8b8b8;
        }

        .feature-icon {
            font-size: 16px;
            margin-right: 12px;
            opacity: 0.8;
        }

        .navigation {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 24px;
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            height: 60px;
            box-sizing: border-box;
        }

        .nav-button {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #e5e5e5;
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 36px;
            min-height: 36px;
        }

        .nav-button:hover {
            background: rgba(255, 255, 255, 0.12);
            border-color: rgba(255, 255, 255, 0.2);
        }

        .nav-button:active {
            transform: scale(0.98);
        }

        .nav-button:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }

        .nav-button:disabled:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 255, 255, 0.1);
            transform: none;
        }

        .progress-dots {
            display: flex;
            gap: 12px;
            align-items: center;
        }

        .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            transition: all 0.2s ease;
            cursor: pointer;
        }

        .dot:hover {
            background: rgba(255, 255, 255, 0.4);
        }

        .dot.active {
            background: rgba(255, 255, 255, 0.8);
            transform: scale(1.2);
        }
    `;

    static properties = {
        currentSlide: { type: Number },
        contextText: { type: String },
        onComplete: { type: Function },
        onClose: { type: Function },
    };

    constructor() {
        super();
        this.currentSlide = 0;
        this.contextText = '';
        this.onComplete = () => {};
        this.onClose = () => {};
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;

        // Transition properties
        this.isTransitioning = false;
        this.transitionStartTime = 0;
        this.transitionDuration = 800; // 800ms fade duration
        this.previousColorScheme = null;

        // Subtle dark color schemes for each slide
        this.colorSchemes = [
            // Slide 1 - Welcome (Very dark purple/gray)
            [
                [25, 25, 35], // Dark gray-purple
                [20, 20, 30], // Darker gray
                [30, 25, 40], // Slightly purple
                [15, 15, 25], // Very dark
                [35, 30, 45], // Muted purple
                [10, 10, 20], // Almost black
            ],
            // Slide 2 - Privacy (Dark blue-gray)
            [
                [20, 25, 35], // Dark blue-gray
                [15, 20, 30], // Darker blue-gray
                [25, 30, 40], // Slightly blue
                [10, 15, 25], // Very dark blue
                [30, 35, 45], // Muted blue
                [5, 10, 20], // Almost black
            ],
            // Slide 3 - Context (Dark neutral)
            [
                [25, 25, 25], // Neutral dark
                [20, 20, 20], // Darker neutral
                [30, 30, 30], // Light dark
                [15, 15, 15], // Very dark
                [35, 35, 35], // Lighter dark
                [10, 10, 10], // Almost black
            ],
            // Slide 4 - Features (Dark green-gray)
            [
                [20, 30, 25], // Dark green-gray
                [15, 25, 20], // Darker green-gray
                [25, 35, 30], // Slightly green
                [10, 20, 15], // Very dark green
                [30, 40, 35], // Muted green
                [5, 15, 10], // Almost black
            ],
            // Slide 5 - Complete (Dark warm gray)
            [
                [30, 25, 20], // Dark warm gray
                [25, 20, 15], // Darker warm
                [35, 30, 25], // Slightly warm
                [20, 15, 10], // Very dark warm
                [40, 35, 30], // Muted warm
                [15, 10, 5], // Almost black
            ],
        ];
    }

    firstUpdated() {
        this.canvas = this.shadowRoot.querySelector('.gradient-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.startGradientAnimation();

        window.addEventListener('resize', () => this.resizeCanvas());
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        window.removeEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        if (!this.canvas) return;

        const rect = this.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    startGradientAnimation() {
        if (!this.ctx) return;

        const animate = timestamp => {
            this.drawGradient(timestamp);
            this.animationId = requestAnimationFrame(animate);
        };

        animate(0);
    }

    drawGradient(timestamp) {
        if (!this.ctx || !this.canvas) return;

        const { width, height } = this.canvas;
        let colors = this.colorSchemes[this.currentSlide];

        // Handle color scheme transitions
        if (this.isTransitioning && this.previousColorScheme) {
            const elapsed = timestamp - this.transitionStartTime;
            const progress = Math.min(elapsed / this.transitionDuration, 1);

            // Use easing function for smoother transition
            const easedProgress = this.easeInOutCubic(progress);

            colors = this.interpolateColorSchemes(this.previousColorScheme, this.colorSchemes[this.currentSlide], easedProgress);

            // End transition when complete
            if (progress >= 1) {
                this.isTransitioning = false;
                this.previousColorScheme = null;
            }
        }

        const time = timestamp * 0.0005; // Much slower animation

        // Create moving gradient with subtle flow
        const flowX = Math.sin(time * 0.7) * width * 0.3;
        const flowY = Math.cos(time * 0.5) * height * 0.2;

        const gradient = this.ctx.createLinearGradient(flowX, flowY, width + flowX * 0.5, height + flowY * 0.5);

        // Very subtle color variations with movement
        colors.forEach((color, index) => {
            const offset = index / (colors.length - 1);
            const wave = Math.sin(time + index * 0.3) * 0.05; // Very subtle wave

            const r = Math.max(0, Math.min(255, color[0] + wave * 5));
            const g = Math.max(0, Math.min(255, color[1] + wave * 5));
            const b = Math.max(0, Math.min(255, color[2] + wave * 5));

            gradient.addColorStop(offset, `rgb(${r}, ${g}, ${b})`);
        });

        // Fill with moving gradient
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);

        // Add a second layer with radial gradient for more depth
        const centerX = width * 0.5 + Math.sin(time * 0.3) * width * 0.15;
        const centerY = height * 0.5 + Math.cos(time * 0.4) * height * 0.1;
        const radius = Math.max(width, height) * 0.8;

        const radialGradient = this.ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);

        // Very subtle radial overlay
        radialGradient.addColorStop(0, `rgba(${colors[0][0] + 10}, ${colors[0][1] + 10}, ${colors[0][2] + 10}, 0.1)`);
        radialGradient.addColorStop(0.5, `rgba(${colors[2][0]}, ${colors[2][1]}, ${colors[2][2]}, 0.05)`);
        radialGradient.addColorStop(
            1,
            `rgba(${colors[colors.length - 1][0]}, ${colors[colors.length - 1][1]}, ${colors[colors.length - 1][2]}, 0.03)`
        );

        this.ctx.globalCompositeOperation = 'overlay';
        this.ctx.fillStyle = radialGradient;
        this.ctx.fillRect(0, 0, width, height);
        this.ctx.globalCompositeOperation = 'source-over';
    }

    nextSlide() {
        if (this.currentSlide < 4) {
            this.startColorTransition(this.currentSlide + 1);
        } else {
            this.completeOnboarding();
        }
    }

    prevSlide() {
        if (this.currentSlide > 0) {
            this.startColorTransition(this.currentSlide - 1);
        }
    }

    startColorTransition(newSlide) {
        this.previousColorScheme = [...this.colorSchemes[this.currentSlide]];
        this.currentSlide = newSlide;
        this.isTransitioning = true;
        this.transitionStartTime = performance.now();
    }

    // Interpolate between two color schemes
    interpolateColorSchemes(scheme1, scheme2, progress) {
        return scheme1.map((color1, index) => {
            const color2 = scheme2[index];
            return [
                color1[0] + (color2[0] - color1[0]) * progress,
                color1[1] + (color2[1] - color1[1]) * progress,
                color1[2] + (color2[2] - color1[2]) * progress,
            ];
        });
    }

    // Easing function for smooth transitions
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    handleContextInput(e) {
        this.contextText = e.target.value;
    }

    completeOnboarding() {
        if (this.contextText.trim()) {
            localStorage.setItem('customPrompt', this.contextText.trim());
        }
        localStorage.setItem('onboardingCompleted', 'true');
        this.onComplete();
    }

    getSlideContent() {
        const slides = [
            {
                icon: 'assets/onboarding/welcome.svg',
                title: 'Welcome to Cheating Daddy',
                content:
                    'Your AI assistant that listens and watches, then provides intelligent suggestions automatically during interviews and meetings.',
            },
            {
                icon: 'assets/onboarding/security.svg',
                title: 'Completely Private',
                content: 'Invisible to screen sharing apps and recording software. Your secret advantage stays completely hidden from others.',
            },
            {
                icon: 'assets/onboarding/context.svg',
                title: 'Add Your Context',
                content: 'Share relevant information to help the AI provide better, more personalized assistance.',
                showTextarea: true,
            },
            {
                icon: 'assets/onboarding/customize.svg',
                title: 'Additional Features',
                content: '',
                showFeatures: true,
            },
            {
                icon: 'assets/onboarding/ready.svg',
                title: 'Ready to Go',
                content: 'Add your Gemini API key in settings and start getting AI-powered assistance in real-time.',
            },
        ];

        return slides[this.currentSlide];
    }

    render() {
        const slide = this.getSlideContent();

        return html`
            <div class="liquid-glass-onboarding-container gpu-accelerated">
                <!-- Floating Particles -->
                <div class="floating-particles">
                    ${Array.from({ length: 20 }, (_, i) => html`
                        <div class="particle" style="
                            left: ${Math.random() * 100}%; 
                            top: ${Math.random() * 100}%;
                            animation-delay: ${Math.random() * 8}s;
                        "></div>
                    `)}
                </div>

                <!-- Skip Button -->
                <button class="glass-skip-button" @click=${this.handleSkip}>
                    Skip Tutorial
                </button>

                <!-- Main Content -->
                <div class="glass-content-wrapper">
                    <div class="glass-slide-container">
                        <div class="glass-slide">
                            <div class="slide-icon">${slide.icon}</div>
                            <h1 class="slide-title">${slide.title}</h1>
                            <p class="slide-description">${slide.content}</p>

                            ${slide.showTextarea ? html`
                                <textarea
                                    class="glass-textarea"
                                    placeholder="Paste your resume, job description, or any relevant context here..."
                                    .value=${this.contextText}
                                    @input=${this.handleContextInput}
                                    rows="6"
                                    style="width: 100%; margin-bottom: var(--space-6);"
                                ></textarea>
                            ` : ''}

                            ${slide.showFeatures ? html`
                                <div class="feature-list" style="
                                    display: grid; 
                                    gap: var(--space-4); 
                                    margin-bottom: var(--space-6);
                                    text-align: left;
                                ">
                                    <div class="glass-feature-item" style="
                                        display: flex; 
                                        align-items: center; 
                                        gap: var(--space-3);
                                        padding: var(--space-4);
                                        background: var(--glass-secondary);
                                        border: 1px solid var(--glass-border);
                                        border-radius: var(--radius-lg);
                                    ">
                                        <span style="font-size: var(--text-2xl);">🎨</span>
                                        <span style="color: var(--text-primary);">Customize AI behavior and responses</span>
                                    </div>
                                    <div class="glass-feature-item" style="
                                        display: flex; 
                                        align-items: center; 
                                        gap: var(--space-3);
                                        padding: var(--space-4);
                                        background: var(--glass-secondary);
                                        border: 1px solid var(--glass-border);
                                        border-radius: var(--radius-lg);
                                    ">
                                        <span style="font-size: var(--text-2xl);">📚</span>
                                        <span style="color: var(--text-primary);">Review conversation history</span>
                                    </div>
                                    <div class="glass-feature-item" style="
                                        display: flex; 
                                        align-items: center; 
                                        gap: var(--space-3);
                                        padding: var(--space-4);
                                        background: var(--glass-secondary);
                                        border: 1px solid var(--glass-border);
                                        border-radius: var(--radius-lg);
                                    ">
                                        <span style="font-size: var(--text-2xl);">🔧</span>
                                        <span style="color: var(--text-primary);">Adjust capture settings and intervals</span>
                                    </div>
                                </div>
                            `
                        : ''}
                        </div>
                    </div>
                </div>

                <!-- Glass Progress and Navigation -->
                <div class="glass-progress-container">
                    <button 
                        class="glass-nav-button" 
                        @click=${this.prevSlide} 
                        ?disabled=${this.currentSlide === 0}
                        title="Previous slide"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M15 6L9 12L15 18"/>
                        </svg>
                    </button>

                    <div class="progress-dots">
                        ${[0, 1, 2, 3, 4].map(
                            index => html`
                                <div
                                    class="progress-dot ${index === this.currentSlide ? 'active' : ''}"
                                    @click=${() => {
                                        if (index !== this.currentSlide) {
                                            this.startColorTransition(index);
                                        }
                                    }}
                                    title="Go to slide ${index + 1}"
                                ></div>
                            `
                        )}
                    </div>

                    <button 
                        class="glass-nav-button ${this.currentSlide === 4 ? 'primary' : ''}" 
                        @click=${this.nextSlide}
                        title="${this.currentSlide === 4 ? 'Complete onboarding' : 'Next slide'}"
                    >
                        ${this.currentSlide === 4 ? html`
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 6L9 17L4 12"/>
                            </svg>
                        ` : html`
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 6L15 12L9 18"/>
                            </svg>
                        `}
                    </button>
                </div>
            </div>
        `;
    }
}

customElements.define('onboarding-view', OnboardingView);
