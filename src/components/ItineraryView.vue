<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="loading" class="max-w-5xl mx-auto px-4 py-8">
      <div class="bg-white rounded-xl shadow-sm border p-8">
        <div class="animate-pulse space-y-6">
          <div class="h-8 bg-gray-200 rounded-lg w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded-md w-1/2"></div>
          <div class="space-y-4">
            <div class="h-20 bg-gray-200 rounded-lg"></div>
            <div class="h-20 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="itinerary" class="max-w-5xl mx-auto px-4 py-8">
      <!-- Header Section with Destination Photos -->
      <div class="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <!-- Hero Photo Section -->
        <div v-if="itinerary.destinationPhotos && itinerary.destinationPhotos.length > 0" class="relative h-64 overflow-hidden">
          <img 
            :src="itinerary.destinationPhotos[0].url" 
            :alt="itinerary.destinationPhotos[0].description"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <div class="absolute bottom-4 left-6 text-white">
            <div class="flex items-center gap-2 text-sm opacity-90">
              <span>📸 Photo by {{ itinerary.destinationPhotos[0].photographer }}</span>
              <span>•</span>
              <span>{{ itinerary.destinationPhotos[0].source }}</span>
            </div>
          </div>
        </div>
        
        <div class="p-8">
          <div class="flex flex-col lg:items-start lg:justify-between gap-8">
            <!-- Trip Info -->
            <div class="flex-1">
              <!-- Title -->
              <div class="flex items-center gap-3 mb-3">
                <input 
                  v-if="editMode"
                  v-model="editForm.title"
                  class="text-3xl font-bold text-gray-900 bg-transparent border-b-2 border-blue-300 focus:border-blue-500 focus:outline-none"
                  placeholder="Trip title..."
                />
                <h1 v-else class="text-3xl font-bold text-gray-900">{{ itinerary.title }}</h1>
                
                <span v-if="itinerary.aiGenerated" class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs px-3 py-1 rounded-full font-medium border border-emerald-200">
                  🤖 AI Generated
                </span>
                
                <span v-if="itinerary.photosEnabled" class="inline-flex items-center gap-1 bg-purple-50 text-purple-700 text-xs px-3 py-1 rounded-full font-medium border border-purple-200">
                  📸 Photos Included
                </span>
              </div>
              
              <!-- Trip Details -->
              <div class="flex flex-wrap items-center gap-6 text-gray-600 mb-4">
                <!-- Destination -->
                <div class="flex items-center gap-2">
                  <div class="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                    📍
                  </div>
                  <input 
                    v-if="editMode"
                    v-model="editForm.destination"
                    class="font-medium bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                    placeholder="Destination..."
                  />
                  <span v-else class="font-medium">{{ itinerary.destination }}</span>
                </div>
                
                <!-- Dates -->
                <div class="flex items-center gap-2">
                  <div class="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    📅
                  </div>
                  <div v-if="editMode" class="flex items-center gap-2">
                    <input 
                      v-model="editForm.startDate"
                      type="date"
                      class="text-sm bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                      @change="handleDateChange"
                    />
                    <span>-</span>
                    <input 
                      v-model="editForm.endDate"
                      type="date"
                      :min="editForm.startDate"
                      class="text-sm bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                      @change="handleDateChange"
                    />
                  </div>
                  <span v-else>{{ formatDate(itinerary.startDate) }} - {{ formatDate(itinerary.endDate) }}</span>
                </div>
                
                <!-- Duration -->
                <div class="flex items-center gap-2">
                  <div class="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                    ⏱️
                  </div>
                  <span>{{ tripDuration }} days</span>
                </div>
              </div>
              
              <!-- Preferences -->
              <div class="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <!-- Budget -->
                <div class="flex items-center gap-2">
                  <span>💰 Budget:</span>
                  <select v-if="editMode" v-model="editForm.budget" class="bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none capitalize">
                    <option value="budget">Budget</option>
                    <option value="mid-range">Mid-range</option>
                    <option value="luxury">Luxury</option>
                  </select>
                  <span v-else class="font-medium capitalize">{{ getBudgetLabel(itinerary.budget) }}</span>
                </div>
                
                <!-- Interests -->
                <div v-if="editMode || hasInterests" class="flex items-center gap-2">
                  <span>🎯 Interests:</span>
                  <div v-if="editMode" class="flex flex-wrap gap-1">
                    <select v-model="selectedInterest" @change="addInterest" class="text-xs border border-gray-300 rounded px-2 py-1">
                      <option value="">Add...</option>
                      <option v-for="interest in availableInterests" :key="interest" :value="interest">{{ interest }}</option>
                    </select>
                    <span v-for="interest in editForm.interests" :key="interest" 
                      class="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {{ interest }}
                      <button @click="removeInterest(interest)" class="hover:text-blue-600">×</button>
                    </span>
                  </div>
                  <span v-else>{{ displayInterests }}</span>
                </div>
                
                <!-- Pace -->
                <div class="flex items-center gap-2">
                  <span>⚡ Pace:</span>
                  <select v-if="editMode" v-model="editForm.pace" class="bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none capitalize">
                    <option value="relaxed">Relaxed</option>
                    <option value="moderate">Moderate</option>
                    <option value="active">Active</option>
                  </select>
                  <span v-else class="capitalize">{{ itinerary.preferences?.pace || 'moderate' }}</span>
                </div>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-3">
              <router-link 
                :to="`/chat/${itinerary._id}`"
                class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Chat
              </router-link>
              
              <!-- Photo Actions (only show if photos aren't enabled) -->
              <button 
                v-if="!itinerary.photosEnabled && !editMode"
                @click="addPhotosToItinerary"
                :disabled="addingPhotos"
                class="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {{ addingPhotos ? '📸 Adding Photos...' : '📸 Add Photos' }}
              </button>
              
              <button 
                @click="toggleEditMode"
                class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                {{ editMode ? '👁️ View Mode' : '✏️ Edit Details' }}
              </button>
              
              <!-- Edit Mode Buttons -->
              <template v-if="editMode">
                <button 
                  @click="saveChanges"
                  :disabled="saving"
                  class="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {{ saving ? '⏳ Saving...' : '💾 Save' }}
                </button>
                <button 
                  @click="cancelChanges"
                  class="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
                >
                  ❌ Cancel
                </button>
              </template>
              
              <!-- View Mode Buttons -->
              <template v-else>
                <button 
                  @click="regenerateEntireItinerary"
                  :disabled="generatingAI"
                  class="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50"
                >
                  {{ generatingAI ? '🤖 Regenerating...' : '🤖 Regenerate with AI' }}
                </button>
                <button 
                  @click="exportItinerary"
                  class="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  📄 Export
                </button>
                <button 
                  @click="shareItinerary"
                  class="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  🔗 Share
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- Date Change Warning -->
      <div v-if="showDateWarning" class="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
        <div class="flex items-start gap-4">
          <div class="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
            ⚠️
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-medium text-amber-800 mb-2">Trip Dates Changed</h3>
            <p class="text-amber-700 mb-4">
              You've changed the trip duration from {{ originalDuration }} to {{ newDuration }} days. 
              {{ newDuration > originalDuration ? 'New days will be added.' : 'Some days may be removed.' }}
            </p>
            <div class="flex gap-3">
              <button @click="acceptDateChange" class="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors">
                Keep New Dates
              </button>
              <button @click="revertDateChange" class="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
                Revert Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-sm border p-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl">📅</div>
            <div>
              <p class="text-sm font-medium text-gray-600 mb-1">Total Days</p>
              <p class="text-2xl font-bold text-gray-900">{{ tripDuration }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-sm border p-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-2xl">📋</div>
            <div>
              <p class="text-sm font-medium text-gray-600 mb-1">Activities</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalActivities }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-sm border p-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-2xl">💰</div>
            <div>
              <p class="text-sm font-medium text-gray-600 mb-1">Est. Cost</p>
              <p class="text-2xl font-bold text-gray-900">${{ estimatedCost }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-sm border p-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-2xl">⭐</div>
            <div>
              <p class="text-sm font-medium text-gray-600 mb-1">Status</p>
              <p class="text-2xl font-bold text-gray-900">{{ tripStatus }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Daily Itinerary -->
      <div class="space-y-8">
        <div 
          v-for="(day, dayIndex) in currentDays" 
          :key="`day-${dayIndex}`" 
          class="bg-white rounded-xl shadow-sm border overflow-hidden"
        >
          <!-- Day Header with Photo -->
          <div class="relative">
            <!-- Day Photo Background -->
            <div v-if="day.dayPhoto" class="h-32 overflow-hidden">
              <img 
                :src="day.dayPhoto.url" 
                :alt="day.dayPhoto.description"
                class="w-full h-full object-cover opacity-40"
              />
              <div class="absolute inset-0 bg-gradient-to-r from-gray-900/60 to-gray-900/30"></div>
            </div>
            
            <!-- Day Header Content -->
            <div class="relative bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b" 
                 :class="{ 'absolute inset-x-0 bottom-0 bg-gradient-to-r from-gray-900/80 to-gray-900/60 text-white border-none': day.dayPhoto }">
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-xl font-semibold mb-1" 
                      :class="day.dayPhoto ? 'text-white' : 'text-gray-900'">
                    Day {{ dayIndex + 1 }} - {{ formatDayDate(day.date) }}
                  </h2>
                  <div class="flex items-center gap-4 text-sm" 
                       :class="day.dayPhoto ? 'text-gray-200' : 'text-gray-600'">
                    <span>{{ day.activities?.length || 0 }} activities planned</span>
                    <span v-if="getDayCost(day) > 0">💰 ${{ getDayCost(day) }}</span>
                    <span v-if="day.dayPhoto" class="text-xs opacity-75">
                      📸 by {{ day.dayPhoto.photographer }}
                    </span>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <div class="text-3xl">{{ getDayIcon(dayIndex) }}</div>
                  
                  <!-- Edit Mode Controls -->
                  <div v-if="editMode" class="flex items-center gap-2">
                    <button 
                      @click="addActivity(dayIndex)"
                      class="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                      :class="day.dayPhoto ? 'text-white hover:bg-white/20' : 'text-blue-600 hover:text-blue-800'"
                      title="Add Activity"
                    >
                      ➕
                    </button>
                    
                    <div class="relative">
                      <button 
                        @click="toggleDayMenu(dayIndex)"
                        class="p-2 hover:bg-purple-50 rounded-lg transition-colors"
                        :class="day.dayPhoto ? 'text-white hover:bg-white/20' : 'text-purple-600 hover:text-purple-800'"
                        title="AI Options"
                      >
                        🤖
                      </button>
                      
                      <!-- Day AI Menu -->
                      <div v-if="showDayMenu === dayIndex" class="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border z-10">
                        <div class="p-2">
                          <button 
                            @click="generateAIActivities(dayIndex)"
                            :disabled="generatingAI"
                            class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-2 disabled:opacity-50"
                          >
                            ⚡ {{ generatingAI ? 'Generating...' : 'Generate AI Activities' }}
                          </button>
                          <button 
                            @click="optimizeDay(dayIndex)"
                            class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-2"
                          >
                            🔄 Optimize Schedule
                          </button>
                          <button 
                            @click="clearDay(dayIndex)"
                            class="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md flex items-center gap-2"
                          >
                            🗑️ Clear Day
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Activities -->
          <div class="p-8">
            <div v-if="day.activities && day.activities.length > 0" class="space-y-6">
              <div 
                v-for="(activity, actIndex) in day.activities" 
                :key="`activity-${dayIndex}-${actIndex}`"
                class="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-all"
                :class="{ 'border-blue-300 bg-blue-50': isEditingActivity(dayIndex, actIndex) }"
              >
                <!-- Activity Photo -->
                <div v-if="getActivityPhoto(activity)" class="h-96 overflow-hidden relative">
                  <img 
                    :src="getActivityPhoto(activity).url" 
                    :alt="getActivityPhoto(activity).description"
                    class="w-full h-full object-cover"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  <div class="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    📸 {{ getActivityPhoto(activity).photographer }}
                  </div>
                  <!-- Photo Refresh Button -->
                  <div v-if="editMode" class="absolute top-2 right-2">
                    <button 
                      @click="refreshActivityPhoto(dayIndex, actIndex)"
                      :disabled="refreshingPhoto"
                      class="bg-white/80 hover:bg-white text-gray-700 p-1.5 rounded-full transition-colors text-xs"
                      title="Refresh Photo"
                    >
                      {{ refreshingPhoto ? '⏳' : '🔄' }}
                    </button>
                  </div>
                </div>
                
                <div class="p-6">
                  <!-- Edit Activity Form -->
                  <div v-if="isEditingActivity(dayIndex, actIndex)" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Time</label>
                        <input 
                          v-model="editingActivity.data.time"
                          type="time"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                        <input 
                          v-model="editingActivity.data.duration"
                          type="text"
                          placeholder="e.g., 2 hours"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Activity</label>
                      <input 
                        v-model="editingActivity.data.activity"
                        type="text"
                        placeholder="What are you doing?"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <input 
                          v-model="editingActivity.data.location"
                          type="text"
                          placeholder="Where is this happening?"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Cost ($)</label>
                        <input 
                          v-model.number="editingActivity.data.cost"
                          type="number"
                          min="0"
                          placeholder="0"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                      <textarea 
                        v-model="editingActivity.data.notes"
                        rows="3"
                        placeholder="Any special notes or instructions..."
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                    </div>
                    
                    <div class="flex gap-3 pt-4">
                      <button @click="saveActivity" class="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                        💾 Save Activity
                      </button>
                      <button @click="cancelActivityEdit" class="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
                        ❌ Cancel
                      </button>
                      <button @click="deleteActivity(dayIndex, actIndex)" class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors ml-auto">
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                  
                  <!-- View Activity -->
                  <div v-else class="space-y-4">
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <div class="flex items-center gap-3 mb-3">
                          <div class="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-200">
                            {{ formatTime(activity.time) }}
                          </div>
                          <h3 class="font-semibold text-gray-900 text-lg">{{ activity.activity }}</h3>
                          <div v-if="activity.cost > 0" class="inline-flex items-center px-2 py-1 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-full border border-emerald-200">
                            ${{ activity.cost }}
                          </div>
                          <div v-else class="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                            Free
                          </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                          <div class="flex items-center gap-2">
                            📍 <span>{{ activity.location }}</span>
                          </div>
                          <div class="flex items-center gap-2">
                            ⏱️ <span>{{ activity.duration }}</span>
                          </div>
                          <div class="flex items-center gap-2">
                            🏷️ <span>{{ getActivityCategory(activity.activity) }}</span>
                          </div>
                        </div>
                        
                        <div v-if="activity.notes" class="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                          <div class="flex items-start gap-2">
                            <span class="text-amber-600">💡</span>
                            <div>
                              <p class="text-sm font-medium text-amber-800">Note</p>
                              <p class="text-sm text-amber-700">{{ activity.notes }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <!-- Edit Controls -->
                      <div v-if="editMode" class="flex items-center gap-2">
                        <button 
                          @click="editActivity(dayIndex, actIndex)"
                          class="text-gray-500 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Activity"
                        >
                          ✏️
                        </button>
                        
                        <div class="relative">
                          <button 
                            @click="toggleActivityMenu(dayIndex, actIndex)"
                            class="text-gray-500 hover:text-purple-600 p-2 hover:bg-purple-50 rounded-lg transition-colors"
                            title="AI Options"
                          >
                            🤖
                          </button>
                          
                          <!-- Activity AI Menu -->
                          <div v-if="showActivityMenu === `${dayIndex}-${actIndex}`" class="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border z-20">
                            <div class="p-2">
                              <button 
                                @click="enhanceActivity(dayIndex, actIndex)"
                                :disabled="generatingAI"
                                class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-2 disabled:opacity-50"
                              >
                                ✨ Enhance with AI
                              </button>
                              <button 
                                @click="generateAlternatives(dayIndex, actIndex)"
                                :disabled="generatingAI"
                                class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-2 disabled:opacity-50"
                              >
                                🔄 Find Alternatives
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Empty State -->
            <div v-else class="text-center py-16">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                📝
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">No activities planned for this day</h3>
              <p class="text-gray-600 mb-4">Start planning by adding your first activity.</p>
              <button 
                v-if="editMode"
                @click="addActivity(dayIndex)"
                class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                ➕ Add Activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="max-w-2xl mx-auto px-4 py-16 text-center">
      <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
        ❌
      </div>
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Itinerary Not Found</h2>
      <p class="text-gray-600 mb-8">The itinerary you're looking for doesn't exist or you don't have permission to view it.</p>
      <button 
        onclick="window.history.back()" 
        class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        ⬅️ Go Back
      </button>
    </div>

    <!-- Share Modal -->
    <div v-if="showShareModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click="showShareModal = false">
      <div class="bg-white rounded-xl shadow-xl border p-6 max-w-md w-full" @click.stop>
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Share Itinerary</h3>
          <button @click="showShareModal = false" class="text-gray-400 hover:text-gray-600 transition-colors">
            ❌
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Share Link</label>
            <div class="flex rounded-lg overflow-hidden border border-gray-300">
              <input 
                :value="shareUrl" 
                readonly 
                class="flex-1 px-3 py-2 bg-gray-50 text-sm text-gray-700 focus:outline-none"
              >
              <button 
                @click="copyShareUrl"
                class="px-4 py-2 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                📋 Copy
              </button>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-3">
            <button 
              @click="shareViaEmail" 
              class="flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              📧 Email
            </button>
            <button 
              @click="shareViaWhatsApp" 
              class="flex items-center justify-center gap-2 py-2.5 px-4 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors"
            >
              💬 WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CleanItineraryEditor',

  data() {
    return {
      // Core data
      itinerary: null,
      originalItinerary: null,
      loading: true,
      
      // Edit mode
      editMode: false,
      saving: false,
      editForm: {
        title: '',
        destination: '',
        startDate: '',
        endDate: '',
        interests: [],
        budget: '',
        pace: '',
        notes: ''
      },
      
      // Date handling
      showDateWarning: false,
      originalDuration: 0,
      newDuration: 0,
      
      // Activity editing
      editingActivity: null,
      
      // AI features
      generatingAI: false,
      showDayMenu: null,
      showActivityMenu: null,
      
      // Photo features
      addingPhotos: false,
      refreshingPhoto: false,
      
      // UI state
      showShareModal: false,
      selectedInterest: '',
      
      // Available options
      availableInterests: [
        'Culture', 'Food', 'Adventure', 'Nature', 'History', 
        'Art', 'Shopping', 'Nightlife', 'Museums', 'Architecture', 
        'Beach', 'Mountains'
      ]
    }
  },
  
  computed: {
    tripDuration() {
      if (this.editMode && this.editForm.startDate && this.editForm.endDate) {
        const start = new Date(this.editForm.startDate)
        const end = new Date(this.editForm.endDate)
        return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1
      }
      if (!this.itinerary) return 0
      const start = new Date(this.itinerary.startDate)
      const end = new Date(this.itinerary.endDate)
      return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1
    },
    
    currentDays() {
      if (this.editMode && this.showDateWarning) {
        return this.generateDaysFromDates(this.editForm.startDate, this.editForm.endDate)
      }
      return this.itinerary?.days || []
    },
    
    totalActivities() {
      return this.currentDays.reduce((total, day) => total + (day.activities?.length || 0), 0)
    },
    
    estimatedCost() {
      return this.currentDays.reduce((total, day) => {
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
      return 'Active'
    },
    
    shareUrl() {
      return `${window.location.origin}/itinerary/${this.itinerary?._id}`
    },
    
    hasInterests() {
      return this.itinerary?.preferences?.interests?.length > 0
    },
    
    displayInterests() {
      const interests = this.itinerary?.preferences?.interests || []
      return interests.slice(0, 2).join(', ') + (interests.length > 2 ? ` +${interests.length - 2}` : '')
    }
  },
  
  async mounted() {
    await this.fetchItinerary()
  },
  
  methods: {
    // =============================================================================
  // PHOTO MANAGEMENT METHODS
  // =============================================================================
  
 
  
  async addPhotosToItinerary() {
  this.addingPhotos = true
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
  
  try {
    this.showNotification('📸 Adding photos to your itinerary...', 'info')
    
    // First, try the standard photo addition endpoint
    const response = await fetch(`${API_BASE_URL}/api/itineraries/${this.itinerary._id}/add-photos`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    
    if (response.ok) {
      const result = await response.json()
      this.itinerary = result.itinerary
      this.originalItinerary = JSON.parse(JSON.stringify(result.itinerary))
      
      // Check if activity photos were actually generated
      const activityPhotosCount = this.countActivityPhotos()
      
      if (activityPhotosCount === 0) {
        this.showNotification('📸 Destination photos added, generating activity photos...', 'info')
        await this.generateActivityPhotosManually()
      } else {
        this.showNotification(`✨ Added ${result.photoCount} photos to your itinerary!`, 'success')
      }
    } else {
      const errorData = await response.json()
      console.error('Photo addition failed:', errorData)
      await this.generateAllPhotosManually()
    }
  } catch (error) {
    console.error('Error adding photos:', error)
    await this.generateAllPhotosManually()
  } finally {
    this.addingPhotos = false
  }
},
countActivityPhotos() {
  let count = 0
  if (this.itinerary?.days) {
    this.itinerary.days.forEach(day => {
      if (day.activities) {
        day.activities.forEach(activity => {
          if (activity.photo && activity.photo.url) {
            count++
          }
        })
      }
    })
  }
  return count
},  

// FRONTEND: Enhanced photo generation methods for Vue component

// Enhanced addPhotosToItinerary with better activity photo handling
async addPhotosToItinerary() {
  this.addingPhotos = true
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
  
  try {
    this.showNotification('📸 Adding photos to your itinerary...', 'info')
    
    // First, try the standard photo addition endpoint
    const response = await fetch(`${API_BASE_URL}/api/itineraries/${this.itinerary._id}/add-photos`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    
    if (response.ok) {
      const result = await response.json()
      this.itinerary = result.itinerary
      this.originalItinerary = JSON.parse(JSON.stringify(result.itinerary))
      
      // Check if activity photos were actually generated
      const activityPhotosCount = this.countActivityPhotos()
      
      if (activityPhotosCount === 0) {
        this.showNotification('📸 Destination photos added, generating activity photos...', 'info')
        await this.generateActivityPhotosManually()
      } else {
        this.showNotification(`✨ Added ${result.photoCount} photos to your itinerary!`, 'success')
      }
    } else {
      const errorData = await response.json()
      console.error('Photo addition failed:', errorData)
      await this.generateAllPhotosManually()
    }
  } catch (error) {
    console.error('Error adding photos:', error)
    await this.generateAllPhotosManually()
  } finally {
    this.addingPhotos = false
  }
},

// Count how many activities have photos
countActivityPhotos() {
  let count = 0
  if (this.itinerary?.days) {
    this.itinerary.days.forEach(day => {
      if (day.activities) {
        day.activities.forEach(activity => {
          if (activity.photo && activity.photo.url) {
            count++
          }
        })
      }
    })
  }
  return count
},

async fetchDestinationPhotos() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/photos/destination/${encodeURIComponent(this.itinerary.destination)}?count=10`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    
    if (response.ok) {
      const result = await response.json()
      return result.photos || []
    }
  } catch (error) {
    console.error('Error fetching destination photos:', error)
  }
  
  return []
},

async fetchActivityPhoto(activity, destinationPhotos) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/photos/activity?${new URLSearchParams({
      destination: this.itinerary.destination,
      activity: activity.activity,
      location: activity.location
    })}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    
    if (response.ok) {
      const result = await response.json()
      return result.photo
    }
  } catch (error) {
    console.error('Error fetching activity photo:', error)
  }
  
  // Return a destination photo as fallback
  return destinationPhotos[Math.floor(Math.random() * destinationPhotos.length)] || null
},

// Fetch activity-specific photo
async fetchActivityPhoto(activity, destinationPhotos) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/photos/activity?${new URLSearchParams({
      destination: this.itinerary.destination,
      activity: activity.activity,
      location: activity.location
    })}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    
    if (response.ok) {
      const result = await response.json()
      return result.photo
    }
  } catch (error) {
    console.error('Error fetching activity photo:', error)
  }
  
  // Return a destination photo as fallback
  return destinationPhotos[Math.floor(Math.random() * destinationPhotos.length)] || null
},

// Save itinerary with photos
async saveItineraryWithPhotos() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-itineraries/${this.itinerary._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        ...this.itinerary,
        photosEnabled: true,
        updatedAt: new Date().toISOString()
      })
    })
    
    if (response.ok) {
      const updatedItinerary = await response.json()
      this.itinerary = updatedItinerary
      this.originalItinerary = JSON.parse(JSON.stringify(updatedItinerary))
    } else {
      throw new Error('Failed to save itinerary with photos')
    }
  } catch (error) {
    console.error('Error saving itinerary with photos:', error)
    throw error
  }
},

// Generate all photos manually (fallback method)
async generateAllPhotosManually() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
  
  try {
    this.showNotification('📸 Generating all photos manually...', 'info')
    
    // Get destination photos
    const destinationPhotos = await this.fetchDestinationPhotos()
    
    // Update itinerary with destination photos
    if (destinationPhotos.length > 0) {
      this.itinerary.destinationPhotos = destinationPhotos.slice(0, 3)
      this.itinerary.photosEnabled = true
    }
    
    // Generate activity photos
    await this.generateActivityPhotosManually()
    
    this.showNotification('✨ All photos generated manually!', 'success')
    
  } catch (error) {
    console.error('Error generating all photos manually:', error)
    this.showNotification('❌ Could not generate photos. Please try again later.', 'error')
  }
},

// Enhanced getActivityPhoto method
getActivityPhoto(activity) {
  // Check for direct photo first
  if (activity.photo && activity.photo.url) {
    return activity.photo
  }
  
  // Check for fallback photo
  if (activity.fallbackPhoto && activity.fallbackPhoto.url) {
    return activity.fallbackPhoto
  }
  
  // Use destination photo as last resort
  if (this.itinerary.destinationPhotos && this.itinerary.destinationPhotos.length > 0) {
    return this.itinerary.destinationPhotos[0]
  }
  
  return null
},

// Enhanced refresh activity photo
async refreshActivityPhoto(dayIndex, actIndex) {
  this.refreshingPhoto = true
  
  try {
    const activity = this.currentDays[dayIndex].activities[actIndex]
    this.showNotification('📸 Refreshing activity photo...', 'info')
    
    // Get destination photos for fallback
    const destPhotos = await this.fetchDestinationPhotos()
    
    // Try to get a new activity photo
    const newPhoto = await this.fetchActivityPhoto(activity, destPhotos)
    
    if (newPhoto) {
      this.currentDays[dayIndex].activities[actIndex].photo = newPhoto
      this.showNotification('📸 Photo refreshed!', 'success')
    } else {
      // Use a different destination photo as fallback
      const fallbackPhoto = destPhotos[Math.floor(Math.random() * destPhotos.length)]
      this.currentDays[dayIndex].activities[actIndex].fallbackPhoto = fallbackPhoto
      this.showNotification('📸 Used alternative photo', 'info')
    }
    
    // Save the changes
    await this.saveItineraryWithPhotos()
    
  } catch (error) {
    console.error('Error refreshing photo:', error)
    this.showNotification('Failed to refresh photo', 'error')
  } finally {
    this.refreshingPhoto = false
  }
},

// Debug method to check photo status
debugPhotoStatus() {
  console.log('🔍 Photo Debug Status:')
  console.log('Photos enabled:', this.itinerary?.photosEnabled)
  console.log('Destination photos:', this.itinerary?.destinationPhotos?.length || 0)
  
  if (this.itinerary?.days) {
    this.itinerary.days.forEach((day, dayIndex) => {
      console.log(`Day ${dayIndex + 1}:`)
      console.log('  Day photo:', !!day.dayPhoto)
      
      if (day.activities) {
        day.activities.forEach((activity, actIndex) => {
          console.log(`  Activity ${actIndex + 1} (${activity.activity}):`)
          console.log('    Direct photo:', !!activity.photo?.url)
          console.log('    Fallback photo:', !!activity.fallbackPhoto?.url)
          console.log('    Has any photo:', !!this.getActivityPhoto(activity))
        })
      }
    })
  }
  
  console.log('Total activity photos:', this.countActivityPhotos())
},

// Generate activity photos manually
async generateActivityPhotosManually() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
  
  try {
    this.showNotification('📸 Generating individual activity photos...', 'info')
    
    // Get destination photos for fallback
    const destPhotos = await this.fetchDestinationPhotos()
    
    // Process each day
    for (let dayIndex = 0; dayIndex < this.itinerary.days.length; dayIndex++) {
      const day = this.itinerary.days[dayIndex]
      
      if (day.activities && day.activities.length > 0) {
        // Process each activity
        for (let actIndex = 0; actIndex < day.activities.length; actIndex++) {
          const activity = day.activities[actIndex]
          
          // Skip if activity already has a photo
          if (activity.photo && activity.photo.url) {
            continue
          }
          
          try {
            // Try to get activity-specific photo
            const activityPhoto = await this.fetchActivityPhoto(activity, destPhotos)
            
            if (activityPhoto) {
              this.itinerary.days[dayIndex].activities[actIndex].photo = activityPhoto
            } else {
              // Use destination photo as fallback
              const fallbackPhoto = destPhotos[actIndex % destPhotos.length]
              this.itinerary.days[dayIndex].activities[actIndex].fallbackPhoto = fallbackPhoto
            }
            
            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 100))
            
          } catch (error) {
            console.error(`Error getting photo for activity ${actIndex} on day ${dayIndex}:`, error)
            // Use destination photo as fallback
            const fallbackPhoto = destPhotos[actIndex % destPhotos.length]
            this.itinerary.days[dayIndex].activities[actIndex].fallbackPhoto = fallbackPhoto
          }
        }
      }
    }
    
    // Save the updated itinerary
    await this.saveItineraryWithPhotos()
    
    const activityPhotosCount = this.countActivityPhotos()
    this.showNotification(`✨ Generated ${activityPhotosCount} activity photos!`, 'success')
    
  } catch (error) {
    console.error('Error generating activity photos manually:', error)
    this.showNotification('❌ Some activity photos could not be generated', 'warning')
  }
},


    // =============================================================================
    // DATA MANAGEMENT
    // =============================================================================
    
    async fetchItinerary() {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
      try {
        const response = await fetch(`${API_BASE_URL}/api/itineraries/${this.$route.params.id}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
        
        if (response.ok) {
          this.itinerary = await response.json()
          this.originalItinerary = JSON.parse(JSON.stringify(this.itinerary))
          this.originalDuration = this.tripDuration
        } else {
          console.error('Failed to fetch itinerary')
        }
      } catch (error) {
        console.error('Error fetching itinerary:', error)
      } finally {
        this.loading = false
      }
    },
    
    // =============================================================================
    // EDIT MODE MANAGEMENT
    // =============================================================================
    
    toggleEditMode() {
      this.editMode = !this.editMode
      if (this.editMode) {
        this.populateEditForm()
      } else {
        this.cancelActivityEdit()
        this.showDateWarning = false
        this.showDayMenu = null
        this.showActivityMenu = null
      }
    },
    
    populateEditForm() {
      const startDate = this.itinerary.startDate ? this.itinerary.startDate.split('T')[0] : ''
      const endDate = this.itinerary.endDate ? this.itinerary.endDate.split('T')[0] : ''
      
      this.editForm = {
        title: this.itinerary.title || '',
        destination: this.itinerary.destination || '',
        startDate: startDate,
        endDate: endDate,
        interests: [...(this.itinerary.preferences?.interests || [])],
        budget: this.getBudgetPreference(this.itinerary.budget),
        pace: this.itinerary.preferences?.pace || 'moderate',
        notes: this.itinerary.notes || ''
      }
    },
    
    async saveChanges() {
      this.saving = true
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
      
      try {
        if (new Date(this.editForm.endDate) <= new Date(this.editForm.startDate)) {
          this.showNotification('End date must be after start date.', 'error')
          this.saving = false
          return
        }
        
        const updatePayload = {
          title: this.editForm.title,
          destination: this.editForm.destination,
          startDate: this.editForm.startDate,
          endDate: this.editForm.endDate,
          preferences: {
            interests: [...this.editForm.interests],
            pace: this.editForm.pace,
            accommodation: this.itinerary.preferences?.accommodation || '',
          },
          budget: this.getBudgetValue(this.editForm.budget),
          notes: this.editForm.notes,
          days: this.currentDays
        }
        
        const response = await fetch(`${API_BASE_URL}/api/generate-itineraries/${this.itinerary._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(updatePayload)
        })
        
        if (response.ok) {
          const updatedItinerary = await response.json()
          this.itinerary = updatedItinerary
          this.originalItinerary = JSON.parse(JSON.stringify(updatedItinerary))
          this.originalDuration = this.tripDuration
          this.editMode = false
          this.showDateWarning = false
          this.showNotification('Itinerary updated successfully! 🎉', 'success')
        } else {
          const errorData = await response.json()
          this.showNotification(errorData.message || 'Failed to save changes.', 'error')
        }
      } catch (error) {
        console.error('Error saving changes:', error)
        this.showNotification('Failed to save changes. Please try again.', 'error')
      } finally {
        this.saving = false
      }
    },
    
    cancelChanges() {
      if (confirm('Are you sure you want to cancel your changes?')) {
        this.itinerary = JSON.parse(JSON.stringify(this.originalItinerary))
        this.editMode = false
        this.showDateWarning = false
        this.editingActivity = null
      }
    },
    
    // =============================================================================
    // DATE MANAGEMENT
    // =============================================================================
    
    handleDateChange() {
      if (!this.editForm.startDate || !this.editForm.endDate) return
      
      this.newDuration = this.tripDuration
      if (this.newDuration !== this.originalDuration) {
        this.showDateWarning = true
      } else {
        this.showDateWarning = false
      }
    },
    
    acceptDateChange() {
      this.showDateWarning = false
      this.itinerary.days = this.generateDaysFromDates(this.editForm.startDate, this.editForm.endDate)
    },
    
    revertDateChange() {
      const originalStartDate = this.originalItinerary.startDate ? this.originalItinerary.startDate.split('T')[0] : ''
      const originalEndDate = this.originalItinerary.endDate ? this.originalItinerary.endDate.split('T')[0] : ''
      
      this.editForm.startDate = originalStartDate
      this.editForm.endDate = originalEndDate
      this.showDateWarning = false
    },
    
    generateDaysFromDates(startDate, endDate) {
      if (!startDate || !endDate) return this.itinerary?.days || []
      
      const start = new Date(startDate)
      const end = new Date(endDate)
      const newDuration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1
      const originalDays = this.itinerary?.days || []
      const newDays = []
      
      for (let i = 0; i < newDuration; i++) {
        const currentDate = new Date(start)
        currentDate.setDate(start.getDate() + i)
        const dateStr = currentDate.toISOString().split('T')[0]
        
        let dayActivities = []
        if (i < originalDays.length && originalDays[i]?.activities) {
          dayActivities = [...originalDays[i].activities]
        }
        
        newDays.push({
          date: dateStr,
          activities: dayActivities
        })
      }
      
      return newDays
    },
    
    // =============================================================================
    // INTERESTS MANAGEMENT
    // =============================================================================
    
    addInterest() {
      if (this.selectedInterest && !this.editForm.interests.includes(this.selectedInterest)) {
        this.editForm.interests.push(this.selectedInterest)
        this.selectedInterest = ''
      }
    },
    
    removeInterest(interest) {
      const index = this.editForm.interests.indexOf(interest)
      if (index > -1) {
        this.editForm.interests.splice(index, 1)
      }
    },
    
    // =============================================================================
    // ACTIVITY MANAGEMENT
    // =============================================================================
    
    addActivity(dayIndex) {
      const currentDestination = this.editMode ? this.editForm.destination : this.itinerary.destination
      
      this.editingActivity = {
        dayIndex,
        actIndex: -1,
        data: {
          time: '09:00',
          activity: '',
          location: currentDestination,
          duration: '2 hours',
          cost: 0,
          notes: ''
        }
      }
    },
    
    editActivity(dayIndex, actIndex) {
      const activity = this.currentDays[dayIndex].activities[actIndex]
      this.editingActivity = {
        dayIndex,
        actIndex,
        data: { ...activity }
      }
    },
    
    saveActivity() {
      if (!this.editingActivity) return
      
      const { dayIndex, actIndex, data } = this.editingActivity
      
      if (!data.activity || !data.location || !data.time) {
        this.showNotification('Please fill in all required fields', 'error')
        return
      }
      
      data.cost = Number(data.cost) || 0
      
      if (actIndex === -1) {
        if (!this.currentDays[dayIndex].activities) {
          this.currentDays[dayIndex].activities = []
        }
        this.currentDays[dayIndex].activities.push(data)
      } else {
        this.currentDays[dayIndex].activities[actIndex] = data
      }
      
      this.editingActivity = null
      this.showNotification('Activity saved! 📝', 'success')
    },
    
    cancelActivityEdit() {
      this.editingActivity = null
    },
    
    deleteActivity(dayIndex, actIndex) {
      if (confirm('Are you sure you want to delete this activity?')) {
        this.currentDays[dayIndex].activities.splice(actIndex, 1)
        this.showNotification('Activity deleted', 'info')
      }
    },
    
    isEditingActivity(dayIndex, actIndex) {
      return this.editingActivity?.dayIndex === dayIndex && this.editingActivity?.actIndex === actIndex
    },

    
    // =============================================================================
    // AI FEATURES
    // =============================================================================
    
    toggleDayMenu(dayIndex) {
      this.showDayMenu = this.showDayMenu === dayIndex ? null : dayIndex
      this.showActivityMenu = null
    },
    
    toggleActivityMenu(dayIndex, actIndex) {
      const menuKey = `${dayIndex}-${actIndex}`
      this.showActivityMenu = this.showActivityMenu === menuKey ? null : menuKey
      this.showDayMenu = null
    },
    
    getCurrentValues() {
      return {
        destination: this.editMode ? this.editForm.destination : this.itinerary.destination,
        startDate: this.editMode ? this.editForm.startDate : this.itinerary.startDate.split('T')[0],
        endDate: this.editMode ? this.editForm.endDate : this.itinerary.endDate.split('T')[0],
        interests: this.editMode ? this.editForm.interests : (this.itinerary.preferences?.interests || []),
        budget: this.editMode ? this.editForm.budget : this.getBudgetPreference(this.itinerary.budget),
        pace: this.editMode ? this.editForm.pace : (this.itinerary.preferences?.pace || 'moderate')
      }
    },
    
    async regenerateEntireItinerary() {
  if (!confirm('This will regenerate the entire itinerary with AI based on your current preferences. Continue?')) {
    return
  }
  
  this.generatingAI = true
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
  
  try {
    this.showNotification('🤖 Regenerating entire itinerary with AI...', 'info')
    
    const currentValues = this.getCurrentValues()
    const activitiesPerDay = currentValues.pace === 'relaxed' ? 3 : currentValues.pace === 'active' ? 5 : 4
    
    // Create a more structured prompt for better AI response
    const prompt = `Generate a complete ${this.tripDuration}-day itinerary for ${currentValues.destination}.

IMPORTANT: Return ONLY a valid JSON object with the exact structure below. No additional text or explanation.

Trip Details:
- Destination: ${currentValues.destination}
- Duration: ${this.tripDuration} days
- Interests: ${currentValues.interests.join(', ') || 'general sightseeing'}
- Budget: ${currentValues.budget}
- Pace: ${currentValues.pace}
- Activities per day: ${activitiesPerDay}

JSON Structure Required:
{
  "days": [
    {
      "activities": [
        {
          "time": "09:00",
          "activity": "Visit specific landmark or do specific activity",
          "location": "Specific location name with area, ${currentValues.destination}",
          "duration": "2 hours",
          "cost": 25,
          "notes": "Helpful tip or recommendation"
        }
      ]
    }
  ]
}

Generate exactly ${this.tripDuration} days, each with ${activitiesPerDay} activities. Use realistic costs in USD. Make location names specific and detailed for better photo matching.`

    const aiResponse = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        message: prompt,
        itineraryId: this.itinerary._id
      })
    })
    
    if (!aiResponse.ok) {
      const errorData = await aiResponse.json()
      throw new Error(errorData.message || 'Failed to generate with AI')
    }
    
    const result = await aiResponse.json()
    console.log('AI Response:', result.response) // Debug log
    
    // Parse the AI response more robustly
    const newItineraryData = this.parseAIResponse(result.response)
    
    if (!newItineraryData || !newItineraryData.days || !Array.isArray(newItineraryData.days)) {
      throw new Error('Invalid AI response format')
    }
    
    // Validate the generated data
    if (newItineraryData.days.length !== this.tripDuration) {
      throw new Error(`AI generated ${newItineraryData.days.length} days, expected ${this.tripDuration}`)
    }
    
    // Add proper dates to the generated days
    const startDate = new Date(currentValues.startDate)
    const daysWithDates = newItineraryData.days.map((day, index) => {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + index)
      const dateStr = currentDate.toISOString().split('T')[0]
      
      return {
        date: dateStr,
        activities: day.activities || [],
        dayPhoto: null // Will be populated if photos are enabled
      }
    })
    
    // Prepare the update payload
    const updatePayload = {
      title: this.itinerary.title,
      destination: currentValues.destination,
      startDate: currentValues.startDate,
      endDate: currentValues.endDate,
      preferences: {
        interests: currentValues.interests,
        pace: currentValues.pace,
        accommodation: this.itinerary.preferences?.accommodation || '',
      },
      budget: this.getBudgetValue(currentValues.budget),
      days: daysWithDates,
      aiGenerated: true,
      photosEnabled: this.itinerary.photosEnabled || false,
      updatedAt: new Date().toISOString()
    }
    
    // Update the itinerary
    const updateResponse = await fetch(`${API_BASE_URL}/api/generate-itineraries/${this.itinerary._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(updatePayload)
    })
    
    if (!updateResponse.ok) {
      const errorData = await updateResponse.json()
      throw new Error(errorData.message || 'Failed to update itinerary')
    }
    
    let updatedItinerary = await updateResponse.json()
    
    // If photos are enabled, add photos to the regenerated itinerary
    if (this.itinerary.photosEnabled) {
      this.showNotification('📸 Adding photos to regenerated itinerary...', 'info')
      
      try {
        const photoResponse = await fetch(`${API_BASE_URL}/api/itineraries/${this.itinerary._id}/add-photos`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        
        if (photoResponse.ok) {
          const photoResult = await photoResponse.json()
          updatedItinerary = photoResult.itinerary
          this.showNotification(`📸 Added ${photoResult.photoCount} photos to regenerated itinerary!`, 'success')
        } else {
          console.warn('Failed to add photos to regenerated itinerary')
          this.showNotification('⚠️ Itinerary regenerated but photos could not be added', 'warning')
        }
      } catch (photoError) {
        console.warn('Error adding photos to regenerated itinerary:', photoError)
        this.showNotification('⚠️ Itinerary regenerated but photos could not be added', 'warning')
      }
    }
    
    // Update the local state
    this.itinerary = updatedItinerary
    this.originalItinerary = JSON.parse(JSON.stringify(updatedItinerary))
    
    this.showNotification('✨ Itinerary completely regenerated with AI!', 'success')
    
  } catch (error) {
    console.error('Error regenerating itinerary:', error)
    this.showNotification(`Failed to regenerate itinerary: ${error.message}`, 'error')
  } finally {
    this.generatingAI = false
  }
},

     async generateAIActivities(dayIndex) {
    this.generatingAI = true
    this.showDayMenu = null
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
    
    try {
      this.showNotification('🤖 Generating AI activities for this day...', 'info')
      
      const day = this.currentDays[dayIndex]
      const currentValues = this.getCurrentValues()
      const activityCount = currentValues.pace === 'relaxed' ? '2-3' : currentValues.pace === 'active' ? '4-5' : '3-4'
      
      const prompt = `Generate ${activityCount} activities for Day ${dayIndex + 1} of a trip to ${currentValues.destination}.

Date: ${day.date}
Interests: ${currentValues.interests.join(', ') || 'general sightseeing'}
Budget: ${currentValues.budget}
Pace: ${currentValues.pace}

Return JSON: {"activities": [{"time": "09:00", "activity": "Name", "location": "Place", "duration": "2 hours", "cost": 25, "notes": "Tip"}]}`

      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          message: prompt,
          itineraryId: this.itinerary._id
        })
      })
      
      if (response.ok) {
        const result = await response.json()
        const aiData = this.parseAIResponse(result.response)
        
        if (aiData?.activities) {
          const shouldReplace = day.activities?.length > 0 ? 
            confirm(`This day has ${day.activities.length} existing activities. Replace them?`) : true
          
          if (shouldReplace) {
            this.currentDays[dayIndex].activities = aiData.activities
          } else {
            this.currentDays[dayIndex].activities = [
              ...(this.currentDays[dayIndex].activities || []),
              ...aiData.activities
            ]
          }
          
          this.showNotification('✨ AI activities generated successfully!', 'success')
        }
      }
    } catch (error) {
      console.error('Error generating AI activities:', error)
      this.showNotification('Failed to generate AI activities. Please try again.', 'error')
    } finally {
      this.generatingAI = false
    }
  },
    
    async enhanceActivity(dayIndex, actIndex) {
    this.generatingAI = true
    this.showActivityMenu = null
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
    
    try {
      const activity = this.currentDays[dayIndex].activities[actIndex]
      this.showNotification('🤖 Enhancing activity with AI...', 'info')
      
      const currentValues = this.getCurrentValues()
      
      const prompt = `Enhance this activity: ${activity.activity} at ${activity.location}.
Destination: ${currentValues.destination}
Interests: ${currentValues.interests.join(', ')}
Budget: ${currentValues.budget}

Return JSON: {"time": "${activity.time}", "activity": "Enhanced name", "location": "Better location", "duration": "${activity.duration}", "cost": 30, "notes": "Helpful tips"}`

      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          message: prompt,
          itineraryId: this.itinerary._id
        })
      })
      
      if (response.ok) {
        const result = await response.json()
        const enhancedActivity = this.parseAIResponse(result.response)
        
        if (enhancedActivity) {
          this.currentDays[dayIndex].activities[actIndex] = {
            ...this.currentDays[dayIndex].activities[actIndex],
            ...enhancedActivity,
            cost: Number(enhancedActivity.cost) || activity.cost
          }
          this.showNotification('✨ Activity enhanced with AI!', 'success')
        }
      }
    } catch (error) {
      console.error('Error enhancing activity:', error)
      this.showNotification('Failed to enhance activity. Please try again.', 'error')
    } finally {
      this.generatingAI = false
    }
  },

    async generateAlternatives(dayIndex, actIndex) {
    this.generatingAI = true
    this.showActivityMenu = null
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
    
    try {
      const activity = this.currentDays[dayIndex].activities[actIndex]
      this.showNotification('🤖 Finding alternative activities...', 'info')
      
      const currentValues = this.getCurrentValues()
      
      const prompt = `Suggest 3 alternatives to: ${activity.activity}
Destination: ${currentValues.destination}
Interests: ${currentValues.interests.join(', ')}
Budget: ${currentValues.budget}
Time: ${activity.time}, Duration: ${activity.duration}

Return JSON: {"alternatives": [{"time": "${activity.time}", "activity": "Alt 1", "location": "Place", "duration": "${activity.duration}", "cost": 25, "notes": "Why good"}]}`

      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          message: prompt,
          itineraryId: this.itinerary._id
        })
      })
      
      if (response.ok) {
        const result = await response.json()
        const alternativesData = this.parseAIResponse(result.response)
        
        if (alternativesData?.alternatives) {
          this.showAlternativesModal(dayIndex, actIndex, alternativesData.alternatives)
        }
      }
    } catch (error) {
      console.error('Error generating alternatives:', error)
      this.showNotification('Failed to generate alternatives. Please try again.', 'error')
    } finally {
      this.generatingAI = false
    }
  },
    
    optimizeDay(dayIndex) {
    this.showDayMenu = null
    const day = this.currentDays[dayIndex]
    
    if (!day.activities || day.activities.length <= 1) {
      this.showNotification('Need at least 2 activities to optimize', 'info')
      return
    }
    
    day.activities.sort((a, b) => this.timeToMinutes(a.time) - this.timeToMinutes(b.time))
    
    let currentTime = this.timeToMinutes(day.activities[0].time)
    const travelBuffer = 30
    
    day.activities.forEach((activity, index) => {
      if (index > 0) {
        const prevActivity = day.activities[index - 1]
        const prevDuration = this.getDurationInMinutes(prevActivity.duration)
        const prevEndTime = this.timeToMinutes(prevActivity.time) + prevDuration
        currentTime = Math.max(currentTime, prevEndTime + travelBuffer)
      }
      
      activity.time = this.minutesToTime(currentTime)
      currentTime += this.getDurationInMinutes(activity.duration)
    })
    
    this.showNotification('⚡ Day schedule optimized!', 'success')
  },
  
  clearDay(dayIndex) {
    this.showDayMenu = null
    if (confirm('Are you sure you want to clear all activities for this day?')) {
      this.currentDays[dayIndex].activities = []
      this.showNotification('Day cleared', 'info')
    }
  },

    // =============================================================================
    // SHARING & EXPORT
    // =============================================================================
    
    shareItinerary() {
    this.showShareModal = true
  },
  
  async copyShareUrl() {
    try {
      await navigator.clipboard.writeText(this.shareUrl)
      this.showNotification('Link copied to clipboard! 📋', 'success')
    } catch (error) {
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
    
    this.currentDays.forEach((day, index) => {
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
    
    // =============================================================================
    // UTILITY FUNCTIONS
    // =============================================================================
    
     parseAIResponse(response) {
      try {
        // Remove common AI response prefixes and suffixes
        let cleanResponse = response.trim()
        
        // Remove markdown code blocks
        cleanResponse = cleanResponse.replace(/```json\s*\n?/gi, '')
        cleanResponse = cleanResponse.replace(/```\s*\n?/gi, '')
        
        // Remove common AI response text
        cleanResponse = cleanResponse.replace(/^(here's|here is|the|this is|here's the|here is the).*?:/gi, '')
        cleanResponse = cleanResponse.replace(/^(based on|according to|given).*?:/gi, '')
        
        // Find JSON object - look for opening brace and find matching closing brace
        const openBraceIndex = cleanResponse.indexOf('{')
        if (openBraceIndex === -1) {
          console.warn('No JSON object found in AI response')
          return null
        }
        
        let braceCount = 0
        let jsonEndIndex = -1
        
        for (let i = openBraceIndex; i < cleanResponse.length; i++) {
          if (cleanResponse[i] === '{') {
            braceCount++
          } else if (cleanResponse[i] === '}') {
            braceCount--
            if (braceCount === 0) {
              jsonEndIndex = i
              break
            }
          }
        }
        
        if (jsonEndIndex === -1) {
          console.warn('Incomplete JSON object in AI response')
          return null
        }
        
        const jsonString = cleanResponse.substring(openBraceIndex, jsonEndIndex + 1)
        console.log('Extracted JSON string:', jsonString) // Debug log
        
        const parsedData = JSON.parse(jsonString)
        
        // Validate the parsed data structure
        if (parsedData.days && Array.isArray(parsedData.days)) {
          // Validate each day has activities
          parsedData.days.forEach((day, dayIndex) => {
            if (!day.activities || !Array.isArray(day.activities)) {
              console.warn(`Day ${dayIndex + 1} has no activities array, creating empty array`)
              day.activities = []
            }
            
            // Validate and sanitize each activity
            day.activities.forEach((activity, actIndex) => {
              if (!activity.time) activity.time = '09:00'
              if (!activity.activity) activity.activity = 'Explore local area'
              if (!activity.location) activity.location = 'Local area'
              if (!activity.duration) activity.duration = '2 hours'
              if (!activity.cost) activity.cost = 0
              if (!activity.notes) activity.notes = ''
              
              // Ensure cost is a number
              if (typeof activity.cost === 'string') {
                const costMatch = activity.cost.match(/(\d+)/)
                activity.cost = costMatch ? parseInt(costMatch[1]) : 0
              }
              
              // Validate time format
              if (!/^\d{2}:\d{2}$/.test(activity.time)) {
                console.warn(`Invalid time format for activity ${actIndex + 1} on day ${dayIndex + 1}, using 09:00`)
                activity.time = '09:00'
              }
            })
          })
          
          return parsedData
        } else if (parsedData.activities && Array.isArray(parsedData.activities)) {
          // Handle case where AI returns just activities (for single day generation)
          return parsedData
        } else if (parsedData.alternatives && Array.isArray(parsedData.alternatives)) {
          // Handle case where AI returns alternatives
          return parsedData
        } else {
          console.warn('Parsed data does not have expected structure:', parsedData)
          return null
        }
        
      } catch (error) {
        console.error('Error parsing AI response:', error)
        console.log('Raw response:', response)
        
        // Try to extract any JSON-like structure as fallback
        try {
          const jsonMatches = response.match(/\{[^{}]*\}/g)
          if (jsonMatches && jsonMatches.length > 0) {
            const parsed = JSON.parse(jsonMatches[0])
            console.log('Fallback parsing successful:', parsed)
            return parsed
          }
        } catch (fallbackError) {
          console.error('Fallback parsing also failed:', fallbackError)
        }
        
        return null
      }
    },
  
  showAlternativesModal(dayIndex, actIndex, alternatives) {
    const originalActivity = this.currentDays[dayIndex].activities[actIndex]
    
    const modal = document.createElement('div')
    modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'
    
    modal.innerHTML = `
      <div class="bg-white rounded-xl shadow-xl border p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Choose Alternative Activity</h3>
          <button class="close-modal text-gray-400 hover:text-gray-600">❌</button>
        </div>
        
        <div class="space-y-4">
          <div class="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
            <h4 class="font-medium text-gray-900 mb-2">Current Activity</h4>
            <p class="text-sm text-gray-600">${originalActivity.activity} at ${originalActivity.location}</p>
          </div>
          
          ${alternatives.map((alt, index) => `
            <button class="alternative-option w-full text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all" data-index="${index}">
              <div class="flex justify-between items-start mb-2">
                <h4 class="font-medium text-gray-900">${alt.activity}</h4>
                <span class="text-sm font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">$${alt.cost}</span>
              </div>
              <p class="text-sm text-gray-600 mb-2">${alt.location}</p>
              <p class="text-xs text-gray-500">${alt.notes}</p>
            </button>
          `).join('')}
          
          <button class="keep-original w-full p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all">
            <div class="text-center">
              <h4 class="font-medium text-gray-900">Keep Original Activity</h4>
              <p class="text-sm text-gray-600">No changes needed</p>
            </div>
          </button>
        </div>
      </div>
    `
    
    document.body.appendChild(modal)
    
    // Event listeners
    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove())
    modal.querySelector('.keep-original').addEventListener('click', () => modal.remove())
    
    modal.querySelectorAll('.alternative-option').forEach(button => {
      button.addEventListener('click', () => {
        const index = parseInt(button.dataset.index)
        const selectedAlternative = alternatives[index]
        
        this.currentDays[dayIndex].activities[actIndex] = {
          ...selectedAlternative,
          cost: Number(selectedAlternative.cost) || 0
        }
        
        this.showNotification(`✨ Activity replaced with: ${selectedAlternative.activity}`, 'success')
        modal.remove()
      })
    })
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove()
    })
  },
  
  getBudgetValue(budgetPreference) {
    const budgetMap = {
      'budget': 1000,
      'mid-range': 2500,
      'luxury': 5000
    }
    return budgetMap[budgetPreference] || 2500
  },
  
  getBudgetPreference(budgetValue) {
    if (budgetValue <= 1000) return 'budget'
    if (budgetValue <= 2500) return 'mid-range'
    return 'luxury'
  },
  
  getBudgetLabel(budgetValue) {
    const preference = this.getBudgetPreference(budgetValue)
    const labels = {
      'budget': 'Budget',
      'mid-range': 'Mid-range', 
      'luxury': 'Luxury'
    }
    return labels[preference] || 'Mid-range'
  },
  
  formatDate(dateString) {
    if (!dateString) return ''
    const date = new Date(dateString)
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  },
  
  formatDayDate(dateString) {
    if (!dateString) return ''
    const date = new Date(dateString)
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    })
  },
  
  formatTime(timeString) {
    if (!timeString) return ''
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
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
      'museum': 'Culture', 'temple': 'Culture', 'shrine': 'Culture',
      'food': 'Food', 'market': 'Food', 'restaurant': 'Food',
      'park': 'Nature', 'garden': 'Nature', 'beach': 'Nature',
      'hiking': 'Adventure', 'trek': 'Adventure', 'climbing': 'Adventure',
      'shopping': 'Shopping', 'mall': 'Shopping', 'store': 'Shopping',
      'art': 'Art', 'gallery': 'Art', 'theater': 'Entertainment'
    }
    
    const lowerActivity = activity.toLowerCase()
    for (const [keyword, category] of Object.entries(categories)) {
      if (lowerActivity.includes(keyword)) {
        return category
      }
    }
    return 'General'
  },
  
  getDurationInMinutes(duration) {
    if (!duration) return 120
    const match = duration.match(/(\d+(?:\.\d+)?)\s*(hour|hr|h)/i)
    return match ? parseFloat(match[1]) * 60 : 120
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
  
  showNotification(message, type = 'info') {
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transition-all duration-300 transform translate-x-full`
    
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
    
    document.body.appendChild(notification)
    
    setTimeout(() => {
      notification.style.transform = 'translateX(0)'
    }, 100)
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)'
      notification.addEventListener('transitionend', () => {
        if (notification.parentElement) {
          notification.remove()
        }
      })
    }, 5000)
  }
}
}
</script>

<style scoped>
/* Custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Smooth transitions */
.transition-all {
  transition: all 0.2s ease-in-out;
}

/* Focus states */
input:focus, select:focus, textarea:focus {
  outline: none;
  ring: 2px;
  ring-color: rgb(59 130 246);
  border-color: rgb(59 130 246);
}

/* Hover effects */
button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

/* Loading animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

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
</style>