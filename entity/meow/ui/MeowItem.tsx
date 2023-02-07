import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
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
    <Card component="article">
      <CardHeader
        avatar={<Avatar src={ensUrl ?? undefined} />}
        title={name ?? shortenAddress(meow.author)}
        subheader={meow.timestamp.toLocaleString("en-US")}
        subheaderTypographyProps={{ component: "time" }}
      />
      <CardContent>
        <Typography variant="body1">{meow.message}</Typography>
      </CardContent>
    </Card>
  );
};
