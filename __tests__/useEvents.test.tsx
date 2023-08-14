import {renderHook, waitFor} from '@testing-library/react';
import useEvents from '../src/hooks/useEvents';

import '../__mocks__/async-storage';

/**
 * @jest-environment jsdom
 */
describe('useEvents hook test', () => {
  it('should retrive the current data', async () => {
    const {result} = renderHook(() => useEvents());
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(result.current.events).toEqual([]);
    });
  });
});
