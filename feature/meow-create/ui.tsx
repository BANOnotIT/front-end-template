import { TextareaAutosize } from "@mui/base";
import { Box, Typography } from "@mui/material";
import { SyntheticEvent, useCallback, useState } from "react";

import { MeowsService } from "~/shared/meows";

export const MeowCreate = ({ service }: { service: MeowsService }) => {
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = useCallback(
    (event: SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();

      setSubmitting(true);
      service
        .sayMeow(value.trim())
        .then(() => {
          setValue("");
        })
        .catch((e) => {
          setError(e);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
    [service, value]
  );

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextareaAutosize
        style={{ width: "30ch" }}
        value={value}
        disabled={submitting}
        onChange={(a) => setValue(a.currentTarget.value)}
      />
      {error && <Typography color="error">{String(error)}</Typography>}
    </Box>
  );
};
