import { html, css, LitElement } from '../../assets/lit-core-2.7.4.min.js';
import { resizeLayout } from '../../utils/windowResize.js';

export class HistoryView extends LitElement {
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
            padding: var(--space-4);
            container-type: inline-size;
        }

        .liquid-glass-history-container {
            height: 100%;
            display: flex;
            flex-direction: column;
            position: relative;
        }

        /* Animated Background */
        .liquid-glass-history-container::before {
            content: '';
            position: absolute;
            top: -5%;
            left: -5%;
            right: -5%;
            bottom: -5%;
            background: radial-gradient(circle at 30% 40%, 
                var(--accent-primary) 0%, 
                transparent 35%),
                radial-gradient(circle at 70% 60%, 
                var(--accent-secondary) 0%, 
                transparent 35%);
            opacity: 0.06;
            animation: historyBackgroundFlow 15s ease-in-out infinite alternate;
            pointer-events: none;
            z-index: 0;
        }

        @keyframes historyBackgroundFlow {
            0% { transform: rotate(0deg) scale(1); }
            100% { transform: rotate(-2deg) scale(1.03); }
        }

        /* Glass Header */
        .glass-history-header {
            position: relative;
            z-index: 1;
            background: var(--glass-primary);
            backdrop-filter: var(--glass-blur);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-xl);
            padding: var(--space-6);
            margin-bottom: var(--space-4);
            box-shadow: var(--glass-shadow);
        }

        .glass-header-title {
            font-size: var(--text-xl);
            font-weight: var(--font-semibold);
            margin-bottom: var(--space-4);
            
            /* Gradient Text */
            background: linear-gradient(135deg, 
                var(--text-primary) 0%, 
                var(--accent-primary) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        /* Glass Search */
        .glass-search-container {
            position: relative;
            margin-bottom: var(--space-4);
        }

        .glass-search-input {
            width: 100%;
            background: var(--glass-secondary);
            backdrop-filter: var(--glass-blur);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-lg);
            padding: var(--space-3) var(--space-10) var(--space-3) var(--space-4);
            
            color: var(--text-primary);
            font-family: var(--font-primary);
            font-size: var(--text-sm);
            
            transition: all var(--duration-normal) var(--ease-glass);
        }

        .glass-search-input:focus {
            outline: none;
            background: var(--glass-focus);
            border-color: var(--accent-primary);
            box-shadow: var(--glass-glow-primary);
        }

        .search-icon {
            position: absolute;
            right: var(--space-3);
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-tertiary);
            pointer-events: none;
        }

        /* Glass Sessions List */
        .glass-sessions-list {
            flex: 1;
            overflow-y: auto;
            position: relative;
            z-index: 1;
            
            /* Custom Scrollbar */
            scrollbar-width: thin;
            scrollbar-color: var(--glass-border) transparent;
        }

        .glass-sessions-list::-webkit-scrollbar {
            width: 6px;
        }

        .glass-sessions-list::-webkit-scrollbar-track {
            background: transparent;
        }

        .glass-sessions-list::-webkit-scrollbar-thumb {
            background: var(--glass-border);
            border-radius: var(--radius-full);
        }

        .glass-sessions-list::-webkit-scrollbar-thumb:hover {
            background: var(--accent-primary);
        }

        /* Glass Session Item */
        .glass-session-item {
            background: var(--glass-secondary);
            backdrop-filter: var(--glass-blur);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-lg);
            padding: var(--space-4);
            margin-bottom: var(--space-3);
            cursor: pointer;
            
            transition: all var(--duration-normal) var(--ease-glass);
            transform: translateZ(0);
            will-change: transform, background, border-color, box-shadow;
            
            /* Entrance Animation */
            animation: sessionItemEnter var(--duration-normal) var(--ease-glass) forwards;
        }

        @keyframes sessionItemEnter {
            from {
                opacity: 0;
                transform: translateX(-20px) scale(0.98);
            }
            to {
                opacity: 1;
                transform: translateX(0) scale(1);
            }
        }

        .glass-session-item:hover {
            background: var(--glass-hover);
            border-color: var(--accent-primary);
            transform: translateX(4px) translateZ(0);
            box-shadow: var(--glass-glow-primary);
        }

        .glass-session-item.selected {
            background: var(--glass-focus);
            border-color: var(--accent-primary);
            box-shadow: var(--glass-glow-primary);
        }

        .session-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: var(--space-2);
        }

        .session-title {
            font-size: var(--text-base);
            font-weight: var(--font-medium);
            color: var(--text-primary);
        }

        .session-date {
            font-size: var(--text-xs);
            color: var(--text-tertiary);
        }

        .session-preview {
            font-size: var(--text-sm);
            color: var(--text-secondary);
            line-height: var(--leading-relaxed);
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .session-stats {
            display: flex;
            gap: var(--space-4);
            margin-top: var(--space-2);
            font-size: var(--text-xs);
            color: var(--text-tertiary);
        }

        .stat-item {
            display: flex;
            align-items: center;
            gap: var(--space-1);
        }

        /* Glass Empty State */
        .glass-empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: var(--space-12);
            text-align: center;
            
            background: var(--glass-primary);
            backdrop-filter: var(--glass-blur);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-2xl);
            box-shadow: var(--glass-shadow);
        }

        .empty-icon {
            font-size: var(--text-6xl);
            margin-bottom: var(--space-4);
            opacity: 0.6;
            animation: emptyIconPulse 3s ease-in-out infinite;
        }

        @keyframes emptyIconPulse {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.05); opacity: 0.8; }
        }

        .empty-title {
            font-size: var(--text-lg);
            font-weight: var(--font-medium);
            color: var(--text-primary);
            margin-bottom: var(--space-2);
        }

        .empty-description {
            font-size: var(--text-sm);
            color: var(--text-secondary);
            line-height: var(--leading-relaxed);
        }

        /* Glass Action Buttons */
        .glass-action-buttons {
            display: flex;
            gap: var(--space-3);
            margin-top: var(--space-4);
        }

        .glass-action-button {
            background: var(--glass-secondary);
            backdrop-filter: var(--glass-blur);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-lg);
            padding: var(--space-2) var(--space-4);
            
            color: var(--text-primary);
            font-family: var(--font-primary);
            font-size: var(--text-sm);
            font-weight: var(--font-medium);
            
            cursor: pointer;
            transition: all var(--duration-normal) var(--ease-glass);
        }

        .glass-action-button:hover {
            background: var(--glass-hover);
            border-color: var(--accent-primary);
            transform: translateY(-1px);
        }

        .glass-action-button.primary {
            background: linear-gradient(135deg, 
                var(--accent-primary) 0%, 
                var(--accent-secondary) 100%);
            color: white;
            border-color: rgba(255, 255, 255, 0.2);
        }

        .glass-action-button.primary:hover {
            box-shadow: var(--glass-glow-primary);
        }

        /* Responsive Design */
        @container (max-width: 768px) {
            :host {
                padding: var(--space-3);
            }
            
            .glass-history-header {
                padding: var(--space-4);
            }
        }

        /* Performance Optimizations */
        .gpu-accelerated {
            transform: translateZ(0);
            will-change: transform, opacity, backdrop-filter;
        }

        .session-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 6px;
        }

        .session-date {
            font-size: 12px;
            font-weight: 600;
            color: var(--text-color);
        }

        .session-time {
            font-size: 11px;
            color: var(--description-color);
        }

        .session-preview {
            font-size: 11px;
            color: var(--description-color);
            line-height: 1.3;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .conversation-view {
            flex: 1;
            overflow-y: auto;
            background: var(--main-content-background);
            border: 1px solid var(--button-border);
            border-radius: 6px;
            padding: 12px;
            padding-bottom: 20px;
            user-select: text;
            cursor: text;
        }

        .message {
            margin-bottom: 6px;
            padding: 6px 10px;
            border-left: 3px solid transparent;
            font-size: 12px;
            line-height: 1.4;
            background: var(--input-background);
            border-radius: 0 4px 4px 0;
            user-select: text;
            cursor: text;
        }

        .message.user {
            border-left-color: #5865f2; /* Discord blue */
        }

        .message.ai {
            border-left-color: #ed4245; /* Discord red */
        }

        .back-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
        }

        .back-button {
            background: var(--button-background);
            color: var(--text-color);
            border: 1px solid var(--button-border);
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: all 0.15s ease;
        }

        .back-button:hover {
            background: var(--hover-background);
        }

        .legend {
            display: flex;
            gap: 12px;
            align-items: center;
        }

        .legend-item {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 11px;
            color: var(--description-color);
        }

        .legend-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
        }

        .legend-dot.user {
            background-color: #5865f2; /* Discord blue */
        }

        .legend-dot.ai {
            background-color: #ed4245; /* Discord red */
        }

        .empty-state {
            text-align: center;
            color: var(--description-color);
            font-size: 12px;
            margin-top: 32px;
        }

        .empty-state-title {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 6px;
            color: var(--text-color);
        }

        .loading {
            text-align: center;
            color: var(--description-color);
            font-size: 12px;
            margin-top: 32px;
        }

        /* Scrollbar styles for scrollable elements */
        .sessions-list::-webkit-scrollbar {
            width: 6px;
        }

        .sessions-list::-webkit-scrollbar-track {
            background: var(--scrollbar-track, rgba(0, 0, 0, 0.2));
            border-radius: 3px;
        }

        .sessions-list::-webkit-scrollbar-thumb {
            background: var(--scrollbar-thumb, rgba(255, 255, 255, 0.2));
            border-radius: 3px;
        }

        .sessions-list::-webkit-scrollbar-thumb:hover {
            background: var(--scrollbar-thumb-hover, rgba(255, 255, 255, 0.3));
        }

        .conversation-view::-webkit-scrollbar {
            width: 6px;
        }

        .conversation-view::-webkit-scrollbar-track {
            background: var(--scrollbar-track, rgba(0, 0, 0, 0.2));
            border-radius: 3px;
        }

        .conversation-view::-webkit-scrollbar-thumb {
            background: var(--scrollbar-thumb, rgba(255, 255, 255, 0.2));
            border-radius: 3px;
        }

        .conversation-view::-webkit-scrollbar-thumb:hover {
            background: var(--scrollbar-thumb-hover, rgba(255, 255, 255, 0.3));
        }

        .tabs-container {
            display: flex;
            gap: 8px;
            margin-bottom: 16px;
            border-bottom: 1px solid var(--button-border);
            padding-bottom: 8px;
        }

        .tab {
            background: transparent;
            color: var(--description-color);
            border: none;
            padding: 8px 16px;
            border-radius: 4px 4px 0 0;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.15s ease;
        }

        .tab:hover {
            background: var(--hover-background);
            color: var(--text-color);
        }

        .tab.active {
            background: var(--focus-box-shadow);
            color: var(--text-color);
            border-bottom: 2px solid var(--focus-border-color);
        }

        .saved-response-item {
            background: var(--input-background);
            border: 1px solid var(--button-border);
            border-radius: 6px;
            padding: 12px;
            margin-bottom: 8px;
            transition: all 0.15s ease;
        }

        .saved-response-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 8px;
        }

        .saved-response-profile {
            font-size: 11px;
            font-weight: 600;
            color: var(--focus-border-color);
            text-transform: capitalize;
        }

        .saved-response-date {
            font-size: 10px;
            color: var(--description-color);
        }

        .saved-response-content {
            font-size: 12px;
            color: var(--text-color);
            line-height: 1.4;
            user-select: text;
            cursor: text;
        }

        .delete-button {
            background: transparent;
            color: var(--description-color);
            border: none;
            padding: 4px;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.15s ease;
        }

        .delete-button:hover {
            background: rgba(255, 0, 0, 0.1);
            color: #ff4444;
        }
    `;

    static properties = {
        sessions: { type: Array },
        selectedSession: { type: Object },
        loading: { type: Boolean },
        activeTab: { type: String },
        savedResponses: { type: Array },
    };

    constructor() {
        super();
        this.sessions = [];
        this.selectedSession = null;
        this.loading = true;
        this.activeTab = 'sessions';
        // Load saved responses from localStorage
        try {
            this.savedResponses = JSON.parse(localStorage.getItem('savedResponses') || '[]');
        } catch (e) {
            this.savedResponses = [];
        }
        this.loadSessions();
    }

    connectedCallback() {
        super.connectedCallback();
        // Resize window for this view
        resizeLayout();
    }

    async loadSessions() {
        try {
            this.loading = true;
            this.sessions = await cheddar.getAllConversationSessions();
        } catch (error) {
            console.error('Error loading conversation sessions:', error);
            this.sessions = [];
        } finally {
            this.loading = false;
        }
    }

    formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    getSessionPreview(session) {
        if (!session.conversationHistory || session.conversationHistory.length === 0) {
            return 'No conversation yet';
        }

        const firstTurn = session.conversationHistory[0];
        const preview = firstTurn.transcription || firstTurn.ai_response || 'Empty conversation';
        return preview.length > 100 ? preview.substring(0, 100) + '...' : preview;
    }

    handleSessionClick(session) {
        this.selectedSession = session;
    }

    handleBackClick() {
        this.selectedSession = null;
    }

    handleTabClick(tab) {
        this.activeTab = tab;
    }

    deleteSavedResponse(index) {
        this.savedResponses = this.savedResponses.filter((_, i) => i !== index);
        localStorage.setItem('savedResponses', JSON.stringify(this.savedResponses));
        this.requestUpdate();
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

    renderSessionsList() {
        if (this.loading) {
            return html`<div class="loading">Loading conversation history...</div>`;
        }

        if (this.sessions.length === 0) {
            return html`
                <div class="empty-state">
                    <div class="empty-state-title">No conversations yet</div>
                    <div>Start a session to see your conversation history here</div>
                </div>
            `;
        }

        return html`
            <div class="sessions-list">
                ${this.sessions.map(
                    session => html`
                        <div class="session-item" @click=${() => this.handleSessionClick(session)}>
                            <div class="session-header">
                                <div class="session-date">${this.formatDate(session.timestamp)}</div>
                                <div class="session-time">${this.formatTime(session.timestamp)}</div>
                            </div>
                            <div class="session-preview">${this.getSessionPreview(session)}</div>
                        </div>
                    `
                )}
            </div>
        `;
    }

    renderSavedResponses() {
        if (this.savedResponses.length === 0) {
            return html`
                <div class="empty-state">
                    <div class="empty-state-title">No saved responses</div>
                    <div>Use the save button during conversations to save important responses</div>
                </div>
            `;
        }

        const profileNames = this.getProfileNames();

        return html`
            <div class="sessions-list">
                ${this.savedResponses.map(
                    (saved, index) => html`
                        <div class="saved-response-item">
                            <div class="saved-response-header">
                                <div>
                                    <div class="saved-response-profile">${profileNames[saved.profile] || saved.profile}</div>
                                    <div class="saved-response-date">${this.formatTimestamp(saved.timestamp)}</div>
                                </div>
                                <button class="delete-button" @click=${() => this.deleteSavedResponse(index)} title="Delete saved response">
                                    <svg
                                        width="16px"
                                        height="16px"
                                        stroke-width="1.7"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6 6L18 18M6 18L18 6"
                                            stroke="currentColor"
                                            stroke-width="1.7"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                            <div class="saved-response-content">${saved.response}</div>
                        </div>
                    `
                )}
            </div>
        `;
    }

    renderConversationView() {
        if (!this.selectedSession) return html``;

        const { conversationHistory } = this.selectedSession;

        // Flatten the conversation turns into individual messages
        const messages = [];
        if (conversationHistory) {
            conversationHistory.forEach(turn => {
                if (turn.transcription) {
                    messages.push({
                        type: 'user',
                        content: turn.transcription,
                        timestamp: turn.timestamp,
                    });
                }
                if (turn.ai_response) {
                    messages.push({
                        type: 'ai',
                        content: turn.ai_response,
                        timestamp: turn.timestamp,
                    });
                }
            });
        }

        return html`
            <div class="back-header">
                <button class="back-button" @click=${this.handleBackClick}>
                    <svg
                        width="16px"
                        height="16px"
                        stroke-width="1.7"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        color="currentColor"
                    >
                        <path d="M15 6L9 12L15 18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    Back to Sessions
                </button>
                <div class="legend">
                    <div class="legend-item">
                        <div class="legend-dot user"></div>
                        <span>Them</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-dot ai"></div>
                        <span>Suggestion</span>
                    </div>
                </div>
            </div>
            <div class="conversation-view">
                ${messages.length > 0
                    ? messages.map(message => html` <div class="message ${message.type}">${message.content}</div> `)
                    : html`<div class="empty-state">No conversation data available</div>`}
            </div>
        `;
    }

    render() {
        if (this.selectedSession) {
            return html`<div class="history-container">${this.renderConversationView()}</div>`;
        }

        return html`
            <div class="history-container">
                <div class="tabs-container">
                    <button class="tab ${this.activeTab === 'sessions' ? 'active' : ''}" @click=${() => this.handleTabClick('sessions')}>
                        Conversation History
                    </button>
                    <button class="tab ${this.activeTab === 'saved' ? 'active' : ''}" @click=${() => this.handleTabClick('saved')}>
                        Saved Responses (${this.savedResponses.length})
                    </button>
                </div>
                ${this.activeTab === 'sessions' ? this.renderSessionsList() : this.renderSavedResponses()}
            </div>
        `;
    }
}

customElements.define('history-view', HistoryView);
