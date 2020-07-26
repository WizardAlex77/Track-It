import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import firebaseDb from "../firebaseDb";
import Icon from "react-native-vector-icons/Ionicons";
import SearchBar from "react-native-dynamic-search-bar";
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import {watchItemData, updateHomeDisplay} from '../app-redux';

const firebase = require("firebase");
require("firebase/firestore");

const mapStateToProps = (state) => {
  return {
    items: state.items,
    homeDisplay: state.homeDisplay,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    watchItemData: () => dispatch(watchItemData()),
    updateHomeDisplay: (data) => dispatch(updateHomeDisplay(data))
  };
}

class Home extends Component {
  state = {
    Username: "not done",
    isLoading: true,
    items: [],
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
    this.props.watchItemData();
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
      console.log("loaded " + this.state.Username + " with pURL of " + firebaseDb.auth().currentUser.photoURL + " (Home)");
    }).catch((err) => console.error(err));
  }

  searchFilterFunction = (text) => {
    this.arrayHolder = this.props.items;
    const newData = this.arrayHolder.filter(item => {
      const nameData = `${item.name.toUpperCase()}`;
      const locationData = `${item.location.toUpperCase()}`;
      const typeData = `${item.type.toUpperCase()}`;
      const textData = text.toUpperCase();

      return nameData.indexOf(textData) > -1 || locationData.indexOf(textData) > -1 || typeData.indexOf(textData) > -1;
    });
    this.props.updateHomeDisplay(newData);
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
                {""}
                <Text>Location: </Text>{item.location}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.setState({ modalItem: item});
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

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
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
              <View style={{width: 250, height: 430, alignSelf: 'center', backgroundColor: "#b3d7ea", paddingVertical: 15,
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
            <Text style={styles.headerTitle}>All Items</Text>
          </View>
          {this.props.homeDisplay.length > 0 && <FlatList
              style={styles.feed}
              data={this.props.homeDisplay}
              renderItem={({ item }) => this.renderItem(item)}
              keyExtractor={(item) => item.name}
              ListHeaderComponent={this.renderHeader}
          />}
          {this.props.homeDisplay.length === 0 && <Text style={{alignSelf: 'center', top: 170, color: "rgba(0,0,0,0.28)"}}>
            There are currently no items
          </Text>}


        </View>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

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
    backgroundColor: "#FFF",
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
    color: "#C4C6CE",
    marginTop: 4,
  },
});
