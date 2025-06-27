<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Create New Trip</h1>
        <p class="text-gray-600">Plan your perfect adventure with our AI-powered travel assistant</p>
      </div>
      
      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <form @submit.prevent="handleSubmit">
          <div class="space-y-6">
            <!-- Trip Title -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Trip Title *
              </label>
              <input 
                v-model="form.title"
                type="text" 
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="My Amazing Trip to Paris"
              >
              <p class="text-sm text-gray-500 mt-1">Give your trip a memorable name</p>
            </div>
            
            <!-- Destination -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Destination *
              </label>
              <input 
                v-model="form.destination"
                type="text" 
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Paris, France"
                list="destinations"
              >
              <datalist id="destinations">
                <option value="Tokyo, Japan"></option>
                <option value="Paris, France"></option>
                <option value="London, United Kingdom"></option>
                <option value="New York, USA"></option>
                <option value="Rome, Italy"></option>
                <option value="Barcelona, Spain"></option>
                <option value="Amsterdam, Netherlands"></option>
                <option value="Bangkok, Thailand"></option>
                <option value="Sydney, Australia"></option>
                <option value="Dubai, UAE"></option>
              </datalist>
              <p class="text-sm text-gray-500 mt-1">Where would you like to go?</p>
            </div>
            
            <!-- Date Range -->
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Start Date *
                </label>
                <input 
                  v-model="form.startDate"
                  type="date" 
                  required
                  :min="minDate"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  End Date *
                </label>
                <input 
                  v-model="form.endDate"
                  type="date" 
                  required
                  :min="form.startDate || minDate"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
              </div>
            </div>
            
            <!-- Trip Duration Display -->
            <div v-if="tripDuration > 0" class="bg-blue-50 p-4 rounded-lg">
              <p class="text-blue-800 font-medium">
                🗓️ Trip Duration: {{ tripDuration }} {{ tripDuration === 1 ? 'day' : 'days' }}
              </p>
            </div>
            
            <!-- Interests -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                What interests you? * (Select all that apply)
              </label>
              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                <label 
                  v-for="interest in availableInterests" 
                  :key="interest.value"
                  class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  :class="{ 'bg-blue-50 border-blue-200': form.interests.includes(interest.value) }"
                >
                  <input 
                    type="checkbox" 
                    :value="interest.value"
                    v-model="form.interests"
                    class="mr-3 text-blue-600 focus:ring-blue-500"
                  >
                  <div class="flex items-center">
                    <span class="text-lg mr-2">{{ interest.icon }}</span>
                    <span class="text-sm font-medium">{{ interest.label }}</span>
                  </div>
                </label>
              </div>
              <p class="text-sm text-gray-500 mt-2">Select at least one to get personalized recommendations</p>
            </div>
            
            <!-- Budget Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                Budget Range
              </label>
              <div class="grid md:grid-cols-3 gap-4">
                <label 
                  class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  :class="{ 'bg-green-50 border-green-200': form.budget === 'budget' }"
                >
                  <input 
                    type="radio" 
                    value="budget"
                    v-model="form.budget"
                    class="mr-3 text-green-600 focus:ring-green-500"
                  >
                  <div>
                    <div class="font-medium text-green-700">💰 Budget</div>
                    <div class="text-sm text-gray-600">$500 - $1,000</div>
                    <div class="text-xs text-gray-500 mt-1">Hostels, street food, public transport</div>
                  </div>
                </label>
                
                <label 
                  class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  :class="{ 'bg-blue-50 border-blue-200': form.budget === 'mid-range' }"
                >
                  <input 
                    type="radio" 
                    value="mid-range"
                    v-model="form.budget"
                    class="mr-3 text-blue-600 focus:ring-blue-500"
                  >
                  <div>
                    <div class="font-medium text-blue-700">🏨 Mid-Range</div>
                    <div class="text-sm text-gray-600">$1,000 - $2,500</div>
                    <div class="text-xs text-gray-500 mt-1">Hotels, restaurants, tours</div>
                  </div>
                </label>
                
                <label 
                  class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  :class="{ 'bg-purple-50 border-purple-200': form.budget === 'luxury' }"
                >
                  <input 
                    type="radio" 
                    value="luxury"
                    v-model="form.budget"
                    class="mr-3 text-purple-600 focus:ring-purple-500"
                  >
                  <div>
                    <div class="font-medium text-purple-700">✨ Luxury</div>
                    <div class="text-sm text-gray-600">$2,500+</div>
                    <div class="text-xs text-gray-500 mt-1">Premium hotels, fine dining</div>
                  </div>
                </label>
              </div>
            </div>
            
            <!-- Travel Pace -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                Travel Pace
              </label>
              <div class="grid md:grid-cols-3 gap-4">
                <label 
                  class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  :class="{ 'bg-green-50 border-green-200': form.pace === 'relaxed' }"
                >
                  <input 
                    type="radio" 
                    value="relaxed"
                    v-model="form.pace"
                    class="mr-3 text-green-600 focus:ring-green-500"
                  >
                  <div>
                    <div class="font-medium text-green-700">🌿 Relaxed</div>
                    <div class="text-sm text-gray-600">Take it easy</div>
                    <div class="text-xs text-gray-500 mt-1">2-3 activities per day</div>
                  </div>
                </label>
                
                <label 
                  class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  :class="{ 'bg-blue-50 border-blue-200': form.pace === 'moderate' }"
                >
                  <input 
                    type="radio" 
                    value="moderate"
                    v-model="form.pace"
                    class="mr-3 text-blue-600 focus:ring-blue-500"
                  >
                  <div>
                    <div class="font-medium text-blue-700">⚖️ Moderate</div>
                    <div class="text-sm text-gray-600">Balanced schedule</div>
                    <div class="text-xs text-gray-500 mt-1">3-4 activities per day</div>
                  </div>
                </label>
                
                <label 
                  class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  :class="{ 'bg-orange-50 border-orange-200': form.pace === 'active' }"
                >
                  <input 
                    type="radio" 
                    value="active"
                    v-model="form.pace"
                    class="mr-3 text-orange-600 focus:ring-orange-500"
                  >
                  <div>
                    <div class="font-medium text-orange-700">⚡ Active</div>
                    <div class="text-sm text-gray-600">Pack it all in</div>
                    <div class="text-xs text-gray-500 mt-1">4-5 activities per day</div>
                  </div>
                </label>
              </div>
            </div>
            
            <!-- Additional Notes -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea 
                v-model="form.notes"
                rows="3"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Any special requirements, dietary restrictions, or preferences..."
              ></textarea>
            </div>
          </div>
          
          <!-- Error Message -->
          <div v-if="error" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-red-800 text-sm">{{ error }}</p>
          </div>
          
          <!-- Action Buttons -->
          <div class="mt-8 flex flex-col sm:flex-row gap-4">
            <button 
              type="button"
              @click="generateWithAI"
              :disabled="loading || !isFormValid"
              class="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 px-6 rounded-lg hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span v-if="loading" class="animate-spin">⚙️</span>
              <span v-else>🤖</span>
              <span>{{ loading ? 'Generating Amazing Itinerary...' : 'Generate with AI' }}</span>
            </button>
            
            <button 
              type="submit"
              :disabled="!isFormValid"
              class="flex-1 bg-gray-600 text-white py-4 px-6 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>📝</span>
              <span>Create Manual Trip</span>
            </button>
          </div>
          
          <!-- Tips -->
          <div class="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 class="font-medium text-yellow-800 mb-2">💡 Pro Tips:</h3>
            <ul class="text-sm text-yellow-700 space-y-1">
              <li>• <strong>AI Generation:</strong> Get a complete itinerary based on your preferences</li>
              <li>• <strong>Manual Creation:</strong> Start with a blank template and add your own activities</li>
              <li>• <strong>Flexibility:</strong> You can always edit and customize any itinerary later</li>
              <li>• <strong>Chat Support:</strong> Use our AI assistant to get recommendations anytime</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateTrip',
  data() {
    return {
      form: {
        title: '',
        destination: '',
        startDate: '',
        endDate: '',
        interests: [],
        budget: 'mid-range',
        pace: 'moderate',
        notes: ''
      },
      availableInterests: [
        { value: 'Culture', label: 'Culture', icon: '🏛️' },
        { value: 'Food', label: 'Food', icon: '🍽️' },
        { value: 'Adventure', label: 'Adventure', icon: '🏔️' },
        { value: 'Nature', label: 'Nature', icon: '🌿' },
        { value: 'History', label: 'History', icon: '📚' },
        { value: 'Art', label: 'Art', icon: '🎨' },
        { value: 'Shopping', label: 'Shopping', icon: '🛍️' },
        { value: 'Nightlife', label: 'Nightlife', icon: '🌃' },
        { value: 'Museums', label: 'Museums', icon: '🏛️' },
        { value: 'Architecture', label: 'Architecture', icon: '🏗️' },
        { value: 'Beach', label: 'Beach', icon: '🏖️' },
        { value: 'Mountains', label: 'Mountains', icon: '⛰️' }
      ],
      loading: false,
      error: ''
    }
  },
  computed: {
    minDate() {
      return new Date().toISOString().split('T')[0]
    },
    tripDuration() {
      if (this.form.startDate && this.form.endDate) {
        const start = new Date(this.form.startDate)
        const end = new Date(this.form.endDate)
        const diffTime = Math.abs(end - start)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
        return diffDays > 0 ? diffDays : 0
      }
      return 0
    },
    isFormValid() {
      return this.form.title && 
             this.form.destination && 
             this.form.startDate && 
             this.form.endDate && 
             this.form.interests.length > 0 &&
             new Date(this.form.startDate) <= new Date(this.form.endDate)
    }
  },
  methods: {
    async generateWithAI() {
      if (!this.validateForm()) return
      
      this.loading = true
      this.error = ''
      
      try {
        console.log('Generating AI itinerary with:', this.form)
        
        const response = await fetch('http://localhost:5000/api/generate-itinerary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(this.form)
        })
        
        const data = await response.json()
        
        if (response.ok) {
          console.log('AI itinerary generated successfully:', data)
          this.$router.push(`/itinerary/${data._id}`)
        } else {
          this.error = data.message || 'Failed to generate itinerary. Please try again.'
        }
      } catch (error) {
        console.error('Error generating itinerary:', error)
        this.error = 'Network error. Please check your connection and try again.'
      } finally {
        this.loading = false
      }
    },
    
    async handleSubmit() {
      if (!this.validateForm()) return
      
      try {
        const itinerary = {
          ...this.form,
          days: this.generateEmptyDays()
        }
        
        console.log('Creating manual itinerary:', itinerary)
        
        const response = await fetch('http://localhost:5000/api/itineraries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(itinerary)
        })
        
        const data = await response.json()
        
        if (response.ok) {
          console.log('Manual itinerary created successfully:', data)
          this.$router.push(`/itinerary/${data._id}`)
        } else {
          this.error = data.message || 'Failed to create itinerary. Please try again.'
        }
      } catch (error) {
        console.error('Error creating itinerary:', error)
        this.error = 'Network error. Please check your connection and try again.'
      }
    },
    
    validateForm() {
      this.error = ''
      
      if (!this.form.title.trim()) {
        this.error = 'Please enter a trip title'
        return false
      }
      
      if (!this.form.destination.trim()) {
        this.error = 'Please enter a destination'
        return false
      }
      
      if (!this.form.startDate) {
        this.error = 'Please select a start date'
        return false
      }
      
      if (!this.form.endDate) {
        this.error = 'Please select an end date'
        return false
      }
      
      if (new Date(this.form.startDate) > new Date(this.form.endDate)) {
        this.error = 'End date must be after start date'
        return false
      }
      
      if (this.form.interests.length === 0) {
        this.error = 'Please select at least one interest'
        return false
      }
      
      if (this.tripDuration > 30) {
        this.error = 'Trip duration cannot exceed 30 days'
        return false
      }
      
      return true
    },
    
    generateEmptyDays() {
      const days = []
      const start = new Date(this.form.startDate)
      const end = new Date(this.form.endDate)
      
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        days.push({
          date: new Date(d),
          activities: []
        })
      }
      
      return days
    }
  },
  
  mounted() {
    // Set default start date to tomorrow
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    this.form.startDate = tomorrow.toISOString().split('T')[0]
    
    // Set default end date to 3 days later
    const defaultEnd = new Date()
    defaultEnd.setDate(defaultEnd.getDate() + 4)
    this.form.endDate = defaultEnd.toISOString().split('T')[0]
  }
}
</script>

<style scoped>
/* Custom animations */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Hover effects for cards */
.interest-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.budget-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}

/* Focus states */
input[type="checkbox"]:focus,
input[type="radio"]:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>