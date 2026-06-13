// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · barrel export · 26 components
// ════════════════════════════════════════════════════════════════════

// ── Layout ─────────────────────────────────────────────────────────
export { Sidebar, applySidebarStateEarly } from './Sidebar';
export type { SidebarProps } from './Sidebar';

export { PoweredBy } from './PoweredBy';
export type { PoweredByProps } from './PoweredBy';

export { Topbar } from './Topbar';
export type { TopbarProps } from './Topbar';

export { SectionHeader } from './SectionHeader';
export type { SectionHeaderProps } from './SectionHeader';

// ── Atoms ──────────────────────────────────────────────────────────
export { Button } from './Button';
export type { ButtonProps } from './Button';

export { Pill } from './Pill';
export type { PillProps } from './Pill';

export { Card } from './Card';
export type { CardProps } from './Card';

export { Stat } from './Stat';
export type { StatProps } from './Stat';

export { Icon } from './Icon';
export type { IconProps } from './Icon';

export { FataxSprite } from './sprite';

export { Avatar, AvatarStack } from './Avatar';
export type { AvatarProps, AvatarStackProps, AvatarSize, AvatarTone } from './Avatar';

// ── Form ───────────────────────────────────────────────────────────
export { Input } from './Input';
export type { InputProps } from './Input';

export { Toggle } from './Toggle';
export type { ToggleProps } from './Toggle';

export { Checkbox } from './Checkbox';
export type { CheckboxProps } from './Checkbox';

export { RadioGroup } from './Radio';
export type { RadioOption, RadioGroupProps } from './Radio';

export { Select } from './Select';
export type { SelectProps, SelectOption } from './Select';

export { Datepicker, formatDateBR } from './Datepicker';
export type { DatepickerProps } from './Datepicker';

// ── Disclosure / Overlay ───────────────────────────────────────────
export { Tabs } from './Tabs';
export type { TabsProps, TabItem } from './Tabs';

export { Modal, ConfirmModal } from './Modal';
export type { ModalProps, ConfirmModalProps } from './Modal';

export { Drawer } from './Drawer';
export type { DrawerProps } from './Drawer';

export { Tooltip } from './Tooltip';
export type { TooltipProps, TooltipPlacement } from './Tooltip';

// ── Feedback ───────────────────────────────────────────────────────
export { Alert } from './Alert';
export type { AlertProps, AlertVariant } from './Alert';

export { Skeleton } from './Skeleton';
export type { SkeletonProps } from './Skeleton';

export { Spinner } from './Spinner';
export type { SpinnerProps } from './Spinner';

export { EmptyState, ErrorState } from './StatePanel';
export type { EmptyStateProps, ErrorStateProps } from './StatePanel';

// ── Data Viz ───────────────────────────────────────────────────────
export { Sparkline } from './Sparkline';
export type { SparklineProps } from './Sparkline';

export { Funnel } from './Funnel';
export type { FunnelProps, FunnelStage } from './Funnel';

// ── Types ──────────────────────────────────────────────────────────
export type {
  IconName,
  SemanticVariant,
  ButtonVariant,
  ButtonSize,
  NavItem,
  NavGroup,
} from './types';
