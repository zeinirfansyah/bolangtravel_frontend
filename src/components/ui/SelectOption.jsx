import React from "react";
import PropTypes, { any } from "prop-types";

const SelectOption = ({ firstOption, options, onChange, default_value, disabled, className }) => {
  return (
    <select
      onChange={onChange}
      className={`${className} border bg-white rounded-lg p-4 w-full focus:outline-secondary focus:ring-0 focus:bg-white transition-all duration-500 `}
    >
      <option value={default_value} disabled={disabled} className="capitalize">
        {firstOption}
      </option>
      {options.map((option, index) => (
        <option key={index} value={option.value} className="capitalize">
          {option.label}
        </option>
      ))}
    </select>
  );
};

SelectOption.propTypes = {
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.any.isRequired,
    })
  ).isRequired,
  default_value: PropTypes.any.isRequired,
  onChange: any.isRequired,
};

export default SelectOption;
