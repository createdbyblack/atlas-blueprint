import React from 'react';

const FormButton = ({ text, handleClick }) => {
  return (
    <>
      <button type="button" onClick={handleClick}>
        {text}
      </button>
    </>
  );
};

export default FormButton;
