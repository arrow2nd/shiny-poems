import React, { HTMLProps, useState } from "react";

const placeholderValue = "empty";

export default function Select(props: HTMLProps<HTMLSelectElement>) {
  const [isSelected, setSelected] = useState(false);

  return (
    <select
      className={`p-2 w-full lg:w-72 m-2 bg-white border-main border-2 rounded-md appearance-none ${
        isSelected ? "text-main" : "text-sub"
      }`}
      {...props}
      defaultValue={placeholderValue}
      onChange={(event) => {
        if (!isSelected && event.currentTarget.value !== placeholderValue) {
          setSelected(true);
        }
      }}
    >
      {props.placeholder && (
        <option value={placeholderValue} disabled style={{ display: "none" }}>
          {props.placeholder}
        </option>
      )}
      {props.children}
    </select>
  );
}
