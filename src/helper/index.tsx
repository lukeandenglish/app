import validator from 'validator';

export const regNumber = (e: string) => e.replace(/[^0-9., \-]/g, '');
export const regName = (e: string) =>
  e.trim().replace(/[^a-zA-Zа-яА-Я0-9 ]/g, '');
export type iModeSelect = 'isEmail' | 'isPhone';

export const isCheckElement = (
  e: string,
): {phone: boolean; email: boolean; args: string | null} => {
  try {
    switch (true) {
      case validator.isMobilePhone(regNumber(e)):
        return {phone: true, email: false, args: regNumber(e)};
      case validator.isEmail(e):
        return {email: true, phone: false, args: e};
      default:
        return {email: false, phone: false, args: null};
    }
  } catch (err) {
    return {email: false, phone: false, args: null};
  }
};
