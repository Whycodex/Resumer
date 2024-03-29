'use client';

import React, { useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { Righteous } from 'next/font/google';

import OnboardingIcon from '@/assets/onboarding2.png';
import { Heading, Option, Options, PageNavButton } from './styles';
import WorkExperience from './work-experience';
import WorkExperienceDetails from './work-experience-details';
import HighestEducation from './highest-education';
import ContactDetails from './contact-details';
import Degrees from './degrees';
import EducationalDetails from './educational-details';
import ProjectDetails from './project-details';
import CodingProfiles from './coding-profile';
import { useRouter } from 'next/navigation';

const righteous = Righteous({
  weight: ['400'],
  subsets: ['latin']
});

export type PageNavPropsType = {
  nextPage: Function;
  prevPage: Function;
};

const OnboardingQuestions = () => {
  const route = useRouter();
  const [page, setPage] = useState<number>(0);

  const nextPage = () => {
    if (page === 7) {
      route.push('/job-description');
      return;
    }
    setPage(page => page + 1);
  };
  const prevPage = () => {
    setPage(page => Math.max(0, page - 1));
  };

  const OnboardingPage = () => {
    switch (page) {
      case 0:
        return <WorkExperience nextPage={nextPage} prevPage={prevPage} />;
      case 1:
        return (
          <WorkExperienceDetails nextPage={nextPage} prevPage={prevPage} />
        );
      case 2:
        return <ContactDetails nextPage={nextPage} prevPage={prevPage} />;
      case 3:
        return <HighestEducation nextPage={nextPage} prevPage={prevPage} />;
      case 4:
        return <Degrees nextPage={nextPage} prevPage={prevPage} />;
      case 5:
        return <EducationalDetails nextPage={nextPage} prevPage={prevPage} />;
      case 6:
        return <ProjectDetails nextPage={nextPage} prevPage={prevPage} />;
      case 7:
        return <CodingProfiles nextPage={nextPage} prevPage={prevPage} />;
      default:
        return <WorkExperience nextPage={nextPage} prevPage={prevPage} />;
    }
  };

  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '100px',
        borderRadius: '20px',
        padding: '20px 40px',
        margin: 'auto 150px',
        width: '100%',
        height: '600px'
      }}
      className={righteous.className}
    >
      <Grid flexGrow={1} height='100%'>
        {OnboardingPage()}
      </Grid>
      <Image
        src={OnboardingIcon}
        alt='icon'
        style={{
          height: '520px',
          width: '350px'
        }}
      />
    </Grid>
  );
};

export default OnboardingQuestions;
