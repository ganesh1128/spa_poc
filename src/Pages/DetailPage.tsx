import React, { FunctionComponent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Checkbox, FormControlLabel, RadioGroup, Radio, Button, FormGroup, Stack, Autocomplete, Card, CardMedia, CardContent } from "@mui/material";
import { Brand, DetailedView } from "../Types/CardData";
import { useBrandContext } from "../Utility/Context/DataContext";

const DetailsPage: FunctionComponent = () => {
    const location = useLocation();
    const selectedCardData: Brand | null = location.state?.selectedBrand;
    const { selectedBrand } = useBrandContext(); 
    const [city, setCity] = useState('');
    const [bodyType, setBodyType] = useState('');
    const [owners, setOwners] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [transmission, setTransmission] = useState('');
    const [data, setData] = useState(selectedBrand)
    const [selectedModels, setSelectedModels] = useState<string[]>([]);
    const [selectedOwners, setSelectedOwners] = useState<string[]>([]);
    const [filteredData, setFilteredData] = useState<any>(data?.detailedView);
    const [selectedBudget, setSelectedBudget] = useState<string>('');
    const navigate = useNavigate();
    const BodyTypes = [
      { title: 'sedan', },
      { title: 'suv'},
      {title: 'hatchpack'}
     ]
    const OwnerType = ["1","2","3"]
    const handleModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (selectedModels.includes(value)) {
          setSelectedModels(selectedModels.filter(model => model !== value));
      } else {
          setSelectedModels([...selectedModels, value]);
      }
  };
    const handleOwnerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (selectedOwners.includes(value)) {
          setSelectedOwners(selectedOwners.filter(owner => owner !== value));
      } else {
          setSelectedOwners([...selectedOwners, value]);
      }
  };
useEffect(() => {
    console.log(!filteredData)
    console.log('45')
   if(!filteredData)  navigate('/')
})
  const applyFilters = () => {
    if(filteredData == 'undefined' || filteredData == undefined) navigate('/')
     let filteredResults = data?.detailedView?.filter((item: DetailedView) => {
        let allConditionsMet = true;
        if (city !== '' && item.location.toLowerCase() !== city.toLowerCase()) {
            allConditionsMet = false;
        }
        if (transmission !== '' && item.transmission.toLowerCase() !== transmission.toLowerCase()) {
            allConditionsMet = false;
        }
        if (fuelType !== '' && item.Fuel.toLowerCase() !== fuelType.toLowerCase()) {
            allConditionsMet = false;
        }
        if (bodyType !== '' && item.bodyType.toLowerCase() !== bodyType.toLowerCase()) {
            allConditionsMet = false;
        }
        if (selectedModels.length > 0 && !selectedModels.includes(item.modal)) {
          allConditionsMet = false;
        }
        if (selectedOwners.length > 0 && !selectedOwners.includes(item.owner)) {
          allConditionsMet = false;
        }
        if (selectedBudget) {
          const budget = parseInt(item.budget);
          if (selectedBudget === 'lt2' && budget >= 2) {
              allConditionsMet = false;
          } else if (selectedBudget === '2to4' && (budget < 2 || budget >= 4)) {
              allConditionsMet = false;
          } else if (selectedBudget === '4to6' && (budget < 4 || budget >= 6)) {
              allConditionsMet = false;
          } else if (selectedBudget === 'gt6' && budget < 6) {
              allConditionsMet = false;
          }
      }
        return allConditionsMet;
      });
    setFilteredData(filteredResults);
    setFilteredData((filteredResults:any) => {
        return filteredResults;
    });  
};

const resetFilters = () => {
    setCity('');
    setBodyType('');
    setOwners('');
    setFuelType('');
    setTransmission('');
    setData(selectedCardData);
    setSelectedModels([]);
    setSelectedOwners([]);
    setSelectedBudget('');
    setFilteredData([]);
};
    return (
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <Box sx={{ flex: '1', p: 2, ml: 5 }}>
            <Box height={50} />
                <Box mb={2}>
                    <Typography variant="h4">Filters</Typography>
                </Box>
                <Box mb={2}>
                <Typography variant="h6" mb={2}>Location</Typography>
                    <FormControl variant="outlined" >
                        <InputLabel id="city-select-label">City</InputLabel>
                        <Select
                            labelId="city-select-label"
                            id="city-select"
                            value={city}
                            onChange={(e) => setCity(e.target.value as string)}
                            label="City"
                            style={{ width: 300}}
                        >
                            <MenuItem value="hyderabad">Hyderabad</MenuItem>
                            <MenuItem value="bangalore">Bangalore</MenuItem>
                            <MenuItem value="chennai">Chennai</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box mb={2}>
                <Typography variant="h6" mb={2}>Body Type</Typography>
                <Stack spacing={2} sx={{ width: 300 }}>
                <Autocomplete
                  disableClearable
                  options={BodyTypes.map((option) => option.title)}
                  onChange={(e:any, value) => setBodyType(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search input"
                      InputProps={{
                        ...params.InputProps,
                        type: 'search',
                      }}
                      style={{ width: 300}}
                      onChange={(e:any) => setBodyType(e.target.value)}
                    />
                  )}
                />
              </Stack>
                </Box>
                <Box mb={2}>
                    <FormControl component="fieldset">
                        <Typography variant="h6">Brands</Typography>
                        <FormGroup>
                        {data?.detailedView?.map((item:DetailedView, index:number) => (
                            <FormControlLabel
                                key={index}
                                control={<Checkbox checked={selectedModels.includes(item.modal)} onChange={handleModelChange} value={item.modal} />}
                                label={item.modal}
                            />
                          ))}
                        </FormGroup>
                    </FormControl>
                </Box>
                <Box mb={2}>
                    <FormControl component="fieldset">
                        <Typography variant="h6">Owners</Typography>
                        <FormGroup>
                        {OwnerType.map((item, index) => (
                            <FormControlLabel
                                key={index}
                                control={<Checkbox checked={selectedOwners.includes(item)} onChange={handleOwnerChange} value={item} />}
                                label={item}
                            />
                          ))}
                        </FormGroup>
                    </FormControl>
                </Box>
                <Box mb={2}>
                    <FormControl component="fieldset">
                      <Typography variant="h6">Budget</Typography>
                      <Stack direction="row" spacing={1}>
                       <Button
                            variant={selectedBudget === 'lt2' ? 'contained' : 'outlined'}
                            onClick={() => setSelectedBudget('lt2')}
                            sx={{borderRadius: '20px', height: '30px'}}
                        >
                            Less than 2L
                        </Button>
                        <Button
                            variant={selectedBudget === '2to4' ? 'contained' : 'outlined'}
                            onClick={() => setSelectedBudget('2to4')}
                            sx={{borderRadius: '20px', height: '30px'}}
                        >
                            2L - 4L
                        </Button>
                        </Stack>
                        <Stack direction="row" spacing={1} mt={2}>
                       <Button
                            variant={selectedBudget === '4to6' ? 'contained' : 'outlined'}
                            onClick={() => setSelectedBudget('4to6')}
                            sx={{borderRadius: '20px', height: '30px'}}
                        >
                            4L - 6L
                        </Button>
                        <Button
                            variant={selectedBudget === 'gt6' ? 'contained' : 'outlined'}
                            onClick={() => setSelectedBudget('gt6')}
                            sx={{borderRadius: '20px', height: '30px'}}
                        >
                            Greater than 6L
                        </Button>
                    </Stack>
                      
                    </FormControl>
                </Box>
                <Box mb={2}>
                    <FormControl component="fieldset">
                        <Typography variant="h6">Fuel Type</Typography>
                        <RadioGroup
                            aria-label="fuelType"
                            name="fuelType"
                            value={fuelType}
                            onChange={(e) => setFuelType(e.target.value)}
                        >
                            <FormControlLabel value="petrol" control={<Radio />} label="Petrol" />
                            <FormControlLabel value="diesel" control={<Radio />} label="Diesel" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box mb={2}>
                    <FormControl component="fieldset">
                        <Typography variant="h6">Transmission</Typography>
                        <RadioGroup
                            aria-label="transmission"
                            name="transmission"
                            value={transmission}
                            onChange={(e) => setTransmission(e.target.value)}
                        >
                            <FormControlLabel value="manual" control={<Radio />} label="Manual" />
                            <FormControlLabel value="automatic" control={<Radio />} label="Automatic" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box>
                    <Button variant="contained" color="primary" onClick={applyFilters}>Apply</Button>
                    <Button variant="outlined" color="primary" onClick={resetFilters} sx={{marginLeft: '10px'}}>Reset</Button>
                </Box>
            </Box>
            <Box sx={{ flex: '1', p: 2, position: 'sticky', top: 0, maxHeight: 'calc(100vh - 50px)', overflowY: 'auto' }}>
            <Box height={50} />
              <Typography variant="h4" ml={2} mt={2}>{data?.brand}</Typography>
              {
              filteredData?.map((el:DetailedView,index:any) => {
                return(
                    <Box key={index} p={2}>
                        <Card sx={{ maxWidth: 345 }}>
                          <CardMedia
                            component="img"
                            sx={{ height: 140, display: 'flex', justifyContent: 'center' }}
                            image= {el.image}
                            title={el.modal}
                            alt={el.modal}
                            style={{ display: 'inline-block', objectFit: 'cover', width: 'auto', marginTop: '15px', marginLeft: '15px' }}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                              {el.modal}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {el.location} , {el.transmission} , {el.bodyType}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Price: {el.budget}L , KMS: {el.kms}, {el.Fuel}
                            </Typography>
                          </CardContent>
                        </Card>
                    </Box>
                )
              })}
             <Box pt={5}>
              {
                filteredData?.length == 0 &&  <Typography sx={{color: 'red'}}>No Results found</Typography>
              
              }
             </Box>
            </Box>
        </Box>
    );
};

export default DetailsPage;
