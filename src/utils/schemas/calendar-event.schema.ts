import { date, object, string } from "yup";

const newEventSchema = object().shape({
  title: string().required().trim().min(2).max(50).label("Event Name"),
  start: date().required(),
  end: date().required(),
});

const updateEventSchema = newEventSchema.clone().shape({
  resource: object()
    .shape({
      id: string().uuid().required(),
    })
    .required(),
});

export { newEventSchema, updateEventSchema };
