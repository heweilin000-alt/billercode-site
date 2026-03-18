import { supabase } from "./supabase";

export async function fetchAllRows<T = Record<string, unknown>>(
  table: string,
  columns: string
): Promise<T[]> {
  const rows: T[] = [];
  const batchSize = 1000;
  let offset = 0;

  while (true) {
    const { data, error } = await supabase
      .from(table)
      .select(columns)
      .range(offset, offset + batchSize - 1);

    if (error) throw error;
    if (!data || data.length === 0) break;

    rows.push(...(data as T[]));
    if (data.length < batchSize) break;
    offset += batchSize;
  }

  return rows;
}
