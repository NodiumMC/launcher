import { ReactNode } from 'react'

export interface ClassNameable  { className?: string }
export interface OnClickable { onClick?: <T extends (...args: Parameters<T>) => ReturnType<T>>(...args: Parameters<T>) => ReturnType<T> }
export interface HasChildren { children?: ReactNode }
export interface Valuable<T> { value?: T }
export interface DataEntriable<T> extends Valuable<T> { onChange?: (newValue: T) => any }
