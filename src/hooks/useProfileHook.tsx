import {t} from '@lingui/macro';
import {useNavigation} from '@react-navigation/native';
import * as R from 'ramda';
import {useSelector} from 'react-redux';
import ROUTER_PATH from '../config/page';
import REDUCER_PATH from '../config/reducer';

export const useProfileHook = () => {
  const navigation = useNavigation();
  const [rName, rSurname] = useSelector(
    R.pipe(
      R.path([REDUCER_PATH.USER]),
      R.paths<string[]>([['name'], ['surname']]),
    ),
  );

  return {
    name: {
      value:
        [rSurname, rName].join(' ').trim().length !== 0
          ? [rSurname, rName].join(' ').trim()
          : t`Пользователь не указан`,
    },
    levelEnglish: {
      value: 'English scholar level 2384',
    },
    dictionaryTotal: {
      value: '433',
    },
    time: {
      value: '2ч 43м',
    },
    navigateBtn: {
      toProfile: () => navigation.navigate(ROUTER_PATH.AUTH.ProfileEdit),
    },
  };
};
