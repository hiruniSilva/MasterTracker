import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Form, useFormik } from 'formik';
import * as React from 'react';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import NumberFormat from 'react-number-format';

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
  { id: 'subbi', label: 'Sub Bi', alignRight: false },
  { id: 'noftd', label: 'No FTD', alignRight: false },
  { id: 'ftdamount', label: 'FTD Amount', alignRight: false },
  { id: 'source', label: 'Source', alignRight: false }
];

export default function Report1() {
  const [report1List, setreport1List] = useState([]);

  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [team, setTeam] = React.useState('All');

  const handleChange = (event) => {
    setTeam(event.target.value);
  };

  const loadData = React.useCallback(() => {
    if (!value1 || !value2) return;
    axios
      .get(
        `/api/tracker/report1?startDate=${dayjs(value1).format('YYYY-MM-DD')}&endDate=${dayjs(
          value2
        ).format('YYYY-MM-DD')}`
      )
      .then((res) => {
        setreport1List(res.data);
      })
      .catch((err) => {
        toast.error('Something went wrong. Please try agin later !');
      });
  }, [value1, value2]);

  const report = team === 'All' ? report1List : report1List.filter((i) => i.BIName === team);
  const getCurrencyTotal = () => {
    const data = {};
    report
      .map((i) => i.FTDAmount)
      .flat()
      .forEach((i) => {
        data[i.CurrencyCode] = (data[i.CurrencyCode] || 0) + i.Amount;
      });
    return data;
  };
  const getSourceTotal = () => {
    const data = {};
    report
      .map((i) => i.Sources)
      .flat()
      .forEach((i) => {
        data[i.LeadSourceName] = (data[i.LeadSourceName] || 0) + i.Count;
      });
    return data;
  };

  return (
    <Page title="Report 1 | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Report 1
          </Typography>
        </Stack>

        <Stack direction="row">
          <Stack direction="row" spacing={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns} sx={{ minWidth: 800 }}>
              <DatePicker
                label="From"
                value={value1}
                onChange={(newValue1) => {
                  setValue1(newValue1);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDateFns} sx={{ minWidth: 800 }}>
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
                  <InputLabel id="demo-simple-select-label">Team Name</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={team}
                    label="Team Name"
                    onChange={handleChange}
                  >
                    <MenuItem value="All">All</MenuItem>
                    {report1List.map((i) => (
                      <MenuItem value={i.BIName}>{i.BIName}</MenuItem>
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
            </Button>
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
                  {report.map((row) => {
                    const { id, BIName, NoFTD, FTDAmount, Sources } = row;
                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell align="left">{BIName}</TableCell>
                        <TableCell align="left">{NoFTD}</TableCell>
                        <TableCell align="left">
                          {FTDAmount.map((i) => (
                            <div>
                              <NumberFormat
                                displayType="text"
                                value={i.Amount}
                                thousandSeparator
                                prefix={`${i.CurrencyCode} `}
                              />
                              {/* {`${i.CurrencyCode} ${i.Amount}`} */}
                            </div>
                          ))}
                        </TableCell>
                        <TableCell align="left">
                          {Sources.map((i) => (
                            <div>{`${i.LeadSourceName} ${i.Count}`}</div>
                          ))}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {report.length > 0 && (
                    <TableRow hover tabIndex={-1}>
                      <TableCell align="left">TOTAL</TableCell>
                      <TableCell align="left">{report.reduce((a, b) => a + b.NoFTD, 0)}</TableCell>
                      <TableCell align="left">
                        {Object.entries(getCurrencyTotal()).map(([key, value]) => (
                          <div>
                            <NumberFormat
                              displayType="text"
                              value={value}
                              thousandSeparator
                              prefix={`${key} `}
                            />
                          </div>
                        ))}
                      </TableCell>
                      <TableCell align="left">
                        {Object.entries(getSourceTotal()).map(([key, value]) => (
                          <div>{`${key} ${value}`}</div>
                        ))}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
