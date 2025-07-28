import React, { useState, useEffect } from "react";
import { Desktop } from "@wxcc-desktop/sdk";

interface Props {
  agentid: string;
  agentname?: string;
  isDarkMode?: boolean;
}

const WxccWhatsapp: React.FC<Props> = ({
  agentid,
  agentname,
  isDarkMode = false,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSend = async () => {
    if (phoneNumber.trim() === "") {
      setError("El número no puede estar vacío.");
      return;
    }
    if (!/^\d+$/.test(phoneNumber)) {
      setError("Solo se permiten dígitos numéricos.");
      return;
    }
    if (phoneNumber.length !== 8) {
      setError("El número debe contener 8 dígitos.");
      return;
    }

    setError("");
    setIsSending(true);

    const payload = {
      phone: `+506${phoneNumber}`,
      agentName: agentname ?? "Desconocido",
      agentId: agentid,
    };

    try {
      const response = await fetch(
        "https://hooks.us.webexconnect.io/events/LMJ8UP7ZB1",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      setPhoneNumber("");
      setSuccess("Mensaje enviado correctamente.");
    } catch (err) {
      console.error("Error al enviar webhook:", err);
      setError("Error al enviar el mensaje. Intente de nuevo.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from {opacity: 0;}
            to {opacity: 1;}
          }
          .fade-in {
            animation: fadeIn 0.5s ease forwards;
          }
          .button-hover {
            transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.3s ease;
            background-color: #3a63b9;
            color: white;
            font-size: 1.2rem;
            font-weight: bold;
            padding: 0.7rem 1.5rem;
            border-radius: 12px;
            cursor: pointer;
            display: block;
            margin: 0 auto;
            min-width: 140px;
            border: none;
            outline: none;
          }
          .button-hover:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(58, 99, 185, 0.6);
            background-color: #5478d4;
          }
          .spinner {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #3a63b9;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            animation: spin 1s linear infinite;
            margin: 0 auto;
          }
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
          .input-container {
            position: relative;
            width: 100%;
          }
          input {
            padding: 0.45rem 0.75rem;
            border-radius: 8px;
            border: none;
            font-size: 0.95rem;
            width: 100%;
            background: white;
            outline: none;
          }
          label.placeholder-label {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: #888;
            pointer-events: none;
            transition: all 0.3s ease;
            font-size: 0.95rem;
            user-select: none;
          }
          input:focus + label.placeholder-label,
          input:not(:placeholder-shown) + label.placeholder-label {
            top: -8px;
            font-size: 0.75rem;
            color: #3a63b9;
            background: white;
            padding: 0 4px;
          }
          .code-prefix {
            padding: 0.45rem 0.75rem;
            font-size: 0.95rem;
            display: flex;
            align-items: center;
            background-color: #e5e7eb;
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
            user-select: none;
          }
          .input-wrapper {
            display: flex;
            width: 100%;
            border-radius: 8px;
            overflow: hidden;
            background: #f3f4f6;
          }
          .agent-info-box {
            background-color: #f3f4f6;
            padding: 0.45rem 0.75rem;
            border-radius: 8px;
            font-size: 0.95rem;
          }
        `}
      </style>

      <div
        style={{
          fontFamily: "Arial, sans-serif",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: isDarkMode ? "#121212" : "#f0f2f5",
          color: isDarkMode ? "#eee" : "#000",
          paddingTop: "6vh",
          transition: "background-color 0.3s ease",
        }}
      >
        <div
          className="fade-in"
          style={{
            background: "#fffbe6",
            padding: "1.2rem 1.5rem",
            borderRadius: "16px",
            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)",
            width: "100%",
            maxWidth: "420px",
            textAlign: "left",
            transition: "box-shadow 0.3s ease",
            color: "#000",
          }}
        >
          {/* Título */}
          <h1
            style={{
              color: "#3a63b9",
              fontSize: "1.6rem",
              marginBottom: "1.2rem",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Enviar mensaje de WhatsApp
          </h1>

          {/* Número de teléfono */}
          <div style={{ marginBottom: "1.2rem" }}>
            <label
              style={{
                fontWeight: "bold",
                fontSize: "1rem",
                marginBottom: "0.4rem",
                display: "block",
              }}
            >
              Número de teléfono
            </label>
            <div className="input-wrapper">
              <span className="code-prefix">+506</span>
              <div className="input-container">
                <input
                  type="text"
                  id="phone-input"
                  placeholder=" "
                  value={phoneNumber}
                  onChange={(e) => {
                    // Limitar solo a números:
                    if (/^\d*$/.test(e.target.value)) {
                      setPhoneNumber(e.target.value);
                    }
                  }}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  maxLength={8}
                  autoComplete="off"
                />
                <label htmlFor="phone-input" className="placeholder-label">
                  Ingrese número
                </label>
              </div>
            </div>
          </div>

          {/* Nombre del agente */}
          <div style={{ marginBottom: "1.2rem" }}>
            <label
              style={{
                fontWeight: "bold",
                fontSize: "1rem",
                marginBottom: "0.4rem",
                display: "block",
              }}
            >
              Nombre del agente:
            </label>
            <div className="agent-info-box">{agentname ?? "Cargando nombre..."}</div>
          </div>

          {/* ID del agente */}
          <div style={{ marginBottom: "1.2rem" }}>
            <label
              style={{
                fontWeight: "bold",
                fontSize: "1rem",
                marginBottom: "0.4rem",
                display: "block",
              }}
            >
              ID del agente:
            </label>
            <div className="agent-info-box">{agentid}</div>
          </div>

          {/* Mensajes de error y éxito */}
          {error && (
            <div
              style={{
                marginBottom: "1rem",
                color: "red",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}
          {success && (
            <div
              style={{
                marginBottom: "1rem",
                color: "green",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {success}
            </div>
          )}

          {/* Botón enviar */}
          {isSending ? (
            <div className="spinner" aria-label="Enviando..."></div>
          ) : (
            <button className="button-hover" onClick={handleSend} disabled={isSending}>
              Enviar mensaje
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default WxccWhatsapp;