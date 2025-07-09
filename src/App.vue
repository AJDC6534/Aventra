<template>
  <div id="app" class="min-h-screen bg-gray-50 text-gray-800 font-inter">
    <!-- Main Navigation -->
    <header v-if="isAuthenticated" class="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg shadow-sm">
      <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          
          <!-- Brand -->
          <router-link to="/dashboard" class="text-2xl font-semibold tracking-tight text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md">
            AvenTra
          </router-link>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-6">
            <router-link to="/dashboard">Dashboard</router-link>
            <router-link to="/create-trip">New Trip</router-link>
            <router-link to="/chat">AI Assistant</router-link>
            <router-link to="/profile">Profile</router-link>
            <button
              @click="logout"
              class="ml-4 px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign Out
            </button>
          </div>

          <!-- Mobile Menu Toggle -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Toggle navigation menu"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>

        <!-- Mobile Menu -->
        <div v-if="isMobileMenuOpen" id="mobile-menu" class="md:hidden mt-2 space-y-1 pb-4 pt-4 border-t border-gray-200">
          <router-link to="/dashboard" @click="closeMobileMenu">Dashboard</router-link>
          <router-link to="/create-trip" @click="closeMobileMenu">New Trip</router-link>
          <router-link to="/chat" @click="closeMobileMenu">AI Assistant</router-link>
          <router-link to="/profile" @click="closeMobileMenu">Profile</router-link>
          <div class="pt-4 border-t border-gray-100">
            <button
              @click="logout"
              class="w-full text-left px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>
    </header>

    <!-- Auth Page Header -->
    <header v-else-if="isAuthPage" class="border-b border-gray-200 bg-white shadow-sm">
      <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <router-link to="/" class="text-2xl font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md">
            AvenTra
          </router-link>
          <div>
            <router-link
              v-if="$route.path === '/login'"
              to="/register"
              class="text-sm text-gray-500 hover:text-blue-600 transition-colors font-medium"
            >
              Create account
            </router-link>
            <router-link
              v-else-if="$route.path === '/register'"
              to="/login"
              class="text-sm text-gray-500 hover:text-blue-600 transition-colors font-medium"
            >
              Sign in
            </router-link>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main -->
    <main class="py-6">
      <router-view />
    </main>

    <!-- Mobile Menu Overlay -->
    <div v-if="isMobileMenuOpen" @click="closeMobileMenu" class="flex flex-col fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden" aria-hidden="true"></div>
  </div>
</template>


<script>

export default {
  name: 'App',
  
  data() {
    return {
      isAuthenticated: !!localStorage.getItem('token'),
      isMobileMenuOpen: false
    }
  },

  computed: {
    isAuthPage() {
      const authRoutes = ['/login', '/register', '/forgot-password']
      return authRoutes.includes(this.$route.path)
    }
  },

  methods: {
    async logout() {
      try {
        // Clear local storage
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        
        // Update state
        this.isAuthenticated = false
        this.closeMobileMenu()
        
        // Navigate to login
        await this.$router.push('/login')
        
        // Optional: Show success message
        this.$toast?.success('Signed out successfully')
      } catch (error) {
        console.error('Logout error:', error)
        this.$toast?.error('Error signing out')
      }
    },

    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    },

    closeMobileMenu() {
      this.isMobileMenuOpen = false
    },

    handleEscape(event) {
      if (event.key === 'Escape') {
        this.closeMobileMenu()
      }
    }
  },

  watch: {
    '$route'() {
      // Update auth state on route change
      this.isAuthenticated = !!localStorage.getItem('token')
      // Close mobile menu on navigation
      this.closeMobileMenu()
    }
  },

  mounted() {
    // Add escape key listener for mobile menu
    document.addEventListener('keydown', this.handleEscape)
  },

  beforeUnmount() {
    // Clean up event listener
    document.removeEventListener('keydown', this.handleEscape)
  },
}
</script>

<style scoped>
/* Smooth mobile menu animations */
#mobile-menu {
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Enhanced backdrop blur for supported browsers */
@supports (backdrop-filter: blur(8px)) {
  header {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  #mobile-menu {
    animation: none;
  }
  
  * {
    transition-duration: 0.01ms !important;
  }
}
</style>