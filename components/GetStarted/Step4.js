import React from 'react';

import FormButton from '../FormButton';
import styles from '../../styles/pages/_Getstarted.module.scss';

const Step4 = ({
  field1,
  setField1,
  field2,
  setField2,
  field3,
  setField3,
  field4,
  setField4,
  field5,
  setField5,
  field6,
  setField6,
  field7,
  setField7,
  handleFinish,
  step,
}) => {
  const handleSubmit = () => {
    //check if all fields are not blank
    if (field1 && field2 && field3 && field4 && field5 && field6 && field7) {
      handleFinish();
    } else {
      alert('please complete all fields');
    }
  };
  return (
    <>
      <p>STEP {step}/4 Individual or organization</p>
      <h3>What are your working days and hours</h3>
      <span>(Select all that apply)</span>
      <section className={styles['form_submit']}>
        <form className="form_wrapper step4">
          <section className={styles['form_fields']}>
            <fieldset>
              <label htmlFor="label1">label1</label>
              <input
                type="text"
                required
                id="label1"
                name="label1"
                value={field1}
                onChange={(e) => setField1(e.target.value)}
              ></input>
            </fieldset>
            <fieldset>
              <label htmlFor="label2">label2</label>
              <input
                type="text"
                required
                id="label2"
                name="label2"
                value={field2}
                onChange={(e) => setField2(e.target.value)}
              ></input>
            </fieldset>
            <fieldset>
              <label htmlFor="label3">label3</label>
              <input
                type="text"
                required
                id="label3"
                name="label3"
                value={field3}
                onChange={(e) => setField3(e.target.value)}
              ></input>
            </fieldset>
            <fieldset>
              <label htmlFor="label4">label4</label>
              <input
                type="text"
                required
                id="label4"
                name="label4"
                value={field4}
                onChange={(e) => setField4(e.target.value)}
              ></input>
            </fieldset>
            <fieldset>
              <label htmlFor="label5">label5</label>
              <input
                type="text"
                required
                id="label5"
                name="label5"
                value={field5}
                onChange={(e) => setField5(e.target.value)}
              ></input>
            </fieldset>
            <fieldset>
              <label htmlFor="label6">label6</label>
              <input
                type="text"
                required
                id="label6"
                name="label6"
                value={field6}
                onChange={(e) => setField6(e.target.value)}
              ></input>
            </fieldset>
            <fieldset>
              <label htmlFor="label7">label7</label>
              <input
                type="text"
                required
                id="label7"
                name="label7"
                value={field7}
                onChange={(e) => setField7(e.target.value)}
              ></input>
            </fieldset>
          </section>
          <section className={styles['form_submit']}>
            <FormButton text={'FINISH'} handleClick={handleSubmit} />
          </section>
        </form>
      </section>
    </>
  );
};

export default Step4;
