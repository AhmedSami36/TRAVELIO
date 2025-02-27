import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const ChallengeType = [
  {
    name: "Photo",
    photo:
      "https://drprem.com/travel/wp-content/uploads/sites/53/2013/08/Asian-photographer-travel-in-old-temple-in-Bali.jpg",
    link: "/local/photochallenge",
  },
  {
    name: "Puzzle",
    photo:
      "https://st.depositphotos.com/1005233/4708/i/450/depositphotos_47084153-stock-photo-young-attractive-tourist-reading-map.jpg",
    link: "/local/puzzle",
  },
];

export default function LocalChoose() {
  return (
    <>
    <Navbar/>
    <Box
      sx={{
        margin: 0,
        fontFamily: '"Poppins", sans-serif',
        background: "#530358",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Box>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Poppins', fontWeight: '900', mb: 4}}>
          Choose the type of the challenge
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {ChallengeType.map((choice, index) => (
            <Grid item key={index} xs={12} sm={12} md={6}>
              <Link to={choice.link} style={{ textDecoration: "none" }}>
                <Card sx={{ maxWidth: 345, width: '40vw', bgcolor: "white", color: "#7c0074" }}>
                  <CardMedia
                    component="img"
                    height="280"
                    image={choice.photo}
                    alt={choice.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h4" component="div" sx={{ fontFamily: 'Poppins', fontWeight: '900'}}>
                      {choice.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
    </>
  );
}