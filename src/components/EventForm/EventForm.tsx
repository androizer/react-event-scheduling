import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { FormEvent, useEffect } from "react";

import { useEventDrawer, useEvents } from "../../context";
import { newEventSchema } from "../../utils/schemas";

import type { Event } from "react-big-calendar";
import { format } from "date-fns";

export const EventForm = () => {
  const { upsertEvent } = useEvents();
  const { currentEvent, closeDrawer } = useEventDrawer();
  const {
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    touched,
    setValues,
  } = useFormik({
    initialValues: currentEvent ?? ({ title: "" } as Event),
    validationSchema: newEventSchema,
    // this will only be called when the schema is validated
    onSubmit: (value) => {
      upsertEvent(value);
      closeDrawer();
    },
  });

  useEffect(() => {
    setValues(currentEvent ?? ({ title: "" } as Event));
  }, [currentEvent, setValues]);

  return (
    <Grid
      component="form"
      noValidate
      container
      direction="column"
      rowGap={2}
      padding={2}
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        handleSubmit(evt);
      }}
    >
      <FormControl fullWidth focused error={!!(errors.title && touched.title)}>
        <TextField
          fullWidth
          required
          variant="standard"
          name="title"
          label="Event Name"
          placeholder="Event Name"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormHelperText style={{ height: "20px" }}>
          {errors.title && touched.title ? errors.title : ""}
        </FormHelperText>
      </FormControl>
      {values.start && values.start && (
        <Grid item container justifyContent="space-between">
          <Grid item flexDirection="column">
            <Grid item>
              <Typography variant="caption" fontStyle="italic" component="span">
                Start
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="body1" component="span" fontWeight="bold">
                {format(values.start as Date, "E MMM dd, h:mma")}
              </Typography>
            </Grid>
          </Grid>
          <Grid item flexDirection="column">
            <Grid item>
              <Typography variant="caption" fontStyle="italic" component="span">
                End
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="body1" component="span" fontWeight="bold">
                {format(values.end as Date, "E MMM dd, h:mma")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Button
        variant="contained"
        color="success"
        type="submit"
        disabled={!!errors.title}
      >
        Save
      </Button>
    </Grid>
  );
};
