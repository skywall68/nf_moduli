import React, {useState} from 'react';
import DatePicker from "react-datepicker";

import './Calendario.css'

const Calendario = ({setDataConsegnaApp}) => {
    const [startDate, setStartDate] = useState(new Date());
    

    //formatto la data in gg/mm/aaaa
      const formatDate = (date) => {
      const giorno = date.getDate();
      const mese = date.getMonth() + 1;
      const anno = date.getFullYear();

    //aggiungo lo zero nei giorni e nei mesi
    const aggiungiZero=(valore)=> valore < 10 ? `0${valore}` : valore
    return `${aggiungiZero(giorno)}/${aggiungiZero(mese)}/${anno}`;
      }
    

    

     const handleDateChange = (date) => {
      const data_italiana = formatDate(date);
      setDataConsegnaApp(data_italiana);
      console.log('dentro picket:', data_italiana);
      setStartDate(date); // Aggiorna lo stato solo quando la data cambia
    };
  

    return (
      <DatePicker 
      selected={startDate} 
      dateFormat="dd/MM/yyyy"
      onChange={handleDateChange}
      
       
         />
         
    );
   
  
}

export default Calendario