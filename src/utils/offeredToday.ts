import { format, getDay } from 'date-fns';
import { ProductModel } from '../models/ProductModel';

const DAYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const;

type DayKey = typeof DAYS[number];

export function offeredToday(product: ProductModel): boolean {
  const day = getDay(new Date());
  const dayKey = DAYS[day] as DayKey;

  if (product[dayKey] !== 'S') return false;

  const todayDate = format(new Date(), 'MM/dd/yyyy');
  const now = Date.parse(`${todayDate} ${format(new Date(), 'HH:mm:ss')}`);
  const start = Date.parse(`${todayDate} ${product[`${dayKey}_start` as keyof ProductModel]}`);
  const stop = Date.parse(`${todayDate} ${product[`${dayKey}_stop` as keyof ProductModel]}`);

  return now >= start && now <= stop;
}
