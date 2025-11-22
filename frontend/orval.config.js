import { defineConfig } from 'orval'

export default defineConfig({
  'api-client': {
    input: '../backend/api/openapi.yaml',
    output: {
      namingConvention: 'kebab-case',
      target: './src/gen/api-client.ts',
      client: 'axios',
      override: {
        mutator: {
          path: './src/lib/api-client-instance.ts',
          name: 'customInstance',
        },
      },
    },
  },
  'zod-schemas': {
    input: '../backend/api/openapi.yaml',
    output: {
      namingConvention: 'kebab-case',
      target: './src/gen/zod-schemas.ts',
      client: 'zod',
    },
  },
})
