import {t} from '@lingui/macro';
import React from 'react';
import {useDispatch} from 'react-redux';
import {registerCallbackEndpoints} from '../../api/registerCallbackEndpoints';
import {homeApi} from '../../redux/api/homeCard';
import {cardColor} from '../../styleApp/colors';

export const useCreateCard = ({stackId}: {stackId: string}) => {
  const [next, setNext] = React.useState(false);
  const [listImage, setListImage] = React.useState({});
  const [title, setTitleSelect] = React.useState('');
  const [photo, setPhoto] = React.useState(null);
  const [color, setColor] = React.useState(cardColor.Blue_Sky);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (stackId) {
      registerCallbackEndpoints({
        endpoints: homeApi.endpoints.currentStack,
        dispatch,
        args: {stackId},
      })
        .then(({data}) => {
          setTitleSelect(data?.title);
          setColor(data?.color);
        })
        .catch(e => console.log(e));
    }
  }, []);

  const myInput = {
    selectInput: {
      placeholder: stackId ? t`Изменить стек` : t`Новый стэк`,
      value: title,
      multiline: true,
      numberOfLines: 10,
      onChangeText: setTitleSelect,
      style: {textAlign: 'center'},
    },
  };

  React.useEffect(() => {
    registerCallbackEndpoints({
      endpoints: homeApi.endpoints.getListIllustration,
      dispatch,
      args: {},
    }).then(setListImage);
  }, []);

  const handleInitialState = () => {
    setColor(cardColor.Blue_Sky);
    setPhoto(null);
    setNext(false);
    setTitleSelect('');
  };

  return {
    myInput,
    next,
    setNext,
    setPhoto,
    setColor,
    photo,
    color,
    title,
    listImage,
    handleInitialState,
  };
};
