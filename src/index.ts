#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ConfdClient } from "./client.js";
import { registerMuseumTools } from "./tools/museums.js";
import { registerOrganizationTools } from "./tools/organizations.js";

const apiUrl = process.env.CONFD_API_URL;
const apiKey = process.env.CONFD_API_KEY;

if (!apiUrl || !apiKey) {
  console.error(
    "Error: CONFD_API_URL and CONFD_API_KEY environment variables are required."
  );
  console.error("Example:");
  console.error('  export CONFD_API_URL="https://confd.stqry.com/api/v1"');
  console.error('  export CONFD_API_KEY="your-api-key"');
  process.exit(1);
}

const client = new ConfdClient(apiUrl, apiKey);

const server = new McpServer({
  name: "confd",
  version: "1.0.0",
});

registerMuseumTools(server, client);
registerOrganizationTools(server, client);

const transport = new StdioServerTransport();
await server.connect(transport);
