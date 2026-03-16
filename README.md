# @stqry/confd-mcp

MCP server for the [ConFd](https://github.com/mytours/confd) museums, organizations, and conferences API.

## Install

```bash
npm install -g @stqry/confd-mcp
```

You'll need a ConFd API key. Set these environment variables:

```bash
export CONFD_API_URL="https://confd.stqry.com/api/v1"
export CONFD_API_KEY="your-api-key"
```

## Setup

### Claude Code

```bash
claude mcp add confd -- npx -y @stqry/confd-mcp
```

Then set the environment variables in your shell before launching Claude Code, or add them to your shell profile.

### Claude Desktop

Add to your config file:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "confd": {
      "command": "npx",
      "args": ["-y", "@stqry/confd-mcp"],
      "env": {
        "CONFD_API_URL": "https://confd.stqry.com/api/v1",
        "CONFD_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json` in your project or `~/.cursor/mcp.json` globally:

```json
{
  "mcpServers": {
    "confd": {
      "command": "npx",
      "args": ["-y", "@stqry/confd-mcp"],
      "env": {
        "CONFD_API_URL": "https://confd.stqry.com/api/v1",
        "CONFD_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Windsurf

Add to `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "confd": {
      "command": "npx",
      "args": ["-y", "@stqry/confd-mcp"],
      "env": {
        "CONFD_API_URL": "https://confd.stqry.com/api/v1",
        "CONFD_API_KEY": "your-api-key"
      }
    }
  }
}
```

## Tools (18)

### Museums

| Tool | Description |
|------|-------------|
| `list_museums` | Search and filter museums by name, country, source, tag, published/discarded status |
| `get_museum` | Get a museum by ID |
| `create_museum` | Create a new museum |
| `update_museum` | Update a museum by ID |
| `upsert_museum` | Create or update a museum by source identifier |
| `upload_museum_logo` | Upload a logo (from URL, base64, or file path) |
| `delete_museum_logo` | Remove a museum's logo |

### Organizations

| Tool | Description |
|------|-------------|
| `list_organizations` | Search and filter organizations |
| `get_organization` | Get an organization by ID |
| `create_organization` | Create a new organization |
| `update_organization` | Update an organization by ID |
| `upsert_organization` | Create or update by source identifier |
| `upload_organization_logo` | Upload a logo |
| `delete_organization_logo` | Remove an organization's logo |

### Conferences

| Tool | Description |
|------|-------------|
| `list_conferences` | Search and filter conferences by name, country, organization, tag, scope (upcoming/past) |
| `get_conference` | Get a conference by ID |
| `create_conference` | Create a new conference with dates, venue, registration info |
| `update_conference` | Update a conference by ID |

## Development

```bash
npm install
npm run dev    # Watch mode
npm run build  # Production build
npm start      # Run the server
```
