import React, { useState } from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Button, {ButtonColorType} from '../components/Button';
import {sizes} from '../values/sizes';
import {colors} from '../values/colors';
import Label, {FontSize} from '../components/Label';
import {useString} from '../context/useStringContext';
import DialogCustom from '../components/DialogCustom';
import RadioButton from '../components/RadioButton';
import RadioGroup from '../components/RadioGroup';
import DialogAlert from '../components/DialogAlert';
import useEvents from '../hooks/useEvents';

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
  const {language, getString, setLanguage} = useString();
  const {updateEventsData} = useEvents();

  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [languageSelected, setLanguageSelected] = useState<string>(language);

  const [showClearEventsDialog, setShowClearEventsDialog] = useState(false);

  function handleClearEventsPress() {
    setShowClearEventsDialog(true);
  }

  function clearEvents() {
    updateEventsData([]);
    setShowClearEventsDialog(false);
  }

  function handleItemLanguagePress() {
    setShowLanguageDialog(true);
  }

  function handleChangeLanguage(language: string) {
    setLanguage(language as 'en' | 'es' | 'pt');
    setShowLanguageDialog(false);
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
        onPress={handleClearEventsPress}
      />

      <DialogCustom
        show={showLanguageDialog}
        title={getString('screen_settings_language')}
        onCancel={() => setShowLanguageDialog(false)}
        onConfirm={() => handleChangeLanguage(languageSelected)}
        confirmLabel={getString('confirm')}>
        <RadioGroup
          size={sizes.font.md}
          itemSelected={languageSelected}
          items={['en', 'es', 'pt']}
          labels={['English', 'Español', 'Português']}
          onPress={item => setLanguageSelected(item as 'en' | 'es' | 'pt')}
        />
      </DialogCustom>

      <DialogAlert
        title={getString('screen_settings_clear_events')} 
        message={getString('screen_settings_clear_events_message')}
        show={showClearEventsDialog}
        onCancel={() => setShowClearEventsDialog(false)}
        onConfirm={clearEvents}
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
