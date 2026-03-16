import { readFile } from "node:fs/promises";
import { extname } from "node:path";
import type {
  Museum,
  Organization,
  MuseumInput,
  OrganizationInput,
  PaginatedResponse,
} from "./types.js";

const MIME_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

const ALLOWED_CONTENT_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export interface ListMuseumsParams {
  query?: string;
  country_code?: string;
  source?: string;
  tag?: string;
  published?: string;
  discarded?: string;
  page?: number;
}

export interface ListOrganizationsParams {
  query?: string;
  country_code?: string;
  source?: string;
  tag?: string;
  discarded?: string;
  page?: number;
}

export interface LogoUploadInput {
  url?: string;
  base64?: string;
  file_path?: string;
  filename?: string;
  content_type?: string;
}

export class ConfdClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.apiKey = apiKey;
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.apiKey}`,
    };

    const init: RequestInit = { method, headers };

    if (body) {
      headers["Content-Type"] = "application/json";
      init.body = JSON.stringify(body);
    }

    const response = await fetch(url, init);
    const json = await response.json();

    if (response.status === 401) {
      throw new Error(
        `Unauthorized: ${json.message || "Invalid or missing API key"}`
      );
    }
    if (response.status === 404) {
      throw new Error(`Not found: ${path}`);
    }

    // Return as-is for 301 (merged), 422 (validation errors), and 2xx
    return json as T;
  }

  private buildQuery(params: object): string {
    const entries = Object.entries(params as Record<string, unknown>);
    const searchParams = new URLSearchParams();
    for (const [key, value] of entries) {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.set(key, String(value));
      }
    }
    const qs = searchParams.toString();
    return qs ? `?${qs}` : "";
  }

  // --- Museums ---

  async listMuseums(
    params: ListMuseumsParams = {}
  ): Promise<PaginatedResponse<Museum>> {
    return this.request("GET", `/museums${this.buildQuery(params)}`);
  }

  async getMuseum(id: number): Promise<Museum> {
    return this.request("GET", `/museums/${id}`);
  }

  async createMuseum(data: MuseumInput): Promise<Museum> {
    return this.request("POST", "/museums", { museum: data });
  }

  async updateMuseum(id: number, data: MuseumInput): Promise<Museum> {
    return this.request("PATCH", `/museums/${id}`, { museum: data });
  }

  async upsertMuseum(data: MuseumInput): Promise<Museum> {
    return this.request("PUT", "/museums/upsert", { museum: data });
  }

  async uploadMuseumLogo(
    museumId: number,
    input: LogoUploadInput
  ): Promise<Museum> {
    return this.uploadLogo(`/museums/${museumId}/logo`, input);
  }

  async deleteMuseumLogo(museumId: number): Promise<Museum> {
    return this.request("DELETE", `/museums/${museumId}/logo`);
  }

  // --- Organizations ---

  async listOrganizations(
    params: ListOrganizationsParams = {}
  ): Promise<PaginatedResponse<Organization>> {
    return this.request("GET", `/organizations${this.buildQuery(params)}`);
  }

  async getOrganization(id: number): Promise<Organization> {
    return this.request("GET", `/organizations/${id}`);
  }

  async createOrganization(data: OrganizationInput): Promise<Organization> {
    return this.request("POST", "/organizations", { organization: data });
  }

  async updateOrganization(
    id: number,
    data: OrganizationInput
  ): Promise<Organization> {
    return this.request("PATCH", `/organizations/${id}`, {
      organization: data,
    });
  }

  async upsertOrganization(data: OrganizationInput): Promise<Organization> {
    return this.request("PUT", "/organizations/upsert", {
      organization: data,
    });
  }

  async uploadOrganizationLogo(
    organizationId: number,
    input: LogoUploadInput
  ): Promise<Organization> {
    return this.uploadLogo(
      `/organizations/${organizationId}/logo`,
      input
    );
  }

  async deleteOrganizationLogo(organizationId: number): Promise<Organization> {
    return this.request("DELETE", `/organizations/${organizationId}/logo`);
  }

  // --- Logo upload ---

  private async uploadLogo<T>(path: string, input: LogoUploadInput): Promise<T> {
    const sources = [input.url, input.base64, input.file_path].filter(Boolean);
    if (sources.length !== 1) {
      throw new Error(
        "Exactly one of url, base64, or file_path must be provided"
      );
    }

    let buffer: Buffer;
    let contentType: string;
    let filename: string;

    if (input.url) {
      const response = await fetch(input.url);
      if (!response.ok) {
        throw new Error(`Failed to fetch image from URL: ${response.status}`);
      }
      buffer = Buffer.from(await response.arrayBuffer());
      contentType =
        input.content_type ||
        response.headers.get("content-type") ||
        "image/png";
      filename = input.filename || input.url.split("/").pop() || "logo.png";
    } else if (input.base64) {
      if (!input.content_type) {
        throw new Error("content_type is required when using base64 input");
      }
      buffer = Buffer.from(input.base64, "base64");
      contentType = input.content_type;
      filename = input.filename || "logo.png";
    } else if (input.file_path) {
      buffer = await readFile(input.file_path);
      const ext = extname(input.file_path).toLowerCase();
      contentType = input.content_type || MIME_TYPES[ext] || "image/png";
      filename =
        input.filename || input.file_path.split("/").pop() || "logo.png";
    } else {
      throw new Error("No image source provided");
    }

    if (!ALLOWED_CONTENT_TYPES.includes(contentType)) {
      throw new Error(
        `Invalid content type: ${contentType}. Allowed: ${ALLOWED_CONTENT_TYPES.join(", ")}`
      );
    }

    if (buffer.length > MAX_FILE_SIZE) {
      throw new Error(
        `File too large: ${(buffer.length / 1024 / 1024).toFixed(1)}MB. Maximum: 5MB`
      );
    }

    const formData = new FormData();
    const blob = new Blob([new Uint8Array(buffer)], { type: contentType });
    formData.append("logo", blob, filename);

    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: formData,
    });

    const json = await response.json();

    if (response.status === 401) {
      throw new Error("Unauthorized: Invalid or missing API key");
    }
    if (response.status === 404) {
      throw new Error(`Not found: ${path}`);
    }

    return json as T;
  }
}
