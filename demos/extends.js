"use strict";
(function () {

    // This is what extending an existing element would look like in v1
    // if it was implemented in Chrome or the shim
    class SuperButton extends HTMLButtonElement {

        static get extends() { return 'button'; }

        constructor () {
            super(...arguments);
            console.log('constructor');
        }

        connectedCallback () {
            console.log('connectedCallback');
        }
    }

    customElements.define('super-button', SuperButton, {extends: 'button'});

    console.log('defined...');

}());