import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import {
  getPopularItems,
  type PopularItem,
} from "@/lib/api";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [popularBodyStyles, setPopularBodyStyles] = useState<PopularItem[]>([]);
  const [popularMakes, setPopularMakes] = useState<PopularItem[]>([]);
  const [popularModels, setPopularModels] = useState<PopularItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchPopularItems = async () => {
      const items = await getPopularItems();
      setPopularBodyStyles(items.body_style);
      setPopularMakes(items.make);
      setPopularModels(items.model);
    };
    fetchPopularItems();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocused(false);
      }
    };

    if (isOpen || focused) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, focused]);

  const handleFocus = () => {
    setFocused(true);
    setIsOpen(true);
  };

  const handleItemClick = (item: string) => {
    if (inputRef.current) {
      inputRef.current.value = item;
    }
    setIsOpen(false);
    setFocused(false);
  };

  return (
    <div className="bg-card">
      <div className="container mx-auto px-4 pt-4 pb-0">
        <div className="relative max-w-7xl mx-auto" ref={containerRef}>
          <Input
            ref={inputRef}
            type="text"
            placeholder="What kind of car are you looking for?"
            className="pl-4 pr-12 h-14 text-lg md:text-xl rounded-full placeholder:text-lg md:placeholder:text-xl"
            onFocus={handleFocus}
            onBlur={() => {
              setTimeout(() => {
                if (!isOpen) setFocused(false);
              }, 200);
            }}
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />

          {(isOpen || focused) && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-50 p-6 max-h-[600px] overflow-y-auto">
              <div className="space-y-6">
                {/* Popular Body Styles */}
                <div>
                  <h3 className="text-foreground font-semibold text-sm uppercase mb-3 pb-2 border-b border-border">
                    Popular Body Styles
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {popularBodyStyles.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleItemClick(item.name)}
                        className="text-foreground text-left text-base hover:text-primary hover:underline transition-colors"
                      >
                        {item.name}{" "}
                        <span className="text-muted-foreground">
                          ({item.count})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Makes */}
                <div>
                  <h3 className="text-foreground font-semibold text-sm uppercase mb-3 pb-2 border-b border-border">
                    Popular Makes
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {popularMakes.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleItemClick(item.name)}
                        className="text-foreground text-left text-base hover:text-primary hover:underline transition-colors"
                      >
                        {item.name}{" "}
                        <span className="text-muted-foreground">
                          ({item.count})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Make Models */}
                <div>
                  <h3 className="text-foreground font-semibold text-sm uppercase mb-3 pb-2 border-b border-border">
                    Popular Make Models
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {popularModels.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleItemClick(item.name)}
                        className="text-foreground text-left text-base hover:text-primary hover:underline transition-colors"
                      >
                        {item.name}{" "}
                        <span className="text-muted-foreground">
                          ({item.count})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
