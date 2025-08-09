import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Article, ArticleFilters, SortField, SortDirection } from '@/types/article';
import { mockArticles } from '@/data/mockData';

interface DashboardState {
  articles: Article[];
  filteredArticles: Article[];
  filters: ArticleFilters;
  sortField: SortField;
  sortDirection: SortDirection;
  currentPage: number;
  itemsPerPage: number;
}

type DashboardAction =
  | { type: 'SET_ARTICLES'; payload: Article[] }
  | { type: 'UPDATE_ARTICLE'; payload: Article }
  | { type: 'SET_FILTERS'; payload: Partial<ArticleFilters> }
  | { type: 'SET_SORT'; payload: { field: SortField; direction: SortDirection } }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_ITEMS_PER_PAGE'; payload: number }
  | { type: 'APPLY_FILTERS' };

const initialState: DashboardState = {
  articles: mockArticles,
  filteredArticles: mockArticles,
  filters: {
    search: '',
    author: '',
    status: '',
    category: '',
    dateRange: { from: undefined, to: undefined }
  },
  sortField: 'publishedDate',
  sortDirection: 'desc',
  currentPage: 1,
  itemsPerPage: 10
};

function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case 'SET_ARTICLES':
      return { ...state, articles: action.payload };
    
    case 'UPDATE_ARTICLE':
      const updatedArticles = state.articles.map(article =>
        article.id === action.payload.id ? action.payload : article
      );
      return { ...state, articles: updatedArticles };
    
    case 'SET_FILTERS':
      return { 
        ...state, 
        filters: { ...state.filters, ...action.payload },
        currentPage: 1 // Reset to first page when filters change
      };
    
    case 'SET_SORT':
      return { 
        ...state, 
        sortField: action.payload.field, 
        sortDirection: action.payload.direction,
        currentPage: 1 
      };
    
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    
    case 'SET_ITEMS_PER_PAGE':
      return { ...state, itemsPerPage: action.payload, currentPage: 1 };
    
    case 'APPLY_FILTERS':
      let filtered = [...state.articles];
      
      // Apply search filter
      if (state.filters.search) {
        filtered = filtered.filter(article =>
          article.title.toLowerCase().includes(state.filters.search.toLowerCase())
        );
      }
      
      // Apply author filter
      if (state.filters.author) {
        filtered = filtered.filter(article => article.author === state.filters.author);
      }
      
      // Apply status filter
      if (state.filters.status) {
        filtered = filtered.filter(article => article.status === state.filters.status);
      }
      
      // Apply category filter
      if (state.filters.category) {
        filtered = filtered.filter(article => article.category === state.filters.category);
      }
      
      // Apply date range filter
      if (state.filters.dateRange.from || state.filters.dateRange.to) {
        filtered = filtered.filter(article => {
          const articleDate = new Date(article.publishedDate);
          const from = state.filters.dateRange.from;
          const to = state.filters.dateRange.to;
          
          if (from && to) {
            return articleDate >= from && articleDate <= to;
          } else if (from) {
            return articleDate >= from;
          } else if (to) {
            return articleDate <= to;
          }
          return true;
        });
      }
      
      // Apply sorting
      filtered.sort((a, b) => {
        let aValue: any = a[state.sortField];
        let bValue: any = b[state.sortField];
        
        if (state.sortField === 'publishedDate') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }
        
        if (state.sortDirection === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
      
      return { ...state, filteredArticles: filtered };
    
    default:
      return state;
  }
}

interface DashboardContextType {
  state: DashboardState;
  updateArticle: (article: Article) => void;
  setFilters: (filters: Partial<ArticleFilters>) => void;
  setSorting: (field: SortField, direction: SortDirection) => void;
  setPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  applyFilters: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);
  
  React.useEffect(() => {
    dispatch({ type: 'APPLY_FILTERS' });
  }, [state.filters, state.sortField, state.sortDirection]);
  
  const updateArticle = (article: Article) => {
    dispatch({ type: 'UPDATE_ARTICLE', payload: article });
  };
  
  const setFilters = (filters: Partial<ArticleFilters>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };
  
  const setSorting = (field: SortField, direction: SortDirection) => {
    dispatch({ type: 'SET_SORT', payload: { field, direction } });
  };
  
  const setPage = (page: number) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  };
  
  const setItemsPerPage = (items: number) => {
    dispatch({ type: 'SET_ITEMS_PER_PAGE', payload: items });
  };
  
  const applyFilters = () => {
    dispatch({ type: 'APPLY_FILTERS' });
  };
  
  return (
    <DashboardContext.Provider value={{
      state,
      updateArticle,
      setFilters,
      setSorting,
      setPage,
      setItemsPerPage,
      applyFilters
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}