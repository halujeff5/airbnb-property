import React, { useEffect, useState, useContext } from 'react';
import './App.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationContext } from './hooks/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { MobileDatePicker, DesktopDatePicker } from '@mui/x-date-pickers';
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import { useMediaQuery } from '@mui/material';
import Header from './Header'
import { useNavigate } from 'react-router-dom';

const today = new Date()
const markedDates = [
  dayjs(today),
  // dayjs("2025-10-14"),
  // dayjs("2025-10-20"),
];
console.log('1', dayjs(today))

export default function BasicDateCalendar() {
  const navigate = useNavigate();
  const isSmall = useMediaQuery('(max-wdith: 550px)');
  const PickerComponent = isSmall ? MobileDatePicker : DesktopDatePicker;

  const today = new Date()
  const date = today.toString().slice(4, 7)
  const year = today.toString().slice(10, 15)
  console.log(date, year)

  const [booked, setBooked] = React.useState<any>([])
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const [checkin, setCheckin] = React.useState<Dayjs | null>(dayjs(null));
  const [checkout, setCheckout] = React.useState<Dayjs | null>(dayjs(null));


  console.log('CI', checkin, checkout)
  const bookingCtx = useContext(LocalizationContext)
  if (bookingCtx) {
    console.log("HERE")
    bookingCtx.checkinDate = checkin
    bookingCtx.checkoutDate = checkout
    }
  
  function navigateTo() {
    navigate('/reservation')
  }

  const getReservations = async () => {
    const res = await fetch(`http://localhost:4242/?date=${date}&year=${year}`);
    const data = await res.json()
    console.log(data)
    setBooked(data)
    console.log('X', data[0]['bk'].split('T')[0])
    for (let i = 0; i < data.length; i++) {
      markedDates.push(dayjs(data[i]['bk'].split('T')[0]))
    }
  }

  
  console.log(markedDates)

  const isDateDisabled = (day: Dayjs) =>
    markedDates.some((disabledDay) => day.isSame(disabledDay, "day"));


  useEffect(() => {
    getReservations()
  }, []);

  const CustomDay: React.FC<PickersDayProps<Dayjs>> = (props) => {
    const { day, outsideCurrentMonth, ...other } = props;

    const isMarked = markedDates.some((marked) => day.isSame(marked, "day"));

    return (
      <PickersDay
        {...other}
        day={day}
        outsideCurrentMonth={outsideCurrentMonth}
        sx={{
          ...(isMarked && {
            backgroundColor: "#1976d2",
            color: "fff",
            borderRadius: "50%",
            "&:hover": { backgroundColor: "#115293" },
          }),
        }}
      />
    );
  };

  const handleCheckInChange = (newValue: Dayjs | null) => {
    setCheckin(newValue);
    if (newValue && checkout && newValue.isAfter(checkout)) {
      // Ensure checkout is never before checkin
      setCheckout(newValue.add(1, "day"));
    }
  };
  const handleCheckOutChange = (newValue: Dayjs | null) => {
    setCheckout(newValue);
  };

  return (

    <>
      <Header />
      <div className='title'>
        Black Diamond Escape
      </div>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ padding: 20 }}>
        <DateCalendar showDaysOutsideCurrentMonth
          value={value}
          onChange={(newValue) => setValue(newValue)}
          slots={{ day: CustomDay }}
          shouldDisableDate={(day) => day.isBefore(dayjs(), "day")} />
      </div>

      <div id='phone-dim'>
        <PickerComponent className='MuiInputBase-input'
          label="Checkin"
          value={checkin}
          onChange={handleCheckInChange}
          shouldDisableDate={isDateDisabled}
          minDate={dayjs()}
          slots={{
            day: CustomDay
          }}
          slotProps={{
            textField: { size: 'small', fullWidth: false },
          }} />

        <PickerComponent className='MuiInputBase-input'
          label="Checkout"
          value={checkout}
          onChange={handleCheckOutChange}
          shouldDisableDate={isDateDisabled}
          slots={{
            day: CustomDay
          }}
          slotProps={{
            textField: { size: 'small', fullWidth: false },
          }}
          minDate={dayjs()} />
      </div>
      </LocalizationProvider>
      <Button variant='contained' endIcon={<SendIcon />} onClick={navigateTo} >
        Book
      </Button>
    </>
  );
}