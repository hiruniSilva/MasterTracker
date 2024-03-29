import { sentenceCase } from 'change-case';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import NumberFormat from 'react-number-format';
// material
import {
  TablePagination,
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TableHead,
  FormControl,
  Select,
  MenuItem
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import axios from '../services/api.service';

const TABLE_HEAD = [
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'aid', label: 'Aid', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'team', label: 'Team', alignRight: false },
  { id: 'source', label: 'Source', alignRight: false },
  { id: 'database', label: 'Data Base', alignRight: false },
  { id: 'ftd', label: 'FTD', alignRight: false },
  { id: 'retention', label: 'Retention', alignRight: false }
];

export default function Database() {
  const [USERLIST, setUserList] = useState([]);
  const [databases, setDatabases] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    axios
      .get('/api/tracker/getMasterTrackersOfDb')
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => {
        toast.error('Something went wrong. Please try agin later !');
      });

    axios
      .get('/api/tracker/getDatabaseNames')
      .then((res) => {
        setDatabases(res.data);
      })
      .catch((err) => {
        toast.error('Something went wrong. Please try agin later !');
      });
  }, []);

  const handleDatabaseChange = useCallback((id, value) => {
    axios
      .put('/api/tracker/updateDatabase', { id, dbVal: value })
      .then((res) => {})
      .catch((err) => {
        toast.error('Something went wrong. Please try agin later !');
      });
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Page title="Database">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Database
          </Typography>
        </Stack>

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
                  {USERLIST.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
                    (row, index) => {
                      const {
                        id,
                        BIvalue,
                        LeadSourceValue,
                        Aid,
                        DateFTD,
                        Email,
                        FTDAmount,
                        CurrencyValue,
                        RetentionValue,
                        Database: db
                      } = row;
                      return (
                        <TableRow hover key={id} tabIndex={-1}>
                          <TableCell align="left">{dayjs(DateFTD).format('DD/MM/YYYY')}</TableCell>
                          <TableCell align="left">{Aid}</TableCell>
                          <TableCell align="left">{Email}</TableCell>
                          <TableCell align="left">{BIvalue?.BIName}</TableCell>
                          <TableCell align="left">{LeadSourceValue?.LeadSourceName}</TableCell>
                          <TableCell align="left">
                            <FormControl fullWidth>
                              <Select
                                value={db}
                                onChange={(event) => {
                                  handleDatabaseChange(id, event.target.value);
                                  const newTrackers = [...USERLIST];
                                  newTrackers[index].Database = event.target.value;
                                  setUserList(newTrackers);
                                }}
                              >
                                {databases.map((database) => (
                                  <MenuItem value={database.id}>{database.dbName}</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell align="left">
                            <NumberFormat
                              displayType="text"
                              value={FTDAmount}
                              thousandSeparator
                              prefix={`${CurrencyValue?.CurrencyCode} `}
                            />
                          </TableCell>
                          <TableCell align="left">{RetentionValue?.retentionName}</TableCell>
                        </TableRow>
                      );
                    }
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={USERLIST.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </Page>
  );
}
