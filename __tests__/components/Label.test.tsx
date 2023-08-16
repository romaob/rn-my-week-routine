import React from 'react';
import {render} from '@testing-library/react-native';
import Label, {FontSize} from '../../src/components/Label';
import {sizes} from '../../src/values/sizes';
import {colors} from '../../src/values/colors';

const testLabelText = 'Test Label';

describe('Testing Label component rendering', () => {
  it('should render the label with the given text', () => {
    const result = render(<Label text={testLabelText} />);
    expect(result).toBeTruthy();
    expect(result.findByText(testLabelText)).toBeTruthy();
    expect(result.findByTestId('label')).toBeTruthy();
    expect(result.getByTestId('label').props.style.fontSize).toBe(
      sizes.font.md,
    );
    expect(result.getByTestId('label').props.style.color).toBe(
      colors.light.text,
    );
  });

  it('should render the label with the given size', () => {
    const result = render(
      <Label text={testLabelText} size={FontSize.EXTRA_LARGE} />,
    );
    expect(result.getByTestId('label').props.style.fontSize).toBe(
      sizes.font.xl,
    );
  });

  it('should render the label with the given children', () => {
    const result = render(
      <Label text={testLabelText}>
        <Label text="Child" />
      </Label>,
    );
    expect(result.getByText('Child')).toBeTruthy();
  });
});
