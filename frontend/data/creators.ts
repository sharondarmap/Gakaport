export interface Creator {
  id: string;
  name: string;
  description: string;
  image: string;
  badges: string[];
  bio?: string;
  followers?: number;
  works?: number;
  joinDate?: string;
  sleepBalance?: number;
  sleepReceived?: number;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    website?: string;
  };
}

export interface CreatorWork {
  id: string;
  title: string;
  cover: string;
  description: string;
  genres: string[];
  chapters?: number;
  views?: number;
  status?: string;
  isPremium?: boolean;
}

export interface User {
  id: string;
  name: string;
  sleepBalance: number;
  sleepReceived: number;
  isCreator: boolean;
  creatorProfile?: Creator;
}

// Mock current user
export const mockCurrentUser: User = {
  id: 'current-user',
  name: 'John Doe',
  sleepBalance: 1500,
  sleepReceived: 2400,
  isCreator: true,
  creatorProfile: {
    id: 'current-user',
    name: 'John Doe',
    description: 'Digital Artist & Storyteller',
    image: '/image.png',
    badges: ['Art', 'Comics'],
    bio: 'Creating digital art and stories. Your support helps me continue creating!',
    followers: 5600,
    works: 3,
    joinDate: '2023-01-15',
    sleepBalance: 2400,
    sleepReceived: 2400
  }
};

export const mockCreators: Creator[] = [
  {
    id: '1',
    name: 'Raka Wirayudha',
    description: 'Master Silat Sci-fi',
    image: '/image.png',
    badges: ['Action', 'Fantasy'],
    bio: 'Kreator komik yang berfokus pada cerita action dengan sentuhan budaya lokal. Sudah berkarya sejak 2020 dan terus menghadirkan karya-karya berkualitas.',
    followers: 12500,
    works: 8,
    joinDate: '2020-05-15',
    sleepBalance: 8900,
    sleepReceived: 8900,
    socialLinks: {
      instagram: 'https://instagram.com/rakawirayudha',
      twitter: 'https://twitter.com/rakawirayudha'
    }
  },
  {
    id: '2',
    name: 'Sena Putri',
    description: 'Ilustrator Emotif',
    image: '/image.png',
    badges: ['Drama', 'Romance'],
    bio: 'Ilustrator yang fokus pada cerita drama kehidupan dengan sentuhan emosional yang mendalam.',
    followers: 8900,
    works: 5,
    joinDate: '2021-03-20',
    sleepBalance: 6700,
    sleepReceived: 6700
  },
  {
    id: '3',
    name: 'Dimas Atma',
    description: 'Humoris yang lembut',
    image: '/image.png',
    badges: ['Comedy', 'Slice of life'],
    bio: 'Membuat komik komedi slice of life yang ringan dan menghibur untuk dibaca sehari-hari.',
    followers: 15200,
    works: 12,
    joinDate: '2019-11-10',
    sleepBalance: 12300,
    sleepReceived: 12300
  }
];

export interface SleepPackage {
  id: string;
  amount: number;
  label: string;
}

export const sleepPackages: SleepPackage[] = [
  { id: '1', amount: 1, label: 'zzz' },
  { id: '3', amount: 3, label: 'Light Rest' },
  { id: '5', amount: 5, label: 'Light Rest' },
  { id: '10', amount: 10, label: 'Full Night Sleep' },
  { id: '20', amount: 20, label: 'Dream Booster' },
  { id: '30', amount: 30, label: 'Rest Overload' }
];

export interface SleepTransaction {
  id: string;
  fromUserId: string;
  fromUserName: string;
  toCreatorId: string;
  toCreatorName: string;
  amount: number;
  timestamp: string;
  message?: string;
}

// Mock transaction history
export const mockTransactions: SleepTransaction[] = [
  {
    id: 't1',
    fromUserId: 'user-123',
    fromUserName: 'Alice Wonder',
    toCreatorId: '1',
    toCreatorName: 'Raka Wirayudha',
    amount: 10,
    timestamp: '2024-12-05T10:30:00Z',
    message: 'Love your work!'
  },
  {
    id: 't2',
    fromUserId: 'user-456',
    fromUserName: 'Bob Creator',
    toCreatorId: '1',
    toCreatorName: 'Raka Wirayudha',
    amount: 5,
    timestamp: '2024-12-05T14:20:00Z'
  }
];

// Mock karya untuk setiap kreator
export const mockWorks: Record<string, CreatorWork[]> = {
  '1': [
    {
      id: 'w1',
      title: 'Pendekar Cyber',
      cover: '/image.png',
      description: 'Petualangan seorang pendekar di dunia futuristik',
      genres: ['Action'],
      status: 'Ongoing',
      isPremium: false
    },
    {
      id: 'w2',
      title: 'Garuda Bangkit',
      cover: '/image.png',
      description: 'Kombinasi seni bela diri',
      genres: ['Fantasy'],
      status: 'Completed',
      isPremium: false
    },
    {
      id: 'w3',
      title: 'Last Dance',
      cover: '/image.png',
      description: 'Kisah romantis',
      genres: ['Sci-fi'],
      status: 'Ongoing',
      isPremium: false
    },
    {
      id: 'w4',
      title: 'Jurnal Android',
      cover: '/image.png',
      description: 'Catatan harian android',
      genres: ['Sci-fi'],
      status: 'Ongoing',
      isPremium: false
    },
    {
      id: 'w5',
      title: 'Screen',
      cover: '/image.png',
      description: 'Misteri',
      genres: ['Action'],
      status: 'Ongoing',
      isPremium: true
    },
    {
      id: 'w6',
      title: 'Pejuang',
      cover: '/image.png',
      description: 'Perjuangan',
      genres: ['Fantasy'],
      status: 'Completed',
      isPremium: true
    },
    {
      id: 'w7',
      title: 'Tak Masuk Logika',
      cover: '/image.png',
      description: 'Cerita aneh',
      genres: ['Fantasy'],
      status: 'Completed',
      isPremium: true
    },
    {
      id: 'w8',
      title: 'Garuda Bangkit',
      cover: '/image.png',
      description: 'Kebangkitan',
      genres: ['Fantasy'],
      status: 'Completed',
      isPremium: true
    },
    {
      id: 'w9',
      title: 'Garuda Bangkit 2',
      cover: '/image.png',
      description: 'Lanjutan',
      genres: ['Fantasy'],
      status: 'Completed',
      isPremium: true
    }
  ],
  '2': [
    {
      id: 'w10',
      title: 'Hujan di Bulan Juni',
      cover: '/image.png',
      description: 'Kisah cinta',
      genres: ['Drama', 'Romance'],
      status: 'Ongoing',
      isPremium: false
    }
  ],
  '3': [
    {
      id: 'w11',
      title: 'Kopi Pagi',
      cover: '/image.png',
      description: 'Cerita kedai kopi',
      genres: ['Comedy', 'Slice of life'],
      status: 'Ongoing',
      isPremium: false
    }
  ],
  // Current user's works
  'current-user': [
    {
      id: 'w12',
      title: 'My Journey',
      cover: '/image.png',
      description: 'Personal art journey',
      genres: ['Art'],
      status: 'Ongoing',
      isPremium: false
    }
  ]
};