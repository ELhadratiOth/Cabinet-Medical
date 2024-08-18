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
      countsByMonth[month] = { month, nouvelleVisite: 0, controle: 0 };
    }
    if (type_visit === 'Nouvelle Visite') {
      countsByMonth[month].nouvelleVisite += 1;
    } else if (type_visit === 'Contrôle') {
      countsByMonth[month].controle += 1;
    }
  });

  return Object.values(countsByMonth);
};

const chartConfig = {
  nouvelleVisite: {
    label: 'Nouvelle Visite',
    color: '#2563eb',
  },
  controle: {
    label: 'Contrôle',
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
      <ChartContainer className="h-[350px] w-full p-2" config={chartConfig}>
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
          <Bar
            dataKey="nouvelleVisite"
            fill={chartConfig.nouvelleVisite.color}
            radius={4}
          />
          <Bar
            dataKey="controle"
            fill={chartConfig.controle.color}
            radius={4}
          />
        </BarChart>
      </ChartContainer>
    </Card>
  );
}
