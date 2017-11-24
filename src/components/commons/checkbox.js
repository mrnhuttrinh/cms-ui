import React from 'react';
import Checkbox from 'material-ui/Checkbox';

const EcCheckbox = ({input, label, ...rest}) => (
  <Checkbox
    label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}
    {...rest}
  />
);

export default EcCheckbox;