import { XMLParser } from 'fast-xml-parser'
import { LogEvent } from 'core/logging/type'

const parser = new XMLParser({ ignoreAttributes: false })

export const parse = (line: string): LogEvent => {
  const result = parser.parse(line)['log4j:Event']
  return {
    level: result['@_level'],
    logger: result['@_logger'],
    timestamp: result['@_timestamp'],
    thread: result['@_thread'],
    message: result['log4j:Message'],
    throwable: result['log4j:Throwable'],
  }
}
