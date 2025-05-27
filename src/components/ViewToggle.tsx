
import React from 'react';
import { Button } from '@/components/ui/button';
import { ViewMode } from '@/types/ride';
import { Grid3X3, List, MapPin } from 'lucide-react';

interface ViewToggleProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const ViewToggle = ({ currentView, onViewChange }: ViewToggleProps) => {
  const views = [
    { mode: 'grid' as ViewMode, icon: Grid3X3, label: 'Grid' },
    { mode: 'list' as ViewMode, icon: List, label: 'List' },
    { mode: 'map' as ViewMode, icon: MapPin, label: 'Map' },
  ];

  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      {views.map(({ mode, icon: Icon, label }) => (
        <Button
          key={mode}
          variant={currentView === mode ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewChange(mode)}
          className="flex items-center space-x-1"
        >
          <Icon className="w-4 h-4" />
          <span className="hidden sm:inline">{label}</span>
        </Button>
      ))}
    </div>
  );
};

export default ViewToggle;
