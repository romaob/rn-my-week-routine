import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Button, {ButtonColorType, ButtonSize} from '../../src/components/Button';
import {colors} from '../../src/values/colors';
import {sizes} from '../../src/values/sizes';

const label = 'Test Button';

describe('Testing the rendering of the button', () => {
  it('should render the default button', () => {
    const result = render(<Button label={label} onPress={() => {}} />);
    expect(result).toBeTruthy();
    expect(result.findByTestId('button')).toBeTruthy();
    expect(result.findByText(label)).toBeTruthy();
    expect(result.getByText(label).props.children).toBe(label);
    expect(result.getByTestId('button').props.style.backgroundColor).toBe(
      colors.light.primary,
    );
    expect(result.getByTestId('buttonLabel')).toBeTruthy();
    expect(result.getByTestId('buttonLabel').props.children).toBe(label);
    expect(result.getByTestId('buttonLabel').props.style[1].fontSize).toBe(
      sizes.font.md,
    );
  });

  it('should render the button with the given color type', () => {
    const result = render(
      <Button
        label={label}
        onPress={() => {}}
        colorType={ButtonColorType.DANGER}
      />,
    );
    expect(result.getByTestId('button').props.style.backgroundColor).toBe(
      colors.light.danger,
    );
  });

  it('should render the button with the round style', () => {
    const result = render(
      <Button label={label} onPress={() => {}} rounded={true} />,
    );
    expect(result.getByTestId('button').props.style.borderRadius).toBe(999);
  });

  it('should render the button label with the given size', () => {
    const result = render(
      <Button label={label} onPress={() => {}} size={ButtonSize.EXTRA_LARGE} />,
    );
    expect(result.getByTestId('buttonLabel').props.style[1].fontSize).toBe(
      sizes.font.xl,
    );
  });

  it('should render the button with disabled style', () => {
    const result = render(<Button label={label} onPress={() => {}} disabled />);
    expect(result.getByTestId('buttonInactive').props.style.opacity).toBe(0.5);
  });

  it('should render the button as flex 1 when providing the flex prop', () => {
    const result = render(<Button label={label} onPress={() => {}} flex />);
    expect(result.getByTestId('button').props.style.flex).toBe(1);
  });

  it('should render the button with the given children', () => {
    const result = render(
      <Button label={label} onPress={() => {}}>
        <></>
      </Button>,
    );
    expect(result.getByTestId('button').props.children).toBeTruthy();
  });
});

describe('Testing the actions of the button', () => {
  it('should call the onPress function when the button is pressed', () => {
    const onPress = jest.fn();
    const result = render(<Button label={label} onPress={onPress} />);
    fireEvent.press(result.getByTestId('button'));
    expect(onPress).toHaveBeenCalled();
  });

  it('should not call the onPress function when the button is inactive', () => {
    const onPress = jest.fn();
    const result = render(<Button label={label} onPress={onPress} inactive />);
    fireEvent.press(result.getByTestId('buttonInactive'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('should not call the onPress function when the button is disabled', () => {
    const onPress = jest.fn();
    const result = render(<Button label={label} onPress={onPress} disabled />);
    fireEvent.press(result.getByTestId('buttonInactive'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
