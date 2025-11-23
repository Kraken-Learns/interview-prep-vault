import React, { useEffect, useState, useRef } from 'react';
import { getAllProblems } from '@/lib/problems';
import type { Problem } from '@/types';
import ProblemCard from '@/components/ProblemCard';
import { Search, X } from 'lucide-react';

const Home: React.FC = () => {
    const [problems, setProblems] = useState<Problem[]>([]);
    const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
    const [search, setSearch] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [allTags, setAllTags] = useState<string[]>([]);
    const [showAutocomplete, setShowAutocomplete] = useState(false);
    const [selectedTagIndex, setSelectedTagIndex] = useState(-1);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getAllProblems().then((data) => {
            setProblems(data);
            setFilteredProblems(data);

            // Extract all unique tags
            const tags = new Set<string>();
            data.forEach(problem => {
                problem.tags.forEach(tag => tags.add(tag));
            });
            setAllTags(Array.from(tags).sort());
        });
    }, []);

    useEffect(() => {
        const lowerSearch = search.toLowerCase();
        const filtered = problems.filter((p) => {
            // Check if problem matches search text
            const matchesSearch = !search ||
                p.title.toLowerCase().includes(lowerSearch) ||
                p.tags.some((t) => t.toLowerCase().includes(lowerSearch));

            // Check if problem has all selected tags
            const matchesTags = selectedTags.length === 0 ||
                selectedTags.every(selectedTag =>
                    p.tags.some(pTag => pTag.toLowerCase() === selectedTag.toLowerCase())
                );

            return matchesSearch && matchesTags;
        });
        setFilteredProblems(filtered);
    }, [search, selectedTags, problems]);

    // Close autocomplete when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowAutocomplete(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Get filtered tag suggestions (exclude already selected tags)
    const getTagSuggestions = () => {
        const availableTags = allTags.filter(tag =>
            !selectedTags.some(selected => selected.toLowerCase() === tag.toLowerCase())
        );

        if (!search.trim()) return availableTags;
        const lowerSearch = search.toLowerCase();
        return availableTags.filter(tag => tag.toLowerCase().includes(lowerSearch));
    };

    const tagSuggestions = getTagSuggestions();

    const handleTagSelect = (tag: string) => {
        if (!selectedTags.includes(tag)) {
            setSelectedTags([...selectedTags, tag]);
        }
        setSearch('');
        setShowAutocomplete(false);
        setSelectedTagIndex(-1);
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!showAutocomplete) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedTagIndex(prev =>
                    prev < tagSuggestions.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedTagIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedTagIndex >= 0 && tagSuggestions[selectedTagIndex]) {
                    handleTagSelect(tagSuggestions[selectedTagIndex]);
                }
                break;
            case 'Escape':
                setShowAutocomplete(false);
                setSelectedTagIndex(-1);
                break;
        }
    };

    const handleClearSearch = () => {
        setSearch('');
        setShowAutocomplete(false);
        setSelectedTagIndex(-1);
    };

    const handleClearAll = () => {
        setSearch('');
        setSelectedTags([]);
        setShowAutocomplete(false);
        setSelectedTagIndex(-1);
    };

    return (
        <div className="space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                    Interview Prep Vault
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    A collection of coding interview problems and solutions.
                </p>
            </div>

            <div className="relative max-w-xl mx-auto" ref={searchRef}>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
                <input
                    type="text"
                    placeholder="Search problems or tags..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setShowAutocomplete(true)}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-12 pr-10 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm"
                />
                {search && (
                    <button
                        onClick={handleClearSearch}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors z-10"
                        aria-label="Clear search"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}

                {/* Autocomplete Dropdown */}
                {showAutocomplete && tagSuggestions.length > 0 && (
                    <div className="absolute top-full mt-2 w-full bg-white rounded-xl border border-slate-200 shadow-lg max-h-64 overflow-y-auto z-20">
                        <div className="p-2">
                            <p className="text-xs font-semibold text-slate-500 px-3 py-2">
                                {search ? 'Matching Tags' : 'All Tags'}
                            </p>
                            {tagSuggestions.map((tag, index) => (
                                <button
                                    key={tag}
                                    onClick={() => handleTagSelect(tag)}
                                    onMouseEnter={() => setSelectedTagIndex(index)}
                                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${index === selectedTagIndex
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-slate-700 hover:bg-slate-50'
                                        }`}
                                >
                                    <span className="flex items-center">
                                        <span className="inline-block w-2 h-2 rounded-full bg-slate-400 mr-2"></span>
                                        {tag}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Selected Tags as Chips */}
            {selectedTags.length > 0 && (
                <div className="max-w-xl mx-auto">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-slate-600">Filters:</span>
                        {selectedTags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-300 transition-colors group"
                            >
                                {tag}
                                <button
                                    onClick={() => handleRemoveTag(tag)}
                                    className="hover:bg-slate-400 rounded-full p-0.5 transition-colors"
                                    aria-label={`Remove ${tag} filter`}
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </span>
                        ))}
                        <button
                            onClick={handleClearAll}
                            className="text-sm text-slate-500 hover:text-slate-700 underline transition-colors"
                        >
                            Clear all
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProblems.map((problem) => (
                    <ProblemCard key={problem.slug} problem={problem} />
                ))}
            </div>

            {filteredProblems.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                    No problems found matching your search.
                </div>
            )}
        </div>
    );
};

export default Home;
