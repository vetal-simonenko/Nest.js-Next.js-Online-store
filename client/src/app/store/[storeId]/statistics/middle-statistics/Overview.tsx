import { IMonthlySales } from '@/shared/types/statistics.interface';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import styles from './MiddleStatistics.module.scss';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { formatPrice } from '@/lib/string/formatPrice';

const chartConfig: ChartConfig = {
	value: {
		label: 'Revenue',
		color: '#3B82F6'
	}
} satisfies ChartConfig;

interface OverviewProps {
	data: IMonthlySales[];
}

export const Overview = ({ data }: OverviewProps) => {
	return (
		<Card>
			<CardHeader className={styles.header}>
				<CardTitle>Revenue:</CardTitle>
			</CardHeader>
			<CardContent>
				<ChartContainer
					className='aspect-auto h-[310px] w-full'
					config={chartConfig}
				>
					<AreaChart
						accessibilityLayer
						data={data}
						margin={{
							left: 12,
							right: 12
						}}
					>
						<CartesianGrid vertical={false} />

						<XAxis
							dataKey='date'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
						/>

						<ChartTooltip
							content={
								<ChartTooltipContent
									labelFormatter={(label) => String(label)}
									formatter={(value) => {
										const numberValue = Number(value);

										return Number.isFinite(numberValue)
											? formatPrice(numberValue)
											: String(value);
									}}
									indicator='line'
								/>
							}
						/>
						<Area
							dataKey='value'
							type='natural'
							fill='var(--color-value)'
							stroke='var(--color-value)'
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};
