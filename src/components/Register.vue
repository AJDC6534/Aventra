<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-2xl font-semibold tracking-tight text-gray-900 mb-2">
          Create your account
        </h1>
        <p class="text-sm text-gray-600">
          Join thousands of travelers planning their next adventure
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="register" class="mt-8 space-y-6" novalidate>
        <div class="space-y-4">
          <!-- Name Field -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input 
              id="name" 
              v-model="form.name" 
              type="text" 
              required 
              autocomplete="name"
              :class="[
                'w-full px-3 py-2 border rounded-md text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0',
                errors.name 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              ]"
              placeholder="Enter your full name"
              @blur="validateField('name')"
              @input="clearFieldError('name')"
            >
            <p v-if="errors.name" class="mt-1 text-xs text-red-600">
              {{ errors.name }}
            </p>
          </div>

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
                'w-full px-3 py-2 border rounded-md text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0',
                errors.email 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
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
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div class="relative">
              <input 
                id="password" 
                v-model="form.password" 
                :type="showPassword ? 'text' : 'password'"
                required 
                autocomplete="new-password"
                minlength="6"
                :class="[
                  'w-full px-3 py-2 pr-10 border rounded-md text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0',
                  errors.password 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                ]"
                placeholder="Create a secure password"
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
            <p v-else class="mt-1 text-xs text-gray-500">
              Must be at least 6 characters long
            </p>
          </div>
        </div>

        <!-- Global Error -->
        <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-md">
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
          class="w-full flex justify-center items-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loading ? 'Creating account...' : 'Create account' }}
        </button>
        
        <!-- Sign In Link -->
        <div class="text-center">
          <p class="text-sm text-gray-600">
            Already have an account? 
            <router-link 
              to="/login" 
              class="font-medium text-gray-900 hover:text-gray-700 focus:outline-none focus:underline transition-colors duration-150"
            >
              Sign in
            </router-link>
          </p>
        </div>
      </form>

      <!-- Additional Info -->
      <div class="mt-8 text-center">
        <p class="text-xs text-gray-500">
          By creating an account, you agree to our 
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
  name: 'Register',
  
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      },
      errors: {},
      error: '',
      loading: false,
      showPassword: false
    }
  },

  computed: {
    isFormValid() {
      return this.form.name.trim() && 
             this.form.email.trim() && 
             this.form.password.length >= 6 && 
             Object.keys(this.errors).length === 0
    }
  },

  methods: {
    validateField(field) {
      this.errors = { ...this.errors }
      
      switch (field) {
        case 'name':
          if (!this.form.name.trim()) {
            this.errors.name = 'Full name is required'
          } else if (this.form.name.trim().length < 2) {
            this.errors.name = 'Name must be at least 2 characters'
          } else {
            delete this.errors.name
          }
          break
          
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
          } else if (this.form.password.length < 6) {
            this.errors.password = 'Password must be at least 6 characters'
          } else if (!/(?=.*[a-zA-Z])/.test(this.form.password)) {
            this.errors.password = 'Password must contain at least one letter'
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
      this.validateField('name')
      this.validateField('email')
      this.validateField('password')
      return Object.keys(this.errors).length === 0
    },

    async register() {
      // Validate form before submission
      if (!this.validateForm()) {
        return
      }

      this.loading = true
      this.error = ''
      
      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.form.name.trim(),
            email: this.form.email.trim().toLowerCase(),
            password: this.form.password
          }),
        })
        
        const data = await response.json()
        
        if (response.ok) {
          // Optionally show success message
          this.$toast?.success('Account created successfully!')
          
          // Redirect to login with email pre-filled
          await this.$router.push({
            path: '/login',
            query: { email: this.form.email.trim().toLowerCase() }
          })
        } else {
          this.error = data.message || 'Failed to create account'
          
          // Handle specific field errors from server
          if (data.errors) {
            this.errors = { ...this.errors, ...data.errors }
          }
        }
      } catch (err) {
        console.error('Registration error:', err)
        this.error = 'Network error. Please check your connection and try again.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>