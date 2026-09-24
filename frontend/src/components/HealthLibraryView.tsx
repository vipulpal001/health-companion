import React, { useState } from 'react';
import { BookOpen, Search, Pill, ShieldAlert, Clock, ArrowRight, X } from 'lucide-react';
import { sampleLibrary, sampleMedicines } from '../services/api';
import type { LibraryItem, MedicineInfo } from '../types';

interface HealthLibraryViewProps {
  onAskAIAboutTopic: (prompt: string) => void;
}

export const HealthLibraryView: React.FC<HealthLibraryViewProps> = ({ onAskAIAboutTopic }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<LibraryItem | null>(null);
  const [activeMedicine, setActiveMedicine] = useState<MedicineInfo | null>(null);

  const categories = [
    'All',
    'Common Symptoms',
    'Medicines',
    'Nutrition',
    'Sleep',
    'Fitness',
    'Mental Wellness',
    'First Aid'
  ];

  const filteredArticles = sampleLibrary.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const filteredMedicines = sampleMedicines.filter((med) => {
    return med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           med.commonUse.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-8 py-8 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#1F2937] dark:text-[#F3F4F6] flex items-center gap-3">
          <BookOpen className="w-7 h-7 text-[#4F6F52] dark:text-[#719F75]" />
          <span>Health Library</span>
        </h2>
        <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1.5 max-w-xl">
          Verified medical summaries, symptom breakdowns, and drug monographs. Clear, informational, and medically cautious.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="w-4 h-4 absolute left-4 top-3.5 text-[#9CA3AF]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search symptoms, medicines (e.g. Paracetamol, Ibuprofen), sleep hygiene, first aid..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-[#1B1E1C] border border-[#E5E7EB] dark:border-[#272C29] text-sm text-[#1F2937] dark:text-[#F3F4F6] placeholder-[#9CA3AF] outline-none focus:border-[#4F6F52] shadow-2xs"
        />
      </div>

      {/* Categories Horizontal Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-[#4F6F52] text-white'
                : 'bg-white dark:bg-[#1B1E1C] border border-[#E5E7EB] dark:border-[#272C29] text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#1F2937] dark:hover:text-[#F3F4F6]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Medicine Monograph Directory Spotlight */}
      {(selectedCategory === 'All' || selectedCategory === 'Medicines') && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-[#1F2937] dark:text-[#F3F4F6] flex items-center gap-2">
              <Pill className="w-4 h-4 text-[#4F6F52]" />
              <span>Medicine Information & Safety Overviews</span>
            </h3>
            <span className="text-xs text-[#6B7280]">Non-prescriptive monographs</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMedicines.map((med) => (
              <div
                key={med.name}
                onClick={() => setActiveMedicine(med)}
                className="p-5 rounded-2xl bg-white dark:bg-[#1B1E1C] border border-[#E5E7EB] dark:border-[#272C29] hover:border-[#4F6F52]/50 cursor-pointer transition shadow-2xs group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-sm text-[#1F2937] dark:text-[#F3F4F6] group-hover:text-[#4F6F52] transition">
                      {med.name}
                    </h4>
                    <span className="text-[11px] font-medium text-[#4F6F52] dark:text-[#719F75] bg-[#EBF2EC] dark:bg-[#1D2A20] px-2 py-0.5 rounded-md inline-block mt-1">
                      {med.drugClass}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#4F6F52] group-hover:translate-x-1 transition" />
                </div>
                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-2.5 line-clamp-2">
                  {med.commonUse}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Educational Health Articles */}
      <section>
        <h3 className="text-base font-semibold text-[#1F2937] dark:text-[#F3F4F6] mb-4">
          Clinical Guidance & Health Articles ({filteredArticles.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-[#1B1E1C] border border-[#E5E7EB] dark:border-[#272C29] hover:border-[#4F6F52]/50 cursor-pointer transition shadow-2xs group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#6B7280] mb-2">
                  <span className="text-[#4F6F52] dark:text-[#719F75] font-medium">{article.category}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
                <h4 className="font-semibold text-sm text-[#1F2937] dark:text-[#F3F4F6] group-hover:text-[#4F6F52] transition mb-2">
                  {article.title}
                </h4>
                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E5E7EB] dark:border-[#272C29] flex items-center justify-between text-xs text-[#4F6F52] dark:text-[#719F75] font-medium">
                <span>Read guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1B1E1C] rounded-3xl border border-[#E5E7EB] dark:border-[#272C29] max-w-2xl w-full p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-semibold text-[#4F6F52] dark:text-[#719F75] uppercase tracking-wider">
                  {activeArticle.category} • {activeArticle.readTime}
                </span>
                <h3 className="text-xl font-bold text-[#1F2937] dark:text-[#F3F4F6] mt-1">
                  {activeArticle.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1 rounded-full text-[#6B7280] hover:text-[#1F2937] hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="prose dark:prose-invert text-sm text-[#1F2937] dark:text-[#F3F4F6] leading-relaxed whitespace-pre-line my-4">
              {activeArticle.content}
            </div>

            <div className="mt-6 pt-4 border-t border-[#E5E7EB] dark:border-[#272C29] flex items-center justify-between">
              <button
                onClick={() => {
                  const prompt = `Can you explain more about "${activeArticle.title}" and how it applies to my symptoms?`;
                  setActiveArticle(null);
                  onAskAIAboutTopic(prompt);
                }}
                className="px-4 py-2 bg-[#4F6F52] hover:bg-[#3E5A41] text-white rounded-xl text-xs font-medium transition"
              >
                Ask Health Companion about this
              </button>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 border border-[#E5E7EB] dark:border-[#272C29] rounded-xl text-xs font-medium text-[#6B7280]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Medicine Detail Modal */}
      {activeMedicine && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1B1E1C] rounded-3xl border border-[#E5E7EB] dark:border-[#272C29] max-w-2xl w-full p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-semibold text-[#4F6F52] bg-[#EBF2EC] dark:bg-[#1D2A20] px-2.5 py-1 rounded-lg">
                  {activeMedicine.drugClass}
                </span>
                <h3 className="text-xl font-bold text-[#1F2937] dark:text-[#F3F4F6] mt-2">
                  {activeMedicine.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveMedicine(null)}
                className="p-1 rounded-full text-[#6B7280] hover:text-[#1F2937] hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <h5 className="font-semibold text-[#1F2937] dark:text-[#F3F4F6] mb-1">Common Uses</h5>
                <p className="text-[#6B7280] dark:text-[#9CA3AF] bg-[#FAFAF8] dark:bg-[#131514] p-3 rounded-xl border border-[#E5E7EB] dark:border-[#272C29]">
                  {activeMedicine.commonUse}
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-[#1F2937] dark:text-[#F3F4F6] mb-1">Common Side Effects</h5>
                <ul className="list-disc pl-5 text-[#6B7280] dark:text-[#9CA3AF] space-y-1">
                  {activeMedicine.sideEffects.map((side, i) => (
                    <li key={i}>{side}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1.5 mb-1">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Important Cautions & Warnings</span>
                </h5>
                <ul className="list-disc pl-5 text-[#6B7280] dark:text-[#9CA3AF] space-y-1">
                  {activeMedicine.warnings.map((warn, i) => (
                    <li key={i}>{warn}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-red-600 dark:text-red-400 mb-1">When to Seek Immediate Medical Help</h5>
                <ul className="list-disc pl-5 text-[#6B7280] dark:text-[#9CA3AF] space-y-1">
                  {activeMedicine.whenToSeekHelp.map((seek, i) => (
                    <li key={i}>{seek}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E5E7EB] dark:border-[#272C29] flex items-center justify-between">
              <button
                onClick={() => {
                  const prompt = `Can you provide safety information and dosage precautions for ${activeMedicine.name}?`;
                  setActiveMedicine(null);
                  onAskAIAboutTopic(prompt);
                }}
                className="px-4 py-2 bg-[#4F6F52] hover:bg-[#3E5A41] text-white rounded-xl text-xs font-medium transition"
              >
                Discuss {activeMedicine.name} with AI
              </button>
              <button
                onClick={() => setActiveMedicine(null)}
                className="px-4 py-2 border border-[#E5E7EB] dark:border-[#272C29] rounded-xl text-xs font-medium text-[#6B7280]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
