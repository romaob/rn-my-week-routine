import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import DialogCustom from '../../src/components/DialogCustom';
import {Text} from 'react-native';

import strings from '../../src/values/strings.json';
import StringsProvider from '../../src/context/useStringContext';

const title = 'title';
const children = <Text testID="children">children</Text>;
const cancelLabel = 'cancelLabel';
const confirmLabel = 'confirmLabel';
const onCancel = jest.fn();
const onConfirm = jest.fn();

function testDialog(result: any) {
  expect(result).toBeDefined();
  expect(result.getByTestId('DialogCustom')).toBeDefined();
  expect(result.getByTestId('DialogCustomTitle')).toBeDefined();
  expect(result.getByText(title)).toBeDefined();
  expect(
    result
      .getByTestId('DialogCustomTitle')
      .props.children.some((child: any) => child === title),
  ).toBe(true);
  expect(result.getByTestId('children')).toBeDefined();
}

describe('DialogCustom render tests', () => {
  it('should not show the dialog when show is false', () => {
    const result = render(
      <DialogCustom show={false} title={title}>
        {children}
      </DialogCustom>,
    );
    expect(result.queryByTestId('DialogCustom')).toBeNull();
  });

  it('should render the dialog correctly when show is true', () => {
    const result = render(
      <DialogCustom
        show={true}
        title={title}
        cancelLabel={cancelLabel}
        confirmLabel={confirmLabel}
        onCancel={onCancel}
        onConfirm={onConfirm}>
        {children}
      </DialogCustom>,
    );
    expect(result).toMatchSnapshot();
    testDialog(result);
    expect(result.getByTestId('DialogCustomCancelButton')).toBeDefined();
    expect(result.getByText(cancelLabel)).toBeDefined();
    expect(result.getByTestId('DialogCustomConfirmButton')).toBeDefined();
    expect(result.getByText(confirmLabel)).toBeDefined();
  });

  it('should render the dialog with default buttons labels when not providing', () => {
    const result = render(
      <StringsProvider>
        <DialogCustom
          show={true}
          title={title}
          onCancel={onCancel}
          onConfirm={onConfirm}>
          {children}
        </DialogCustom>
      </StringsProvider>,
    );
    expect(result).toMatchSnapshot();
    testDialog(result);
    expect(result.getByTestId('DialogCustomCancelButton')).toBeDefined();
    expect(result.getByText(strings.cancel.en)).toBeDefined();
    expect(result.getByTestId('DialogCustomConfirmButton')).toBeDefined();
    expect(result.getByText(strings.cancel.en)).toBeDefined();
  });

  it('should not render the cancel button when onCancel is not provided', () => {
    const result = render(
      <DialogCustom
        show={true}
        title={title}
        cancelLabel={cancelLabel}
        confirmLabel={confirmLabel}
        onConfirm={onConfirm}>
        {children}
      </DialogCustom>,
    );
    expect(result).toMatchSnapshot();
    testDialog(result);
    expect(result.queryByTestId('DialogCustomCancelButton')).toBeNull();
    expect(result.getByTestId('DialogCustomConfirmButton')).toBeDefined();
    expect(result.getByText(confirmLabel)).toBeDefined();
  });

  it('should not render the confirm button when onConfirm is not provided', () => {
    const result = render(
      <DialogCustom
        show={true}
        title={title}
        cancelLabel={cancelLabel}
        confirmLabel={confirmLabel}
        onCancel={onCancel}>
        {children}
      </DialogCustom>,
    );
    expect(result).toMatchSnapshot();
    testDialog(result);
    expect(result.getByTestId('DialogCustomCancelButton')).toBeDefined();
    expect(result.getByText(cancelLabel)).toBeDefined();
    expect(result.queryByTestId('DialogCustomConfirmButton')).toBeNull();
  });
});

describe('DialogCustom behavior tests', () => {
  it('should call onCancel when cancel button is pressed', () => {
    const result = render(
      <DialogCustom
        show={true}
        title={title}
        cancelLabel={cancelLabel}
        confirmLabel={confirmLabel}
        onCancel={onCancel}
        onConfirm={onConfirm}>
        {children}
      </DialogCustom>,
    );
    expect(result).toMatchSnapshot();
    testDialog(result);
    expect(result.getByTestId('DialogCustomCancelButton')).toBeDefined();
    expect(result.getByText(cancelLabel)).toBeDefined();
    expect(result.getByTestId('DialogCustomConfirmButton')).toBeDefined();
    expect(result.getByText(confirmLabel)).toBeDefined();

    fireEvent.press(result.getByTestId('DialogCustomCancelButton'));
    expect(onCancel).toHaveBeenCalled();
  });

  it('should call onConfirm when confirm button is pressed', () => {
    const result = render(
      <DialogCustom
        show={true}
        title={title}
        cancelLabel={cancelLabel}
        confirmLabel={confirmLabel}
        onCancel={onCancel}
        onConfirm={onConfirm}>
        {children}
      </DialogCustom>,
    );
    expect(result).toMatchSnapshot();
    testDialog(result);
    expect(result.getByTestId('DialogCustomCancelButton')).toBeDefined();
    expect(result.getByText(cancelLabel)).toBeDefined();
    expect(result.getByTestId('DialogCustomConfirmButton')).toBeDefined();
    expect(result.getByText(confirmLabel)).toBeDefined();

    fireEvent.press(result.getByTestId('DialogCustomConfirmButton'));
    expect(onConfirm).toHaveBeenCalled();
  });
});
