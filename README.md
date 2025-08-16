# OKX MCP Server

[![npm version](https://img.shields.io/npm/v/okx-mcp.svg)](https://www.npmjs.com/package/okx-mcp)
[![Downloads](https://img.shields.io/npm/dm/okx-mcp.svg)](https://www.npmjs.com/package/okx-mcp)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/node/v/okx-mcp.svg)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org)

A Model Context Protocol (MCP) server that provides access to OKX trading and portfolio management functionality. This package allows AI assistants to interact with your OKX account to retrieve portfolio information, trading positions, order history, and more.

**This MCP server is designed with security as a top priority.** Here's what makes it safe to use:

### 🔒 **Built-in Security Features**
- **Read-Only Access**: The server only requires read permissions - it cannot place trades or withdraw funds
- **Local Processing**: All data is processed locally on your machine and never stored or transmitted to third parties
- **No Data Persistence**: Your trading data is never saved to disk or cached permanently
- **Direct API Communication**: Connects directly to OKX APIs without intermediary servers

## What You Can Do

**Transform your trading experience with AI-powered portfolio insights.** Once configured, you can ask Claude natural language questions about your OKX account:

### 💰 **Portfolio Management**
- *"What's my current portfolio balance?"*
- *"Show me my asset allocation"*
- *"Which coins do I own and how much are they worth?"*
- *"What's my biggest position by value?"*

### 📊 **Trading Analysis** 
- *"Show me my open positions with P&L"*
- *"What orders do I have pending?"*
- *"Analyze my BTC trading history from last month"*
- *"How did my ETH trades perform this week?"*

### 🎯 **Smart Insights**
- *"What's my total unrealized profit/loss?"*
- *"Which assets have gained the most value?"*
- *"Give me a summary of my trading activity"*
- *"How is my portfolio performing today?"*

### 🔍 **Detailed Reporting**
- *"Create a detailed report of my portfolio"*
- *"Show me all my completed trades for BTC-USDT"*
- *"What's my trading volume for this month?"*
- *"Break down my portfolio by percentage"*

**The AI can provide instant analysis, generate insights, and help you make informed trading decisions—all through simple conversation.**

## Quick Start

### Step 1: Create OKX API Credentials

1. **Access Your OKX Account**:
   - **Existing users**: Go to [OKX.com](https://www.okx.com) and log in
   - **New users**: Sign up at [https://okx.com/join/16742056](https://okx.com/join/16742056) and complete account verification

2. **Open API Management**:
   - Navigate directly to: [https://www.okx.com/account/my-api](https://www.okx.com/account/my-api)

3. **Create Your API Key**:
   - Click **"Create API Key"**
   - Enter a descriptive name (e.g., "MCP Server")
   - Create and save a secure **passphrase** (you'll need this later)

4. **Set Read-Only Permissions**:
   - **Read**: ✅ **Enable** (required for portfolio access)
   - **Trade**: ❌ **Disable** (not needed for this MCP server)
   - **Withdraw**: ❌ **Disable** (not needed for this MCP server)

5. **Generate and Copy Credentials**:
   - Click **"Submit All"** to create the API key
   - Click **"Show info"** to reveal your credentials
   - Click **"Copy API key info"** to copy all details
   
   **Your credentials will look like this:**
   ```
   apikey = "12345678-abcd-1234-efgh-123456789abc"
   secretkey = "ABCD1234EFGH5678IJKL9012MNOP3456"
   IP = ""
   API key name = "MCP Server"
   Permissions = "Read"
   ```

6. **Secure Your Credentials**:
   - Save the **API Key**, **Secret Key**, and **Passphrase** in a secure location
   - ⚠️ **Critical**: The Secret Key is only shown once - save it immediately!
   - These credentials will be used to configure Claude Desktop in the next step

### Step 2: Configure Claude Desktop

1. **Open Claude Desktop Settings**:
   - Launch Claude Desktop application
   - Click on **Settings** (gear icon in the bottom-left corner)

2. **Access Developer Section**:
   - Scroll down to the bottom of the settings panel
   - Click on **"Developer"** section

3. **Edit Configuration**:
   - Click on **"Edit Config"** button
   - This will open the `claude_desktop_config.json` file in your default text editor

4. **Add OKX MCP Server Configuration**:
   - Replace the entire file content with this configuration:
   ```json
   {
     "mcpServers": {
       "okx-mcp": {
         "command": "okx-mcp",
         "env": {
           "OKX_API_KEY": "your_api_key_here",
           "OKX_API_SECRET": "your_secret_key_here",
           "OKX_API_PASSPHRASE": "your_passphrase_here"
         }
       }
     }
   }
   ```

5. **Update Your Credentials**:
   - Replace `your_api_key_here` with your actual **API Key** from Step 1
   - Replace `your_secret_key_here` with your actual **Secret Key** from Step 1
   - Replace `your_passphrase_here` with your actual **Passphrase** from Step 1
   - **Save the file** and close the text editor

6. **Restart Claude Desktop**:
   - Close Claude Desktop completely
   - Reopen the application to load the new configuration

7. **Test the Connection**:
   - Start a new conversation in Claude Desktop
   - Try asking: *"Show my portfolio"* or *"Get my account summary"*
   - If successful, Claude will retrieve and display your OKX account data

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
