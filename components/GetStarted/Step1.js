import React, { useState } from 'react';

import FormButton from '../FormButton';
import styles from '../../styles/pages/_Getstarted.module.scss';

const Step1 = ({ stepIncrement, step, clientType, setClientType }) => {
  const [clientTypeError, setClientTypeError] = useState();

  //update client state
  const updateClientType = (index) => (e) => {
    let updatedClientType = [...clientType];
    updatedClientType.forEach((obj, i) => {
      if (i == index) {
        obj.isChecked = e.target.checked;
      } else {
        obj.isChecked = false;
      }
    });
    setClientType(updatedClientType);
    setClientTypeError(false);
  };

  //go to next step
  const handleNext = () => {
    let selectedClientType = clientType.find((obj) => {
      return obj.isChecked == true;
    });

    //check if user clicked an option
    if (selectedClientType == undefined) {
      setClientTypeError(true);
    } else {
      stepIncrement();
    }
  };

  return (
    <>
      <p>STEP {step}/4 Individual or organization</p>
      <p>Are you an individual or organization?</p>
      <form className="form_wrapper">
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
                      onChange={updateClientType(i)}
                    ></input>
                    <p
                      style={{
                        border: clientTypeError
                          ? 'solid red 1px'
                          : 'solid black 1px',
                      }}
                    >
                      {obj.icon}
                    </p>
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
