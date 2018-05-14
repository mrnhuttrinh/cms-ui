import React from 'react';
import { translate } from 'react-i18next'
import DatePicker from 'material-ui/DatePicker';

const EcDatePicker = ({input, label, meta: {touched, error}, t, ...custom}) => (
  <DatePicker
    hintText={t(label)}
    floatingLabelText={t(label)}
    errorText={touched && t(error)}
    {...input}
    {...custom}
    onChange={(event, value) => {input.onChange(value);}}
  />
);

export default translate('translations')(EcDatePicker);