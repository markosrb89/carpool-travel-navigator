
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FloatingAddButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate('/add-ride')}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 z-50"
      size="icon"
    >
      <Plus className="w-6 h-6" />
    </Button>
  );
};

export default FloatingAddButton;
