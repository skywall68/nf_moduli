import React, { useState } from 'react';

function MyTable() {
 const [controlli, setControlli] = useState([
 { id: 8, nome: 'Staffe e ganci (c)', conforme: null },
 { id: 9, nome: 'Altri elementi oltre staffe e ganci (A)', conforme: null },
 { id: 10, nome: 'Staffe e ganci (C)', conforme: null },
 { id: 11, nome: 'Dimensione nominale < 150 mm', conforme: null },
 ]);

 const handleCheckboxChange = (event, index) => {
 const newControlli = [...controlli];
 if (event.target.checked) {
   newControlli[index].conforme = event.target.name;
 } else {
   newControlli[index].conforme = null;
 }
 setControlli(newControlli);
 };

 return (
 <table>
   <thead>
     <tr>
       <th>ID</th>
       <th>Nome</th>
       <th>Conforme</th>
       <th>Non Conforme</th>
     </tr>
   </thead>
   <tbody>
     {controlli.map((item, index) => (
       <tr key={item.id}>
         <td>{item.id}</td>
         <td>{item.nome}</td>
         <td>
           <label>
             <input
               type="checkbox"
               name="Conforme"
               checked={item.conforme === 'Conforme'}
               onChange={(event) => handleCheckboxChange(event, index)}
             />
           </label>
         </td>
         <td>
           <label>
             <input
               type="checkbox"
               name="Non Conforme"
               checked={item.conforme === 'Non Conforme'}
               onChange={(event) => handleCheckboxChange(event, index)}
             />
           </label>
         </td>
       </tr>
     ))}
   </tbody>
 </table>
 );
}

export default MyTable;

