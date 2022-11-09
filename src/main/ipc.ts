import type { EmptyPayload, SuccessPayload } from "../utils/ipc";

import { _, makeEndpoint } from "../utils/ipc";

export const ipc_pingPong = makeEndpoint.main(
  "pingPong",
  <EmptyPayload>_,
  <SuccessPayload>_
);

export const ipc_simpleMsg = makeEndpoint.main(
  "simpleMsg",
  <{message: string}>_,
  <{response: string}>_,
);

//Main triggers
