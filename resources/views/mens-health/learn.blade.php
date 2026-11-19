<x-layouts.patient>
    <x-slot:title>Men's Health Guide - HealthBridge</x-slot:title>

    <div class="space-y-6 max-w-4xl mx-auto">
        <div>
            <a href="{{ route('mens-health.index') }}" class="text-xs font-semibold text-sky-600 hover:underline">&larr; Back to Men's Health</a>
            <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight mt-1">Preventative Health & Screening Guidelines</h1>
            <p class="text-sm text-gray-500">Evidence-based guidelines for routine self-checks, prostate health, and cardiovascular wellness.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Testicular Self-Exam Guide -->
            <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div class="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm mb-4">
                    1
                </div>
                <h3 class="text-lg font-bold text-gray-900">How to Perform a Testicular Self-Exam (TSE)</h3>
                <p class="text-xs text-gray-600 mt-2 leading-relaxed">
                    Testicular cancer is the most common cancer in men aged 15–35, but it is over 95% curable when detected early.
                </p>
                <ul class="mt-4 space-y-2 text-xs text-gray-700 list-disc list-inside">
                    <li>Perform after a warm shower or bath when the scrotal skin is relaxed.</li>
                    <li>Support each testicle individually with both hands between fingers and thumb.</li>
                    <li>Gently roll the testicle horizontally to feel for small pea-sized lumps, hard areas, or unusual swelling.</li>
                    <li>Note that the epididymis (a soft tube at the back) is normal anatomy.</li>
                </ul>
            </div>

            <!-- Prostate Health Guidelines -->
            <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm mb-4">
                    2
                </div>
                <h3 class="text-lg font-bold text-gray-900">Prostate Health & PSA Screenings</h3>
                <p class="text-xs text-gray-600 mt-2 leading-relaxed">
                    Prostate issues typically become more prevalent past age 45. Discussion with your physician regarding PSA (prostate-specific antigen) blood tests is recommended based on age and family history.
                </p>
                <div class="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                    <strong>When to consult a doctor:</strong> Difficulty starting urination, weak flow, frequent nighttime urination, blood in urine or semen, or persistent lower back or pelvic discomfort.
                </div>
            </div>
        </div>
    </div>
</x-layouts.patient>

