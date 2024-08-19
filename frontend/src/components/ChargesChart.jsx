/* eslint-disable react/prop-types */
import { HiMiniPresentationChartLine } from 'react-icons/hi2';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import RecurringExpenses from './RecurringExpenses.js';

const monthNamesFrench = {
  January: 'Janvier',
  February: 'Février',
  March: 'Mars',
  April: 'Avril',
  May: 'Mai',
  June: 'Juin',
  July: 'Juillet',
  August: 'Août',
  September: 'Septembre',
  October: 'Octobre',
  November: 'Novembre',
  December: 'Décembre',
};

const chartConfig = {
  Revenus: {
    label: 'Revenus',
    color: 'green', // Changed from blue to green for Revenus
  },
  charges: {
    label: 'Dépenses',
    color: 'red', // Red for Charges
  },
};

const ChargesChart = ({ data, chargeData }) => {
  const totalRecurringExpenses = RecurringExpenses.reduce(
    (total, expense) => total + expense.value_money,
    0,
  );

  const aggregateByMonth = (dataArray, dateField, valueField) => {
    const aggregatedData = {};

    dataArray.forEach(item => {
      const month = new Date(item[dateField]).toLocaleString('default', {
        month: 'long',
      });
      const value = parseFloat(item[valueField]);

      if (!aggregatedData[month]) {
        aggregatedData[month] = 0;
      }
      aggregatedData[month] += value;
    });

    return Object.keys(aggregatedData).map(month => ({
      month: monthNamesFrench[month] || month,
      value: aggregatedData[month],
    }));
  };

  const revenusData = aggregateByMonth(data, 'date_visit', 'money');
  const chargesData = aggregateByMonth(
    chargeData,
    'creation_date',
    'value_money',
  );

  const mergedData = revenusData.map(revenue => ({
    month: revenue.month,
    revenusValue: revenue.value,
    chargesValue:
      (chargesData.find(charge => charge.month === revenue.month)?.value || 0) +
      totalRecurringExpenses,
  }));

  const chartData = mergedData.reverse().map(item => ({
    month: item.month,
    revenus: item.revenusValue,
    charges: item.chargesValue,
  }));

  const getComparisonText = current => {
    if (!current.charges) return 'Aucune comparaison disponible';

    const percentage = (
      ((current.revenus - current.charges) / current.charges) *
      100
    ).toFixed(2);

    if (percentage > 0) {
      return `Marge par rapport aux Dépenses: ${percentage}%`;
    } else if (percentage < 0) {
      return `Déficit par rapport aux Dépenses: ${Math.abs(percentage)}%`;
    } else {
      return 'Pas de changement';
    }
  };

  const currentMonthData = chartData[chartData.length - 1] || {};
  const comparisonText = getComparisonText(currentMonthData);

  return (
    <Card className="w-[41%] bg-white rounded-lg">
      <CardHeader>
        <CardTitle className="text-[1.2rem] w-max">
          Suivi des Dépenses et des Revenus
        </CardTitle>
        <CardDescription className="text-[1rem]">
          Affichage des Revenus et des dépenses totales pour <br /> les 6
          derniers mois
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="-ml-12" config={chartConfig}>
          <AreaChart
            data={chartData}
            margin={{ left: 0, right: 0, top: 12 }}
            stackOffset="expand"
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value => value.slice(0, 4)}
            />
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="revenus"
              type="monotone"
              fill={chartConfig.Revenus.color}
              fillOpacity={0.4}
              stroke={chartConfig.Revenus.color}
              stackId="a"
            />
            <Area
              dataKey="charges"
              type="monotone"
              fill={chartConfig.charges.color}
              fillOpacity={0.4}
              stroke={chartConfig.charges.color}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="relative bg-blue-100 rounded-b-lg py-2 px-6">
        <div className="flex flex-col justify-start items-start w-full h-full font-medium text-center space-y-4">
          <div className="flex flex-col items-start gap-3 text-lg font-semibold text-gray-800">
            <div className="text-xl">Durant ce mois :</div>
            <div className="flex items-center space-x-2">
              {comparisonText.includes('Marge') ? (
                <TrendingUp className="text-green-500 text-3xl animate-pulse" />
              ) : comparisonText.includes('Déficit') ? (
                <TrendingDown className="text-red-500 text-3xl animate-pulse" />
              ) : (
                <ArrowRight className="text-gray-500 text-3xl animate-pulse" />
              )}
              <div className="text-base font-bold">{comparisonText}</div>
            </div>
          </div>
          <div className="text-sm text-gray-700">
            <div className="flex justify-between">
              <span className="font-bold text-green-500">Revenus : </span>
              <span> {currentMonthData.revenus || 'N/A'} MAD</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="font-bold text-red-500">Dépenses : </span>
              <span> {currentMonthData.charges || 'N/A'} MAD</span>
            </div>
          </div>
        </div>
        <div className="absolute top-2 right-2 opacity-20">
          <HiMiniPresentationChartLine className="text-[8rem] text-gray-400" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChargesChart;
