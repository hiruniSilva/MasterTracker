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
import BranchEditForm from '../components/BranchForm';

const TABLE_HEAD = [
  { id: 'branchName', label: 'Branch Name', alignRight: false },
  { id: 'teamName', label: 'Teams', alignRight: false },
  { id: '' }
];

export default function Branch() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [BRANCHLIST, setBranchList] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [passwordReset, setPasswordReset] = useState(null);
  const [deleteBranch, setDeleteBranch] = useState(null);

  const handleSubmit = useCallback(
    (data) => {
      if (selectedBranch.id) {
        console.log({ id: selectedBranch.id, ...data });
        axios
          .post('/api/tracker/updateBranch', { id: selectedBranch.id, ...data })
          .then((res) => {
            toast.success('Branch updated successfully');
            setSelectedBranch(null);
            fetchData();
          })
          .catch((err) => {
            toast.error('Something went wrong. Please try agin later !');
          });
      } else {
        axios
          .post('/api/tracker/createBranch', data)
          .then((res) => {
            toast.success('Branch created successfully');
            setSelectedBranch(null);
            fetchData();
          })
          .catch((err) => {
            toast.error('Something went wrong. Please try agin later !');
          });
      }
    },
    [selectedBranch]
  );

  const handleDelete = useCallback(() => {
    axios
      .delete(`/api/tracker/deleteBranch?id=${deleteBranch.id}`)
      .then((res) => {
        toast.success('Branch deleted successfully');
        setDeleteBranch(null);
        fetchData();
      })
      .catch((err) => {
        toast.error('Something went wrong. Please try agin later !');
      });
  }, [deleteBranch]);

  const fetchData = useCallback(() => {
    axios
      .get('/api/tracker/getBranches')
      .then((res) => {
        const branchlist = res.data;
        branchlist.sort((a, b) => dayjs(a.createdAt) - dayjs(b.createdAt));
        setBranchList(branchlist);
      })
      .catch((err) => {
        toast.error('Something went wrong. Please try agin later !');
      });
  }, [setBranchList]);

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
    <Page title="Branch">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Branch
          </Typography>
          <Button
            variant="contained"
            startIcon={<Icon icon={plusFill} />}
            onClick={() => {
              setSelectedBranch({});
            }}
          >
            Add Branch
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
                  {BRANCHLIST.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
                    (row) => {
                      const { id, BranchName, BIs } = row;
                      return (
                        <TableRow hover key={id} tabIndex={-1}>
                          <TableCell component="th" scope="row">
                            <Typography variant="subtitle2" noWrap>
                              {BranchName}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            {BIs.map((bi) => (
                              <Label variant="ghost" color="success">
                                {sentenceCase(bi.BIName)}
                              </Label>
                            ))}
                          </TableCell>
                          <TableCell align="right">
                            <UserMoreMenu
                              list={[
                                {
                                  key: 'edit',
                                  icon: <Icon icon={editFill} width={24} height={24} />,
                                  text: 'Edit',
                                  onClick: () =>
                                    setSelectedBranch({
                                      id,
                                      BranchName,
                                      BIs: BIs.map((i) => i.id)
                                    })
                                },
                                {
                                  key: 'delete',
                                  icon: <Icon icon={trash2Outline} width={24} height={24} />,
                                  text: 'Delete',
                                  onClick: () => setDeleteBranch({ id })
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
        <Dialog open={!!selectedBranch} onClose={() => setSelectedBranch(null)}>
          {selectedBranch && (
            <BranchEditForm
              selectedBranch={selectedBranch}
              handleSubmit={handleSubmit}
              setSelectedBranch={setSelectedBranch}
            />
          )}
        </Dialog>
        <Dialog open={!!deleteBranch} onClose={() => setDeleteBranch(null)}>
          <DialogTitle>Delete user</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to delete this Branch ?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteBranch(null)}>No</Button>
            <Button onClick={handleDelete} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={BRANCHLIST.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </Page>
  );
}
