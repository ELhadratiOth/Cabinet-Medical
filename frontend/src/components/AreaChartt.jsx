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
      result[month] = { month, aaaa: 0, bbbb: 0, cccc: 0 };
    }
    const insuranceType = item.insurance.toLowerCase();
    if (result[month][insuranceType] !== undefined) {
      result[month][insuranceType] += 1;
    }
  });

  return Object.values(result);
};

const calculateTotals = chartData => {
  return chartData.reduce(
    (totals, current) => {
      totals.aaaa += current.aaaa || 0;
      totals.bbbb += current.bbbb || 0;
      totals.cccc += current.cccc || 0;
      return totals;
    },
    { aaaa: 0, bbbb: 0, cccc: 0 },
  );
};

const getLast12MonthsData = data => {
  const aggregatedData = aggregateData(data);

  const last12MonthsData = aggregatedData.slice(-12).reverse();

  return last12MonthsData;
};

const chartConfig = {
  aaaa: {
    label: 'Assurance',
    color: 'red',
  },
  bbbb: {
    label: 'CNSS',
    color: 'blue',
  },
  cccc: {
    label: 'None',
    color: 'yellow',
  },
};

export default function Component({ data }) {
  const chartData = getLast12MonthsData(data);
  const totals = calculateTotals(chartData);

  const year = new Date().getFullYear();

  return (
    <Card className="w-[55%]">
      <CardHeader>
        <CardTitle>Visites par Type d&apos;Assurance - Mensuel</CardTitle>
        <CardDescription>Données mensuelles pour {year}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
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
              dataKey="aaaa"
              type="monotone"
              stroke={chartConfig.aaaa.color}
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="bbbb"
              type="monotone"
              stroke={chartConfig.bbbb.color}
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="cccc"
              type="monotone"
              stroke={chartConfig.cccc.color}
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="px-3 p-2 relative">
        <div className="flex w-full items-start text-sm p-0">
          <div className="w-full">
            <div className="flex flex-col items-start justify-start  font-medium px-8 pb-2 pt-1 bg-blue-100 rounded-lg shadow-md">
              <div className="text-base text-gray-800 font-semibold mb-2">
                Total des personnes assurées cette année:
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <p className="text-red-500 text-xs">
                    Assurance : <span className="font-bold">{totals.aaaa}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <p className="text-blue-500 text-xs">
                    CNSS : <span className="font-bold">{totals.bbbb}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <p className="text-yellow-500 text-xs">
                    None : <span className="font-bold">{totals.cccc}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute opacity-10 w-full h-full stroke-current overflow-hidden ">
          <TbChartLine className="absolute text-[10rem] -top-5 right-[3%]" />
        </div>
      </CardFooter>
    </Card>
  );
}
