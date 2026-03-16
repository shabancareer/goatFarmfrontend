import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store.ts'

interface ManageGoat {
    value: number
}

// Define the initial state using that type
const initialState: ManageGoat = {
    value: 0,
}

export const manageGoatSlice = createSlice({
    name: 'manageGoat',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        }
    }
})

export const { increment, decrement, incrementByAmount } = manageGoatSlice.actions
export const selectCount = (state: RootState) => state.manageGoat.value
export default manageGoatSlice.reducer