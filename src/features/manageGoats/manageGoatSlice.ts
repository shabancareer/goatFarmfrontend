import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store.ts'

interface ManageGoat {
    allGoats: number[]
}

// Define the initial state using that type
const initialState: ManageGoat = {
    allGoats: [],
}

export const manageGoatSlice = createSlice({
    name: 'manageGoat',
    initialState,
    reducers: {
        increment: (state) => {
            state.allGoats.push(1)
        },
        decrement: (state) => {
            state.allGoats.pop()
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.allGoats.push(action.payload)
        }
    }
})

export const { increment, decrement, incrementByAmount } = manageGoatSlice.actions
export const selectCount = (state: RootState) => state.manageGoat.allGoats
export default manageGoatSlice.reducer