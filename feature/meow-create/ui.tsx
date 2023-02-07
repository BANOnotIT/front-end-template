import { TextareaAutosize } from "@mui/base";
import {
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  InputLabel,
  Paper,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { SyntheticEvent, useCallback, useId, useState } from "react";
import { useAccount } from "wagmi";

import { MeowsService } from "~/entity/meow";

export const MeowCreate = ({ service }: { service: MeowsService }) => {
  const id = useId();
  const { isConnected } = useAccount();
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

  if (!isConnected) return null;

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        background: deepPurple[900],
      }}
    >
      <FormControl error={Boolean(error)} variant="filled">
        <InputLabel htmlFor={id}>Your meow</InputLabel>
        <FilledInput
          inputComponent={TextareaAutosize}
          id={id}
          style={{ width: "100%", border: "none" }}
          value={value}
          disabled={submitting}
          onChange={(a) => setValue(a.currentTarget.value)}
        />

        {error && <FormHelperText>{String(error)}</FormHelperText>}
      </FormControl>

      <Button
        variant="contained"
        disabled={submitting}
        type="submit"
        sx={{ alignSelf: "flex-end" }}
      >
        {submitting ? "Meowing..." : "Meow!"}
      </Button>
    </Paper>
  );
};
