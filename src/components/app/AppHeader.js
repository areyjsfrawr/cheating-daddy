import { html, css, LitElement } from '../../assets/lit-core-2.7.4.min.js';

export class AppHeader extends LitElement {
    static styles = css`
        * {
            font-family: var(--font-primary);
            cursor: default;
            user-select: none;
        }

        .glass-header {
            /* Glass Header Container */
            -webkit-app-region: drag;
            display: flex;
            align-items: center;
            padding: var(--header-padding);
            
            /* Glass Morphism */
            background: var(--glass-primary);
            backdrop-filter: var(--glass-blur);
            border: 1px solid var(--glass-border);
            border-radius: var(--border-radius);
            box-shadow: var(--glass-shadow-sm);
            
            /* Dynamic Blur Effect */
            transition: 
                backdrop-filter var(--duration-normal) var(--ease-smooth),
                background var(--duration-normal) var(--ease-smooth),
                box-shadow var(--duration-normal) var(--ease-smooth);
            
            /* GPU Acceleration */
            transform: translateZ(0);
            will-change: backdrop-filter, background;
        }

        .glass-header.scrolled {
            backdrop-filter: var(--glass-blur-strong);
            background: var(--glass-secondary);
            box-shadow: var(--glass-shadow);
        }

        .header-title {
            flex: 1;
            font-size: var(--header-font-size);
            font-weight: var(--font-semibold);
            color: var(--text-primary);
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
            -webkit-app-region: drag;
            
            /* Gradient Text Effect */
            background: linear-gradient(135deg, 
                var(--text-primary) 0%, 
                var(--accent-primary) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .header-actions {
            display: flex;
            gap: var(--header-gap);
            align-items: center;
            -webkit-app-region: no-drag;
        }

        .header-actions span {
            font-size: var(--header-font-size-small);
            color: var(--text-secondary);
            font-weight: var(--font-medium);
        }

        /* Glass Button Styles */
        .glass-button {
            /* Base Glass Button */
            position: relative;
            background: var(--glass-primary);
            backdrop-filter: var(--glass-blur-subtle);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-lg);
            padding: var(--header-button-padding);
            
            color: var(--text-primary);
            font-size: var(--header-font-size-small);
            font-weight: var(--font-medium);
            
            cursor: pointer;
            overflow: hidden;
            
            transition: all var(--duration-normal) var(--ease-glass);
            transform: translateZ(0);
            will-change: transform, background, border-color, box-shadow;
        }

        /* Glass Button Shimmer Effect */
        .glass-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(255, 255, 255, 0.1), 
                transparent);
            transition: left var(--duration-slow) var(--ease-smooth);
            pointer-events: none;
        }

        .glass-button:hover {
            background: var(--glass-hover);
            border-color: var(--accent-primary);
            box-shadow: var(--glass-glow-primary);
            transform: translateY(-1px) translateZ(0);
        }

        .glass-button:hover::before {
            left: 100%;
        }

        .glass-button:active {
            transform: translateY(0) scale(0.98) translateZ(0);
        }

        /* Glass Icon Button */
        .glass-icon-button {
            /* Circular Glass Icon Button */
            position: relative;
            width: 36px;
            height: 36px;
            background: var(--glass-primary);
            backdrop-filter: var(--glass-blur-subtle);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-full);
            padding: var(--header-icon-padding);
            
            color: var(--text-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            overflow: hidden;
            
            opacity: 0.8;
            transition: all var(--duration-normal) var(--ease-glass);
            transform: translateZ(0);
            will-change: transform, background, border-color, box-shadow, opacity;
        }

        .glass-icon-button svg {
            width: var(--icon-size);
            height: var(--icon-size);
            transition: transform var(--duration-normal) var(--ease-glass);
        }

        .glass-icon-button:hover {
            background: var(--glass-hover);
            border-color: var(--accent-primary);
            box-shadow: var(--glass-glow-primary);
            opacity: 1;
            transform: translateY(-1px) scale(1.05) translateZ(0);
        }

        .glass-icon-button:hover svg {
            transform: scale(1.1);
        }

        .glass-icon-button:active {
            transform: translateY(0) scale(1.02) translateZ(0);
        }

        /* Click-through State */
        :host([isclickthrough]) .glass-button:hover,
        :host([isclickthrough]) .glass-icon-button:hover {
            background: var(--glass-primary);
            border-color: var(--glass-border);
            box-shadow: none;
            transform: none;
        }

        /* Keyboard Shortcut Key */
        .glass-key {
            background: var(--glass-secondary);
            backdrop-filter: var(--glass-blur-subtle);
            border: 1px solid var(--glass-border-subtle);
            border-radius: var(--radius-sm);
            padding: var(--space-1) var(--space-2);
            
            font-size: var(--text-xs);
            font-weight: var(--font-medium);
            color: var(--text-secondary);
            font-family: var(--font-mono);
            
            box-shadow: 
                0 1px 2px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.1);
            
            transition: all var(--duration-fast) var(--ease-smooth);
        }

        .glass-key:hover {
            background: var(--glass-hover);
            color: var(--text-primary);
        }

        /* Status Indicators */
        .status-indicator {
            display: flex;
            align-items: center;
            gap: var(--space-2);
            padding: var(--space-2) var(--space-3);
            background: var(--glass-secondary);
            backdrop-filter: var(--glass-blur-subtle);
            border: 1px solid var(--glass-border-subtle);
            border-radius: var(--radius-lg);
        }

        .status-dot {
            width: 6px;
            height: 6px;
            background: var(--accent-success);
            border-radius: var(--radius-full);
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        /* Responsive Design */
        @container (max-width: 600px) {
            .glass-header {
                padding: var(--space-2) var(--space-3);
                gap: var(--space-2);
            }
            
            .header-title {
                font-size: var(--text-sm);
            }
            
            .glass-icon-button {
                width: 32px;
                height: 32px;
            }
            
            .glass-button {
                padding: var(--space-1) var(--space-2);
                font-size: var(--text-xs);
            }
        }

        /* Performance Optimizations */
        .gpu-accelerated {
            transform: translateZ(0);
            will-change: transform, opacity, backdrop-filter;
        }
    `;

    static properties = {
        currentView: { type: String },
        statusText: { type: String },
        startTime: { type: Number },
        onCustomizeClick: { type: Function },
        onHelpClick: { type: Function },
        onHistoryClick: { type: Function },
        onCloseClick: { type: Function },
        onBackClick: { type: Function },
        onHideToggleClick: { type: Function },
        isClickThrough: { type: Boolean, reflect: true },
        advancedMode: { type: Boolean },
        onAdvancedClick: { type: Function },
    };

    constructor() {
        super();
        this.currentView = 'main';
        this.statusText = '';
        this.startTime = null;
        this.onCustomizeClick = () => {};
        this.onHelpClick = () => {};
        this.onHistoryClick = () => {};
        this.onCloseClick = () => {};
        this.onBackClick = () => {};
        this.onHideToggleClick = () => {};
        this.isClickThrough = false;
        this.advancedMode = false;
        this.onAdvancedClick = () => {};
        this._timerInterval = null;
    }

    connectedCallback() {
        super.connectedCallback();
        this._startTimer();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._stopTimer();
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        // Start/stop timer based on view change
        if (changedProperties.has('currentView')) {
            if (this.currentView === 'assistant' && this.startTime) {
                this._startTimer();
            } else {
                this._stopTimer();
            }
        }

        // Start timer when startTime is set
        if (changedProperties.has('startTime')) {
            if (this.startTime && this.currentView === 'assistant') {
                this._startTimer();
            } else if (!this.startTime) {
                this._stopTimer();
            }
        }
    }

    _startTimer() {
        // Clear any existing timer
        this._stopTimer();

        // Only start timer if we're in assistant view and have a start time
        if (this.currentView === 'assistant' && this.startTime) {
            this._timerInterval = setInterval(() => {
                // Trigger a re-render by requesting an update
                this.requestUpdate();
            }, 1000); // Update every second
        }
    }

    _stopTimer() {
        if (this._timerInterval) {
            clearInterval(this._timerInterval);
            this._timerInterval = null;
        }
    }

    getViewTitle() {
        const titles = {
            onboarding: 'Welcome to Cheating Daddy',
            main: 'Cheating Daddy',
            customize: 'Customize',
            help: 'Help & Shortcuts',
            history: 'Conversation History',
            advanced: 'Advanced Tools',
            assistant: 'Cheating Daddy',
        };
        return titles[this.currentView] || 'Cheating Daddy';
    }

    getElapsedTime() {
        if (this.currentView === 'assistant' && this.startTime) {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            return `${elapsed}s`;
        }
        return '';
    }

    isNavigationView() {
        const navigationViews = ['customize', 'help', 'history', 'advanced'];
        return navigationViews.includes(this.currentView);
    }

    render() {
        const elapsedTime = this.getElapsedTime();

        return html`
            <div class="glass-header gpu-accelerated">
                <div class="header-title">${this.getViewTitle()}</div>
                <div class="header-actions">
                    ${this.currentView === 'assistant'
                        ? html`
                              <div class="status-indicator">
                                  <div class="status-dot"></div>
                                  <span>${elapsedTime}</span>
                              </div>
                              <div class="status-indicator">
                                  <span>${this.statusText}</span>
                              </div>
                          `
                        : ''}
                    ${this.currentView === 'main'
                        ? html`
                              <button class="glass-icon-button" @click=${this.onHistoryClick}>
                                  <?xml version="1.0" encoding="UTF-8"?><svg
                                      width="24px"
                                      height="24px"
                                      stroke-width="1.7"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      color="currentColor"
                                  >
                                      <path
                                          d="M12 21V7C12 5.89543 12.8954 5 14 5H21.4C21.7314 5 22 5.26863 22 5.6V18.7143"
                                          stroke="currentColor"
                                          stroke-width="1.7"
                                          stroke-linecap="round"
                                      ></path>
                                      <path
                                          d="M12 21V7C12 5.89543 11.1046 5 10 5H2.6C2.26863 5 2 5.26863 2 5.6V18.7143"
                                          stroke="currentColor"
                                          stroke-width="1.7"
                                          stroke-linecap="round"
                                      ></path>
                                      <path d="M14 19L22 19" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path>
                                      <path d="M10 19L2 19" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path>
                                      <path
                                          d="M12 21C12 19.8954 12.8954 19 14 19"
                                          stroke="currentColor"
                                          stroke-width="1.7"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                      ></path>
                                      <path
                                          d="M12 21C12 19.8954 11.1046 19 10 19"
                                          stroke="currentColor"
                                          stroke-width="1.7"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                      ></path>
                                  </svg>
                              </button>
                              ${this.advancedMode
                                  ? html`
                                        <button class="glass-icon-button" @click=${this.onAdvancedClick} title="Advanced Tools">
                                            <?xml version="1.0" encoding="UTF-8"?><svg
                                                width="24px"
                                                stroke-width="1.7"
                                                height="24px"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                color="currentColor"
                                            >
                                                <path d="M18.5 15L5.5 15" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"></path>
                                                <path
                                                    d="M16 4L8 4"
                                                    stroke="currentColor"
                                                    stroke-width="1.7"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                ></path>
                                                <path
                                                    d="M9 4.5L9 10.2602C9 10.7376 8.82922 11.1992 8.51851 11.5617L3.48149 17.4383C3.17078 17.8008 3 18.2624 3 18.7398V19C3 20.1046 3.89543 21 5 21L19 21C20.1046 21 21 20.1046 21 19V18.7398C21 18.2624 20.8292 17.8008 20.5185 17.4383L15.4815 11.5617C15.1708 11.1992 15 10.7376 15 10.2602L15 4.5"
                                                    stroke="currentColor"
                                                    stroke-width="1.7"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                ></path>
                                                <path
                                                    d="M12 9.01L12.01 8.99889"
                                                    stroke="currentColor"
                                                    stroke-width="1.7"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                ></path>
                                                <path
                                                    d="M11 2.01L11.01 1.99889"
                                                    stroke="currentColor"
                                                    stroke-width="1.7"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                ></path>
                                            </svg>
                                        </button>
                                    `
                                  : ''}
                              <button class="glass-icon-button" @click=${this.onCustomizeClick}>
                                  <?xml version="1.0" encoding="UTF-8"?><svg
                                      width="24px"
                                      height="24px"
                                      stroke-width="1.7"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      color="currentColor"
                                  >
                                      <path
                                          d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                          stroke="currentColor"
                                          stroke-width="1.7"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                      ></path>
                                      <path
                                          d="M19.6224 10.3954L18.5247 7.7448L20 6L18 4L16.2647 5.48295L13.5578 4.36974L12.9353 2H10.981L10.3491 4.40113L7.70441 5.51596L6 4L4 6L5.45337 7.78885L4.3725 10.4463L2 11V13L4.40111 13.6555L5.51575 16.2997L4 18L6 20L7.79116 18.5403L10.397 19.6123L11 22H13L13.6045 19.6132L16.2551 18.5155C16.6969 18.8313 18 20 18 20L20 18L18.5159 16.2494L19.6139 13.598L21.9999 12.9772L22 11L19.6224 10.3954Z"
                                          stroke="currentColor"
                                          stroke-width="1.7"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                      ></path>
                                  </svg>
                              </button>
                              <button class="glass-icon-button" @click=${this.onHelpClick}>
                                  <?xml version="1.0" encoding="UTF-8"?><svg
                                      width="24px"
                                      height="24px"
                                      stroke-width="1.7"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      color="currentColor"
                                  >
                                      <path
                                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                          stroke="currentColor"
                                          stroke-width="1.7"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                      ></path>
                                      <path
                                          d="M9 9C9 5.49997 14.5 5.5 14.5 9C14.5 11.5 12 10.9999 12 13.9999"
                                          stroke="currentColor"
                                          stroke-width="1.7"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                      ></path>
                                      <path
                                          d="M12 18.01L12.01 17.9989"
                                          stroke="currentColor"
                                          stroke-width="1.7"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                      ></path>
                                  </svg>
                              </button>
                          `
                        : ''}
                    ${this.currentView === 'assistant'
                        ? html`
                              <button @click=${this.onHideToggleClick} class="glass-button">
                                  Hide&nbsp;&nbsp;<span class="glass-key" style="pointer-events: none;">${cheddar.isMacOS ? 'Cmd' : 'Ctrl'}</span
                                  >&nbsp;&nbsp;<span class="glass-key">&bsol;</span>
                              </button>
                              <button @click=${this.onCloseClick} class="glass-icon-button window-close">
                                  <?xml version="1.0" encoding="UTF-8"?><svg
                                      width="24px"
                                      height="24px"
                                      stroke-width="1.7"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      color="currentColor"
                                  >
                                      <path
                                          d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
                                          stroke="currentColor"
                                          stroke-width="1.7"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                      ></path>
                                  </svg>
                              </button>
                          `
                        : html`
                              <button @click=${this.isNavigationView() ? this.onBackClick : this.onCloseClick} class="glass-icon-button window-close">
                                  <?xml version="1.0" encoding="UTF-8"?><svg
                                      width="24px"
                                      height="24px"
                                      stroke-width="1.7"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      color="currentColor"
                                  >
                                      <path
                                          d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
                                          stroke="currentColor"
                                          stroke-width="1.7"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                      ></path>
                                  </svg>
                              </button>
                          `}
                </div>
            </div>
        `;
    }
}

customElements.define('app-header', AppHeader);
