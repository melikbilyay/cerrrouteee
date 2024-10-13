// components/CourseFilter.tsx
import React, { useState } from 'react';

interface CourseFilterProps {
    filter: {
        title: string;
        instructor: string;
        duration: string;
        category: string;
        level: string;
        language: string;
    };
    onFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const categories = ['Web Development', 'Data Science', 'Design'];
const levels = ['Beginner', 'Intermediate', 'Advanced'];
const languages = ['English', 'Spanish', 'French'];

const CourseFilter: React.FC<CourseFilterProps> = ({ filter, onFilterChange }) => {
    const [isCategoryOpen, setCategoryOpen] = useState(false);
    const [isLevelOpen, setLevelOpen] = useState(false);
    const [isLanguageOpen, setLanguageOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(filter.category);
    const [selectedLevel, setSelectedLevel] = useState(filter.level);
    const [selectedLanguage, setSelectedLanguage] = useState(filter.language);

    const handleDropdownToggle = (dropdown: string) => {
        if (dropdown === 'category') {
            setCategoryOpen(!isCategoryOpen);
        } else if (dropdown === 'level') {
            setLevelOpen(!isLevelOpen);
        } else if (dropdown === 'language') {
            setLanguageOpen(!isLanguageOpen);
        }
    };

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        onFilterChange({ target: { name: 'category', value: category } });
        setCategoryOpen(false);
    };

    const handleLevelSelect = (level: string) => {
        setSelectedLevel(level);
        onFilterChange({ target: { name: 'level', value: level } });
        setLevelOpen(false);
    };

    const handleLanguageSelect = (language: string) => {
        setSelectedLanguage(language);
        onFilterChange({ target: { name: 'language', value: language } });
        setLanguageOpen(false);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-center mb-4">Filter Courses</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={filter.title}
                        onChange={onFilterChange}
                        placeholder="Search by title"
                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Instructor</label>
                    <input
                        type="text"
                        name="instructor"
                        value={filter.instructor}
                        onChange={onFilterChange}
                        placeholder="Search by instructor"
                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Duration</label>
                    <input
                        type="text"
                        name="duration"
                        value={filter.duration}
                        onChange={onFilterChange}
                        placeholder="Search by duration"
                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => handleDropdownToggle('category')}
                            className="mt-1 w-full border border-gray-300 rounded-lg shadow-sm p-2 text-left bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                            {selectedCategory || "Select Category"}
                        </button>
                        {isCategoryOpen && (
                            <ul className="absolute z-10 mt-1 w-full border border-gray-300 bg-white rounded-lg shadow-lg">
                                {categories.map((category) => (
                                    <li
                                        key={category}
                                        onClick={() => handleCategorySelect(category)}
                                        className="cursor-pointer p-2 hover:bg-orange-100"
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Level</label>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => handleDropdownToggle('level')}
                            className="mt-1 w-full border border-gray-300 rounded-lg shadow-sm p-2 text-left bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                            {selectedLevel || "Select Level"}
                        </button>
                        {isLevelOpen && (
                            <ul className="absolute z-10 mt-1 w-full border border-gray-300 bg-white rounded-lg shadow-lg">
                                {levels.map((level) => (
                                    <li
                                        key={level}
                                        onClick={() => handleLevelSelect(level)}
                                        className="cursor-pointer p-2 hover:bg-orange-100"
                                    >
                                        {level}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Language</label>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => handleDropdownToggle('language')}
                            className="mt-1 w-full border border-gray-300 rounded-lg shadow-sm p-2 text-left bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                            {selectedLanguage || "Select Language"}
                        </button>
                        {isLanguageOpen && (
                            <ul className="absolute z-10 mt-1 w-full border border-gray-300 bg-white rounded-lg shadow-lg">
                                {languages.map((language) => (
                                    <li
                                        key={language}
                                        onClick={() => handleLanguageSelect(language)}
                                        className="cursor-pointer p-2 hover:bg-orange-100"
                                    >
                                        {language}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseFilter;
