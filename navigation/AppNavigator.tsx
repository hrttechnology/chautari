import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import type { RootStackParamList, TabParamList, AuthStackParamList } from './types';

// Placeholder screens
const createScreen = (backgroundColor: string) => () => <View style={{ flex: 1, backgroundColor }} />;
const HomeScreen = createScreen('lightblue');
const ExploreScreen = createScreen('lightgreen');
const ReelsScreen = createScreen('lightpink');
const NotificationsScreen = createScreen('lightyellow');
const ProfileScreen = createScreen('lightgray');
const PhoneAuthScreen = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator /></View>;
const ProfileSetupScreen = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator /></View>;
const PostDetailScreen = createScreen('white');
const CreatePostScreen = createScreen('white');
const ChatScreen = createScreen('white');
const MessagesScreen = createScreen('white');
const SettingsScreen = createScreen('white');
const EditProfileScreen = createScreen('white');

// Create navigators
const RootStack = createNativeStackNavigator<RootStackParamList>();
const MainTab = createBottomTabNavigator<TabParamList>();
const AuthStackNav = createNativeStackNavigator<AuthStackParamList>();

const AuthStack: React.FC = () => (
  <AuthStackNav.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
    <AuthStackNav.Screen name="PhoneAuth" component={PhoneAuthScreen} />
    <AuthStackNav.Screen name="ProfileSetup" component={ProfileSetupScreen} />
  </AuthStackNav.Navigator>
);

const MainTabs: React.FC = () => (
  <MainTab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#1a73e8',
      tabBarInactiveTintColor: 'gray',
      tabBarShowLabel: false,
      headerShown: false,
    }}
  >
    <MainTab.Screen
      name="HomeTab"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
      }}
    />
    <MainTab.Screen
      name="ExploreTab"
      component={ExploreScreen}
      options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />,
      }}
    />
    <MainTab.Screen
      name="ReelsTab"
      component={ReelsScreen}
      options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="play-circle" size={size} color={color} />,
      }}
    />
    <MainTab.Screen
      name="NotificationsTab"
      component={NotificationsScreen}
      options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="notifications" size={size} color={color} />,
      }}
    />
    <MainTab.Screen
      name="ProfileTab"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
      }}
    />
  </MainTab.Navigator>
);

// Main app navigator
const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1a73e8" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <RootStack.Screen name="MainTabs" component={MainTabs} />
            <RootStack.Screen name="PostDetail" component={PostDetailScreen} options={{ headerShown: true, title: 'Post Details' }} />
            <RootStack.Screen name="CreatePost" component={CreatePostScreen} options={{ headerShown: true, title: 'Create Post' }} />
            <RootStack.Screen name="Chat" component={ChatScreen} options={{ headerShown: true, title: 'Chat' }} />
            <RootStack.Screen name="Messages" component={MessagesScreen} options={{ headerShown: true, title: 'Messages' }} />
            <RootStack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: true, title: 'Settings' }} />
            <RootStack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: true, title: 'Edit Profile' }} />
          </>
        ) : (
          <RootStack.Screen name="Auth" component={AuthStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default AppNavigator;
