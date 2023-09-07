//Tests for the useString hook

import {renderHook} from '@testing-library/react';
import {useString} from '../../src/context/useStringContext';
import strings = require('../../src/values/strings.json');
import {act} from '@testing-library/react-native';

describe('useString hook tests', () => {
  it('should return the right values', () => {
    const {result} = renderHook(() => useString());
    expect(result.current.language).toBe('en');
    expect(result.current.setLanguage).toBeInstanceOf(Function);
    expect(result.current.getString).toBeInstanceOf(Function);
  });

  it('should return the right value when provided the key', () => {
    const {result} = renderHook(() => useString());
    expect(result.current.getString('test')).toBe(strings.test.en);
  });

  it('should return the right value when provided the key and changed the language', () => {
    const {result} = renderHook(() => useString());

    act(() => {
      result.current.setLanguage('es');
    });
    expect(result.current.getString('test')).toBe(strings.test.es);
  });

  it('should return an empty string if the key is not found', () => {
    const {result} = renderHook(() => useString());
    expect(result.current.getString('non-existing-key')).toBe('');
  });
});
