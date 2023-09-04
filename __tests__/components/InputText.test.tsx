import React from 'react';
import {FontSize} from '../../src/components/Label';
import {Text, View} from 'react-native';
import InputText from '../../src/components/InputText';
import {act, fireEvent, render} from '@testing-library/react-native';
import {colors} from '../../src/values/colors';
import {sizes} from '../../src/values/sizes';

const TEST_LABEL = 'Test Label';
const TEST_TEXT = 'Test text';
const TEST_LIMIT = 10;
const TEST_ERROR = 'Test error';
const TEST_INFO = 'Test info';
const TEST_SIZE = FontSize.MEDIUM;

function TestChild() {
  return <Text testID="testChildView">Test Child</Text>;
}

describe('InputText render tests', () => {
  it('should render correctly', () => {
    const result = render(<InputText text="" />);
    expect(result).toBeTruthy();
    expect(result).toMatchSnapshot();
    expect(result.getByTestId('inputText')).toBeTruthy();
    expect(result.getByTestId('inputTextChildBefore')).toBeTruthy();
    expect(result.getByTestId('inputTextChildAfter')).toBeTruthy();
    expect(result.getByTestId('inputTextLabelTop')).toBeTruthy();
    expect(result.getByTestId('inputTextTextInput')).toBeTruthy();
    expect(result.getByTestId('inputTextErrorText')).toBeTruthy();
  });

  it('should render with the provided label', () => {
    //Without any text, the label should be empty, and the label text should be displayed as placeholder
    const result = render(<InputText text="" label={TEST_LABEL} />);
    expect(result).toBeTruthy();
    expect(result).toMatchSnapshot();
    expect(result.getByTestId('inputTextLabelTop')).toBeTruthy();
    expect(
      result
        .getByTestId('inputTextLabelTop')
        .props.children.some((child: any) => child === TEST_LABEL),
    ).toBeFalsy();
    expect(result.getByTestId('inputTextTextInput').props.placeholder).toBe(
      TEST_LABEL,
    );

    //With text, the label should be displayed
    const result2 = render(<InputText text={TEST_TEXT} label={TEST_LABEL} />);
    expect(result2).toBeTruthy();
    expect(result2).toMatchSnapshot();
    expect(result2.getByText(TEST_LABEL)).toBeTruthy();
    expect(result2.getAllByText(TEST_LABEL).length).toBe(1);
    expect(result2.getByTestId('inputTextLabelTop')).toBeTruthy();
    expect(
      result2
        .getByTestId('inputTextLabelTop')
        .props.children.some((child: any) => child === TEST_LABEL),
    ).toBeTruthy();
  });

  it('should render with the provided error', () => {
    //should always render the error label even if there is no error text
    const result = render(<InputText text="" />);
    expect(result).toBeTruthy();
    expect(result).toMatchSnapshot();
    expect(result.getByTestId('inputTextErrorText')).toBeTruthy();
    //The input border color should be the default
    expect(
      result.getByTestId('inputTextTextInput').props.style.borderColor,
    ).toBe(colors.light.primary);

    //should render the error label with the provided error text
    const result2 = render(<InputText text="" error={TEST_ERROR} />);
    expect(result2).toBeTruthy();
    expect(result2).toMatchSnapshot();
    expect(result2.getByTestId('inputTextErrorText')).toBeTruthy();
    expect(
      result2
        .getByTestId('inputTextErrorText')
        .props.children.some((child: any) => child === TEST_ERROR),
    ).toBeTruthy();
    //the text color should be danger
    expect(result2.getByTestId('inputTextErrorText').props.style.color).toBe(
      colors.light.danger,
    );
    //the input borders should be danger
    expect(
      result2.getByTestId('inputTextTextInput').props.style.borderColor,
    ).toBe(colors.light.danger);
  });

  it('should render with the provided info', () => {
    const result = render(<InputText text="" info={TEST_INFO} />);
    expect(result).toBeTruthy();
    expect(result).toMatchSnapshot();
    expect(result.getByTestId('inputTextInfoText')).toBeTruthy();
    expect(
      result
        .getByTestId('inputTextInfoText')
        .props.children.some((child: any) => child === TEST_INFO),
    ).toBeTruthy();

    //It should not render the info text if there is an error text
    const result2 = render(
      <InputText text="" info={TEST_INFO} error={TEST_ERROR} />,
    );
    expect(result2).toBeTruthy();
    expect(result2).toMatchSnapshot();
    expect(result2.queryByTestId('inputTextInfoText')).toBeFalsy();
  });

  it('should render with the provided text', () => {
    const result = render(<InputText text={TEST_TEXT} />);
    expect(result).toBeTruthy();
    expect(result).toMatchSnapshot();
    expect(result.getByTestId('inputTextTextInput')).toBeTruthy();
    expect(result.getByTestId('inputTextTextInput').props.value).toBe(
      TEST_TEXT,
    );
  });

  it('should render correclty with required', () => {
    //When no text provided, the placeholder should have a * at the end
    const result = render(<InputText text="" required label={TEST_LABEL} />);
    expect(result).toBeTruthy();
    //expect(result).toMatchSnapshot();
    expect(result.getByTestId('inputTextTextInput').props.placeholder).toBe(
      TEST_LABEL + ' *',
    );
    expect(result.queryByTestId('inputTextRequired')).toBeFalsy();

    //When text is provided, the required label should be displayed
    const result2 = render(
      <InputText text={TEST_TEXT} required label={TEST_LABEL} />,
    );
    expect(result2).toBeTruthy();
    //expect(result2).toMatchSnapshot();
    expect(result2.getByTestId('inputTextRequired')).toBeTruthy();
    expect(
      result2
        .getByTestId('inputTextRequired')
        .props.children.some((child: any) => child === '*'),
    ).toBeTruthy();
    expect(result2.getByTestId('inputTextRequired').props.style.color).toBe(
      colors.light.danger,
    );
  });

  it('should render with the text area style', () => {
    const result = render(<InputText textArea text="" />);
    expect(result).toBeTruthy();
    expect(result).toMatchSnapshot();
    expect(
      result.getByTestId('inputTextTextInput').props.multiline,
    ).toBeTruthy();
    expect(result.getByTestId('inputTextTextInput').props.style.height).toBe(
      100,
    );
  });

  it('should render with the provided limit', () => {
    const result = render(<InputText text="" limit={TEST_LIMIT} />);
    expect(result).toBeTruthy();
    expect(result).toMatchSnapshot();
    expect(result.getByTestId('inputTextLimitText')).toBeTruthy();
    expect(
      result
        .getByTestId('inputTextLimitText')
        .props.children.some((child: any) => child === `0/${TEST_LIMIT}`),
    ).toBeTruthy();

    //The limit should be updated when text is added
    const result2 = render(<InputText text={TEST_TEXT} limit={TEST_LIMIT} />);
    expect(result2).toBeTruthy();
    expect(result2).toMatchSnapshot();
    expect(result2.getByTestId('inputTextLimitText')).toBeTruthy();
    expect(
      result2
        .getByTestId('inputTextLimitText')
        .props.children.some(
          (child: any) => child === `${TEST_TEXT.length}/${TEST_LIMIT}`,
        ),
    ).toBeTruthy();
  });

  it('should render with the provided size', () => {
    const result = render(<InputText text="" size={TEST_SIZE} />);
    expect(result).toBeTruthy();
    expect(result).toMatchSnapshot();
    expect(result.getByTestId('inputTextLabelTop')).toBeTruthy();
    expect(result.getByTestId('inputTextLabelTop').props.style.fontSize).toBe(
      sizes.font[TEST_SIZE],
    );
    expect(result.getByTestId('inputTextTextInput')).toBeTruthy();
    expect(result.getByTestId('inputTextTextInput').props.style.fontSize).toBe(
      sizes.font[TEST_SIZE],
    );
  });

  it('should render with a disabled style', () => {
    const result = render(<InputText text="" disabled />);
    expect(result).toBeTruthy();
    expect(result).toMatchSnapshot();
    expect(result.getByTestId('inputTextTextInput')).toBeTruthy();
    expect(result.getByTestId('inputTextTextInput').props.editable).toBeFalsy();
    expect(
      result.getByTestId('inputTextTextInput').props.style.backgroundColor,
    ).toBe(colors.light.disabled);
    expect(
      result.getByTestId('inputTextTextInput').props.style.borderColor,
    ).toBe(colors.light.disabled);
    expect(result.getByTestId('inputTextTextInput').props.style.color).toBe(
      colors.light.textDisabled,
    );
  });

  it('should render with the provided children before', () => {
    const result = render(
      <InputText text="" childrenBefore>
        <TestChild />
      </InputText>,
    );
    expect(result).toBeTruthy();
    expect(result).toMatchSnapshot();
    expect(result.getByTestId('inputTextChildBefore')).toBeTruthy();
    expect(result.getByTestId('testChildView')).toBeTruthy();
    //counting amout of children in inputTextChildBefore
    expect(result.getByTestId('inputTextChildBefore').children.length).toBe(1);
    //counting amount of children in inputTextChildAfter
    expect(result.getByTestId('inputTextChildAfter').children.length).toBe(0);
  });

  it('should render with the provided children after', () => {
    const result = render(
      <InputText text="" childrenAfter>
        <TestChild />
      </InputText>,
    );
    expect(result).toBeTruthy();
    expect(result).toMatchSnapshot();
    expect(result.getByTestId('inputTextChildAfter')).toBeTruthy();
    expect(result.getByTestId('testChildView')).toBeTruthy();
    //counting amout of children in inputTextChildBefore
    expect(result.getByTestId('inputTextChildBefore').children.length).toBe(0);
    //counting amount of children in inputTextChildAfter
    expect(result.getByTestId('inputTextChildAfter').children.length).toBe(1);
  });
});

describe('InputText functionality tests', () => {
  it('should call the onTextChange function when the text is changed', () => {
    const onTextChange = jest.fn();
    const result = render(<InputText text="" onTextChange={onTextChange} />);
    expect(result).toBeTruthy();
    expect(result).toMatchSnapshot();
    expect(onTextChange).not.toHaveBeenCalled();

    act(() => {
      fireEvent.changeText(result.getByTestId('inputTextTextInput'), TEST_TEXT);
    });
    expect(onTextChange).toHaveBeenCalled();
    expect(onTextChange).toHaveBeenCalledWith(TEST_TEXT);
  });

  it('should not call the onTextChange function when the text is changed and the limit is reached', () => {
    const onTextChange = jest.fn();
    const result = render(
      <InputText text="" onTextChange={onTextChange} limit={TEST_LIMIT} />,
    );
    expect(result).toBeTruthy();
    expect(result).toMatchSnapshot();
    expect(onTextChange).not.toHaveBeenCalled();

    act(() => {
      fireEvent.changeText(
        result.getByTestId('inputTextTextInput'),
        TEST_TEXT + '1234567890',
      );
    });
    expect(onTextChange).not.toHaveBeenCalled();
  });

  it('should not be possible to change the text when disabled', () => {
    const onTextChange = jest.fn();
    const result = render(
      <InputText text="" onTextChange={onTextChange} disabled />,
    );
    expect(result).toBeTruthy();
    expect(result).toMatchSnapshot();
    expect(onTextChange).not.toHaveBeenCalled();

    act(() => {
      fireEvent.changeText(result.getByTestId('inputTextTextInput'), TEST_TEXT);
    });
    expect(onTextChange).not.toHaveBeenCalled();
  });
});
