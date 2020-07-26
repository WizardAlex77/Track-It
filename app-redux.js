import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import firebaseDb from "./firebaseDb";

//
// Initial State...
//

const initialState = {
    items: [],
    inventoryDisplay: [],
    homeDisplay: [],
    expiringItems: [],
    expiryDisplay: [],
    users: [],
    requests: [],
    memberListDisplay: [],
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

        case "updateUsers":
            return {...state, users: action.value };

        case "updateRequestDisplay":
            return {...state, requests: action.value };

        case "updateMemberListDisplay":
            return {...state, memberListDisplay: action.value };

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

const updateMemberListDisplay = (data) => {
    return {
        type: "updateMemberListDisplay",
        value: data
    }
}


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

const updateUsers = (data) => {
    return {
        type: "updateUsers",
        value: data
    }
}

const updateRequestDisplay = (data) => {
    return {
        type: "updateRequestDisplay",
        value: data
    }
}

const watchUsers = () => {
    return function(dispatch) {
        firebaseDb.firestore().collection('users')
            .get()
            .then( (querySnapshot) => {
                    const results = [];
                    querySnapshot.docs.map((documentSnapshot) =>
                        results.push(documentSnapshot.data())
                    );
                    let actionUpdateItems = updateUsers(results);
                    dispatch(actionUpdateItems);
                    console.log("watchUsers is being called, userList updated");
                },
                () => {
                    console.log("error in getting data from database")
                })
            .catch((err) => {console.log('Failed to update', err)})
    }
}

const watchItemData = () => {
    return function(dispatch) {
        firebaseDb.firestore().collection("items").doc(firebaseDb.auth().currentUser ? firebaseDb.auth().currentUser.photoURL: "1")
            .collection("items")
            .get()
            .then( (querySnapshot) => {
                const results = [];
                const results2 = [];
                querySnapshot.docs.map((documentSnapshot) =>
                    results.push(documentSnapshot.data())
                );

                querySnapshot.docs.map((documentSnapshot) => {
                    if (documentSnapshot.get("ownerEmail") === firebaseDb.auth().currentUser.email)
                    results2.push(documentSnapshot.data())
                    }
                );
                let actionUpdateItems = updateItems(results);
                dispatch(actionUpdateItems);
                dispatch(updateHomeDisplay(results));
                dispatch(updateInventoryDisplay(results2));
                console.log("watchItemData is being called, HomeDisplay and InventoryDisplay being reset");
            },
                () => {
                    console.log("error in getting data from database")
                })
            .catch((err) => {console.log('Failed to update', err)})
    }
};

const watchItemExpiry = () => {
    return function(dispatch) {
        firebaseDb.firestore().collection("items").doc(firebaseDb.auth().currentUser ? firebaseDb.auth().currentUser.photoURL: "1")
            .collection("items")
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
            },
                () => {
                console.log("error in getting data from database")
                }
                )
            .catch((err) => {console.log('Failed to update', err)})
    }
}

const watchRequests = () => {
    return function(dispatch) {
        firebaseDb.firestore().collection('requests').where("toJoin", "==", firebaseDb.auth().currentUser.email)
            .get().then((querySnapshot) => {
            const results = [];
            querySnapshot.docs.map((documentSnapshot) => {
                    if (documentSnapshot.data().expiry !== "None") {
                        results.push(documentSnapshot.data());
                    }
                }
            );
            let actionUpdateItems = updateRequestDisplay(results);
            dispatch(actionUpdateItems);
            console.log("watchRequest is being called");
        },
        () => {
            console.log("error in getting data from database")
        }
    )
    .catch((err) => {console.log('Failed to update', err)})
    }
}

const watchMemberListDisplay = (owner) => {
    return function(dispatch) {
        firebaseDb.firestore().collection('users')
            .get()
            .then( (querySnapshot) => {
                    const results = [];
                    querySnapshot.docs.map((documentSnapshot) =>
                        results.push(documentSnapshot.data())
                    );
                    let results2 = [];
                    if (owner) {
                        results2 = results.filter(function(x) {return x.household === firebaseDb.auth().currentUser.photoURL  && x.household !== x.email});
                    } else {
                        results2 = results.filter(function(x) {return x.household === firebaseDb.auth().currentUser.photoURL  && firebaseDb.auth().currentUser.email !== x.email});
                    }
                    let actionUpdateItems = updateMemberListDisplay(results2);
                    dispatch(actionUpdateItems);
                    console.log("watchUsers is being called, userList updated");
                },
                () => {
                    console.log("error in getting data from database")
                })
            .catch((err) => {console.log('Failed to update', err)})
    }
}


export { updateInventoryDisplay, updateHomeDisplay , updateExpiryDisplay, watchItemData, watchItemExpiry, watchUsers, watchRequests, watchMemberListDisplay };