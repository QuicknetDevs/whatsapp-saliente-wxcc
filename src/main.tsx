import React from "react";
import ReactDOM from "react-dom/client";
import WxccWhatsapp from "./components/WxccWhatsapp";

class WxccWhatsappElement extends HTMLElement {
  connectedCallback() {
    const root = this.attachShadow({ mode: "open" });
    const container = document.createElement("div");
    root.appendChild(container);
    ReactDOM.createRoot(container).render(<WxccWhatsapp />);
  }
}

customElements.define("wxcc-whatsapp", WxccWhatsappElement);