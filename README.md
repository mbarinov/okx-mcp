# OKX MCP Server

A Model Context Protocol (MCP) server that provides access to OKX trading and portfolio management functionality. This package allows AI assistants to interact with your OKX account to retrieve portfolio information, trading positions, order history, and more.

## Quick Start

### Using npx (Recommended)

The fastest way to get started is using npx:

```bash
npx okx-mcp
```

### Installation

```bash
npm install -g okx-mcp
```

Then run:

```bash
okx-mcp
```

## Setup

Before using this MCP server, you need to configure your OKX API credentials:

1. **Get OKX API Credentials**: Log into your OKX account and create API credentials with the following permissions:
   - Read access to account information
   - Read access to trading data

2. **Set Environment Variables**: Create a `.env` file in your working directory or set the following environment variables:

```bash
OKX_API_KEY=your_api_key_here
OKX_API_SECRET=your_api_secret_here
OKX_API_PASSPHRASE=your_api_passphrase_here
```

⚠️ **Security Note**: Never commit your API credentials to version control. Keep your `.env` file private and secure.

## Available Tools

This MCP server provides the following tools for AI assistants:

### 1. Get Account Summary
- **Tool**: `get_account_summary`
- **Description**: Get aggregated portfolio metrics including total value and asset allocation
- **Parameters**: None

### 2. Get Portfolio
- **Tool**: `get_portfolio`
- **Description**: Get detailed information about all assets in your account
- **Parameters**: None
- **Returns**: List of currencies with balances, available amounts, and USDT values

### 3. Get Positions
- **Tool**: `get_positions`
- **Description**: Get all open derivative trading positions
- **Parameters**: None
- **Returns**: Position details including size, entry price, and unrealized P&L

### 4. Get Open Orders
- **Tool**: `get_open_orders`
- **Description**: Get all currently open trading orders
- **Parameters**: None
- **Returns**: Order details including symbol, type, price, and status

### 5. Get Order History
- **Tool**: `get_order_history`
- **Description**: Get historical filled orders for analysis
- **Parameters**:
  - `instId` (required): Instrument ID (e.g., "BTC-USDT")
  - `begin` (optional): Start timestamp
  - `end` (optional): End timestamp
- **Returns**: Historical order data with execution details

## Usage with Claude Desktop

To use this MCP server with Claude Desktop, add the following configuration to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "okx-mcp": {
      "command": "npx",
      "args": ["okx-mcp"],
      "env": {
        "OKX_API_KEY": "your_api_key_here",
        "OKX_API_SECRET": "your_api_secret_here",
        "OKX_API_PASSPHRASE": "your_api_passphrase_here"
      }
    }
  }
}
```

## Development

### Local Development

```bash
# Clone the repository
git clone https://github.com/maxbarinov/okx-mcp.git
cd okx-mcp

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your OKX API credentials

# Run in development mode
npm run dev
```

### Building

```bash
npm run build
```

### Project Structure

```
src/
├── services/
│   └── okxApiClient.ts    # OKX API client wrapper
└── tools/                # MCP tool implementations
    ├── get_account_summary.ts
    ├── get_portfolio.ts
    ├── get_positions.ts
    ├── get_open_orders.ts
    └── get_order_history.ts
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Security Considerations

- **API Permissions**: Only grant the minimum necessary permissions to your OKX API keys
- **Environment Variables**: Never hardcode API credentials in your code
- **Network Security**: This MCP server only makes read-only API calls to OKX
- **Data Handling**: All data is processed locally and not stored persistently

## License

MIT

## Support

If you encounter any issues or have questions:

1. Check the [GitHub Issues](https://github.com/maxbarinov/okx-mcp/issues)
2. Create a new issue with detailed information about your problem
3. Include your environment details and error messages (without sensitive data)

## Related Projects

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [xmcp Framework](https://xmcp.dev/)
- [OKX API Documentation](https://www.okx.com/docs-v5/en/)
