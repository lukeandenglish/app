/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ProfileEdit} from './ProfileEdit';
import {SmallCardProfile} from './SmallCardProfile';

export const BlockHeader = ({small = false}: {small: boolean}) => {
  switch (small) {
    case true:
      return <SmallCardProfile />;
    case false:
      return <ProfileEdit />;
  }
};
