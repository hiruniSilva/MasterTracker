import { sentenceCase } from 'change-case';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';

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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material';

import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import axios from '../services/api.service';
import { UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
import UserEditForm from '../components/UserForm';
import UserPasswordForm from '../components/UserPasswordForm';

const TABLE_HEAD = [
  { id: 'fullname', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'roles', label: 'Roles', alignRight: false },
  { id: 'createdAt', label: 'Created At', alignRight: false },
  { id: '' }
];

export default function User() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [USERLIST, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [passwordReset, setPasswordReset] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  const handleSubmit = useCallback(
    (data) => {
      if (selectedUser.id) {
        console.log({ id: selectedUser.id, ...data });
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

  const handlePasswordReset = useCallback(
    (data) => {
      axios
        .post('/api/user/password-reset', { id: passwordReset.id, ...data })
        .then((res) => {
          toast.success('User password reset successfully');
          setPasswordReset(null);
        })
        .catch((err) => {
          toast.error('Something went wrong. Please try agin later !');
        });
    },
    [passwordReset]
  );

  const handleDelete = useCallback(() => {
    axios
      .delete(`/api/user/delete?id=${deleteUser.id}`)
      .then((res) => {
        toast.success('User deleted successfully');
        setDeleteUser(null);
        fetchData();
      })
      .catch((err) => {
        toast.error('Something went wrong. Please try agin later !');
      });
  }, [deleteUser]);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Page title="User">
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
                  {USERLIST.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
                    (row) => {
                      const { id, fullname, email, roles, BIs, createdAt } = row;
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
                          <TableCell align="left">
                            {dayjs(createdAt).format('DD/MM/YYYY')}
                          </TableCell>
                          <TableCell align="right">
                            <UserMoreMenu
                              list={[
                                {
                                  key: 'edit',
                                  icon: <Icon icon={editFill} width={24} height={24} />,
                                  text: 'Edit',
                                  onClick: () =>
                                    setSelectedUser({
                                      id,
                                      fullname,
                                      email,
                                      roles,
                                      teams: BIs.map((i) => i.id)
                                    })
                                },
                                {
                                  key: 'password-reset',
                                  icon: <Icon icon={editFill} width={24} height={24} />,
                                  text: 'Password Reset',
                                  onClick: () => setPasswordReset({ id })
                                },
                                {
                                  key: 'delete',
                                  icon: <Icon icon={trash2Outline} width={24} height={24} />,
                                  text: 'Delete',
                                  onClick: () => setDeleteUser({ id })
                                }
                              ]}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    }
                  )}
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
        <Dialog open={!!passwordReset} onClose={() => setPasswordReset(null)}>
          {passwordReset && (
            <UserPasswordForm
              handleSubmit={handlePasswordReset}
              setPasswordReset={setPasswordReset}
            />
          )}
        </Dialog>
        <Dialog open={!!deleteUser} onClose={() => setDeleteUser(null)}>
          <DialogTitle>Delete user</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to delete this user ?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteUser(null)}>No</Button>
            <Button onClick={handleDelete} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
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
