import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

function UserPasswordForm({ handleSubmit, setPasswordReset }) {
  const UserSchema = Yup.object().shape({
    password: Yup.string().matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
    )
  });

  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validationSchema: UserSchema,
    onSubmit: (data) => {
      handleSubmit(data);
    }
  });

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            {...formik.getFieldProps('password')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordReset(null)}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Form>
    </FormikProvider>
  );
}

export default UserPasswordForm;
