import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
    value: number,
    name:string
}

const initialState: CounterState = {
    value: 0,
    name:""
} as CounterState;

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        setName:(state,action)=>{
            state.name= action.payload
        }
    }
})

export const {increment, decrement,setName} = counterSlice.actions
export default counterSlice.reducer