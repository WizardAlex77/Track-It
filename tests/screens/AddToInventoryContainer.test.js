import React from 'react';
import { render, fireEvent, cleanup } from 'react-native-testing-library';
import renderer from 'react-test-renderer'
import HomeContainer from '../../container/HomeContainer';
import AddToInventoryContainer from '../../container/AddToInventoryContainer';
import { Permissions } from 'expo';



jest.mock('expo', () => ({
    Permissions: {
        askAsync: jest.fn(),
    }
}))

describe("Test the Permission function", () => {
    it('should return rejected permission.', () => {
        Permissions.askAsync.mockImplementation(permission => { return { status: 'granted' }; }); // if you want to add some sort of custom functionality

        const wrapper = shallow(<Photo2 />);
        const instance = wrapper.instance();

        return instance.checkPermission().then(data => {
            expect(instance.state("cameraPermission")).toBeFalsy();
        });
    });
});

describe("AddToInventoryContainer", () => {

    it('receives input', () => {
        const { handleUpdateName } = jest.fn()
        const rendered = render(<AddToInventoryContainer />);
        const NameComponent = rendered.getByText('Name');

        fireEvent.changeText(NameComponent, '123456')
        expect(changeText).toHaveBeenCalled()
    })

    it('should receive the name value', () => {
        let rendered = renderer.create(<AddToInventoryContainer />).getInstance()
        rendered.handleUpdateName('123456')
        expect(name).toEqual('123456')
    })
    it('should receive the type value', () => {
        let rendered = renderer.create(<AddToInventoryContainer />).getInstance()
        rendered.handleUpdateType('123456')
        expect(type).toEqual('123456')
    })
    it('should receive the Location value', () => {
        let rendered = renderer.create(<AddToInventoryContainer />).getInstance()
        rendered.handleUpdateLocation('123456')
        expect(location).toEqual('123456')
    })
    it('should receive the quantity value', () => {
        let rendered = renderer.create(<AddToInventoryContainer />).getInstance()
        rendered.handleUpdateQuantity('123456')
        expect(quantity).toEqual('123456')
    })
    it('should receive the description value', () => {
        let rendered = renderer.create(<AddToInventoryContainer />).getInstance()
        rendered.handleUpdateDescription('123456')
        expect(description).toEqual('123456')
    })
    it('should receive the expiry date value', () => {
        let rendered = renderer.create(<AddToInventoryContainer />).getInstance()
        rendered.handleUpdateExpiry(Date.now())
        expect(expiry).toEqual(Date.now())
    })



})