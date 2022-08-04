import React from "react";

const sep = "%#";

const Field = React.forwardRef(
  ({ option, isActive,checked, multiselect,index, handleSelect, id, label, query }, ref) => {
    let str = typeof option === 'object' ? option[label] : option;
    let strRegExp = new RegExp(query, "gi");
    str = str.replace(strRegExp, sep + "$&" + sep);
    str = str.split("%#");
    return (
      <div
        className={`option ${isActive ? "selected" : null}`}
        key={index}
        ref={(el) => (ref.current[index] = el)}
        onClick={() => {
          handleSelect(option);
        }}
      >
      {multiselect &&  <input type="checkbox" name={`checbox_${index}`} checked={checked} onChange={(e) => {
          e.stopPropagation();
          handleSelect(option);
        }} />}
        {str.map((w, i) => {
          return w.toLowerCase() === query.toLowerCase() ? (
            <b key={i}>{w}</b>
          ) : (
            w
          );
        })}
      </div>
    );
  }
);

export default React.memo(
  Field,
  (prev, next) => prev.isActive === next.isActive && prev.query === next.query
);
