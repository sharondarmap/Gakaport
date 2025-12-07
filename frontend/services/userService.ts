import { mockCurrentUser, mockCreators, mockTransactions } from '../data/creators';
import type { User, SleepTransaction } from '../data/creators';

const USE_MOCK_DATA = false;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export async function getCurrentUser(): Promise<User | null> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { ...mockCurrentUser };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/user/me`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function sendSleep(
  fromUserId: string,
  toCreatorId: string,
  amount: number,
  message?: string
): Promise<{ success: boolean; newBalance?: number; error?: string }> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Validate balance
    if (mockCurrentUser.sleepBalance < amount) {
      return { success: false, error: 'Insufficient balance' };
    }

    // Update balances
    mockCurrentUser.sleepBalance -= amount;
    
    // Update creator's received balance
    const creator = mockCreators.find(c => c.id === toCreatorId);
    if (creator && creator.sleepBalance !== undefined) {
      creator.sleepBalance += amount;
      creator.sleepReceived = (creator.sleepReceived || 0) + amount;
    }

    // Add transaction
    const transaction: SleepTransaction = {
      id: `t${Date.now()}`,
      fromUserId,
      fromUserName: mockCurrentUser.name,
      toCreatorId,
      toCreatorName: creator?.name || 'Unknown',
      amount,
      timestamp: new Date().toISOString(),
      message
    };
    mockTransactions.unshift(transaction);

    return { success: true, newBalance: mockCurrentUser.sleepBalance };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/sleep/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fromUserId, toCreatorId, amount, message })
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      return { success: false, error: error.message || 'Server error' };
    }
    
    const data = await response.json();
    return { success: true, newBalance: data.newBalance };
  } catch (error) {
    console.error('Error sending sleep:', error);
    return { success: false, error: 'Network error' };
  }
}

export async function getSleepTransactions(userId: string): Promise<SleepTransaction[]> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockTransactions.filter(
      t => t.fromUserId === userId || t.toCreatorId === userId
    );
  }

  try {
    const response = await fetch(`${API_BASE_URL}/sleep/transactions/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch transactions');
    return await response.json();
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
}

export async function withdrawSleep(userId: string, amount: number): Promise<boolean> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (mockCurrentUser.isCreator && mockCurrentUser.creatorProfile) {
      const creatorBalance = mockCurrentUser.creatorProfile.sleepBalance || 0;
      if (creatorBalance >= amount) {
        mockCurrentUser.sleepBalance += amount;
        if (mockCurrentUser.creatorProfile.sleepBalance !== undefined) {
          mockCurrentUser.creatorProfile.sleepBalance -= amount;
        }
        return true;
      }
    }
    return false;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/sleep/withdraw`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, amount })
    });
    return response.ok;
  } catch (error) {
    console.error('Error withdrawing sleep:', error);
    return false;
  }
}