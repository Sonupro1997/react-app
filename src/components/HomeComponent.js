import React, { useState,useEffect } from "react";
import Dropdown from "./UI/Dropdown";

const HomeComponent = () => {
    const [selected, setSelected] = useState([]);
    const components =[{ "title": "React", "id": "react" }, { "title":
    "Angular", "id": "angular" }, { "title": "Vue", "id": "vue" }, { "title":
    "Ember", "id": "ember" } ]
    const colors = ["red", "yellow", "green", "blue"]
    const [searchable, setSearchable] = useState(true);
    const [multiselect, setMultiselect] = useState(true);
    const [key, setKey] = useState(1)
    
    useEffect(() => {
     setKey(key+1)
    }, [selected])
    
    
  return (
    <>
    <p className="container">Selected:{selected.map((val) => JSON.stringify(val))}</p>
      <div className="container">
        <Dropdown
          key={key}
          prompt="Select an option..."
          multiselect={multiselect}
          options={colors}
          searchable={searchable}
          id="id"
          label="title"
          value={selected}
          handleClear={() => setSelected([])}
          handleSelectAll={() =>setSelected(colors)}
          onChange={(val) => {
            if(typeof option === 'object')
            setSelected((prevVal) => [...(prevVal.find(x => x.id === val.id) ? [...prevVal.filter(x => x.id !== val.id)] : [...(multiselect ? prevVal : []), val])]);
            else
            setSelected((prevVal) => [...(prevVal.find(x => x === val) ? [...prevVal.filter(x => x !== val)] : [...(multiselect ? prevVal : []), val])]);

          }}
        />
      </div>
      
    </>
  )
}

export default HomeComponent