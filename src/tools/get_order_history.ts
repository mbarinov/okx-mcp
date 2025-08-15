import { z } from "zod";
import { type InferSchema } from "xmcp";
import { OkxApiClient } from "../services/okxApiClient";

const okxApiClient = new OkxApiClient();

export const schema = {
  instId: z.string().describe("Instrument ID (symbol), e.g. BTC-USDT"),
  begin: z
    .number()
    .optional()
    .describe("the beginning of the time range in timestamp format"),
  end: z
    .number()
    .optional()
    .describe("the end of the time range in timestamp format"),
};

export const metadata = {
  name: "get_order_history",
  description:
    "Get a list of filled orders for a given date range and optional symbol filter",
  annotations: {
    title: "Get Order History",
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

export default async function get_order_history({
  instId,
  begin,
  end,
}: InferSchema<typeof schema>) {
  try {
    const orderHistory = await okxApiClient.getOrderHistory(instId, begin, end);
    return {
      content: [{ type: "text", text: JSON.stringify(orderHistory, null, 2) }],
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    return {
      content: [
        { type: "text", text: JSON.stringify({ error: message }, null, 2) },
      ],
    };
  }
}
