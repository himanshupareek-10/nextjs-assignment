import { notFound } from 'next/navigation';
import { CalculatorData, CalculatorPageProps } from '@/types/types';
import { API_ENDPOINTS } from '@/utils/api';
import CalculatorLayout from '@/components/CalculatorLayout';

async function fetchCalculators(): Promise<CalculatorData[]> {
  const res = await fetch(API_ENDPOINTS.getListCalculator, {
    cache: 'no-store',
  });
  const data = await res.json();
  return data.payload;
}

const CalculatorPage = async ({ params }: CalculatorPageProps) => {
  const { calculator } = params;
  const calculatorData = await fetchCalculators();

  const data = calculatorData.find(item => item.name === calculator);

  if (!data) {
    notFound();
  }

  return <CalculatorLayout title={data.title} description={data.subtitle} name={data.name} list= {calculatorData}/>;
};

export default CalculatorPage;
