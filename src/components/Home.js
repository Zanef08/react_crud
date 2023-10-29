import { CardMedia, Paper, TableContainer } from "@mui/material";
import React from "react"
import { useEffect, useState } from "react"
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Icon from "@mui/material/Icon";
import { green } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import IconButton from '@mui/material/IconButton';
import { Card, CardContent } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";



export default function Home() {

    const [APIData, setAPIData] = useState([]);
    const getStaffsUrl = 'https://65375d0cbb226bb85dd31d49.mockapi.io/api/pe_test/staffs';

    useEffect(() => {
        fetch(getStaffsUrl).then(
            response => {
                if (!response.ok) {
                    throw new Error(`HTTP status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => { setAPIData(data.sort((a, b) => { return b.age - a.age })) }) //sort by age theo desc
            //sort by age theo asc -> a - b
            .catch(error => console.log(error.message));

    }, [])


    return (
        <div>
            <h1 className="font-pages" style={{
                fontSize: "40px",
                textAlign: "center",
                marginTop: "5%",
            }}>Home</h1>

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {APIData.map((staff) => (
                    <Grid item xs={12} sm={6} md={4} key={staff.id}>
                        <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                sx={{ height: 400 }}
                                image={staff.avatar}
                                title="green iguana"
                            />
                            <CardContent sx={{ flex: 1 }}>
                                <Typography variant="h5" component="div">
                                    <Link to={`detail/${staff.id}`} style={{ textDecoration: 'none', color: '#1976D2'}}>
                                        {staff.name}
                                    </Link>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {staff.address}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Age: {staff.age}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={`detail/${staff.id}`} style={{ textDecoration: 'none' }}>
                                    <Button size="small" variant="outlined" color="primary">
                                        Detail
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}