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
  TableHead,
  Grid
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Logo from '../components/Logo';
import Scrollbar from '../components/Scrollbar';

// components
import Page from '../components/Page';
import axios from '../services/api.service';

import config from '../config';

const TABLE_HEAD = [
  { id: 'branch', label: 'Branch Name', alignRight: false },
  { id: 'Transfer', label: 'Transfer', alignRight: false }
];

const TABLE_HEAD_RATIO = [
  { id: 'branch', label: 'Branch Name', alignRight: false },
  { id: 'Transfer', label: 'Transfer Ratio', alignRight: false }
];

export default function VATransferCallReport() {
  const [reportList, setreportList] = useState([]);
  const [sourceList, setSourceList] = useState([]);
  const [forVATransferCallList, setForVATransferCallList] = useState([]);

  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);

  const loadData = React.useCallback(() => {
    if (!value1 || !value2) return;
    axios
      .get(
        `/api/vatransfercall/report?startDate=${dayjs(value1).format('YYYY-MM-DD')}&endDate=${dayjs(
          value2
        ).format('YYYY-MM-DD')}`
      )
      .then((res) => {
        setreportList(res.data.vaTransferCalls);
        setForVATransferCallList(res.data.forVATransferCalls);
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

  const getSourceTotal = (BIs) => {
    const data = {};
    sourceList
      .filter((bi) => BIs.includes(bi.ID))
      .map((i) => i.Sources)
      .flat()
      .forEach((i) => {
        data[i.LeadSourceName] = (data[i.LeadSourceName] || 0) + i.Count;
      });
    return data;
  };

  const reportListRatio = reportList.map(({ BranchName, BIs, Transfer }) => {
    const val = {
      BranchName,
      ratio:
        Transfer > 0
          ? (getSourceTotal(BIs)[config.VA_TRANSFER_CALL_NAME] || 0) / Transfer
          : 'No Transfer Value'
    };
    console.log(val);
    return val;
  });

  return (
    <Page title="Report 4 - VA Transfer Call">
      <Container>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Report 4 - VA Transfer Call
            </Typography>
          </Stack>
          <Stack alignItems="right" justifyContent="space-between" mb={5}>
            <Logo />
          </Stack>
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
        <Grid container spacing={2} columns={16}>
          <Grid item xs={16} md={8}>
            <Typography variant="h5" gutterBottom>
              VA Transfer Call
            </Typography>
            <Card>
              <Scrollbar>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {TABLE_HEAD.map((headCell) => (
                          <TableCell
                            key={headCell.id}
                            align={headCell.alignRight ? 'right' : 'left'}
                          >
                            {headCell.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {reportList.map((row) => {
                        const { Branch, BranchName, Transfer } = row;
                        return (
                          <TableRow hover key={Branch} tabIndex={-1}>
                            <TableCell align="left">{BranchName}</TableCell>
                            <TableCell align="left">{Transfer}</TableCell>
                          </TableRow>
                        );
                      })}
                      {reportList.length > 0 && (
                        <TableRow hover tabIndex={-1}>
                          <TableCell align="left">
                            <Typography pl={1} variant="h6" gutterBottom component="div">
                              TOTAL
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography pl={1} variant="h6" gutterBottom component="div">
                              {reportList.reduce((a, b) => a + b.Transfer, 0)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Card>
          </Grid>
          <Grid item xs={16} md={8}>
            <Typography variant="h5" gutterBottom>
              VA - Transfer Call Convertion Ratio
            </Typography>
            <Card>
              <Scrollbar>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {TABLE_HEAD_RATIO.map((headCell) => (
                          <TableCell
                            key={headCell.id}
                            align={headCell.alignRight ? 'right' : 'left'}
                          >
                            {headCell.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {reportListRatio.map((row) => {
                        const { BranchName, ratio } = row;
                        console.log(ratio);
                        return (
                          <TableRow hover key={BranchName} tabIndex={-1}>
                            <TableCell align="left">{BranchName}</TableCell>
                            <TableCell align="left">
                              {ratio !== 'No Transfer Value' ? ratio.toFixed(2) : ratio}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {reportList.length > 0 && (
                        <TableRow hover tabIndex={-1}>
                          <TableCell align="left">
                            <Typography pl={1} variant="h6" gutterBottom component="div">
                              TOTAL
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            {/* {total > 0 ? transferCallValue / total : 'No Total Value'} */}
                            <Typography pl={1} variant="h6" gutterBottom component="div">
                              {reportListRatio
                                .filter((i) => i.ratio !== 'No Transfer Value')
                                .reduce((a, b) => a + b.ratio, 0)
                                .toFixed(2)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Card>
          </Grid>
        </Grid>
        <Typography variant="h5" gutterBottom sx={{ marginTop: 3 }}>
          Total For VA - Transfer Call : {forVATransferCallList.reduce((a, b) => a + b, 0)}
        </Typography>
      </Container>
    </Page>
  );
}
