<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <nav v-if="isAuthenticated" class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/dashboard" class="text-xl font-bold text-blue-600">
              AvenTra
            </router-link>
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/dashboard" class="text-gray-600 hover:text-gray-900">Dashboard</router-link>
            <router-link to="/create-trip" class="text-gray-600 hover:text-gray-900">New Trip</router-link>
            <router-link to="/chat" class="text-gray-600 hover:text-gray-900">AI Assistant</router-link>
            <router-link to="/profile" class="text-gray-600 hover:text-gray-900">Profile</router-link>
            <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
          </div>
        </div>
      </div>
    </nav>

    <nav v-else-if="isAuthPage" class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <router-link to="/" class="text-xl font-bold text-blue-600">AvenTra</router-link>
        </div>
      </div>
    </nav>
    
    <main class="flex-1">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    },
    isAuthPage() {
      const path = this.$route.path.replace(/^\/Aventra/, '');
      const authRoutes = ['/login', '/register'];
      return authRoutes.includes(path);
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$router.push('/login');
    }
  }
}
</script>

<style>
/* Global styles are imported in main.js */
</style>
