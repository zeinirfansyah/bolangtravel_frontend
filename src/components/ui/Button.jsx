import PropTypes from "prop-types";

export const Button = ({ ...props }) => {
  return (
    <button
      name={props.name}
      id={props.id}
      type={props.type}
      onClick={props.onClick}
      className={`${props.className} font-semibold px-4 py-2 w-full rounded-md border transition-all duration-500`}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool
};
