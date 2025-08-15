
import { z } from 'zod';
import { type InferSchema } from 'xmcp';
import { OkxApiClient } from '../services/okxApiClient';

const okxApiClient = new OkxApiClient();

export const schema = {};

export const metadata = {
  name: 'get_account_summary',
  description: 'Get aggregated portfolio metrics',
  annotations: {
    title: 'Get Account Summary',
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

export default async function get_account_summary({}: InferSchema<typeof schema>) {
  try {
    const accountSummary = await okxApiClient.getAccountSummary();
    return {
      content: [{ type: 'text', text: JSON.stringify(accountSummary, null, 2) }],
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return {
      content: [{ type: 'text', text: JSON.stringify({ error: message }, null, 2) }],
    };
  }
}
