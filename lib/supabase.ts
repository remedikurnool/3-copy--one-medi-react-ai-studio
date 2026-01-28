
import { MEDICINES, DOCTORS, LAB_TESTS } from '../constants';

/**
 * MOCK SUPABASE CLIENT
 * In a production app, this would use @supabase/supabase-js
 * For this prototype, we simulate async DB queries over our local constants with ranking logic.
 */

export const supabase = {
  from: (table: string) => ({
    select: () => ({
      ilike: (column: string, pattern: string) => ({
        // Simulation of a single table search with scoring
        getResults: async () => {
          const query = pattern.replace(/%/g, '').toLowerCase();
          await new Promise(r => setTimeout(r, 150)); // Network delay simulation

          if (table === 'products') {
            return MEDICINES.map(m => {
              let score = 0;
              const name = m.name.toLowerCase();
              const comp = m.composition.toLowerCase();
              const indications = m.indications.map(i => i.toLowerCase());

              // Prioritization logic
              if (name.startsWith(query)) score += 10;
              else if (name.includes(query)) score += 4;
              
              if (comp.includes(query)) score += 8;
              
              if (indications.some(i => i.includes(query))) score += 6;

              return { ...m, _score: score };
            })
            .filter(m => m._score > 0)
            .sort((a, b) => b._score - a._score);
          }

          if (table === 'doctors') {
            return DOCTORS.map(d => {
              let score = 0;
              const name = d.name.toLowerCase();
              const spec = d.specialty.toLowerCase();

              if (name.startsWith(query)) score += 10;
              else if (name.includes(query)) score += 5;
              
              if (spec.includes(query)) score += 7;

              return { ...d, _score: score };
            })
            .filter(d => d._score > 0)
            .sort((a, b) => b._score - a._score);
          }

          if (table === 'lab_tests') {
            return LAB_TESTS.map(l => {
              let score = 0;
              const name = l.name.toLowerCase();
              const cat = l.category.toLowerCase();

              if (name.startsWith(query)) score += 10;
              else if (name.includes(query)) score += 5;
              
              if (cat.includes(query)) score += 7;

              return { ...l, _score: score };
            })
            .filter(l => l._score > 0)
            .sort((a, b) => b._score - a._score);
          }

          return [];
        }
      })
    })
  })
};

export const globalSearch = async (query: string) => {
  if (!query || query.length < 2) return { medicines: [], doctors: [], labs: [] };

  // Simultaneous querying via Promise.all
  const [medicines, doctors, labs] = await Promise.all([
    supabase.from('products').select().ilike('name', `%${query}%`).getResults(),
    supabase.from('doctors').select().ilike('name', `%${query}%`).getResults(),
    supabase.from('lab_tests').select().ilike('name', `%${query}%`).getResults()
  ]);

  return { medicines, doctors, labs };
};
