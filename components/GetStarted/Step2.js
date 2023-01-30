import React, { useState } from 'react';

import FormButton from '../FormButton';
import styles from '../../styles/pages/_Getstarted.module.scss';

const Step2 = ({ stepIncrement, step, peopleCount, setPeopleCount }) => {
  const [peopleCountError, setPeopleCountError] = useState();

  //update count state
  const handleSelectPeopleCount = (index) => (e) => {
    let updatedPeopleCount = [...peopleCount];

    updatedPeopleCount.forEach((obj, i) => {
      i == index ? (obj.isChecked = e.target.checked) : (obj.isChecked = false);
    });
    setPeopleCount(updatedPeopleCount);
    setPeopleCountError(false);
  };
  //go to next step
  const handleNext = () => {
    //check if user clicked an option
    peopleCount.find((obj) => obj.isChecked == true)
      ? stepIncrement()
      : setPeopleCountError(true);
  };

  return (
    <>
      <p>STEP {step}/4 Organization</p>
      <h3>How many people in your organization?</h3>
      <form className="form_wrapper step2">
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
                      onChange={handleSelectPeopleCount(i)}
                    ></input>
                    <p
                      style={{
                        border: peopleCountError
                          ? 'solid red 1px'
                          : 'solid transparent 1px',
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
