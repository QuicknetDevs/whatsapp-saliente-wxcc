import React, { useEffect, useState } from "react";

interface AgentProfile {
  agentId: string;
  firstName: string;
  lastName: string;
}

const WxccWhatsapp = () => {
  const [agent, setAgent] = useState<AgentProfile | null>(null);

  useEffect(() => {
    const sdk = (window as any).Desktop;

    if (sdk?.agent?.getAgent) {
      sdk.agent.getAgent()
        .then((agentData: AgentProfile) => {
          console.log("✅ Agente cargado:", agentData);
          setAgent(agentData);
        })
        .catch((err: any) => {
          console.error("❌ Error al obtener el agente:", err);
        });
    } else {
      console.warn("⚠️ SDK de WxCC no disponible aún.");
    }
  }, []);

  return (
    <div>
      <h3>Widget WhatsApp</h3>
      {agent ? (
        <p>Agente: {agent.firstName} {agent.lastName}</p>
      ) : (
        <p>Cargando agente...</p>
      )}
    </div>
  );
};

export default WxccWhatsapp;