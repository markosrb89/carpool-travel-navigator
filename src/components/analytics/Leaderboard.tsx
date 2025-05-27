import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar?: string;
  score: number;
  rank: number;
  badge?: string;
}

interface LeaderboardProps {
  title: string;
  entries: LeaderboardEntry[];
  metric: string;
}

export function Leaderboard({ title, entries, metric }: LeaderboardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-500">#{entry.rank}</span>
                <Avatar>
                  <AvatarImage src={entry.avatar} />
                  <AvatarFallback>{entry.name[0]}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{entry.name}</span>
                {entry.badge && (
                  <Badge variant="secondary">{entry.badge}</Badge>
                )}
              </div>
              <span className="font-medium">
                {entry.score} {metric}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}