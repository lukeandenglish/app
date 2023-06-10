import validator from 'validator';

export const regNumber = (e: string) => e.replace(/[^0-9., \-]/g, '');
export const regName = (e: string) =>
  e.trim().replace(/[^a-zA-Zа-яА-Я0-9 ]/g, '');

export const isEmptyString = (e: string | number | null | undefined) =>
  [e ?? ''].join('').trim().length === 0;

export type iModeSelect = 'isEmail' | 'isPhone';

export const isCheckElement = (
  e: string,
  argsVisible?: boolean,
): {phone: boolean; email: boolean; args: string | null} => {
  try {
    switch (true) {
      case validator.isMobilePhone(regNumber(e)):
        return {
          phone: true,
          email: false,
          args: [regNumber(e).trim()].join(''),
        };
      case validator.isEmail(e):
        return {email: true, phone: false, args: e.trim()};
      default:
        return {
          email: false,
          phone: false,
          args: argsVisible ? [e].join('').toLowerCase().trim() : null,
        };
    }
  } catch (err) {
    return {email: false, phone: false, args: null};
  }
};
