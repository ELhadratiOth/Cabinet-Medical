import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { CardHeader, CardTitle, Card } from '@/components/ui/card';

const transformData = data => {
  const countsByMonth = {};

  data.forEach(({ date_visit, type_visit }) => {
    const month = new Date(date_visit).toLocaleString('fr-FR', {
      month: 'long',
    });
    if (!countsByMonth[month]) {
      countsByMonth[month] = { month, string: 0, test: 0 };
    }
    if (type_visit === 'test') {
      countsByMonth[month].string += 1;
    } else if (type_visit === 'Non Saisi') {
      countsByMonth[month].test += 1;
    }
  });

  return Object.values(countsByMonth);
};

const chartConfig = {
  string: {
    label: 'String Type',
    color: '#2563eb',
  },
  test: {
    label: 'Test Type',
    color: '#60a5fa',
  },
};

// eslint-disable-next-line react/prop-types
export default function Component({ data }) {
  const chartData = transformData(data).slice(0, 9).reverse();

  return (
    <Card className="h-[420px] w-full">
      <CardHeader>
        <CardTitle>Les Types des visites des Patients</CardTitle>
      </CardHeader>
      <ChartContainer
        className="h-[350px] w-full p-2  "
        config={chartConfig}
      >
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={value => value.slice(0, 4)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="string" fill="var(--color-string)" radius={4} />
          <Bar dataKey="test" fill="var(--color-test)" radius={4} />
        </BarChart>
      </ChartContainer>
    </Card>
  );
}
