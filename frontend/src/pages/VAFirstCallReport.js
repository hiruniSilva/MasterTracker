import { useState } from 'react';
import { toast } from 'react-toastify';
import * as React from 'react';
import dayjs from 'dayjs';

// material
import {
  TableBody,
  TableRow,
  Table,
  Card,
  Stack,
  Button,
  Container,
  Typography,
  TextField,
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

import config from '../config';

const TABLE_HEAD = [
  { id: 'team', label: 'Sub BI', alignRight: false },
  { id: 'canvases', label: 'Canvases', alignRight: false }
];

export default function VAFirstCallReport() {
  const [reportList, setreportList] = useState([]);
  const [sourceList, setSourceList] = useState([]);

  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);

  const loadData = React.useCallback(() => {
    if (!value1 || !value2) return;
    axios
      .get(
        `/api/vafirstcall/report?startDate=${dayjs(value1).format('YYYY-MM-DD')}&endDate=${dayjs(
          value2
        ).format('YYYY-MM-DD')}`
      )
      .then((res) => {
        setreportList(res.data.vaFirstCalls);
      })
      .catch((err) => {
        toast.error('Something went wrong. Please try agin later !');
      });
    axios
      .get(
        `/api/tracker/report1?startDate=${dayjs(value1).format('YYYY-MM-DD')}&endDate=${dayjs(
          value2
        ).format('YYYY-MM-DD')}`
      )
      .then((res) => {
        setSourceList(res.data);
      })
      .catch((err) => {
        toast.error('Something went wrong. Please try agin later !');
      });
  }, [value1, value2]);

  const getSourceTotal = () => {
    const data = {};
    sourceList
      .map((i) => i.Sources)
      .flat()
      .forEach((i) => {
        data[i.LeadSourceName] = (data[i.LeadSourceName] || 0) + i.Count;
      });
    return data;
  };

  const total = reportList.reduce((a, b) => a + b.canvases, 0);

  return (
    <Page title="Report 3 - VA First Call">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Report 3 - VA First Call
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
                  {reportList.map((row) => {
                    const { BI, BIName, canvases } = row;
                    return (
                      <TableRow hover key={BI} tabIndex={-1}>
                        <TableCell align="left">{BIName}</TableCell>
                        <TableCell align="left">{canvases}</TableCell>
                      </TableRow>
                    );
                  })}
                  {reportList.length > 0 && (
                    <>
                      <TableRow hover tabIndex={-1}>
                        <TableCell align="left">TOTAL</TableCell>
                        <TableCell align="left">
                          {reportList.reduce((a, b) => a + b.canvases, 0)}
                        </TableCell>
                      </TableRow>
                      <TableRow hover tabIndex={-1}>
                        <TableCell align="left">VA First Call Convertion</TableCell>
                        <TableCell align="left">
                          {total > 0
                            ? ((getSourceTotal()[config.VA_FIRST_CALL_NAME] || 0) / total).toFixed(
                                2
                              )
                            : 'No Total Value'}
                        </TableCell>
                      </TableRow>
                    </>
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
