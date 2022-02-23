import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TableHead,
  TextField,
  InputLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import axios from '../services/api.service';

const TABLE_HEAD = [
  { id: 'branchName', label: 'Branch Name', alignRight: false },
  { id: 'transfer', label: 'Transfer', alignRight: true }
];

export default function VATransferCall() {
  const [CallList, setCallList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axios
      .get('/api/vatransfercall/getTodayData')
      .then((res) => {
        setCallList(res.data.vaTransferCalls);
      })
      .catch((err) => {
        toast.error('Something went wrong. Please try agin later !');
      });
  }, []);

  const submitData = useCallback(() => {
    setIsSubmitting(true);
    axios
      .post('/api/vatransfercall/setTodayData', {
        data: CallList.map((call) => ({
          branch: call.Id,
          transfer: call.Transfer
        }))
      })
      .then((res) => {
        toast.success(`VA Transfer Calls set successfully`);
        setIsSubmitting(false);
      })
      .catch((err) => {
        toast.error('Something went wrong. Please try agin later !');
        setIsSubmitting(false);
      });
  }, [CallList]);

  const total = CallList.reduce((acc, val) => acc + (+val.Transfer || 0), 0);

  return (
    <Page title="VA Transfer Call">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            VA Transfer Call
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
                  {CallList.map((row, index) => {
                    const { Id, BranchName, Transfer } = row;
                    return (
                      <TableRow hover key={Id} tabIndex={-1}>
                        <TableCell align="left">{BranchName}</TableCell>
                        <TableCell align="left">
                          <TextField
                            margin="dense"
                            type="number"
                            fullWidth
                            value={Transfer}
                            onChange={(event) => {
                              CallList[index].Transfer = event.target.value;
                              setCallList([...CallList]);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow hover tabIndex={-1}>
                    <TableCell align="left">Total</TableCell>
                    <TableCell align="left">
                      <Typography pl={1}>{total}</Typography>
                    </TableCell>
                  </TableRow>
                  {/* <TableRow hover tabIndex={-1}>
                    <TableCell align="left">Average</TableCell>
                    <TableCell align="left">
                      <Typography pl={1}>
                        {headCount > 0 ? total / headCount : 'Set Head Count to view Average'}
                      </Typography>
                    </TableCell>
                  </TableRow> */}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
        <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={5} mt={2}>
          <LoadingButton
            size="large"
            type="button"
            variant="contained"
            loading={isSubmitting}
            onClick={submitData}
          >
            Submit
          </LoadingButton>
        </Stack>
      </Container>
    </Page>
  );
}
