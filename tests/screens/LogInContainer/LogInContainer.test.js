import React from 'react';
import { render, fireEvent, cleanup } from 'react-native-testing-library';
import LogInContainer from '../../../container/LogInContainer';
import renderer from 'react-test-renderer'
import firebaseDb from '../../../firebaseDb';

describe('sample tests', () => {
    it('2 + 2 should be 4', () => {
        expect(2 + 2).toBe(4)
    });
});

afterEach(cleanup);

jest.mock('react-native-firebase');

describe('<LogInContainer />', () => {
    it('should match snapshot', () => {
        const result = render(<LogInContainer />).toJSON();
        expect(result).toMatchSnapshot();
    });

    it('receives email input', () => {
        const rendered = render(<LogInContainer />);
        const textComponent = rendered.getByText('Email');
        expect(textComponent.props.children).toEqual('Email');
    });

    it('should change the password value', () => {
        let loginComponent = renderer.create(<LogInContainer />).getInstance()
        loginComponent.handleUpdatePassword('123456')
        expect(loginComponent.state.password).toEqual('123456')
    })

    it('should change the email value', () => {
        let loginComponent = renderer.create(<LogInContainer />).getInstance()
        loginComponent.handleUpdateEmail('123456')
        expect(loginComponent.state.email).toEqual('123456')
    })

    /* it('should fire onSubmit events', () => {
        const { handleSignIn } = jest.spyOn(handleSignIn)
        const rendered = render(<LogInContainer />)
        const buttonComponent = rendered.getTestID('submit')

        fireEvent(buttonComponent, 'press')

        expect(handleSignIn).toHaveBeenCalled()
    }) */
});

/* describe('handleUpdateEmail function', () => {
    it('should properly render the email input', () => {
        const rendered = render(<LogInContainer />);
        const textComponent = rendered.getByTestId('email');
        expect(textComponent.props.children).toEqual('password');
    });

    it('should fire onChange events', () => {
        const rendered = render(<LogInContainer />);
        const inputComponent = rendered.getByTestId('email');

        fireEvent(inputComponent, 'changeText', 'new text');
        expect(handleUpdateEmail).toHaveBeenCalledWith('new text');
    });
}); */

//verify if user will be able to login with a valid email and valid password

/* describe('User', () => {
    it('is able to login with valid email and password', () => {

        })
    })
}); */





//verify if user cannot login with a valid email and invalid password


//verify the login page for both, when the field is blank and submit button is clicked


//verify messages for invalid login


//verify if data in password field is either vidible as asterisk or bullet signs


//verify if the "enter" key of the keybaord is working correctly on the login page
