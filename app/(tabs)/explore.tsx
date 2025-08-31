import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';

import { db } from '@/firebase';
import { User, Post } from '@/types';
import { RootStackParamList } from '@/navigation/types';
import { useTheme } from 'react-native-paper';

const ExploreScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'MainTabs'>>();

  useEffect(() => {
    fetchTrendingContent();
    fetchSuggestedUsers();
  }, []);

  const fetchTrendingContent = async () => {
    try {
      const postsRef = collection(db, 'posts');
      const q = query(
        postsRef,
        where('privacy', '==', 'public'),
        orderBy('likes', 'desc'),
        limit(5)
      );
      
      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      
      setTrendingPosts(posts);
    } catch (error) {
      console.error('Error fetching trending content:', error);
    }
  };

  const fetchSuggestedUsers = async () => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, limit(10));
      const querySnapshot = await getDocs(q);
      
      const users = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];
      
      setSuggestedUsers(users);
    } catch (error) {
      console.error('Error fetching suggested users:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // In a real app, you would implement search logic here
    // and navigate to search results
    // @ts-ignore - Search screen navigation
    navigation.navigate('Search', { query: searchQuery });
    setIsSearching(false);
  };

  const navigateToProfile = (userId: string) => {
    navigation.navigate('UserProfile', { userId });
  };

  const navigateToPost = (postId: string) => {
    navigation.navigate('PostDetail', { postId });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: theme.colors.surface }]}>
        <MaterialIcons name="search" size={24} color={theme.colors.onSurfaceVariant} />
        <TextInput
          style={[styles.searchInput, { color: theme.colors.onSurface }]}
          placeholder="Search Chautari"
          placeholderTextColor={theme.colors.onSurfaceVariant}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={theme.colors.onSurfaceVariant} />
          </TouchableOpacity>
        )}
      </View>

      {/* Trending Now */}
      <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
        Trending Now
      </Text>
      <FlatList
        horizontal
        data={trendingPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.trendingItem}
            onPress={() => navigateToPost(item.id)}
          >
            {item.media && item.media[0]?.type === 'image' ? (
              <Image 
                source={{ uri: item.media[0].url }} 
                style={styles.trendingImage}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.trendingImage, { backgroundColor: '#f0f0f0' }]}>
                <MaterialIcons name="image" size={40} color="#999" />
              </View>
            )}
            <Text 
              style={styles.trendingText}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.content}
            </Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.trendingContainer}
      />

      {/* Suggested Users */}
      <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
        People You May Know
      </Text>
      <FlatList
        data={suggestedUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.userItem}
            onPress={() => navigateToProfile(item.id)}
          >
            {item.photoURL ? (
              <Image 
                source={{ uri: item.photoURL }} 
                style={styles.avatar}
              />
            ) : (
              <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
                <Text style={styles.avatarText}>
                  {item.displayName?.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: theme.colors.onSurface }]}>
                {item.displayName}
              </Text>
              <Text style={[styles.userUsername, { color: theme.colors.onSurfaceVariant }]}>
                @{item.username}
              </Text>
            </View>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.usersContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 25,
    height: 50,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  trendingContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  trendingItem: {
    width: 200,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  trendingImage: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendingText: {
    padding: 12,
    fontSize: 14,
    color: '#333',
  },
  usersContainer: {
    paddingHorizontal: 16,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  userUsername: {
    fontSize: 14,
    marginTop: 2,
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#1a73e8',
  },
  followButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ExploreScreen;
