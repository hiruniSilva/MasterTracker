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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

// components
import Page from '../components/Page';
import axios from '../services/api.service';

export default function MasterTrack() {
  const [BiList, setBiList] = useState([]);
  const [value, setValue] = useState(null);
  const [LeadSource, setLeadSource] = useState([]);

  useEffect(() => {
    axios
      .get('/api/tracker/getBI')
      .then((res) => {
        setBiList(res.data);
      })
      .catch((err) => {
        toast.error('Something went wrong. Please try agin later !');
      });
  }, []);

  return (
    <Page title="Master Tracker | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Master Tracker
          </Typography>
        </Stack>
        <FormControl fullWidth margin="dense">
          <InputLabel id="multiple-role-label">BI</InputLabel>
          <Select labelId="multiple-role-label" input={<OutlinedInput label="Name" />}>
            {BiList.map((bi) => (
              <MenuItem value={bi.id}>{bi.BIName}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel id="multiple-role-label">Lead Source</InputLabel>
          <Select labelId="multiple-role-label" input={<OutlinedInput label="Name" />}>
            <MenuItem value="test_1">Test_1</MenuItem>
            <MenuItem value="test_2">Test_2</MenuItem>
            <MenuItem value="test_3">Test_3</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel id="multiple-role-label">Brand</InputLabel>
          <Select labelId="multiple-role-label" input={<OutlinedInput label="Name" />}>
            <MenuItem value="test_1">Test_1</MenuItem>
            <MenuItem value="test_2">Test_2</MenuItem>
            <MenuItem value="test_3">Test_3</MenuItem>
          </Select>
        </FormControl>
        <TextField margin="dense" label="Aid" type="text" fullWidth />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            fullWidth
            margin="dense"
            label="Date FTD"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField margin="dense" label="Email" type="email" fullWidth />
        <TextField margin="dense" label="FTD Amount" type="number" fullWidth />
        <FormControl fullWidth margin="dense">
          <InputLabel id="multiple-role-label">Currency Code</InputLabel>
          <Select labelId="multiple-role-label" input={<OutlinedInput label="Name" />}>
            <MenuItem value="test_1">test1</MenuItem>
            <MenuItem value="test_2">test1</MenuItem>
            <MenuItem value="test_3">test1</MenuItem>
          </Select>
        </FormControl>
        <TextField margin="dense" label="Sales Agent" type="text" fullWidth />
        <FormControl fullWidth margin="dense">
          <InputLabel id="multiple-role-label">Retention</InputLabel>
          <Select labelId="multiple-role-label" input={<OutlinedInput label="Name" />}>
            <MenuItem value="test_1">Premium Support</MenuItem>
            <MenuItem value="test_2">Own</MenuItem>
          </Select>
        </FormControl>{' '}
        <br />
        <br />
        <Stack direction="row" spacing={2}>
          <Button fullWidth margin="dense" variant="contained">
            Submit
          </Button>
        </Stack>
      </Container>
    </Page>
  );
}
