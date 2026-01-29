import { supabase } from '../lib/supabase';
import { useSupabaseQuery } from './useSupabaseQuery';

// ==============================================================
// INSURANCE TYPES
// ==============================================================
export interface InsurancePlan {
    id: string;
    name: string;
    provider: string;
    plan_type: string; // 'Individual', 'Family', 'Senior', 'Critical Illness'
    sum_insured: number;
    premium_monthly: number;
    premium_yearly: number;
    coverage: {
        hospitalization?: boolean;
        daycare?: boolean;
        pre_hospitalization_days?: number;
        post_hospitalization_days?: number;
        ambulance_cover?: number;
        lump_sum_payout?: boolean;
        critical_illnesses_covered?: number;
        global_cover?: boolean;
    };
    features: string[];
    exclusions: string[];
    waiting_period_days: number;
    claim_settlement_ratio: number;
    network_hospitals: number;
    is_active: boolean;
}

// ==============================================================
// INSURANCE HOOKS
// ==============================================================

/**
 * Fetch all active insurance plans
 */
export function useInsurancePlans() {
    return useSupabaseQuery<InsurancePlan[]>(
        async () => {
            const { data, error } = await supabase
                .from('insurance_plans')
                .select('*')
                .eq('is_active', true)
                .order('sum_insured', { ascending: true });

            if (error) return { data: [], error };

            const plans: InsurancePlan[] = (data || []).map(p => ({
                ...p,
                sum_insured: parseFloat(p.sum_insured) || 0,
                premium_monthly: parseFloat(p.premium_monthly) || 0,
                premium_yearly: parseFloat(p.premium_yearly) || 0,
                claim_settlement_ratio: parseFloat(p.claim_settlement_ratio) || 0,
                coverage: p.coverage || {},
                features: p.features || [],
                exclusions: p.exclusions || [],
            }));

            return { data: plans, error: null };
        },
        []
    );
}

/**
 * Fetch insurance plans by type
 */
export function useInsurancePlansByType(planType: string) {
    return useSupabaseQuery<InsurancePlan[]>(
        async () => {
            const { data, error } = await supabase
                .from('insurance_plans')
                .select('*')
                .eq('is_active', true)
                .eq('plan_type', planType)
                .order('premium_yearly', { ascending: true });

            if (error) return { data: [], error };

            const plans: InsurancePlan[] = (data || []).map(p => ({
                ...p,
                sum_insured: parseFloat(p.sum_insured) || 0,
                premium_monthly: parseFloat(p.premium_monthly) || 0,
                premium_yearly: parseFloat(p.premium_yearly) || 0,
                claim_settlement_ratio: parseFloat(p.claim_settlement_ratio) || 0,
                coverage: p.coverage || {},
                features: p.features || [],
                exclusions: p.exclusions || [],
            }));

            return { data: plans, error: null };
        },
        [planType]
    );
}

/**
 * Fetch a single insurance plan by ID
 */
export function useInsurancePlan(id: string | undefined) {
    return useSupabaseQuery<InsurancePlan | null>(
        async () => {
            if (!id) return { data: null, error: null };

            const { data, error } = await supabase
                .from('insurance_plans')
                .select('*')
                .eq('id', id)
                .single();

            if (error) return { data: null, error };

            const plan: InsurancePlan = {
                ...data,
                sum_insured: parseFloat(data.sum_insured) || 0,
                premium_monthly: parseFloat(data.premium_monthly) || 0,
                premium_yearly: parseFloat(data.premium_yearly) || 0,
                claim_settlement_ratio: parseFloat(data.claim_settlement_ratio) || 0,
                coverage: data.coverage || {},
                features: data.features || [],
                exclusions: data.exclusions || [],
            };

            return { data: plan, error: null };
        },
        [id]
    );
}

/**
 * Get unique plan types for filtering
 */
export function useInsurancePlanTypes() {
    return useSupabaseQuery<string[]>(
        async () => {
            const { data, error } = await supabase
                .from('insurance_plans')
                .select('plan_type')
                .eq('is_active', true);

            if (error) return { data: [], error };

            const types = [...new Set((data || []).map(d => d.plan_type))];
            return { data: types, error: null };
        },
        []
    );
}
