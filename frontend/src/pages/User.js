import { sentenceCase } from 'change-case';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';

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
  TableHead,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Select,
  OutlinedInput,
  Chip,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';

import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import axios from '../services/api.service';
import { UserMoreMenu } from '../components/_dashboard/user';
import UserEditForm from '../components/UserForm';

const TABLE_HEAD = [
  { id: 'fullname', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'roles', label: 'Roles', alignRight: false },
  { id: 'createdAt', label: 'Created At', alignRight: false },
  { id: '' }
];

export default function User() {
  const [USERLIST, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  const handleSubmit = useCallback(
    (data) => {
      if (selectedUser.id) {
        axios
          .post('/api/user/update', { id: selectedUser.id, ...data })
          .then((res) => {
            toast.success('User updated successfully');
            setSelectedUser(null);
            fetchData();
          })
          .catch((err) => {
            toast.error('Something went wrong. Please try agin later !');
          });
      } else {
        axios
          .post('/api/user/create', data)
          .then((res) => {
            toast.success('User created successfully');
            setSelectedUser(null);
            fetchData();
          })
          .catch((err) => {
            toast.error('Something went wrong. Please try agin later !');
          });
      }
    },
    [selectedUser]
  );

  const fetchData = useCallback(() => {
    axios
      .get('/api/user/all')
      .then((res) => {
        const userlist = res.data;
        userlist.sort((a, b) => dayjs(a.createdAt) - dayjs(b.createdAt));
        setUserList(userlist);
      })
      .catch((err) => {
        toast.error('Something went wrong. Please try agin later !');
      });
  }, [setUserList]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button
            variant="contained"
            startIcon={<Icon icon={plusFill} />}
            onClick={() => {
              setSelectedUser({});
            }}
          >
            New User
          </Button>
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
                        <TableCell align="right">
                          <UserMoreMenu
                            list={[
                              {
                                key: 'edit',
                                icon: <Icon icon={editFill} width={24} height={24} />,
                                text: 'Edit',
                                onClick: () => setSelectedUser({ id, fullname, email, roles })
                              },
                              {
                                key: 'delete',
                                icon: <Icon icon={trash2Outline} width={24} height={24} />,
                                text: 'Delete',
                                onClick: () => {}
                              }
                            ]}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>

        <Dialog open={!!selectedUser} onClose={() => setSelectedUser(null)}>
          {selectedUser && (
            <UserEditForm
              selectedUser={selectedUser}
              handleSubmit={handleSubmit}
              setSelectedUser={setSelectedUser}
            />
          )}
        </Dialog>
      </Container>
    </Page>
  );
}
