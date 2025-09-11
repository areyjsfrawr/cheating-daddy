import { html, css, LitElement } from '../../assets/lit-core-2.7.4.min.js';

export class AssistantView extends LitElement {
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

        .glass-response-container {
            height: calc(100% - 80px);
            overflow-y: auto;
            border-radius: var(--radius-xl);
            font-size: var(--response-font-size, var(--text-lg));
            line-height: var(--leading-relaxed);
            
            /* Glass Morphism */
            background: var(--glass-primary);
            backdrop-filter: var(--glass-blur);
            border: 1px solid var(--glass-border);
            box-shadow: var(--glass-shadow);
            
            padding: var(--space-6);
            scroll-behavior: smooth;
            user-select: text;
            cursor: text;
            
            /* Scrolling Optimizations */
            scrollbar-width: thin;
            scrollbar-color: var(--glass-border) transparent;
            
            /* GPU Acceleration */
            transform: translateZ(0);
            will-change: scroll-position;
        }

        /* Enhanced Scrollbar Styling */
        .glass-response-container::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        .glass-response-container::-webkit-scrollbar-track {
            background: transparent;
        }

        .glass-response-container::-webkit-scrollbar-thumb {
            background: var(--glass-border);
            border-radius: var(--radius-full);
            transition: background var(--duration-normal) var(--ease-smooth);
        }

        .glass-response-container::-webkit-scrollbar-thumb:hover {
            background: var(--accent-primary);
        }

        /* Allow text selection for all content within the response container */
        .glass-response-container * {
            user-select: text;
            cursor: text;
        }

        /* Restore default cursor for interactive elements */
        .glass-response-container a {
            cursor: pointer;
        }

        /* Enhanced word-by-word reveal animation */
        .glass-response-container [data-word] {
            opacity: 0;
            filter: blur(4px);
            display: inline-block;
            transform: translateY(10px);
            transition: all var(--duration-normal) var(--ease-glass);
        }
        
        .glass-response-container [data-word].visible {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
        }

        /* Enhanced Markdown styling with Glass Aesthetics */
        .glass-response-container h1,
        .glass-response-container h2,
        .glass-response-container h3,
        .glass-response-container h4,
        .glass-response-container h5,
        .glass-response-container h6 {
            margin: var(--space-6) 0 var(--space-3) 0;
            color: var(--text-primary);
            font-weight: var(--font-semibold);
            line-height: var(--leading-tight);
            
            /* Gradient Text Effect for Headers */
            background: linear-gradient(135deg, 
                var(--text-primary) 0%, 
                var(--accent-primary) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .glass-response-container h1 { font-size: var(--text-3xl); }
        .glass-response-container h2 { font-size: var(--text-2xl); }
        .glass-response-container h3 { font-size: var(--text-xl); }
        .glass-response-container h4 { font-size: var(--text-lg); }
        .glass-response-container h5 { font-size: var(--text-base); }
        .glass-response-container h6 { font-size: var(--text-sm); }

        .glass-response-container p {
            margin: var(--space-4) 0;
            color: var(--text-primary);
            line-height: var(--leading-relaxed);
        }

        .glass-response-container ul,
        .glass-response-container ol {
            margin: var(--space-4) 0;
            padding-left: var(--space-8);
            color: var(--text-primary);
        }

        .glass-response-container li {
            margin: var(--space-2) 0;
            line-height: var(--leading-relaxed);
        }

        .glass-response-container blockquote {
            margin: var(--space-5) 0;
            padding: var(--space-4) var(--space-5);
            
            /* Glass Blockquote */
            background: var(--glass-secondary);
            backdrop-filter: var(--glass-blur-subtle);
            border: 1px solid var(--glass-border);
            border-left: 4px solid var(--accent-primary);
            border-radius: var(--radius-lg);
            
            font-style: italic;
            color: var(--text-secondary);
            box-shadow: var(--glass-shadow-sm);
        }

        .glass-response-container code {
            background: var(--glass-secondary);
            backdrop-filter: var(--glass-blur-subtle);
            border: 1px solid var(--glass-border-subtle);
            padding: var(--space-1) var(--space-2);
            border-radius: var(--radius-sm);
            font-family: var(--font-mono);
            font-size: var(--text-sm);
            color: var(--accent-primary);
        }

        .glass-response-container pre {
            /* Glass Code Block */
            background: var(--glass-secondary);
            backdrop-filter: var(--glass-blur);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-lg);
            padding: var(--space-5);
            overflow-x: auto;
            margin: var(--space-5) 0;
            box-shadow: var(--glass-shadow-sm);
            
            /* Enhanced Scrollbar for Code Blocks */
            scrollbar-width: thin;
            scrollbar-color: var(--glass-border) transparent;
        }

        .glass-response-container pre::-webkit-scrollbar {
            height: 6px;
        }

        .glass-response-container pre::-webkit-scrollbar-track {
            background: transparent;
        }

        .glass-response-container pre::-webkit-scrollbar-thumb {
            background: var(--glass-border);
            border-radius: var(--radius-full);
        }

        .glass-response-container pre code {
            background: none;
            border: none;
            padding: 0;
            border-radius: 0;
            color: var(--text-primary);
        }

        .glass-response-container a {
            color: var(--accent-primary);
            text-decoration: none;
            font-weight: var(--font-medium);
            transition: color var(--duration-fast) var(--ease-smooth);
        }

        .glass-response-container a:hover {
            color: var(--accent-primary-light);
            text-decoration: underline;
        }

        .glass-response-container strong,
        .glass-response-container b {
            font-weight: var(--font-semibold);
            color: var(--text-primary);
        }

        .glass-response-container em,
        .glass-response-container i {
            font-style: italic;
            color: var(--text-secondary);
        }

        .response-container hr {
            border: none;
            border-top: 1px solid var(--border-color);
            margin: 2em 0;
        }

        .response-container table {
            border-collapse: collapse;
            width: 100%;
            margin: 1em 0;
        }

        .response-container th,
        .response-container td {
            border: 1px solid var(--border-color);
            padding: 0.5em;
            text-align: left;
        }

        .response-container th {
            background: var(--input-background);
            font-weight: 600;
        }

        .response-container::-webkit-scrollbar {
            width: 8px;
        }

        .response-container::-webkit-scrollbar-track {
            background: var(--scrollbar-track);
            border-radius: 4px;
        }

        .response-container::-webkit-scrollbar-thumb {
            background: var(--scrollbar-thumb);
            border-radius: 4px;
        }

        .response-container::-webkit-scrollbar-thumb:hover {
            background: var(--scrollbar-thumb-hover);
        }

        .text-input-container {
            display: flex;
            gap: 10px;
            margin-top: 10px;
            align-items: center;
        }

        .text-input-container input {
            flex: 1;
            background: var(--input-background);
            color: var(--text-color);
            border: 1px solid var(--button-border);
            padding: 10px 14px;
            border-radius: 8px;
            font-size: 14px;
        }

        .text-input-container input:focus {
            outline: none;
            border-color: var(--focus-border-color);
            box-shadow: 0 0 0 3px var(--focus-box-shadow);
            background: var(--input-focus-background);
        }

        .text-input-container input::placeholder {
            color: var(--placeholder-color);
        }

        .text-input-container button {
            background: transparent;
            color: var(--start-button-background);
            border: none;
            padding: 0;
            border-radius: 100px;
        }

        .text-input-container button:hover {
            background: var(--text-input-button-hover);
        }

        .nav-button {
            background: transparent;
            color: white;
            border: none;
            padding: 4px;
            border-radius: 50%;
            font-size: 12px;
            display: flex;
            align-items: center;
            width: 36px;
            height: 36px;
            justify-content: center;
        }

        .nav-button:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        .nav-button:disabled {
            opacity: 0.3;
        }

        .nav-button svg {
            stroke: white !important;
        }

        .response-counter {
            font-size: 12px;
            color: var(--description-color);
            white-space: nowrap;
            min-width: 60px;
            text-align: center;
        }

        .save-button {
            background: transparent;
            color: var(--start-button-background);
            border: none;
            padding: 4px;
            border-radius: 50%;
            font-size: 12px;
            display: flex;
            align-items: center;
            width: 36px;
            height: 36px;
            justify-content: center;
            cursor: pointer;
        }

        .save-button:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        .save-button.saved {
            color: #4caf50;
        }

        .save-button svg {
            stroke: currentColor !important;
        }

        /* Additional Glass Styles */
        .glass-response-container hr {
            border: none;
            height: 1px;
            background: linear-gradient(90deg, 
                transparent 0%, 
                var(--glass-border) 50%, 
                transparent 100%);
            margin: var(--space-6) 0;
        }

        .glass-response-container table {
            border-collapse: collapse;
            width: 100%;
            margin: var(--space-5) 0;
            background: var(--glass-secondary);
            backdrop-filter: var(--glass-blur-subtle);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-lg);
            overflow: hidden;
        }

        .glass-response-container th,
        .glass-response-container td {
            border: 1px solid var(--glass-border-subtle);
            padding: var(--space-3) var(--space-4);
            text-align: left;
        }

        .glass-response-container th {
            background: var(--glass-primary);
            font-weight: var(--font-semibold);
            color: var(--text-primary);
        }

        /* Floating Glass Navigation Controls */
        .glass-navigation-controls {
            display: flex;
            align-items: center;
            gap: var(--space-3);
            padding: var(--space-3) var(--space-5);
            margin-top: var(--space-4);
            
            /* Glass Morphism */
            background: var(--glass-secondary);
            backdrop-filter: var(--glass-blur-strong);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-2xl);
            box-shadow: var(--glass-shadow);
            
            /* Floating Effect */
            position: relative;
            transform: translateZ(0);
            will-change: transform, box-shadow;
            
            /* Entrance Animation */
            animation: controlsEnter var(--duration-normal) var(--ease-glass) forwards;
        }

        @keyframes controlsEnter {
            from {
                opacity: 0;
                transform: translateY(20px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        .glass-nav-button {
            /* Circular Glass Navigation Button */
            width: 40px;
            height: 40px;
            border-radius: var(--radius-full);
            background: var(--glass-primary);
            backdrop-filter: var(--glass-blur-subtle);
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

        .glass-text-input-container {
            display: flex;
            gap: var(--space-3);
            margin-top: var(--space-4);
            align-items: center;
        }

        .glass-text-input {
            flex: 1;
            background: var(--glass-secondary);
            backdrop-filter: var(--glass-blur);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-lg);
            padding: var(--space-4) var(--space-5);
            
            color: var(--text-primary);
            font-family: var(--font-primary);
            font-size: var(--text-base);
            
            transition: all var(--duration-normal) var(--ease-glass);
        }

        .glass-text-input:focus {
            outline: none;
            background: var(--glass-focus);
            border-color: var(--accent-primary);
            box-shadow: var(--glass-glow-primary);
        }

        .glass-text-input::placeholder {
            color: var(--text-tertiary);
        }

        /* Enhanced Empty State */
        .glass-empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            text-align: center;
            padding: var(--space-12) var(--space-6);
            
            /* Glass Container */
            background: var(--glass-primary);
            backdrop-filter: var(--glass-blur);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-xl);
            box-shadow: var(--glass-shadow);
            
            /* Entrance Animation */
            animation: emptyStateEnter var(--duration-slow) var(--ease-glass) forwards;
        }

        @keyframes emptyStateEnter {
            from {
                opacity: 0;
                transform: scale(0.9);
                filter: blur(10px);
            }
            to {
                opacity: 1;
                transform: scale(1);
                filter: blur(0);
            }
        }

        .empty-state-icon {
            font-size: var(--text-6xl);
            margin-bottom: var(--space-6);
            
            /* Gradient Icon */
            background: linear-gradient(135deg, 
                var(--accent-primary) 0%, 
                var(--accent-secondary) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            
            opacity: 0.7;
            animation: iconPulse 3s ease-in-out infinite;
        }

        @keyframes iconPulse {
            0%, 100% { opacity: 0.7; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
        }

        .empty-state-title {
            font-size: var(--text-xl);
            font-weight: var(--font-semibold);
            margin-bottom: var(--space-3);
            color: var(--text-primary);
        }

        .empty-state-description {
            font-size: var(--text-sm);
            line-height: var(--leading-relaxed);
            color: var(--text-secondary);
            max-width: 400px;
        }

        /* Responsive Design */
        @container (max-width: 600px) {
            .glass-response-container {
                padding: var(--space-4);
                font-size: var(--text-base);
            }
            
            .glass-navigation-controls {
                padding: var(--space-2) var(--space-4);
                gap: var(--space-2);
            }
            
            .glass-nav-button {
                width: 36px;
                height: 36px;
            }
            
            .glass-empty-state {
                padding: var(--space-8) var(--space-4);
            }
        }
    `;

    static properties = {
        responses: { type: Array },
        currentResponseIndex: { type: Number },
        selectedProfile: { type: String },
        onSendText: { type: Function },
        shouldAnimateResponse: { type: Boolean },
        savedResponses: { type: Array },
    };

    constructor() {
        super();
        this.responses = [];
        this.currentResponseIndex = -1;
        this.selectedProfile = 'interview';
        this.onSendText = () => {};
        this._lastAnimatedWordCount = 0;
        // Load saved responses from localStorage
        try {
            this.savedResponses = JSON.parse(localStorage.getItem('savedResponses') || '[]');
        } catch (e) {
            this.savedResponses = [];
        }
    }

    getProfileNames() {
        return {
            interview: 'Job Interview',
            sales: 'Sales Call',
            meeting: 'Business Meeting',
            presentation: 'Presentation',
            negotiation: 'Negotiation',
            exam: 'Exam Assistant',
        };
    }

    getCurrentResponse() {
        const profileNames = this.getProfileNames();
        return this.responses.length > 0 && this.currentResponseIndex >= 0
            ? this.responses[this.currentResponseIndex]
            : `Hey, Im listening to your ${profileNames[this.selectedProfile] || 'session'}?`;
    }

    renderMarkdown(content) {
        // Check if marked is available
        if (typeof window !== 'undefined' && window.marked) {
            try {
                // Configure marked for better security and formatting
                window.marked.setOptions({
                    breaks: true,
                    gfm: true,
                    sanitize: false, // We trust the AI responses
                });
                let rendered = window.marked.parse(content);
                rendered = this.wrapWordsInSpans(rendered);
                return rendered;
            } catch (error) {
                console.warn('Error parsing markdown:', error);
                return content; // Fallback to plain text
            }
        }
        console.log('Marked not available, using plain text');
        return content; // Fallback if marked is not available
    }

    wrapWordsInSpans(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const tagsToSkip = ['PRE'];

        function wrap(node) {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() && !tagsToSkip.includes(node.parentNode.tagName)) {
                const words = node.textContent.split(/(\s+)/);
                const frag = document.createDocumentFragment();
                words.forEach(word => {
                    if (word.trim()) {
                        const span = document.createElement('span');
                        span.setAttribute('data-word', '');
                        span.textContent = word;
                        frag.appendChild(span);
                    } else {
                        frag.appendChild(document.createTextNode(word));
                    }
                });
                node.parentNode.replaceChild(frag, node);
            } else if (node.nodeType === Node.ELEMENT_NODE && !tagsToSkip.includes(node.tagName)) {
                Array.from(node.childNodes).forEach(wrap);
            }
        }
        Array.from(doc.body.childNodes).forEach(wrap);
        return doc.body.innerHTML;
    }

    getResponseCounter() {
        return this.responses.length > 0 ? `${this.currentResponseIndex + 1}/${this.responses.length}` : '';
    }

    navigateToPreviousResponse() {
        if (this.currentResponseIndex > 0) {
            this.currentResponseIndex--;
            this.dispatchEvent(
                new CustomEvent('response-index-changed', {
                    detail: { index: this.currentResponseIndex },
                })
            );
            this.requestUpdate();
        }
    }

    navigateToNextResponse() {
        if (this.currentResponseIndex < this.responses.length - 1) {
            this.currentResponseIndex++;
            this.dispatchEvent(
                new CustomEvent('response-index-changed', {
                    detail: { index: this.currentResponseIndex },
                })
            );
            this.requestUpdate();
        }
    }

    scrollResponseUp() {
        const container = this.shadowRoot.querySelector('.response-container');
        if (container) {
            const scrollAmount = container.clientHeight * 0.3; // Scroll 30% of container height
            container.scrollTop = Math.max(0, container.scrollTop - scrollAmount);
        }
    }

    scrollResponseDown() {
        const container = this.shadowRoot.querySelector('.response-container');
        if (container) {
            const scrollAmount = container.clientHeight * 0.3; // Scroll 30% of container height
            container.scrollTop = Math.min(container.scrollHeight - container.clientHeight, container.scrollTop + scrollAmount);
        }
    }

    loadFontSize() {
        const fontSize = localStorage.getItem('fontSize');
        if (fontSize !== null) {
            const fontSizeValue = parseInt(fontSize, 10) || 20;
            const root = document.documentElement;
            root.style.setProperty('--response-font-size', `${fontSizeValue}px`);
        }
    }

    connectedCallback() {
        super.connectedCallback();

        // Load and apply font size
        this.loadFontSize();

        // Set up IPC listeners for keyboard shortcuts
        if (window.require) {
            const { ipcRenderer } = window.require('electron');

            this.handlePreviousResponse = () => {
                console.log('Received navigate-previous-response message');
                this.navigateToPreviousResponse();
            };

            this.handleNextResponse = () => {
                console.log('Received navigate-next-response message');
                this.navigateToNextResponse();
            };

            this.handleScrollUp = () => {
                console.log('Received scroll-response-up message');
                this.scrollResponseUp();
            };

            this.handleScrollDown = () => {
                console.log('Received scroll-response-down message');
                this.scrollResponseDown();
            };

            ipcRenderer.on('navigate-previous-response', this.handlePreviousResponse);
            ipcRenderer.on('navigate-next-response', this.handleNextResponse);
            ipcRenderer.on('scroll-response-up', this.handleScrollUp);
            ipcRenderer.on('scroll-response-down', this.handleScrollDown);
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        // Clean up IPC listeners
        if (window.require) {
            const { ipcRenderer } = window.require('electron');
            if (this.handlePreviousResponse) {
                ipcRenderer.removeListener('navigate-previous-response', this.handlePreviousResponse);
            }
            if (this.handleNextResponse) {
                ipcRenderer.removeListener('navigate-next-response', this.handleNextResponse);
            }
            if (this.handleScrollUp) {
                ipcRenderer.removeListener('scroll-response-up', this.handleScrollUp);
            }
            if (this.handleScrollDown) {
                ipcRenderer.removeListener('scroll-response-down', this.handleScrollDown);
            }
        }
    }

    async handleSendText() {
        const textInput = this.shadowRoot.querySelector('#textInput');
        if (textInput && textInput.value.trim()) {
            const message = textInput.value.trim();
            textInput.value = ''; // Clear input
            await this.onSendText(message);
        }
    }

    handleTextKeydown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.handleSendText();
        }
    }

    scrollToBottom() {
        setTimeout(() => {
            const container = this.shadowRoot.querySelector('.response-container');
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        }, 0);
    }

    saveCurrentResponse() {
        const currentResponse = this.getCurrentResponse();
        if (currentResponse && !this.isResponseSaved()) {
            this.savedResponses = [
                ...this.savedResponses,
                {
                    response: currentResponse,
                    timestamp: new Date().toISOString(),
                    profile: this.selectedProfile,
                },
            ];
            // Save to localStorage for persistence
            localStorage.setItem('savedResponses', JSON.stringify(this.savedResponses));
            this.requestUpdate();
        }
    }

    isResponseSaved() {
        const currentResponse = this.getCurrentResponse();
        return this.savedResponses.some(saved => saved.response === currentResponse);
    }

    firstUpdated() {
        super.firstUpdated();
        this.updateResponseContent();
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('responses') || changedProperties.has('currentResponseIndex')) {
            if (changedProperties.has('currentResponseIndex')) {
                this._lastAnimatedWordCount = 0;
            }
            this.updateResponseContent();
        }
    }

    updateResponseContent() {
        console.log('updateResponseContent called');
        const container = this.shadowRoot.querySelector('#responseContainer');
        if (container) {
            const currentResponse = this.getCurrentResponse();
            console.log('Current response:', currentResponse);
            const renderedResponse = this.renderMarkdown(currentResponse);
            console.log('Rendered response:', renderedResponse);
            container.innerHTML = renderedResponse;
            const words = container.querySelectorAll('[data-word]');
            if (this.shouldAnimateResponse) {
                for (let i = 0; i < this._lastAnimatedWordCount && i < words.length; i++) {
                    words[i].classList.add('visible');
                }
                for (let i = this._lastAnimatedWordCount; i < words.length; i++) {
                    words[i].classList.remove('visible');
                    setTimeout(() => {
                        words[i].classList.add('visible');
                        if (i === words.length - 1) {
                            this.dispatchEvent(new CustomEvent('response-animation-complete', { bubbles: true, composed: true }));
                        }
                    }, (i - this._lastAnimatedWordCount) * 100);
                }
                this._lastAnimatedWordCount = words.length;
            } else {
                words.forEach(word => word.classList.add('visible'));
                this._lastAnimatedWordCount = words.length;
            }
        } else {
            console.log('Response container not found');
        }
    }

    render() {
        const currentResponse = this.getCurrentResponse();
        const responseCounter = this.getResponseCounter();
        const isSaved = this.isResponseSaved();

        return html`
            <!-- Glass Response Container -->
            <div class="glass-response-container gpu-accelerated" id="responseContainer">
                ${this.responses.length === 0 ? html`
                    <div class="glass-empty-state">
                        <div class="empty-state-icon">🤖</div>
                        <h3 class="empty-state-title">AI Assistant Ready</h3>
                        <p class="empty-state-description">
                            I'm listening and ready to help you with your ${this.getProfileNames()[this.selectedProfile] || 'session'}. 
                            Start speaking or type a message to get assistance.
                        </p>
                    </div>
                ` : ''}
            </div>

            <!-- Glass Navigation Controls -->
            <div class="glass-navigation-controls gpu-accelerated">
                <button 
                    class="glass-nav-button" 
                    @click=${this.navigateToPreviousResponse} 
                    ?disabled=${this.currentResponseIndex <= 0}
                    title="Previous response"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M15 6L9 12L15 18"/>
                    </svg>
                </button>

                ${this.responses.length > 0 ? html`
                    <div class="nav-info">${responseCounter}</div>
                ` : ''}

                <button
                    class="glass-nav-button ${isSaved ? 'saved' : ''}"
                    @click=${this.saveCurrentResponse}
                    title="${isSaved ? 'Response saved' : 'Save this response'}"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 21H5C4.44772 21 4 20.5523 4 20V4C4 3.44772 4.44772 3 5 3H16L20 7V20C20 20.5523 19.5523 21 19 21Z"/>
                        <path d="M17 21V13H7V21"/>
                        <path d="M7 3V8H15"/>
                    </svg>
                </button>

                <button 
                    class="glass-nav-button" 
                    @click=${this.navigateToNextResponse} 
                    ?disabled=${this.currentResponseIndex >= this.responses.length - 1}
                    title="Next response"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 6L15 12L9 18"/>
                    </svg>
                </button>
            </div>

            <!-- Glass Text Input Container -->
            <div class="glass-text-input-container">
                <input 
                    type="text" 
                    id="textInput" 
                    class="glass-text-input"
                    placeholder="Type a message to the AI..." 
                    @keydown=${this.handleTextKeydown} 
                />
            </div>
        `;
    }
}

customElements.define('assistant-view', AssistantView);
