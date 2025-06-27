<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Welcome back, {{ user?.name }}!</h1>
        <p class="text-gray-600 mt-2">Plan your next adventure</p>
      </div>
      <router-link 
        to="/create-trip" 
        class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
      >
        <span>✈️</span>
        <span>New Trip</span>
      </router-link>
    </div>

    <div class="grid md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Total Trips</h3>
        <p class="text-3xl font-bold text-blue-600">{{ itineraries.length }}</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">AI Generated</h3>
        <p class="text-3xl font-bold text-green-600">{{ aiGeneratedCount }}</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Upcoming</h3>
        <p class="text-3xl font-bold text-purple-600">{{ upcomingTrips }}</p>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b">
        <h2 class="text-xl font-semibold text-gray-900">Your Trips</h2>
      </div>
      
      <div v-if="loading" class="p-6">
        <div class="text-center">Loading your trips...</div>
      </div>
      
      <div v-else-if="itineraries.length === 0" class="p-6 text-center">
        <div class="text-gray-500 mb-4">
          <span class="text-6xl">🗺️</span>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No trips yet</h3>
        <p class="text-gray-600 mb-4">Start planning your first adventure!</p>
        <router-link 
          to="/create-trip" 
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Create Your First Trip
        </router-link>
      </div>
      
      <div v-else class="divide-y divide-gray-200">
        <div 
          v-for="trip in itineraries" 
          :key="trip._id"
          class="p-6 hover:bg-gray-50 cursor-pointer"
          @click="viewTrip(trip._id)"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3">
                <h3 class="text-lg font-medium text-gray-900">{{ trip.title }}</h3>
                <span v-if="trip.aiGenerated" class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  AI Generated
                </span>
              </div>
              <p class="text-gray-600 mt-1">📍 {{ trip.destination }}</p>
              <p class="text-sm text-gray-500 mt-1">
                {{ formatDate(trip.startDate) }} - {{ formatDate(trip.endDate) }}
              </p>
            </div>
            <div class="flex items-center space-x-2">
              <button 
                @click.stop="chatWithTrip(trip._id)"
                class="text-blue-600 hover:text-blue-800 p-2"
                title="Chat about this trip"
              >
                💬
              </button>
              <button 
                @click.stop="deleteTrip(trip._id)"
                class="text-red-600 hover:text-red-800 p-2"
                title="Delete trip"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      itineraries: [],
      loading: true
    }
  },
  computed: {
    aiGeneratedCount() {
      return this.itineraries.filter(trip => trip.aiGenerated).length
    },
    upcomingTrips() {
      const now = new Date()
      return this.itineraries.filter(trip => new Date(trip.startDate) > now).length
    }
  },
  async mounted() {
    await this.fetchItineraries()
  },
  methods: {
    async fetchItineraries() {
      try {
        const response = await fetch('/api/itineraries', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        
        if (response.ok) {
          this.itineraries = await response.json()
        }
      } catch (error) {
        console.error('Error fetching itineraries:', error)
      } finally {
        this.loading = false
      }
    },
    viewTrip(id) {
      this.$router.push(`/itinerary/${id}`)
    },
    chatWithTrip(id) {
      this.$router.push(`/chat/${id}`)
    },
    async deleteTrip(id) {
      if (confirm('Are you sure you want to delete this trip?')) {
        try {
          const response = await fetch(`/api/itineraries/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
          
          if (response.ok) {
            this.itineraries = this.itineraries.filter(trip => trip._id !== id)
          }
        } catch (error) {
          console.error('Error deleting trip:', error)
        }
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString()
    }
  }
}
</script>