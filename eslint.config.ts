import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    tooling: true,
    stylistic: {
      commaDangle: 'never',
      braceStyle: '1tbs'
    }
  }
}).overrideRules({
  'import/first': 'off',
  'import/order': 'off',
  'vue/multi-word-component-names': 'off',
  'vue/max-attributes-per-line': ['error', { singleline: 5 }],
  '@typescript-eslint/ban-types': 'off',
  '@typescript-eslint/no-empty-object-type': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  '@stylistic/comma-dangle': 'off',
  '@stylistic/quotes': 'off',
  '@stylistic/quote-props': 'off',
  '@typescript-eslint/ban-ts-comment': 'warn',
  '@stylistic/operator-linebreak': 'off',
  '@stylistic/arrow-parens': 'off',
  '@stylistic/indent-binary-ops': 'off',
  'vue/singleline-html-element-content-newline': 'off',
  'vue/operator-linebreak': 'off',
  '@stylistic/member-delimiter-style': 'off',
  '@stylistic/indent': 'off',
  'vue/html-indent': 'off',
  'vue/html-self-closing': 'off',
  'vue/no-deprecated-slot-attribute': 'off'
})
