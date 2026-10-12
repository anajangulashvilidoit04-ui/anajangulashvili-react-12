import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required("Username აუცილებელია"),
  password: yup.string().required("Password აუცილებელია"),
});

export default schema;
