import { html, css, LitElement } from '../../assets/lit-core-2.7.4.min.js';

export class GlassCard extends LitElement {
    static styles = css`
        :host {
            display: block;
        }

        .glass-card {
            /* Base Glass Card */
            position: relative;
            
            background: var(--glass-primary);
            backdrop-filter: var(--glass-blur);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-xl);
            padding: var(--space-6);
            
            box-shadow: var(--glass-shadow);
            
            transition: all var(--duration-normal) var(--ease-glass);
            transform: translateZ(0);
            will-change: transform, box-shadow, border-color;
            overflow: hidden;
        }
        
        /* Glass Card Accent Border */
        .glass-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, 
                var(--accent-primary) 0%, 
                var(--accent-secondary) 50%, 
                var(--accent-tertiary) 100%);
            opacity: 0;
            transition: opacity var(--duration-normal) var(--ease-smooth);
        }
        
        .glass-card:hover {
            transform: translateY(-2px) translateZ(0);
            box-shadow: var(--glass-shadow-lg);
            border-color: var(--accent-primary);
        }
        
        .glass-card:hover::before {
            opacity: 1;
        }
        
        /* Card Variants */
        :host([variant="interactive"]) .glass-card {
            cursor: pointer;
        }
        
        :host([variant="flat"]) .glass-card {
            box-shadow: none;
            border-color: var(--glass-border-subtle);
        }
        
        :host([variant="elevated"]) .glass-card {
            box-shadow: var(--glass-shadow-lg);
        }
        
        :host([variant="success"]) .glass-card {
            background: var(--glass-success);
            border-color: var(--accent-success);
        }
        
        :host([variant="warning"]) .glass-card {
            background: var(--glass-warning);
            border-color: var(--accent-warning);
        }
        
        :host([variant="error"]) .glass-card {
            background: var(--glass-error);
            border-color: var(--accent-error);
        }
        
        /* Card Sizes */
        :host([size="sm"]) .glass-card {
            padding: var(--space-4);
            border-radius: var(--radius-lg);
        }
        
        :host([size="lg"]) .glass-card {
            padding: var(--space-8);
            border-radius: var(--radius-2xl);
        }
        
        /* Glass Card Header */
        .glass-card__header {
            display: flex;
            align-items: center;
            gap: var(--space-3);
            margin-bottom: var(--space-4);
            padding-bottom: var(--space-4);
            border-bottom: 1px solid var(--glass-border-subtle);
        }
        
        .glass-card__header:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }
        
        .glass-card__title {
            font-size: var(--text-lg);
            font-weight: var(--font-semibold);
            color: var(--text-primary);
            margin: 0;
            flex: 1;
        }
        
        .glass-card__subtitle {
            font-size: var(--text-sm);
            color: var(--text-secondary);
            margin: 0;
        }
        
        .glass-card__actions {
            display: flex;
            align-items: center;
            gap: var(--space-2);
        }
        
        /* Glass Card Content */
        .glass-card__content {
            color: var(--text-secondary);
            line-height: var(--leading-relaxed);
        }
        
        .glass-card__content:last-child {
            margin-bottom: 0;
        }
        
        /* Glass Card Footer */
        .glass-card__footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: var(--space-3);
            margin-top: var(--space-4);
            padding-top: var(--space-4);
            border-top: 1px solid var(--glass-border-subtle);
        }
        
        .glass-card__footer:first-child {
            margin-top: 0;
            padding-top: 0;
            border-top: none;
        }
        
        /* Loading State */
        :host([loading]) .glass-card {
            pointer-events: none;
        }
        
        .loading-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--glass-primary);
            backdrop-filter: var(--glass-blur);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: inherit;
        }
        
        .loading-spinner {
            width: 32px;
            height: 32px;
            border: 3px solid var(--glass-border);
            border-top-color: var(--accent-primary);
            border-radius: var(--radius-full);
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        /* Skeleton Loading */
        :host([skeleton]) .glass-card {
            background: linear-gradient(90deg, 
                var(--glass-primary) 25%, 
                var(--glass-secondary) 50%, 
                var(--glass-primary) 75%);
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
        
        /* Hover Effects */
        :host([hover-effect="lift"]) .glass-card:hover {
            transform: translateY(-4px) translateZ(0);
        }
        
        :host([hover-effect="scale"]) .glass-card:hover {
            transform: scale(1.02) translateZ(0);
        }
        
        :host([hover-effect="glow"]) .glass-card:hover {
            box-shadow: var(--glass-glow-primary);
        }
        
        /* Focus States */
        :host([tabindex]) .glass-card:focus-visible {
            outline: none;
            border-color: var(--accent-primary);
            box-shadow: 
                var(--glass-shadow-lg),
                0 0 0 3px rgba(0, 212, 255, 0.1);
        }
        
        /* Animation States */
        :host([animate-in]) .glass-card {
            animation: cardEnter var(--duration-normal) var(--ease-glass) forwards;
        }
        
        @keyframes cardEnter {
            from {
                opacity: 0;
                transform: translateY(20px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        /* Responsive Design */
        @container (max-width: 400px) {
            .glass-card {
                padding: var(--space-4);
                border-radius: var(--radius-lg);
            }
            
            .glass-card__header {
                flex-direction: column;
                align-items: flex-start;
                gap: var(--space-2);
            }
            
            .glass-card__footer {
                flex-direction: column;
                align-items: stretch;
            }
        }
    `;

    static properties = {
        variant: { type: String, reflect: true },
        size: { type: String, reflect: true },
        loading: { type: Boolean, reflect: true },
        skeleton: { type: Boolean, reflect: true },
        hoverEffect: { type: String, reflect: true, attribute: 'hover-effect' },
        animateIn: { type: Boolean, reflect: true, attribute: 'animate-in' },
        onClick: { type: Function }
    };

    constructor() {
        super();
        this.variant = 'default';
        this.size = 'default';
        this.loading = false;
        this.skeleton = false;
        this.hoverEffect = 'default';
        this.animateIn = false;
        this.onClick = () => {};
    }

    connectedCallback() {
        super.connectedCallback();
        if (this.animateIn) {
            // Small delay to ensure the element is rendered
            setTimeout(() => {
                this.animateIn = true;
            }, 50);
        }
    }

    handleClick(e) {
        if (this.loading || this.skeleton) {
            e.preventDefault();
            return;
        }
        this.onClick(e);
    }

    render() {
        return html`
            <div 
                class="glass-card"
                @click=${this.handleClick}
            >
                ${this.loading ? html`
                    <div class="loading-overlay">
                        <div class="loading-spinner"></div>
                    </div>
                ` : ''}
                
                <slot name="header">
                    <div class="glass-card__header" style="display: none;">
                        <div class="glass-card__title">
                            <slot name="title"></slot>
                        </div>
                        <div class="glass-card__subtitle">
                            <slot name="subtitle"></slot>
                        </div>
                        <div class="glass-card__actions">
                            <slot name="actions"></slot>
                        </div>
                    </div>
                </slot>
                
                <div class="glass-card__content">
                    <slot></slot>
                </div>
                
                <slot name="footer">
                    <div class="glass-card__footer" style="display: none;">
                        <slot name="footer-content"></slot>
                    </div>
                </slot>
            </div>
        `;
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        
        // Show/hide header and footer based on slot content
        const headerSlot = this.shadowRoot.querySelector('slot[name="header"]');
        const footerSlot = this.shadowRoot.querySelector('slot[name="footer"]');
        const titleSlot = this.shadowRoot.querySelector('slot[name="title"]');
        const subtitleSlot = this.shadowRoot.querySelector('slot[name="subtitle"]');
        const actionsSlot = this.shadowRoot.querySelector('slot[name="actions"]');
        const footerContentSlot = this.shadowRoot.querySelector('slot[name="footer-content"]');
        
        const header = this.shadowRoot.querySelector('.glass-card__header');
        const footer = this.shadowRoot.querySelector('.glass-card__footer');
        
        // Show header if any header slots have content
        const hasHeaderContent = headerSlot?.assignedNodes().length > 0 ||
                                titleSlot?.assignedNodes().length > 0 ||
                                subtitleSlot?.assignedNodes().length > 0 ||
                                actionsSlot?.assignedNodes().length > 0;
        
        if (hasHeaderContent && header) {
            header.style.display = 'flex';
        }
        
        // Show footer if footer slots have content
        const hasFooterContent = footerSlot?.assignedNodes().length > 0 ||
                                footerContentSlot?.assignedNodes().length > 0;
        
        if (hasFooterContent && footer) {
            footer.style.display = 'flex';
        }
    }
}

customElements.define('glass-card', GlassCard);