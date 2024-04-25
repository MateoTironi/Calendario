import * as yup from "yup";

export const formSchema = yup.object().shape({
  petName: yup.string().required(),
  email: yup.string().email().required(),
  number: yup.string().min(5).max(10).required(),
  service: yup.string().required(),
  profesional: yup.string().required(),
  date: yup.string().required(),
  hour: yup.string().required(),
});
