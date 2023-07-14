import parsePhoneNumber, {PhoneNumber} from 'libphonenumber-js';
import * as R from 'ramda';

export interface iPhoneNumber {
  formatInternational: string;
  data: PhoneNumber | undefined;
  phone: string;
}

export const isMobileHelperPhone = (
  value: string,
): iPhoneNumber | undefined => {
  if (R.isEmpty(value)) {
    return;
  }
  try {
    value = [value].join('');
    if (Number(value) && R.pipe(R.take(1), Number, R.equals(8))(value)) {
      value = ['+7', R.drop(1)(value)].join('');
    }
    const data = parsePhoneNumber(['+', value.replace('+', '')].join('')) as
      | PhoneNumber
      | undefined;
    const formatInternational = data?.formatInternational() as string;
    if (formatInternational && data) {
      return {
        data,
        formatInternational,
        phone: formatInternational.replace(' ', ''),
      };
    }
  } catch (e) {
    return;
  }
};
