import { html, css, LitElement } from '../../assets/lit-core-2.7.4.min.js';

export class GlassInput extends LitElement {
    static styles = css`
        :host {
            display: block;
            width: 100%;
        }

        .glass-input-container {
            position: relative;
            display: flex;
            align-items: center;
        }

        .glass-input {
            /* Base Glass Input */
            position: relative;
            display: block;
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
        
        .glass-input::placeholder {
            color: var(--text-tertiary);
            transition: color var(--duration-normal) var(--ease-smooth);
        }
        
        .glass-input:focus {
            outline: none;
            background: var(--glass-focus);
            border-color: var(--accent-primary);
            box-shadow: 
                var(--glass-glow-primary),
                0 0 0 3px rgba(0, 212, 255, 0.1);
            transform: translateY(-2px) translateZ(0);
        }
        
        .glass-input:focus::placeholder {
            color: var(--text-disabled);
        }
        
        .glass-input:disabled {
            background: var(--glass-disabled);
            border-color: var(--glass-border-subtle);
            color: var(--text-disabled);
            cursor: not-allowed;
        }
        
        /* Input with Icon */
        :host([has-icon]) .glass-input {
            padding-right: var(--space-12);
        }
        
        .glass-input-icon {
            position: absolute;
            right: var(--space-4);
            color: var(--text-tertiary);
            pointer-events: none;
            transition: color var(--duration-normal) var(--ease-smooth);
        }
        
        .glass-input:focus + .glass-input-icon {
            color: var(--accent-primary);
        }
        
        /* Input Variants */
        :host([variant="error"]) .glass-input {
            background: var(--glass-error);
            border-color: var(--accent-error);
            animation: shake var(--duration-normal) var(--ease-bounce);
        }
        
        :host([variant="success"]) .glass-input {
            background: var(--glass-success);
            border-color: var(--accent-success);
            box-shadow: var(--glass-glow-success);
        }
        
        /* Input Sizes */
        :host([size="sm"]) .glass-input {
            padding: var(--space-2) var(--space-3);
            font-size: var(--text-sm);
            border-radius: var(--radius-md);
        }
        
        :host([size="lg"]) .glass-input {
            padding: var(--space-5) var(--space-6);
            font-size: var(--text-lg);
            border-radius: var(--radius-xl);
        }
        
        /* Textarea Variant */
        :host([multiline]) .glass-input {
            resize: vertical;
            min-height: 100px;
            line-height: var(--leading-relaxed);
        }
        
        /* Focus Ring Animation */
        .glass-input:focus {
            animation: focusRing var(--duration-normal) var(--ease-glass);
        }
        
        @keyframes focusRing {
            0% {
                box-shadow: 
                    0 0 0 3px transparent;
            }
            100% {
                box-shadow: 
                    var(--glass-glow-primary),
                    0 0 0 3px rgba(0, 212, 255, 0.1);
            }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
            20%, 40%, 60%, 80% { transform: translateX(3px); }
        }
        
        /* Label Styling */
        .glass-input-label {
            display: block;
            font-size: var(--text-sm);
            font-weight: var(--font-medium);
            color: var(--text-primary);
            margin-bottom: var(--space-2);
        }
        
        /* Help Text */
        .glass-input-help {
            font-size: var(--text-xs);
            color: var(--text-tertiary);
            margin-top: var(--space-2);
            line-height: var(--leading-relaxed);
        }
        
        :host([variant="error"]) .glass-input-help {
            color: var(--accent-error);
        }
        
        :host([variant="success"]) .glass-input-help {
            color: var(--accent-success);
        }
        
        /* Floating Label */
        :host([floating-label]) .glass-input-container {
            position: relative;
            margin-top: var(--space-4);
        }
        
        :host([floating-label]) .glass-input-label {
            position: absolute;
            top: var(--space-4);
            left: var(--space-5);
            background: var(--bg-primary);
            padding: 0 var(--space-2);
            font-size: var(--text-base);
            color: var(--text-tertiary);
            pointer-events: none;
            transition: all var(--duration-normal) var(--ease-glass);
            transform-origin: left center;
        }
        
        :host([floating-label]) .glass-input:focus + .glass-input-label,
        :host([floating-label]) .glass-input:not(:placeholder-shown) + .glass-input-label {
            top: -var(--space-2);
            font-size: var(--text-xs);
            color: var(--accent-primary);
            transform: scale(0.9);
        }
        
        /* Password Toggle */
        .password-toggle {
            position: absolute;
            right: var(--space-4);
            background: none;
            border: none;
            color: var(--text-tertiary);
            cursor: pointer;
            padding: var(--space-1);
            border-radius: var(--radius-sm);
            transition: all var(--duration-normal) var(--ease-glass);
        }
        
        .password-toggle:hover {
            color: var(--accent-primary);
            background: var(--glass-hover);
        }
    `;

    static properties = {
        type: { type: String },
        placeholder: { type: String },
        value: { type: String },
        disabled: { type: Boolean, reflect: true },
        variant: { type: String, reflect: true },
        size: { type: String, reflect: true },
        multiline: { type: Boolean, reflect: true },
        hasIcon: { type: Boolean, reflect: true, attribute: 'has-icon' },
        floatingLabel: { type: Boolean, reflect: true, attribute: 'floating-label' },
        label: { type: String },
        helpText: { type: String, attribute: 'help-text' },
        showPasswordToggle: { type: Boolean, attribute: 'show-password-toggle' },
        onInput: { type: Function },
        onChange: { type: Function },
        onFocus: { type: Function },
        onBlur: { type: Function }
    };

    constructor() {
        super();
        this.type = 'text';
        this.placeholder = '';
        this.value = '';
        this.disabled = false;
        this.variant = 'default';
        this.size = 'default';
        this.multiline = false;
        this.hasIcon = false;
        this.floatingLabel = false;
        this.label = '';
        this.helpText = '';
        this.showPasswordToggle = false;
        this.onInput = () => {};
        this.onChange = () => {};
        this.onFocus = () => {};
        this.onBlur = () => {};
        this._showPassword = false;
    }

    get inputElement() {
        return this.shadowRoot.querySelector('.glass-input');
    }

    handleInput(e) {
        this.value = e.target.value;
        this.onInput(e);
    }

    handleChange(e) {
        this.onChange(e);
    }

    handleFocus(e) {
        this.onFocus(e);
    }

    handleBlur(e) {
        this.onBlur(e);
    }

    togglePasswordVisibility() {
        this._showPassword = !this._showPassword;
        this.requestUpdate();
    }

    focus() {
        this.inputElement?.focus();
    }

    blur() {
        this.inputElement?.blur();
    }

    select() {
        this.inputElement?.select();
    }

    render() {
        const inputType = this.type === 'password' && this._showPassword ? 'text' : this.type;
        const InputElement = this.multiline ? 'textarea' : 'input';

        return html`
            ${this.label && !this.floatingLabel ? html`
                <label class="glass-input-label">${this.label}</label>
            ` : ''}
            
            <div class="glass-input-container">
                <${InputElement}
                    class="glass-input"
                    type=${inputType}
                    placeholder=${this.placeholder}
                    .value=${this.value}
                    ?disabled=${this.disabled}
                    @input=${this.handleInput}
                    @change=${this.handleChange}
                    @focus=${this.handleFocus}
                    @blur=${this.handleBlur}
                ></${InputElement}>
                
                ${this.hasIcon ? html`
                    <div class="glass-input-icon">
                        <slot name="icon"></slot>
                    </div>
                ` : ''}
                
                ${this.showPasswordToggle && this.type === 'password' ? html`
                    <button 
                        class="password-toggle"
                        type="button"
                        @click=${this.togglePasswordVisibility}
                        title=${this._showPassword ? 'Hide password' : 'Show password'}
                    >
                        ${this._showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                ` : ''}
                
                ${this.floatingLabel && this.label ? html`
                    <label class="glass-input-label">${this.label}</label>
                ` : ''}
            </div>
            
            ${this.helpText ? html`
                <div class="glass-input-help">${this.helpText}</div>
            ` : ''}
        `;
    }
}

customElements.define('glass-input', GlassInput);