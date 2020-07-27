import React from 'react';
import { render, cleanup, fireEvent } from 'react-native-testing-library';
import Button from '../../component/Button';

afterEach(cleanup);

describe('button', () => {
    it('should match the snapshot', () => {
        const rendered = render(<Button children={'abacaba'} />).toJSON();
        expect(rendered).toMatchSnapshot();
    });

    it('should properly render the text', () => {
        const rendered = render(<Button children={'abacaba'} />);
        const textComponent = rendered.getByTestId('text');
        expect(textComponent.props.children).toEqual('abacaba');
    });

    it('should fire onSubmit events', () => {
        const onSubmit = jest.fn();
        const rendered = render(<Button onPress={onSubmit} />);
        const buttonComponent = rendered.getByTestId('submit');

        fireEvent(buttonComponent, 'press');

        expect(onSubmit).toHaveBeenCalled();
    });
});
