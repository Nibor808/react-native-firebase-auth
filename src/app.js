import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { firebaseConfig } from '../config/config.json'
import { Header, Button, Spinner } from './components/common'
import LoginForm from './components/login_form';

export default class App extends Component {

  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      }else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch(this.state.loggedIn) {
      case true:
        return <Button title='Log out' onPress={() => firebase.auth().signOut()} />;
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={{ marginTop: 40 }}>
            <Spinner />
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText='Authentication' />
        {this.renderContent()}
      </View>
    );
  }
}