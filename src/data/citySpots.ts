import { RunningSpot } from '../types/RunningSpot';

export const citySpots: Record<string, RunningSpot[]> = {
  Amsterdam: [
    {
      id: 1,
      name: 'Vondelpark Circuit',
      distance: '4.7 miles',
      difficulty: 'Easy',
      terrain: 'Paved paths',
      rating: 4.8,
      description: "Amsterdam's most popular park with beautiful tree-lined paths and peaceful ponds.",
      features: ['Flat terrain', 'Shade', 'Water fountains', 'Cafes nearby'],
      icon: 'trees',
      image: 'https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      name: 'Amstel River Route',
      distance: '8.2 miles',
      difficulty: 'Moderate',
      terrain: 'Mixed surfaces',
      rating: 4.6,
      description: 'Scenic riverside running with views of historic Amsterdam architecture.',
      features: ['River views', 'Historic buildings', 'Bridges', 'Photo opportunities'],
      icon: 'navigation',
      image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 3,
      name: 'Amsterdamse Bos Trail',
      distance: '12 miles',
      difficulty: 'Hard',
      terrain: 'Forest trails',
      rating: 4.7,
      description: 'Large forest park with varied terrain and challenging trail routes.',
      features: ['Forest trails', 'Hills', 'Wildlife', 'Multiple routes'],
      icon: 'mountain',
      image: 'https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ]
};

export const cities = Object.keys(citySpots);
