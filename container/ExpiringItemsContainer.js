import React, { Component } from "react";
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { connect } from 'react-redux';
import {updateExpiryDisplay, watchItemData, watchItemExpiry} from '../app-redux';
import Modal from "react-native-modal";
import SearchBar from "react-native-dynamic-search-bar";
import Icon from "react-native-vector-icons/Ionicons";
import firebaseDb from "../firebaseDb";

const firebase = require("firebase");
require("firebase/firestore");

const mapStateToProps = (state) => {
    return {
        items: state.items,
        expiringItems: state.expiringItems,
        expiryDisplay: state.expiryDisplay
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        watchItemData: () => dispatch(watchItemData()),
        watchItemExpiry: () => dispatch(watchItemExpiry()),
        updateExpiryDisplay: (data) => dispatch(updateExpiryDisplay(data))
    };
}

class ExpiringItemsContainer extends Component {

    state = {
        isLoading: true,
        isModalVisible: false,
        modalItem: null,
    };

    arrayHolder = [];

    componentDidMount() {
        firebaseDb.firestore().collection('items')
            .get().then((querySnapshot) => {
            const results = [];
            querySnapshot.docs.map((documentSnapshot) =>
                results.push(documentSnapshot.data())
            );
        }).catch((err) => console.error(err));
        firebaseDb.firestore().collection('items')
            .get().then((querySnapshot) => {
            const results = [];
            querySnapshot.docs.map((documentSnapshot) =>
                results.push(documentSnapshot.data())
            );
        }).catch((err) => console.error(err));
        this.props.watchItemExpiry();
        firebaseDb.firestore().collection('items')
            .get().then((querySnapshot) => {
            const results = [];
            querySnapshot.docs.map((documentSnapshot) =>
                results.push(documentSnapshot.data())
            );
            this.setState({
                isLoading: false,
                Username: firebaseDb.auth().currentUser.displayName,
            });
            console.log("loaded " + this.state.Username + " with pURL of " + firebaseDb.auth().currentUser.photoURL + " (Expiry)");
        }).catch((err) => console.error(err));
    }

    searchFilterFunction = (text) => {
        this.arrayHolder = this.props.expiringItems;
        const newData = this.arrayHolder.filter(item => {
            const nameData = `${item.name.toUpperCase()}`;
            const locationData = `${item.location.toUpperCase()}`;
            const typeData = `${item.type.toUpperCase()}`;
            const textData = text.toUpperCase();

            return nameData.indexOf(textData) > -1 || locationData.indexOf(textData) > -1 || typeData.indexOf(textData) > -1;
        });
        this.props.updateExpiryDisplay(newData);
    };

    renderHeader = () => {
        return (
            <SearchBar
                placeholder="Type Here..."
                lightTheme
                round
                onChangeText={text => this.searchFilterFunction(text)}
                autoCorrect={false}
                onPressCancel={() => { this.searchFilterFunction("") }}
                onPressFocus
                autoFocus={false}
                onPress={() => {}}
            />
        );
    };

    renderItem = (item) => {
        let typeOfWarning = "#d0ffb5";
        let locationStampz = "rgba(0,0,0,0.4)";
        let message = "";
        let mColor = "";
        let currentMoment = new Date();
        let expiryDateDiff = item.expiry.toDate() - currentMoment;
        if (expiryDateDiff <= 0) {
            typeOfWarning = "rgba(255,255,255,0.73)";
            locationStampz = "rgba(0,0,0,0.4)";
            mColor = typeOfWarning;
            message = "Expired";
        } else if (Math.ceil(expiryDateDiff/(1000*60*60*24)) <= 1) {
            typeOfWarning = "#fab9b9";
            locationStampz = "rgba(0,0,0,0.4)";
            mColor = typeOfWarning;
            message = "Expiring tomorrow"
        } else if (Math.ceil(expiryDateDiff/(1000*60*60*24)) <= 7) {
            typeOfWarning = "#f5e7af";
            locationStampz = "rgba(0,0,0,0.4)";
            mColor = typeOfWarning;
            message = "Expiring in a week"
        } else {
            typeOfWarning = "#d0ffb5";
            locationStampz = "rgba(0,0,0,0.4)";
            mColor = typeOfWarning;
            message = "Not expiring soon"
        }
            //<Text>Expiry Date: </Text>{item.expiry.toDate().toString().substring(4,15)}
        return (
            <View style={[styles.feedItem, {backgroundColor: typeOfWarning}]}>
                <Image source={{ uri: item.image }} style={styles.avatar} />
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <View>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={[styles.locationStamp, {color: locationStampz}]}>
                                {message}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ modalItem: item, modalColor: mColor});
                                this.toggleModal();
                            }}
                        >
                            <Icon name="ios-more" size={24} color="#73788B" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
    };

    deleteItem = () => {
        firebaseDb.firestore()
            .collection("items")
            .doc(firebase.auth().currentUser.photoURL).collection('items')
            .doc(this.state.modalItem.uid)
            .delete()
            .then(() => {
                console.log('Document successfully deleted.');
                this.props.watchItemData();
                this.props.watchItemExpiry();
            });
        this.setState({
            isModalVisible: false,
            modalItem: null
        })
    }

    render() {
        const { isLoading, modalColor } = this.state;
        if (isLoading) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 70
                }}>
                    <ActivityIndicator />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>

                    <Modal isVisible={this.state.isModalVisible}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <View style={{width: 250, height: 500, alignSelf: 'center', backgroundColor: modalColor, paddingVertical: 15,
                                borderRadius: 15, alignItems: 'center'}}>
                                <Image source={this.state.modalItem ? { uri: this.state.modalItem.image } : require("../assets/logo.png")} style={styles.modalAvatar} />
                                <Text style={{fontWeight: "bold", fontSize: 24, marginBottom: 10}}>{this.state.modalItem ? this.state.modalItem.name : "NIL"}</Text>
                                <Text style={{alignSelf: 'flex-start', marginLeft: "12%"}}><Text style={{fontWeight: "bold"}}>Location: </Text>{this.state.modalItem ? this.state.modalItem.location : "NIL"}</Text>
                                <Text style={{alignSelf: 'flex-start', marginLeft: "12%"}}><Text style={{fontWeight: "bold"}}>Quantity: </Text>{this.state.modalItem ? this.state.modalItem.quantity : "NIL"}</Text>
                                <Text style={{alignSelf: 'flex-start', marginLeft: "12%"}}><Text style={{fontWeight: "bold"}}>Owner: </Text>{this.state.modalItem ? this.state.modalItem.owner : "NIL"}</Text>
                                <Text style={{alignSelf: 'flex-start', marginLeft: "12%"}}><Text style={{fontWeight: "bold"}}>Expiry Date: </Text>{this.state.modalItem ? (this.state.modalItem.expiry == "None" ? "None" : this.state.modalItem.expiry.toDate().toString().substring(4,15) ): "NIL"}</Text>
                                <Text style={{alignSelf: 'flex-start', marginLeft: "12%"}}><Text style={{fontWeight: "bold"}}>Details: </Text>{this.state.modalItem ? this.state.modalItem.description : "NIL"}</Text>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#e5d84c',
                                        paddingVertical: 15,
                                        marginTop: 15,
                                        borderRadius: 15,
                                        width: 150
                                    }}
                                    onPress={() => {
                                        this.deleteItem();}
                                    }
                                >
                                    <Text style={{ textAlign: 'center',
                                        color: "rgba(0,0,0,0.73)",
                                        fontWeight: '700',
                                    }}>
                                        Delete
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#e5d84c',
                                        paddingVertical: 15,
                                        marginTop: 7,
                                        borderRadius: 15,
                                        width: 150
                                    }}
                                    onPress={() => {
                                        this.toggleModal();}
                                    }
                                >
                                    <Text style={{ textAlign: 'center',
                                        color: "rgba(0,0,0,0.73)",
                                        fontWeight: '700',
                                    }}>
                                        Close
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Expiry Chart</Text>
                    </View>

                    {this.props.expiryDisplay.length > 0 &&
                    <FlatList
                        style={styles.feed}
                        data={this.props.expiryDisplay}
                        renderItem={({ item }) => this.renderItem(item)}
                        keyExtractor={(item) => item.name}
                        ListHeaderComponent={this.renderHeader}
                    />}
                    {this.props.expiryDisplay.length === 0 && <Text style={{alignSelf: 'center', top: 170, color: "rgba(0,0,0,0.28)"}}>
                        There are currently no items expiring
                    </Text>}
                </View>
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpiringItemsContainer);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EFECF4",
    },
    header: {
        paddingTop: 30,
        paddingBottom: 12,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#d7d8ec",
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10,
    },
    headerTitle: {
        fontSize: 25,
        fontWeight: "600",
    },
    feed: {
        marginHorizontal: 16,
    },
    feedItem: {
        //backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginTop: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 18,
        marginRight: 14,
    },
    modalAvatar: {
        width: 170,
        height: 170,
        borderRadius: 18,
        marginVertical: "7%"
    },
    name: {
        fontSize: 17,
        fontWeight: "500",
        color: "#454D65",
    },
    locationStamp: {
        fontSize: 13,
        //color: "#C4C6CE",
        marginTop: 4,
    },
});
