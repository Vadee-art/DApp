import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import {
  fetchIsTalentArtist,
  fetchArtistById,
} from '../../actions/artistAction';

function createData(name, order, seller, buyer, price) {
  return { name, order, seller, buyer, price };
}

const rows = [
  createData('0x13abf52467623e6bbf61b164a25307db02ca2505', 159, 6.0, 24, 4.0),
  createData('0x13abf52467623e6bbf61b164a25307db02ca2505', 237, 9.0, 37, 4.3),
  createData('0x13abf52467623e6bbf61b164a25307db02ca2505', 262, 16.0, 24, 6.0),
  createData('0x13abf52467623e6bbf61b164a25307db02ca2505', 305, 3.7, 67, 4.3),
  createData('0x13abf52467623e6bbf61b164a25307db02ca2505', 356, 16.0, 49, 3.9),
];

export default function DenseTable() {
  const theArtist = useSelector((state) => state.theArtist);
  const { error, loading, success, artist } = theArtist;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!success) {
      dispatch(fetchArtistById(37));
    }
  }, []);
  return (
    <TableContainer
      style={{ width: '100%' }}
      // component={Paper}
    >
      <Table size="small" aria-label="a dense table">
        {/* <TableHead>
          <TableRow>
            <TableCell>Transaction</TableCell>
            <TableCell align="right">Order</TableCell>
            <TableCell align="right">Seller</TableCell>
            <TableCell align="right">Buyer</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead> */}
        <TableBody>
          {artist?.artworks?.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                '&:last-child td, &:last-child th': {
                  // border: 0,
                },
              }}
              style={{ width: '100%' }}
            >
              <TableCell
                component="th"
                scope="row"
                style={{ padding: '30px 0px' }}
              >
                <img
                  style={{ maxHeight: '120px', maxWidth: '200px' }}
                  src={row?.image}
                  alt="img"
                />
              </TableCell>
              <TableCell component="th" scope="column">
                <Typography style={{ fontSize: '17px' }}>
                  {row?.title}
                </Typography>
                <Typography style={{ fontSize: '17px', margin: '10px 0px' }}>
                  {row.width} x {row.height}
                  {row.unit === '0' && ' in '}
                  {row.unit === '1' && ' cm '}
                  {!row.unit && ' cm '}
                </Typography>
                <Typography style={{ fontSize: '17px' }}>
                  Print on {row?.print}
                </Typography>
              </TableCell>
              <TableCell component="th" scope="column">
                <Typography style={{ fontSize: '17px' }}>
                  Price {row.price.toLocaleString()} $
                </Typography>
                <Typography style={{ fontSize: '17px', margin: '10px 0px' }}>
                  Tax 000 $
                </Typography>
                <Typography style={{ fontSize: '17px' }}>
                  Shippmment 150 $
                </Typography>
              </TableCell>
              <TableCell style={{ fontSize: '17px', fontWeight: 600 }}>
                Total : 120.150 $
                <Typography
                  style={{
                    fontSize: '17px',
                    margin: '10px 0px',
                    color: 'transparent',
                  }}
                >
                  T
                </Typography>
                <Typography style={{ fontSize: '17px', color: 'transparent' }}>
                  T
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Button variant="outlined" style={{ fontWeight: 600 }}>
                  Delivered
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
