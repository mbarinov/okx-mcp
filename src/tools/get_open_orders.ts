
import { z } from 'zod';
import { type InferSchema } from 'xmcp';
import { OkxApiClient } from '../services/okxApiClient';

const okxApiClient = new OkxApiClient();

export const schema = {};

export const metadata = {
  name: 'get_open_orders',
  description: 'Get all currently open orders',
  annotations: {
    title: 'Get Open Orders',
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

export default async function get_open_orders({}: InferSchema<typeof schema>) {
  try {
    const openOrders = await okxApiClient.getOpenOrders();
    return {
      content: [{ type: 'text', text: JSON.stringify(openOrders, null, 2) }],
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return {
      content: [{ type: 'text', text: JSON.stringify({ error: message }, null, 2) }],
    };
  }
}
