import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import firebaseDb from "./firebaseDb";

//
// Initial State...
//

const initialState = {
    items: { },
    inventoryDisplay: { },
    homeDisplay: { },
    expiringItems: { },
    expiryDisplay: { },
}


//
// Reducer...
//

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "updateItems":
            return {...state, items: action.value};

        case "updateExpiringItems":
            return {...state, expiringItems: action.value };

        case "updateHomeDisplay":
            return {...state, homeDisplay: action.value };

        case "updateInventoryDisplay":
            return {...state, inventoryDisplay: action.value };

        case "updateExpiryDisplay":
            return {...state, expiryDisplay: action.value };

        default:
            return state;
    }
}

//
// Store...
//

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export { store };

//
// Action Creators
//

const updateItems = (data) => {
    return {
        type: "updateItems",
        value: data
    };
};

const updateExpiringItems = (data) => {
    return {
        type: "updateExpiringItems",
        value: data
    };
}

const updateHomeDisplay = (data) => {
    return {
        type: "updateHomeDisplay",
        value: data
    }
}

const updateInventoryDisplay = (data) => {
    return {
        type: "updateInventoryDisplay",
        value: data
    }
}

const updateExpiryDisplay = (data) => {
    return {
        type: "updateExpiryDisplay",
        value: data
    }
}

const watchItemData = () => {
    return function(dispatch) {
        firebaseDb.firestore().collection("items").get()
            .then( (querySnapshot) => {
                const results = [];
                querySnapshot.docs.map((documentSnapshot) =>
                    results.push(documentSnapshot.data())
                );
                let actionUpdateItems = updateItems(results);
                dispatch(actionUpdateItems);
                dispatch(updateHomeDisplay(results));
                dispatch(updateInventoryDisplay(results));
                console.log("watchItemData is being called, HomeDisplay and InventoryDisplay being reset");
            })
            .catch((err) => {console.log('Failed to update', err)})
    }
};

const watchItemExpiry = () => {
    return function(dispatch) {
        firebaseDb.firestore().collection("items")
            .get()
            .then((querySnapshot) => {
                const results = [];
                querySnapshot.docs.map((documentSnapshot) => {
                        if (documentSnapshot.data().expiry !== "None") {
                            results.push(documentSnapshot.data());
                        }
                    }
                );
                const sortedResults = results.sort((a,b) => a.expiry > b.expiry ? 1 : -1)
                let actionUpdateItems = updateExpiringItems(sortedResults);
                dispatch(actionUpdateItems);
                dispatch(updateExpiryDisplay(sortedResults))
                //console.log("number of item " + sortedResults.length);
                console.log("watchItemExpiry is being called, expiry display being reset");
            })
            .catch((err) => {console.log('Failed to update', err)})
    }
}

export { updateInventoryDisplay, updateHomeDisplay , updateExpiryDisplay, watchItemData, watchItemExpiry };