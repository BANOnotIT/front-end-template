import { Box } from "@mui/material";
import { useSyncExternalStore } from "react";

import { MeowItem, MeowsService } from "~/entity/meow";

type Props = {
  service: MeowsService;
};
export const MeowList = ({ service }: Props) => {
  const messages = useSyncExternalStore(
    service.subscribe,
    service.getMeows,
    service.getMeows
  );

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {messages
        .slice()
        .reverse()
        .map((message) => (
          <MeowItem
            key={`${message.author}|${message.timestamp}`}
            meow={message}
          />
        ))}
    </Box>
  );
};
