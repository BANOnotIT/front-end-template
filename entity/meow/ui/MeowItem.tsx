import { Avatar, Box, Typography } from "@mui/material";
import { useEnsAvatar, useEnsName } from "wagmi";

import { Meow } from "~/shared/meows";
import { shortenAddress } from "~/shared/utils";

type Props = {
  meow: Meow;
};
export const MeowItem = ({ meow }: Props) => {
  const { data: ensUrl } = useEnsAvatar({
    address: meow.author,
  });
  const { data: name } = useEnsName({
    address: meow.author,
  });

  return (
    <Box component="article" display="flex" gap={1}>
      <Avatar src={ensUrl ?? undefined} />
      <Box display="flex" flexDirection="column" flex={1}>
        <Typography fontWeight="bold">
          {name ?? shortenAddress(meow.author)}
        </Typography>
        <Typography>{meow.message}</Typography>
        <Typography
          variant="subtitle2"
          component="time"
          sx={{ textAlign: "right" }}
        >
          {meow.timestamp.toLocaleString("en-US")}
        </Typography>
      </Box>
    </Box>
  );
};
