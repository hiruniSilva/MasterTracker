import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

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
  { id: 'fullname', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'roles', label: 'Roles', alignRight: false },
  { id: 'createdAt', label: 'Created At', alignRight: false }
];

export default function User() {
  const [USERLIST, setUserList] = useState([]);

  useEffect(() => {
    axios
      .get('/api/user/all')
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => {
        toast.error('Something went wrong. Please try agin later !');
      });
  }, []);

  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
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
                  {USERLIST.map((row) => {
                    const { id, fullname, email, roles, createdAt } = row;
                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell component="th" scope="row">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar>{fullname[0]}</Avatar>
                            <Typography variant="subtitle2" noWrap>
                              {fullname}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">
                          {roles.map((role) => (
                            <Label variant="ghost" color="success">
                              {sentenceCase(role)}
                            </Label>
                          ))}
                        </TableCell>
                        <TableCell align="left">{dayjs(createdAt).format('DD/MM/YYYY')}</TableCell>
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
