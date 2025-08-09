import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MoreHorizontal, 
  Edit, 
  Eye, 
  Trash2, 
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDashboard } from '@/contexts/DashboardContext';
import { Article, SortField, SortDirection } from '@/types/article';
import { EditArticleModal } from './EditArticleModal';

export function ArticlesTable() {
  const { state, setSorting } = useDashboard();
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const handleSort = (field: SortField) => {
    const newDirection: SortDirection = 
      state.sortField === field && state.sortDirection === 'asc' ? 'desc' : 'asc';
    setSorting(field, newDirection);
  };

  const getSortIcon = (field: SortField) => {
    if (state.sortField !== field) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return state.sortDirection === 'asc' 
      ? <ArrowUp className="h-4 w-4" /> 
      : <ArrowDown className="h-4 w-4" />;
  };

  const getStatusVariant = (status: string) => {
    return status === 'Published' ? 'default' : 'secondary';
  };

  // Pagination logic
  const { currentPage, itemsPerPage, filteredArticles } = state;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  return (
    <>
      <div className="card-elevated rounded-lg">
        <Table>
          <TableHeader className="table-header">
            <TableRow>
              <TableHead className="w-[300px]">Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleSort('publishedDate')}
                  className="h-8 px-2"
                >
                  Published Date
                  {getSortIcon('publishedDate')}
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleSort('views')}
                  className="h-8 px-2"
                >
                  Views
                  {getSortIcon('views')}
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleSort('likes')}
                  className="h-8 px-2"
                >
                  Likes
                  {getSortIcon('likes')}
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleSort('comments')}
                  className="h-8 px-2"
                >
                  Comments
                  {getSortIcon('comments')}
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {paginatedArticles.map((article) => (
              <TableRow key={article.id} className="table-row">
                <TableCell className="font-medium">
                  <div className="max-w-[280px]">
                    <div className="font-semibold text-sm truncate">{article.title}</div>
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {article.content.substring(0, 100)}...
                    </div>
                  </div>
                </TableCell>
                <TableCell>{article.author}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {article.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(article.publishedDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3 text-muted-foreground" />
                    {article.views.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-chart-4 font-medium">
                    {article.likes.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-chart-5 font-medium">
                    {article.comments.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={getStatusVariant(article.status)}
                    className={`text-xs ${article.status === 'Published' ? 'status-published' : 'status-draft'}`}
                  >
                    {article.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingArticle(article)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <EditArticleModal 
        article={editingArticle}
        open={!!editingArticle}
        onClose={() => setEditingArticle(null)}
      />
    </>
  );
}