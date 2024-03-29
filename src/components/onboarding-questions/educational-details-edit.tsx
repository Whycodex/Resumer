import React, { useEffect, useState } from 'react';
import { Box, FormHelperText, Grid } from '@mui/material';
import Select from 'react-select';
import { cgpa, educationalLevels } from '@/constants';

import {
  FormInput,
  FormLabel,
  Heading,
  selectStyles,
  Option,
  Options,
  PageNavButton,
  Button
} from './styles';
import { PageNavPropsType } from '.';
import PageContainer from './page-container';
import { Education } from '@/types';
import ShortUniqueId from 'short-unique-id';
import { useDispatch, useSelector } from '@/redux/store';
import { useForm } from 'react-hook-form';
import { firstLetterCapital } from '@/utils';
import { postEducation, updateEducation } from '@/actions/education';
import { clearOnboardingErrors } from '@/redux/slice/onboarding';
import moment from 'moment';

type EducationData = Education & {
  edu_level?: {
    label: string;
    value: string;
  };
};

const EducationalDetailsEdit = ({
  handleCancel,
  value
}: {
  handleCancel: Function;
  value?: EducationData;
}) => {
  const uid = new ShortUniqueId({ length: 5 });
  const dispatch = useDispatch();
  const { errors: apiErrors } = useSelector(state => state.onboarding);
  const [apiError, setApiError] = useState<string | null>(null);

  const cgpaOption = cgpa.map(cgpa => ({
    label: cgpa,
    value: cgpa
  }));

  const levelOption = educationalLevels.map(lvl => ({
    label: firstLetterCapital(lvl.split('_').join(' ')) as string,
    value: lvl
  }));

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    clearErrors,
    getValues
  } = useForm({
    defaultValues: value
      ? {
          ...value,
          edu_level: levelOption.find(opt => opt.value === value.level),
          start_year: moment(`${value.start_year || ''}`).format('YYYY-MM-DD'),
          end_year: moment(`${value.end_year || ''}`).format('YYYY-MM-DD')
        }
      : {
          // level: undefined,
          edu_level: undefined,
          institute_name: undefined,
          start_year: undefined,
          end_year: undefined,
          score: undefined,
          scoring_type: undefined,
          maximum_score: undefined,
          specialisation: undefined,
          degree: undefined
        }
  });

  const eduLevel = watch('edu_level');
  const scoringType = watch('scoring_type');

  const onSubmit = async (data: Education) => {
    setApiError(null);

    const newData = {
      ...data,
      start_year: data?.start_year?.split?.('-')?.[0],
      end_year: data?.end_year?.split?.('-')?.[0],
      level: eduLevel?.value,
      edu_level: undefined,
      maximum_score:
        data.scoring_type === 'percentage' ? 100 : data.maximum_score
    };

    if (value && value?.id)
      await dispatch(
        updateEducation({
          data: { ...newData, id: undefined, user_id: undefined },
          id: value?.id
        })
      );
    else await dispatch(postEducation(newData));
  };

  useEffect(() => {
    if (typeof apiErrors === 'string') {
      setApiError(apiErrors);
      dispatch(clearOnboardingErrors());
    } else if (apiErrors) {
      Object.keys(apiErrors || {}).forEach((error: any) => {
        console.log(error, apiErrors[error].message);
        setError(error, { message: apiErrors[error].message });
      });
      dispatch(clearOnboardingErrors());
    }
  }, [apiErrors]);

  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        my: '25px'
      }}
    >
      <FormLabel>Educational Level</FormLabel>
      <Select
        options={levelOption}
        styles={selectStyles}
        placeholder='Graduation'
        value={eduLevel}
        onChange={(opt: any) => setValue('edu_level', opt)}
      />
      <FormLabel>Institue / College name</FormLabel>
      <FormInput
        {...register('institute_name', {
          required: 'Institute name is required!'
        })}
        helperText={errors?.institute_name?.message}
        error={!!errors?.institute_name}
        placeholder='IIT Mumbai'
      />
      <FormLabel>Scoring Type</FormLabel>
      <Options sx={{ gap: '40px' }}>
        <Option
          active={(scoringType === 'cgpa').toString()}
          onClick={_ => setValue('scoring_type', 'cgpa')}
        >
          CGPA
        </Option>
        <Option
          active={(scoringType === 'percentage').toString()}
          onClick={_ => setValue('scoring_type', 'percentage')}
        >
          Percentage
        </Option>
      </Options>
      <Grid sx={{ display: 'flex', gap: '20px' }}>
        <Box flexBasis={'50%'} flexGrow={1}>
          <FormLabel mb='10px'>Score</FormLabel>
          <FormInput
            type='number'
            {...register('score', { required: 'Score is required' })}
            helperText={errors?.score?.message}
            error={!!errors?.score}
            placeholder={scoringType === 'cgpa' ? '4.5 / 9.0' : '90%'}
          />
        </Box>
        {scoringType === 'cgpa' && (
          <Box flexBasis={'50%'}>
            <FormLabel mb='10px'>Maximum Score</FormLabel>
            <FormInput
              type='number'
              {...register('maximum_score', {
                required: 'Max Score is required'
              })}
              helperText={errors?.maximum_score?.message}
              error={!!errors?.maximum_score}
              placeholder='5 / 10'
            />
          </Box>
        )}
      </Grid>
      {['graduation', 'post_graduation'].includes(
        eduLevel?.value as string
      ) && (
        <>
          <FormLabel>Degree</FormLabel>
          <FormInput
            {...register('degree', { required: 'Degree is required' })}
            helperText={errors?.degree?.message}
            error={!!errors.degree}
            placeholder='Bachelors of Technology'
          />
        </>
      )}
      <Grid
        sx={{
          display: 'flex',
          gap: '30px',
          justifyContent: 'space-between'
        }}
      >
        <Grid>
          <FormLabel mb='15px'>Start Year</FormLabel>
          <FormInput
            type='date'
            {...register('start_year', { required: 'Start year is required' })}
            helperText={errors.start_year?.message}
            error={!!errors.start_year}
          />
        </Grid>
        <Grid>
          <FormLabel mb='15px'>End Year</FormLabel>
          <FormInput
            type='date'
            {...register('end_year', { required: 'End year is required' })}
            helperText={errors.end_year?.message}
            error={!!errors.end_year}
          />
        </Grid>
      </Grid>
      {[
        'senior_secondary',
        'diploma',
        'graduation',
        'post_graduation'
      ].includes(eduLevel?.value as string) && (
        <>
          <FormLabel>Specialization</FormLabel>
          <FormInput
            {...register('specialisation', { required: true })}
            helperText={errors.specialisation?.message}
            error={!!errors.specialisation}
            placeholder='Computer Science and Engineering'
          />
        </>
      )}

      {apiError && <FormHelperText error>{apiError}</FormHelperText>}
      <Grid
        sx={{
          mt: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        <Button onClick={() => handleCancel()} sx={{ flexBasis: '50%' }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)} sx={{ flexBasis: '50%' }}>
          {value ? 'Save' : 'Add experience'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default EducationalDetailsEdit;
