/**
 * TypeScript interfaces for Exam Papers feature
 * Following 2024-2025 React + TypeScript best practices
 * British English spelling throughout
 */

// Core Data Types
export interface ResourceCard {
	id: number;
	title: string;
	price: number;
	category: string;
	description: string;
	isFree: boolean;
}

export interface Category {
	id: string;
	name: string;
	count: number;
	subcategories?: Category[];
}

// Component Props Types
export interface CategoryItemProps {
	category: Category;
	selectedCategory: string | null;
	expandedCategories: Set<string>;
	onCategorySelect: (categoryId: string | null) => void;
	toggleCategory: (categoryId: string) => void;
	level?: number;
}

export interface CategoryTabBarProps {
	selectedCategory: string | null;
	onCategorySelect: (categoryId: string | null) => void;
	showFreeOnly: boolean;
	onFreeFilterChange: (value: boolean) => void;
}

export interface CategorySidebarProps {
	selectedCategory: string | null;
	onCategorySelect: (categoryId: string | null) => void;
	showFreeOnly: boolean;
	onFreeFilterChange: (value: boolean) => void;
}

export interface ResourceCardProps {
	resource: ResourceCard;
}

export interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

// State Management Types
export interface FilterState {
	selectedCategory: string | null;
	searchQuery: string;
	showFreeOnly: boolean;
	currentPage: number;
}

// Event Handler Types
export type CategorySelectHandler = (categoryId: string | null) => void;
export type ToggleCategoryHandler = (categoryId: string) => void;
export type FilterChangeHandler = (value: boolean) => void;
export type PageChangeHandler = (page: number) => void;
export type SearchChangeHandler = (query: string) => void;

// Utility Types
export type CategoryId = string;
export type CategoryTree = Category[];
export type ResourcesList = ResourceCard[];

// Constants Types
export interface ExamPapersConstants {
	ITEMS_PER_PAGE: number;
	DEFAULT_CATEGORY: string | null;
	FREE_FILTER_DEFAULT: boolean;
}