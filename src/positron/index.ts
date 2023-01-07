import { autoInjectable, singleton } from '@nodium/tsyringe'

export const Service: ClassDecorator = target => singleton()(target as any)
export const Module: ClassDecorator = target => singleton()(target as any)
export const DynamicModule: ClassDecorator = target => autoInjectable()(target as any)
export const DynamicService: ClassDecorator = target => autoInjectable()(target as any)
