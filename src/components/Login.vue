<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-2xl font-semibold tracking-tight text-gray-900 mb-2">
          Welcome back
        </h1>
        <p class="text-sm text-gray-600">
          Sign in to your account to continue your journey
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="login" class="mt-8 space-y-6" novalidate>
        <div class="space-y-4">
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input 
              id="email" 
              v-model="form.email" 
              type="email" 
              required 
              autocomplete="email"
              :class="[
                'w-full px-3 py-2.5 border rounded-lg text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0',
                errors.email 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:border-gray-500 focus:ring-gray-500'
              ]"
              placeholder="Enter your email address"
              @blur="validateField('email')"
              @input="clearFieldError('email')"
            >
            <p v-if="errors.email" class="mt-1 text-xs text-red-600">
              {{ errors.email }}
            </p>
          </div>

          <!-- Password Field -->
          <div>
            <div class="flex items-center justify-between mb-1">
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password
              </label>
              <router-link 
                to="/forgot-password" 
                class="text-xs text-gray-600 hover:text-gray-900 focus:outline-none focus:underline transition-colors duration-150"
              >
                Forgot password?
              </router-link>
            </div>
            <div class="relative">
              <input 
                id="password" 
                v-model="form.password" 
                :type="showPassword ? 'text' : 'password'"
                required 
                autocomplete="current-password"
                :class="[
                  'w-full px-3 py-2.5 pr-10 border rounded-lg text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0',
                  errors.password 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-gray-500 focus:ring-gray-500'
                ]"
                placeholder="Enter your password"
                @blur="validateField('password')"
                @input="clearFieldError('password')"
              >
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                tabindex="-1"
              >
                <svg v-if="!showPassword" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.636 6.636m4.242 4.242L14.12 14.12m-4.242-4.242L6.636 6.636m0 0L3.515 3.515m0 0L0 0" />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-xs text-red-600">
              {{ errors.password }}
            </p>
          </div>

          <!-- Remember Me -->
          <div class="flex items-center">
            <input 
              id="remember-me" 
              v-model="form.rememberMe"
              type="checkbox" 
              class="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
            >
            <label for="remember-me" class="ml-2 block text-sm text-gray-700">
              Remember me for 30 days
            </label>
          </div>
        </div>

        <!-- Global Error -->
        <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg">
          <div class="flex items-center">
            <svg class="h-4 w-4 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-sm text-red-700">{{ error }}</p>
          </div>
        </div>

        <!-- Submit Button -->
        <button 
          type="submit" 
          :disabled="loading || !isFormValid"
          class="w-full flex justify-center items-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loading ? 'Signing in...' : 'Sign in' }}
        </button>
        
        <!-- Sign Up Link -->
        <div class="text-center">
          <p class="text-sm text-gray-600">
            Don't have an account? 
            <router-link 
              to="/register" 
              class="font-medium text-gray-900 hover:text-gray-700 focus:outline-none focus:underline transition-colors duration-150"
            >
              Create account
            </router-link>
          </p>
        </div>
      </form>

      <!-- Social Login Options -->
      <div class="mt-8">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-gray-50 text-gray-500">Or continue with</span>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            @click="loginWithGoogle"
            class="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-150"
          >
            <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>

          <button
            type="button"
            @click="loginWithApple"
            class="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-150"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Apple
          </button>
        </div>
      </div>

      <!-- Security Notice -->
      <div class="mt-8 text-center">
        <p class="text-xs text-gray-500">
          By signing in, you agree to our 
          <a href="#" class="text-gray-700 hover:text-gray-900 underline">Terms of Service</a> 
          and 
          <a href="#" class="text-gray-700 hover:text-gray-900 underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
export default {
  name: 'Login',
  
  data() {
    return {
      form: {
        email: '',
        password: '',
        rememberMe: false
      },
      errors: {},
      error: '',
      loading: false,
      showPassword: false
    }
  },

  computed: {
    isFormValid() {
      return this.form.email.trim() && 
             this.form.password && 
             Object.keys(this.errors).length === 0
    }
  },

  mounted() {
    // Pre-fill email if passed from registration
    if (this.$route.query.email) {
      this.form.email = this.$route.query.email
    }
  },

  methods: {
    validateField(field) {
      this.errors = { ...this.errors }
      
      switch (field) {
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!this.form.email.trim()) {
            this.errors.email = 'Email address is required'
          } else if (!emailRegex.test(this.form.email)) {
            this.errors.email = 'Please enter a valid email address'
          } else {
            delete this.errors.email
          }
          break
          
        case 'password':
          if (!this.form.password) {
            this.errors.password = 'Password is required'
          } else {
            delete this.errors.password
          }
          break
      }
    },

    clearFieldError(field) {
      if (this.errors[field]) {
        this.errors = { ...this.errors }
        delete this.errors[field]
      }
      // Clear global error when user starts typing
      if (this.error) {
        this.error = ''
      }
    },

    validateForm() {
      this.validateField('email')
      this.validateField('password')
      return Object.keys(this.errors).length === 0
    },

    async login() {
      // Validate form before submission
      if (!this.validateForm()) {
        return
      }

      this.loading = true
      this.error = ''
      
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.form.email.trim().toLowerCase(),
            password: this.form.password,
            rememberMe: this.form.rememberMe
          }),
        })
        
        const data = await response.json()
        
        if (response.ok) {
          // Store auth data
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', JSON.stringify(data.user))
          
          // Handle remember me
          if (this.form.rememberMe) {
            localStorage.setItem('rememberMe', 'true')
          }
          
          // Show success message
          this.$toast?.success('Welcome back!')
          
          // Redirect to dashboard or intended route
          const redirectTo = this.$route.query.redirect || '/dashboard'
          await this.$router.push(redirectTo)
        } else {
          this.error = data.message || 'Invalid email or password'
          
          // Handle specific field errors from server
          if (data.errors) {
            this.errors = { ...this.errors, ...data.errors }
          }
        }
      } catch (err) {
        console.error('Login error:', err)
        this.error = 'Network error. Please check your connection and try again.'
      } finally {
        this.loading = false
      }
    },

    async loginWithGoogle() {
      try {
        // Implement Google OAuth login
        this.$toast?.info('Google login coming soon!')
      } catch (error) {
        console.error('Google login error:', error)
        this.error = 'Failed to sign in with Google. Please try again.'
      }
    },

    async loginWithApple() {
      try {
        // Implement Apple OAuth login
        this.$toast?.info('Apple login coming soon!')
      } catch (error) {
        console.error('Apple login error:', error)
        this.error = 'Failed to sign in with Apple. Please try again.'
      }
    }
  }
}
</script>