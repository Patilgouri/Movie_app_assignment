/* eslint-disable no-catch-shadow */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import Button from '../Components/Button';
import { registerUser } from '../Redux/action/authActions'; // Import the action
import { connect } from 'react-redux';

const RegisterScreen = ({ navigation, loading, error, registerUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword || !phoneNumber) {
      Alert.alert('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    const userData = { username, email, password, phoneNumber };
    registerUser(userData);
    const encryptedUserData = JSON.stringify(userData);

    try {
      await Keychain.setInternetCredentials(
        'user',
        username,

        encryptedUserData,
      );
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('phoneNumber', phoneNumber);

      Alert.alert(
        'Registration Successful',
        'Your account has been registered successfully. You can now log in.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }],
      );
    } catch (error) {
      console.error('Error registering user:', error);
      Alert.alert(
        'Registration Failed',
        'An error occurred while registering your account. Please try again later.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
        keyboardType="phone-pad"
      />
      <Button style={styles.registeruser}
        title="Register" onPress={handleRegister} />
      <Text
        style={styles.loginLink}
        onPress={() => navigation.navigate('Login')}>
        Already have an account? <Text style={styles.linkText}> Login here</Text>
      </Text>
    </View>
  );
};
const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatchToProps = {
  registerUser,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#000',
  },
  input: {
    width: '100%',
    paddingVertical: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 18,
    backgroundColor: '#fff',
    fontSize: 18,
    paddingHorizontal: 20,
  },
  registeruser: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#5856d6',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    fontSize: 24,
  },
  loginLink: {
    marginTop: 25,
    color: '#000',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  linkText: {
    color: '#0099ff'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
