import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Button,Stack, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { selectUser, logout } from '../slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];


const AdminView = () => {
    const dispatch = useDispatch();
    // const user = useSelector(selectUser);
    // 
    const Logout = (e) => {
        dispatch(logout());
        window.location.reload()
    };
    const user = useSelector(selectUser);

    const [products, setProducts] = useState([]);
    const [orders, setorders] = useState([]);
    useEffect(() => {
        async function getProducts() {
            await axios.get("http://localhost:3001/api/v1/tickets/all", {
                headers: {
                    "x-access-token": user.token
                },
            }).then((response) => {
                console.log(response);
                setProducts(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }
        async function getorders() {
            await axios.get("http://localhost:3001/api/v1/orders/", {
                headers: {
                    "x-access-token": user.token
                },
            }).then((response) => {
                console.log(response);
                setorders(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }
        getorders();
        getProducts();
    }, [])

    async function deleteProduct(id) {

        //confirm before deleting
        if (!window.confirm("Are you sure you want to delete this ticket?")) {
            return;
        }

        await axios.delete("http://localhost:3001/api/v1/tickets/" + id, {
            headers: {
                "x-access-token": user.token
            },
        }).then((response) => {
            console.log(response);
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            
            <Stack>
                <Button
                    sx={{
                        mt:2,
                        mb: 4,
                        // ml: 4,
                    }}
                    variant="contained" color="primary" href="/addticket"
                    style={{
                    }}>
                    New Ticket
                </Button>
                <Button variant="contained" className="logout__button" onClick={(e) =>
                    Logout(e)}
                    
                    sx={{
                        mb: 4,
                        // ml: 4,
                    }}>
                    Log out
                </Button>
            </Stack>
            <Grid container spacing={4}>
                {products.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <CardMedia
                                component="div"
                                sx={{
                                    // 16:9
                                    pt: '56.25%',
                                }}
                                image={"http://localhost:3001" + card.image}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Event Name : {card.title}
                                </Typography>
                                <Typography>
                                    Ticket Price : {card.price}
                                </Typography>
                                <Typography>
                                    Date : {card.date}
                                </Typography>
                                <Typography>
                                    Venue : {card.venue}
                                </Typography>
                            
                            </CardContent>
                            <CardActions>

                                {user.userType === "b2 uyer" ? <Button size="small">Order</Button> :
                                    <>
                                        <Button size="small" variant="outlined"
                                            onClick={() => { window.location.href = "/addticket/" + card._id }}
                                        >Edit</Button>
                                        <Button color="error" variant="outlined" size="small"
                                            onClick={() => { deleteProduct(card._id) }}
                                        >Delete</Button>
                                    </>}


                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <br></br>
            <Typography
                sx={{
                    mb: 2,
                    fontWeight: 'bold',

                }}>
            ORDERS
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>Date</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Buyer Name</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>Ticket</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {new Date(row.date).toUTCString()}
                                </TableCell>
                                <TableCell align="right">{row.user_name}</TableCell>
                                <TableCell align="right">{row.ticket_name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            <br></br>

        
        </Container>
    );
}

export default AdminView;