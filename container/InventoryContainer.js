import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import firebaseDb from "../firebaseDb";
import Icon from "react-native-vector-icons/Ionicons";
import SearchBar from "react-native-dynamic-search-bar";
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import {watchItemData, updateInventoryDisplay, watchItemExpiry} from '../app-redux';

const firebase = require("firebase");
require("firebase/firestore");

const mapStateToProps = (state) => {
  return {
    items: state.items,
    inventoryDisplay: state.inventoryDisplay,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    watchItemData: () => dispatch(watchItemData()),
    watchItemExpiry: () => dispatch(watchItemExpiry()),
    updateInventoryDisplay: (data) => dispatch(updateInventoryDisplay(data))
  };
}

class InventoryContainer extends Component {
  state = {
    Username: "not done",
    isLoading: true,
    items: null,
    isModalVisible: false,
    modalItem: null
  };

  arrayHolder = [];

  componentDidMount() {
    this.props.watchItemData();
    firebaseDb
      .firestore()
      .collection("items")
      .where("owner", "==", firebaseDb.auth().currentUser.displayName)
      .get()
      .then((querySnapshot) => {
        const results = [];
        querySnapshot.docs.map((documentSnapshot) =>
          results.push(documentSnapshot.data())
        );
        this.setState({
          isLoading: false,
          items: results,
          Username: firebaseDb.auth().currentUser.displayName,
        });
        this.arrayHolder = results
        console.log("loaded " + this.state.Username);
      })
      .catch((err) => console.error(err));
  }

  renderOwnItem = (item) => {
    return (
      <View style={styles.feedItem}>
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
              <Text style={styles.locationStamp}>
                {" "}
                <Text>Location: </Text> {item.location}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.setState({modalItem: item});
                this.toggleModal();
              }
              }
            >
              <Icon name="ios-more" size={24} color="#73788B" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  searchFilterFunction = (text) => {
    this.arrayHolder = this.props.items;
    const newData = this.arrayHolder.filter(item => {
      const nameData = `${item.name.toUpperCase()}`;
      const locationData = `${item.location.toUpperCase()}`;
      const typeData = `${item.type.toUpperCase()}`;
      const textData = text.toUpperCase();

      return nameData.indexOf(textData) > -1 || locationData.indexOf(textData) > -1 || typeData.indexOf(textData) > -1;
    });
    this.props.updateInventoryDisplay(newData);
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

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  deleteItem = () => {
    firebaseDb.firestore()
        .collection("items")
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

  };

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <ActivityIndicator />;
    } else {
      return (
        <View style={styles.container}>

          <Modal isVisible={this.state.isModalVisible}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <View style={{width: 250, height: 470, alignSelf: 'center', backgroundColor: '#f3a0a0', paddingVertical: 15,
                borderRadius: 15, alignItems: 'center'}}>
                <Image source={this.state.modalItem ? { uri: this.state.modalItem.image } : require("../assets/logo.png")} style={styles.modalAvatar} />
                <Text style={{fontWeight: "bold", fontSize: 24, marginBottom: 10}}>{this.state.modalItem ? this.state.modalItem.name : "NIL"}</Text>
                <Text style={{alignSelf: 'flex-start', marginLeft: "12%"}}><Text style={{fontWeight: "bold"}}>Location: </Text>{this.state.modalItem ? this.state.modalItem.location : "NIL"}</Text>
                <Text style={{alignSelf: 'flex-start', marginLeft: "12%"}}><Text style={{fontWeight: "bold"}}>Quantity: </Text>{this.state.modalItem ? this.state.modalItem.quantity : "NIL"}</Text>
                <Text style={{alignSelf: 'flex-start', marginLeft: "12%"}}><Text style={{fontWeight: "bold"}}>Owner: </Text>{this.state.modalItem ? this.state.modalItem.owner : "NIL"}</Text>
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
                    color: '#6d6a6a',
                    fontWeight: '700',
                  }}>
                    Delete
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                      backgroundColor: '#e5d84c',
                      paddingVertical: 15,
                      marginTop: 10,
                      borderRadius: 15,
                      width: 150
                    }}
                    onPress={() => {
                      this.toggleModal();}
                    }
                >
                    <Text style={{ textAlign: 'center',
                      color: '#6d6a6a',
                      fontWeight: '700',
                    }}>
                      Close
                    </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View style={styles.header}>
            <Text style={styles.headerTitle}>Your Items</Text>
          </View>

          <FlatList
            style={styles.feed}
            data={this.props.inventoryDisplay}
            renderItem={({ item }) => this.renderOwnItem(item)}
            keyExtractor={(item) => item.name}
            ListHeaderComponent={this.renderHeader}
          />
        </View>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4",
  },
  header: {
    paddingTop: 30,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  modalAvatar: {
    width: 150,
    height: 150,
    borderRadius: 18,
    marginVertical: "10%"
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
  },
  locationStamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
});
