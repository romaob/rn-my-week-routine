import React from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import Label, {FontSize} from './Label';
import Button, {ButtonColorType, ButtonSize} from './Button';
import {colors} from '../values/colors';
import {sizes} from '../values/sizes';
import {useString} from '../context/useStringContext';

interface DialogCustomProps {
  show: boolean;
  title: string;
  children: JSX.Element;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const DialogCustom = ({
  show,
  title,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}: DialogCustomProps): JSX.Element | null => {
  const {getString} = useString();
  if (!show) {
    return null;
  } else {
    return (
      <View style={styles.backdrop}>
        <Modal
          visible={show}
          animationType="fade"
          transparent
          testID="DialogCustom">
          <View style={styles.centeredView}>
            <View style={styles.container}>
              <View style={styles.topRow}>
                <Label
                  text={title}
                  size={FontSize.LARGE}
                  color={colors.light.primary}
                  testID="DialogCustomTitle"
                />
              </View>
              <View style={styles.body}>{children}</View>
              {(onCancel || onConfirm) && (
                <View style={styles.bottomRow}>
                  {onCancel && (
                    <Button
                      label={cancelLabel || getString('cancel')}
                      size={ButtonSize.LARGE}
                      onPress={onCancel}
                      colorType={ButtonColorType.SECONDARY}
                      testID="DialogCustomCancelButton"
                    />
                  )}
                  {onConfirm && (
                    <Button
                      label={confirmLabel || getString('ok')}
                      size={ButtonSize.LARGE}
                      onPress={onConfirm}
                      colorType={ButtonColorType.ACCENT}
                      testID="DialogCustomConfirmButton"
                    />
                  )}
                </View>
              )}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  backdrop: {
    display: 'flex',
    position: 'absolute',
    width: '120%',
    height: '120%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  container: {
    backgroundColor: colors.light.cardBackground,
    borderRadius: 10,
    padding: sizes.padding.lg,
    width: '80%',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    marginTop: 20,
    marginBottom: 20,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default DialogCustom;
