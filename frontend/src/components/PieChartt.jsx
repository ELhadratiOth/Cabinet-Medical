/* eslint-disable react/prop-types */
'use client';

import { useState, useEffect } from 'react';
import { Label, Pie, PieChart, Cell } from 'recharts';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { TbWaveSawTool } from 'react-icons/tb';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const monthNames = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

const processData = data => {
  const monthlyTotals = data.reduce((acc, entry) => {
    const [year, month] = entry.date_visit.split('-');
    const key = `${year}-${month}`;

    if (!acc[key]) {
      acc[key] = {
        month: monthNames[parseInt(month, 10) - 1],
        count: 0,
        totalMoney: 0,
      };
    }
    acc[key].count += 1; 
    acc[key].totalMoney += parseFloat(entry.money); 
    return acc;
  }, {});
  return Object.values(monthlyTotals);
};

const getColor = index => {
  const blueColors = [
    '#4682b4', // Bleu acier
    '#87ceeb', // Bleu ciel
    '#add8e6', // Bleu clair
    '#4169e1', // Bleu royal
  ];
  return blueColors[index % blueColors.length];
};

const getComparisonText = (currentMonth, previousMonth) => {
  if (!previousMonth) return 'Aucune comparaison';

  const difference = currentMonth.totalMoney - previousMonth.totalMoney;
  const percentage = ((difference / previousMonth.totalMoney) * 100).toFixed(2);

  if (difference > 0) {
    return `En hausse de ${percentage}%`;
  } else if (difference < 0) {
    return `En baisse de ${Math.abs(percentage)}%`;
  } else {
    return 'Aucun changement';
  }
};

export default function PieChartt({ data }) {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const processedData = processData(data);
    setApiData(processedData.slice(0, 4)); 
    setLoading(false);
  }, [data]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  const currentMonth = apiData[0];
  const previousMonth = apiData[1];
  const comparisonText = getComparisonText(currentMonth, previousMonth);

  return (
    <Card className="flex flex-col w-fit relative bg-blue-50">
      <div className="absolute opacity-10 w-full h-full stroke-current overflow-hidden ">
        <TbWaveSawTool className="absolute text-[17rem] -top-7 -right-[20%]" />
      </div>
      <CardHeader className="items-center pb-0">
        <CardTitle>
          Récapitulatif mensuel des revenus (En{' '}
          <span className="font-bold">DH</span>)
        </CardTitle>
        <CardDescription>
          Statistiques des visites médicales des quatre derniers mois
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{
            ...apiData.reduce((acc, { month }, index) => {
              acc[month] = {
                label: month,
                color: getColor(index),
              };
              return acc;
            }, {}),
          }}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={apiData}
              dataKey="totalMoney"
              nameKey="month"
              innerRadius={60}
              strokeWidth={5}
              labelLine={false}
            >
              {apiData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(index)} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {currentMonth.count.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-[0.7rem]"
                        >
                          Nombre de visites
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 37}
                          className="fill-muted-foreground text-[0.7rem]"
                        >
                          ce mois-ci
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <CardDescription className="flex items-center gap-2 text-lg">
          {comparisonText.includes('hausse') ? (
            <TrendingUp className="text-green-500" />
          ) : comparisonText.includes('baisse') ? (
            <TrendingDown className="text-red-500" />
          ) : (
            <ArrowRight className="text-gray-500" />
          )}
          {comparisonText}
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
