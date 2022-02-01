import React, { useState } from "react";

const Select = ({options,defaultValue, value, onChange}) => {


   return (
      <div>
         <select 
         onChange={e=> onChange(e.target.value)}
         value={value}>
            <option disabled value='value1'>{defaultValue}</option>
            {options.map(option=>
               <option key={option.value} value={option.value}>
                  {option.name}
               </option> )}
         </select>
      </div>

   )
};

export default Select;