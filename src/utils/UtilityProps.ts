import { ReactNode } from 'react'

export interface ClassNameable  { className?: string }
export interface OnClickable { onClick?: (...args: any[]) => any }
export interface HasChildren<T = ReactNode>{ children?: T }
export interface Valuable<T> { value?: T }
export interface DataEntriable<T> extends Valuable<T> { onChange?: (newValue: T) => any }
export interface As { as?: any }
export interface Styleable { style?: any }
