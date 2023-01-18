import Calendar from 'components/Schedule/Calendar';
import React, { useState } from 'react';
import styles from 'styles/pages/_Schedule.module.scss';

const Schedule = () => {
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selected, setSelected] = useState(new Date());
  const [today] = useState(new Date().toDateString());
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  //saves picked date
  const changeCurrentDay = (day) => {
    setSelected(new Date(day.year, day.month, day.number));
    setMonth(new Date(day.year, day.month, day.number).getMonth());
    setYear(new Date(day.year, day.month, day.number).getFullYear());
  };

  //logs picked date details
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      date: data.get('date'),
      companyName: data.get('cname'),
      contactName: data.get('fname'),
      email: data.get('email'),
      phoneNumber: data.get('pnum'),
    });
  };

  return (
    <div className={styles['page_container']}>
      <div className={styles['schedule_wrapper']}>
        <h2>Light Seminar</h2>
        <p>
          Monocrom offers a relaxing and refreshing 30-minute light seminar that
        </p>
        <p>
          gives organizations a chance to experience the benefits of good light.
        </p>
        <Calendar
          year={year}
          month={month}
          setMonth={setMonth}
          setYear={setYear}
          selected={selected}
          today={today}
          changeCurrentDay={changeCurrentDay}
        />
        <form onSubmit={handleSubmit}>
          <section className={styles['form_fields']}>
            <fieldset>
              <label htmlFor="cname">Company Name</label>
              <input
                required
                type="text"
                id="cname"
                name="cname"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="fname">Contact Name</label>
              <input
                required
                type="text"
                id="fname"
                name="fname"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="email">Email</label>
              <input
                required
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="pnum">Phone Number</label>
              <input
                required
                type="text"
                id="pnum"
                name="pnum"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </fieldset>
            <input type="hidden" id="date" name="date" value={selected}></input>
          </section>
          <section className={styles['form_submit']}>
            <button type="submit">SUBMIT</button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default Schedule;
