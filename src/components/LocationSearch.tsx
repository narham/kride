import { useState, useEffect, useRef, useMemo } from "react";
import { Search, MapPin, X, Loader2, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { searchLocation, NominatimResult, formatAddress } from "@/lib/osm";

interface LocationSearchProps {
  /** Callback when location is selected */
  onSelect: (lat: number, lng: number, address: string) => void;
  
  /** Placeholder text */
  placeholder?: string;
  
  /** CSS class name */
  className?: string;
  
  /** Debounce delay in milliseconds (default: 500) */
  debounceMs?: number;
  
  /** Maximum results (default: 5) */
  maxResults?: number;
  
  /** Enable search history (default: true) */
  enableHistory?: boolean;
  
  /** Enable recent searches in dropdown (default: true) */
  showRecent?: boolean;
}

// Local storage key for search history
const SEARCH_HISTORY_KEY = 'location_search_history';

const LocationSearch = ({
  onSelect,
  placeholder = "Cari lokasi...",
  className,
  debounceMs = 500,
  maxResults = 5,
  enableHistory = true,
  showRecent = true,
}: LocationSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<NominatimResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout>();

  // Load search history from localStorage
  useEffect(() => {
    if (!enableHistory) return;
    
    try {
      const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
      if (stored) {
        setSearchHistory(JSON.parse(stored).slice(0, 5));
      }
    } catch (e) {
      console.error('Failed to load search history:', e);
    }
  }, [enableHistory]);

  // Save search history to localStorage
  const saveToHistory = (result: NominatimResult) => {
    if (!enableHistory) return;
    
    try {
      const filtered = searchHistory.filter(
        h => h.lat !== result.lat || h.lon !== result.lon
      );
      const updated = [result, ...filtered].slice(0, 10);
      setSearchHistory(updated);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save search history:', e);
    }
  };

  // Debounced search
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (query.length < 2) {
      setResults([]);
      setError(null);
      setSelectedIndex(-1);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    debounceTimer.current = setTimeout(async () => {
      try {
        const data = await searchLocation(query, {
          countrycode: 'id',
          limit: maxResults,
        });
        
        if (data.length === 0) {
          setError('Lokasi tidak ditemukan');
        } else {
          setError(null);
        }
        
        setResults(data);
        setIsOpen(true);
        setSelectedIndex(-1);
      } catch (err) {
        console.error("Search error:", err);
        setError('Gagal mencari lokasi. Silakan coba lagi.');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query, debounceMs, maxResults]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const displayedResults = query.length > 2 ? results : [];
    const totalItems = displayedResults.length + (showRecent && query.length < 2 ? searchHistory.length : 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || totalItems === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => (prev < totalItems - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : totalItems - 1));
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < displayedResults.length) {
            handleSelectResult(displayedResults[selectedIndex]);
          } else if (showRecent && selectedIndex >= displayedResults.length) {
            const historyIndex = selectedIndex - displayedResults.length;
            if (historyIndex >= 0 && historyIndex < searchHistory.length) {
              handleSelectResult(searchHistory[historyIndex]);
            }
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, searchHistory, selectedIndex, showRecent, query.length]);

  const handleSelectResult = (result: NominatimResult) => {
    const address = result.display_name;
    onSelect(parseFloat(result.lat), parseFloat(result.lon), address);
    
    if (enableHistory) {
      saveToHistory(result);
    }
    
    setQuery(address);
    setIsOpen(false);
  };

  const displayResults = useMemo(() => {
    if (query.length > 2) {
      return results;
    }
    return [];
  }, [query, results]);

  const displayRecent = useMemo(() => {
    if (showRecent && query.length < 2) {
      return searchHistory.slice(0, 3);
    }
    return [];
  }, [showRecent, query, searchHistory]);

  const allItems = [...displayResults, ...displayRecent];

  return (
    <div className={cn("relative w-full", className)} ref={dropdownRef}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (query.length > 2 || (showRecent && searchHistory.length > 0)) {
              setIsOpen(true);
            }
          }}
          placeholder={placeholder}
          className="w-full rounded-2xl bg-muted pl-12 pr-12 py-4 text-sm font-bold placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
          autoComplete="off"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
              setError(null);
              setIsOpen(false);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted-foreground/10 transition-colors"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : (
              <X className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        )}
      </div>

      {/* Error message */}
      {error && isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700 text-sm flex items-center gap-2 z-[2000]">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Results dropdown */}
      {isOpen && (displayResults.length > 0 || displayRecent.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/50 rounded-2xl shadow-xl z-[2000] overflow-hidden animate-in fade-in slide-in-from-top-2">
          <div className="max-h-[400px] overflow-y-auto">
            {/* Search results */}
            {displayResults.map((result, index) => (
              <button
                key={`result-${index}`}
                onClick={() => handleSelectResult(result)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={cn(
                  "w-full flex items-start gap-4 p-4 text-left border-b border-border/50 last:border-0 transition-colors",
                  selectedIndex === index ? "bg-muted" : "hover:bg-muted"
                )}
              >
                <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-sm truncate leading-tight">
                    {result.display_name.split(",")[0]}
                  </p>
                  <p className="text-[10px] text-muted-foreground line-clamp-2 mt-1">
                    {formatAddress(result.display_name)}
                  </p>
                </div>
              </button>
            ))}

            {/* Recent searches */}
            {displayRecent.length > 0 && displayResults.length === 0 && (
              <>
                <div className="px-4 py-2 bg-muted/50 border-b border-border/50">
                  <p className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    Pencarian Terakhir
                  </p>
                </div>
                {displayRecent.map((result, index) => (
                  <button
                    key={`recent-${index}`}
                    onClick={() => handleSelectResult(result)}
                    onMouseEnter={() => setSelectedIndex(displayResults.length + index)}
                    className={cn(
                      "w-full flex items-start gap-4 p-4 text-left border-b border-border/50 last:border-0 transition-colors",
                      selectedIndex === displayResults.length + index ? "bg-muted" : "hover:bg-muted"
                    )}
                  >
                    <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm truncate leading-tight">
                        {result.display_name.split(",")[0]}
                      </p>
                      <p className="text-[10px] text-muted-foreground line-clamp-2 mt-1">
                        {formatAddress(result.display_name)}
                      </p>
                    </div>
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && query.length > 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/50 rounded-2xl p-4 text-center z-[2000]">
          <Loader2 className="h-4 w-4 animate-spin inline-block text-primary" />
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
