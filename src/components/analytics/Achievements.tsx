import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate?: string;
  progress?: number;
  total?: number;
}

interface AchievementsProps {
  achievements: Achievement[];
}

export function Achievements({ achievements }: AchievementsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements & Badges</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {achievements.map((achievement) => (
            <TooltipProvider key={achievement.id}>
              <Tooltip>
                <TooltipTrigger>
                  <div className={`p-4 rounded-lg text-center ${achievement.earnedDate ? 'bg-green-50' : 'bg-gray-50'}`}>
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <div className="font-medium text-sm">{achievement.name}</div>
                    {achievement.progress !== undefined && (
                      <div className="text-xs text-gray-500 mt-1">
                        {achievement.progress}/{achievement.total}
                      </div>
                    )}
                    {achievement.earnedDate && (
                      <Badge variant="secondary" className="mt-2">Earned</Badge>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{achievement.description}</p>
                  {achievement.earnedDate && (
                    <p className="text-xs text-gray-500 mt-1">
                      Earned on {achievement.earnedDate}
                    </p>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}