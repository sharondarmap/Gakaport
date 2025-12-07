const db = {
    // Users for other backend endpoints (kept for backward compatibility)
    users: [
        { id: 'user_001', name: 'Miu Natsha', role: 'creator', balance: 0 },
        { id: 'user_999', name: 'Ruby Jane', role: 'fan', balance: 100000 }
    ],

    // Creators: lightweight objects similar to frontend mockCreators
    creators: [
      {
        id: '1',
        name: 'Seulgi Kang',
        description: 'Abstract and Surreal',
        image: '/image.png',
        badges: ['Action', 'Fantasy'],
        bio: 'Kreator komik yang berfokus pada cerita action dengan sentuhan budaya lokal. Sudah berkarya sejak 2020 dan terus menghadirkan karya-karya berkualitas.',
        followers: 12500,
        works: 8,
        joinDate: '2020-05-15',
        sleepBalance: 8900,
        sleepReceived: 8900,
        exclusiveUnlockPrice: 15,
        socialLinks: {
          instagram: 'https://instagram.com/hi_sseulgi',
          twitter: ''
        }
      },
      {
        id: '2',
        name: 'Song Mino',
        description: 'Ilustrator',
        image: '/image2.png',
        badges: ['Dramatic'],
        bio: 'Ilustrator yang fokus pada cerita drama kehidupan dengan sentuhan emosional yang mendalam.',
        followers: 8900,
        works: 5,
        joinDate: '2021-03-20',
        sleepBalance: 6700,
        sleepReceived: 6700,
        exclusiveUnlockPrice: 10
      },
      {
        id: '3',
        name: 'Park Ahn Nies',
        description: 'Humoris yang lembut',
        image: '/aniesbaswedan.png',
        badges: ['Slice of life'],
        bio: 'Membuat komik komedi slice of life yang ringan dan menghibur untuk dibaca sehari-hari.',
        followers: 15200,
        works: 12,
        joinDate: '2019-11-10',
        sleepBalance: 12300,
        sleepReceived: 12300,
        exclusiveUnlockPrice: 20
      },
      // current-user as creator
      {
        id: 'current-user',
        name: 'Hyunjin',
        description: 'Digital Artist & Storyteller',
        image: '/image1.png',
        badges: ['Art', 'Comics'],
        bio: 'Creating digital art and stories. Your support helps me continue creating!',
        followers: 5600,
        works: 3,
        joinDate: '2023-01-15',
        sleepBalance: 2400,
        sleepReceived: 2400,
        exclusiveUnlockPrice: 10
      }
    ],

    // Works: a flat array (also helpful for previous /works endpoints)
    works: [
      // We'll store simpler objects and include creator_id where appropriate
      { id: 'w1', creator_id: '1', title: 'Pallete', cover: '/pallette.png', description: 'Seorang gadis yang disukai dua lelaki tampan', genres: ['Romance'], status: 'Completed', isPremium: false },
      { id: 'w2', creator_id: '1', title: 'Operation True Love', cover: '/operationtruelove.png', description: 'Eunhyuk bantu Sooae buat putus sama mantannya eh malah kabur 10 tahun', genres: ['Romane'], status: 'Ongoing', isPremium: false },
      { id: 'w3', creator_id: '1', title: 'Mona Lisa', cover: '/monalisa.jpeg', description: 'Kisah romantis', genres: ['Sci-fi'], status: 'On-Progress', isPremium: false },
      { id: 'w4', creator_id: '1', title: 'The scream', cover: '/thescream.jpg', description: 'Lukisan orang teriak', genres: ['Sci-fi'], status: 'On-Progress', isPremium: false },
      { id: 'w5', creator_id: '1', title: 'Viral Hit', cover: '/viralhit.png', description: 'Misterius', genres: ['Action'], status: 'Ongoing', isPremium: true },
      { id: 'w6', creator_id: '1', title: 'Study Group', cover: '/studygroup.png', description: 'Perjuangan', genres: ['Action'], status: 'Ongoing', isPremium: true },
      { id: 'w7', creator_id: '1', title: 'Dive', cover: '/dice.png', description: 'Cerita aneh', genres: ['Fantasy'], status: 'Completed', isPremium: true },
      { id: 'w8', creator_id: '1', title: 'Spirit Fingers', cover: '/spiritfingers.jpg', description: 'Kebangkitan', genres: ['Fantasy'], status: 'Completed', isPremium: true },
      { id: 'w9', creator_id: '1', title: 'Seasons of blossom', cover: '/sob.png', description: 'Lanjutan', genres: ['Fantasy'], status: 'Completed', isPremium: true },

      { id: 'w10', creator_id: '2', title: 'Hujan di Bulan Juni', cover: '/image2.png', description: 'Kisah cinta', genres: ['Drama','Romance'], status: 'Ongoing', isPremium: false },
      { id: 'w11', creator_id: '3', title: 'Kopi Pagi', cover: '/viralhit.png', description: 'Cerita kedai kopi', genres: ['Comedy','Slice of life'], status: 'Ongoing', isPremium: false },
      { id: 'w12', creator_id: 'current-user', title: 'My Journey', cover: '/thescream.png', description: 'Personal art journey', genres: ['Art'], status: 'Ongoing', isPremium: false }
    ],

    // Sleep / donation transactions
    transactions: [
      {
        id: 't1',
        fromUserId: 'user-123',
        fromUserName: 'Alice Wonder',
        toCreatorId: '2',
        toCreatorName: 'Song Mino',
        amount: 10,
        timestamp: '2024-12-05T10:30:00Z',
        message: 'Love your work!'
      },
      {
        id: 't2',
        fromUserId: 'user-456',
        fromUserName: 'Bob Creator',
        toCreatorId: '2',
        toCreatorName: 'Song Mino',
        amount: 5,
        timestamp: '2024-12-05T14:20:00Z'
      }
    ],

    // Minimal current user representation (used by /user/me)
    currentUser: {
      id: 'current-user',
      name: 'Hyunjin',
      sleepBalance: 1500,
      sleepReceived: 2400,
      isCreator: true,
      creatorProfile: {
        id: 'current-user',
        name: 'Hyunjin',
        description: 'Digital Artist & Storyteller',
        image: '/image1.png',
        badges: ['Art', 'Comics'],
        bio: 'Creating digital art and stories. Your support helps me continue creating!',
        followers: 5600,
        works: 3,
        joinDate: '2023-01-15',
        sleepBalance: 2400,
        sleepReceived: 2400,
        exclusiveUnlockPrice: 10
      }
    },

    tiers: []
};

module.exports = db;