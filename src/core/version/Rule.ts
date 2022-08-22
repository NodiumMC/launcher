import { Rule as RuleType, RuleContainer } from 'core'
import { is64, release } from 'native/os'
import { os } from 'core'

export interface RuleResult {
  allow: boolean
  reasons: string[]
  value?: string[]
  features?: RuleType['features']
}

export const ParseRule = async (
  rule: RuleType,
  features: string[] = [],
): Promise<RuleResult> => {
  const currentOs = rule.os ? await os() : null
  const currentArch = rule.os ? ((await is64()) ? 'x64' : 'x32') : null
  const osVersion = rule.os ? await release() : null
  const reasons: string[] = []
  if (rule.os) {
    const ruleOs = rule.os
    if (ruleOs.arch === 'x86') ruleOs.arch = 'x32'
    if (currentOs === 'unknown')
      reasons.push(
        'Unknown platform. Supported platforms: Windows, Macos, Linux',
      )
    else if (currentOs !== ruleOs.name)
      reasons.push(`Incompatible platform. Expected: ${ruleOs.name}`)
    if (ruleOs.version && osVersion && !RegExp(ruleOs.version).test(osVersion))
      reasons.push(
        `Incompatible os version. Expected: ${ruleOs.name} v${ruleOs.version}`,
      )
    if (ruleOs.arch && currentArch && currentArch !== ruleOs.arch)
      reasons.push(`Incompatible arch. Expected: ${ruleOs.arch}`)
  }
  const allow =
    reasons.length === 0 &&
    (!rule.features ||
      Object.keys(rule.features).every(f => features.includes(f)))
  return {
    allow: rule.action === 'allow' ? allow : !allow,
    reasons,
    features: rule.features,
  }
}

export const ParseRules = async (
  { rules = [], value }: RuleContainer,
  allowFeatures: string[] = [],
): Promise<RuleResult> => {
  const rrs = await rules.mapAsync(rule => ParseRule(rule, allowFeatures))
  const allow = rrs.every(rule => rule.allow)
  const reasons = rrs.map(rule => rule.reasons).flat()
  const features = Object.assign({}, ...rrs.map(rule => rule.features))
  return {
    allow,
    value: typeof value === 'string' ? [value] : value,
    features,
    reasons,
  }
}

export const isRuled = (obj: any): obj is RuleContainer => !!obj.rules
