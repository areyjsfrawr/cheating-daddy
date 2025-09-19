import { html, css, LitElement } from '../../assets/lit-core-2.7.4.min.js';

export class ChatView extends LitElement {
    static styles = css`
        :host {
            height: 100%;
            display: flex;
            flex-direction: column;
            container-type: inline-size;
        }

        * {
            font-family: var(--font-primary);
            cursor: default;
        }

        .chat-container {
            display: flex;
            flex-direction: column;
            gap: var(--space-4);
            height: 100%;
        }

        .chat-response-container {
            flex: 1;
            overflow-y: auto;
            border-radius: var(--radius-xl);
            background: var(--glass-primary);
            backdrop-filter: var(--glass-blur);
            border: 1px solid var(--glass-border);
            box-shadow: var(--glass-shadow);
            padding: var(--space-6);
            scroll-behavior: smooth;
            user-select: text;
            cursor: text;
            scrollbar-width: thin;
            scrollbar-color: var(--glass-border) transparent;
        }

        .chat-response-container::-webkit-scrollbar { width: 8px; height: 8px; }
        .chat-response-container::-webkit-scrollbar-track { background: transparent; }
        .chat-response-container::-webkit-scrollbar-thumb { background: var(--glass-border); border-radius: var(--radius-full); }
        .chat-response-container::-webkit-scrollbar-thumb:hover { background: var(--accent-primary); }

        .controls-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: var(--space-3);
            background: var(--glass-secondary);
            backdrop-filter: var(--glass-blur-strong);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-2xl);
            padding: var(--space-3) var(--space-5);
            box-shadow: var(--glass-shadow);
        }

        .toggle {
            display: inline-flex;
            align-items: center;
            gap: var(--space-2);
            color: var(--text-secondary);
            font-size: var(--text-sm);
        }

        .switch {
            position: relative;
            width: 46px;
            height: 26px;
            background: var(--glass-primary);
            border: 1px solid var(--glass-border);
            border-radius: 9999px;
            cursor: pointer;
            transition: all var(--duration-normal) var(--ease-glass);
        }
        .switch::after {
            content: '';
            position: absolute;
            top: 2px;
            left: 2px;
            width: 22px;
            height: 22px;
            background: var(--text-primary);
            border-radius: 9999px;
            transition: all var(--duration-normal) var(--ease-glass);
        }
        .switch.on { background: var(--glass-focus); border-color: var(--accent-primary); box-shadow: var(--glass-glow-primary); }
        .switch.on::after { transform: translateX(20px); background: var(--accent-primary); }

        .actions {
            display: flex;
            gap: var(--space-2);
            align-items: center;
        }

        .glass-nav-button {
            width: 40px; height: 40px; border-radius: var(--radius-full);
            background: var(--glass-primary);
            backdrop-filter: var(--glass-blur-subtle);
            border: 1px solid var(--glass-border);
            color: var(--text-primary);
            display: flex; align-items: center; justify-content: center;
            cursor: pointer;
            transition: all var(--duration-normal) var(--ease-glass);
        }
        .glass-nav-button:hover { background: var(--glass-hover); border-color: var(--accent-primary); box-shadow: var(--glass-glow-primary); transform: translateY(-2px) scale(1.05); }
        .glass-nav-button:active { transform: translateY(0) scale(1.02); }

        .input-row {
            display: flex;
            gap: var(--space-3);
            align-items: center;
        }
        .glass-text-input { flex: 1; background: var(--glass-secondary); backdrop-filter: var(--glass-blur); border: 1px solid var(--glass-border); border-radius: var(--radius-lg); padding: var(--space-4) var(--space-5); color: var(--text-primary); font-size: var(--text-base); transition: all var(--duration-normal) var(--ease-glass); }
        .glass-text-input::placeholder { color: var(--text-tertiary); }
        .glass-text-input:focus { outline: none; background: var(--glass-focus); border-color: var(--accent-primary); box-shadow: var(--glass-glow-primary); }

        .message { color: var(--text-primary); line-height: var(--leading-relaxed); margin: var(--space-3) 0; }
        .message.user { opacity: 0.9; }
        .message.ai { opacity: 1; }

        .empty-state { text-align: center; color: var(--text-secondary); padding: var(--space-8) 0; }

        @container (max-width: 600px) {
            .controls-bar { padding: var(--space-2) var(--space-4); }
            .glass-nav-button { width: 36px; height: 36px; }
        }
    `;

    static properties = {
        selectedProfile: { type: String },
        selectedLanguage: { type: String },
        selectedScreenshotInterval: { type: String },
        selectedImageQuality: { type: String },
        messages: { type: Array },
        screenShareEnabled: { type: Boolean },
    };

    constructor() {
        super();
        this.selectedProfile = 'interview';
        this.selectedLanguage = 'en-US';
        this.selectedScreenshotInterval = 'manual';
        this.selectedImageQuality = 'medium';
        this.messages = [];
        this.screenShareEnabled = false;
        this._initialized = false;
    }

    connectedCallback() {
        super.connectedCallback();
        // Initialize LLM session on enter (no screen share by default)
        this.initializeIfNeeded();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        // Ensure capture is stopped when leaving chat
        if (this.screenShareEnabled) {
            cheddar.stopCapture();
        }
    }

    async initializeIfNeeded() {
        if (this._initialized) return;
        try {
            await cheddar.initializeGemini(this.selectedProfile, this.selectedLanguage);
            this._initialized = true;
        } catch (e) {
            console.warn('Failed to initialize chat session:', e);
        }
    }

    async toggleScreenShare() {
        this.screenShareEnabled = !this.screenShareEnabled;
        if (this.screenShareEnabled) {
            // Start capture with current settings
            await this.initializeIfNeeded();
            await cheddar.startCapture(this.selectedScreenshotInterval, this.selectedImageQuality);
        } else {
            cheddar.stopCapture();
        }
        this.requestUpdate();
    }

    async sendMessage() {
        const input = this.shadowRoot.querySelector('#chatInput');
        const text = input?.value?.trim();
        if (!text) return;
        input.value = '';
        this.messages = [...this.messages, { role: 'user', content: text }];
        this.scrollToBottom();

        // Ensure model is ready
        await this.initializeIfNeeded();
        // If screen share is enabled but capture not started yet (edge), start it
        if (this.screenShareEnabled && typeof window.captureManualScreenshot === 'function') {
            // Optionally trigger a manual screenshot to prime context
            try { await window.captureManualScreenshot(this.selectedImageQuality); } catch {}
        }

        const res = await cheddar.sendTextMessage(text);
        if (!res?.success) {
            this.messages = [...this.messages, { role: 'ai', content: `Error: ${res?.error || 'Failed to send message'}` }];
        } else {
            // The actual AI response is streamed to Assistant/renderer and bubbled via cheddar.setResponse.
            // For ChatView, we listen for update-response below and append here.
        }
        this.scrollToBottom();
    }

    scrollToBottom() {
        setTimeout(() => {
            const c = this.shadowRoot.querySelector('.chat-response-container');
            if (c) c.scrollTop = c.scrollHeight;
        }, 0);
    }

    firstUpdated() {
        // Listen for AI responses sent to cheddar.setResponse
        this._onResponse = (_, response) => {
            this.messages = [...this.messages, { role: 'ai', content: response }];
            this.scrollToBottom();
        };
        if (window.require) {
            try {
                const { ipcRenderer } = window.require('electron');
                ipcRenderer.on('update-response', this._onResponse);
            } catch (e) {
                console.warn('IPC not available for responses:', e);
            }
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (window.require && this._onResponse) {
            try {
                const { ipcRenderer } = window.require('electron');
                ipcRenderer.removeListener('update-response', this._onResponse);
            } catch {}
        }
    }

    handleKeydown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.sendMessage();
        }
    }

    renderMessage(m) {
        return html`<div class="message ${m.role}">${unsafeHTML(this.renderMarkdown(m.content))}</div>`;
    }

    renderMarkdown(content) {
        if (typeof window !== 'undefined' && window.marked) {
            try {
                window.marked.setOptions({ breaks: true, gfm: true, sanitize: false });
                let rendered = window.marked.parse(content);
                return rendered;
            } catch {
                return content;
            }
        }
        return content;
    }

    render() {
        return html`
            <div class="chat-container">
                <div class="controls-bar">
                    <div class="toggle" @click=${this.toggleScreenShare}>
                        <div class="switch ${this.screenShareEnabled ? 'on' : ''}"></div>
                        <span>Use screen share context</span>
                    </div>
                    <div class="actions">
                        ${this.screenShareEnabled ? html`
                            <button class="glass-nav-button" title="Manual screenshot" @click=${() => window.captureManualScreenshot?.(this.selectedImageQuality)}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M4 7h4l2-2h4l2 2h4v12H4z"/>
                                    <circle cx="12" cy="13" r="4"/>
                                </svg>
                            </button>
                        ` : ''}
                    </div>
                </div>

                <div class="chat-response-container">
                    ${this.messages.length === 0 ? html`
                        <div class="empty-state">Start chatting. Toggle screen share any time to include page context.</div>
                    ` : this.messages.map(m => html`<div class="message ${m.role}">${m.content}</div>`) }
                </div>

                <div class="input-row">
                    <input id="chatInput" class="glass-text-input" type="text" placeholder="Type your message..." @keydown=${this.handleKeydown} />
                    <button class="glass-nav-button" title="Send" @click=${this.sendMessage}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 2L11 13"/>
                            <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }
}

customElements.define('chat-view', ChatView);
