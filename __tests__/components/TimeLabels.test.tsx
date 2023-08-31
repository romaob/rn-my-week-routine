import React from 'react';
import TimeLabels from '../../src/components/TimeLabels';
import {render} from '@testing-library/react-native';
import {getSlotIndexOfDate} from '../../src/utils/dateUtils';
import {ITEM_MINUTES} from '../../src/values/appDefaults';
import {colors} from '../../src/values/colors';

describe('Time labels list render tests', () => {
  it('should render all time slots correctly', () => {
    const result = render(<TimeLabels />);
    expect(result).toBeTruthy();
    expect(result.findByTestId('time-labels')).toBeTruthy();
    expect(result.queryAllByTestId('time-labels-item').length).toBe(48);
    expect(result.queryAllByTestId('time-labels-item-hour').length).toBe(24);
    const timeLabelsList = result.queryAllByTestId('time-labels-item');
    expect(timeLabelsList.length).toBe(48);
    const nowIndex = getSlotIndexOfDate(new Date(), ITEM_MINUTES);
    expect(timeLabelsList[nowIndex].props.style).toContainEqual({
      backgroundColor: colors.light.accent,
    });
  });
});
