/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { Theme, useTheme } from '@rneui/themed';

interface StylesCallback<S extends StyleSheet.NamedStyles<S>, P> {
  (theme: Theme, props: P): S;
}

export const createStyles =
  <S extends StyleSheet.NamedStyles<S> | StyleSheet.NamedStyles<any>>(styles: S | StylesCallback<S, any>) =>
  <P>(props?: P): S => {
    const { theme } = useTheme();

    return useMemo(() => {
      const computedStyles = typeof styles === 'function' ? styles(theme, props) : styles;
      return StyleSheet.create(computedStyles);
    }, [props, theme]);
  };
