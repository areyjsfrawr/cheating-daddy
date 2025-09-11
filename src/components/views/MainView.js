import { html, css, LitElement } from '../../assets/lit-core-2.7.4.min.js';
import { resizeLayout } from '../../utils/windowResize.js';

export class MainView extends LitElement {
    static styles = css`
        * {
            font-family: var(--font-primary);
            cursor: default;
            user-select: none;
        }

        :host {
            height: 100%;
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            container-type: inline-size;
        }

        .liquid-glass-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            text-align: center;
            padding: var(--space-6);
            position: relative;
            overflow: hidden;
        }

        /* Animated Background Gradient */
        .liquid-glass-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at center, 
                var(--glass-primary) 0%, 
                transparent 70%);
            opacity: 0.3;
            animation: breathe 4s ease-in-out infinite alternate;
            pointer-events: none;
            z-index: 0;
        }

        @keyframes breathe {
            0% { transform: scale(1); opacity: 0.3; }
            100% { transform: scale(1.1); opacity: 0.1; }
        }

        .welcome-section {
            position: relative;
            z-index: 1;
            margin-bottom: var(--space-8);
            padding: var(--space-8) var(--space-6);
            background: var(--glass-primary);
            backdrop-filter: var(--glass-blur);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-2xl);
            box-shadow: var(--glass-shadow);
            
            /* Entrance Animation */
            animation: welcomeEnter var(--duration-slow) var(--ease-glass) forwards;
        }

        @keyframes welcomeEnter {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.95);
                filter: blur(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
                filter: blur(0);
            }
        }

        .welcome-title {
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
            
            /* Text Shadow for Depth */
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        @keyframes gradientFlow {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }

        .welcome-subtitle {
            font-size: var(--text-lg);
            color: var(--text-secondary);
            margin-bottom: var(--space-6);
            line-height: var(--leading-relaxed);
            font-weight: var(--font-medium);
            
            /* Subtle Animation */
            animation: subtitleFade var(--duration-slow) var(--ease-glass) forwards;
            animation-delay: 0.3s;
            opacity: 0;
        }

        @keyframes subtitleFade {
            to { opacity: 1; }
        }

        .api-section {
            position: relative;
            z-index: 1;
            width: 100%;
            margin-bottom: var(--space-8);
            
            /* Glass Container */
            background: var(--glass-primary);
            backdrop-filter: var(--glass-blur);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-xl);
            padding: var(--space-6);
            box-shadow: var(--glass-shadow);
            
            /* Entrance Animation */
            animation: apiSectionEnter var(--duration-slow) var(--ease-glass) forwards;
            animation-delay: 0.6s;
            opacity: 0;
        }

        @keyframes apiSectionEnter {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .input-group {
            display: flex;
            gap: var(--space-3);
            margin-bottom: var(--space-5);
        }

        .input-group .glass-api-input {
            flex: 1;
        }

        .glass-api-input {
            width: 100%;
            background: var(--glass-secondary);
            backdrop-filter: var(--glass-blur);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-lg);
            padding: var(--space-4) var(--space-5);
            
            color: var(--text-primary);
            font-family: var(--font-primary);
            font-size: var(--text-base);
            line-height: var(--leading-normal);
            
            transition: all var(--duration-normal) var(--ease-glass);
            transform: translateZ(0);
            will-change: transform, background, border-color, box-shadow;
        }

        .glass-api-input::placeholder {
            color: var(--text-tertiary);
            transition: color var(--duration-normal) var(--ease-smooth);
        }

        .glass-api-input:focus {
            outline: none;
            background: var(--glass-focus);
            border-color: var(--accent-primary);
            box-shadow: 
                var(--glass-glow-primary),
                0 0 0 3px rgba(0, 212, 255, 0.1);
            transform: translateY(-2px) translateZ(0);
        }

        .glass-api-input:focus::placeholder {
            color: var(--text-disabled);
        }

        /* Error State Animation */
        .glass-api-input.api-key-error {
            background: var(--glass-error);
            border-color: var(--accent-error);
            animation: shake var(--duration-normal) var(--ease-bounce);
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
            20%, 40%, 60%, 80% { transform: translateX(3px); }
        }

        .hero-start-button {
            /* Hero Glass Button */
            position: relative;
            width: 100%;
            background: linear-gradient(135deg, 
                var(--accent-primary) 0%, 
                var(--accent-secondary) 100%);
            backdrop-filter: var(--glass-blur);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: var(--radius-xl);
            padding: var(--space-5) var(--space-8);
            
            color: white;
            font-family: var(--font-primary);
            font-size: var(--text-lg);
            font-weight: var(--font-semibold);
            
            cursor: pointer;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: var(--space-2);
            
            /* Advanced Effects */
            box-shadow: 
                var(--glass-glow-primary),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
            
            transition: all var(--duration-normal) var(--ease-glass);
            transform: translateZ(0);
            will-change: transform, box-shadow, background;
        }

        /* Hero Button Shimmer Effect */
        .hero-start-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, 
                rgba(255, 255, 255, 0.1) 0%, 
                transparent 50%, 
                rgba(255, 255, 255, 0.1) 100%);
            opacity: 0;
            transition: opacity var(--duration-normal) var(--ease-smooth);
        }

        .hero-start-button:hover {
            background: linear-gradient(135deg, 
                var(--accent-primary-light) 0%, 
                var(--accent-secondary-light) 100%);
            transform: translateY(-3px) scale(1.02) translateZ(0);
            box-shadow: 
                0 12px 48px rgba(0, 212, 255, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .hero-start-button:hover::before {
            opacity: 1;
        }

        .hero-start-button:active {
            transform: translateY(-1px) scale(1.01) translateZ(0);
        }

        .hero-start-button.initializing {
            background: var(--glass-disabled);
            border-color: var(--glass-border-subtle);
            color: var(--text-disabled);
            cursor: wait;
            transform: none;
            box-shadow: none;
        }

        .hero-start-button.initializing::before {
            display: none;
        }

        .shortcut-icons {
            display: flex;
            align-items: center;
            gap: var(--space-1);
        }

        .shortcut-icons svg {
            width: 16px;
            height: 16px;
            opacity: 0.8;
        }

        .shortcut-icons svg path {
            stroke: currentColor;
        }

        .description {
            color: var(--text-secondary);
            font-size: var(--text-sm);
            margin-bottom: var(--space-6);
            line-height: var(--leading-relaxed);
            font-weight: var(--font-normal);
        }

        .glass-link {
            color: var(--accent-primary);
            text-decoration: none;
            cursor: pointer;
            font-weight: var(--font-medium);
            transition: color var(--duration-fast) var(--ease-smooth);
        }

        .glass-link:hover {
            color: var(--accent-primary-light);
            text-decoration: underline;
        }

        .shortcut-hint {
            color: var(--text-tertiary);
            font-size: var(--text-xs);
            opacity: 0.8;
            font-weight: var(--font-normal);
            margin-top: var(--space-2);
        }

        /* Responsive Design */
        @container (max-width: 480px) {
            .liquid-glass-container {
                padding: var(--space-4);
            }
            
            .welcome-section {
                padding: var(--space-6) var(--space-4);
                margin-bottom: var(--space-6);
            }
            
            .welcome-title {
                font-size: var(--text-3xl);
            }
            
            .welcome-subtitle {
                font-size: var(--text-base);
            }
            
            .api-section {
                padding: var(--space-4);
                margin-bottom: var(--space-6);
            }
            
            .input-group {
                flex-direction: column;
                gap: var(--space-2);
            }
            
            .hero-start-button {
                padding: var(--space-4) var(--space-6);
                font-size: var(--text-base);
            }
        }

        /* Performance Optimizations */
        .gpu-accelerated {
            transform: translateZ(0);
            will-change: transform, opacity, backdrop-filter;
        }
    `;

    static properties = {
        onStart: { type: Function },
        onAPIKeyHelp: { type: Function },
        isInitializing: { type: Boolean },
        onLayoutModeChange: { type: Function },
        showApiKeyError: { type: Boolean },
    };

    constructor() {
        super();
        this.onStart = () => {};
        this.onAPIKeyHelp = () => {};
        this.isInitializing = false;
        this.onLayoutModeChange = () => {};
        this.showApiKeyError = false;
        this.boundKeydownHandler = this.handleKeydown.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        window.electron?.ipcRenderer?.on('session-initializing', (event, isInitializing) => {
            this.isInitializing = isInitializing;
        });

        // Add keyboard event listener for Ctrl+Enter (or Cmd+Enter on Mac)
        document.addEventListener('keydown', this.boundKeydownHandler);

        // Load and apply layout mode on startup
        this.loadLayoutMode();
        // Resize window for this view
        resizeLayout();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.electron?.ipcRenderer?.removeAllListeners('session-initializing');
        // Remove keyboard event listener
        document.removeEventListener('keydown', this.boundKeydownHandler);
    }

    handleKeydown(e) {
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const isStartShortcut = isMac ? e.metaKey && e.key === 'Enter' : e.ctrlKey && e.key === 'Enter';

        if (isStartShortcut) {
            e.preventDefault();
            this.handleStartClick();
        }
    }

    handleInput(e) {
        localStorage.setItem('apiKey', e.target.value);
        // Clear error state when user starts typing
        if (this.showApiKeyError) {
            this.showApiKeyError = false;
        }
    }

    handleStartClick() {
        if (this.isInitializing) {
            return;
        }
        this.onStart();
    }

    handleAPIKeyHelpClick() {
        this.onAPIKeyHelp();
    }

    handleResetOnboarding() {
        localStorage.removeItem('onboardingCompleted');
        // Refresh the page to trigger onboarding
        window.location.reload();
    }

    loadLayoutMode() {
        const savedLayoutMode = localStorage.getItem('layoutMode');
        if (savedLayoutMode && savedLayoutMode !== 'normal') {
            // Notify parent component to apply the saved layout mode
            this.onLayoutModeChange(savedLayoutMode);
        }
    }

    // Method to trigger the red blink animation
    triggerApiKeyError() {
        this.showApiKeyError = true;
        // Remove the error class after 1 second
        setTimeout(() => {
            this.showApiKeyError = false;
        }, 1000);
    }

    getStartButtonText() {
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

        const cmdIcon = html`<svg width="14px" height="14px" viewBox="0 0 24 24" stroke-width="2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6V18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M15 6V18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path
                d="M9 6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9H18C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M9 18C9 19.6569 7.65685 21 6 21C4.34315 21 3 19.6569 3 18C3 16.3431 4.34315 15 6 15H18C19.6569 15 21 16.3431 21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
        </svg>`;

        const enterIcon = html`<svg width="14px" height="14px" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10.25 19.25L6.75 15.75L10.25 12.25"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
            <path
                d="M6.75 15.75H12.75C14.9591 15.75 16.75 13.9591 16.75 11.75V4.75"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></path>
        </svg>`;

        if (isMac) {
            return html`Start Session <span class="shortcut-icons">${cmdIcon}${enterIcon}</span>`;
        } else {
            return html`Start Session <span class="shortcut-icons">Ctrl${enterIcon}</span>`;
        }
    }

    render() {
        return html`
            <div class="liquid-glass-container gpu-accelerated">
                <!-- Welcome Section -->
                <div class="welcome-section">
                    <h1 class="welcome-title">Cheating Daddy</h1>
                    <p class="welcome-subtitle">
                        Your AI-powered assistant for real-time video calls and interviews
                    </p>
                </div>

                <!-- API Configuration Section -->
                <div class="api-section">
                    <div class="input-group">
                        <input
                            type="password"
                            placeholder="Enter your Gemini API Key"
                            .value=${localStorage.getItem('apiKey') || ''}
                            @input=${this.handleInput}
                            class="glass-api-input ${this.showApiKeyError ? 'api-key-error' : ''}"
                        />
                        <button 
                            @click=${this.handleStartClick} 
                            class="hero-start-button ${this.isInitializing ? 'initializing' : ''}"
                        >
                            ${this.getStartButtonText()}
                        </button>
                    </div>
                    
                    <p class="description">
                        Don't have an API key? 
                        <span @click=${this.handleAPIKeyHelpClick} class="glass-link">Get one here</span>
                    </p>
                    
                    <div class="shortcut-hint">
                        Press ${navigator.platform.toUpperCase().indexOf('MAC') >= 0 ? 'Cmd' : 'Ctrl'} + Enter to start quickly
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('main-view', MainView);
