import * as MENUS from 'constants/menus';

import { gql, useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import {
  Footer,
  Header,
  SEO,
  NavigationMenu,
} from 'components';
import { BlogInfoFragment } from 'fragments/GeneralSettings';
import { useState } from 'react';
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

export default function Page() {
  const { data } = useQuery(Page.query, {
    variables: Page.variables(),
  });

  const [step, setStep] = useState(1);
  var form;

  //step 1 form values
  const [clientType, setClientType] = useState([
    { type: 'individual', icon: <SmileyIcon /> },
    { type: 'organization', icon: <OrganizationIcon /> },
  ]);
  //step2 form values
  const [peopleCount, setPeopleCount] = useState([
    { count: '1-25' },
    { count: '26-100' },
    { count: '101-1000' },
    { count: '1000+' },
  ]);
  //step 3 form values
  const [shift, setShift] = useState([
    { shift: 'dayshift', icon: <SunIcon /> },
    { shift: 'nightshift', icon: <SunSetIcon /> },
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
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  const [field4, setField4] = useState('');
  const [field5, setField5] = useState('');
  const [field6, setField6] = useState('');
  const [field7, setField7] = useState('');

  const stepIncrement = () => {
    setStep(step + 1);
  };

  //log formdata in the console
  const handleFinish = () => {
    const workingdays = wdays
      .filter((obj) => obj.isChecked == true)
      .map((obj) => obj.day);

    const formData = {
      client: clientType.find((obj) => obj.isChecked == true).type,
      people: peopleCount.find((obj) => obj.isChecked == true).count,
      shift: shift.find((obj) => obj.isChecked == true).shift,
      workingHours: whours,
      workingDays: workingdays,
      field1: field1,
      field2: field2,
      field3: field3,
      field4: field4,
      field5: field5,
      field6: field6,
      field7: field7,
    };
    console.log(formData);
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
          shift={shift}
          setShift={setShift}
          wdays={wdays}
          setWdays={setWdays}
        />
      );
      break;
    case 4:
      form = (
        <Step4
          field1={field1}
          setField1={setField1}
          field2={field2}
          setField2={setField2}
          field3={field3}
          setField3={setField3}
          field4={field4}
          setField4={setField4}
          field5={field5}
          setField5={setField5}
          field6={field6}
          setField6={setField6}
          field7={field7}
          setField7={setField7}
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

  return (
    <>
      <SEO
        title="Get Started"
      />

      <Header
        className="sub-page"
        title="Get Started"
        menuItems={primaryMenu}
      />

      <div className={styles['page_container']}>
        <div className={styles['page_wrapper']}>
          <div className={styles['message']}>
            <h2 className={styles['font_baskerville']}>Get started with Monochrom <em>today!</em></h2>
            <p>
              All you need to do is answer 
              these quick questions and your journey to
              light therapy can begin.
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