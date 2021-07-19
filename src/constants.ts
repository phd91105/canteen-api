export const Message = {
  INFO: {
    ICL001: 'No record.',
  },
  ERROR: {
    ECL002: (column: string): string => `${column} should not be empty`,
    ECL005: (column: string): string => `${column} is invalid format`,
    ECL006: (column: string): string => `${column} must be a number`,
    ECL007: 'invalid email format',
    ECL011: (
      column: string,
      params1: string | number,
      params2: string | number,
    ): string =>
      `${column}: ${params1} is maximum length (current: ${params2} char）`,
    ECL014: 'Invalid Email or Password',
    ECL015:
      'Please enter the password in 8 to 20 single-byte alphanumeric characters.',
    ECL016: 'The confirmation password is incorrect.',
    ECL019: 'Cannot access to this account',
  },
};

export enum UserRole {
  ADMIN = 0,
  USER = 1,
}

export enum OrderStatus {
  WAITING = 0,
  PAID = 1,
  COMPLETED = 2,
  CANCELED = 3,
}
