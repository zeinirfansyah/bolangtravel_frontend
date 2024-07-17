import React from "react";
import PropTypes from "prop-types";

export const Input = ({ ...props }) => {
  return (
    <>
      <input
        type={props.type}
        value={props.value}
        id={props.id}
        name={props.name}
        required={props.required}
        minLength={props.minLength}
        maxLength={props.maxLength}
        size={props.size}
        placeholder={props.placeholder}
        onChange={props.onChange}
        className={`border bg-white rounded-lg p-4 w-full focus:outline-secondary transition-all duration-500 ${props.className}`}
      />
    </>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  size: PropTypes.number,
  placeholder: PropTypes.string,
  className: PropTypes.string
};
