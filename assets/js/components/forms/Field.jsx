import React from "react";

const Field = ({
  name,
  id = name,
  label,
  labelClassName = "form-label mt-1",
  inputClassName = "form-control",
  type = "text",
  placeholder = "",
  value,
  onChange,
  checked,
  ariaDescribedby,
  error = "",
}) => {

  return (
    <div className="form-group">
      {" "}
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>{" "}
      <input
        type={type}
        className={inputClassName}
        placeholder={placeholder}
        value={value}
        checked={value}
        onChange={onChange}
        name={name}
        id={id}
        aria-describedby={ariaDescribedby}
      />{" "}
    </div>
  );
};

export default Field;
