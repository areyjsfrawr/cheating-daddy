import { html, css, LitElement } from '../../assets/lit-core-2.7.4.min.js';
import { resizeLayout } from '../../utils/windowResize.js';

export class HelpView extends LitElement {
    static styles = css`
        * {
            font-family: var(--font-primary);
            cursor: default;
            user-select: none;
        }

        :host {
            display: block;
            padding: var(--space-6);
            max-width: 1000px;
            margin: 0 auto;
            container-type: inline-size;
        }

        .liquid-glass-help-container {
            display: grid;
            gap: var(--space-6);
            padding-bottom: var(--space-8);
            position: relative;
        }

        /* Animated Background */
        .liquid-glass-help-container::before {
            content: '';
            position: absolute;
            top: -10%;
            left: -10%;
            right: -10%;
            bottom: -10%;
            background: radial-gradient(circle at 25% 75%, 
                var(--accent-primary) 0%, 
                transparent 40%),
                radial-gradient(circle at 75% 25%, 
                var(--accent-secondary) 0%, 
                transparent 40%);
            opacity: 0.08;
            animation: helpBackgroundFlow 10s ease-in-out infinite alternate;
            pointer-events: none;
            z-index: 0;
        }

        @keyframes helpBackgroundFlow {
            0% { transform: rotate(0deg) scale(1); }
            100% { transform: rotate(3deg) scale(1.05); }
        }

        /* Glass Help Section */
        .glass-help-section {
            position: relative;
            z-index: 1;
            
            /* Glass Morphism */
            background: var(--glass-primary);
            backdrop-filter: var(--glass-blur);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-2xl);
            padding: var(--space-8);
            box-shadow: var(--glass-shadow);
            
            /* Hover Effects */
            transition: all var(--duration-normal) var(--ease-glass);
            transform: translateZ(0);
            will-change: transform, box-shadow, border-color;
            
            /* Entrance Animation */
            animation: helpSectionEnter var(--duration-slow) var(--ease-glass) forwards;
        }

        @keyframes helpSectionEnter {
            from {
                opacity: 0;
                transform: translateY(20px) scale(0.98);
                filter: blur(5px);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
                filter: blur(0);
            }
        }

        .glass-help-section:hover {
            transform: translateY(-1px) translateZ(0);
            box-shadow: var(--glass-shadow-lg);
            border-color: var(--accent-primary);
        }

        .glass-section-title {
            display: flex;
            align-items: center;
            gap: var(--space-3);
            margin-bottom: var(--space-6);
            font-size: var(--text-xl);
            font-weight: var(--font-semibold);
            
            /* Gradient Text */
            background: linear-gradient(135deg, 
                var(--text-primary) 0%, 
                var(--accent-primary) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .glass-section-title::before {
            content: '';
            width: 4px;
            height: 20px;
            background: linear-gradient(135deg, 
                var(--accent-primary) 0%, 
                var(--accent-secondary) 100%);
            border-radius: var(--radius-full);
            box-shadow: 0 0 8px var(--accent-primary);
        }

        /* Help Content */
        .glass-help-content {
            display: grid;
            gap: var(--space-4);
        }

        .glass-help-item {
            display: flex;
            align-items: flex-start;
            gap: var(--space-4);
            padding: var(--space-4);
            background: var(--glass-secondary);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-lg);
            transition: all var(--duration-normal) var(--ease-glass);
        }

        .glass-help-item:hover {
            background: var(--glass-hover);
            border-color: var(--accent-primary);
            transform: translateX(4px);
        }

        .help-icon {
            font-size: var(--text-2xl);
            min-width: 32px;
            text-align: center;
        }

        .help-text {
            flex: 1;
        }

        .help-title {
            font-size: var(--text-base);
            font-weight: var(--font-medium);
            color: var(--text-primary);
            margin-bottom: var(--space-1);
        }

        .help-description {
            font-size: var(--text-sm);
            color: var(--text-secondary);
            line-height: var(--leading-relaxed);
        }

        /* Glass Search Box */
        .glass-search-container {
            position: relative;
            margin-bottom: var(--space-6);
        }

        .glass-search-input {
            width: 100%;
            background: var(--glass-secondary);
            backdrop-filter: var(--glass-blur);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-lg);
            padding: var(--space-4) var(--space-12) var(--space-4) var(--space-4);
            
            color: var(--text-primary);
            font-family: var(--font-primary);
            font-size: var(--text-base);
            
            transition: all var(--duration-normal) var(--ease-glass);
        }

        .glass-search-input:focus {
            outline: none;
            background: var(--glass-focus);
            border-color: var(--accent-primary);
            box-shadow: var(--glass-glow-primary);
        }

        .glass-search-input::placeholder {
            color: var(--text-tertiary);
        }

        .search-icon {
            position: absolute;
            right: var(--space-4);
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-tertiary);
            font-size: var(--text-lg);
            pointer-events: none;
        }

        /* Glass FAQ Section */
        .glass-faq-item {
            background: var(--glass-secondary);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-lg);
            overflow: hidden;
            transition: all var(--duration-normal) var(--ease-glass);
        }

        .glass-faq-item:hover {
            border-color: var(--accent-primary);
            box-shadow: var(--glass-glow-primary);
        }

        .faq-question {
            padding: var(--space-4);
            background: var(--glass-primary);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-weight: var(--font-medium);
            color: var(--text-primary);
            transition: all var(--duration-normal) var(--ease-glass);
        }

        .faq-question:hover {
            background: var(--glass-hover);
        }

        .faq-answer {
            padding: var(--space-4);
            color: var(--text-secondary);
            line-height: var(--leading-relaxed);
            border-top: 1px solid var(--glass-border);
        }

        .faq-toggle {
            font-size: var(--text-lg);
            transition: transform var(--duration-normal) var(--ease-glass);
        }

        .faq-toggle.expanded {
            transform: rotate(180deg);
        }

        /* Glass Action Buttons */
        .glass-action-buttons {
            display: flex;
            gap: var(--space-4);
            margin-top: var(--space-6);
            flex-wrap: wrap;
        }

        .glass-action-button {
            background: linear-gradient(135deg, 
                var(--accent-primary) 0%, 
                var(--accent-secondary) 100%);
            backdrop-filter: var(--glass-blur);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: var(--radius-lg);
            padding: var(--space-3) var(--space-6);
            
            color: white;
            font-family: var(--font-primary);
            font-size: var(--text-sm);
            font-weight: var(--font-medium);
            text-decoration: none;
            
            cursor: pointer;
            transition: all var(--duration-normal) var(--ease-glass);
            transform: translateZ(0);
            will-change: transform, box-shadow, background;
        }

        .glass-action-button:hover {
            background: linear-gradient(135deg, 
                var(--accent-primary-light) 0%, 
                var(--accent-secondary-light) 100%);
            transform: translateY(-2px) scale(1.02) translateZ(0);
            box-shadow: var(--glass-glow-primary);
        }

        .glass-action-button.secondary {
            background: var(--glass-secondary);
            color: var(--text-primary);
            border-color: var(--glass-border);
        }

        .glass-action-button.secondary:hover {
            background: var(--glass-hover);
            border-color: var(--accent-primary);
        }

        /* Responsive Design */
        @container (max-width: 768px) {
            :host {
                padding: var(--space-4);
            }
            
            .glass-help-section {
                padding: var(--space-6);
            }
            
            .glass-action-buttons {
                flex-direction: column;
            }
        }

        @container (max-width: 480px) {
            .glass-help-section {
                padding: var(--space-4);
            }
            
            .glass-section-title {
                font-size: var(--text-lg);
            }
        }

        /* Performance Optimizations */
        .gpu-accelerated {
            transform: translateZ(0);
            will-change: transform, opacity, backdrop-filter;
        }

        .description {
            color: var(--description-color, rgba(255, 255, 255, 0.75));
            font-size: 12px;
            line-height: 1.4;
            user-select: text;
            cursor: text;
        }

        .description strong {
            color: var(--text-color);
            font-weight: 500;
            user-select: text;
        }

        .description br {
            margin-bottom: 3px;
        }

        .link {
            color: var(--link-color, #007aff);
            text-decoration: none;
            cursor: pointer;
            transition: color 0.15s ease;
            user-select: text;
        }

        .link:hover {
            color: var(--link-hover-color, #0056b3);
            text-decoration: underline;
        }

        .key {
            background: var(--key-background, rgba(0, 0, 0, 0.3));
            color: var(--text-color);
            border: 1px solid var(--key-border, rgba(255, 255, 255, 0.15));
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 10px;
            font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace;
            font-weight: 500;
            margin: 0 1px;
            white-space: nowrap;
            user-select: text;
            cursor: text;
        }

        .keyboard-section {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 12px;
            margin-top: 8px;
        }

        .keyboard-group {
            background: var(--input-background, rgba(0, 0, 0, 0.2));
            border: 1px solid var(--input-border, rgba(255, 255, 255, 0.1));
            border-radius: 4px;
            padding: 10px;
        }

        .keyboard-group-title {
            font-weight: 600;
            font-size: 12px;
            color: var(--text-color);
            margin-bottom: 6px;
            padding-bottom: 3px;
        }

        .shortcut-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 3px 0;
            font-size: 11px;
        }

        .shortcut-description {
            color: var(--description-color, rgba(255, 255, 255, 0.7));
            user-select: text;
            cursor: text;
        }

        .shortcut-keys {
            display: flex;
            gap: 2px;
        }

        .profiles-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 10px;
            margin-top: 8px;
        }

        .profile-item {
            background: var(--input-background, rgba(0, 0, 0, 0.2));
            border: 1px solid var(--input-border, rgba(255, 255, 255, 0.1));
            border-radius: 4px;
            padding: 8px;
        }

        .profile-name {
            font-weight: 600;
            font-size: 12px;
            color: var(--text-color);
            margin-bottom: 3px;
            user-select: text;
            cursor: text;
        }

        .profile-description {
            font-size: 10px;
            color: var(--description-color, rgba(255, 255, 255, 0.6));
            line-height: 1.3;
            user-select: text;
            cursor: text;
        }

        .community-links {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
        }

        .community-link {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 6px 10px;
            background: var(--input-background, rgba(0, 0, 0, 0.2));
            border: 1px solid var(--input-border, rgba(255, 255, 255, 0.1));
            border-radius: 4px;
            text-decoration: none;
            color: var(--link-color, #007aff);
            font-size: 11px;
            font-weight: 500;
            transition: all 0.15s ease;
            cursor: pointer;
        }

        .community-link:hover {
            background: var(--input-hover-background, rgba(0, 0, 0, 0.3));
            border-color: var(--link-color, #007aff);
        }

        .usage-steps {
            counter-reset: step-counter;
        }

        .usage-step {
            counter-increment: step-counter;
            position: relative;
            padding-left: 24px;
            margin-bottom: 6px;
            font-size: 11px;
            line-height: 1.3;
            user-select: text;
            cursor: text;
        }

        .usage-step::before {
            content: counter(step-counter);
            position: absolute;
            left: 0;
            top: 0;
            width: 16px;
            height: 16px;
            background: var(--link-color, #007aff);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 9px;
            font-weight: 600;
        }

        .usage-step strong {
            color: var(--text-color);
            user-select: text;
        }
    `;

    static properties = {
        onExternalLinkClick: { type: Function },
        keybinds: { type: Object },
    };

    constructor() {
        super();
        this.onExternalLinkClick = () => {};
        this.keybinds = this.getDefaultKeybinds();
        this.loadKeybinds();
    }

    connectedCallback() {
        super.connectedCallback();
        // Resize window for this view
        resizeLayout();
    }

    getDefaultKeybinds() {
        const isMac = cheddar.isMacOS || navigator.platform.includes('Mac');
        return {
            moveUp: isMac ? 'Alt+Up' : 'Ctrl+Up',
            moveDown: isMac ? 'Alt+Down' : 'Ctrl+Down',
            moveLeft: isMac ? 'Alt+Left' : 'Ctrl+Left',
            moveRight: isMac ? 'Alt+Right' : 'Ctrl+Right',
            toggleVisibility: isMac ? 'Cmd+\\' : 'Ctrl+\\',
            toggleClickThrough: isMac ? 'Cmd+M' : 'Ctrl+M',
            nextStep: isMac ? 'Cmd+Enter' : 'Ctrl+Enter',
            previousResponse: isMac ? 'Cmd+[' : 'Ctrl+[',
            nextResponse: isMac ? 'Cmd+]' : 'Ctrl+]',
            scrollUp: isMac ? 'Cmd+Shift+Up' : 'Ctrl+Shift+Up',
            scrollDown: isMac ? 'Cmd+Shift+Down' : 'Ctrl+Shift+Down',
        };
    }

    loadKeybinds() {
        const savedKeybinds = localStorage.getItem('customKeybinds');
        if (savedKeybinds) {
            try {
                this.keybinds = { ...this.getDefaultKeybinds(), ...JSON.parse(savedKeybinds) };
            } catch (e) {
                console.error('Failed to parse saved keybinds:', e);
                this.keybinds = this.getDefaultKeybinds();
            }
        }
    }

    formatKeybind(keybind) {
        return keybind.split('+').map(key => html`<span class="key">${key}</span>`);
    }

    handleExternalLinkClick(url) {
        this.onExternalLinkClick(url);
    }

    render() {
        const isMacOS = cheddar.isMacOS || false;
        const isLinux = cheddar.isLinux || false;

        return html`
            <div class="liquid-glass-help-container gpu-accelerated">
                <!-- Search Section -->
                <div class="glass-help-section">
                    <div class="glass-section-title">
                        <span>🔍 Search Help</span>
                    </div>
                    <div class="glass-search-container">
                        <input 
                            type="text" 
                            class="glass-search-input" 
                            placeholder="Search for help topics, shortcuts, or features..."
                            @input=${this.handleSearch}
                        />
                        <div class="search-icon">🔍</div>
                    </div>
                </div>

                <!-- Community & Support Section -->
                <div class="glass-help-section">
                    <div class="glass-section-title">
                        <span>🌐 Community & Support</span>
                    </div>
                    <div class="glass-help-content">
                        <div class="glass-help-item" @click=${() => this.handleExternalLinkClick('https://cheatingdaddy.com')}>
                            <div class="help-icon">🌐</div>
                            <div class="help-text">
                                <div class="help-title">Official Website</div>
                                <div class="help-description">Visit our main website for updates, news, and additional resources</div>
                            </div>
                        </div>
                        <div class="glass-help-item" @click=${() => this.handleExternalLinkClick('https://github.com/sohzm/cheating-daddy')}>
                            <div class="help-icon">📂</div>
                            <div class="help-text">
                                <div class="help-title">GitHub Repository</div>
                                <div class="help-description">Access source code, report issues, and contribute to development</div>
                            </div>
                        </div>
                        <div class="glass-help-item" @click=${() => this.handleExternalLinkClick('https://discord.gg/GCBdubnXfJ')}>
                            <div class="help-icon">💬</div>
                            <div class="help-text">
                                <div class="help-title">Discord Community</div>
                                <div class="help-description">Join our community for real-time support and discussions</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Keyboard Shortcuts Section -->
                <div class="glass-help-section">
                    <div class="glass-section-title">
                        <span>⌨️ Keyboard Shortcuts</span>
                    </div>
                    <div class="glass-help-content">
                        <div class="keyboard-group">
                            <div class="keyboard-group-title">Window Movement</div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">Move window up</span>
                                <div class="shortcut-keys">${this.formatKeybind(this.keybinds.moveUp)}</div>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">Move window down</span>
                                <div class="shortcut-keys">${this.formatKeybind(this.keybinds.moveDown)}</div>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">Move window left</span>
                                <div class="shortcut-keys">${this.formatKeybind(this.keybinds.moveLeft)}</div>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">Move window right</span>
                                <div class="shortcut-keys">${this.formatKeybind(this.keybinds.moveRight)}</div>
                            </div>
                        </div>

                        <div class="keyboard-group">
                            <div class="keyboard-group-title">Window Control</div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">Toggle click-through mode</span>
                                <div class="shortcut-keys">${this.formatKeybind(this.keybinds.toggleClickThrough)}</div>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">Toggle window visibility</span>
                                <div class="shortcut-keys">${this.formatKeybind(this.keybinds.toggleVisibility)}</div>
                            </div>
                        </div>

                        <div class="keyboard-group">
                            <div class="keyboard-group-title">AI Actions</div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">Take screenshot and ask for next step</span>
                                <div class="shortcut-keys">${this.formatKeybind(this.keybinds.nextStep)}</div>
                            </div>
                        </div>

                        <div class="keyboard-group">
                            <div class="keyboard-group-title">Response Navigation</div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">Previous response</span>
                                <div class="shortcut-keys">${this.formatKeybind(this.keybinds.previousResponse)}</div>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">Next response</span>
                                <div class="shortcut-keys">${this.formatKeybind(this.keybinds.nextResponse)}</div>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">Scroll response up</span>
                                <div class="shortcut-keys">${this.formatKeybind(this.keybinds.scrollUp)}</div>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">Scroll response down</span>
                                <div class="shortcut-keys">${this.formatKeybind(this.keybinds.scrollDown)}</div>
                            </div>
                        </div>

                        <div class="keyboard-group">
                            <div class="keyboard-group-title">Text Input</div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">Send message to AI</span>
                                <div class="shortcut-keys"><span class="key">Enter</span></div>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-description">New line in text input</span>
                                <div class="shortcut-keys"><span class="key">Shift</span><span class="key">Enter</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="description" style="margin-top: 12px; font-style: italic; text-align: center;">
                        💡 You can customize these shortcuts in the Settings page!
                    </div>
                </div>

                <div class="option-group">
                    <div class="option-label">
                        <span>How to Use</span>
                    </div>
                    <div class="usage-steps">
                        <div class="usage-step"><strong>Start a Session:</strong> Enter your Gemini API key and click "Start Session"</div>
                        <div class="usage-step"><strong>Customize:</strong> Choose your profile and language in the settings</div>
                        <div class="usage-step">
                            <strong>Position Window:</strong> Use keyboard shortcuts to move the window to your desired location
                        </div>
                        <div class="usage-step">
                            <strong>Click-through Mode:</strong> Use ${this.formatKeybind(this.keybinds.toggleClickThrough)} to make the window
                            click-through
                        </div>
                        <div class="usage-step"><strong>Get AI Help:</strong> The AI will analyze your screen and audio to provide assistance</div>
                        <div class="usage-step"><strong>Text Messages:</strong> Type questions or requests to the AI using the text input</div>
                        <div class="usage-step">
                            <strong>Navigate Responses:</strong> Use ${this.formatKeybind(this.keybinds.previousResponse)} and
                            ${this.formatKeybind(this.keybinds.nextResponse)} to browse through AI responses
                        </div>
                    </div>
                </div>

                <div class="option-group">
                    <div class="option-label">
                        <span>Supported Profiles</span>
                    </div>
                    <div class="profiles-grid">
                        <div class="profile-item">
                            <div class="profile-name">Job Interview</div>
                            <div class="profile-description">Get help with interview questions and responses</div>
                        </div>
                        <div class="profile-item">
                            <div class="profile-name">Sales Call</div>
                            <div class="profile-description">Assistance with sales conversations and objection handling</div>
                        </div>
                        <div class="profile-item">
                            <div class="profile-name">Business Meeting</div>
                            <div class="profile-description">Support for professional meetings and discussions</div>
                        </div>
                        <div class="profile-item">
                            <div class="profile-name">Presentation</div>
                            <div class="profile-description">Help with presentations and public speaking</div>
                        </div>
                        <div class="profile-item">
                            <div class="profile-name">Negotiation</div>
                            <div class="profile-description">Guidance for business negotiations and deals</div>
                        </div>
                        <div class="profile-item">
                            <div class="profile-name">Exam Assistant</div>
                            <div class="profile-description">Academic assistance for test-taking and exam questions</div>
                        </div>
                    </div>
                </div>

                <div class="option-group">
                    <div class="option-label">
                        <span>Audio Input</span>
                    </div>
                    <div class="description">The AI listens to conversations and provides contextual assistance based on what it hears.</div>
                </div>
            </div>
        `;
    }
}

customElements.define('help-view', HelpView);
