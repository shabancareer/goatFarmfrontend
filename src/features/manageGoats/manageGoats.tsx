import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../reduxHooks/hooks'
import { decrement, increment } from './manageGoatSlice'

export default function ManageGoats() {
    const count = useAppSelector((state) => state.manageGoat.value)
    const dispatch = useAppDispatch()
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <p>{count}</p>
        </div>
    )
}