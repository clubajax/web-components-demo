"use strict";
(function () {

    class Progressive extends HTMLElement {

        static get observedAttributes() {
            return ['value', 'disabled', 'label'];
        }

        constructor(...args) {
            super(args);
        }

        connectedCallback () {
            dom('label', {html:this.getAttribute('label')}, this);
            dom('input', {attr:{value: this.getAttribute('value')}}, this);
            this.classList.add('defined');
        }
    }
    window.defineProgressive = function () {
        customElements.define('ca-progressive', Progressive);
    };

}());