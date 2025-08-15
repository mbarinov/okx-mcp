
import { z } from 'zod';
import { type InferSchema } from 'xmcp';
import { OkxApiClient } from '../services/okxApiClient';

const okxApiClient = new OkxApiClient();

export const schema = {};

export const metadata = {
  name: 'get_positions',
  description: 'Get all derivative positions',
  annotations: {
    title: 'Get Positions',
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

export default async function get_positions({}: InferSchema<typeof schema>) {
  try {
    const positions = await okxApiClient.getPositions();
    return {
      content: [{ type: 'text', text: JSON.stringify(positions, null, 2) }],
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return {
      content: [{ type: 'text', text: JSON.stringify({ error: message }, null, 2) }],
    };
  }
}
