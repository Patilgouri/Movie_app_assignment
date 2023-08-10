import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Keychain from 'react-native-keychain';

import { authenticateUser } from '../Redux/action/authActions';
import Button from '../Components/Button';
import { LogBox } from 'react-native';

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();
const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (username && password) {
      try {
        const storedCredentials = await Keychain.getInternetCredentials('user');
        if (storedCredentials) {
          const decryptedUserData = JSON.parse(storedCredentials.password);
          const { username: storedUsername, password: storedPassword } =
            decryptedUserData;

          if (username === storedUsername && password === storedPassword) {
            dispatch(authenticateUser({ username }));

            Alert.alert(
              'Login Successful',
              'You have successfully logged in!',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    navigation.navigate('App');
                  },
                },
              ],
            );
          } else {
            console.log('Invalid credentials');
          }
        } else {
          console.log('No stored credentials found');
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      Alert.alert('Invalid Input', 'Please enter valid credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/movie.jpg')}
        style={{ height: 120, width: 130, bottom: 100, borderRadius: 50 }}
      />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin}
        style={styles.loginbutton}
      />
      <Text
        style={styles.registerLink}
        onPress={() => navigation.navigate('Register')}>
        Don't have an account? <Text style={styles.linkText}> Register here</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#000000',
  },
  input: {
    width: '100%',
    paddingVertical: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 18,
    paddingHorizontal: 20,
  },
  loginbutton: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#5856d6',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    fontSize: 24,
  },
  registerLink: {
    marginTop: 25,
    color: '#000',
  },
  inputError: {
    borderColor: 'red',
  },
  validationError: {
    color: 'red',
    marginBottom: 10,
  },
  linkText: {
    color: '#0099ff'
  }
});

export default LoginScreen;
