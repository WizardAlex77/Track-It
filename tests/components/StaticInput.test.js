import React from 'react';
import StaticInput from "../../component/Input"
import StaticPasswordInput from "../../component/StaticPasswordInput"
import StaticEmailInput from "../../component/StaticEmail"
import { render, cleanup, fireEvent, toBeTruthy } from 'react-native-testing-library';
import DatePicker from '../../component/DatePicker';

afterEach(cleanup);

describe('<StaticInput />', () => {
    it('should match snapshot', () => {
        const rendered = render(<StaticInput children={'abacaba'} />).toJSON();
        expect(rendered).toMatchSnapshot();
    })

    it('should properly render the text', () => {
        const rendered = render(<StaticInput children={'abacaba'} />);
        const textComponent = rendered.getByTestId('text');
        expect(textComponent.props.children).toEqual('abacaba');
    });

    it('should fire onChange events', () => {
        const onChange = jest.fn();
        const rendered = render(<StaticInput onChangeText={onChange} />);
        const inputComponent = rendered.getByTestId('input');

        fireEvent(inputComponent, 'changeText', 'new text');
        expect(onChange).toHaveBeenCalledWith('new text');
    });
})

describe('<StaticPasswordInput />', () => {
    it('should match snapshot', () => {
        const rendered = render(<StaticPasswordInput children={'Password'} />).toJSON();
        expect(rendered).toMatchSnapshot();
    })

    it('should properly render the text', () => {
        const rendered = render(<StaticPasswordInput children={'Password'} />);
        const textComponent = rendered.getByTestId('text');
        expect(textComponent.props.children).toEqual('Password');
    });

    it('should fire onChange events', () => {
        const onChange = jest.fn();
        const rendered = render(<StaticPasswordInput onChangeText={onChange} />);
        const inputComponent = rendered.getByTestId('input');
        fireEvent(inputComponent, 'changeText', 'new text');
        expect(onChange).toHaveBeenCalledWith('new text');
    });

    /* it('password appears as asterisk or bulletpoints', () => {
        const onChange = jest.fn();
        const rendered = render(<StaticPasswordInput onChangeText={onChange} />);
        const inputComponent = rendered.getByTestId('input');
        expect(inputComponent.children.secureTextEntry).toBeTruthy();
    }) */
})

describe('<StaticEmailInput />', () => {
    it('should match snapshot', () => {
        const rendered = render(<StaticEmailInput children={'abacaba'} />).toJSON();
        expect(rendered).toMatchSnapshot();
    })

    it('should properly render the text', () => {
        const rendered = render(<StaticEmailInput children={'abacaba'} />);
        const textComponent = rendered.getByTestId('text');
        expect(textComponent.props.children).toEqual('abacaba');
    });

    it('should fire onChange events', () => {
        const onChange = jest.fn();
        const rendered = render(<StaticEmailInput onChangeText={onChange} />);
        const inputComponent = rendered.getByTestId('input');

        fireEvent(inputComponent, 'changeText', 'new text');
        expect(onChange).toHaveBeenCalledWith('new text');
    });
})


describe('<DatePicker />', () => {
    it('should match snapshot', () => {
        const rendered = render(<DatePicker />).toJSON();
        expect(rendered).toMatchSnapshot();
    })

    it('should properly render the text', () => {
        const rendered = render(<DatePicker />);
        const textComponent = rendered.getByTestId('date');
        expect(textComponent.props.children).toEqual("");
    });

    it('should open date picker', () => {
        const isVisible = jest.fn();
        const rendered = render(<DatePicker />);
        const inputComponent = rendered.getByTestId('press');

        fireEvent.press(inputComponent);
    });
})



