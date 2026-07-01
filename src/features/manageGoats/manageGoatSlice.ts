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
//no need to use redux for goats sharing in components use react query
export const manageGoatSlice = createSlice({
    name: 'manageGoat',
    initialState,
    reducers: {
        addGoat: (state, action: PayloadAction<any>) => {
            state.allGoats = [...state.allGoats, action.payload]
        },
        removeGoat: (state, action: PayloadAction<any>) => {
            state.allGoats = state.allGoats.filter((goat: any) => goat !== action.payload)
        },
        updateGoat: (state, action: PayloadAction<any>) => {
            state.allGoats = state.allGoats.map((goat: any) => goat.id === action.payload.id ? action.payload : goat)
        },
        getAllGoats: (state, action: PayloadAction<any>) => {
            state.allGoats = action.payload
        }
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.allGoats.push(action.payload)
        // }
    }
})

export const { addGoat, removeGoat, updateGoat, getAllGoats } = manageGoatSlice.actions
export const selectCount = (state: RootState) => state.manageGoat.allGoats
export default manageGoatSlice.reducer