import React from "react"
import { useEffect, useState } from "react"
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Icon from "@mui/material/Icon";
import { blue } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import { Paper, TableContainer } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import DialogActions from "@mui/material/DialogActions";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Dashboard() {

    const [APIData, setAPIData] = useState([]);
    const [open, setOpen] = useState(false);
    const [openDelSucDia, setOpenDelSucDia] = useState(false);
    const [idDelete, setIdDelete] = useState(-1);
    const getStaffsUrl = 'https://65375d0cbb226bb85dd31d49.mockapi.io/api/pe_test/staffs';
    const deleteStaffsUrl = `https://65375d0cbb226bb85dd31d49.mockapi.io/api/pe_test/staffs`;

    useEffect(() => {
        loadStaffs();
    }, [])

    const handleClose = () => {
        setOpen(false);
    };

    const handleOk = () => {
        setOpenDelSucDia(false);
        loadStaffs();
    };

    const deleteStaff = () => {
        setOpen(false);
        axios.delete(deleteStaffsUrl + `/${idDelete}`)
            .then(
                response => {
                    return response.data;
                })
            .then(data => setOpenDelSucDia(true))
            .catch(error => console.log(error.message));

    };

    const showConfirmDeleteDialog = (id) => {
        setIdDelete(id);
        setOpen(true);

    };

    const loadStaffs = () => {

        axios.get(getStaffsUrl).then(
            response => {
                return response.data;
            })
            .then(data => { setAPIData(data.sort((a, b) => { return b.age - a.age })) })
            .catch(error => console.log(error.message));


    };


    return (
        <div>
            <h1 className="font-pages" style={{
                fontSize: "40px",
                textAlign: "center",
                marginTop: "5%",
            }}>Dashboard</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Created At</TableCell>
                            <TableCell align="left">Avatar</TableCell>
                            <TableCell align="left">Age</TableCell>
                            <TableCell align="left">Address</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {APIData.map((staff) => (
                            <TableRow
                                key={staff.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {staff.id}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {staff.name}
                                </TableCell>
                                <TableCell align="left">{staff.createdAt}</TableCell>
                                <TableCell align="right">

                                    <Avatar align="left" alt="Remy Sharp" src={staff.avatar} />

                                </TableCell>
                                <TableCell align="left">{staff.age}</TableCell>
                                <TableCell align="left">{staff.address}</TableCell>
                                <TableCell align="left">
                                    <Stack direction="row" spacing={3}>
                                        <Link to="/AddStaff">
                                            <IconButton><Icon sx={{ color: blue[500] }}>add_circle</Icon></IconButton>
                                        </Link>

                                        <Link to={`/UpdateStaff/${staff.id}`}>
                                            <IconButton><Icon sx={{ color: blue[500] }}>update_circle</Icon></IconButton>
                                        </Link>

                                        <IconButton onClick={(e) => { showConfirmDeleteDialog(staff.id) }}><Icon sx={{ color: blue[500] }}>delete_circle</Icon></IconButton>


                                    </Stack>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete Staff"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Alert severity="warning">
                            <AlertTitle>Are you sure to delete this staff ?</AlertTitle>
                        </Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteStaff}>Yes</Button>
                    <Button autoFocus onClick={handleClose}>
                        No
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openDelSucDia}
                onClose={handleOk}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Message"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Alert severity="success">
                            <AlertTitle>Delete Staff Successfully</AlertTitle>
                        </Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOk}>OK</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}