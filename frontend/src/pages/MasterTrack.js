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
  MenuItem,
  FormHelperText
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
  const [RetentionList, setRetentionList] = useState([]);

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
    axios
      .get('/api/tracker/getRetentionNames')
      .then((res) => {
        setRetentionList(res.data);
      })
      .catch((err) => {
        toast.error('Something went wrong. Please try agin later !');
      });
  }, []);

  const UserSchema = Yup.object().shape({
    bi: Yup.string().required('Required !'),
    leadSource: Yup.string().required('Required !'),
    brand: Yup.string().required('Required !'),
    aid: Yup.string().required('Required !'),
    dateFtd: Yup.date().nullable().required('Required !'),
    email: Yup.string().email('Please enter a valid email').required('Required !'),
    ftdAmount: Yup.number().required('Please enter valid FTD amount').positive('Required !'),
    currCode: Yup.string().required('Required !'),
    salesAgent: Yup.string().required('Required'),
    retention: Yup.string().required('Required !')
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
          navigate('/dashboard/view');
        })
        .catch((err) => {
          toast.error('Something went wrong. Please try agin later !');
          formik.setSubmitting(false);
        });
    }
  });

  return (
    <Page title="Master Tracker">
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
                error={formik.touched.bi && Boolean(formik.errors.bi)}
              >
                {BiList.map((bi) => (
                  <MenuItem value={bi.id}>{bi.BIName}</MenuItem>
                ))}
              </Select>
              <FormHelperText error={formik.touched.bi && Boolean(formik.errors.bi)}>
                {formik.errors.bi && formik.touched.bi && formik.errors.bi}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel id="multiple-role-label">Lead Source</InputLabel>
              <Select
                labelId="multiple-role-label"
                {...formik.getFieldProps('leadSource')}
                input={<OutlinedInput label="Name" />}
                error={formik.touched.leadSource && Boolean(formik.errors.leadSource)}
              >
                {LeadSourceList.map((ls) => (
                  <MenuItem value={ls.id}>{ls.LeadSourceName}</MenuItem>
                ))}
              </Select>
              <FormHelperText
                error={formik.touched.leadSource && Boolean(formik.errors.leadSource)}
              >
                {formik.errors.leadSource && formik.touched.leadSource && formik.errors.leadSource}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel id="multiple-role-label">Brand</InputLabel>

              <Select
                labelId="multiple-role-label"
                {...formik.getFieldProps('brand')}
                input={<OutlinedInput label="Name" />}
                error={formik.touched.brand && Boolean(formik.errors.brand)}
              >
                {BrandList.map((br) => (
                  <MenuItem value={br.id}>{br.BrandName}</MenuItem>
                ))}
              </Select>
              <FormHelperText error={formik.touched.brand && Boolean(formik.errors.brand)}>
                {formik.errors.brand && formik.touched.brand && formik.errors.brand}
              </FormHelperText>
            </FormControl>
            <TextField
              {...formik.getFieldProps('aid')}
              margin="dense"
              label="Aid"
              type="text"
              fullWidth
              error={formik.touched.aid && Boolean(formik.errors.aid)}
              helperText={formik.touched.aid && formik.errors.aid}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                // {...formik.getFieldProps('dateFtd')}
                value={formik.values.dateFtd}
                onChange={(value) => formik.setFieldValue('dateFtd', value)}
                label="Date FTD"
                renderInput={(params) => <TextField fullWidth margin="dense" {...params} />}
              />
              <FormHelperText error={formik.touched.dateFtd && Boolean(formik.errors.dateFtd)}>
                {formik.errors.dateFtd && formik.touched.dateFtd && formik.errors.dateFtd}
              </FormHelperText>
            </LocalizationProvider>
            <TextField
              {...formik.getFieldProps('email')}
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <div margin="dense">
              <Stack direction={{ sm: 'row' }} spacing={{ md: 2 }} margin="dense">
                <TextField
                  {...formik.getFieldProps('ftdAmount')}
                  label="FTD Amount"
                  type="number"
                  sx={{ minWidth: 500 }}
                  error={formik.touched.ftdAmount && Boolean(formik.errors.ftdAmount)}
                  helperText={formik.touched.ftdAmount && formik.errors.ftdAmount}
                />
                <FormControl
                // spacing={2}
                // margin="dense"
                // direction="row"
                // divider={<Divider orientation="vertical" flexItem />}
                // justifyContent="flex-end"
                >
                  <InputLabel id="multiple-role-label">Currency Code</InputLabel>
                  <Select
                    {...formik.getFieldProps('currCode')}
                    labelId="multiple-role-label"
                    input={<OutlinedInput label="Name" />}
                    sx={{ minWidth: 337 }}
                    margin="dense"
                    error={formik.touched.currCode && Boolean(formik.errors.currCode)}
                  >
                    {CurrCodeList.map((curr) => (
                      <MenuItem value={curr.id}>{curr.CurrencyCode}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText
                    error={formik.touched.currCode && Boolean(formik.errors.currCode)}
                  >
                    {formik.errors.currCode && formik.touched.currCode && formik.errors.currCode}
                  </FormHelperText>
                </FormControl>
              </Stack>
            </div>
            <TextField
              {...formik.getFieldProps('salesAgent')}
              margin="dense"
              label="Sales Agent"
              type="text"
              fullWidth
              error={formik.touched.salesAgent && Boolean(formik.errors.salesAgent)}
              helperText={formik.touched.salesAgent && formik.errors.salesAgent}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="multiple-role-label">Retention</InputLabel>
              <Select
                {...formik.getFieldProps('retention')}
                labelId="multiple-role-label"
                input={<OutlinedInput label="Name" />}
                error={formik.touched.retention && Boolean(formik.errors.retention)}
              >
                {RetentionList.map((rl) => (
                  <MenuItem value={rl.id}>{rl.retentionName}</MenuItem>
                ))}
              </Select>
              <FormHelperText error={formik.touched.retention && Boolean(formik.errors.retention)}>
                {formik.errors.retention && formik.touched.retention && formik.errors.retention}
              </FormHelperText>
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
