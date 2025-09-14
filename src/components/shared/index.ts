// CONTEXT7 SOURCE: /vercel/next.js - Component architecture optimization patterns
// CONTEXT7 SOURCE: /facebook/react - Component composition patterns
// Phase 2 Shared Component Library - Centralized exports for component consolidation

// Button Components
export { Button } from './buttons/Button';
export { IconButton } from './buttons/IconButton';
export { LinkButton } from './buttons/LinkButton';
export { SubmitButton } from './buttons/SubmitButton';

// Card Components  
export { Card } from './cards/Card';
export { ContentCard } from './cards/ContentCard';
export { TestimonialCard } from './cards/TestimonialCard';
export { VideoCard } from './cards/VideoCard';

// Form Components
export { FormField } from './forms/FormField';
export { FormGroup } from './forms/FormGroup';
export { FormSelect } from './forms/FormSelect';
export { FormTextarea } from './forms/FormTextarea';

// Modal Components
export { Modal } from './modals/Modal';
export { ConfirmModal } from './modals/ConfirmModal';
export { VideoModal } from './modals/VideoModal';

// Layout Components
export { Container } from './layout/Container';
export { Grid } from './layout/Grid';
export { Section } from './layout/Section';
export { Spacer } from './layout/Spacer';

// Typography Components
export { Heading } from './typography/Heading';
export { Text } from './typography/Text';
export { Badge } from './typography/Badge';

// Interactive Components
export { Accordion } from './interactive/Accordion';
export { Tabs } from './interactive/Tabs';
export { Tooltip } from './interactive/Tooltip';
export { Dropdown } from './interactive/Dropdown';

// Loading Components
export { Spinner } from './loading/Spinner';
export { Skeleton } from './loading/Skeleton';
export { LoadingOverlay } from './loading/LoadingOverlay';

// Media Components
export { Image } from './media/Image';
export { Video } from './media/Video';
export { AudioPlayer } from './media/AudioPlayer';

// Navigation Components
export { Breadcrumb } from './navigation/Breadcrumb';
export { Pagination } from './navigation/Pagination';
export { StepIndicator } from './navigation/StepIndicator';

// Feedback Components
export { Alert } from './feedback/Alert';
export { Toast } from './feedback/Toast';
export { ProgressBar } from './feedback/ProgressBar';

// Utility Components
export { ErrorBoundary } from './utility/ErrorBoundary';
export { Portal } from './utility/Portal';
export { LazyLoad } from './utility/LazyLoad';

// Type exports for TypeScript support
export type { ButtonProps } from './buttons/Button';
export type { CardProps } from './cards/Card';
export type { ModalProps } from './modals/Modal';
export type { HeadingProps } from './typography/Heading';