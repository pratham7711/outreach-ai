declare module "@pratham7711/ui" {
  import React from "react";

  // Button
  export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "glow";
  export type ButtonSize = "sm" | "md" | "lg";
  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    fullWidth?: boolean;
    children?: React.ReactNode;
  }
  export const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

  // Card
  export type CardVariant = "glass" | "solid" | "outlined";
  export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: CardVariant;
    clickable?: boolean;
    noPadding?: boolean;
    children?: React.ReactNode;
  }
  export const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;

  // Badge
  export type BadgeVariant = "accent" | "success" | "warning" | "danger" | "neutral";
  export type BadgeSize = "sm" | "md";
  export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    size?: BadgeSize;
    outlined?: boolean;
    dot?: boolean;
    children?: React.ReactNode;
  }
  export const Badge: React.FC<BadgeProps>;

  // StatCard
  export type TrendDirection = "up" | "down" | "neutral";
  export interface StatCardProps {
    value: string | number;
    label: string;
    trend?: TrendDirection;
    trendLabel?: string;
    icon?: React.ReactNode;
    className?: string;
  }
  export const StatCard: React.FC<StatCardProps>;

  // SectionHeader
  export interface SectionHeaderProps {
    overline?: string;
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    centered?: boolean;
    as?: "h1" | "h2" | "h3" | "h4";
    className?: string;
  }
  export const SectionHeader: React.FC<SectionHeaderProps>;

  // GlassPanel
  export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    blur?: "sm" | "md" | "lg";
    children?: React.ReactNode;
  }
  export const GlassPanel: React.FC<GlassPanelProps>;

  // Tag
  export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
    children?: React.ReactNode;
  }
  export const Tag: React.FC<TagProps>;

  // Avatar
  export interface AvatarProps {
    src?: string;
    alt?: string;
    name?: string;
    size?: "sm" | "md" | "lg";
    className?: string;
  }
  export const Avatar: React.FC<AvatarProps>;

  // Input
  export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    iconLeft?: React.ReactNode;
  }
  export const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

  // LoadingSpinner
  export interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg";
    className?: string;
  }
  export const LoadingSpinner: React.FC<LoadingSpinnerProps>;

  // Tabs
  export interface TabItem { label: string; value: string; icon?: React.ReactNode }
  export type TabsVariant = "pills" | "underline" | "solid"
  export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
    items: TabItem[];
    activeTab: string;
    onChange: (value: string) => void;
    variant?: TabsVariant;
  }
  export const Tabs: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>>;

  // Dropdown
  export interface DropdownItem { label: string; icon?: React.ReactNode; onClick?: () => void; danger?: boolean }
  export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    trigger: React.ReactNode;
    items: DropdownItem[];
    align?: "left" | "right";
  }
  export const Dropdown: React.ForwardRefExoticComponent<DropdownProps & React.RefAttributes<HTMLDivElement>>;

  // ProgressBar
  export type ProgressBarVariant = "accent" | "success" | "warning" | "danger";
  export type ProgressBarSize = "sm" | "md";
  export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number;
    variant?: ProgressBarVariant;
    size?: ProgressBarSize;
    showLabel?: boolean;
    animated?: boolean;
  }
  export const ProgressBar: React.ForwardRefExoticComponent<ProgressBarProps & React.RefAttributes<HTMLDivElement>>;

  // Toggle
  export type ToggleSize = "sm" | "md";
  export interface ToggleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    size?: ToggleSize;
    disabled?: boolean;
  }
  export const Toggle: React.ForwardRefExoticComponent<ToggleProps & React.RefAttributes<HTMLDivElement>>;

  // Breadcrumb
  export interface BreadcrumbItem { label: string; href?: string }
  export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
    items: BreadcrumbItem[];
    separator?: React.ReactNode;
  }
  export const Breadcrumb: React.ForwardRefExoticComponent<BreadcrumbProps & React.RefAttributes<HTMLElement>>;

  // Alert
  export type AlertVariant = "info" | "success" | "warning" | "danger";
  export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant: AlertVariant;
    title?: string;
    children?: React.ReactNode;
    onClose?: () => void;
    icon?: React.ReactNode;
  }
  export const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;
}
