import { Config } from 'bili'

const config: Config = {
  input: 'src/index.ts',
  babel: {
    minimal: true
  },
  output: {
    fileName: 'objql.[format].js',
    format: ['esm', 'cjs', 'umd'],
    moduleName: 'objql'
  },
  plugins: {
    typescript2: {
      tsconfigOverride: {
        include: ['src'],
        compilerOptions: {
          declaration: true
        }
      }
    }
  }
}

export default config
