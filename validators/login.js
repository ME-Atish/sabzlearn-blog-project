const yup = require("yup");

const loginScheme = yup.object().shape({
  username: yup
    .string()
    .min(8)
    .matches(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/, "username is not valid")
    .max(255),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")])
    .required(),
  uuid: yup.string().uuid().required(),
  captcha: yup.string().max(4).required(),
});


module.exports = loginScheme