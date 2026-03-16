# confd-mcp

MCP server for the [ConFd](https://github.com/mytours/confd) museums and organizations API.

## Setup

```bash
npm install
npm run build
```

## Configuration

Set two environment variables:

```bash
export CONFD_API_URL="https://confd.stqry.com/api/v1"
export CONFD_API_KEY="your-api-key"
```

## Usage with Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "confd": {
      "command": "node",
      "args": ["/path/to/confd-mcp/dist/index.js"],
      "env": {
        "CONFD_API_URL": "https://confd.stqry.com/api/v1",
        "CONFD_API_KEY": "your-api-key"
      }
    }
  }
}
```

## Usage with Claude Code

Add to your Claude Code settings:

```bash
claude mcp add confd -- node /path/to/confd-mcp/dist/index.js
```

Then set the environment variables in your shell.

## Tools (16)

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

## Development

```bash
npm run dev    # Watch mode
npm run build  # Production build
npm start      # Run the server
```
