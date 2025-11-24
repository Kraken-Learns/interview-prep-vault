import React, { useEffect, useState, useRef } from 'react';
import { getAllProblems } from '@/lib/problems';
import type { Problem } from '@/types';
import ProblemCard from '@/components/ProblemCard';
import TagSidebar from '@/components/TagSidebar';
import SystemDesignView from '@/components/SystemDesignView';
import { Search, X, Code2, Network, Library } from 'lucide-react';

type Category = 'coding' | 'system-design' | 'library';

const Home: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<Category>('coding');
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
            // Filter out 'hellointerview' tag from problems
            const cleanedData = data.map(p => ({
                ...p,
                tags: p.tags.filter(t => t.toLowerCase() !== 'hellointerview')
            }));
            setProblems(cleanedData);
            setFilteredProblems(cleanedData);
            const tags = new Set<string>();
            cleanedData.forEach((p) => p.tags.forEach((t) => tags.add(t)));
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

    const getHeroTitle = () => {
        switch (activeCategory) {
            case 'coding':
                return 'Coding Problems';
            case 'system-design':
                return 'System Design';
            case 'library':
                return 'Library';
        }
    };

    const getHeroDescription = () => {
        switch (activeCategory) {
            case 'coding':
                return 'Master your coding interviews with our curated collection of problems and solutions.';
            case 'system-design':
                return 'Learn scalable system architecture with our comprehensive guides.';
            case 'library':
                return 'Explore our collection of resources and reference materials.';
        }
    };

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <div className="relative -mt-8 px-4 md:px-8 py-16 overflow-hidden w-full">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-50" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-hero-glow opacity-20 blur-[100px] animate-pulse-slow" />

                <div className="relative text-center space-y-6 max-w-3xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight w-full text-center">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400 drop-shadow-lg">
                            {getHeroTitle()}
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 w-full text-center font-medium leading-relaxed">
                        {getHeroDescription()}
                    </p>
                </div>
            </div>

            {/* Category Navigation */}
            <div className="flex flex-wrap justify-center gap-4">
                <button
                    onClick={() => setActiveCategory('coding')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeCategory === 'coding'
                        ? 'bg-primary text-white shadow-glow ring-2 ring-primary/50 scale-105'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                        }`}
                >
                    <Code2 className="w-5 h-5" />
                    Coding Problems
                </button>
                <button
                    onClick={() => setActiveCategory('system-design')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeCategory === 'system-design'
                        ? 'bg-primary text-white shadow-glow ring-2 ring-primary/50 scale-105'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                        }`}
                >
                    <Network className="w-5 h-5" />
                    System Design
                </button>
                <button
                    onClick={() => setActiveCategory('library')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeCategory === 'library'
                        ? 'bg-primary text-white shadow-glow ring-2 ring-primary/50 scale-105'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                        }`}
                >
                    <Library className="w-5 h-5" />
                    Library
                </button>
            </div>

            {/* Content Area */}
            {activeCategory === 'coding' && (
                <div className="flex flex-col lg:flex-row gap-8">
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
                    <div className="flex-1 space-y-8">
                        {/* Search Bar */}
                        <div className="relative max-w-2xl mx-auto" ref={searchRef}>
                            <div className="relative group">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors z-10" />
                                <input
                                    type="text"
                                    placeholder="Search problems or tags..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onFocus={() => setShowAutocomplete(true)}
                                    onKeyDown={handleKeyDown}
                                    className="w-full pl-14 pr-12 py-4 rounded-2xl bg-white dark:bg-dark-layer1 border border-black/10 dark:border-white/10 focus:border-primary/50 shadow-lg focus:shadow-glow outline-none transition-all duration-300 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 text-lg font-medium"
                                />
                                {search && (
                                    <button
                                        onClick={handleClearSearch}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-all duration-200 hover:scale-110 z-10"
                                        aria-label="Clear search"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>

                            {/* Autocomplete */}
                            {showAutocomplete && tagSuggestions.length > 0 && (
                                <div className="absolute top-full mt-3 w-full glass-panel rounded-2xl overflow-hidden z-20 animate-fade-in">
                                    <div className="p-2">
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider px-4 py-2">
                                            {search ? 'Matching Tags' : 'Available Tags'}
                                        </p>
                                        <div className="max-h-64 overflow-y-auto custom-scrollbar">
                                            {tagSuggestions.map((tag, index) => (
                                                <button
                                                    key={tag}
                                                    onClick={() => handleTagSelect(tag)}
                                                    onMouseEnter={() => setSelectedTagIndex(index)}
                                                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium ${index === selectedTagIndex
                                                        ? 'bg-primary/20 text-primary-dark dark:text-white'
                                                        : 'text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5'}`}
                                                >
                                                    <span className="flex items-center gap-3">
                                                        <span className={`inline-block w-2 h-2 rounded-full ${index === selectedTagIndex ? 'bg-primary' : 'bg-slate-400 dark:bg-slate-600'}`} />
                                                        {tag}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Selected Tags */}
                        {selectedTags.length > 0 && (
                            <div className="max-w-2xl mx-auto">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">Filters:</span>
                                    {selectedTags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="group inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 text-primary-light rounded-xl text-sm font-semibold shadow-sm hover:shadow-glow hover:border-primary/50 transition-all duration-200"
                                        >
                                            {tag}
                                            <button
                                                onClick={() => handleRemoveTag(tag)}
                                                className="hover:bg-primary/20 rounded-full p-1 transition-all duration-200"
                                                aria-label={`Remove ${tag} filter`}
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </span>
                                    ))}
                                    <button
                                        onClick={handleClearAll}
                                        className="text-sm text-slate-500 hover:text-white font-semibold underline transition-colors duration-200"
                                    >
                                        Clear all
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Problem Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredProblems.map((problem) => (
                                <ProblemCard key={problem.slug} problem={problem} />
                            ))}
                        </div>

                        {/* Empty State */}
                        {filteredProblems.length === 0 && (
                            <div className="text-center py-20">
                                <div className="inline-block p-6 rounded-2xl bg-white/5 mb-4">
                                    <Search className="w-16 h-16 text-slate-600 mx-auto" />
                                </div>
                                <p className="text-xl font-semibold text-slate-400">No problems found</p>
                                <p className="text-slate-500 mt-2">Try adjusting your search or filters</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeCategory === 'system-design' && (
                <SystemDesignView />
            )}

            {activeCategory === 'library' && (
                <div className="text-center py-20">
                    <div className="inline-block p-6 rounded-2xl bg-white/5 mb-4">
                        <Library className="w-16 h-16 text-slate-600 mx-auto" />
                    </div>
                    <p className="text-xl font-semibold text-slate-400">Library Coming Soon</p>
                    <p className="text-slate-500 mt-2">We are curating the best resources for you.</p>
                </div>
            )}
        </div>
    );
};

export default Home;

