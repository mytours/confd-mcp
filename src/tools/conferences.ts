import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { ConfdClient } from "../client.js";

export function registerConferenceTools(
  server: McpServer,
  client: ConfdClient
) {
  server.tool(
    "list_conferences",
    "Search and filter conferences. Supports name search, country code, organization, tag, and scope (upcoming/past) filters. Returns paginated results.",
    {
      query: z
        .string()
        .optional()
        .describe("Search conferences by name (partial match)"),
      country_code: z
        .string()
        .optional()
        .describe("Filter by ISO 3166-1 alpha-2 country code (e.g. NZ, US)"),
      organization_id: z
        .number()
        .optional()
        .describe("Filter by organization ID"),
      tag: z.string().optional().describe("Filter by tag"),
      scope: z
        .string()
        .optional()
        .describe(
          "Filter by time scope: upcoming (future conferences), past (past conferences). Omit for all."
        ),
      page: z.number().optional().describe("Page number (default: 1)"),
    },
    async (params) => {
      const result = await client.listConferences(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "get_conference",
    "Get a single conference by ID. Returns 404 if the conference is discarded or does not exist.",
    {
      id: z.number().describe("Conference ID"),
    },
    async ({ id }) => {
      const result = await client.getConference(id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "create_conference",
    "Create a new conference. Name, start_date, and end_date are required. Can include venue, location, URLs, contact info, social media, tags, and more.",
    {
      name: z.string().describe("Conference name (required)"),
      start_date: z
        .string()
        .describe("Start date in YYYY-MM-DD format (required)"),
      end_date: z
        .string()
        .describe("End date in YYYY-MM-DD format (required)"),
      description: z.string().optional().describe("Conference description"),
      website_url: z
        .string()
        .optional()
        .describe("Conference website URL (must be https://)"),
      registration_url: z
        .string()
        .optional()
        .describe("Registration page URL (must be https://)"),
      cfp_deadline: z
        .string()
        .optional()
        .describe("Call for papers deadline in YYYY-MM-DD format"),
      venue_name: z.string().optional().describe("Venue name"),
      attendance_size: z
        .number()
        .optional()
        .describe("Expected attendance size"),
      registration_fee: z
        .string()
        .optional()
        .describe("Registration fee (free text, e.g. '$500', 'Free')"),
      organization_id: z
        .number()
        .optional()
        .describe("ID of the organizing organization"),
      email: z.string().optional().describe("Contact email"),
      phone: z.string().optional().describe("Phone number"),
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
        .describe("Comma-separated tags (e.g. 'digital, heritage')"),
    },
    async (params) => {
      const result = await client.createConference(params);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "update_conference",
    "Update an existing conference by ID. Only include fields you want to change.",
    {
      id: z.number().describe("Conference ID"),
      name: z.string().optional().describe("Conference name"),
      start_date: z
        .string()
        .optional()
        .describe("Start date in YYYY-MM-DD format"),
      end_date: z
        .string()
        .optional()
        .describe("End date in YYYY-MM-DD format"),
      description: z.string().optional().describe("Conference description"),
      website_url: z
        .string()
        .optional()
        .describe("Conference website URL (must be https://)"),
      registration_url: z
        .string()
        .optional()
        .describe("Registration page URL (must be https://)"),
      cfp_deadline: z
        .string()
        .optional()
        .describe("Call for papers deadline in YYYY-MM-DD format"),
      venue_name: z.string().optional().describe("Venue name"),
      attendance_size: z
        .number()
        .optional()
        .describe("Expected attendance size"),
      registration_fee: z
        .string()
        .optional()
        .describe("Registration fee (free text, e.g. '$500', 'Free')"),
      organization_id: z
        .number()
        .optional()
        .describe("ID of the organizing organization"),
      email: z.string().optional().describe("Contact email"),
      phone: z.string().optional().describe("Phone number"),
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
        .describe("Comma-separated tags (e.g. 'digital, heritage')"),
    },
    async ({ id, ...data }) => {
      const result = await client.updateConference(id, data);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "upload_conference_logo",
    "Upload a logo image for a conference. Provide exactly one of: url (fetch from URL), base64 (base64-encoded image data), or file_path (local file path). Accepts png, jpeg, webp, gif up to 5MB.",
    {
      conference_id: z.number().describe("Conference ID"),
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
    async ({ conference_id, ...input }) => {
      const result = await client.uploadConferenceLogo(conference_id, input);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "delete_conference_logo",
    "Remove the logo from a conference.",
    {
      conference_id: z.number().describe("Conference ID"),
    },
    async ({ conference_id }) => {
      const result = await client.deleteConferenceLogo(conference_id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "upload_conference_cover_image",
    "Upload a cover image for a conference. Displayed as the hero banner background. Provide exactly one of: url, base64, or file_path. Accepts png, jpeg, webp, gif up to 10MB.",
    {
      conference_id: z.number().describe("Conference ID"),
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
    async ({ conference_id, ...input }) => {
      const result = await client.uploadConferenceCoverImage(
        conference_id,
        input
      );
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.tool(
    "delete_conference_cover_image",
    "Remove the cover image from a conference.",
    {
      conference_id: z.number().describe("Conference ID"),
    },
    async ({ conference_id }) => {
      const result = await client.deleteConferenceCoverImage(conference_id);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
