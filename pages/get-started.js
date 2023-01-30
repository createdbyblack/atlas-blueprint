import * as MENUS from 'constants/menus';

import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { Footer, Header, SEO, NavigationMenu } from 'components';
import { BlogInfoFragment } from 'fragments/GeneralSettings';
import Step1 from 'components/GetStarted/Step1';
import Step2 from 'components/GetStarted/Step2';
import Step3 from 'components/GetStarted/Step3';
import Step4 from 'components/GetStarted/Step4';
import SunIcon from 'components/GetStarted/Icons/SunIcon';
import SunSetIcon from 'components/GetStarted/Icons/SunsetIcon';
import SmileyIcon from 'components/GetStarted/Icons/SmileyIcon';
import OrganizationIcon from 'components/GetStarted/Icons/OrganizationIcon';
// import { CiFaceSmile } from 'react-icons/ci';
// import { RiTeamLine } from 'react-icons/ri';
import ThankYou from 'components/GetStarted/ThankYou';
import StepsIndicator from 'components/GetStarted/StepsIndicator';

import styles from '../styles/pages/_Getstarted.module.scss';

// const ADD_CONTACT = gql`
//   mutation submitMonochromBookingForm($input: SubmitMonochromBookingForm!) {
//     submitMonochromBookingForm(input: $input) {
//       successMessage
//       errors
//     }
//   }
// `;

const ADD_CONTACT = gql`
  mutation submitMonochromBookingForm(
    $input: SubmitMonochromBookingFormInput!
  ) {
    submitMonochromBookingForm(input: $input) {
      successMessage
      errors
    }
  }
`;

export default function Page() {
  const { data } = useQuery(Page.query, {
    variables: Page.variables(),
  });
  const [submitMonochromBookingForm, { error, loading }] =
    useMutation(ADD_CONTACT);

  const [step, setStep] = useState(1);
  var form;

  //step 1 form values
  const [clientType, setClientType] = useState([
    { type: 'individual', icon: <SmileyIcon />, inputKey: ['individual'] },
    {
      type: 'organization',
      icon: <OrganizationIcon />,
      inputKey: ['organization'],
    },
  ]);
  //step2 form values
  const [peopleCount, setPeopleCount] = useState([
    { count: '1-25', inputKey: ['peoplea'] },
    { count: '26-100', inputKey: ['peopleb'] },
    { count: '101-1000', inputKey: ['peoplec'] },
    { count: '1000+', inputKey: ['peopled'] },
  ]);
  //step 3 form values
  const [emShift, setEmShift] = useState([
    { shift: 'dayshift', icon: <SunIcon />, inputKey: ['dayshift'] },
    { shift: 'nightshift', icon: <SunSetIcon />, inputKey: ['nightshift'] },
  ]);
  const [whours, setWhours] = useState(0);
  const [wdays, setWdays] = useState([
    { day: 'M' },
    { day: 'T' },
    { day: 'W' },
    { day: 'Th' },
    { day: 'F' },
    { day: 'S' },
    { day: 'Su' },
  ]);

  //step 4 form values
  const [companyName, setCompanyName] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [contactName, setContactName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  const stepIncrement = () => {
    setStep(step + 1);
  };

  //log formdata in the console
  const handleFinish = async () => {
    const workingdays = wdays
      .filter((obj) => obj.isChecked == true)
      .map((obj) => obj.day.toLowerCase());

    const result = await submitMonochromBookingForm({
      variables: {
        input: {
          client: clientType.find((obj) => obj.isChecked == true).inputKey,
          people: peopleCount.find((obj) => obj.isChecked == true).inputKey,
          shift: emShift.find((obj) => obj.isChecked == true).inputKey,
          working_hours: whours,
          working_days: workingdays,
          company_name: companyName,
          company_website: companyWebsite,
          contact_name: contactName,
          email_address: emailAddress,
          phone_number: phoneNumber,
          country,
          city,
        },
      },
    });
    if (result?.data?.errors) {
      alert('there was an error sending the data');
      console.log(result);
    }
    console.log(result);
    stepIncrement();
  };

  //conditional render based on step number
  switch (step) {
    case 1:
      form = (
        <Step1
          stepIncrement={stepIncrement}
          step={step}
          clientType={clientType}
          setClientType={setClientType}
        />
      );
      break;
    case 2:
      form = (
        <Step2
          stepIncrement={stepIncrement}
          step={step}
          peopleCount={peopleCount}
          setPeopleCount={setPeopleCount}
        />
      );
      break;
    case 3:
      form = (
        <Step3
          stepIncrement={stepIncrement}
          step={step}
          whours={whours}
          setWhours={setWhours}
          shift={emShift}
          setShift={setEmShift}
          wdays={wdays}
          setWdays={setWdays}
        />
      );
      break;
    case 4:
      form = (
        <Step4
          companyName={companyName}
          setCompanyName={setCompanyName}
          companyWebsite={companyWebsite}
          setCompanyWebsite={setCompanyWebsite}
          contactName={contactName}
          setContactName={setContactName}
          emailAddress={emailAddress}
          setEmailAddress={setEmailAddress}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          country={country}
          setCountry={setCountry}
          city={city}
          setCity={setCity}
          handleFinish={handleFinish}
          step={step}
        />
      );
      break;
    case 5:
      form = <ThankYou />;
      break;
    default:
      return null;
  }

  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];

  if (loading) return <p>Submitting form...</p>;
  if (error) {
    console.log(error);
  }
  return (
    <>
      <SEO title="Get Started" />

      <Header
        className="sub-page"
        title="Get Started"
        menuItems={primaryMenu}
      />

      <div className={styles['page_container']}>
        <div className={styles['page_wrapper']}>
          <div className={styles['message']}>
            <h2 className={styles['font_baskerville']}>
              Get started with Monochrom <em>today!</em>
            </h2>
            <p>
              All you need to do is answer these quick questions and your
              journey to light therapy can begin.
            </p>
          </div>
          <div className={styles['form_container']}>
            {form}
            <div className={styles['circle_container']}>
              {step != 5 && <StepsIndicator step={step} setStep={setStep} />}
            </div>
          </div>
        </div>
      </div>
      <Footer title="Get Started" menuItems={footerMenu} />
    </>
  );
}

Page.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};

Page.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    categories {
      nodes {
        databaseId
        uri
        name
      }
    }
  }
`;

export function getStaticProps(ctx) {
  return getNextStaticProps(ctx, { Page });
}
