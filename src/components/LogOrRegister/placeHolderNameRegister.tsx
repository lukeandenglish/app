import {isCheckElement, isEmptyString} from '../../helper';
import * as R from 'ramda';
import {t} from '@lingui/macro';

export const placeHolderNameRegister = input =>
  R.pipe(
    R.path(['email', 'placeholder']),
    R.defaultTo(''),
    x => (isEmptyString(x) ? input.email?.placeholder : x),
    isCheckElement,
    R.cond([
      [R.whereEq({phone: true}), R.always(t`Telephone`)],
      [R.whereEq({email: true}), R.always(t`Email`)],
      [R.F, R.always(t`Mail or telephone`)],
      [R.T, R.always(t`Mail or telephone`)],
    ]),
  )(input);

export const placeHolderNameLogin = input =>
  R.pipe(
    R.path(['email', 'placeholder']),
    R.defaultTo(''),
    x => (isEmptyString(x) ? input.email?.placeholder : x),
    isCheckElement,
    R.cond([
      [R.whereEq({phone: true}), R.always(t`Telephone`)],
      [R.whereEq({email: true}), R.always(t`Email`)],
      [R.F, R.always(t`Mail or telephone`)],
      [R.T, R.always(t`Mail or telephone`)],
    ]),
  )(input);
