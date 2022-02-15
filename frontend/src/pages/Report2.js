import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Form, useFormik } from 'formik';
import * as React from 'react';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';

// material
import {
  TableBody,
  TableRow,
  Table,
  Card,
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
  TableCell,
  TableContainer,
  TableHead
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Scrollbar from '../components/Scrollbar';

// components
import Page from '../components/Page';
import axios from '../services/api.service';

const TABLE_HEAD = [
  { id: 'subbi', label: 'Database', alignRight: false },
  { id: 'noftd', label: 'No FTD', alignRight: false },
  { id: 'ftdamount', label: 'FTD Amount', alignRight: false }
];

export default function Report2() {
  const [report1List, setreport1List] = useState([]);

  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [db, setdb] = React.useState('');

  const handleChange = (event) => {
    setdb(event.target.value);
  };

  return (
    <Page title="Report 2 | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Report 2
          </Typography>
        </Stack>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="From"
            value={value1}
            onChange={(newValue1) => {
              setValue1(newValue1);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="To"
            value={value2}
            onChange={(newValue2) => {
              setValue2(newValue2);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <FormControl>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Database</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={db}
                label="Database"
                onChange={handleChange}
              >
                <MenuItem value={10}>test1</MenuItem>
                <MenuItem value={20}>test2</MenuItem>
                <MenuItem value={30}>Click all to select - test3</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </FormControl>
        <Button variant="contained">View Report</Button>
        <br />
        <br />
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {TABLE_HEAD.map((headCell) => (
                      <TableCell key={headCell.id} align={headCell.alignRight ? 'right' : 'left'}>
                        {headCell.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell>DB_1</TableCell>
                    <TableCell>50</TableCell>
                    <TableCell>USD 7500</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>DB_2</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>USD 15000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
