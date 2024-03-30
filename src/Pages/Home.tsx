import React, { FunctionComponent, useEffect, useState } from "react";
import { Box, createStyles, makeStyles } from "@mui/material";
import { DropzoneArea } from "material-ui-dropzone";
import UploadFiles from "../Comonents/FileUpload";

const Home: FunctionComponent = () => {
    
    
    return (
        <Box sx={{ flex: '1', p: 2, ml: 5 }}>
         <Box height={50} />
         <UploadFiles />
    
        </Box>
    )
};

export default Home;
