import React, { useState } from 'react';

import FormButton from '../FormButton';
import styles from '../../styles/pages/_Getstarted.module.scss';

const Step3 = ({
  stepIncrement,
  step,
  whours,
  setWhours,
  shift,
  setShift,
  wdays,
  setWdays,
}) => {
  const [shiftError, setShiftError] = useState();
  const [whoursError, setWhoursError] = useState();
  const [wdaysError, setWdaysError] = useState();

  //update shift state
  const handleSelectShift = (index) => (e) => {
    let updatedShift = [...shift];
    updatedShift.forEach((obj, i) => {
      i == index ? (obj.isChecked = e.target.checked) : (obj.isChecked = false);
    });
    setShift(updatedShift);
    setShiftError(false);
  };

  //update working days state
  const handleSelectWorkingDays = (index) => (e) => {
    let updatedWdays = [...wdays];
    updatedWdays[index].isChecked = e.target.checked;
    setWdays(updatedWdays);
    setWdaysError(false);
  };

  //go to next step
  const handleNext = () => {
    let selectedShift = shift.find((obj) => {
      return obj.isChecked == true;
    });

    let selectedWdays = wdays.filter((obj) => {
      return obj.isChecked == true;
    });

    //check if user selected the options
    if (selectedShift == undefined) {
      setShiftError(true);
    }

    if (selectedWdays.length == 0) {
      setWdaysError(true);
    }

    if (whours < 1 || 24 < whours) {
      setWhoursError(true);
      alert('Please input working hours from 1 to 24');
    }

    if (
      selectedShift != undefined &&
      selectedWdays.length > 0 &&
      0 < whours &&
      whours < 25
    ) {
      stepIncrement();
    }
  };
  return (
    <>
      <p>STEP {step}/4 Working Days & Hours</p>
      <h3>What are your working days & hours</h3>
      <span>(Select all that apply)</span>
      <form className="form_wrapper step3">
        <section className={styles['form_fields']}>
          <fieldset>
            {shift.map((obj, i) => {
              return (
                <>
                  <label htmlFor={obj.shift}>
                    <input
                      type="radio"
                      required
                      key={i}
                      id={obj.shift}
                      name="shift"
                      value={obj.shift}
                      className={styles['radio_shift']}
                      checked={obj.isChecked}
                      onChange={handleSelectShift(i)}
                    ></input>
                    <p
                      style={{
                        border: shiftError
                          ? 'solid red 1px'
                          : 'solid transparent 1px',
                      }}
                    >
                      {obj.icon}
                    </p>
                    <span>{obj.shift}</span>
                  </label>
                </>
              );
            })}
          </fieldset>
          <div className="days_hrs_wrap">
            <fieldset className="work_hrs">
              <label htmlFor="whours">Working Hours</label>
              <input
                required
                type="number"
                min="0"
                max="24"
                id="whours"
                name="whours"
                value={whours}
                onChange={(e) => {
                  setWhours(e.target.value);
                  setWhoursError(false);
                }}
                style={{
                  border: whoursError ? 'solid red 1px' : 'solid #b2b1aa 1px',
                }}
              />
            </fieldset>
            <fieldset className="work_days">
              <div className={styles['days_container']}>
                {wdays.map((obj, i) => {
                  return (
                    <>
                      <label htmlFor={i}>
                        <input
                          type="checkbox"
                          key={i}
                          value={obj.day}
                          id={i}
                          name="wdays"
                          className={styles['checkbox_days']}
                          onChange={handleSelectWorkingDays(i)}
                          checked={obj.isChecked}
                        ></input>
                        <p
                          style={{
                            border: wdaysError
                              ? 'solid red 1px'
                              : 'solid transparent 1px',
                          }}
                        >
                          {obj.day}
                          <img src="../icon-check.svg" alt="check-icon" />
                        </p>
                      </label>
                    </>
                  );
                })}
              </div>
              <p>Working days</p>
            </fieldset>
          </div>
          {/* <input type="hidden" id="date" name="date" value={selected}></input> */}
        </section>
        <section className={styles['form_submit']}>
          <FormButton text="NEXT" handleClick={handleNext} />
        </section>
      </form>
    </>
  );
};

export default Step3;
