import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default [{
  input: './src/y-prosemirror.js',
  output: [{
    name: 'Y',
    file: 'dist/y-prosemirror.cjs',
    format: 'cjs',
    sourcemap: true,
    paths: path => {
      if (/^lib0\//.test(path)) {
        return `lib0/dist/${path.slice(5, -3)}.cjs`
      }
      if (/^y-protocols\//.test(path)) {
        return `y-protocols/dist/${path.slice(12, -3)}.cjs`
      }
      return path
    }
  }],
  external: id => /^(lib0|y-protocols|prosemirror|yjs)/.test(id)
}, {
  input: './test/index.js',
  output: {
    name: 'test',
    file: 'dist/test.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    nodeResolve({
      mainFields: ['module', 'browser', 'main']
    }),
    commonjs()
  ]
}, {
  input: './demo/prosemirror.js',
  output: {
    name: 'demo',
    file: 'demo/dist/prosemirror.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    nodeResolve({
      mainFields: ['module', 'browser', 'main']
    }),
    commonjs()
  ]
}, {
  input: './test/index.node.js',
  output: {
    name: 'test',
    file: 'dist/test.cjs',
    format: 'cjs',
    sourcemap: true,
    paths: path => {
      if (/^lib0\//.test(path)) {
        return `lib0/dist/${path.slice(5, -3)}.cjs`
      }
    }
  },
  plugins: [
    nodeResolve({
      mainFields: ['module', 'main']
    })
  ],
  external: id => /^(lib0|prosemirror|fs|path|jsdom|isomorphic)/.test(id)
}]
