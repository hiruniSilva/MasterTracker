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

function BranchEditForm({ selectedBranch, handleSubmit, setSelectedBranch }) {
  const [teamList, setTeamList] = useState([]);

  useEffect(() => {
    axios
      .get('/api/tracker/getTeams')
      .then((res) => {
        console.log(res.data);
        setTeamList(res.data);
      })
      .catch((err) => {
        toast.error('Something went wrong. Please try agin later !');
      });
  }, []);

  const schema = Yup.object().shape({
    branchName: Yup.string().required('Required !'),
    // subBIs: Yup.array().of(Yup.string()).required()
    teams: Yup.array().of(Yup.number()).min(1, 'Atleast 1 should be selected').required('Required')
    // subBIs: Yup.array().of(Yup.number()).min(1).required('Required')
  });

  const formik = useFormik({
    initialValues: {
      branchName: selectedBranch.BranchName || '',
      teams: selectedBranch.Teams || []
      // subBIs: subBIs || []
    },
    validationSchema: schema,
    onSubmit: (data) => {
      handleSubmit(data);
    }
  });

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
        <DialogTitle>{!selectedBranch.id ? 'Add Branch' : 'Edit Branch'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Branch Name"
            type="text"
            fullWidth
            {...formik.getFieldProps('branchName')}
            error={formik.touched.branchName && Boolean(formik.errors.branchName)}
            helperText={formik.touched.branchName && formik.errors.branchName}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="multiple-team-label">Teams</InputLabel>
            <Select
              labelId="multiple-team-label"
              multiple
              input={<OutlinedInput label="Name" />}
              {...formik.getFieldProps('teams')}
            >
              {teamList.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.TeamName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedBranch(null)}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Form>
    </FormikProvider>
  );
}

export default BranchEditForm;
