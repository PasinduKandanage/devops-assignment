/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";

import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { selectUser } from "../slices/userSlice";
import { useSelector } from "react-redux";
// import { get } from "mongoose";
import { useParams } from "react-router-dom";

const CreateProduct = (props) => {

    const { id } = useParams();

    const user = useSelector(selectUser);

    const [image, setImage] = useState("");
    const [title, settitle] = useState("");
    const [price, setprice] = useState("");
    const [date, setdate] = useState("");
    const [venue, setvenue] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");



    useEffect(() => {
        async function getCompany(id) {
            await axios.get("http://localhost:3001/api/v1/tickets/" + id, {
                headers: {
                    "x-access-token": user.token
                },
            }).then((response) => {
                console.log(response);
                settitle(response.data.title);

                setImage(response.data.image);

                setprice(response.data.price);

                setdate(response.data.date);

                setvenue(response.data.venue)
                // setDescription(response.data.venue);


            }).catch((error) => {
                console.log(error);
            });
        }

        if (id) { getCompany(id) }

    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("image", image);
        formData.append("price", price);
        formData.append("date", date);
        formData.append("venue", venue);



        if (id) {
            await axios.put("http://localhost:3001/api/v1/tickets/" + id, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "x-access-token": user.token
                },
            }).then((response) => {
                console.log(response);
                window.location.href = "/dashboard";
            }).catch((error) => {
                console.log(error);
            });
            return;
        }


        await axios.post("http://localhost:3001/api/v1/tickets", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "x-access-token": user  .token
            },
        }).then((response) => {
            console.log(response);
            window.location.href = "/dashboard";
        }).catch((error) => {
            console.log(error);
        });


    }



    return (

        <Box


        >
            <form onSubmit={handleSubmit}
                style={{
                    paddingTop: 100

                }}

            >
                <Typography
                    variant="h5"
                >
                    Enter Ticket Details:
                </Typography>
                <TextField
                    sx={{
                        mt: 2,
                        mb: 2
                    }}
                    fullWidth
                    type="text"
                    label="Ticket Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => settitle(e.target.value)}

                />
                <TextField
                    sx={{
                        mb: 2
                    }}
                    fullWidth
                    type="Number"
                    label="Price"
                    variant="outlined"
                    value={price}
                    onChange={(e) => setprice(e.target.value)}

                />
                <TextField
                    sx={{
                        mb: 2
                    }}
                    fullWidth
                    type="date"
                    label="Date"
                    variant="outlined"
                    value={date}
                    onChange={
                        (e) => setdate(e.target.value)
                    }

                />
                <TextField
                    sx={{
                        mb: 2
                    }}
                    fullWidth
                    type="text"
                    label="Venue"
                    variant="outlined"
                    value={venue}
                    onChange={
                        (e) => setvenue(e.target.value)
                    }

                />
           
                <input

                    accept="image/*"
                    style={{ display: 'none' }}
                    id="image-upload"
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <label htmlFor="image-upload">
                    <Button 
                    // variant="outlined"
                    variant="contained"
                    component="span"
                        sx={{
                            mb: 2
                        }}
                    >
                        Upload Image
                    </Button>
                </label>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{
                        marginTop: "30px",

                    }}>
                    Submit
                </Button>
            </form>
        </Box>
    );
}

export default CreateProduct;