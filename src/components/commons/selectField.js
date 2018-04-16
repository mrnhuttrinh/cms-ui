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
  <div>

  <SelectField
    className="cms-select"
    floatingLabelText={t(label)}
    errorText={touched && t(error)}
    {...input}
    onChange={(event, index, value) => {input.onChange(value); input.onBlur();}}
    children={children}
    {...custom}
  />
  </div>
)

export default translate('translations')(EcSelectField);
