import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { ConfdClient } from "../client.js";

export function registerMuseumTools(server: McpServer, client: ConfdClient) {
  server.tool(
    "list_museums",
    "Search and filter museums. Supports name search, country code, source identifier, tag, published status, and discarded status filters. Returns paginated results.",
    {
      query: z
        .string()
        .optional()
        .describe("Search museums by name (partial match)"),
      country_code: z
        .string()
        .optional()
        .describe("Filter by ISO 3166-1 alpha-2 country code (e.g. NZ, US)"),
      source: z
        .string()
        .optional()
        .describe("Filter by exact source identifier"),
      tag: z.string().optional().describe("Filter by tag"),
      published: z
        .string()
        .optional()
        .describe("Filter by published status (true/false)"),
      discarded: z
        .string()
        .optional()
        .describe(
          "Filter discarded records: false (default, kept only), true (discarded only), all (both)"
        ),
      page: z.number().optional().describe("Page number (default: 1)"),
    },
    async (params) => {
      const result = await client.listMuseums(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "get_museum",
    "Get a single museum by ID. If the museum was merged into another record, returns the merged_into ID.",
    {
      id: z.number().describe("Museum ID"),
    },
    async ({ id }) => {
      const result = await client.getMuseum(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "create_museum",
    "Create a new museum. Name is required. Can include contact info, address, social media, tags, and more.",
    {
      name: z.string().describe("Museum name (required)"),
      description: z.string().optional().describe("Museum description"),
      email: z.string().optional().describe("Contact email"),
      phone: z.string().optional().describe("Phone number"),
      website: z.string().optional().describe("Website URL (must be https://)"),
      address_line1: z.string().optional().describe("Street address line 1"),
      address_line2: z.string().optional().describe("Street address line 2"),
      locality: z.string().optional().describe("City/town"),
      administrative_area: z
        .string()
        .optional()
        .describe("State/province/region"),
      postal_code: z.string().optional().describe("Postal/ZIP code"),
      country_code: z
        .string()
        .optional()
        .describe("ISO 3166-1 alpha-2 country code"),
      lat: z.number().optional().describe("Latitude"),
      lng: z.number().optional().describe("Longitude"),
      source: z
        .string()
        .optional()
        .describe("External source identifier (must be unique)"),
      published: z.boolean().optional().describe("Published status"),
      facebook: z.string().optional().describe("Facebook URL"),
      instagram: z.string().optional().describe("Instagram URL"),
      twitter: z.string().optional().describe("Twitter/X URL"),
      linked_in: z.string().optional().describe("LinkedIn URL"),
      youtube: z.string().optional().describe("YouTube URL"),
      threads: z.string().optional().describe("Threads URL"),
      tiktok: z.string().optional().describe("TikTok URL"),
      tag_list: z
        .string()
        .optional()
        .describe("Comma-separated tags (e.g. 'history, art')"),
    },
    async (params) => {
      const result = await client.createMuseum(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "update_museum",
    "Update an existing museum by ID. Only include fields you want to change. Works even if do_not_import is set.",
    {
      id: z.number().describe("Museum ID"),
      name: z.string().optional().describe("Museum name"),
      description: z.string().optional().describe("Museum description"),
      email: z.string().optional().describe("Contact email"),
      phone: z.string().optional().describe("Phone number"),
      website: z.string().optional().describe("Website URL (must be https://)"),
      address_line1: z.string().optional().describe("Street address line 1"),
      address_line2: z.string().optional().describe("Street address line 2"),
      locality: z.string().optional().describe("City/town"),
      administrative_area: z
        .string()
        .optional()
        .describe("State/province/region"),
      postal_code: z.string().optional().describe("Postal/ZIP code"),
      country_code: z
        .string()
        .optional()
        .describe("ISO 3166-1 alpha-2 country code"),
      lat: z.number().optional().describe("Latitude"),
      lng: z.number().optional().describe("Longitude"),
      source: z.string().optional().describe("External source identifier"),
      published: z.boolean().optional().describe("Published status"),
      facebook: z.string().optional().describe("Facebook URL"),
      instagram: z.string().optional().describe("Instagram URL"),
      twitter: z.string().optional().describe("Twitter/X URL"),
      linked_in: z.string().optional().describe("LinkedIn URL"),
      youtube: z.string().optional().describe("YouTube URL"),
      threads: z.string().optional().describe("Threads URL"),
      tiktok: z.string().optional().describe("TikTok URL"),
      tag_list: z
        .string()
        .optional()
        .describe("Comma-separated tags (e.g. 'history, art')"),
    },
    async ({ id, ...data }) => {
      const result = await client.updateMuseum(id, data);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "upsert_museum",
    "Create or update a museum by source identifier. If a museum with the given source exists, it is updated. If not, a new one is created. Source is required. Will be rejected if the existing record has do_not_import set.",
    {
      name: z.string().optional().describe("Museum name (required for new records)"),
      source: z.string().describe("Source identifier (required, used as the lookup key)"),
      description: z.string().optional().describe("Museum description"),
      email: z.string().optional().describe("Contact email"),
      phone: z.string().optional().describe("Phone number"),
      website: z.string().optional().describe("Website URL (must be https://)"),
      address_line1: z.string().optional().describe("Street address line 1"),
      address_line2: z.string().optional().describe("Street address line 2"),
      locality: z.string().optional().describe("City/town"),
      administrative_area: z
        .string()
        .optional()
        .describe("State/province/region"),
      postal_code: z.string().optional().describe("Postal/ZIP code"),
      country_code: z
        .string()
        .optional()
        .describe("ISO 3166-1 alpha-2 country code"),
      lat: z.number().optional().describe("Latitude"),
      lng: z.number().optional().describe("Longitude"),
      published: z.boolean().optional().describe("Published status"),
      facebook: z.string().optional().describe("Facebook URL"),
      instagram: z.string().optional().describe("Instagram URL"),
      twitter: z.string().optional().describe("Twitter/X URL"),
      linked_in: z.string().optional().describe("LinkedIn URL"),
      youtube: z.string().optional().describe("YouTube URL"),
      threads: z.string().optional().describe("Threads URL"),
      tiktok: z.string().optional().describe("TikTok URL"),
      tag_list: z
        .string()
        .optional()
        .describe("Comma-separated tags (e.g. 'history, art')"),
    },
    async (params) => {
      const result = await client.upsertMuseum(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "upload_museum_logo",
    "Upload a logo image for a museum. Provide exactly one of: url (fetch from URL), base64 (base64-encoded image data), or file_path (local file path). Accepts png, jpeg, webp, gif up to 5MB.",
    {
      museum_id: z.number().describe("Museum ID"),
      url: z.string().optional().describe("URL to fetch the image from"),
      base64: z
        .string()
        .optional()
        .describe("Base64-encoded image data"),
      file_path: z
        .string()
        .optional()
        .describe("Local file path to the image"),
      filename: z
        .string()
        .optional()
        .describe("Filename for the uploaded image"),
      content_type: z
        .string()
        .optional()
        .describe(
          "MIME type (required for base64, optional for url/file_path). e.g. image/png"
        ),
    },
    async ({ museum_id, ...input }) => {
      const result = await client.uploadMuseumLogo(museum_id, input);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "delete_museum_logo",
    "Remove the logo from a museum.",
    {
      museum_id: z.number().describe("Museum ID"),
    },
    async ({ museum_id }) => {
      const result = await client.deleteMuseumLogo(museum_id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
