import React from "react";
import ReactDOM from "react-dom/client";
import WxccWhatsapp from "./components/WxccWhatsapp";

customElements.define("wxcc-whatsapp", class extends HTMLElement {
  static get observedAttributes() {
    return ["agentid", "agentname", "isdarkmode"];
  }

  connectedCallback() {
    this.renderComponent();
  }

  attributeChangedCallback() {
    this.renderComponent();
  }

  renderComponent() {
    const agentid = this.getAttribute("agentid") || "Cargando...";
    const agentname = this.getAttribute("agentname") || "Cargando...";

    // Los atributos HTML siempre son string o null, convertimos "true"/"false" a booleano
    const isDarkModeAttr = this.getAttribute("isdarkmode") || "false";
    const isDarkMode = isDarkModeAttr.toLowerCase() === "true";

    const mountPoint = this.querySelector("div") || document.createElement("div");
    if (!mountPoint.isConnected) this.appendChild(mountPoint);

    const root = ReactDOM.createRoot(mountPoint);
    root.render(
      <WxccWhatsapp
        agentid={agentid}
        agentname={agentname}
        isDarkMode={isDarkMode}
      />
    );
  }
});
