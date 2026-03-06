import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useSupabaseQuery<T>(
  tableName: string,
  options?: {
    filter?: { column: string; value: boolean | string | number };
    orderBy?: { column: string; ascending?: boolean };
  }
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      let query = supabase.from(tableName).select('*');

      if (options?.filter) {
        query = query.eq(options.filter.column, options.filter.value);
      }

      if (options?.orderBy) {
        query = query.order(options.orderBy.column, {
          ascending: options.orderBy.ascending ?? true,
        });
      }

      const { data: result, error: err } = await query;

      if (err) {
        setError(err.message);
      } else {
        setData(result as T[]);
      }
      setLoading(false);
    }

    fetchData();
  }, [tableName]);

  return { data, loading, error };
}
