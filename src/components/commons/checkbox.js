import React from 'react';
import { translate } from 'react-i18next';
import Checkbox from 'material-ui/Checkbox';

const EcCheckbox = ({input, label, t, ...rest}) => (
  <Checkbox
    label={t(label)}
    checked={input.value ? true : false}
    onCheck={input.onChange}
    {...rest}
  />
);

export default translate('translations')(EcCheckbox);