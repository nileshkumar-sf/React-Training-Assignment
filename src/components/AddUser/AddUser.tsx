import {Button, LinearProgress} from '@mui/material';
import {Formik, Form, Field} from 'formik';
import {Select, TextField} from 'formik-mui';
import {User} from '../../models/User';
import {MenuItem} from '@material-ui/core';

interface Values {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  address: string;
}

interface Props {
  onSave: (user: User) => void;
}

const AddUser: React.FC<Props> = ({onSave}) => {
  return (
    <Formik
      initialValues={{
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        role: '',
        address: '',
      }}
      validate={values => {
        const errors: Partial<Values> = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, {setSubmitting}) => {
        const user = new User({
          firstName: values.firstName,
          middleName: values.middleName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          role: values.role,
          address: values.address,
        });
        onSave(user);
        setSubmitting(false);
      }}
    >
      {({submitForm, isSubmitting}) => (
        <Form>
          <Field
            component={TextField}
            name="firstName"
            type="text"
            label="First Name"
          />
          <br />
          <br />
          <Field
            component={TextField}
            name="middleName"
            type="text"
            label="Middle Name"
          />
          <br />
          <br />
          <Field
            component={TextField}
            name="lastName"
            type="text"
            label="Last Name"
          />
          <br />
          <br />
          <Field
            component={TextField}
            name="email"
            type="email"
            label="Email"
          />
          <br />
          <br />
          <Field
            component={TextField}
            type="phone"
            label="Phone"
            name="phoneNumber"
          />
          <br />
          <br />
          <Field
            component={Select}
            name="role"
            label="Role"
            style={{width: '14.5rem', textAlign: 'left'}}
          >
            <MenuItem value="SuperAdmin">SuperAdmin</MenuItem>
            <MenuItem value="Admin">Subscriber</MenuItem>
            <MenuItem value="Subscriber">Subscriber</MenuItem>
          </Field>
          <br />
          <br />
          <Field
            component={TextField}
            type="address"
            label="Address"
            name="address"
          />
          <br />
          <br />
          {isSubmitting && <LinearProgress />}
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddUser;
