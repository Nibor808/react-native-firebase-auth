import React, { Component } from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';

export default class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true })

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onCreateUserFail.bind(this));
      });
  }

  onLoginSuccess() {
    this.setState({
      error: '',
      email: '',
      password: '',
      loading: false
    });
  }

  onCreateUserFail() {
    this.setState({
      error: 'Authetication Failed',
      loading: false
    })
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size='small' />;
    }

    return <Button title='Log in' onPress={this.onButtonPress.bind(this)} />;
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder='example@example.com'
            value={this.state.email}
            label='Email'
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            placeholder='password'
            value={this.state.password}
            label='Password'
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorStyle}>{this.state.error}</Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}