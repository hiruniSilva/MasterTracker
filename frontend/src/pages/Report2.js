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
  const [report2List, setreport2List] = useState([]);

  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [db, setdb] = React.useState('All');

  const handleChange = (event) => {
    setdb(event.target.value);
  };

  const loadData = React.useCallback(() => {
    if (!value1 || !value2) return;
    axios
      .get(
        `/api/tracker/report2?startDate=${dayjs(value1).format('YYYY-MM-DD')}&endDate=${dayjs(
          value2
        ).format('YYYY-MM-DD')}`
      )
      .then((res) => {
        setreport2List(res.data);
      })
      .catch((err) => {
        toast.error('Something went wrong. Please try agin later !');
      });
  }, [value1, value2]);

  return (
    <Page title="Report 2 | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Report 2
          </Typography>
        </Stack>

        <Stack direction="row">
          <Stack direction="row" spacing={2}>
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
              <Box sx={{ minWidth: 250 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Database</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={db}
                    label="Database"
                    onChange={handleChange}
                  >
                    <MenuItem value="All">All</MenuItem>
                    {report2List.map((i) => (
                      <MenuItem value={i.DatabaseName}>{i.DatabaseName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </FormControl>
            <Button
              variant="contained"
              onClick={() => {
                loadData();
              }}
            >
              View Report
            </Button>{' '}
          </Stack>
        </Stack>
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
                  {(db === 'All'
                    ? report2List
                    : report2List.filter((i) => i.DatabaseName === db)
                  ).map((row) => {
                    const { id, DatabaseName, NoFTD, FTDAmount } = row;
                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell align="left">{DatabaseName}</TableCell>
                        <TableCell align="left">{NoFTD}</TableCell>
                        <TableCell align="left">
                          {FTDAmount.map((i) => (
                            <div>{`${i.CurrencyCode} ${i.Amount}`}</div>
                          ))}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
