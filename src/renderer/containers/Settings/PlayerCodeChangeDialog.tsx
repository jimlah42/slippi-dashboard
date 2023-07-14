import TextField from "@mui/material/TextField";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { ConfirmationModal } from "../../components/ConfirmationModual";
import { usePlayerCode } from "../../lib/hooks/useSettings";

export const PlayerCodeChangeDialog: React.FC<{
  open: boolean;
  handleClose: () => void;
}> = ({ open, handleClose }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { playerCode, setPlayerCode } = usePlayerCode();
  const { handleSubmit, watch, control } = useForm<{ playerCode: string }>({ defaultValues: {} });

  const name = watch("playerCode");

  const onFormSubmit = handleSubmit(async () => {
    console.log("Settings code: " + name);
    if (!playerCode) {
      await setPlayerCode([name]);
    } else {
      await setPlayerCode([...playerCode, name]);
    }
    handleClose();
  });

  return (
    <div>
      <ConfirmationModal
        title="Edit player connect code"
        open={open}
        onClose={handleClose}
        closeOnSubmit={false}
        onSubmit={onFormSubmit}
        confirmText={"Confirm"}
      >
        <Controller
          name="playerCode"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Player Code"
              required={true}
              error={Boolean(error)}
              helperText={error ? error.message : undefined}
              autoFocus={true}
              inputProps={{
                maxLength: 15,
              }}
            />
          )}
        />
      </ConfirmationModal>
    </div>
  );
};
