import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Brand } from '../../Types/CardData';

interface FormData {
  id?: string;
  image?: string;
  brand: string;
  modal: string;
  owner: string;
  budget: string;
  Fuel: string;
  transmission: string;
  bodyType: string;
  location: string;
  kms: string;
}

interface DataState {
  formData: FormData | null;
  brands: Brand[];
}

const initialState: DataState = {
  formData: null,
  brands: [],
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setAllFormData: (state, action: PayloadAction<FormData>) => {
      state.formData = action.payload;
    },
    setBrands: (state, action: PayloadAction<Brand[]>) => {
        state.brands = action.payload;
    }
  },
});

export const { setAllFormData, setBrands } = dataSlice.actions;

export default dataSlice.reducer;
