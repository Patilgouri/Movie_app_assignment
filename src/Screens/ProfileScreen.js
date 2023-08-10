/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../Components/Button';

const ProfileScreen = ({ navigation }) => {
  const userData = useSelector(state => state.auth.userData);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    // Simulating fetching user data from an API or storage
    const fetchData = async () => {
      const email1 = await AsyncStorage.getItem('email');
      const mobileno = await AsyncStorage.getItem('phoneNumber');
      setEmail(email1);
      setPhoneNumber(mobileno);
    };

    fetchData();
  }, []);
  console.log(userData);
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: async () => await logoutUser() },
      ],
      { cancelable: true },
    );
  };

  const logoutUser = async () => {
    await AsyncStorage.removeItem('user');
    navigation.navigate('Login');
  };

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  const updateData = async () => {
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('phoneNumber', phoneNumber);
    Alert.alert(
      'User Update',
      'User Information Updated successfully.',
      [{ text: 'OK', onPress: () => navigation.navigate('App') }],
    );

  }
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.title}>Profile</Text>
          <Button title="Logout" onPress={handleLogout} style={styles.logout} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>{userData.username}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Mobile No.:</Text>
          <TextInput
            style={styles.input}
            placeholder="Mobile No"
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
            keyboardType="email-address"
          />
        </View>
        <Button style={styles.registeruser} onPress={updateData}
          title="Update" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  profileContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  infoContainer: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 20,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  value: {
    fontSize: 16,
    color: '#000',
    marginTop: 5,
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
    color: '#000',
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
  logout: {
    width: '56%',
    alignItems: 'center',
    backgroundColor: '#5856d6',
    color: 'white',
    padding: 15,
    marginLeft: 100,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 24,
  },
});

export default ProfileScreen;
