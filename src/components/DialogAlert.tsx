import React from 'react';
import {View, Image, StyleSheet, Modal} from 'react-native';
import Label, {FontSize} from './Label';
import Button, {ButtonColorType, ButtonSize} from './Button';
import {colors} from '../values/colors';
import {sizes} from '../values/sizes';
import useString from '../hooks/useString';

interface DialogAlertProps {
  show: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const DialogAlert = ({
  show,
  title,
  message,
  onCancel,
  onConfirm,
}: DialogAlertProps): JSX.Element | null => {
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
          testID="dialogAlert">
          <View style={styles.centeredView}>
            <View style={styles.container}>
              <View style={styles.topRow}>
                <View style={styles.cancelIcon}>
                  <Image
                    style={styles.icon}
                    source={require('../assets/images/cancel.png')}
                    testID="dialogAlertIcon"
                  />
                </View>
                <Label
                  text={title}
                  size={FontSize.LARGE}
                  color={colors.light.danger}
                  testID="dialogAlertTitle"
                />
              </View>
              <View style={styles.body}>
                <Label text={message} testID="dialogAlertMessage" />
              </View>
              <View style={styles.bottomRow}>
                <Button
                  label={getString('cancel')}
                  size={ButtonSize.LARGE}
                  onPress={onCancel}
                  testID="dialogAlertCancelButton"
                />
                <Button
                  label={getString('delete').toUpperCase()}
                  size={ButtonSize.LARGE}
                  onPress={onConfirm}
                  colorType={ButtonColorType.DANGER}
                  testID="dialogAlertConfirmButton"
                />
              </View>
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
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelIcon: {
    backgroundColor: 'red',
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
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

export default DialogAlert;
