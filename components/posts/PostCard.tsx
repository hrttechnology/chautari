import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Post } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types';

type PostCardProps = {
  post: Post;
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const { width } = useWindowDimensions();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const toggleLike = () => {
    setLiked(!liked);
    // TODO: Implement like functionality with API call
  };

  const navigateToComments = () => {
    navigation.navigate('PostDetail', { postId: post.id });
  };

  const navigateToProfile = () => {
    navigation.navigate('UserProfile', { userId: post.user.id });
  };

  const renderMedia = () => {
    if (!post.media || post.media.length === 0) return null;

    return (
      <View style={styles.mediaContainer}>
        {post.media.map((media, index) => (
          <React.Fragment key={index}>
            <View style={styles.mediaItem}>
            {media.type === 'image' ? (
              <Image
                source={{ uri: media.url }}
                style={[styles.media, { width: width - 40 }]}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.videoContainer, { width: width - 40 }]}>
                <MaterialIcons name="play-circle-outline" size={48} color="white" />
                <Text style={styles.videoText}>Video</Text>
              </View>
            )}
            </View>
          </React.Fragment>
        ))}
      </View>
    );
  };

  const truncatedContent = post.content.length > 150 && !showFullContent
    ? `${post.content.substring(0, 150)}...`
    : post.content;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateToProfile} style={styles.userInfo}>
          {post.user.photoURL ? (
            <Image source={{ uri: post.user.photoURL }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <MaterialIcons name="person" size={24} color="#666" />
            </View>
          )}
          <View>
            <Text style={styles.displayName}>{post.user.displayName}</Text>
            <Text style={styles.username}>@{post.user.username}</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.timestamp}>
          {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.postText}>
          {truncatedContent}
          {post.content.length > 150 && (
            <Text 
              onPress={() => setShowFullContent(!showFullContent)}
              style={styles.readMore}
            >
              {showFullContent ? ' Show less' : ' Read more'}
            </Text>
          )}
        </Text>
        {renderMedia()}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={toggleLike}>
          <MaterialIcons 
            name={liked ? 'favorite' : 'favorite-border'} 
            size={24} 
            color={liked ? '#ff3b30' : '#666'} 
          />
          <Text style={[styles.actionText, liked && styles.likedText]}>
            {post.likes.length}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={navigateToComments}>
          <MaterialIcons name="chat-bubble-outline" size={24} color="#666" />
          <Text style={styles.actionText}>{post.comments.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <MaterialCommunityIcons name="share-outline" size={24} color="#666" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  avatarPlaceholder: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayName: {
    fontWeight: '600',
    fontSize: 15,
  },
  username: {
    color: '#666',
    fontSize: 13,
  },
  timestamp: {
    color: '#999',
    fontSize: 12,
  },
  content: {
    marginBottom: 12,
  },
  postText: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 12,
  },
  readMore: {
    color: '#1a73e8',
    fontWeight: '500',
  },
  mediaContainer: {
    marginTop: 8,
  },
  mediaItem: {
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  media: {
    height: 250,
    borderRadius: 8,
  },
  videoContainer: {
    height: 250,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  videoText: {
    color: '#fff',
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    marginLeft: 4,
    color: '#666',
  },
  likedText: {
    color: '#ff3b30',
    fontWeight: '600',
  },
});

export default PostCard;
