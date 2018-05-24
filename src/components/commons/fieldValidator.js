const required = value => (value ? undefined : 'Required');

const listRequired = value => {
  return (value && (value.length > 0) ? undefined : 'Required');
}

// value => (value && (value.length > 0) ? undefined : 'Required');

const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined;

const pattern = (pattern, errorText) => value =>
  value && !pattern.test(value) ? (errorText ? errorText : 'Field do not match') : undefined;

const length = (long, errorText) => value =>
  value && value.length < long ? (errorText ? errorText : `Field must be more than ${long} characters`) : undefined;

const compare = (compareValue, errorText) => value =>
  value && compareValue !== value ? (errorText ? errorText : 'Field do not match') : undefined;

export default {
  required,
  alphaNumeric,
  email,
  listRequired,
  pattern,
  length,
  compare
};
