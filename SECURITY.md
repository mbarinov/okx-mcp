# Security Policy

## 🔒 Our Security Commitment

OKX MCP Server is designed with security as a fundamental principle. We take the security of your trading data and API credentials seriously and have implemented multiple layers of protection to ensure your information remains safe.

## 🛡️ Built-in Security Features

### Read-Only Access
- **No Trading Capabilities**: This MCP server only requires read permissions and cannot execute trades, place orders, or withdraw funds
- **Limited API Scope**: Only uses endpoints for viewing portfolio, positions, and order history
- **No Write Operations**: Zero capability to modify your account or execute transactions

### Data Protection
- **Local Processing Only**: All data is processed locally on your machine
- **No Data Persistence**: Trading data is never saved to disk or cached permanently
- **No Third-Party Transmission**: Your data never leaves your local environment
- **Direct API Communication**: Connects directly to OKX APIs without intermediary servers

### Credential Security
- **Environment Variables**: API credentials are stored in environment variables only
- **No Hardcoding**: Credentials are never embedded in code or configuration files
- **Process Isolation**: Credentials exist only in the Node.js process memory

## 🚨 Reporting Security Vulnerabilities

We take security vulnerabilities seriously. If you discover a security issue, please follow these guidelines:

### How to Report

**For sensitive security issues, please email directly:**
- 📧 **Email**: [me@maxbarinov.com](mailto:me@maxbarinov.com)
- 📧 **Subject**: `[SECURITY] OKX MCP - [Brief Description]`

**For general security questions:**
- Create an issue on [GitHub Issues](https://github.com/maxbarinov/okx-mcp/issues) with the `security` label

### What to Include

Please provide as much information as possible:

1. **Description** of the vulnerability
2. **Steps to reproduce** the issue
3. **Potential impact** assessment
4. **Suggested fix** (if you have one)
5. **Your contact information** for follow-up

### Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 5 business days
- **Resolution**: Varies by severity, but we aim for:
  - Critical: 1-7 days
  - High: 1-14 days
  - Medium: 2-30 days
  - Low: Best effort basis

## 🔧 Security Contact

For security-related questions or concerns:

- **Primary Contact**: [me@maxbarinov.com](mailto:me@maxbarinov.com)
- **GitHub**: [@maxbarinov](https://github.com/maxbarinov)
- **Response Time**: Within 48 hours for security issues

---

**Remember**: Your security is our priority. When in doubt, reach out to us. It's better to ask about a potential security concern than to ignore it.
