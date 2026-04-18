// /api/chat.js
import { AgentsClient } from "@microsoft/agents-sdk";
import { ClientSecretCredential } from "@azure/identity";

export default async function handler(req, res) {
  try {
    const { message, sessionId } = JSON.parse(req.body);

    // 1. Authenticate with Entra ID
    const credential = new ClientSecretCredential(
      process.env.M365_TENANT_ID,
      process.env.M365_CLIENT_ID,
      process.env.M365_CLIENT_SECRET
    );

    // 2. Create Agents SDK client
    const client = new AgentsClient(credential);

    // 3. Call your Copilot Agent
    const response = await client.agents.invoke({
      agentId: process.env.M365_AGENT_ID,
      sessionId: sessionId || "default-session",
      input: message
    });

    // 4. Return the agent response to the frontend
    res.status(200).json({
      ok: true,
      reply: response.outputText,
      raw: response
    });

  } catch (err) {
    console.error("Agent error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
}
