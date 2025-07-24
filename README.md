Playwright MCP
A Model Context Protocol (MCP) server that provides browser automation capabilities using Playwright. This server enables LLMs to interact with web pages through structured accessibility snapshots, bypassing the need for screenshots or visually-tuned models.

Key Features
Fast and lightweight. Uses Playwright's accessibility tree, not pixel-based input.
LLM-friendly. No vision models needed, operates purely on structured data.
Deterministic tool application. Avoids ambiguity common with screenshot-based approaches.
Requirements
Node.js 18 or newer
VS Code, Cursor, Windsurf, Claude Desktop, Goose or any other MCP client
Getting started
First, install the Playwright MCP server with your client.

Standard config works in most of the tools:

{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest"
      ]
    }
  }
}
Install in VS Code Install in VS Code Insiders

Claude Code
Claude Desktop
Cursor
Gemini CLI
Goose
LM Studio
Qodo Gen
VS Code
Windsurf
