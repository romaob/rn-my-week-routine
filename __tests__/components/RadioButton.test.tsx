import React from 'react';

import {fireEvent, render} from '@testing-library/react-native';
import {colors} from '../../src/values/colors';
import RadioButton from '../../src/components/RadioButton';

describe('RadioButton render tests', () => {
  it('should render the radio button', () => {
    const result = render(<RadioButton selected={false} onPress={() => {}} />);
    expect(result).toBeDefined();
    expect(result).toMatchSnapshot();
    expect(result.getByTestId('radioButton')).toBeDefined();
    expect(result.getByTestId('radioButtonCircle')).toBeDefined();
    expect(
      result.getByTestId('radioButtonCircle').props.style.borderWidth,
    ).not.toBe(0);
    expect(
      result.getByTestId('radioButtonCircle').props.style.borderColor,
    ).toBe(colors.light.accent);
    expect(result.getByTestId('radioButtonCircleInner')).toBeDefined();
    expect(
      result.getByTestId('radioButtonCircleInner').props.style.backgroundColor,
    ).toBe('transparent');
  });

  it('should render the radio button selected', () => {
    const result = render(<RadioButton selected={true} onPress={() => {}} />);
    expect(result).toBeDefined();
    expect(result).toMatchSnapshot();
    expect(result.getByTestId('radioButton')).toBeDefined();
    expect(result.getByTestId('radioButtonCircle')).toBeDefined();
    expect(
      result.getByTestId('radioButtonCircle').props.style.borderWidth,
    ).not.toBe(0);
    expect(
      result.getByTestId('radioButtonCircle').props.style.borderColor,
    ).toBe(colors.light.accent);
    expect(result.getByTestId('radioButtonCircleInner')).toBeDefined();
    expect(
      result.getByTestId('radioButtonCircleInner').props.style.backgroundColor,
    ).toBe(colors.light.accent);
  });

  it('should render the radio button with label', () => {
    const text = 'Test';
    const result = render(
      <RadioButton label={text} selected={false} onPress={() => {}} />,
    );
    expect(result).toBeDefined();
    expect(result).toMatchSnapshot();
    expect(result.getByTestId('radioButton')).toBeDefined();
    expect(result.getByTestId('radioButtonCircle')).toBeDefined();
    expect(result.getByTestId('radioButtonLabel')).toBeDefined();
    expect(result.getByTestId('radioButtonCircleInner')).toBeDefined();
    expect(
      result.getByTestId('radioButtonCircleInner').props.style.backgroundColor,
    ).toBe('transparent');
    expect(result.getByText(text)).toBeDefined();
    expect(
      result
        .getByTestId('radioButtonLabel')
        .props.children.some((child: any) => child === text),
    ).toBeTruthy();
  });

  it('should render the radio button with label and selected', () => {
    const text = 'Test';
    const result = render(
      <RadioButton label={text} selected={true} onPress={() => {}} />,
    );
    expect(result).toBeDefined();
    expect(result).toMatchSnapshot();
    expect(result.getByTestId('radioButton')).toBeDefined();
    expect(result.getByTestId('radioButtonCircle')).toBeDefined();
    expect(result.getByTestId('radioButtonLabel')).toBeDefined();
    expect(result.getByTestId('radioButtonCircleInner')).toBeDefined();
    expect(
      result.getByTestId('radioButtonCircleInner').props.style.backgroundColor,
    ).toBe(colors.light.accent);
    expect(result.getByText(text)).toBeDefined();
    expect(
      result
        .getByTestId('radioButtonLabel')
        .props.children.some((child: any) => child === text),
    ).toBeTruthy();
  });

  it('should render the radio button with label and size', () => {
    const text = 'Test';
    const size = 20;
    const result = render(
      <RadioButton
        label={text}
        size={size}
        selected={false}
        onPress={() => {}}
      />,
    );
    expect(result).toBeDefined();
    expect(result).toMatchSnapshot();
    expect(result.getByTestId('radioButton')).toBeDefined();
    expect(result.getByTestId('radioButtonCircle')).toBeDefined();
    expect(result.getByTestId('radioButtonLabel')).toBeDefined();
    expect(result.getByTestId('radioButtonCircleInner')).toBeDefined();
    expect(
      result.getByTestId('radioButtonCircleInner').props.style.backgroundColor,
    ).toBe('transparent');
    expect(result.getByText(text)).toBeDefined();
    expect(
      result
        .getByTestId('radioButtonLabel')
        .props.children.some((child: any) => child === text),
    ).toBeTruthy();
    expect(result.getByTestId('radioButtonCircle').props.style.padding).toBe(
      size / 4,
    );
    expect(result.getByTestId('radioButtonCircleInner').props.style.width).toBe(
      size,
    );
  });
});

describe('RadioButton action tests', () => {
  it('should call onPress when radio button is pressed', () => {
    const mockOnPress = jest.fn();
    const result = render(
      <RadioButton selected={false} onPress={mockOnPress} />,
    );
    expect(result).toBeDefined();
    expect(result).toMatchSnapshot();
    expect(result.getByTestId('radioButton')).toBeDefined();
    expect(result.getByTestId('radioButtonCircle')).toBeDefined();
    expect(result.getByTestId('radioButtonCircleInner')).toBeDefined();
    expect(
      result.getByTestId('radioButtonCircleInner').props.style.backgroundColor,
    ).toBe('transparent');
    expect(mockOnPress).toHaveBeenCalledTimes(0);
    fireEvent.press(result.getByTestId('radioButton'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should call onPress when radio button is pressed and selected', () => {
    const mockOnPress = jest.fn();
    const result = render(
      <RadioButton selected={true} onPress={mockOnPress} />,
    );
    expect(result).toBeDefined();
    expect(result).toMatchSnapshot();
    expect(result.getByTestId('radioButton')).toBeDefined();
    expect(result.getByTestId('radioButtonCircle')).toBeDefined();
    expect(result.getByTestId('radioButtonCircleInner')).toBeDefined();
    expect(
      result.getByTestId('radioButtonCircleInner').props.style.backgroundColor,
    ).toBe(colors.light.accent);
    expect(mockOnPress).toHaveBeenCalledTimes(0);
    fireEvent.press(result.getByTestId('radioButton'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
