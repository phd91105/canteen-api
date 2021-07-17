export const Message = {
  INFO: {
    ICL001: 'No record.',
    ECL012: (
      column: string,
      params1: string | number,
      params2: string | number,
    ): string =>
      `${column}は${params1}文字以上で入力してください。（現在${params2}文字）`,
    ECL013: '会員IDまたはメールアドレスが間違っています。',
    ICL017: (column: string): string => `この${column}を削除しますか？`,
  },
  ERROR: {
    ECL002: (column: string): string => `${column}は必須項目です。`,
    ECL003: (column: string): string => `${column}は全角で入力してください。`,
    ECL004: (column: string): string =>
      `${column}は全角カナで入力してください。`,
    ECL005: (column: string): string =>
      `${column}は半角英数で入力してください。`,
    ECL006: (column: string): string =>
      `${column}は数字を正しく入力してください。`,
    ECL007: 'メールアドレスを正しく入力してください。',
    ECL008: (column: string): string =>
      `${column}は日付を正しく入力してください。`,
    ECL009: (column: string): string =>
      `${column}は郵便番号を正しく入力してください。`,
    ECL010: (column: string): string =>
      `${column}は電話番号を正しく入力してください。`,
    ECL011: (
      column: string,
      params1: string | number,
      params2: string | number,
    ): string =>
      `${column}は${params1}文字以下で入力してください。（現在${params2}文字）`,
    ECL014: 'Invalid Email or Password',
    ECL015: 'パスワードは半角英数字記号で8～20文字で入力してください。',
    ECL016: '確認用のパスワードが間違っています。',
    ECL018: '解約予定日は契約終了日前を指定してください。',
    ECL019: 'すでに証明書番号は登録されています。',
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
