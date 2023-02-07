import { Box } from "@mui/material";
import { useSyncExternalStore } from "react";

import { MeowItem } from "~/entity/meow";
import { MeowsService } from "~/shared/meows";

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
    <Box>
      {messages.map((message) => (
        <MeowItem
          key={`${message.author}|${message.timestamp}`}
          meow={message}
        />
      ))}
    </Box>
  );
};
