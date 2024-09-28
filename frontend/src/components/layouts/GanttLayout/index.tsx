import { NavBar } from '@/components/modules/bars';
import { TopHeader } from '@/components/modules/headers';
import Head from 'next/head';
import { Chart } from 'react-google-charts';

const columns = [
  { type: 'string', label: 'Task ID' },
  { type: 'string', label: 'Task Name' },
  { type: 'string', label: 'Resource' },
  { type: 'date', label: 'Start Date' },
  { type: 'date', label: 'End Date' },
  { type: 'number', label: 'Duration' },
  { type: 'number', label: 'Percent Complete' },
  { type: 'string', label: 'Dependencies' },
];

const rows = [
  [
    'toTrain',
    'Walk to train stop',
    'walk',
    null,
    null,
    5 * 60 * 1000,
    100,
    null,
  ],
  ['music', 'Listen to music', 'music', null, null, 70 * 60 * 1000, 100, null],
  [
    'wait',
    'Wait for train',
    'wait',
    null,
    null,
    10 * 60 * 1000,
    100,
    'toTrain',
  ],
  ['train', 'Train ride', 'train', null, null, 45 * 60 * 1000, 75, 'wait'],
  ['toWork', 'Walk to work', 'walk', null, null, 10 * 60 * 1000, 0, 'train'],
  ['work', 'Sit down at desk', null, null, null, 2 * 60 * 1000, 0, 'toWork'],
];

export const data = [columns, ...rows];

export const options = {
  height: 300,
  gantt: {
    defaultStartDateMillis: new Date(2015, 3, 28),
  },
};

export const GanttLayout = () => {
  return (
    <>
      <Head>
        <title>Диаграмма Ганта</title>
      </Head>
      <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr]'>
        <NavBar />
        <div className='flex flex-col overflow-hidden'>
          <TopHeader />
          <main className='flex flex-1 flex-col gap-4 overflow-x-auto bg-muted p-4 lg:gap-6 lg:p-6'>
            <div>
              <Chart
                chartType='Gantt'
                width='100%'
                height='50%'
                data={data}
                options={options}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
