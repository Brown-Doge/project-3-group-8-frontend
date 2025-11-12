import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

export default function LoginPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in to get your tickets</Text>
      <Text style={styles.subheading}>
        Buy tickets to exciting events and see which games your friends are attending.
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <TouchableOpacity style={styles.button}>
          <Image
            source={{ uri: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg' }}
            style={styles.googleIcon}
            accessibilityLabel="Google Logo"
          />
          <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    marginTop: 10,
  },
  input: {
    height: 48,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    borderRadius: 6,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
