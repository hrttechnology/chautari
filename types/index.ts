export type User = {
  id: string;
  displayName: string;
  username: string;
  email?: string;
  photoURL?: string;
  bio?: string;
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
};

export type Post = {
  id: string;
  userId: string;
  user: Pick<User, 'id' | 'displayName' | 'username' | 'photoURL'>;
  content: string;
  media?: {
    url: string;
    type: 'image' | 'video';
  }[];
  likes: string[]; // array of user IDs who liked the post
  comments: Comment[];
  privacy: 'public' | 'friends' | 'only_me';
  createdAt: string;
  updatedAt: string;
};

export type Comment = {
  id: string;
  userId: string;
  user: Pick<User, 'id' | 'displayName' | 'username' | 'photoURL'>;
  content: string;
  createdAt: string;
};

export type FriendRequest = {
  id: string;
  from: string; // user ID
  to: string; // user ID
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
};

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'document' | 'audio';
  read: boolean;
  createdAt: string;
};

export type Conversation = {
  id: string;
  participants: string[]; // array of user IDs
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
};
