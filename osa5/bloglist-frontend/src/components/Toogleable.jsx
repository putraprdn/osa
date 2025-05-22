import { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";

const Toggleable = forwardRef(({ children, buttonLabel }, refs) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <>
      <button
        style={{ display: visible ? "none" : "" }}
        onClick={toggleVisibility}
      >
        {buttonLabel}
      </button>
      <div style={{ display: visible ? "" : "none" }}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </>
  );
});

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Toggleable.displayName = "Toggleable";

export default Toggleable;
