import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

interface AutocompleteProps {
    url: string, 
    placeholder?: string,
    onSelect?: any,
    className?: string
}

interface Suggestion {
    id: string, 
    name: string,
}

const Autocomplete = ({url, placeholder, onSelect, className}: AutocompleteProps) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.length > 0) {
                setLoading(true);
                try {
                    const response = await fetch(`${url}?query=${query}`, {
                        method: 'GET',
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest', // Important for Laravel to recognize AJAX requests
                            'Content-Type': 'application/json',
                        },
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        setSuggestions(data); // Assuming the backend returns an array of users/plans directly
                    } else {
                        console.error('Failed to fetch suggestions:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching suggestions:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setSuggestions([]); // Clear suggestions if the query is empty
            }
        };

        fetchSuggestions();
    }, [query, url]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSuggestionClick = (suggestion: Suggestion) => {
        setQuery(suggestion.name); // Assuming suggestion has a name property
        setSuggestions([]); // Clear suggestions after selection
        if (onSelect) onSelect(suggestion); // Call onSelect callback
    };

    return (
        <div className={`relative ${className}`}>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder={placeholder}
                className={`w-full h-full p-2 border border-gray-300 rounded`}
            />
            {loading && <div className="absolute top-full left-0 p-2 bg-white border-gray-300 w-full">Loading...</div>}
            {suggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 w-full">
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.id} // Assuming each suggestion has a unique id
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                        >
                            {suggestion.name} {/* Assuming suggestion has a name property */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Autocomplete;
