import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { 
  Filter, 
  X, 
  Calendar as CalendarIcon,
  Search 
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useDashboard } from '@/contexts/DashboardContext';
import { authors, categories } from '@/data/mockData';

export function TableFilters() {
  const { state, setFilters } = useDashboard();
  const [searchValue, setSearchValue] = useState(state.filters.search);
  
  const hasActiveFilters = 
    state.filters.search || 
    state.filters.author || 
    state.filters.status || 
    state.filters.category ||
    state.filters.dateRange.from ||
    state.filters.dateRange.to;

  const clearFilters = () => {
    setSearchValue('');
    setFilters({
      search: '',
      author: '',
      status: '',
      category: '',
      dateRange: { from: undefined, to: undefined }
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    // Simple debounce implementation
    const timeoutId = setTimeout(() => {
      setFilters({ search: value });
    }, 300);
    
    return () => clearTimeout(timeoutId);
  };

  return (
    <Card className="p-4 card-elevated">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Label className="text-sm font-medium">Filters</Label>
        </div>
        
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearFilters}
            className="h-8"
          >
            <X className="h-3 w-3 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search" className="text-xs text-muted-foreground">
            Search Articles
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by title..."
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
        </div>

        {/* Author Filter */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Author</Label>
          <Select 
            value={state.filters.author} 
            onValueChange={(value) => setFilters({ author: value === 'all' ? '' : value })}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="All authors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Authors</SelectItem>
              {authors.map(author => (
                <SelectItem key={author} value={author}>{author}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Status</Label>
          <Select 
            value={state.filters.status} 
            onValueChange={(value) => setFilters({ status: value === 'all' ? '' : value })}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Published">Published</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Category</Label>
          <Select 
            value={state.filters.category} 
            onValueChange={(value) => setFilters({ category: value === 'all' ? '' : value })}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date Range Filter */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Date Range</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-9 justify-start text-left font-normal",
                  !state.filters.dateRange.from && !state.filters.dateRange.to && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-3 w-3" />
                {state.filters.dateRange.from ? (
                  state.filters.dateRange.to ? (
                    <>
                      {format(state.filters.dateRange.from, "LLL dd, y")} -{" "}
                      {format(state.filters.dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(state.filters.dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={state.filters.dateRange.from}
                selected={{
                  from: state.filters.dateRange.from,
                  to: state.filters.dateRange.to,
                }}
                onSelect={(range) => {
                  setFilters({
                    dateRange: {
                      from: range?.from,
                      to: range?.to,
                    }
                  });
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </Card>
  );
}