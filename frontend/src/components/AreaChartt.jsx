/* eslint-disable react/prop-types */
'use client';

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import { TbChartLine } from 'react-icons/tb';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const aggregateData = data => {
  const result = {};

  data.forEach(item => {
    const month = new Date(item.date_visit).toLocaleString('fr-FR', {
      month: 'long',
    });

    if (!result[month]) {
      result[month] = { month, CNSS: 0, None: 0, Assurance: 0 };
    }

    const insuranceType = item.insurance.trim().toLowerCase().replace(' ', '');

    if (insuranceType === 'cnss') {
      result[month].CNSS += item.type_visit === 'Nouvelle Visite' ? 1 : 0;
    } else if (insuranceType === 'assurance') {
      result[month].Assurance += item.type_visit === 'Nouvelle Visite' ? 1 : 0;
    } else {
      result[month].None += item.type_visit === 'Nouvelle Visite' ? 1 : 0;
    }
  });

  return Object.values(result);
};

const calculateTotals = chartData => {
  return chartData.reduce(
    (totals, current) => {
      totals.CNSS += current.CNSS || 0;
      totals.None += current.None || 0;
      totals.Assurance += current.Assurance || 0;
      return totals;
    },
    { CNSS: 0, None: 0, Assurance: 0 },
  );
};

const getLast12MonthsData = data => {
  const aggregatedData = aggregateData(data);

  const last12MonthsData = aggregatedData.slice(-12).reverse();

  return last12MonthsData;
};

const chartConfig = {
  CNSS: {
    label: 'CNSS',
    color: 'blue',
  },
  None: {
    label: 'Non assuré',
    color: 'green',
  },
  Assurance: {
    label: 'Assurance',
    color: 'red',
  },
};

export default function Component({ data }) {
  const chartData = getLast12MonthsData(data);
  const totals = calculateTotals(chartData);

  const year = new Date().getFullYear();

  return (
    <Card className="w-[53%]">
      <CardHeader>
        <CardTitle>Visites par Type d&apos;Assurance - Mensuel</CardTitle>
        <CardDescription>Données mensuelles pour {year}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{
              left: 24,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value => value.slice(0, 4)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="CNSS"
              type="monotone"
              stroke={chartConfig.CNSS.color}
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="None"
              type="monotone"
              stroke={chartConfig.None.color}
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="Assurance"
              type="monotone"
              stroke={chartConfig.Assurance.color}
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="px-3 p-2 relative">
        <div className="flex w-full items-start text-sm p-0">
          <div className="w-full">
            <div className="flex flex-col items-start justify-start font-medium px-8 pb-2 pt-1 bg-blue-100 rounded-lg shadow-md">
              <div className="text-base text-gray-800 font-semibold mb-2">
                Total des personnes assurées cette année:
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <p className="text-blue-500 text-xs">
                    CNSS : <span className="font-bold">{totals.CNSS}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <p className="text-green-500 text-xs">
                    Non assuré :{' '}
                    <span className="font-bold">{totals.None}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <p className="text-red-500 text-xs">
                    Assurance :{' '}
                    <span className="font-bold">{totals.Assurance}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute opacity-10 w-full h-full stroke-current overflow-hidden">
          <TbChartLine className="absolute text-[10rem] -top-5 right-[3%]" />
        </div>
      </CardFooter>
    </Card>
  );
}
