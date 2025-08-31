import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '@/firebase';

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendCode = async () => {
    try {
      setLoading(true);
      const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        `+977${phoneNumber}`,
        appVerifier
      );

      setVerificationId(confirmationResult.verificationId);
      Alert.alert('Success', 'Verification code sent to your phone');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    try {
      setLoading(true);
      if (!verificationId) return;

      // In a real app, you would verify the code with Firebase
      // For now, we'll just navigate to the profile setup
      router.push('/auth/profile-setup');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Phone Verification' }} />
      
      <View style={styles.formContainer}>
        <Text style={styles.title}>Enter Your Phone Number</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.prefix}>+977</Text>
          <TextInput
            style={styles.input}
            placeholder="98XXXXXXXX"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            editable={!verificationId}
          />
        </View>

        {verificationId && (
          <TextInput
            style={[styles.input, styles.codeInput]}
            placeholder="Enter verification code"
            keyboardType="number-pad"
            value={code}
            onChangeText={setCode}
          />
        )}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={verificationId ? handleVerifyCode : handleSendCode}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Please Wait...' : verificationId ? 'Verify Code' : 'Send Code'}
          </Text>
        </TouchableOpacity>

        <View id="recaptcha-container" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  prefix: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    fontWeight: '500',
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});

export default PhoneAuth;
