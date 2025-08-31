const { execSync } = require('child_process');

const dependencies = [
  // Firebase
  'firebase',
  '@react-native-firebase/app',
  '@react-native-firebase/auth',
  '@react-native-firebase/firestore',
  '@react-native-firebase/storage',
  '@react-native-firebase/messaging',
  
  // State Management
  '@reduxjs/toolkit',
  'react-redux',
  'redux-persist',
  
  // UI & Forms
  'react-native-vector-icons',
  'react-hook-form',
  'yup',
  '@hookform/resolvers',
  
  // Media Handling
  'expo-av',
  'expo-image-picker',
  'react-native-video',
  
  // Maps & Location
  'expo-location',
  'react-native-maps',
  
  // Notifications
  'expo-notifications',
  
  // WebRTC
  'react-native-webrtc',
  
  // Utilities
  'date-fns',
  'uuid',
  'formik',
  'react-native-gifted-chat',
  'react-native-reanimated-carousel'
];

console.log('Installing dependencies...');
try {
  execSync(`npx expo install ${dependencies.join(' ')} --y`, { stdio: 'inherit' });
  console.log('\n✅ Dependencies installed successfully!');
} catch (error) {
  console.error('\n❌ Error installing dependencies:', error.message);
  process.exit(1);
}
