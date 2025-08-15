
import { z } from 'zod';
import { type InferSchema } from 'xmcp';
import { OkxApiClient } from '../services/okxApiClient';

const okxApiClient = new OkxApiClient();

export const schema = {};

export const metadata = {
  name: 'get_portfolio',
  description: 'Get a list of all assets in the account',
  annotations: {
    title: 'Get Portfolio',
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

export default async function get_portfolio({}: InferSchema<typeof schema>) {
  try {
    const portfolio = await okxApiClient.getPortfolio();
    return {
      content: [{ type: 'text', text: JSON.stringify(portfolio, null, 2) }],
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return {
      content: [{ type: 'text', text: JSON.stringify({ error: message }, null, 2) }],
    };
  }
}
