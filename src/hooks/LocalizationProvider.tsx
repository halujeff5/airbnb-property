import React, {createContext, useContext, useState, ReactNode} from 'react'
import dayjs, { Dayjs } from 'dayjs';

interface myContext {
    checkinDate : Dayjs | string | null,
    checkoutDate : Dayjs | string | null,
    value : Number | string | null
}



export const LocalizationContext = createContext<myContext | null>(null)


export const LocalizationProvider =({children} : any) => {
    
    const [checkinDate, setCheckinDate] = React.useState<Dayjs | string | null>('')
    const [checkoutDate, setCheckoutDate] = React.useState<Dayjs | string | null>('')

    const value = null


    return (
        <LocalizationContext value = {{checkinDate, checkoutDate, value }}>
            {children} 
            </LocalizationContext>
    )
}