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
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import roles from '../services/roles.config';
import axios from '../services/api.service';

function UserEditForm({ selectedUser, handleSubmit, setSelectedUser }) {
  const [biList, setBiList] = useState([]);

  useEffect(() => {
    axios
      .get('/api/tracker/getBI')
      .then((res) => {
        console.log(res.data);
        setBiList(res.data);
      })
      .catch((err) => {
        toast.error('Something went wrong. Please try agin later !');
      });
  }, []);

  const UserSchema = Yup.object().shape({
    fullname: Yup.string().required('Required !'),
    email: Yup.string().email('Please enter a valid email').required('Required !'),
    password: !selectedUser.id
      ? Yup.string()
          .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            'Password must have at least 8 characters that include at least 1 lowercase character, 1 uppercase character, 1 number and a special charcter in(!@#$%^&*)'
          )
          .required('Required !')
      : Yup.string(),
    roles: Yup.array().of(Yup.string()),
    teams: Yup.array().of(Yup.number())
  });

  const formik = useFormik({
    initialValues: {
      fullname: selectedUser.fullname,
      email: selectedUser.email,
      password: selectedUser.password,
      roles: selectedUser.roles || [],
      teams: selectedUser.teams || []
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
            error={formik.touched.fullname && Boolean(formik.errors.fullname)}
            helperText={formik.touched.fullname && formik.errors.fullname}
          />
          <TextField
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          {!selectedUser.id ? (
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              {...formik.getFieldProps('password')}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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
          <FormControl fullWidth margin="dense">
            <InputLabel id="multiple-team-label">Sub BI</InputLabel>
            <Select
              labelId="multiple-team-label"
              multiple
              input={<OutlinedInput label="Name" />}
              {...formik.getFieldProps('teams')}
            >
              {biList.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.BIName}
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
