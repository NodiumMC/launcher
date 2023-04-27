import { readFile, writeFile, readdir, stat } from 'node:fs/promises'
import { join, resolve } from 'node:path'

const root = '..'
const tsconfigPath = join(root, 'tsconfig.json')

const tsconfig = await readFile(tsconfigPath).then(buffer => JSON.parse(buffer.toString()))

tsconfig.compilerOptions.paths = {}

const paths = tsconfig.compilerOptions.paths

await (async function walk(path) {
  const entries = await readdir(path).then(entries => entries.map(async entry => ({
    filepath: join(path, entry),
    filename: entry,
    filestat: await stat(join(path, entry)),
  })))

  for await (const { filepath, filename, filestat } of entries) {
    if (filename === 'package.json' && path !== root) {
      const { name } = await readFile(filepath).then(buffer => JSON.parse(buffer.toString()))
      paths[name] = [resolve(path).replaceAll(resolve(root), '').slice(1)]
    } else if (filestat.isDirectory() && !['.yarn', 'node_modules'].includes(filename) && !filename.startsWith('.')) {
      await walk(filepath)
    }
  }
})(root)

await writeFile(tsconfigPath, JSON.stringify(tsconfig, null, 2) + '\n')
