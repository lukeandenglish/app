/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CameraOptions, launchImageLibrary} from 'react-native-image-picker';
import {SvgXml} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import cred from '../../cred';
import photo from '../assets/svg/photo';
import {IUserProfile, actionChangeImage} from '../redux/action/register';
import {selectorAuthUserProfile} from '../redux/api/registerApi/functions';
import {Units} from '../styleApp/Units';

const CONFIG_GALLERY = {
  mediaType: 'photo',
  includeBase64: true,
} as CameraOptions;

export const useHookChangeProfile = () => {
  const dispatch = useDispatch();
  const [image] = useSelector(selectorAuthUserProfile) as [
    IUserProfile['image'],
  ];

  const loading = false;

  return [
    {
      image: {
        onPress: () => {
          try {
            launchImageLibrary(CONFIG_GALLERY, responce => {
              dispatch(
                actionChangeImage(
                  'data:image/jpeg;base64,' + responce?.assets?.[0]?.base64 ??
                    null,
                ),
              );
            });
          } catch (e) {
            console.log(e);
          }
        },
        source: {
          uri: image ?? cred.EMPTY_IMAGE,
        },
        style: {
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
        },
        children: () => (
          <View style={styles.imageBck}>
            <SvgXml xml={photo} />
          </View>
        ),
      },
    },
    {
      loading,
    },
  ];
};

const styles = StyleSheet.create({
  imageBck: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(27, 24, 24, 0.25)',
    borderRadius: Units.s16,
  },
});
