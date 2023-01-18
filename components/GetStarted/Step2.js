import React, { useState } from 'react';

import FormButton from '../FormButton';
import styles from '../../styles/pages/_Getstarted.module.scss';

const Step2 = ({ stepIncrement, step, peopleCount, setPeopleCount }) => {
  const [peopleCountError, setPeopleCountError] = useState();

  //update count state
  const updatePeopleCount = (index) => (e) => {
    let updatedPeopleCount = [...peopleCount];
    updatedPeopleCount.forEach((obj, i) => {
      if (i == index) {
        obj.isChecked = e.target.checked;
      } else {
        obj.isChecked = false;
      }
    });
    setPeopleCount(updatedPeopleCount);
    setPeopleCountError(false);
  };
  //go to next step
  const handleNext = () => {
    let selectedPeopleCount = peopleCount.find((obj) => {
      return obj.isChecked == true;
    });

    //check if user clicked an option
    if (selectedPeopleCount == undefined) {
      setPeopleCountError(true);
    } else {
      stepIncrement();
    }
  };

  return (
    <>
      <p>STEP {step}/4 Organization</p>
      <p>How many people in your organization?</p>
      <form className="form_wrapper">
        <section className={styles['form_fields']}>
          <fieldset>
            {peopleCount.map((obj, i) => {
              return (
                <>
                  <label htmlFor={obj.count}>
                    <input
                      type="radio"
                      required
                      key={i}
                      id={obj.count}
                      name="count"
                      value={obj.count}
                      className={styles['radio_shift']}
                      checked={obj.isChecked}
                      onChange={updatePeopleCount(i)}
                    ></input>
                    <p
                      style={{
                        border: peopleCountError
                          ? 'solid red 1px'
                          : 'solid black 1px',
                      }}
                    >
                      {obj.count}
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
export default Step2;
