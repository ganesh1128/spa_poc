import { FunctionComponent } from "react";
import "./styles.css";
import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import AreaCard from "../../Comonents/Card";
import Maruthi from '../../Images/maruthi-logo.png'
import LogoData from '../../Utility/Logos.json'

const Logos: FunctionComponent = () => {
    // const welcomeName = useSelector((state: any) => state.signUp.firstName)
    return (
      <Box component="main" 
        sx={{
        flexGrow: 1, 
        p: 10,
        background: '#e9ebee'
        }}
      >
        <Grid container spacing={3}>
          {LogoData.Logos.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={item.id}>
            <AreaCard
              height="75px"
              width="250px"
              image={item.image}
              title={item.title}
            />
        </Grid>
      ))}
    </Grid>
      </Box>
      );
}
export default Logos