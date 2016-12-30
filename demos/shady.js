"use strict";
(function () {

    class Shady extends HTMLElement {

        static get observedAttributes() {
            return ['value', 'disabled'];
        }

        constructor(...args) {
            super(args);
        }

        connectedCallback () {
            const shadow = this.attachShadow({mode: 'open'});
            shadow.innerHTML = `
                <slot name="title">Default Title</slot>
                <slot name="content">Default Content</slot>
                <section>This is a Shadow DOM &lt;section&gt;</section>
                `;
        }
    }
    customElements.define('ca-shady', Shady);

}());