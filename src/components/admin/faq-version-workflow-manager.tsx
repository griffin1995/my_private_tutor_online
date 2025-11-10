'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
	useVersionControlStore,
	useCurrentUser,
	useVersionConfig,
} from '../../lib/faq-version-control/version-manager';
import type {
	FAQVersion,
	VersionWorkflowStatus,
	UserRole,
	VersionWorkflowConfig,
	ScheduledPublication,
	VersionRollback,
	BulkVersionOperation,
} from '../../types/faq-version-control';
interface FAQVersionWorkflowManagerProps {
	readonly className?: string;
	readonly versions: FAQVersion[];
	readonly selectedVersionId?: string;
	readonly onVersionSelect?: (versionId: string) => void;
	readonly permissions?: {
		readonly canReview: boolean;
		readonly canApprove: boolean;
		readonly canPublish: boolean;
		readonly canRollback: boolean;
		readonly canSchedule: boolean;
	};
}
export const FAQVersionWorkflowManager: React.FC<
	FAQVersionWorkflowManagerProps
> = ({
	className = '',
	versions,
	selectedVersionId,
	onVersionSelect,
	permissions = {
		canReview: true,
		canApprove: true,
		canPublish: true,
		canRollback: true,
		canSchedule: true,
	},
}) => {
	const [activeTab, setActiveTab] = useState<
		'pending' | 'scheduled' | 'history' | 'config'
	>('pending');
	const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
	const [showBulkActions, setShowBulkActions] = useState(false);
	const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
	const [rollbackModalOpen, setRollbackModalOpen] = useState(false);
	const [configModalOpen, setConfigModalOpen] = useState(false);
	const [actionInProgress, setActionInProgress] = useState<string | null>(null);
	const store = useVersionControlStore();
	const currentUser = useCurrentUser();
	const config = useVersionConfig();
	const workflowData = useMemo(() => {
		const pendingVersions = versions.filter((v) =>
			['draft', 'review', 'approved'].includes(v.workflow.status),
		);
		const scheduledPublications = store.scheduledPublications.filter(
			(pub) => pub.status === 'pending',
		);
		const workflowHistory = versions
			.filter((v) =>
				['published', 'archived', 'rejected'].includes(v.workflow.status),
			)
			.sort(
				(a, b) =>
					new Date(b.workflow.publishedAt || b.metadata.timestamp).getTime() -
					new Date(a.workflow.publishedAt || a.metadata.timestamp).getTime(),
			);
		return {
			pending: pendingVersions,
			scheduled: scheduledPublications,
			history: workflowHistory,
		};
	}, [versions, store.scheduledPublications]);
	const handleVersionAction = async (
		versionId: string,
		action: string,
		params?: any,
	) => {
		if (!currentUser || actionInProgress) return;
		try {
			setActionInProgress(`${action}-${versionId}`);
			switch (action) {
				case 'submit':
					await store.submitForReview(versionId);
					break;
				case 'approve':
					await store.approveVersion(versionId, params?.reviewNotes);
					break;
				case 'reject':
					await store.rejectVersion(versionId, params?.rejectionReason);
					break;
				case 'publish':
					await store.publishVersion(versionId);
					break;
				default:
					throw new Error(`Unknown action: ${action}`);
			}
			setSelectedVersions((prev) => prev.filter((id) => id !== versionId));
		} catch (error) {
			console.error(`Failed to ${action} version:`, error);
			alert(`Failed to ${action} version. Please try again.`);
		} finally {
			setActionInProgress(null);
		}
	};
	const handleBulkAction = async (
		action: BulkVersionOperation['operationType'],
		reason?: string,
	) => {
		if (selectedVersions.length === 0 || actionInProgress) return;
		try {
			setActionInProgress(`bulk-${action}`);
			const bulkOp: BulkVersionOperation = {
				operationType: action,
				versionIds: selectedVersions as readonly string[],
				operatorId: currentUser?.id || 'system',
				reason,
				notifyUsers: true,
			};
			const result = await store.bulkOperation(bulkOp);
			if (result.status === 'completed') {
				alert(`Successfully ${action}ed ${result.processedCount} versions.`);
			} else {
				alert(
					`Bulk operation completed with ${result.processedCount} successes and ${result.failedCount} failures.`,
				);
			}
			setSelectedVersions([]);
			setShowBulkActions(false);
		} catch (error) {
			console.error(`Bulk ${action} failed:`, error);
			alert(`Bulk ${action} failed. Please try again.`);
		} finally {
			setActionInProgress(null);
		}
	};
	const handleSchedulePublication = async (
		versionId: string,
		scheduledFor: string,
		timezone: string,
	) => {
		try {
			const scheduleId = await store.schedulePublication(
				versionId,
				scheduledFor,
				timezone,
			);
			alert('Publication scheduled successfully.');
			setScheduleModalOpen(false);
		} catch (error) {
			console.error('Failed to schedule publication:', error);
			alert('Failed to schedule publication. Please try again.');
		}
	};
	const handleRollback = async (
		fromVersion: string,
		toVersion: string,
		reason: string,
	) => {
		try {
			await store.rollbackVersion(fromVersion, toVersion, reason);
			alert('Version rollback completed successfully.');
			setRollbackModalOpen(false);
		} catch (error) {
			console.error('Failed to rollback version:', error);
			alert('Version rollback failed. Please try again.');
		}
	};
	const canPerformAction = (action: string, version: FAQVersion): boolean => {
		if (!currentUser) return false;
		const userRole = currentUser.role;
		const versionStatus = version.workflow.status;
		switch (action) {
			case 'submit':
				return versionStatus === 'draft' && ['author', 'admin'].includes(userRole);
			case 'review':
				return (
					versionStatus === 'review' &&
					['reviewer', 'admin'].includes(userRole) &&
					permissions.canReview
				);
			case 'approve':
				return (
					versionStatus === 'review' &&
					['reviewer', 'admin'].includes(userRole) &&
					permissions.canApprove
				);
			case 'reject':
				return (
					versionStatus === 'review' &&
					['reviewer', 'admin'].includes(userRole) &&
					permissions.canApprove
				);
			case 'publish':
				return (
					versionStatus === 'approved' &&
					['publisher', 'admin'].includes(userRole) &&
					permissions.canPublish
				);
			case 'schedule':
				return (
					versionStatus === 'approved' &&
					['publisher', 'admin'].includes(userRole) &&
					permissions.canSchedule
				);
			case 'rollback':
				return userRole === 'admin' && permissions.canRollback;
			default:
				return false;
		}
	};
	const renderPendingTab = () => (
		<div className='space-y-4'>
			{selectedVersions.length > 0 && (
				<div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-4'>
							<span className='text-sm font-medium text-blue-900'>
								{selectedVersions.length} version
								{selectedVersions.length !== 1 ? 's' : ''} selected
							</span>
							<button
								onClick={() => setSelectedVersions([])}
								className='text-sm text-blue-700 hover:text-blue-800'>
								Clear selection
							</button>
						</div>

						<div className='flex items-center space-x-2'>
							{permissions.canApprove && (
								<button
									onClick={() => handleBulkAction('approve')}
									disabled={!!actionInProgress}
									className='px-3 py-1 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 disabled:opacity-50 transition-colors'>
									Bulk Approve
								</button>
							)}
							{permissions.canPublish && (
								<button
									onClick={() => handleBulkAction('publish')}
									disabled={!!actionInProgress}
									className='px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 disabled:opacity-50 transition-colors'>
									Bulk Publish
								</button>
							)}
							<button
								onClick={() => handleBulkAction('archive')}
								disabled={!!actionInProgress}
								className='px-3 py-1 bg-gray-600 text-white text-sm font-medium rounded hover:bg-gray-700 disabled:opacity-50 transition-colors'>
								Bulk Archive
							</button>
						</div>
					</div>
				</div>
			)}

			<div className='space-y-3'>
				{workflowData.pending.length === 0 ?
					<div className='text-center py-12 text-gray-500'>
						<div className='text-4xl mb-4'>📝</div>
						<h3 className='text-lg font-medium text-gray-900 mb-2'>
							No pending versions
						</h3>
						<p>All versions are up to date. New submissions will appear here.</p>
					</div>
				:	workflowData.pending.map((version) => (
						<WorkflowVersionCard
							key={version.id}
							version={version}
							isSelected={selectedVersions.includes(version.id)}
							onSelect={(selected) => {
								setSelectedVersions((prev) =>
									selected ?
										[...prev, version.id]
									:	prev.filter((id) => id !== version.id),
								);
							}}
							onAction={handleVersionAction}
							canPerformAction={canPerformAction}
							actionInProgress={
								actionInProgress === `approve-${version.id}` ||
								actionInProgress === `reject-${version.id}` ||
								actionInProgress === `publish-${version.id}`
							}
							currentUser={currentUser}
							onClick={() => onVersionSelect?.(version.id)}
						/>
					))
				}
			</div>
		</div>
	);
	const renderScheduledTab = () => (
		<div className='space-y-4'>
			{workflowData.scheduled.length === 0 ?
				<div className='text-center py-12 text-gray-500'>
					<div className='text-4xl mb-4'>📅</div>
					<h3 className='text-lg font-medium text-gray-900 mb-2'>
						No scheduled publications
					</h3>
					<p>Scheduled content will appear here before publication.</p>
				</div>
			:	workflowData.scheduled.map((publication) => (
					<ScheduledPublicationCard
						key={publication.id}
						publication={publication}
						onCancel={() => {
							console.log('Cancel publication:', publication.id);
						}}
						onReschedule={() => {
							console.log('Reschedule publication:', publication.id);
						}}
					/>
				))
			}
		</div>
	);
	const renderHistoryTab = () => (
		<div className='space-y-4'>
			{workflowData.history.length === 0 ?
				<div className='text-center py-12 text-gray-500'>
					<div className='text-4xl mb-4'>📚</div>
					<h3 className='text-lg font-medium text-gray-900 mb-2'>
						No workflow history
					</h3>
					<p>Completed workflow actions will appear here.</p>
				</div>
			:	workflowData.history.map((version) => (
					<WorkflowHistoryCard
						key={version.id}
						version={version}
						onRollback={
							permissions.canRollback ?
								() => {
									setRollbackModalOpen(true);
								}
							:	undefined
						}
						onClick={() => onVersionSelect?.(version.id)}
					/>
				))
			}
		</div>
	);
	const renderConfigTab = () => (
		<div className='space-y-6'>
			<WorkflowConfigurationPanel
				config={config.defaultWorkflow}
				onUpdate={async (updates) => {
					await store.updateWorkflowConfig(updates);
				}}
				permissions={{
					canEditConfig: currentUser?.role === 'admin',
				}}
			/>
		</div>
	);
	return (
		<div className={`bg-white rounded-lg border shadow-sm ${className}`}>
			<div className='px-6 py-4 border-b border-gray-200'>
				<div className='flex items-center justify-between'>
					<div>
						<h2 className='text-xl font-semibold text-gray-900'>Workflow Manager</h2>
						<p className='text-sm text-gray-600 mt-1'>
							Manage version approvals, publishing, and workflow configuration
						</p>
					</div>

					<div className='flex items-center space-x-3'>
						<WorkflowStatusIndicator
							pendingCount={workflowData.pending.length}
							scheduledCount={workflowData.scheduled.length}
							todayCount={
								workflowData.history.filter((v) => {
									const publishDate = v.workflow.publishedAt || v.metadata.timestamp;
									return publishDate.startsWith(new Date().toISOString().split('T')[0]);
								}).length
							}
						/>
					</div>
				</div>

				<div className='mt-4 border-b border-gray-200'>
					<nav className='flex space-x-8'>
						{[
							{
								id: 'pending',
								label: 'Pending',
								count: workflowData.pending.length,
							},
							{
								id: 'scheduled',
								label: 'Scheduled',
								count: workflowData.scheduled.length,
							},
							{
								id: 'history',
								label: 'History',
								count: workflowData.history.length,
							},
							{
								id: 'config',
								label: 'Configuration',
								count: null,
							},
						].map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id as typeof activeTab)}
								className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
								{tab.label}
								{tab.count !== null && tab.count > 0 && (
									<span className='ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800'>
										{tab.count}
									</span>
								)}
							</button>
						))}
					</nav>
				</div>
			</div>

			<div className='p-6'>
				{activeTab === 'pending' && renderPendingTab()}
				{activeTab === 'scheduled' && renderScheduledTab()}
				{activeTab === 'history' && renderHistoryTab()}
				{activeTab === 'config' && renderConfigTab()}
			</div>

			{scheduleModalOpen && (
				<SchedulePublicationModal
					versionId={selectedVersionId || ''}
					onSchedule={handleSchedulePublication}
					onClose={() => setScheduleModalOpen(false)}
				/>
			)}

			{rollbackModalOpen && (
				<RollbackVersionModal
					versions={versions}
					onRollback={handleRollback}
					onClose={() => setRollbackModalOpen(false)}
				/>
			)}

			{configModalOpen && (
				<WorkflowConfigModal
					config={config.defaultWorkflow}
					onSave={async (updates) => {
						await store.updateWorkflowConfig(updates);
						setConfigModalOpen(false);
					}}
					onClose={() => setConfigModalOpen(false)}
				/>
			)}
		</div>
	);
};
interface WorkflowVersionCardProps {
	readonly version: FAQVersion;
	readonly isSelected: boolean;
	readonly onSelect: (selected: boolean) => void;
	readonly onAction: (
		versionId: string,
		action: string,
		params?: any,
	) => Promise<void>;
	readonly canPerformAction: (action: string, version: FAQVersion) => boolean;
	readonly actionInProgress: boolean;
	readonly currentUser: any;
	readonly onClick: () => void;
}
const WorkflowVersionCard: React.FC<WorkflowVersionCardProps> = ({
	version,
	isSelected,
	onSelect,
	onAction,
	canPerformAction,
	actionInProgress,
	currentUser,
	onClick,
}) => {
	const [reviewNotes, setReviewNotes] = useState('');
	const [showReviewForm, setShowReviewForm] = useState(false);
	const handleApprove = () => {
		onAction(version.id, 'approve', {
			reviewNotes,
		});
		setReviewNotes('');
		setShowReviewForm(false);
	};
	const handleReject = () => {
		const rejectionReason = prompt('Please provide a reason for rejection:');
		if (rejectionReason) {
			onAction(version.id, 'reject', {
				rejectionReason,
			});
		}
	};
	return (
		<div
			className={`border rounded-lg p-4 transition-all ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
			<div className='flex items-start justify-between'>
				<div className='flex items-start space-x-3 flex-1'>
					<input
						type='checkbox'
						checked={isSelected}
						onChange={(e) => onSelect(e.target.checked)}
						className='mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
					/>

					<div
						className='flex-1 cursor-pointer'
						onClick={onClick}>
						<div className='flex items-center space-x-2'>
							<h4 className='text-lg font-medium text-gray-900'>
								v{version.versionString}
							</h4>
							<span
								className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getWorkflowStatusBadgeStyle(version.workflow.status)}`}>
								{formatWorkflowStatus(version.workflow.status)}
							</span>
							{version.metadata.changeType && (
								<span
									className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getChangeTypeBadgeStyle(version.metadata.changeType)}`}>
									{version.metadata.changeType}
								</span>
							)}
						</div>

						<p className='text-sm text-gray-600 mt-1'>
							{version.metadata.changeReason}
						</p>

						<div className='flex items-center space-x-4 text-xs text-gray-500 mt-2'>
							<span>By {version.metadata.author}</span>
							<span>•</span>
							<span>
								{new Date(version.metadata.timestamp).toLocaleString('en-GB')}
							</span>
							{version.workflow.submittedAt && (
								<>
									<span>•</span>
									<span>
										Submitted{' '}
										{new Date(version.workflow.submittedAt).toLocaleDateString('en-GB')}
									</span>
								</>
							)}
						</div>
					</div>
				</div>

				<div className='flex items-center space-x-2 ml-4'>
					{canPerformAction('submit', version) && (
						<button
							onClick={() => onAction(version.id, 'submit')}
							disabled={actionInProgress}
							className='px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 disabled:opacity-50 transition-colors'>
							Submit for Review
						</button>
					)}

					{canPerformAction('approve', version) && (
						<>
							<button
								onClick={() => setShowReviewForm(!showReviewForm)}
								disabled={actionInProgress}
								className='px-3 py-1 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 disabled:opacity-50 transition-colors'>
								Review
							</button>
							<button
								onClick={handleReject}
								disabled={actionInProgress}
								className='px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 disabled:opacity-50 transition-colors'>
								Reject
							</button>
						</>
					)}

					{canPerformAction('publish', version) && (
						<button
							onClick={() => onAction(version.id, 'publish')}
							disabled={actionInProgress}
							className='px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 disabled:opacity-50 transition-colors'>
							Publish
						</button>
					)}
				</div>
			</div>

			{showReviewForm && (
				<div className='mt-4 p-3 bg-gray-50 rounded-md'>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						Review Notes (Optional)
					</label>
					<textarea
						value={reviewNotes}
						onChange={(e) => setReviewNotes(e.target.value)}
						rows={3}
						className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm'
						placeholder='Add notes about this review...'
					/>
					<div className='flex items-center space-x-2 mt-2'>
						<button
							onClick={handleApprove}
							disabled={actionInProgress}
							className='px-3 py-1 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 disabled:opacity-50 transition-colors'>
							Approve
						</button>
						<button
							onClick={() => setShowReviewForm(false)}
							className='px-3 py-1 bg-gray-600 text-white text-xs font-medium rounded hover:bg-gray-700 transition-colors'>
							Cancel
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
const getWorkflowStatusBadgeStyle = (status: VersionWorkflowStatus): string => {
	switch (status) {
		case 'draft':
			return 'bg-gray-100 text-gray-800';
		case 'review':
			return 'bg-yellow-100 text-yellow-800';
		case 'approved':
			return 'bg-green-100 text-green-800';
		case 'published':
			return 'bg-blue-100 text-blue-800';
		case 'archived':
			return 'bg-purple-100 text-purple-800';
		case 'rejected':
			return 'bg-red-100 text-red-800';
		default:
			return 'bg-gray-100 text-gray-800';
	}
};
const getChangeTypeBadgeStyle = (changeType: string): string => {
	switch (changeType) {
		case 'major':
			return 'bg-red-100 text-red-800';
		case 'minor':
			return 'bg-yellow-100 text-yellow-800';
		case 'patch':
			return 'bg-green-100 text-green-800';
		case 'prerelease':
			return 'bg-purple-100 text-purple-800';
		case 'build':
			return 'bg-blue-100 text-blue-800';
		default:
			return 'bg-gray-100 text-gray-800';
	}
};
const formatWorkflowStatus = (status: VersionWorkflowStatus): string => {
	switch (status) {
		case 'draft':
			return 'Draft';
		case 'review':
			return 'In Review';
		case 'approved':
			return 'Approved';
		case 'published':
			return 'Published';
		case 'archived':
			return 'Archived';
		case 'rejected':
			return 'Rejected';
		default:
			return status;
	}
};
const ScheduledPublicationCard = ({
	publication,
	onCancel,
	onReschedule,
}: any) => <div>Scheduled Publication Card</div>;
const WorkflowHistoryCard = ({ version, onRollback, onClick }: any) => (
	<div>Workflow History Card</div>
);
const WorkflowStatusIndicator = ({
	pendingCount,
	scheduledCount,
	todayCount,
}: any) => <div>Status Indicator</div>;
const WorkflowConfigurationPanel = ({ config, onUpdate, permissions }: any) => (
	<div>Configuration Panel</div>
);
const SchedulePublicationModal = ({ versionId, onSchedule, onClose }: any) => (
	<div>Schedule Modal</div>
);
const RollbackVersionModal = ({ versions, onRollback, onClose }: any) => (
	<div>Rollback Modal</div>
);
const WorkflowConfigModal = ({ config, onSave, onClose }: any) => (
	<div>Config Modal</div>
);
export default FAQVersionWorkflowManager;
