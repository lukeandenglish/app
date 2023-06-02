import lodash from 'lodash';
import {
  iChangeMode,
  iChangeSmallCard,
  ChangeMode,
  ChangeScene,
} from '../../../components/HomeScreen/Home/Card';

export type iListItem = {
  mode: iChangeMode;
  scene: iChangeSmallCard;
  title: string;
  cardLength: number;
  id: String;
};
export type iListDeckCatalog = {
  data: iListItem[][];
  idx: number;
  title: string;
}[];

const generateRowDeck = ({mode, scene, title}): iListItem => {
  return {
    id: lodash.random(0, 10000).toString(),
    mode: mode,
    scene: mode === ChangeMode[0] ? null : scene,
    title: 'Writing Microdose.\nLet’s write! ',
    cardLength: lodash.random(1000, 5000),
  };
};

export const getCatalogDeck = (): iListDeckCatalog => {
  let listDeck = [] as iListDeckCatalog;

  listDeck.push({
    title: 'Продолжить',
    idx: 0,
    data: [
      [
        generateRowDeck({
          mode: ChangeMode[0],
          scene: ChangeScene[1],
          title: '',
        }),
      ],
    ],
  });

  listDeck.push({
    title: 'Рекомендации',
    idx: 1,
    data: [
      [
        generateRowDeck({
          mode: ChangeMode[1],
          scene: ChangeScene[1],
          title: '',
        }),
        generateRowDeck({
          mode: ChangeMode[1],
          scene: ChangeScene[1],
          title: '',
        }),
        generateRowDeck({
          mode: ChangeMode[1],
          scene: ChangeScene[1],
          title: '',
        }),
      ],
    ],
  });

  listDeck.push({
    title: 'У моих друзей',
    idx: 2,
    data: [
      [
        generateRowDeck({
          mode: ChangeMode[1],
          scene: ChangeScene[1],
          title: '',
        }),
        generateRowDeck({
          mode: ChangeMode[1],
          scene: ChangeScene[1],
          title: '',
        }),
        generateRowDeck({
          mode: ChangeMode[1],
          scene: ChangeScene[1],
          title: '',
        }),
        generateRowDeck({
          mode: ChangeMode[1],
          scene: ChangeScene[1],
          title: '',
        }),
        generateRowDeck({
          mode: ChangeMode[1],
          scene: ChangeScene[1],
          title: '',
        }),
      ],
    ],
  });
  listDeck.push({
    title: 'В избранном',
    idx: 3,
    data: [
      [
        generateRowDeck({
          mode: ChangeMode[0],
          scene: ChangeScene[1],
          title: '',
        }),
      ],
    ],
  });
  listDeck.push({
    title: 'Новые разделы',
    idx: 4,
    data: [
      [
        generateRowDeck({
          mode: ChangeMode[1],
          scene: ChangeScene[1],
          title: '',
        }),
        generateRowDeck({
          mode: ChangeMode[1],
          scene: ChangeScene[0],
          title: '',
        }),
        generateRowDeck({
          mode: ChangeMode[1],
          scene: ChangeScene[0],
          title: '',
        }),
        generateRowDeck({
          mode: ChangeMode[1],
          scene: ChangeScene[1],
          title: '',
        }),
        generateRowDeck({
          mode: ChangeMode[1],
          scene: ChangeScene[1],
          title: '',
        }),
      ],
    ],
  });
  listDeck.push({
    title: 'Тематические разделы',
    idx: 5,
    data: [
      [
        generateRowDeck({
          mode: ChangeMode[0],
          scene: ChangeScene[1],
          title: '',
        }),
        generateRowDeck({
          mode: ChangeMode[0],
          scene: ChangeScene[1],
          title: '',
        }),
        generateRowDeck({
          mode: ChangeMode[0],
          scene: ChangeScene[1],
          title: '',
        }),
        generateRowDeck({
          mode: ChangeMode[0],
          scene: ChangeScene[1],
          title: '',
        }),
      ],
    ],
  });
  return listDeck;
};
