import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

class Controller {
    constructor(host){
        this.host=host;
    }
    mount = (atElement) =>{ this.root = atElement; this.element=ReactDOM.render(<App />, document.getElementById(this.root))};
    unmount = () => ReactDOM.unmountComponentAtNode(document.getElementById(this.root));
    send= value => this.element.receive(value);
}

const factory = (host) => new Controller();
window.dispatchEvent(new CustomEvent("root", { detail: factory }))