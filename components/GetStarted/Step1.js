import React, { useState } from 'react';

import FormButton from '../FormButton';
import styles from '../../styles/pages/_Getstarted.module.scss';

const Step1 = ({ stepIncrement, step, clientType, setClientType }) => {
  const [clientTypeError, setClientTypeError] = useState();

  //update client state
  const handleSelectClientType = (index) => (e) => {
    let updatedClientType = [...clientType];

    updatedClientType.forEach((obj, i) => {
      i == index ? (obj.isChecked = e.target.checked) : (obj.isChecked = false);
    });
    setClientType(updatedClientType);
    setClientTypeError(false);
  };

  //go to next step
  const handleNext = () => {
    //check if user clicked an option
    clientType.find((obj) => obj.isChecked == true)
      ? stepIncrement()
      : setClientTypeError(true);
  };

  return (
    <>
      <p>STEP {step}/4 Individual or organization</p>
      <h3>Are you an individual or organization?</h3>
      <form className="form_wrapper step1 ">
        <section className={styles['form_fields']}>
          <fieldset>
            {clientType.map((obj, i) => {
              return (
                <>
                  <label htmlFor={obj.type}>
                    <input
                      type="radio"
                      required
                      key={i}
                      id={obj.type}
                      name="client"
                      value={obj.type}
                      className={styles['radio_shift']}
                      checked={obj.isChecked}
                      onChange={handleSelectClientType(i)}
                    ></input>
                    <p
                      style={{
                        border: clientTypeError
                          ? 'solid red 1px'
                          : 'solid transparent 1px',
                      }}
                    >
                      {obj.icon}
                    </p>
                    <span>{obj.type}</span>
                  </label>
                </>
              );
            })}
          </fieldset>
        </section>
        <section className={styles['form_submit']}>
          <FormButton text={'NEXT'} handleClick={handleNext} />
        </section>
      </form>
    </>
  );
};

export default Step1;
