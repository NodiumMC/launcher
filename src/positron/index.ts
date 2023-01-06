import { singleton } from 'tsyringe'

export const Service: ClassDecorator = target => singleton()(target as any)
export const Module: ClassDecorator = target => singleton()(target as any)
