import React, { useEffect, useState, useRef } from 'react';
import { getAllProblems } from '@/lib/problems';
import type { Problem } from '@/types';
import ProblemCard from '@/components/ProblemCard';
import TagSidebar from '@/components/TagSidebar';
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

    // Load problems and extract tags
    useEffect(() => {
        getAllProblems().then((data) => {
            setProblems(data);
            setFilteredProblems(data);
            const tags = new Set<string>();
            data.forEach((p) => p.tags.forEach((t) => tags.add(t)));
            setAllTags(Array.from(tags).sort());
        });
    }, []);

    // Filter based on search and selected tags
    useEffect(() => {
        const lowerSearch = search.toLowerCase();
        const filtered = problems.filter((p) => {
            const matchesSearch =
                !search ||
                p.title.toLowerCase().includes(lowerSearch) ||
                p.tags.some((t) => t.toLowerCase().includes(lowerSearch));
            const matchesTags =
                selectedTags.length === 0 ||
                selectedTags.every((sel) =>
                    p.tags.some((pt) => pt.toLowerCase() === sel.toLowerCase())
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

    const getTagSuggestions = () => {
        const available = allTags.filter(
            (tag) => !selectedTags.some((s) => s.toLowerCase() === tag.toLowerCase())
        );
        if (!search.trim()) return available;
        const lower = search.toLowerCase();
        return available.filter((tag) => tag.toLowerCase().includes(lower));
    };

    const tagSuggestions = getTagSuggestions();

    const handleTagSelect = (tag: string) => {
        if (!selectedTags.includes(tag)) setSelectedTags([...selectedTags, tag]);
        setSearch('');
        setShowAutocomplete(false);
        setSelectedTagIndex(-1);
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setSelectedTags(selectedTags.filter((t) => t !== tagToRemove));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!showAutocomplete) return;
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedTagIndex((prev) => (prev < tagSuggestions.length - 1 ? prev + 1 : prev));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedTagIndex((prev) => (prev > 0 ? prev - 1 : -1));
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

    const handleTagToggle = (tag: string) => {
        if (selectedTags.some((t) => t.toLowerCase() === tag.toLowerCase())) {
            setSelectedTags(selectedTags.filter((t) => t.toLowerCase() !== tag.toLowerCase()));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    return (
        <div className="flex gap-6">
            {/* Sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
                <TagSidebar
                    allTags={allTags}
                    selectedTags={selectedTags}
                    onTagToggle={handleTagToggle}
                    problems={problems}
                />
            </aside>

            {/* Main Content */}
            <div className="space-y-12">
                {/* Hero Section */}
                <div className="relative -mt-8 px-8 py-8 mb-8 overflow-hidden w-full">
                    <div className="absolute inset-0 gradient-bg-animated opacity-10" />
                    <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" />
                    <div className="absolute top-20 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '1s' }} />
                    <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />
                    <div className="relative text-center space-y-5">
                        <h1 className="text-4xl font-bold tracking-tight w-full text-center">
                            <span className="gradient-text">Interview Prep Vault</span>
                        </h1>
                        <p className="text-xl text-slate-600 w-full text-center font-medium">
                            Master your coding interviews with our curated collection of problems and solutions.
                        </p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-2xl mx-auto" ref={searchRef}>
                    <div className="relative">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 z-10" />
                        <input
                            type="text"
                            placeholder="Search problems or tags..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onFocus={() => setShowAutocomplete(true)}
                            onKeyDown={handleKeyDown}
                            className="w-full pl-14 pr-12 py-4 rounded-2xl glass-strong border-0 shadow-glow focus:shadow-glow outline-none transition-all duration-300 text-slate-700 placeholder-slate-500 text-lg font-medium"
                        />
                        {search && (
                            <button
                                onClick={handleClearSearch}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-all duration-200 hover:scale-110 z-10"
                                aria-label="Clear search"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {/* Autocomplete */}
                    {showAutocomplete && tagSuggestions.length > 0 && (
                        <div className="absolute top-full mt-3 w-full glass-strong rounded-2xl shadow-premium max-h-80 overflow-y-auto z-20 border-0">
                            <div className="p-3">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider px-4 py-2">
                                    {search ? 'Matching Tags' : 'Available Tags'}
                                </p>
                                {tagSuggestions.map((tag, index) => (
                                    <button
                                        key={tag}
                                        onClick={() => handleTagSelect(tag)}
                                        onMouseEnter={() => setSelectedTagIndex(index)}
                                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium ${index === selectedTagIndex
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md scale-[1.02]'
                                            : 'text-slate-700 hover:bg-white/60'}`}
                                    >
                                        <span className="flex items-center gap-3">
                                            <span className={`inline-block w-2 h-2 rounded-full ${index === selectedTagIndex ? 'bg-white' : 'bg-blue-500'}`} />
                                            {tag}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Selected Tags */}
                {selectedTags.length > 0 && (
                    <div className="max-w-2xl mx-auto">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="text-sm font-bold text-slate-600 uppercase tracking-wide">Active Filters:</span>
                            {selectedTags.map((tag) => (
                                <span
                                    key={tag}
                                    className="group inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                                >
                                    {tag}
                                    <button
                                        onClick={() => handleRemoveTag(tag)}
                                        className="hover:bg-white/20 rounded-full p-1 transition-all duration-200"
                                        aria-label={`Remove ${tag} filter`}
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </span>
                            ))}
                            <button
                                onClick={handleClearAll}
                                className="text-sm text-slate-500 hover:text-slate-800 font-semibold underline transition-colors duration-200"
                            >
                                Clear all
                            </button>
                        </div>
                    </div>
                )}

                {/* Problem Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    {filteredProblems.map((problem) => (
                        <ProblemCard key={problem.slug} problem={problem} />
                    ))}
                </div>

                {/* Empty State */}
                {filteredProblems.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-block p-6 rounded-2xl glass-strong mb-4">
                            <Search className="w-16 h-16 text-slate-400 mx-auto" />
                        </div>
                        <p className="text-xl font-semibold text-slate-600">No problems found</p>
                        <p className="text-slate-500 mt-2">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
