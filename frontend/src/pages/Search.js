import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// material
import {
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
  TableHead
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

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003
  }
];

export default function Search() {
  const [USERLIST, setUserList] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    axios
      .get('/api/tracker/getMasterTrack')
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => {
        toast.error('Something went wrong. Please try agin later !');
      });
  }, []);

  return (
    <Page title="Search | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Search
          </Typography>
        </Stack>
        <TextField
          autoFocus
          margin="dense"
          label="Aid/Email"
          type="text"
          fullWidth
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
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
                  {(searchText
                    ? USERLIST.filter(
                        (item) =>
                          item.Email.startsWith(searchText) || item.Aid.startsWith(searchText)
                      )
                    : USERLIST
                  ).map((row) => {
                    const {
                      id,
                      BIvalue,
                      LeadSourceValue,
                      Aid,
                      DateFTD,
                      Email,
                      FTDAmount,
                      CurrencyValue,
                      Retention,
                      DatabaseValue
                    } = row;
                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell align="left">{dayjs(DateFTD).format('DD/MM/YYYY')}</TableCell>
                        <TableCell align="left">{Aid}</TableCell>
                        <TableCell align="left">{Email}</TableCell>
                        <TableCell align="left">{BIvalue?.BIName}</TableCell>
                        <TableCell align="left">{LeadSourceValue?.LeadSourceName}</TableCell>
                        <TableCell align="left">{DatabaseValue?.dbName}</TableCell>
                        <TableCell align="left">
                          {CurrencyValue?.CurrencyCode} {FTDAmount}
                        </TableCell>
                        <TableCell align="left">{Retention}</TableCell>
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
