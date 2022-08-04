import React, {
    useReducer,
    useEffect,
    useRef,
  } from "react";
  import Field from "./Field";
  
  const filterOpts = (q, l, o) => 
  {
    return o.filter(obj => typeof option === 'object' ? obj[l].toLowerCase().includes(q.toLowerCase()) : obj.toLowerCase().includes(q.toLowerCase()))

  }
  

  const Dropdown = ({ options,searchable, multiselect, id, label, prompt, value, onChange,handleSelectAll,handleClear }) => {
    const initialState = {
      open: false,
      query: "",
      filteredOptions: options,
      activeIndex: 0
    };
  
    const [{ open, query, filteredOptions, activeIndex }, dispatch] = useReducer(
      reducer,
      initialState
    );
  
    function reducer(state, action) {
      switch (action.type) {
        case "select":
          return {
            ...state,
            open: true,
            query: "",
            filteredOptions: options
          };
        case "toggle":
          return { ...state, open: !state.open, query: "" };
        case "close":
          return { ...state, open: false, query: "" };
        case "open":
          return { ...state, open: true };
        case "query":
          return {
            ...state,
            query: action.value,
            open: true,
            activeIndex: 0,
            filteredOptions: filterOpts(action.value, label, options)
          };
        default:
          throw new Error("Unexpected action");
      }
    }
  
    const ref = useRef(null);
    const itemsRef = useRef([]);
  
    useEffect(() => {
      function toggle(e) {
        let onInput = e && e.target === ref.current;
        if (!onInput) {
          dispatch({ type: "close" });
        }
      }
      document.addEventListener("click", toggle);
      return () => document.removeEventListener("click", toggle);
    }, [dispatch]);
  
    const handleSelect = (option) => {
      onChange(option);
      dispatch({ type: "select", action: option });
    };
  
    return (
      <div className="dropdown">
        <div
          className="control"
          onClick={() => {
            dispatch({ type: "toggle" });
          }}
        >
          <div className="custom-input">
            <input
              required
              placeholder={value ? value[label] : prompt}
              type="text"
              onChange={(e) => {
                dispatch({ type: "query", value: e.target.value });
              }}
              value={query}
              readOnly={!searchable}
              ref={ref}
            />
          </div>
        </div>
        <div className={`options ${open ? "open" : null}`}>
       {multiselect && <button type="button" onClick={handleSelectAll}>Select All</button>}
          {filteredOptions.map((option, i) => {
            let isActive = false;
            let checked = typeof option === 'object' ? value.find(v => v.id === option[id]) : value.find(v => v === option)
            return (
              
              <Field
                multiselect={multiselect}
                option={option}
                index={i}
                isActive={isActive}
                key={option?.id || i}
                id={id}
                checked={checked}
                label={label}
                handleSelect={handleSelect}
                query={query}
                ref={itemsRef}
              />
            );
          })}
        {multiselect && <button type="button" onClick={handleClear}>Clear</button>}
        </div>
      </div>
    );
  };
  
  export default Dropdown;
  