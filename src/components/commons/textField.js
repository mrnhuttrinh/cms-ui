import React from 'react';
import { translate } from 'react-i18next';
import TextField from 'material-ui/TextField';

const EcTextField = ({input, label, meta: {touched, error}, t, ...custom}) => (
  <TextField
    hintText={t(label)}
    floatingLabelText={t(label)}
    errorText={touched && t(error)}
    {...input}
    {...custom}
  />
);

export default translate('translations')(EcTextField);