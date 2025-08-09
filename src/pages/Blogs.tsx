import { ArticlesTable } from "@/components/dashboard/ArticlesTable";
import { Pagination } from "@/components/dashboard/Pagination";
import { TableFilters } from "@/components/dashboard/TableFilters";
import React from "react";

const Blogs = () => {
  return (
    <div>
      <TableFilters />
      <ArticlesTable />
      <Pagination />
    </div>
  );
};

export default Blogs;

// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { CalendarIcon } from "@radix-ui/react-icons";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";
// import type { DateRange } from "react-day-picker";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/components/ui/use-toast";

// interface Article {
//   id: string;
//   title: string;
//   content: string;
//   status: "Published" | "Draft";
//   author: string;
//   publishedDate: Date;
//   views: number;
//   likes: number;
//   comments: number;
// }

// const BlogsPage = () => {
//   const { toast } = useToast();

//   // Sample data with content and status
//   const [articles, setArticles] = useState<Article[]>([
//     {
//       id: "1",
//       title: "Getting Started with React",
//       content: "Learn the basics of React and how to create your first component.",
//       status: "Published",
//       author: "Jane Smith",
//       publishedDate: new Date(2023, 5, 15),
//       views: 1024,
//       likes: 128,
//       comments: 42,
//     },
//     {
//       id: "2",
//       title: "Advanced TypeScript Patterns",
//       content: "Explore advanced TypeScript techniques for better code quality.",
//       status: "Published",
//       author: "John Doe",
//       publishedDate: new Date(2023, 6, 22),
//       views: 2456,
//       likes: 312,
//       comments: 87,
//     },
//     {
//       id: "3",
//       title: "CSS Grid Mastery",
//       content: "Master CSS Grid layout with practical examples.",
//       status: "Draft",
//       author: "Alice Johnson",
//       publishedDate: new Date(2023, 4, 10),
//       views: 876,
//       likes: 95,
//       comments: 31,
//     },
//     {
//       id: "4",
//       title: "State Management in 2023",
//       content: "Comparison of modern state management solutions.",
//       status: "Published",
//       author: "Jane Smith",
//       publishedDate: new Date(2023, 7, 5),
//       views: 1890,
//       likes: 210,
//       comments: 65,
//     },
//     {
//       id: "5",
//       title: "The Future of Web Development",
//       content: "Predictions and trends for web development in the coming years.",
//       status: "Published",
//       author: "Robert Chen",
//       publishedDate: new Date(2023, 8, 12),
//       views: 3200,
//       likes: 450,
//       comments: 120,
//     },
//   ]);

//   // State for filters and sorting
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedAuthor, setSelectedAuthor] = useState<string>("");
//   const [dateRange, setDateRange] = useState<DateRange>({
//     from: undefined,
//     to: undefined,
//   });
//   const [sortConfig, setSortConfig] = useState<{
//     key: "views" | "likes" | "comments";
//     direction: "ascending" | "descending";
//   } | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   // State for edit modal
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
//   const [formErrors, setFormErrors] = useState({
//     title: "",
//     content: "",
//   });

//   // Get unique authors for filter dropdown
//   const authors = [...new Set(articles.map((article) => article.author))];

//   // Filter and sort articles
//   const filteredArticles = React.useMemo(() => {
//     let filtered = [...articles];

//     // Search by title
//     if (searchTerm) {
//       filtered = filtered.filter((article) =>
//         article.title.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Filter by author
//     if (selectedAuthor) {
//       filtered = filtered.filter((article) => article.author === selectedAuthor);
//     }

//     // Filter by date range
//     if (dateRange?.from && dateRange?.to) {
//       filtered = filtered.filter(
//         (article) =>
//           article.publishedDate >= dateRange.from! &&
//           article.publishedDate <= dateRange.to!
//       );
//     }

//     // Sorting
//     if (sortConfig !== null) {
//       filtered.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === "ascending" ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === "ascending" ? 1 : -1;
//         }
//         return 0;
//       });
//     }

//     return filtered;
//   }, [articles, searchTerm, selectedAuthor, dateRange, sortConfig]);

//   // Pagination
//   const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
//   const paginatedArticles = filteredArticles.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   // Reset to first page when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, selectedAuthor, dateRange, sortConfig]);

//   // Sort request
//   const requestSort = (key: "views" | "likes" | "comments") => {
//     let direction: "ascending" | "descending" = "ascending";
//     if (
//       sortConfig &&
//       sortConfig.key === key &&
//       sortConfig.direction === "ascending"
//     ) {
//       direction = "descending";
//     }
//     setSortConfig({ key, direction });
//   };

//   // Open edit modal
//   const openEditModal = (article: Article) => {
//     setCurrentArticle(article);
//     setIsEditModalOpen(true);
//     setFormErrors({ title: "", content: "" });
//   };

//   // Handle form input changes
//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     if (currentArticle) {
//       setCurrentArticle({
//         ...currentArticle,
//         [name]: value,
//       });
//     }
//   };

//   // Handle status change
//   const handleStatusChange = (value: string) => {
//     if (currentArticle) {
//       setCurrentArticle({
//         ...currentArticle,
//         status: value as "Published" | "Draft",
//       });
//     }
//   };

//   // Validate form
//   const validateForm = () => {
//     let valid = true;
//     const newErrors = { title: "", content: "" };

//     if (!currentArticle?.title.trim()) {
//       newErrors.title = "Title is required";
//       valid = false;
//     }

//     if (!currentArticle?.content.trim()) {
//       newErrors.content = "Content is required";
//       valid = false;
//     }

//     setFormErrors(newErrors);
//     return valid;
//   };

//   // Save changes
//   const saveChanges = () => {
//     if (!currentArticle || !validateForm()) return;

//     // Update the article in the state
//     setArticles((prev) =>
//       prev.map((article) =>
//         article.id === currentArticle.id ? currentArticle : article
//       )
//     );

//     // Close modal and show success message
//     setIsEditModalOpen(false);
//     toast({
//       title: "Success",
//       description: "Article updated successfully",
//       variant: "default",
//     });

//     // Mock API call would go here
//     // await updateArticle(currentArticle);
//   };

//   return (
//     <div className="container mx-auto py-8 px-4">
//       <h1 className="text-3xl font-bold mb-8">Blog Articles</h1>

//       {/* Filters */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div className="md:col-span-1">
//           <Input
//             placeholder="Search by title..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <div>
//           <Select
//             value={selectedAuthor}
//             onValueChange={(value) => setSelectedAuthor(value === "all" ? "" : value)}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Filter by author" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Authors</SelectItem>
//               {authors.map((author) => (
//                 <SelectItem key={author} value={author}>
//                   {author}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         <div>
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button
//                 variant={"outline"}
//                 className={cn(
//                   "w-full justify-start text-left font-normal",
//                   !dateRange.from && "text-muted-foreground"
//                 )}
//               >
//                 <CalendarIcon className="mr-2 h-4 w-4" />
//                 {dateRange?.from ? (
//                   dateRange.to ? (
//                     <>
//                       {format(dateRange.from, "LLL dd, y")} -{" "}
//                       {format(dateRange.to, "LLL dd, y")}
//                     </>
//                   ) : (
//                     format(dateRange.from, "LLL dd, y")
//                   )
//                 ) : (
//                   <span>Filter by date</span>
//                 )}
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0" align="start">
//               <Calendar
//                 initialFocus
//                 mode="range"
//                 defaultMonth={dateRange?.from}
//                 selected={dateRange}
//                 onSelect={setDateRange}
//                 numberOfMonths={2}
//               />
//             </PopoverContent>
//           </Popover>
//         </div>

//         <div>
//           <Button
//             variant="outline"
//             onClick={() => {
//               setSearchTerm("");
//               setSelectedAuthor("");
//               setDateRange({ from: undefined, to: undefined });
//               setSortConfig(null);
//             }}
//             className="w-full"
//           >
//             Clear Filters
//           </Button>
//         </div>
//       </div>

//       {/* Articles Table */}
//       <div className="rounded-md border mb-6">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Title</TableHead>
//               <TableHead>Author</TableHead>
//               <TableHead>Published Date</TableHead>
//               <TableHead
//                 className="cursor-pointer hover:bg-gray-100"
//                 onClick={() => requestSort("views")}
//               >
//                 Views{" "}
//                 {sortConfig?.key === "views" && (
//                   <span>
//                     {sortConfig.direction === "ascending" ? "↑" : "↓"}
//                   </span>
//                 )}
//               </TableHead>
//               <TableHead
//                 className="cursor-pointer hover:bg-gray-100"
//                 onClick={() => requestSort("likes")}
//               >
//                 Likes{" "}
//                 {sortConfig?.key === "likes" && (
//                   <span>
//                     {sortConfig.direction === "ascending" ? "↑" : "↓"}
//                   </span>
//                 )}
//               </TableHead>
//               <TableHead
//                 className="cursor-pointer hover:bg-gray-100"
//                 onClick={() => requestSort("comments")}
//               >
//                 Comments{" "}
//                 {sortConfig?.key === "comments" && (
//                   <span>
//                     {sortConfig.direction === "ascending" ? "↑" : "↓"}
//                   </span>
//                 )}
//               </TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {paginatedArticles.length > 0 ? (
//               paginatedArticles.map((article) => (
//                 <TableRow key={article.id}>
//                   <TableCell className="font-medium">{article.title}</TableCell>
//                   <TableCell>{article.author}</TableCell>
//                   <TableCell>
//                     {format(article.publishedDate, "MMM dd, yyyy")}
//                   </TableCell>
//                   <TableCell>{article.views.toLocaleString()}</TableCell>
//                   <TableCell>{article.likes.toLocaleString()}</TableCell>
//                   <TableCell>{article.comments.toLocaleString()}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => openEditModal(article)}
//                     >
//                       Edit
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={7} className="text-center py-8">
//                   No articles found matching your filters
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Pagination */}
//       <div className="flex items-center justify-between">
//         <div className="text-sm text-muted-foreground">
//           Showing{" "}
//           <span className="font-medium">
//             {(currentPage - 1) * itemsPerPage + 1}
//           </span>{" "}
//           to{" "}
//           <span className="font-medium">
//             {Math.min(currentPage * itemsPerPage, filteredArticles.length)}
//           </span>{" "}
//           of <span className="font-medium">{filteredArticles.length}</span>{" "}
//           articles
//         </div>
//         <div className="flex space-x-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//             disabled={currentPage === totalPages || totalPages === 0}
//           >
//             Next
//           </Button>
//         </div>
//       </div>

//       {/* Edit Article Modal */}
//       <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit Article</DialogTitle>
//           </DialogHeader>
//           {currentArticle && (
//             <div className="grid gap-4 py-4">
//               <div className="grid gap-2">
//                 <label htmlFor="title">Title</label>
//                 <Input
//                   id="title"
//                   name="title"
//                   value={currentArticle.title}
//                   onChange={handleInputChange}
//                 />
//                 {formErrors.title && (
//                   <p className="text-sm text-red-500">{formErrors.title}</p>
//                 )}
//               </div>
//               <div className="grid gap-2">
//                 <label htmlFor="content">Content</label>
//                 <Textarea
//                   id="content"
//                   name="content"
//                   value={currentArticle.content}
//                   onChange={handleInputChange}
//                   rows={6}
//                 />
//                 {formErrors.content && (
//                   <p className="text-sm text-red-500">{formErrors.content}</p>
//                 )}
//               </div>
//               <div className="grid gap-2">
//                 <label htmlFor="status">Status</label>
//                 <Select
//                   value={currentArticle.status}
//                   onValueChange={handleStatusChange}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select status" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Published">Published</SelectItem>
//                     <SelectItem value="Draft">Draft</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           )}
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={saveChanges}>Save changes</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default BlogsPage;
