import React from "react";
import './CentraliseForm'

export const CentraliseForm = (props) => {
  const {
    id,
    type,
    placeholder,
    value,
    label,
    htmlFor,
    name,
    className,
    handleChange,
    cols,
    rows,
    checked,
    showPassword,
    handleShowPassword,
    errmsg
  } = props;
  return (
    <div>
      {(type === "text" || type === "email" || type === "number") && (
        <div className="mb-2 form-group">
          <label htmlFor={htmlFor}>{label}</label>
          <input
            type={type}
            placeholder={placeholder}
            id={id}
            name={name}
            className={`${className} form-control`}
            onChange={handleChange}
            value={value}
          />
          {errmsg && <p className="text-warning m-0">{errmsg}</p>}
        </div>
      )}
      {type === "password" && (
        <div className="mb-2 form-group">
          <label htmlFor={htmlFor}>{label}</label>
          <div className="password-input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              id={id}
              name={name}
              className={`${className} form-control`}
              onChange={handleChange}
              value={value}
            />
            <span className="password-toggle" onClick={handleShowPassword}>
              {showPassword ? "Hide" : "Show"}
            </span>
            {errmsg && <p className="text-warning m-0">{errmsg}</p>}
          </div>
        </div>
      )}
      {type === "textarea" && (
        <div className="mb-2 form-group">
          <label htmlFor={htmlFor}>{label}</label>
          <textarea
            type={type}
            name={name}
            id={id}
            cols={cols}
            rows={rows}
            className={`${className} form-control`}
            onChange={handleChange}
            value={value}
            placeholder={placeholder}
          />
          {errmsg && <p className="text-warning m-0">{errmsg}</p>}
        </div>
      )}
      {(type === "date" || type === "time" || type === "color") && (
        <div className="mb-2 form-group">
          <label htmlFor={htmlFor}>{label}</label>
          <input
            type={type}
            id={id}
            name={name}
            className={`${className} form-control`}
            onChange={handleChange}
            checked={checked}
          />
        </div>
      )}
      {/* {type === "radio" && (
        <div className="mb-2 form-group">
          <label htmlFor={htmlFor}>{label}</label>
          <input
            type={type}
            id={id}
            name={name}
            className={`${className} form-check-input`}
            onChange={handleChange}
            checked={checked}
            required
          />
        </div>
      )} */}
      {type === "checkbox" && (
        <div className="mb-2 form-group">
          <label htmlFor={htmlFor} className="form-check-label">
            {label}
          </label>
          <input
            type={type}
            id={id}
            name={name}
            className={`${className} form-check-input`}
            onChange={handleChange}
            checked={checked}
          />
        </div>
      )}
    </div>
  );
};
