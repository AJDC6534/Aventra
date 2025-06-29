<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Loading State -->
    <div v-if="loading" class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow p-8">
        <div class="animate-pulse">
          <div class="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div class="space-y-4">
            <div class="h-20 bg-gray-200 rounded"></div>
            <div class="h-20 bg-gray-200 rounded"></div>
            <div class="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="itinerary" class="max-w-6xl mx-auto">
      <!-- Header Section -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h1 class="text-3xl font-bold text-gray-900">{{ itinerary.title }}</h1>
              <span v-if="itinerary.aiGenerated" class="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                🤖 AI Generated
              </span>
            </div>
            <div class="flex items-center gap-4 text-gray-600 mb-3">
              <div class="flex items-center gap-1">
                <span>📍</span>
                <span class="font-medium">{{ itinerary.destination }}</span>
              </div>
              <div class="flex items-center gap-1">
                <span>📅</span>
                <span>{{ formatDate(itinerary.startDate) }} - {{ formatDate(itinerary.endDate) }}</span>
              </div>
              <div class="flex items-center gap-1">
                <span>⏱️</span>
                <span>{{ tripDuration }} days</span>
              </div>
            </div>
            
            <!-- Trip Stats -->
            <div class="flex items-center gap-6 text-sm">
              <div class="flex items-center gap-1">
                <span>💰</span>
                <span>Budget: ${{ itinerary.budget || 'Not set' }}</span>
              </div>
              <div v-if="itinerary.preferences?.interests?.length" class="flex items-center gap-1">
                <span>🎯</span>
                <span>{{ itinerary.preferences.interests.slice(0, 2).join(', ') }}{{ itinerary.preferences.interests.length > 2 ? '+' + (itinerary.preferences.interests.length - 2) : '' }}</span>
              </div>
              <div v-if="itinerary.preferences?.pace" class="flex items-center gap-1">
                <span>⚡</span>
                <span class="capitalize">{{ itinerary.preferences.pace }} pace</span>
              </div>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-3">
            <router-link 
              :to="`/chat/${itinerary._id}`"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <span>💬</span>
              <span>Chat about trip</span>
            </router-link>
            
            <button 
              @click="toggleEditMode"
              class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <span>{{ editMode ? '👁️' : '✏️' }}</span>
              <span>{{ editMode ? 'View Mode' : 'Edit Mode' }}</span>
            </button>
            
            <button 
              @click="exportItinerary"
              class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <span>📄</span>
              <span>Export</span>
            </button>
            
            <button 
              @click="shareItinerary"
              class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <span>🔗</span>
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center gap-3">
            <div class="bg-blue-100 p-2 rounded-lg">
              <span class="text-xl">🗓️</span>
            </div>
            <div>
              <p class="text-sm text-gray-600">Total Days</p>
              <p class="text-xl font-bold text-gray-900">{{ tripDuration }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center gap-3">
            <div class="bg-green-100 p-2 rounded-lg">
              <span class="text-xl">🎯</span>
            </div>
            <div>
              <p class="text-sm text-gray-600">Activities</p>
              <p class="text-xl font-bold text-gray-900">{{ totalActivities }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center gap-3">
            <div class="bg-yellow-100 p-2 rounded-lg">
              <span class="text-xl">💰</span>
            </div>
            <div>
              <p class="text-sm text-gray-600">Est. Cost</p>
              <p class="text-xl font-bold text-gray-900">${{ estimatedCost }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center gap-3">
            <div class="bg-purple-100 p-2 rounded-lg">
              <span class="text-xl">⭐</span>
            </div>
            <div>
              <p class="text-sm text-gray-600">Status</p>
              <p class="text-xl font-bold text-gray-900">{{ tripStatus }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Daily Itinerary -->
      <div class="space-y-6">
        <div 
          v-for="(day, dayIndex) in itinerary.days" 
          :key="dayIndex" 
          class="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <!-- Day Header -->
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-xl font-semibold text-gray-900">
                  Day {{ dayIndex + 1 }} - {{ formatDayDate(day.date) }}
                </h2>
                <p class="text-sm text-gray-600 mt-1">
                  {{ day.activities?.length || 0 }} activities planned
                  <span v-if="getDayCost(day) > 0" class="ml-2">
                    • Estimated cost: ${{ getDayCost(day) }}
                  </span>
                </p>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-2xl">{{ getDayIcon(dayIndex) }}</span>
                <div v-if="editMode" class="flex gap-2">
                  <button 
                    @click="addActivity(dayIndex)"
                    class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    + Add Activity
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Activities -->
          <div class="p-6">
            <div v-if="day.activities && day.activities.length > 0" class="space-y-4">
              <div 
                v-for="(activity, actIndex) in day.activities" 
                :key="actIndex"
                class="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                :class="{ 'bg-gray-50': editMode }"
              >
                <!-- View Mode -->
                <div v-if="!editMode" class="space-y-3">
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <div class="flex items-center gap-3 mb-2">
                        <div class="bg-blue-100 px-3 py-1 rounded-full">
                          <span class="font-medium text-blue-800 text-sm">{{ activity.time }}</span>
                        </div>
                        <h3 class="font-semibold text-gray-900 text-lg">{{ activity.activity }}</h3>
                        <div v-if="activity.cost > 0" class="bg-green-100 px-2 py-1 rounded text-green-800 text-sm font-medium">
                          ${{ activity.cost }}
                        </div>
                        <div v-else class="bg-gray-100 px-2 py-1 rounded text-gray-600 text-sm">
                          Free
                        </div>
                      </div>
                      
                      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600">
                        <div class="flex items-center gap-1">
                          <span>📍</span>
                          <span>{{ activity.location }}</span>
                        </div>
                        <div class="flex items-center gap-1">
                          <span>⏱️</span>
                          <span>{{ activity.duration }}</span>
                        </div>
                        <div class="flex items-center gap-1">
                          <span>🎯</span>
                          <span>{{ getActivityCategory(activity.activity) }}</span>
                        </div>
                      </div>
                      
                      <div v-if="activity.notes" class="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                        <p class="text-sm text-gray-700">
                          <span class="font-medium">💡 Note:</span> {{ activity.notes }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Edit Mode -->
                <div v-else class="space-y-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Time</label>
                      <input 
                        v-model="activity.time"
                        type="time"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                      <input 
                        v-model="activity.duration"
                        type="text"
                        placeholder="2 hours"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Activity</label>
                    <input 
                      v-model="activity.activity"
                      type="text"
                      placeholder="Activity name"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input 
                        v-model="activity.location"
                        type="text"
                        placeholder="Location"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Cost ($)</label>
                      <input 
                        v-model.number="activity.cost"
                        type="number"
                        min="0"
                        placeholder="0"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea 
                      v-model="activity.notes"
                      rows="2"
                      placeholder="Any special notes or tips"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  
                  <div class="flex justify-end">
                    <button 
                      @click="removeActivity(dayIndex, actIndex)"
                      class="text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-1"
                    >
                      <span>🗑️</span>
                      <span>Remove Activity</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Empty State -->
            <div v-else class="text-center py-12 text-gray-500">
              <div class="text-6xl mb-4">📝</div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">No activities planned for this day</h3>
              <p class="text-gray-600 mb-4">Add some activities to make the most of your time!</p>
              <button 
                v-if="editMode"
                @click="addActivity(dayIndex)"
                class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add First Activity
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Save Changes Button (Edit Mode) -->
      <div v-if="editMode" class="mt-8 text-center">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              @click="saveItinerary"
              :disabled="saving"
              class="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium flex items-center justify-center gap-2"
            >
              <span v-if="saving">⏳</span>
              <span v-else>💾</span>
              <span>{{ saving ? 'Saving Changes...' : 'Save Changes' }}</span>
            </button>
            
            <button 
              @click="cancelChanges"
              class="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 font-medium flex items-center justify-center gap-2"
            >
              <span>❌</span>
              <span>Cancel Changes</span>
            </button>
          </div>
          
          <p class="text-sm text-gray-600 mt-3">
            💡 Your changes are automatically saved as you edit. Use "Save Changes" to finalize.
          </p>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="max-w-4xl mx-auto text-center py-12">
      <div class="text-6xl mb-4">😕</div>
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Itinerary Not Found</h2>
      <p class="text-gray-600 mb-6">The itinerary you're looking for doesn't exist or you don't have permission to view it.</p>
      <router-link to="/dashboard" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-flex items-center gap-2">
        <span>🏠</span>
        <span>Back to Dashboard</span>
      </router-link>
    </div>

    <!-- Share Modal -->
    <div v-if="showShareModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showShareModal = false">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4" @click.stop>
        <h3 class="text-lg font-semibold mb-4">Share Itinerary</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Share Link</label>
            <div class="flex">
              <input 
                :value="shareUrl" 
                readonly 
                class="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50"
              >
              <button 
                @click="copyShareUrl"
                class="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
              >
                📋 Copy
              </button>
            </div>
          </div>
          <div class="flex gap-2">
            <button @click="shareViaEmail" class="flex-1 bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200">
              📧 Email
            </button>
            <button @click="shareViaWhatsApp" class="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600">
              📱 WhatsApp
            </button>
          </div>
        </div>
        <button @click="showShareModal = false" class="mt-4 w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItineraryView',
  data() {
    return {
      itinerary: null,
      loading: true,
      editMode: false,
      saving: false,
      showShareModal: false,
      originalItinerary: null, // For cancel functionality
    }
  },
  computed: {
    tripDuration() {
      if (!this.itinerary) return 0
      const start = new Date(this.itinerary.startDate)
      const end = new Date(this.itinerary.endDate)
      return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1
    },
    
    totalActivities() {
      if (!this.itinerary?.days) return 0
      return this.itinerary.days.reduce((total, day) => total + (day.activities?.length || 0), 0)
    },
    
    estimatedCost() {
      if (!this.itinerary?.days) return 0
      return this.itinerary.days.reduce((total, day) => {
        return total + (day.activities?.reduce((dayTotal, activity) => dayTotal + (activity.cost || 0), 0) || 0)
      }, 0)
    },
    
    tripStatus() {
      if (!this.itinerary) return 'Unknown'
      const now = new Date()
      const start = new Date(this.itinerary.startDate)
      const end = new Date(this.itinerary.endDate)
      
      if (now < start) return 'Upcoming'
      if (now > end) return 'Completed'
      return 'In Progress'
    },
    
    shareUrl() {
      return `${window.location.origin}/itinerary/${this.itinerary?._id}`
    }
  },
  async mounted() {
    await this.fetchItinerary()
  },
  methods: {
    async fetchItinerary() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/itineraries/:itineraryId?`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        
        if (response.ok) {
          this.itinerary = await response.json()
          this.originalItinerary = JSON.parse(JSON.stringify(this.itinerary)) // Deep copy
        } else {
          console.error('Failed to fetch itinerary')
        }
      } catch (error) {
        console.error('Error fetching itinerary:', error)
      } finally {
        this.loading = false
      }
    },
    
    toggleEditMode() {
      this.editMode = !this.editMode
      if (this.editMode) {
        this.originalItinerary = JSON.parse(JSON.stringify(this.itinerary))
      }
    },
    
    addActivity(dayIndex) {
      if (!this.itinerary.days[dayIndex].activities) {
        this.itinerary.days[dayIndex].activities = []
      }
      
      const newTime = this.getNextAvailableTime(dayIndex)
      
      this.itinerary.days[dayIndex].activities.push({
        time: newTime,
        activity: '',
        location: `${this.itinerary.destination} - City Center`,
        duration: '2 hours',
        cost: 0,
        notes: ''
      })
    },
    
    removeActivity(dayIndex, activityIndex) {
      if (confirm('Are you sure you want to remove this activity?')) {
        this.itinerary.days[dayIndex].activities.splice(activityIndex, 1)
      }
    },
    
    getNextAvailableTime(dayIndex) {
      const activities = this.itinerary.days[dayIndex].activities || []
      if (activities.length === 0) return '09:00'
      
      // Find the latest time and add 2 hours
      const times = activities.map(a => a.time).sort()
      const lastTime = times[times.length - 1]
      const [hours, minutes] = lastTime.split(':').map(Number)
      const nextHour = Math.min(hours + 2, 22) // Don't go past 10 PM
      
      return `${nextHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    },
    
    async saveItinerary() {
      this.saving = true
      
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/itineraries/:itineraryId?`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(this.itinerary)
        })
        
        if (response.ok) {
          const updatedItinerary = await response.json()
          this.itinerary = updatedItinerary
          this.originalItinerary = JSON.parse(JSON.stringify(updatedItinerary))
          this.editMode = false
          
          // Show success message
          this.showNotification('Itinerary saved successfully! 🎉', 'success')
        } else {
          throw new Error('Failed to save itinerary')
        }
      } catch (error) {
        console.error('Error saving itinerary:', error)
        this.showNotification('Failed to save changes. Please try again.', 'error')
      } finally {
        this.saving = false
      }
    },
    
    cancelChanges() {
      if (confirm('Are you sure you want to cancel your changes?')) {
        this.itinerary = JSON.parse(JSON.stringify(this.originalItinerary))
        this.editMode = false
      }
    },
    
    shareItinerary() {
      this.showShareModal = true
    },
    
    async copyShareUrl() {
      try {
        await navigator.clipboard.writeText(this.shareUrl)
        this.showNotification('Link copied to clipboard! 📋', 'success')
      } catch (error) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = this.shareUrl
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        this.showNotification('Link copied to clipboard! 📋', 'success')
      }
    },
    
    shareViaEmail() {
      const subject = `Check out my trip to ${this.itinerary.destination}!`
      const body = `I wanted to share my travel itinerary for ${this.itinerary.destination} with you!\n\nView it here: ${this.shareUrl}`
      window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
    },
    
    shareViaWhatsApp() {
      const text = `Check out my trip to ${this.itinerary.destination}! ${this.shareUrl}`
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`)
    },
    
    exportItinerary() {
      const content = this.generateExportContent()
      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${this.itinerary.destination}-itinerary.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      this.showNotification('Itinerary exported successfully! 📄', 'success')
    },
    
    generateExportContent() {
      let content = `${this.itinerary.title}\n`
      content += `Destination: ${this.itinerary.destination}\n`
      content += `Dates: ${this.formatDate(this.itinerary.startDate)} - ${this.formatDate(this.itinerary.endDate)}\n`
      content += `Duration: ${this.tripDuration} days\n`
      content += `Estimated Cost: $${this.estimatedCost}\n\n`
      
      this.itinerary.days.forEach((day, index) => {
        content += `=== DAY ${index + 1} - ${this.formatDayDate(day.date)} ===\n\n`
        
        if (day.activities && day.activities.length > 0) {
          day.activities.forEach(activity => {
            content += `${activity.time} - ${activity.activity}\n`
            content += `Location: ${activity.location}\n`
            content += `Duration: ${activity.duration}\n`
            content += `Cost: $${activity.cost || 0}\n`
            if (activity.notes) content += `Notes: ${activity.notes}\n`
            content += '\n'
          })
        } else {
          content += 'No activities planned\n\n'
        }
      })
      
      return content
    },
    
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    
    formatDayDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      })
    },
    
    getDayCost(day) {
      if (!day.activities) return 0
      return day.activities.reduce((total, activity) => total + (activity.cost || 0), 0)
    },
    
    getDayIcon(dayIndex) {
      const icons = ['🌅', '🌞', '🌆', '🌙', '⭐', '🎯', '🎉']
      return icons[dayIndex % icons.length]
    },
    
    getActivityCategory(activity) {
      const categories = {
        'museum': 'Culture',
        'temple': 'Culture',
        'shrine': 'Culture',
        'food': 'Food',
        'market': 'Food',
        'restaurant': 'Food',
        'cafe': 'Food',
        'dining': 'Food',
        'park': 'Nature',
        'garden': 'Nature',
        'beach': 'Nature',
        'hiking': 'Adventure',
        'trek': 'Adventure',
        'climbing': 'Adventure',
        'shopping': 'Shopping',
        'mall': 'Shopping',
        'store': 'Shopping',
        'art': 'Art',
        'gallery': 'Art',
        'theater': 'Entertainment',
        'cinema': 'Entertainment',
        'show': 'Entertainment',
        'tour': 'Sightseeing',
        'visit': 'Sightseeing',
        'explore': 'Sightseeing'
      }
      
      const lowerActivity = activity.toLowerCase()
      for (const [keyword, category] of Object.entries(categories)) {
        if (lowerActivity.includes(keyword)) {
          return category
        }
      }
      return 'General'
    },
    
    showNotification(message, type = 'info') {
      // Create notification element
      const notification = document.createElement('div')
      notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transition-all duration-300 transform translate-x-full`
      
      // Set styling based on type
      const styles = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        info: 'bg-blue-500 text-white',
        warning: 'bg-yellow-500 text-black'
      }
      
      notification.className += ` ${styles[type] || styles.info}`
      notification.innerHTML = `
        <div class="flex items-center gap-2">
          <span>${message}</span>
          <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-lg hover:opacity-75">×</button>
        </div>
      `
      
      // Add to DOM
      document.body.appendChild(notification)
      
      // Animate in
      setTimeout(() => {
        notification.style.transform = 'translateX(0)'
      }, 100)
      
      // Auto remove after 5 seconds
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)'
        setTimeout(() => {
          if (notification.parentElement) {
            notification.remove()
          }
        }, 300)
      }, 5000)
    },
    
    // Additional utility methods
    formatTime(timeString) {
      if (!timeString) return ''
      const [hours, minutes] = timeString.split(':')
      const hour = parseInt(hours)
      const ampm = hour >= 12 ? 'PM' : 'AM'
      const displayHour = hour % 12 || 12
      return `${displayHour}:${minutes} ${ampm}`
    },
    
    getDurationInHours(duration) {
      if (!duration) return 0
      const match = duration.match(/(\d+(?:\.\d+)?)\s*(hour|hr|h)/i)
      return match ? parseFloat(match[1]) : 2 // Default to 2 hours
    },
    
    validateActivity(activity) {
      const errors = []
      if (!activity.activity || activity.activity.trim() === '') {
        errors.push('Activity name is required')
      }
      if (!activity.location || activity.location.trim() === '') {
        errors.push('Location is required')
      }
      if (!activity.time) {
        errors.push('Time is required')
      }
      return errors
    },
    
    checkTimeConflicts(dayIndex, activityIndex = -1) {
      const day = this.itinerary.days[dayIndex]
      if (!day.activities || day.activities.length <= 1) return []
      
      const conflicts = []
      const activities = day.activities.map((act, index) => ({
        ...act,
        index,
        startTime: this.timeToMinutes(act.time),
        endTime: this.timeToMinutes(act.time) + (this.getDurationInHours(act.duration) * 60)
      })).filter(act => act.index !== activityIndex)
      
      activities.forEach((act1, i) => {
        activities.slice(i + 1).forEach(act2 => {
          if ((act1.startTime < act2.endTime && act1.endTime > act2.startTime)) {
            conflicts.push({
              activity1: act1.activity,
              activity2: act2.activity,
              time1: act1.time,
              time2: act2.time
            })
          }
        })
      })
      
      return conflicts
    },
    
    timeToMinutes(timeString) {
      if (!timeString) return 0
      const [hours, minutes] = timeString.split(':').map(Number)
      return hours * 60 + minutes
    },
    
    minutesToTime(minutes) {
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
    },
    
    // Advanced features
    async generateAISuggestion(dayIndex) {
      if (!confirm('Generate AI suggestions for this day? This will add activities based on your preferences.')) {
        return
      }
      
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ai/suggest-activities`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            destination: this.itinerary.destination,
            date: this.itinerary.days[dayIndex].date,
            preferences: this.itinerary.preferences,
            existingActivities: this.itinerary.days[dayIndex].activities || []
          })
        })
        
        if (response.ok) {
          const suggestions = await response.json()
          // Add suggestions to the day
          this.itinerary.days[dayIndex].activities = [
            ...(this.itinerary.days[dayIndex].activities || []),
            ...suggestions
          ]
          this.showNotification('AI suggestions added! 🤖', 'success')
        }
      } catch (error) {
        console.error('Error generating AI suggestions:', error)
        this.showNotification('Failed to generate suggestions. Please try again.', 'error')
      }
    },
    
    optimizeSchedule(dayIndex) {
      const day = this.itinerary.days[dayIndex]
      if (!day.activities || day.activities.length <= 1) return
      
      // Sort activities by time
      day.activities.sort((a, b) => this.timeToMinutes(a.time) - this.timeToMinutes(b.time))
      
      // Adjust times to avoid conflicts
      let currentTime = this.timeToMinutes(day.activities[0].time)
      
      day.activities.forEach((activity, index) => {
        if (index > 0) {
          const prevActivity = day.activities[index - 1]
          const prevEndTime = this.timeToMinutes(prevActivity.time) + (this.getDurationInHours(prevActivity.duration) * 60)
          currentTime = Math.max(currentTime, prevEndTime + 30) // 30 min buffer
        }
        
        activity.time = this.minutesToTime(currentTime)
        currentTime += this.getDurationInHours(activity.duration) * 60
      })
      
      this.showNotification('Schedule optimized! ⚡', 'success')
    },
    
    duplicateDay(dayIndex) {
      if (confirm('Duplicate this day\'s activities to another day?')) {
        const sourceDayActivities = JSON.parse(JSON.stringify(this.itinerary.days[dayIndex].activities || []))
        
        // Show day selection modal (simplified - you might want a proper modal)
        const dayOptions = this.itinerary.days.map((day, index) => 
          `${index + 1}: ${this.formatDayDate(day.date)}`
        ).join('\n')
        
        const targetDay = prompt(`Select target day (1-${this.itinerary.days.length}):\n${dayOptions}`)
        const targetIndex = parseInt(targetDay) - 1
        
        if (targetIndex >= 0 && targetIndex < this.itinerary.days.length && targetIndex !== dayIndex) {
          this.itinerary.days[targetIndex].activities = [
            ...(this.itinerary.days[targetIndex].activities || []),
            ...sourceDayActivities
          ]
          this.showNotification(`Activities duplicated to Day ${targetIndex + 1}! 📋`, 'success')
        }
      }
    }
  }
}
</script>