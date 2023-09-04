import React, {useEffect, useState} from 'react';
import {View, TextInput, StyleSheet, TextInputProps} from 'react-native';
import Label, {FontSize} from './Label';
import {colors} from '../values/colors';
import {sizes} from '../values/sizes';

export interface InputTextProps {
  text: string;
  onTextChange?: (text: string) => void;
  disabled?: boolean;
  size?: FontSize;
  label?: string;
  info?: string;
  error?: string;
  limit?: number;
  textArea?: boolean;
  required?: boolean;
  childrenBefore?: boolean;
  childrenAfter?: boolean;
  children?: React.ReactNode;
  testID?: string;
  props?: TextInputProps;
}

export default function InputText({
  text,
  onTextChange,
  disabled,
  size = FontSize.MEDIUM,
  label = '',
  info = '',
  error = '',
  limit,
  textArea,
  required,
  childrenBefore,
  childrenAfter,
  children,
  testID,
  ...props
}: InputTextProps): JSX.Element {
  const [displayLabelText, setDisplayLabelText] = useState<string>(
    text ? label : '',
  );

  function onChangeTextHandler(newText: string) {
    if (!limit || newText.length <= limit) {
      onTextChange && onTextChange(newText);
    }
  }

  useEffect(() => {
    setDisplayLabelText(text ? label : '');
  }, [label, text]);

  return (
    <View testID={testID || 'inputText'} style={styles.container}>
      <View style={styles.childrenContainer} testID="inputTextChildBefore">
        {childrenBefore && children}
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.topContainer}>
          <Label
            text={displayLabelText}
            size={size}
            color={colors.light.primary}
            testID="inputTextLabelTop"
          />
          {required && displayLabelText && (
            <Label
              text="*"
              size={size}
              color={colors.light.danger}
              testID="inputTextRequired"
            />
          )}
        </View>
        <TextInput
          testID="inputTextTextInput"
          style={{
            ...styles.input,
            ...(error && styles.inputError),
            fontSize: sizes.font[size],
            ...(textArea && {height: 100}),
            ...(disabled && styles.inputDisabled),
          }}
          value={text}
          onChangeText={onChangeTextHandler}
          placeholder={label + (required ? ' *' : '')}
          multiline={textArea}
          editable={!disabled}
          {...props}
        />
        <View style={styles.bottomContainer}>
          <Label
            text={error}
            size={FontSize.SMALL}
            color={colors.light.danger}
            testID="inputTextErrorText"
          />
          {!error && (
            <Label
              text={info}
              size={FontSize.SMALL}
              color={colors.light.textDisabled}
              testID="inputTextInfoText"
            />
          )}
          {limit && (
            <View style={styles.limit}>
              <Label
                text={`${text.length}/${limit}`}
                size={FontSize.SMALL}
                color={colors.light.textDisabled}
                testID="inputTextLimitText"
              />
            </View>
          )}
        </View>
      </View>
      <View style={styles.childrenContainer} testID="inputTextChildAfter">
        {childrenAfter && children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: sizes.padding.sm,
    width: '100%',
  },
  childrenContainer: {
    display: 'flex',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  input: {
    width: '100%',
    borderColor: colors.light.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: sizes.padding.sm,
    paddingVertical: sizes.padding.md,
    backgroundColor: colors.light.cardBackground,
  },
  inputError: {
    borderColor: colors.light.danger,
  },
  inputDisabled: {
    backgroundColor: colors.light.disabled,
    borderColor: colors.light.disabled,
    color: colors.light.textDisabled,
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  limit: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
