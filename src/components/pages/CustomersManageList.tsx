import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import DenseTable from '../controls/DenseTable';
import DataGridDemo from '../controls/DataGridDemo';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


export default function CustomersManageList() {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Define the API endpoint URL
    const apiUrl = 'http://localhost:8081/api/v1/customer/getall'; // Replace with your API endpoint

    console.info('Getting Data from API...');


    // Fetch data from the API
    axios.get(apiUrl)
      .then((response) => {
        console.info('Data received from API...');
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to fetch data only once when the component mounts



  return (
    <Paper sx={{ maxWidth: 4000, margin: 'auto', overflow: 'hidden' }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Button variant="outlined" color="info" >MANAGE CUSTOMER LIST</Button>
      </AppBar>
      

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>customerid</TableCell>
            <TableCell align="right">surname</TableCell>
            <TableCell align="right">email</TableCell>
            <TableCell align="right">geography</TableCell>
            <TableCell align="right">phone</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((row) => (
            <TableRow key={row.customerid} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.surname}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.geography}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.age}</TableCell>

              <TableCell align="right">
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={() => {
                    alert("clicked");
                  }}
                >
                  Add{" "}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      {/* <DenseTable rows={customers}/> */}
      {/* <DataGridDemo/> */}
      {/* <SignUp/> */}

    </Paper>
  );
}
