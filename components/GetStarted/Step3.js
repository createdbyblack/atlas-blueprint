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
  const updateShift = (index) => (e) => {
    let updatedShift = [...shift];
    updatedShift.forEach((obj, i) => {
      if (i == index) {
        obj.isChecked = e.target.checked;
      } else {
        obj.isChecked = false;
      }
    });
    setShift(updatedShift);
    setShiftError(false);
  };

  //update working hours state
  const updatewhours = (e) => {
    setWhours(e.target.value);
    setWhoursError(false);
  };

  //update working days state
  const updateWdays = (index) => (e) => {
    let updatedWdays = [...wdays];
    updatedWdays[index].isChecked = e.target.checked;
    setWdays(updatedWdays);
    setWdaysError(false);
  };

  //go to next step
  const handleNext = () => {
    console.log(whours);
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

    if (whours < 1) {
      setWhoursError(true);
    }
    if (selectedShift != undefined && selectedWdays.length > 0 && whours > 0) {
      stepIncrement();
    }
  };
  return (
    <>
      <p>STEP {step}/4 Working Days & Hours</p>
      <p>What are your working days & hours</p>
      <form className="form_wrapper">
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
                      onChange={updateShift(i)}
                    ></input>
                    <p
                      style={{
                        border: shiftError
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
          <fieldset>
            <label htmlFor="whours">Working Hours</label>
            <input
              required
              type="number"
              id="whours"
              name="whours"
              value={whours}
              onChange={(e) => {
                updatewhours(e);
              }}
              style={{
                border: whoursError ? 'solid red 1px' : 'solid black 1px',
              }}
            />
          </fieldset>
          <fieldset>
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
                        onChange={updateWdays(i)}
                        checked={obj.isChecked}
                      ></input>
                      <p
                        style={{
                          border: wdaysError
                            ? 'solid red 1px'
                            : 'solid black 1px',
                        }}
                      >
                        {obj.day}
                      </p>
                    </label>
                  </>
                );
              })}
            </div>
          </fieldset>
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
