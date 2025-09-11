import { html, css, LitElement } from '../../assets/lit-core-2.7.4.min.js';

export class GlassButton extends LitElement {
    static styles = css`
        :host {
            display: inline-block;
        }

        .glass-button {
            /* Base Glass Button */
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: var(--space-2);
            
            background: var(--glass-primary);
            backdrop-filter: var(--glass-blur-subtle);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-lg);
            padding: var(--space-3) var(--space-4);
            
            color: var(--text-primary);
            font-family: var(--font-primary);
            font-size: var(--text-sm);
            font-weight: var(--font-medium);
            line-height: var(--leading-none);
            text-decoration: none;
            
            cursor: pointer;
            user-select: none;
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
        
        /* Glass Button States */
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
            box-shadow: 0 2px 8px rgba(0, 212, 255, 0.3);
        }
        
        .glass-button:focus-visible {
            outline: none;
            background: var(--glass-focus);
            border-color: var(--accent-primary);
            box-shadow: 
                var(--glass-glow-primary),
                0 0 0 3px rgba(0, 212, 255, 0.1);
        }
        
        .glass-button:disabled {
            background: var(--glass-disabled);
            border-color: var(--glass-border-subtle);
            color: var(--text-disabled);
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }
        
        .glass-button:disabled::before {
            display: none;
        }
        
        /* Glass Button Variants */
        :host([variant="primary"]) .glass-button {
            background: linear-gradient(135deg, 
                var(--accent-primary) 0%, 
                var(--accent-secondary) 100%);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            box-shadow: 
                var(--glass-glow-primary),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        
        :host([variant="primary"]) .glass-button:hover {
            background: linear-gradient(135deg, 
                var(--accent-primary-light) 0%, 
                var(--accent-secondary-light) 100%);
            transform: translateY(-2px) scale(1.02) translateZ(0);
            box-shadow: 
                0 12px 48px rgba(0, 212, 255, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }
        
        :host([variant="secondary"]) .glass-button {
            background: var(--glass-secondary);
            border-color: var(--glass-border-subtle);
        }
        
        :host([variant="ghost"]) .glass-button {
            background: transparent;
            border-color: var(--glass-border-subtle);
        }
        
        :host([variant="ghost"]) .glass-button:hover {
            background: var(--glass-primary);
        }
        
        /* Glass Button Sizes */
        :host([size="sm"]) .glass-button {
            padding: var(--space-2) var(--space-3);
            font-size: var(--text-xs);
            border-radius: var(--radius-md);
        }
        
        :host([size="lg"]) .glass-button {
            padding: var(--space-4) var(--space-6);
            font-size: var(--text-base);
            border-radius: var(--radius-xl);
        }
        
        :host([size="xl"]) .glass-button {
            padding: var(--space-5) var(--space-8);
            font-size: var(--text-lg);
            border-radius: var(--radius-2xl);
        }
        
        /* Glass Icon Button */
        :host([icon-only]) .glass-button {
            width: 40px;
            height: 40px;
            padding: 0;
            border-radius: var(--radius-full);
        }
        
        :host([icon-only][size="sm"]) .glass-button {
            width: 32px;
            height: 32px;
        }
        
        :host([icon-only][size="lg"]) .glass-button {
            width: 48px;
            height: 48px;
        }
        
        /* Loading State */
        :host([loading]) .glass-button {
            cursor: wait;
            pointer-events: none;
        }
        
        .loading-spinner {
            width: 16px;
            height: 16px;
            border: 2px solid var(--glass-border);
            border-top-color: currentColor;
            border-radius: var(--radius-full);
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        /* Ripple Effect */
        .glass-button::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: radial-gradient(circle, 
                rgba(0, 212, 255, 0.3) 0%, 
                transparent 70%);
            border-radius: var(--radius-full);
            transform: translate(-50%, -50%);
            transition: all var(--duration-normal) var(--ease-glass);
            pointer-events: none;
            opacity: 0;
        }
        
        .glass-button:active::after {
            width: 100px;
            height: 100px;
            opacity: 1;
            transition: all 0s;
        }
    `;

    static properties = {
        variant: { type: String, reflect: true },
        size: { type: String, reflect: true },
        disabled: { type: Boolean, reflect: true },
        loading: { type: Boolean, reflect: true },
        iconOnly: { type: Boolean, reflect: true, attribute: 'icon-only' },
        onClick: { type: Function }
    };

    constructor() {
        super();
        this.variant = 'default';
        this.size = 'default';
        this.disabled = false;
        this.loading = false;
        this.iconOnly = false;
        this.onClick = () => {};
    }

    handleClick(e) {
        if (this.disabled || this.loading) {
            e.preventDefault();
            return;
        }
        this.onClick(e);
    }

    render() {
        return html`
            <button 
                class="glass-button"
                ?disabled=${this.disabled || this.loading}
                @click=${this.handleClick}
            >
                ${this.loading ? html`
                    <div class="loading-spinner"></div>
                ` : ''}
                <slot></slot>
            </button>
        `;
    }
}

customElements.define('glass-button', GlassButton);