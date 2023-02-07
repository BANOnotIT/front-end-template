import { Avatar, Box, Typography } from "@mui/material";
import { useEnsAvatar, useEnsName } from "wagmi";

import { Meow } from "~/shared/meows";

type Props = {
  meow: Meow;
};
export const MeowItem = ({ meow }: Props) => {
  const { data: ensUrl } = useEnsAvatar({
    address: meow.author,
  });
  const { data: name } = useEnsName({ address: meow.author });

  return (
    <Box>
      <Avatar src={ensUrl ?? undefined} />
      <Typography>{name ?? meow.author}</Typography>
      <Typography>{meow.message}</Typography>
      <Typography>{String(meow.timestamp)}</Typography>
    </Box>
  );
};
