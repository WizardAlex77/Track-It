import React from 'react';
import { render, fireEvent, cleanup } from 'react-native-testing-library';
import renderer from 'react-test-renderer'
import HomeContainer from '../../container/HomeContainer';

afterEach(cleanup);

describe("HomeContainer", () => {

    it('renders empty list when there are no items with a message', () => {
        jest.mock('react-native-firebase');
        const rendered = render(<HomeContainer />).toJSON()
        expect(rendered).toMatchSnapshot()
    })
})