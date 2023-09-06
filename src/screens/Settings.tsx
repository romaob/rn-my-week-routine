import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Button, {ButtonColorType} from '../components/Button';
import {sizes} from '../values/sizes';
import {colors} from '../values/colors';
import Label, {FontSize} from '../components/Label';
import useString from '../hooks/useString';

interface SettingsItemProps {
  title: string;
  info?: string;
  onPress?: () => void;
}

function SettingsItem({title, info, onPress}: SettingsItemProps): JSX.Element {
  function getContent(): JSX.Element {
    return (
      <>
        <Label
          text={title}
          size={FontSize.LARGE}
          color={colors.light.textSecondary}
        />
        {info && <Label text={info} color={colors.light.textDisabled} />}
      </>
    );
  }

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.settingsItem}>
        {getContent()}
      </TouchableOpacity>
    );
  } else {
    return <View style={styles.settingsItem}>{getContent()}</View>;
  }
}

export default function Settings(): JSX.Element {
  const {language, getString} = useString();

  function clearEvents() {
    console.log('clear events');
  }

  function handleItemLanguagePress() {
    console.log('language');
  }

  return (
    <View style={styles.container}>
      <SettingsItem
        title={getString('screen_settings_language')}
        info={getString(`lang_${language}`)}
        onPress={handleItemLanguagePress}
      />
      <SettingsItem
        title={getString('screen_settings_clear_events')}
        onPress={handleItemLanguagePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
    paddingVertical: sizes.padding.md,
  },
  settingsItem: {
    display: 'flex',
    flexDirection: 'row',
    padding: sizes.padding.md,
    marginVertical: sizes.margin.sm,
    backgroundColor: colors.light.cardBackground,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: sizes.padding.sm,
  },
});
