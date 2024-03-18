import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { CardData, Brand, DetailedView } from '../Types/CardData';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAllFormData, setBrands } from '../Redux/Reducers/dataSlice';
import LogoData from '../Utility/Logos.json'

interface CustomizedDialogProps {
  open: boolean;
  handleClose: () => void;
  cardData: Brand | null;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
    backgroundColor: 'white',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const CustomizedDialogs: FunctionComponent<CustomizedDialogProps> = ({ open, handleClose, cardData }) => {
  const [image, setImage] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [data, setData] = useState<Brand[]>([])
  const dispatch = useDispatch();
  const brandData = useSelector((state:any) => state.data.brands)
  console.log('brand data', brandData)
  let randomId = Math.floor(1000000000 + Math.random() * 9000000000).toString();
  let generateId = Math.floor(1000000000 + Math.random() * 9999999999).toString();
  const [formData, setFormData] = useState<Brand>({
    id: generateId,
    logo: '',
    brand: '',
    detailedView: [
      { 
        modal: '', 
        owner: '', 
        location: '', 
        bodyType: '', 
        transmission: '', 
        Fuel: '', 
        budget: '', 
        kms: '', 
        image: '' ,
        id: randomId
      }],
  });
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const { value, name } = e.target;
    setFormData((prevData: Brand) => ({
      ...prevData,
      detailedView: prevData?.detailedView?.map((item: DetailedView) => ({
        ...item,
        [fieldName]: value
      })),
      [name]: value
    }));
  };
     
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    const pic = e.target.files?.[0];

    if(pic!==undefined){
      const data = new FormData();
        data.append("file", pic);
        data.append("upload_preset", "ganeshdemo");
        data.append("cloud_name", "dzdfvp7wh")
        axios.post("https://api.cloudinary.com/v1_1/dzdfvp7wh/image/upload", data)
          .then(data => {
            setSelectedImage(data?.data?.url.toString());
            console.log(data)
          })  
          .catch((err)=>{
            console.log(err)
          })
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem('brands');
    if (storedData) {
      dispatch(setBrands(JSON.parse(storedData)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('brands', JSON.stringify(brandData));
  }, [brandData]);

  const handleSubmit = async () => {
    const existingBrand = brandData.find((brand:Brand) => brand.brand.toLowerCase() === formData.brand.toLowerCase());
    const formattedData = {
      id: formData.id,
      logo: selectedImage || '',
      brand: formData.brand,
      detailedView: formData?.detailedView?.map(detail => ({
        ...detail,
        image: selectedImage || ''
      }))
    };
    try {
      if(existingBrand) {
        const updateBrands = brandData.map((brand:Brand) => {
          if (brand.brand.toLowerCase() === formData.brand.toLowerCase()) {
            return {
              ...brand,
              detailedView: [...(brand.detailedView || []), ...formattedData.detailedView || []]
            };
          }
          return brand;
        });
        dispatch(setBrands(updateBrands));
       }else {
        const newBrand = {
          ...formattedData,
          id: generateId
        };
        dispatch(setBrands([...brandData, newBrand]));
      }
      handleClose()
    } catch (error) {
      
    }

  };
  
  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {cardData?.brand}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <TextField  
                size="small" 
                variant="outlined" 
                placeholder="Brand" 
                label="Brand"
                name="brand"
                value={formData.brand}
                onChange={(e:any) => handleInputChange(e, 'brand')} 
              />
              <TextField 
              size="small" 
              variant="outlined" 
              placeholder="Modal" 
              label="Modal"
              name="modal"
              value={formData.detailedView?.[0]?.modal}
              onChange={(e:any) => handleInputChange(e, 'modal')} 
               />
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <TextField 
              size="small" 
              variant="outlined" 
              placeholder="No Of Owners" 
              label="No Of Owners"
              name="owner"
              value={formData.detailedView?.[0]?.owner}
              onChange={(e: any) => handleInputChange(e, 'owner')} 
              />
              <TextField 
              size="small" 
              variant="outlined" 
              placeholder="Location" 
              label="Location"
              name="location"
              value={formData.detailedView?.[0]?.location}
              onChange={(e: any) => handleInputChange(e, 'location')} 
              />
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <TextField 
              size="small" 
              variant="outlined" 
              placeholder="Body Type" 
              label="Body Type"
              name="bodyType"
              value={formData.detailedView?.[0]?.bodyType}
              onChange={(e: any) => handleInputChange(e, 'bodyType')} 
              />
              <TextField 
              size="small" 
              variant="outlined" 
              placeholder="Transmission" 
              label="Transmission"
              name="transmission"
              value={formData.detailedView?.[0]?.transmission}
              onChange={(e: any) => handleInputChange(e, 'transmission')} 
              />
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <TextField size="small" 
              variant="outlined" 
              placeholder="Fuel Type" 
              label="Fuel Type"
              name="Fuel"
              value={formData.detailedView?.[0]?.Fuel}
              onChange={(e: any) => handleInputChange(e, 'Fuel')} 
              />
              <TextField 
              size="small" 
              variant="outlined" 
              placeholder="Budget" 
              label="Budget"
              name="budget"
              value={formData.detailedView?.[0]?.budget}
              onChange={(e: any) => handleInputChange(e, 'budget')}
              />
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <TextField 
              size="small" 
              variant="outlined" 
              placeholder="Kms" 
              label="Kms"
              name="kms"
              value={formData.detailedView?.[0]?.kms}
              onChange={(e: any) => handleInputChange(e, 'kms')}
              />
              <input type="file" onChange={handleFileChange} accept='image/*' />
            </div>
            {selectedImage && <img src={selectedImage} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
        </div>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' autoFocus onClick={handleSubmit}>
           Submit
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

export default CustomizedDialogs;
