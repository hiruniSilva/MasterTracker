import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import roles from '../services/roles.config';

function UserEditForm({ selectedUser, handleSubmit, setSelectedUser }) {
  const UserSchema = Yup.object().shape({
    fullname: Yup.string().required(),
    email: Yup.string().email().required(),
    password: !selectedUser.id
      ? Yup.string().matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
        )
      : Yup.string(),
    roles: Yup.array().of(Yup.string())
  });

  const formik = useFormik({
    initialValues: {
      fullname: selectedUser.fullname,
      email: selectedUser.email,
      password: selectedUser.password,
      roles: selectedUser.roles || []
    },
    validationSchema: UserSchema,
    onSubmit: (data) => {
      handleSubmit(data);
    }
  });

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
        <DialogTitle>{!selectedUser.id ? 'Add User' : 'Edit User'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            {...formik.getFieldProps('fullname')}
          />
          <TextField
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            {...formik.getFieldProps('email')}
          />
          {!selectedUser.id ? (
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              {...formik.getFieldProps('password')}
            />
          ) : null}
          <FormControl fullWidth margin="dense">
            <InputLabel id="multiple-role-label">Roles</InputLabel>
            <Select
              labelId="multiple-role-label"
              multiple
              input={<OutlinedInput label="Name" />}
              {...formik.getFieldProps('roles')}
            >
              {Object.keys(roles).map((key) => (
                <MenuItem key={key} value={roles[key]}>
                  {key.split('_').join(' ')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedUser(null)}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Form>
    </FormikProvider>
  );
}

export default UserEditForm;