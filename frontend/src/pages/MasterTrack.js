import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';

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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useNavigate } from 'react-router-dom';

// components
import Page from '../components/Page';
import axios from '../services/api.service';

export default function MasterTrack() {
  const navigate = useNavigate();

  const [BiList, setBiList] = useState([]);
  const [LeadSourceList, setLeadSource] = useState([]);
  const [BrandList, setBrandList] = useState([]);
  const [CurrCodeList, setCurrCodeList] = useState([]);

  useEffect(() => {
    axios
      .get('/api/tracker/getBI')
      .then((res) => {
        setBiList(res.data);
      })
      .catch((err) => {
        toast.error('Something went wrong. Please try agin later !');
      });
    axios
      .get('/api/tracker/getLeadSource')
      .then((res) => {
        setLeadSource(res.data);
      })
      .catch((err) => {
        toast.error('Something went wrong. Please try agin later !');
      });
    axios
      .get('/api/tracker/getBrand')
      .then((res) => {
        setBrandList(res.data);
      })
      .catch((err) => {
        toast.error('Something went wrong. Please try agin later !');
      });
    axios
      .get('/api/tracker/getCurrencyCode')
      .then((res) => {
        setCurrCodeList(res.data);
      })
      .catch((err) => {
        toast.error('Something went wrong. Please try agin later !');
      });
  }, []);

  const UserSchema = Yup.object().shape({
    bi: Yup.string().required(),
    leadSource: Yup.string().required(),
    brand: Yup.string().required(),
    aid: Yup.string().required(),
    dateFtd: Yup.date().default(),
    email: Yup.string().email().required(),
    ftdAmount: Yup.number().required().positive(),
    currCode: Yup.string().required(),
    salesAgent: Yup.string().required(),
    retention: Yup.string().required()
  });

  const formik = useFormik({
    initialValues: {
      bi: '',
      leadSource: '',
      brand: '',
      aid: '',
      dateFtd: null,
      email: '',
      ftdAmount: '',
      currCode: '',
      salesAgent: '',
      retention: ''
    },
    validationSchema: UserSchema,
    onSubmit: (data) => {
      axios
        .post('/api/tracker/addMasterTrack', data)
        .then((res) => {
          toast.success(`Master Track added successfully`);
          navigate('/dashboard/search');
        })
        .catch((err) => {
          toast.error('Something went wrong. Please try agin later !');
          formik.setSubmitting(false);
        });
    }
  });

  return (
    <Page title="Master Tracker | Minimal-UI">
      <Container maxWidth="md">
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Master Tracker
              </Typography>
            </Stack>
            <FormControl fullWidth margin="dense">
              <InputLabel id="multiple-role-label">BI</InputLabel>
              <Select
                {...formik.getFieldProps('bi')}
                labelId="multiple-role-label"
                input={<OutlinedInput label="Name" />}
              >
                {BiList.map((bi) => (
                  <MenuItem value={bi.id}>{bi.BIName}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel id="multiple-role-label">Lead Source</InputLabel>
              <Select
                labelId="multiple-role-label"
                {...formik.getFieldProps('leadSource')}
                input={<OutlinedInput label="Name" />}
              >
                {LeadSourceList.map((ls) => (
                  <MenuItem value={ls.id}>{ls.LeadSourceName}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel id="multiple-role-label">Brand</InputLabel>

              <Select
                labelId="multiple-role-label"
                {...formik.getFieldProps('brand')}
                input={<OutlinedInput label="Name" />}
              >
                {BrandList.map((br) => (
                  <MenuItem value={br.id}>{br.BrandName}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              {...formik.getFieldProps('aid')}
              margin="dense"
              label="Aid"
              type="text"
              fullWidth
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                // {...formik.getFieldProps('dateFtd')}
                value={formik.values.dateFtd}
                onChange={(value) => formik.setFieldValue('dateFtd', value)}
                label="Date FTD"
                renderInput={(params) => <TextField fullWidth margin="dense" {...params} />}
              />
            </LocalizationProvider>
            <TextField
              {...formik.getFieldProps('email')}
              margin="dense"
              label="Email"
              type="email"
              fullWidth
            />
            <TextField
              {...formik.getFieldProps('ftdAmount')}
              margin="dense"
              label="FTD Amount"
              type="number"
              fullWidth
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="multiple-role-label">Currency Code</InputLabel>
              <Select
                {...formik.getFieldProps('currCode')}
                labelId="multiple-role-label"
                input={<OutlinedInput label="Name" />}
              >
                {CurrCodeList.map((curr) => (
                  <MenuItem value={curr.id}>{curr.CurrencyCode}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              {...formik.getFieldProps('salesAgent')}
              margin="dense"
              label="Sales Agent"
              type="text"
              fullWidth
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="multiple-role-label">Retention</InputLabel>
              <Select
                {...formik.getFieldProps('retention')}
                labelId="multiple-role-label"
                input={<OutlinedInput label="Name" />}
              >
                <MenuItem value="pmSup">Premium Support</MenuItem>
                <MenuItem value="own">Own</MenuItem>
              </Select>
            </FormControl>{' '}
            <br />
            <br />
            <Stack direction="row" spacing={2}>
              <Button type="submit" fullWidth margin="dense" variant="contained">
                Submit
              </Button>
            </Stack>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}
