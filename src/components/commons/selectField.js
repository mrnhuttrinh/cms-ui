import React from 'react';
import { translate } from 'react-i18next';
import SelectField from 'material-ui/SelectField';

const EcSelectField = ({
  input,
  label,
  meta: {touched, error},
  children,
  t,
  ...custom
}) => (
  <SelectField
    floatingLabelText={t(label)}
    errorText={touched && t(error)}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
)

export default translate('translations')(EcSelectField);