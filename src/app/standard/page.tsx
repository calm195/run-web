/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-26 21:58:18
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-27 17:55:41
 * @FilePath: src/app/standard/page.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
'use client';

import { Standard } from '@/api/model';
import StandardFilters from '@/components/StandardFilters';
import StandardList from '@/app/standard/components/StandardList';
import { useEffect, useState } from 'react';
import { listStandard } from '@/api/standard';
import Title from '@/components/Title';

export default function StandardsPage() {
  const [standards, setStandards] = useState<Standard[]>([]);
  const [filteredStandards, setFilteredStandards] = useState<Standard[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    level: null as number | null,
    gender: null as number | null,
    standardSystem: null as number | null,
    eventId: null as number | null,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await listStandard();
        setStandards(data.data);
        setFilteredStandards(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load().then();
  }, []);

  useEffect(() => {
    let result = standards;
    if (filters.level !== -1) {
      result = result.filter(s => s.level === filters.level);
    }
    if (filters.gender !== -1) {
      result = result.filter(s => s.gender === filters.gender);
    }
    if (filters.standardSystem !== -1) {
      result = result.filter(s => s.standard_system === filters.standardSystem);
    }
    if (filters.eventId !== -1) {
      result = result.filter(s => s.event_id === filters.eventId);
    }
    setFilteredStandards(result);
  }, [filters, standards]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Title text={'运动标准'} />

      <StandardFilters onFilterChange={setFilters} />

      {loading ? (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner"></span>
        </div>
      ) : (
        <StandardList standards={filteredStandards} />
      )}
    </div>
  );
}
