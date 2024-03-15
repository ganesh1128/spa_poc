import { FunctionComponent, useState } from "react";
import "./styles.css";
import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import AreaCard from "../../Comonents/Card";
import Maruthi from '../../Images/maruthi-logo.png'
import LogoData from '../../Utility/Logos.json'
import { CardData } from "../../Types/CardData";
import CustomizedDialogs from "../../Comonents/Modal";


const Logos: FunctionComponent = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  const handleCardClick = (cardData: CardData) => {
    setSelectedCard(cardData); // Set the selected card data
    setOpenModal(true); // Open the modal
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
          {LogoData.Logos.map((item: CardData) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={item.id}>
            <AreaCard
              height="75px"
              width="250px"
              image={item.image}
              title={item.title}
              // onClick={() => handleCardClick(item)}
            />
        </Grid>
      ))}
       <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <AreaCard
              width="250px"
              title="More"
              onClick={() => setOpenModal(true)} 
          />
        </Grid>
    </Grid>
    <CustomizedDialogs open={openModal} handleClose={handleCloseModal} cardData={selectedCard} />
  </Box>
      );
}
export default Logos