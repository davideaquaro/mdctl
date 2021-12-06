const Fault = require('@medable/mdctl-core/fault'),
      FileSource = require('./file'),
      GitSource = require('./git'),
      RegistrySource = require('./registry'),
      sources = {
        file: FileSource,
        git: GitSource,
        registry: RegistrySource
      },
      resolveSource = (name, path, options) => {
        if (!name) {
          throw Fault.create('mdctl.package.error', { reason: 'Missing pacakge name.' })
        }
        let sourceType = 'registry'
        if (path.indexOf('file://') > -1 || path === '.') {
          sourceType = 'file'
        } else if (path.indexOf('git+https://') > -1) {
          sourceType = 'git'
        }
        if (sourceType === 'registry') {
          throw new Error('Registry source is not implemented yet')
        }
        return new sources[sourceType](name, path, options)
      }

module.exports = {
  FileSource,
  GitSource,
  RegistrySource,
  FactorySource: (name, path, options) => resolveSource(name, path, options)
}