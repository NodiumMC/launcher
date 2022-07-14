import { Rule as RuleType } from './version'
import { arch, is64, release } from '../../os/info'
import { os } from '../utils/os'

export interface RuleResult {
  allow: boolean
  reasons: string[]
  values?: string[]
  features?: RuleType['features']
}

export const Rule = async (rule: RuleType): Promise<RuleResult> => {
  const currentOs = rule.os ? await os() : null
  const currentArch = rule.os ? (await is64() ? 'x64' : 'x32') : null
  const osVersion = rule.os ? await release() : null
  let reasons: string[] = []
  if (rule.os) {
    const ruleOs = rule.os
    if (ruleOs.arch === 'x86') ruleOs.arch = 'x32'
    if (currentOs === 'unknown') reasons.push('Unknown platform. Supported platforms: Windows, Macos, Linux')
    else if (currentOs !== ruleOs.name) reasons.push(`Incompatible platform. Expected: ${ruleOs.name}`)
    if (ruleOs.version && osVersion && !RegExp(ruleOs.version).test(osVersion))
      reasons.push(`Incompatible os version. Expected: ${ruleOs.name} v${ruleOs.version}`)
    if (ruleOs.arch && currentArch && currentArch !== ruleOs.arch)
      reasons.push(`Incompatible arch. Expected: ${ruleOs.arch}`)
  }
  const allow = reasons.length === 0
  return {
    allow: rule.action === 'allow' ? allow : !allow,
    reasons,
    values: typeof rule.value === 'string' ? [rule.value] : rule.value,
    features: rule.features,
  }
}

export const Rules = async (rules: RuleType[]): Promise<RuleResult> => {
  const rrs = await Promise.all(rules.map(rule => Rule(rule)))
  const allow = rrs.every(rule => rule.allow)
  const reasons = rrs.map(rule => rule.reasons).reduce((a, b) => [...a, ...b])
  const features = Object.assign({}, ...rrs.map(rule => rule.features))
  const values = rrs.map(rule => rule.values ?? []).flat()
  return {
    allow, values, features, reasons,
  }
}
