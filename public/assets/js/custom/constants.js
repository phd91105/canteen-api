const Message = {
  INFO: {
    ICL001: 'No record.',
  },
  ERROR: {
    ECL002: (column) => `${column} should not be empty`,
    ECL005: (column) => `${column} is invalid format`,
    ECL006: (column) => `${column} must be a number`,
    ECL007: 'invalid email format',
    ECL011: (column, params1, params2) =>
      `${column}: ${params1} is maximum length (current: ${params2} char）`,
    ECL014: 'Invalid Email or Password',
    ECL015:
      'Please enter the password in 8 to 20 single-byte alphanumeric characters.',
    ECL016: 'The confirmation password is incorrect.',
  },
};
