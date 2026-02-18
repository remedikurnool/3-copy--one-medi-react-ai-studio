import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const TESTS = {
    CBC: { id: "911f7a24-06d9-4bc9-883b-3cd0a8fc66eb", name: "Complete Blood Count (CBC)", price: 300 },
    LIPID: { id: "68b9eb31-82e8-478a-8cd0-005606c94364", name: "Lipid Profile", price: 500 },
    THYROID: { id: "292556e4-31bf-401e-8eed-e28cb4e6c8e4", name: "Thyroid Profile (T3, T4, TSH)", price: 400 },
    HBA1C: { id: "6375d64e-a71e-4ade-8488-85c066c37cf5", name: "HbA1c", price: 400 },
    LFT: { id: "18815896-ef84-48f9-a4ca-d342c5fc6644", name: "Liver Function Test (LFT)", price: 600 },
    KFT: { id: "92b6a19a-aaf5-47f5-9f9e-40af6c9811b0", name: "Kidney Function Test (KFT)", price: 600 },
    VIT_D: { id: "808706a3-6d55-4a01-9e90-bd3e0688f95e", name: "Vitamin D", price: 1000 },
    VIT_B12: { id: "403a56ea-b427-4ed9-a60f-025ee620f4d7", name: "Vitamin B12", price: 800 },
};

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        );

        const { questionnaireData } = await req.json();

        // 1. Calculate Risk Scores (Placeholder Logic)
        // In a real app, this would use the `health_scoring_config` and questionnaire responses.
        const riskScores = {
            cardiac: Math.floor(Math.random() * 100),
            metabolic: Math.floor(Math.random() * 100),
            liver: Math.floor(Math.random() * 100),
            hormonal: Math.floor(Math.random() * 100),
        };

        let riskLevel = "LOW";
        const maxScore = Math.max(...Object.values(riskScores));
        if (maxScore > 70) riskLevel = "HIGH";
        else if (maxScore > 30) riskLevel = "MODERATE";

        // 2. Generate Packages based on Risk (Simplified for Demo)
        const essentials = [TESTS.CBC, TESTS.LIPID, TESTS.HBA1C, TESTS.THYROID];
        const advanced = [...essentials, TESTS.LFT, TESTS.KFT];
        const comprehensive = [...advanced, TESTS.VIT_D, TESTS.VIT_B12];

        const calculateTotal = (tests: any[]) => tests.reduce((acc, t) => acc + t.price, 0);

        const packages = [
            {
                tier: "Essential",
                name: "Essential Health Package",
                tests: essentials,
                price: calculateTotal(essentials),
                discount: 301, // 1600 - 1299
                final_price: 1299
            },
            {
                tier: "Advanced",
                name: "Advanced Health Package",
                tests: advanced,
                price: calculateTotal(advanced),
                discount: 801, // 2800 - 1999
                final_price: 1999
            },
            {
                tier: "Comprehensive",
                name: "Comprehensive Health Package",
                tests: comprehensive,
                price: calculateTotal(comprehensive),
                discount: 1601, // 4600 - 2999
                final_price: 2999
            }
        ];

        return new Response(
            JSON.stringify({
                risk_summary: riskScores,
                risk_level: riskLevel,
                packages: packages,
            }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            }
        );

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        });
    }
});
