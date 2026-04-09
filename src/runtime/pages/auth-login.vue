<script setup lang="ts">
import { navigateTo, useRuntimeConfig, useCookie } from '#app'
import { definePageMeta, onMounted, onUnmounted, ref } from '#imports'

definePageMeta({
  layout: false,
  middleware: 'shopify-guest'
})

const shop = ref('')
const error = ref('')
const loading = ref(false)

let pollTimer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  const redirectTo = useCookie('shopify-redirect-to')

  pollTimer = setInterval(() => {
    const shopDomain = window.shopify?.config?.shop
    if (shopDomain) {
      clearInterval(pollTimer)
      const target = redirectTo.value || '/'
      redirectTo.value = null
      navigateTo(target)
    }
  }, 1000)
})

onUnmounted(() => {
  if (pollTimer) clearInterval(pollTimer)
})

async function handleSubmit() {
  error.value = ''
  const value = shop.value.trim()

  if (!value) {
    error.value = 'Please enter your shop domain'
    return
  }

  loading.value = true

  try {
    const config = useRuntimeConfig()
    const authPrefix = config.public.shopify.authPathPrefix
    const domain = value.includes('.myshopify.com')
      ? value
      : `${value}.myshopify.com`
    await navigateTo(`${authPrefix}?shop=${encodeURIComponent(domain)}`, {
      external: true
    })
  } catch (e: any) {
    error.value = e.message || 'Something went wrong'
    loading.value = false
  }
}
</script>

<template>
  <div class="shopify-login">
    <div class="shopify-login-card">
      <div class="shopify-login-header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="44"
          viewBox="0 0 256 292"
        >
          <path
            fill="#95bf46"
            d="M223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357a19614 19614 0 0 0-23.383-1.743s-15.507-15.395-17.209-17.099c-1.703-1.703-5.029-1.185-6.32-.805c-.19.056-3.388 1.043-8.678 2.68c-5.18-14.906-14.322-28.604-30.405-28.604c-.444 0-.901.018-1.358.044C129.31 3.407 123.644.779 118.75.779c-37.465 0-55.364 46.835-60.976 70.635c-14.558 4.511-24.9 7.718-26.221 8.133c-8.126 2.549-8.383 2.805-9.45 10.462C21.3 95.806.038 260.235.038 260.235l165.678 31.042l89.77-19.42S223.973 58.8 223.775 57.34M156.49 40.848l-14.019 4.339c.005-.988.01-1.96.01-3.023c0-9.264-1.286-16.723-3.349-22.636c8.287 1.04 13.806 10.469 17.358 21.32m-27.638-19.483c2.304 5.773 3.802 14.058 3.802 25.238c0 .572-.005 1.095-.01 1.624c-9.117 2.824-19.024 5.89-28.953 8.966c5.575-21.516 16.025-31.908 25.161-35.828m-11.131-10.537c1.617 0 3.246.549 4.805 1.622c-12.007 5.65-24.877 19.88-30.312 48.297l-22.886 7.088C75.694 46.16 90.81 10.828 117.72 10.828"
          />
          <path
            fill="#5e8e3e"
            d="M221.237 54.983a19614 19614 0 0 0-23.383-1.743s-15.507-15.395-17.209-17.099c-.637-.634-1.496-.959-2.394-1.099l-12.527 256.233l89.762-19.418S223.972 58.8 223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357"
          />
          <path
            fill="#fff"
            d="m135.242 104.585l-11.069 32.926s-9.698-5.176-21.586-5.176c-17.428 0-18.305 10.937-18.305 13.693c0 15.038 39.2 20.8 39.2 56.024c0 27.713-17.577 45.558-41.277 45.558c-28.44 0-42.984-17.7-42.984-17.7l7.615-25.16s14.95 12.835 27.565 12.835c8.243 0 11.596-6.49 11.596-11.232c0-19.616-32.16-20.491-32.16-52.724c0-27.129 19.472-53.382 58.778-53.382c15.145 0 22.627 4.338 22.627 4.338"
          />
        </svg>

        <h1>Log in</h1>
        <p>Enter your shop domain to log in or install this app.</p>
      </div>

      <form class="shopify-login-form" @submit.prevent="handleSubmit">
        <div class="shopify-login-field">
          <label for="shop">Shop domain</label>
          <div class="shopify-login-input-wrapper">
            <input
              id="shop"
              v-model="shop"
              type="text"
              placeholder="my-shop"
              autocomplete="off"
              autocapitalize="off"
              :disabled="loading"
            />
            <span class="shopify-login-suffix">.myshopify.com</span>
          </div>
          <p v-if="error" class="shopify-login-error">
            {{ error }}
          </p>
        </div>

        <button type="submit" class="shopify-login-button" :disabled="loading">
          {{ loading ? 'Redirecting...' : 'Log in' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.shopify-login {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100svh;
  background: #f6f6f7;
  font-family:
    -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto,
    'Helvetica Neue', sans-serif;
}

.shopify-login-card {
  background: #fff;
  border-radius: 12px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.08),
    0 4px 12px rgba(0, 0, 0, 0.04);
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
}

.shopify-login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.shopify-login-header h1 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #202223;
  margin: 0 0 0.5rem;
}

.shopify-login-header p {
  font-size: 0.875rem;
  color: #6d7175;
  margin: 0;
  line-height: 1.4;
}

.shopify-login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.shopify-login-field label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #202223;
  margin-bottom: 0.375rem;
}

.shopify-login-input-wrapper {
  display: flex;
  border: 1px solid #c9cccf;
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.1s;
}

.shopify-login-input-wrapper:focus-within {
  border-color: #005bd3;
  box-shadow: 0 0 0 1px #005bd3;
}

.shopify-login-input-wrapper input {
  flex: 1;
  border: none;
  outline: none;
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
  color: #202223;
  min-width: 0;
}

.shopify-login-input-wrapper input::placeholder {
  color: #b5b5b5;
}

.shopify-login-suffix {
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
  background: #f6f6f7;
  color: #6d7175;
  font-size: 0.875rem;
  white-space: nowrap;
  border-left: 1px solid #c9cccf;
}

.shopify-login-error {
  color: #d72c0d;
  font-size: 0.8125rem;
  margin: 0.375rem 0 0;
}

.shopify-login-button {
  background: #008060;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.1s;
}

.shopify-login-button:hover:not(:disabled) {
  background: #006e52;
}

.shopify-login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
