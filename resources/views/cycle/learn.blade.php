<x-layouts.patient>
    <x-slot:title>Cycle Education & Guides - HealthBridge</x-slot:title>

    <div class="space-y-6 max-w-4xl mx-auto">
        <div>
            <a href="{{ route('cycle.index') }}" class="text-xs font-semibold text-rose-600 hover:underline">&larr; Back to Cycle Overview</a>
            <h1 class="text-2xl font-extrabold text-gray-900 tracking-tight mt-1">Reproductive Health & Cycle Guide</h1>
            <p class="text-sm text-gray-500">Clinical insights into the 4 biological phases of your menstrual cycle.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Phase 1: Menstrual -->
            <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div class="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-sm mb-4">
                    1
                </div>
                <h3 class="text-lg font-bold text-gray-900">Menstrual Phase (Days 1–5)</h3>
                <p class="text-xs text-gray-600 mt-2 leading-relaxed">
                    Triggered by dropping progesterone and estrogen levels, the uterine lining (endometrium) is shed. Energy levels may be lower, and mild cramping is common as prostaglandins stimulate uterine contractions.
                </p>
                <div class="mt-4 pt-3 border-t border-gray-100 text-xs text-rose-700 font-medium">
                    Self-care tip: Prioritize rest, iron-rich meals, magnesium, and gentle hydration.
                </div>
            </div>

            <!-- Phase 2: Follicular -->
            <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div class="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm mb-4">
                    2
                </div>
                <h3 class="text-lg font-bold text-gray-900">Follicular Phase (Days 6–13)</h3>
                <p class="text-xs text-gray-600 mt-2 leading-relaxed">
                    Follicle-stimulating hormone (FSH) prompts the ovaries to mature egg follicles. Rising estradiol thickens the uterine lining and boosts mental clarity, stamina, and libido.
                </p>
                <div class="mt-4 pt-3 border-t border-gray-100 text-xs text-pink-700 font-medium">
                    Self-care tip: Ideal time for higher-intensity workouts, creative projects, and active planning.
                </div>
            </div>

            <!-- Phase 3: Ovulation -->
            <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm mb-4">
                    3
                </div>
                <h3 class="text-lg font-bold text-gray-900">Ovulation (Around Day 14)</h3>
                <p class="text-xs text-gray-600 mt-2 leading-relaxed">
                    A surge in luteinizing hormone (LH) triggers release of a mature ovum from the dominant follicle into the fallopian tube. Cervical fluid becomes stretchy, clear, and egg-white in consistency to facilitate sperm motility.
                </p>
                <div class="mt-4 pt-3 border-t border-gray-100 text-xs text-purple-700 font-medium">
                    Fertility window: The ovum survives 12–24 hours, but sperm can survive up to 5 days prior.
                </div>
            </div>

            <!-- Phase 4: Luteal -->
            <div class="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm mb-4">
                    4
                </div>
                <h3 class="text-lg font-bold text-gray-900">Luteal Phase (Days 15–28)</h3>
                <p class="text-xs text-gray-600 mt-2 leading-relaxed">
                    The collapsed follicle transforms into the corpus luteum, secreting progesterone to support potential implantation. Progesterone elevates basal body temperature by 0.2°C–0.5°C.
                </p>
                <div class="mt-4 pt-3 border-t border-gray-100 text-xs text-amber-700 font-medium">
                    Self-care tip: Support sleep hygiene, steady complex carbohydrates, and stress reduction.
                </div>
            </div>
        </div>
    </div>
</x-layouts.patient>

