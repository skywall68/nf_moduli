import React, {useState} from 'react';
import DatePicker from "react-datepicker";

import './Calendario.css'

const Calendario = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker 
      selected={startDate} 
      onChange={(date) => 
      setStartDate(date)}
      dateFormat="dd/MM/yyyy"
       
         />
    );
  
}

export default Calendario