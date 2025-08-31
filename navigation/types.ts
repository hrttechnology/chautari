import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  PhoneAuth: undefined;
  ProfileSetup: { phoneNumber: string; verificationId?: string };
};

export type MainTabsParamList = {
  HomeTab: undefined;
  ExploreTab: undefined;
  ReelsTab: undefined;
  NotificationsTab: undefined;
  ProfileTab: { userId?: string };
};

export type RootStackParamList = {
  // Auth Stack
  Auth: NavigatorScreenParams<AuthStackParamList>;
  
  // Main Tabs
  MainTabs: NavigatorScreenParams<MainTabsParamList>;
  
  // Post Screens
  PostDetail: { postId: string };
  CreatePost: undefined;
  
  // Chat & Messages
  Messages: undefined;
  Chat: { conversationId: string; recipientId?: string };
  
  // Settings & Profile
  Settings: undefined;
  EditProfile: undefined;
  UserProfile: { userId: string };
  
  // Modals
  ImageViewer: { images: Array<{ url: string }>; initialIndex?: number };
  
  // Search
  Search: { query: string };
  
  // Fallback
  NotFound: undefined;
};

export type TabParamList = MainTabsParamList;
