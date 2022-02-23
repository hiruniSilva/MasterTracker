import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

// material
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Stack,
  Button,
  Container,
  Typography,
  TextField,
  MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// components
import Page from '../components/Page';
import axios from '../services/api.service';

const Yup = require('yup');

export default function AddBranch() {
  const navigate = useNavigate();

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

  const schema = Yup.object().shape({
    branchName: Yup.string().required('Required !'),
    subBIs: Yup.array().of(Yup.string()).required()
  });

  // const formik = useFormik({
  //   initialValues: {
  //     branchName: '',
  //     subBIs:
  //   }
  // })

  return (
    <Page title="Add Branch">
      <Container maxWidth="md">
        {/* <FormikProvider value={formik}> */}
        {/* <Form autoComplete="off" noValidate> */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Add Branch
          </Typography>
        </Stack>
        <FormControl fullWidth margin="dense">
          <TextField
            // {...formik.getFieldProps('aid')}
            margin="dense"
            label="Branch Name"
            type="text"
            fullWidth
            //   error={formik.touched.aid && Boolean(formik.errors.aid)}
            //   helperText={formik.touched.aid && formik.errors.aid}
          />
        </FormControl>{' '}
        <FormControl fullWidth margin="dense">
          <InputLabel id="multiple-team-label">Teams</InputLabel>
          <Select
            labelId="multiple-team-label"
            multiple
            input={<OutlinedInput label="Name" />}
            // {...formik.getFieldProps('teams')}
            value={[]}
          >
            {biList.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.BIName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <Stack direction="row" spacing={2}>
          <Button type="submit" fullWidth margin="dense" variant="contained">
            Submit
          </Button>
        </Stack>
        {/* </Form> */}
        {/* </FormikProvider> */}
      </Container>
    </Page>
  );
}
