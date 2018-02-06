import React from 'react';
import { translate } from 'react-i18next';
import SelectField from 'material-ui/SelectField';

import './selectField.scss';

const EcSelectField = ({
  input,
  label,
  meta: {touched, error},
  children,
  t,
  ...custom
}) => (
  <SelectField
    className="cms-select"
    floatingLabelText={t(label)}
    errorText={touched && t(error)}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
)

export default translate('translations')(EcSelectField);