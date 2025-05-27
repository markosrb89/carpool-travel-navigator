import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ImpactMetric {
  label: string;
  value: number;
  target: number;
  unit: string;
  icon: string;
}

interface ImpactMetricsProps {
  metrics: ImpactMetric[];
}

export function ImpactMetrics({ metrics }: ImpactMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>{metric.icon}</span>
              <span>{metric.label}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-2xl font-bold">
                  {metric.value} {metric.unit}
                </span>
                <span className="text-gray-500">
                  Target: {metric.target} {metric.unit}
                </span>
              </div>
              <Progress
                value={(metric.value / metric.target) * 100}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}