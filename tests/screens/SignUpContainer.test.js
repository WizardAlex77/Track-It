import React from 'react';
import { render, fireEvent, cleanup } from 'react-native-testing-library';
import renderer from 'react-test-renderer'
import SignUpContainer from '../../container/SignUpContainer';
import MockFirebase from 'firebase-mock';

afterEach(cleanup);

describe('SignUpContainer', () => {
    it('matched snapshot', () => {
        const rendered = renderer.create(<SignUpContainer />).toJSON();
        expect(rendered).toMatchSnapshot();
    })

    it('should receive the password value', () => {
        let signUpComponent = renderer.create(<SignUpContainer />).getInstance()
        signUpComponent.handleUpdatePassword('123456')
        const user = signUpComponent.state.user
        expect(user.password).toEqual('123456')
    })

    it('should receive the email value', () => {
        let signUpComponent = renderer.create(<SignUpContainer />).getInstance()
        signUpComponent.handleUpdateEmail('123456')
        const user = signUpComponent.state.user
        expect(user.email).toEqual('123456')
    })
    it('should receive the password2 value', () => {
        let signUpComponent = renderer.create(<SignUpContainer />).getInstance()
        signUpComponent.handleUpdatePassword2('123456')
        const user = signUpComponent.state.user
        expect(user.password2).toEqual('123456')
    })
    it('should receive the name value', () => {
        let signUpComponent = renderer.create(<SignUpContainer />).getInstance()
        signUpComponent.handleUpdateName('123456')
        const user = signUpComponent.state.user
        expect(user.name).toEqual('123456')
    })

})
