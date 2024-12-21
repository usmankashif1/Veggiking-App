import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  phone: Yup.string().min(11, "Min 11 numbers required").max(11, "Max 11 numbers allowed").required("Enter Phone No."),
  password: Yup.string().required('Enter Password'),
});

export const passwordSchema = Yup.object().shape({
  password: Yup.string().required('Enter Password'),
  confirm_password: Yup.string().required("Please enter the Password again").oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const signInSchema = Yup.object({
  name: Yup.string().min(2, "Min 5 characters required").max(50, "Max 50 characters allowed").required("Enter Full Name"),
  address: Yup.string().required('Enter Address'),
  phone: Yup.string().min(11, "Min 11 numbers required").max(11, "Max 11 numbers allowed").matches(
    /^03[0-9]{9}$/, 'Invalid phone number'
  ).required("Enter Phone No."),
  email: Yup.string().email('Enter valid email').nullable(),
  // password: Yup.string().min(2).required("Enter Password"),
  password: Yup.string().min(4, 'Min 4 characters required').required('Enter Password')
});

export const userProfile = Yup.object({
  name: Yup.string().min(2, "Min 5 characters required").max(50, "Max 50 characters allowed").required("Enter Full Name"),
  address: Yup.string().required('Enter Address'),
  phone: Yup.string().min(11, "Min 11 numbers required").max(11, "Max 11 numbers allowed").matches(
    /^03[0-9]{9}$/, 'Invalid phone number'
  ).required("Enter Phone No."),
  email: Yup.string().email('Enter valid email').nullable(),
  // password: Yup.string().min(2).required("Enter Password"),
  // password: Yup.string().min(4, 'Min 4 characters required').required('Enter Password')
});

export const passwordProfile = Yup.object({
  current_password: Yup.string().min(4, 'Min 4 characters required').required('Enter Current Password'),
  new_password: Yup.string().min(4, 'Min 4 characters required').required('Enter New Password'),
  // confirm_password: Yup.string().min(4, 'Min 4 characters required').required('Enter Confirm Password'),
  confirm_password: Yup.string().oneOf([Yup.ref('new_password'), null], 'Passwords must match')
    .min(4, 'Min 4 characters required')
    .required('Enter Confirm Password')
});

export const forgotSchema = Yup.object({
  email: Yup.string().email('Enter valid email').required("Please enter the Email"),
});

export const contactSchema = Yup.object({
  message: Yup.string().required("Please enter the Message"),
});

const ProfileSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Full Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Phone number must contain only digits')
    .min(10, 'Phone number must be at least 10 characters')
    .max(15, 'Phone number must not exceed 15 characters'),
});