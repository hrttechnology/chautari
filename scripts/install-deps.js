const { execSync } = require('child_process');

// Install main dependencies
const mainDeps = [
  // Firebase
  'firebase',
  '@react-native-firebase/app',
  '@react-native-firebase/auth',
  '@react-native-firebase/firestore',
  '@react-native-firebase/storage',
  '@react-native-firebase/messaging',
  
  // Navigation
  '@react-navigation/native',
  '@react-navigation/bottom-tabs',
  '@react-navigation/stack',
  'react-native-gesture-handler',
  'react-native-reanimated',
  'react-native-screens',
  'react-native-safe-area-context',
  
  // UI Components
  'react-native-vector-icons',
  'react-native-paper',
  'react-native-paper-dates',
  
  // Forms & Validation
  'react-hook-form',
  '@hookform/resolvers',
  'yup',
  'formik',
  
  // Media & Files
  'expo-image-picker',
  'expo-av',
  'react-native-video',
  
  // Location & Maps
  'expo-location',
  'react-native-maps',
  
  // Notifications
  'expo-notifications',
  
  // WebRTC
  'react-native-webrtc',
  
  // Utilities
  'date-fns',
  'uuid',
  'react-native-gifted-chat',
  'react-native-reanimated-carousel'
];

// Install dev dependencies
const devDeps = [
  '@types/react',
  '@types/react-native',
  '@types/uuid',
  '@types/react-native-vector-icons',
  'typescript',
  '@typescript-eslint/parser',
  '@typescript-eslint/eslint-plugin',
  'eslint',
  'eslint-config-universe',
  'prettier',
  '@babel/plugin-proposal-export-namespace-from',
  'react-native-dotenv'
];

console.log('Installing main dependencies...');
try {
  execSync(`npx expo install ${mainDeps.join(' ')} --y`, { stdio: 'inherit' });
  console.log('\n✅ Main dependencies installed successfully!');
} catch (error) {
  console.error('\n❌ Error installing main dependencies:', error.message);
  process.exit(1);
}

console.log('\nInstalling dev dependencies...');
try {
  execSync(`npm install -D ${devDeps.join(' ')}`, { stdio: 'inherit' });
  console.log('\n✅ Dev dependencies installed successfully!');
} catch (error) {
  console.error('\n❌ Error installing dev dependencies:', error.message);
  process.exit(1);
}

console.log('\n🎉 All dependencies installed successfully!');
console.log('\nNext steps:');
console.log('1. Create a Firebase project at https://console.firebase.google.com/');
console.log('2. Copy the Firebase config and add it to your .env file');
console.log('3. Run `npx expo start` to start the development server');
