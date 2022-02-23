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
  { id: 'biName', label: 'BI Name', alignRight: false },
  { id: 'canvases', label: 'Canvases', alignRight: true }
];

export default function VAFirstCall() {
  const [CallList, setCallList] = useState([]);
  const [transferCallValue, setTransferCallValue] = useState(null);
  const [headCount, setHeadCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axios
      .get('/api/vafirstcall/getTodayData')
      .then((res) => {
        setCallList(res.data.vaFirstCalls);
        setTransferCallValue(res.data.forVATransferCallValue);
        setHeadCount(res.data.headCount);
      })
      .catch((err) => {
        toast.error('Something went wrong. Please try agin later !');
      });
  }, []);

  const submitData = useCallback(() => {
    setIsSubmitting(true);
    axios
      .post('/api/vafirstcall/setTodayData', {
        value: transferCallValue,
        data: CallList.map((call) => ({
          bi: call.BI,
          canvases: call.canvases
        }))
      })
      .then((res) => {
        toast.success(`VA First Calls set successfully`);
        setIsSubmitting(false);
      })
      .catch((err) => {
        toast.error('Something went wrong. Please try agin later !');
        setIsSubmitting(false);
      });
  }, [CallList, transferCallValue]);

  const total = CallList.reduce((acc, val) => acc + (+val.canvases || 0), 0);

  return (
    <Page title="VA First Call">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            VA First Call
          </Typography>
          <TextField
            margin="dense"
            label="For VA - Transfer Calls"
            type="number"
            autoFocus
            value={transferCallValue}
            onChange={(event) => setTransferCallValue(event.target.value)}
          />
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
                    const { BI, BIName, canvases } = row;
                    return (
                      <TableRow hover key={BI} tabIndex={-1}>
                        <TableCell align="left">{BIName}</TableCell>
                        <TableCell align="left">
                          <TextField
                            margin="dense"
                            type="number"
                            fullWidth
                            value={canvases}
                            onChange={(event) => {
                              CallList[index].canvases = event.target.value;
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
                  <TableRow hover tabIndex={-1}>
                    <TableCell align="left">Average</TableCell>
                    <TableCell align="left">
                      <Typography pl={1}>
                        {headCount > 0 ? total / headCount : 'Set Head Count to view Average'}
                      </Typography>
                    </TableCell>
                  </TableRow>
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
