import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import DialogAlert from '../../src/components/DialogAlert';

const TEST_TITLE = 'Test Title';
const TEST_MESSAGE = 'Test Message';
const onConfirmTest = jest.fn();
const onCancelTest = jest.fn();

describe('DialogAlert render tests', () => {
  it('should render correctly', () => {
    const result = render(
      <DialogAlert
        show
        title={TEST_TITLE}
        message={TEST_MESSAGE}
        onCancel={() => {}}
        onConfirm={() => {}}
      />,
    );
    //Main test
    expect(result).toBeTruthy();
    //If it matches the snapshot
    expect(result).toMatchSnapshot();
    //If the components are rendered
    expect(result.getByTestId('dialogAlert')).toBeTruthy();
    expect(result.getByTestId('dialogAlertTitle')).toBeTruthy();
    expect(result.getByTestId('dialogAlertMessage')).toBeTruthy();
    expect(result.getByTestId('dialogAlertCancelButton')).toBeTruthy();
    expect(result.getByTestId('dialogAlertConfirmButton')).toBeTruthy();
    expect(result.getByTestId('dialogAlertIcon')).toBeTruthy();
  });

  it('should render the provided title', () => {
    const result = render(
      <DialogAlert
        show
        title={TEST_TITLE}
        message={TEST_MESSAGE}
        onCancel={() => {}}
        onConfirm={() => {}}
      />,
    );
    expect(result).toBeTruthy();
    expect(result).toMatchSnapshot();
    expect(result.getByTestId('dialogAlert')).toBeTruthy();
    expect(result.getByTestId('dialogAlertTitle')).toBeTruthy();
    //Check if the title contain the text inside
    expect(
      result
        .getByTestId('dialogAlertTitle')
        .props.children.some((child: any) => child === TEST_TITLE),
    ).toBeTruthy();
  });

  it('should render the provided message', () => {
    const result = render(
      <DialogAlert
        show
        title={TEST_TITLE}
        message={TEST_MESSAGE}
        onCancel={() => {}}
        onConfirm={() => {}}
      />,
    );
    expect(result).toBeTruthy();
    expect(result).toMatchSnapshot();
    expect(result.getByTestId('dialogAlert')).toBeTruthy();
    expect(result.getByTestId('dialogAlertMessage')).toBeTruthy();
    //Check if the body text contain the text inside
    expect(
      result
        .getByTestId('dialogAlertMessage')
        .props.children.some((child: any) => child === TEST_MESSAGE),
    ).toBeTruthy();
  });
});

describe('DialogAlert behavior tests', () => {
  it('should be hidden based on the show prop', () => {
    const result = render(
      <DialogAlert
        show={false}
        title={TEST_TITLE}
        message={TEST_MESSAGE}
        onCancel={() => {}}
        onConfirm={() => {}}
      />,
    );
    expect(result.queryByTestId('dialogAlert')).toBeFalsy();
  });

  it('should call the onCancel callback when the cancel button is pressed', () => {
    const result = render(
      <DialogAlert
        show
        title={TEST_TITLE}
        message={TEST_MESSAGE}
        onCancel={onCancelTest}
        onConfirm={onConfirmTest}
      />,
    );
    expect(result).toBeTruthy();
    expect(result).toMatchSnapshot();
    expect(result.getByTestId('dialogAlert')).toBeTruthy();
    expect(result.getByTestId('dialogAlertCancelButton')).toBeTruthy();

    //Press the cancel button
    fireEvent.press(result.getByTestId('dialogAlertCancelButton'));
    expect(onCancelTest).toHaveBeenCalled();
  });

  it('should call the onConfirm callback when the confirm button is pressed', () => {
    const result = render(
      <DialogAlert
        show
        title={TEST_TITLE}
        message={TEST_MESSAGE}
        onCancel={onCancelTest}
        onConfirm={onConfirmTest}
      />,
    );
    expect(result).toBeTruthy();
    expect(result).toMatchSnapshot();
    expect(result.getByTestId('dialogAlert')).toBeTruthy();
    expect(result.getByTestId('dialogAlertConfirmButton')).toBeTruthy();

    //Press the confirm button
    fireEvent.press(result.getByTestId('dialogAlertConfirmButton'));
    expect(onConfirmTest).toHaveBeenCalled();
  });
});
