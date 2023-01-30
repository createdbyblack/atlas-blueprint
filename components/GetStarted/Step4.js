import React from 'react';
import { useState } from 'react';

import FormButton from '../FormButton';
import styles from '../../styles/pages/_Getstarted.module.scss';

const website_regex = new RegExp(
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi //eslint-disable-line
);
const email_regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g); //eslint-disable-line

const Step4 = ({
  companyName,
  setCompanyName,
  companyWebsite,
  setCompanyWebsite,
  contactName,
  setContactName,
  emailAddress,
  setEmailAddress,
  phoneNumber,
  setPhoneNumber,
  country,
  setCountry,
  city,
  setCity,
  handleFinish,
  step,
}) => {
  const [companyWebsiteError, setCompanyWebsiteError] = useState();
  const [emailAddressError, setEmailAddressError] = useState();

  const handleSubmit = () => {
    //check if email inputted is a valid emailcompanyWebsite.match(website_regex)
    companyWebsite.match(website_regex)
      ? setCompanyWebsiteError(false)
      : setCompanyWebsiteError(true);
    emailAddress.match(email_regex)
      ? setEmailAddressError(false)
      : setEmailAddressError(true);
    //check if all fields are not blank
    if (
      companyName &&
      companyWebsite &&
      contactName &&
      emailAddress &&
      phoneNumber &&
      country &&
      city
    ) {
      if (
        companyWebsite.match(website_regex) &&
        emailAddress.match(email_regex)
      ) {
        handleFinish();
      }
    } else {
      alert('Please complete all fields');
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
              <label htmlFor="label1">Company Name</label>
              <input
                type="text"
                required
                id="label1"
                name="label1"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              ></input>
            </fieldset>
            <fieldset>
              <label htmlFor="label2">Company Website URL</label>
              <input
                type="text"
                required
                id="label2"
                name="label2"
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
                style={{
                  border: companyWebsiteError
                    ? 'solid red 1px'
                    : 'solid #b2b1aa 1px',
                }}
              ></input>
            </fieldset>
            <fieldset>
              <label htmlFor="label3">Contact Name</label>
              <input
                type="text"
                required
                id="label3"
                name="label3"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              ></input>
            </fieldset>
            <fieldset>
              <label htmlFor="label4">Email</label>
              <input
                type="text"
                required
                id="label4"
                name="label4"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                style={{
                  border: emailAddressError
                    ? 'solid red 1px'
                    : 'solid #b2b1aa 1px',
                }}
              ></input>
            </fieldset>
            <fieldset>
              <label htmlFor="label5">Phone Number</label>
              <input
                type="text"
                required
                id="label5"
                name="label5"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              ></input>
            </fieldset>
            <fieldset>
              <label htmlFor="label6">Country</label>
              <input
                type="text"
                required
                id="label6"
                name="label6"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              ></input>
            </fieldset>
            <fieldset>
              <label htmlFor="label7">City</label>
              <input
                type="text"
                required
                id="label7"
                name="label7"
                value={city}
                onChange={(e) => setCity(e.target.value)}
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
