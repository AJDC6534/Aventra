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
      
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'

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