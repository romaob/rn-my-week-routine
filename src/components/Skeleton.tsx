import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

export interface SkeletonProps {
  loading?: boolean;
  flex?: boolean;
  rounded?: boolean;
  children?: React.ReactNode;
}

export default function Skeleton({
  loading,
  flex,
  rounded,
  children,
}: SkeletonProps): JSX.Element {
  const [fadeAnimation] = useState(new Animated.Value(0));

  const startAnimation = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
      ]),
      {iterations: -1},
    ).start();
  }, [fadeAnimation]);

  const stopAnimation = useCallback(() => {
    fadeAnimation?.stopAnimation();
    fadeAnimation?.setValue(0);
  }, [fadeAnimation]);

  useEffect(() => {
    if (loading) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }, [loading, startAnimation, stopAnimation]);

  return (
    <Animated.View
      style={[
        styles.container,
        flex && styles.flex,
        loading && styles.loadingContainer,
        loading && {opacity: fadeAnimation},
        rounded && styles.rounded,
      ]}>
      <View style={[loading && styles.hiddenContent]}>{children}</View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 5,
  },
  rounded: {
    borderRadius: 500,
    aspectRatio: 1,
  },
  flex: {
    flex: 1,
  },
  hiddenContent: {
    opacity: 0,
  },
});
