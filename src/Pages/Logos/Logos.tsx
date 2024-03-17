import { FunctionComponent, useState } from "react";
import "./styles.css";
import { Box, Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import AreaCard from "../../Comonents/Card";
import Maruthi from '../../Images/maruthi-logo.png'
import LogoData from '../../Utility/Logos.json'
import { Brand, CardData } from "../../Types/CardData";
import CustomizedDialogs from "../../Comonents/Modal";
import { useNavigate } from "react-router-dom";


const Logos: FunctionComponent = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Brand | null>(null);
  const brandData = useSelector((state:any) => state.data.brands);
  const navigate = useNavigate();
  const handleCardClick = (cardData: Brand) => {
    setSelectedCard(cardData); // Set the selected card data
    const selectedBrand = [cardData].find((el: any) => el.id === cardData.id);
    console.log('===21', selectedBrand)
    navigate(`/details/${cardData.id}`, { state: { selectedBrand: selectedBrand } });
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
    setSelectedCard(null); // Clear the selected card data
  };
    return (
      <Box component="main" 
        sx={{
        flexGrow: 1, 
        p: 10,
        background: '#e9ebee'
        }}
      >
        <Grid container spacing={3}>
          {brandData.map((item: Brand) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={item.id}>
            <AreaCard
              height="75px"
              width="250px"
              image={item.logo || "https://mir-s3-cdn-cf.behance.net/project_modules/max_632/646dde13653589.56276648d04c6.png"}
              title={item.brand}
              onClick={() => handleCardClick(item)}
            />
        </Grid>
      ))}
       <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
       <Card sx={{ maxWidth: 345, width: '250px', height: '165px' }}>
        <CardActionArea onClick={() => setOpenModal(true)}>
        <CardContent >
          <Typography sx={{ padding: '50px'}} gutterBottom variant="h5" component="div" align="center">
            More
          </Typography>
        </CardContent>
        </CardActionArea>
       </Card>
        </Grid>
    </Grid>
    <CustomizedDialogs open={openModal} handleClose={handleCloseModal} cardData={selectedCard} />
  </Box>
      );
}
export default Logos