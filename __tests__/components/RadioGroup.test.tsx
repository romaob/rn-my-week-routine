import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import RadioGroup from '../../src/components/RadioGroup';
import {colors} from '../../src/values/colors';

const items = ['item1', 'item2', 'item3'];
const labels = ['label1', 'label2', 'label3'];
const onPress = jest.fn();
const label = 'label';
const size = 20;

function testGroup(result: any, selected: number, labels: string[]) {
  expect(result).toBeDefined();
  expect(result.getByTestId('radioGroup')).toBeDefined();
  const resultItems = result.getAllByTestId('radioButton');
  expect(resultItems.length).toBe(items.length);
  labels.forEach((itemLabel: string) => {
    expect(result.getByText(itemLabel)).toBeDefined();
  });
  const radioCircleInnerItems = result.getAllByTestId('radioButtonCircleInner');
  radioCircleInnerItems.forEach((item: any, index: number) => {
    expect(item).toBeDefined();
    expect(item.props.style.backgroundColor).toBe(
      selected === index ? colors.light.accent : 'transparent',
    );
    expect(item.props.style.width).toBe(size);
  });
}

describe('RadioGroup render tests', () => {
  it('should render the radio group with label', () => {
    const result = render(
      <RadioGroup
        label={label}
        itemSelected={items[1]}
        labels={labels}
        items={items}
        onPress={onPress}
        size={size}
      />,
    );
    expect(result).toMatchSnapshot();
    testGroup(result, 1, labels);
    expect(result.getByText(label)).toBeDefined();
    expect(result.getByTestId('radioGroupLabel')).toBeDefined();
    expect(
      result
        .getByTestId('radioGroupLabel')
        .props.children.some((child: any) => child === label),
    ).toBeTruthy();
  });

  it('should render the radio group without label', () => {
    const result = render(
      <RadioGroup
        itemSelected={items[1]}
        labels={labels}
        items={items}
        onPress={onPress}
        size={size}
      />,
    );
    expect(result).toMatchSnapshot();
    testGroup(result, 1, labels);
    expect(result.queryByTestId('radioGroupLabel')).toBeNull();
    expect(result.queryByText(label)).toBeNull();
  });

  it('should render the radio group without selection', () => {
    const result = render(
      <RadioGroup
        itemSelected={''}
        labels={labels}
        items={items}
        onPress={onPress}
        size={size}
      />,
    );
    expect(result).toMatchSnapshot();
    testGroup(result, -1, labels);
  });

  it('should render the radio group using the values when not having labels', () => {
    const result = render(
      <RadioGroup
        itemSelected={items[1]}
        items={items}
        onPress={onPress}
        size={size}
      />,
    );
    expect(result).toMatchSnapshot();
    testGroup(result, 1, items);
  });
});

describe('RadioGroup onPress tests', () => {
  it('should call the callback function with the right value when pressing a radio button', () => {
    const result = render(
      <RadioGroup
        itemSelected={items[1]}
        labels={labels}
        items={items}
        onPress={onPress}
        size={size}
      />,
    );
    expect(result).toMatchSnapshot();
    testGroup(result, 1, labels);
    expect(onPress).toHaveBeenCalledTimes(0);
    fireEvent.press(result.getAllByTestId('radioButton')[0]);
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onPress).toHaveBeenCalledWith(items[0]);
  });
});
