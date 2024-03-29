'use client';

import {
  Box,
  Button as MuiButton,
  Grid,
  TextField,
  Typography,
  styled
} from '@mui/material';
import { StylesConfig } from 'react-select';

export const Heading = styled(Typography)({
  background:
    'linear-gradient(90deg, #4ADFD5 0.42%, #7479FA 41.67%, #E92EC3 106.58%)',
  color: 'transparent',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  width: 'fit-content',
  fontWeight: '400',
  fontSize: '36px',
  lineHeight: '50px',
  letterSpacing: '1.1px'
});

export const Subtitle = styled(Typography)({
  fontSize: '16px',
  lineHeight: '26px',
  letterSpacing: '0.12px'
});

export const Options = styled(Grid)({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '15px'
});

export const Option = styled(Box)(
  ({ active = 'false' }: { active?: string }) => ({
    display: 'flex',
    padding: '40px 30px',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    border: '1px solid white',
    width: '110px',
    borderRadius: '5px',
    background: active === 'false' ? '#ffffff10' : '#ffffff50',
    backdropFilter: 'blur(45px)',
    cursor: 'pointer',
    height: '20px'
  })
);

export const PageNavButton = styled(MuiButton)({
  color: 'white',
  borderColor: 'white',
  padding: '2px 25px',
  borderRadius: '20px',

  '&:hover': {
    borderColor: 'white'
  }
});

export const FormLabel = styled(Typography)({
  color: 'white',
  fontSize: '16px',
  lineHeight: '20px'
});

export const FormInput = styled(TextField)({
  width: '100%',
  '& .MuiInputBase-root': {
    border: '1px solid #DDD',
    borderRadius: '4px',
    background: 'rgba(255, 255, 255, 0.10)',
    colorScheme: 'dark'
  },

  '& input,textarea': {
    color: 'white',
    fontSize: '14px',
    padding: '12px 16px'
  },

  '& input[type="date"]': {
    paddingRight: '25px'
  },
  '& input[type="date"]::-webkit-calendar-picker-indicator': {
    paddingLeft: '50px'
  }
});

export const selectStyles: StylesConfig = {
  container: styles => ({
    ...styles,
    flexGrow: 1,
    width: '100%',
    height: '100%'
  }),
  control: styles => ({
    ...styles,
    height: '100%',
    background: 'rgba(255, 255, 255, 0.10)',
    borderColor: 'rgba(255, 255, 255, 0.50)',
    '&:hover': {
      borderColor: 'rgba(255, 255, 255, 0.70)'
    },
    boxShadow: 'none'
  }),
  singleValue: styles => ({ ...styles, color: 'white' }),
  input: styles => ({ ...styles, color: 'white' }),

  menu: styles => ({ ...styles, background: 'black' }),
  option: (styles, { isFocused }) => ({
    ...styles,
    background: isFocused ? '#ffffff10' : 'black'
  })
};

export const Button = styled(MuiButton)({
  color: 'white',
  border: '1px solid white',
  borderRadius: '3px',
  background: 'rgba(255, 255, 255, 0.10)'
});
