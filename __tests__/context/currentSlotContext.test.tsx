import React from 'react';
import {renderHook} from '@testing-library/react';
import {render} from '@testing-library/react-native';
import CurrentSlotProvider, {
  useCurrentSlot,
} from '../../src/context/currentSlotContext';
import {getSlotIndexOfDate} from '../../src/utils/dateUtils';
import {ITEM_MINUTES} from '../../src/values/appDefaults';
import {Text} from 'react-native';

//React native test component for the context
function TestComponent(): JSX.Element {
  const {currentIndex} = useCurrentSlot();

  return <Text testID="currentIndex">{currentIndex}</Text>;
}

function TestComponentParent(): JSX.Element {
  return (
    <CurrentSlotProvider>
      <TestComponent />
    </CurrentSlotProvider>
  );
}

describe('useCurrentSlot', () => {
  it('should return the initial slot value', () => {
    const {result} = renderHook(() => useCurrentSlot());
    const expectedIndex = getSlotIndexOfDate(new Date(), ITEM_MINUTES);
    expect(result.current.currentIndex).toBe(expectedIndex);
  });

  it('should render the value on the component inside the provider', () => {
    const result = render(<TestComponentParent />);
    expect(result).toBeTruthy();
    expect(result.findByTestId('currentIndex')).toBeTruthy();
    const expectedIndex = getSlotIndexOfDate(new Date(), ITEM_MINUTES);
    expect(result.getByTestId('currentIndex').props.children).toBe(
      expectedIndex,
    );
  });
});
