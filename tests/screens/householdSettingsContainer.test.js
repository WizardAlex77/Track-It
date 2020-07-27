import React from 'react';
import { render, fireEvent, cleanup } from 'react-native-testing-library';
import LogInContainer from '../../../container/LogInContainer';
import renderer from 'react-test-renderer';
import firebase from 'firebase-mocks'
import householdSettingsContainer from '../../container/householdSettingsContainer';

afterEach(cleanup);

jest.mock('react-native-firebase');

describe('<Household Settings />', () => {
    it('should match snapshot', () => {
        const result = render(<householdSettingsContainer />).toJSON();
        expect(result).toMatchSnapshot();
    });
})