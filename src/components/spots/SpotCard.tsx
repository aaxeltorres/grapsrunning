import React from 'react';
import { Trees, Navigation, Mountain, Building } from 'lucide-react';
import { RunningSpot } from '../../types/RunningSpot';

interface Props {
  spot: RunningSpot;
  getDifficultyColor: (difficulty: string) => string;
}

const renderIcon = (type: string) => {
  switch (type) {
    case 'trees':
      return <Trees className="h-5 w-5" />;
    case 'navigation':
      return <Navigation className="h-5 w-5" />;
    case 'mountain':
      return <Mountain className="h-5 w-5" />;
    case 'building':
      return <Building className="h-5 w-5" />;
    default:
      return null;
  }
};

const SpotCard: React.FC<Props> = ({ spot, getDifficultyColor }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <img src={spot.image} alt={spot.name} className="w-full h-40 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-bold text-gray-900">{spot.name}</h3>
      <p className="text-sm text-gray-600">{spot.description}</p>
      <div className="flex items-center mt-2 text-sm">
        {renderIcon(spot.icon)}

        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getDifficultyColor(spot.difficulty)}`}>
          {spot.difficulty}
        </span>
      </div>
    </div>
  </div>
);

export default SpotCard;
