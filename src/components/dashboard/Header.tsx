import { Search, Bell, Plus, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDashboard } from '@/contexts/DashboardContext';
import { useState } from 'react';

interface HeaderProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export function Header({ onMenuClick, showMenuButton = false }: HeaderProps) {
  const { setFilters } = useDashboard();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    setSearchValue(value);
    // Debounce search - you can implement proper debouncing here
    setFilters({ search: value });
  };

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        {showMenuButton && (
          <Button variant="ghost" size="sm" onClick={onMenuClick}>
            <Menu className="h-4 w-4" />
          </Button>
        )}
        
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 w-80"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm">
          <Bell className="h-4 w-4 mr-2" />
          Notifications
        </Button>
        
        <Button className="button-primary" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Article
        </Button>
      </div>
    </header>
  );
}