import type { Creator, CreatorWork } from '../data/creators';
import { mockCreators, mockWorks } from '../data/creators';

const USE_MOCK_DATA = false;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

//Featured creators for homepage
export async function getFeaturedCreators(): Promise<Creator[]> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCreators;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/creators/featured`);
    if (!response.ok) throw new Error('Failed to fetch creators');
    return await response.json();
  } catch (error) {
    console.error('Error fetching creators:', error);
    return [];
  }
}

// Get single creator by ID
export async function getCreatorById(id: string): Promise<any> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCreators.find(c => c.id === id) || null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/creators/${id}`);
    if (!response.ok) throw new Error('Failed to fetch creator');
    const data = await response.json();

    if (data && data.creator) {
      const creator = data.creator;
      if (data.exclusive) {
        (creator as any).exclusive = data.exclusive;
      }
      return creator;
    }

    return data;
  } catch (error) {
    console.error('Error fetching creator:', error);
    return null;
  }
}

// Get karya kreator
export async function getCreatorWorks(creatorId: string): Promise<CreatorWork[]> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockWorks[creatorId] || [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/creators/${creatorId}/works`);
    if (!response.ok) throw new Error('Failed to fetch works');
    return await response.json();
  } catch (error) {
    console.error('Error fetching works:', error);
    return [];
  }
}

// Search creators
export async function searchCreators(query: string): Promise<Creator[]> {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCreators.filter(c => 
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  try {
    const response = await fetch(`${API_BASE_URL}/creators/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search creators');
    return await response.json();
  } catch (error) {
    console.error('Error searching creators:', error);
    return [];
  }
}