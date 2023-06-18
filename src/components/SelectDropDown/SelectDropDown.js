import React from "react";
import "./SelectDropDown.css";

export default function SelectDropDown({ name, id, options, selected, setSelection }) {
  return (
    <select
      className="select"
      name={name}
      id={id}
      onChange={(e) => setSelection(e.target.value)}
    >
      <option label=" " disabled selected={selected.length > 0 ? false : true}>
        Select ...
      </option>
      {options.map((item) => (
        <option
          value={item.value}
          selected={selected.length > 0 ? selected === item.name : false}
        >
          {item.name}
        </option>
      ))}
    </select>
  );
}
