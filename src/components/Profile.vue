<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Loading State -->
    <div v-if="loading" class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow p-8">
        <div class="animate-pulse">
          <div class="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div class="space-y-4">
            <div class="h-20 bg-gray-200 rounded"></div>
            <div class="h-32 bg-gray-200 rounded"></div>
            <div class="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Profile Content -->
    <div v-else class="max-w-6xl mx-auto">
      <!-- Profile Header -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg text-white p-8 mb-8">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <!-- Profile Picture -->
          <div class="relative">
            <div class="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold overflow-hidden">
              <img 
                v-if="user.profilePicture && user.profilePicture.length > 0" 
                :src="`https://aventra-backend.onrender.com/uploads/profiles/${user.profilePicture}`" 
                :alt="user.name || 'Profile'"
                class="w-full h-full object-cover"
                @error="handleImageError"
              >
              <span v-else class="text-white text-2xl">{{ getInitials(user.name || 'User') }}</span>
            </div>
            <button 
              @click="showImageUpload = true"
              class="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
              title="Change profile picture"
            >
              📷
            </button>
          </div>

          <!-- User Info -->
          <div class="flex-1 text-center md:text-left">
            <h1 class="text-3xl font-bold mb-2">{{ user.name }}</h1>
            <p class="text-blue-100 mb-4">{{ user.email }}</p>
            <div class="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
              <div class="flex items-center gap-1">
                <span>🗓️</span>
                <span>Member since {{ formatDate(user.createdAt) }}</span>
              </div>
              <div class="flex items-center gap-1">
                <span>✈️</span>
                <span>{{ user.totalTrips || 0 }} trips planned</span>
              </div>
              <div class="flex items-center gap-1">
                <span>🌍</span>
                <span>{{ user.countriesVisited || 0 }} countries visited</span>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="flex flex-col gap-2">
            <button 
              @click="activeTab = 'edit'"
              class="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
            >
              ✏️ Edit Profile
            </button>
            <button 
              @click="activeTab = 'security'"
              class="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
            >
              🛡️ Security
            </button>
          </div>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="bg-white rounded-lg shadow mb-8">
        <nav class="flex border-b border-gray-200">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-6 py-4 text-sm font-medium transition-colors',
              activeTab === tab.id 
                ? 'border-b-2 border-blue-500 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            <span class="mr-2">{{ tab.icon }}</span>
            {{ tab.label }}
          </button>
        </nav>
      </div>

      <!-- Tab Content -->
      <div class="space-y-8">
        <!-- Overview Tab -->
        <div v-if="activeTab === 'overview'" class="space-y-6">
          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="bg-white rounded-lg shadow p-6">
              <div class="flex items-center gap-3">
                <div class="bg-blue-100 p-3 rounded-lg">
                  <span class="text-2xl">✈️</span>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Total Trips</p>
                  <p class="text-2xl font-bold text-gray-900">{{ user.totalTrips || 0 }}</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow p-6">
              <div class="flex items-center gap-3">
                <div class="bg-green-100 p-3 rounded-lg">
                  <span class="text-2xl">🌍</span>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Countries</p>
                  <p class="text-2xl font-bold text-gray-900">{{ user.countriesVisited || 0 }}</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow p-6">
              <div class="flex items-center gap-3">
                <div class="bg-purple-100 p-3 rounded-lg">
                  <span class="text-2xl">📅</span>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Days Traveled</p>
                  <p class="text-2xl font-bold text-gray-900">{{ user.daysTraveled || 0 }}</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow p-6">
              <div class="flex items-center gap-3">
                <div class="bg-yellow-100 p-3 rounded-lg">
                  <span class="text-2xl">⭐</span>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Avg Rating</p>
                  <p class="text-2xl font-bold text-gray-900">{{ user.avgRating || 'N/A' }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div v-if="recentActivity.length > 0" class="space-y-4">
              <div 
                v-for="activity in recentActivity" 
                :key="activity.id"
                class="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
              >
                <div class="text-2xl">{{ activity.icon }}</div>
                <div class="flex-1">
                  <p class="font-medium text-gray-900">{{ activity.title }}</p>
                  <p class="text-sm text-gray-600">{{ activity.description }}</p>
                  <p class="text-xs text-gray-500">{{ formatDate(activity.date) }}</p>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8 text-gray-500">
              <div class="text-4xl mb-2">📋</div>
              <p>No recent activity</p>
            </div>
          </div>
        </div>

        <!-- Edit Profile Tab -->
        <div v-if="activeTab === 'edit'" class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Edit Profile Information</h3>
          
          <form @submit.prevent="updateProfile" class="space-y-6">
            <!-- Basic Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input 
                  v-model="editForm.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  v-model="editForm.email"
                  type="email"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input 
                  v-model="editForm.phone"
                  type="tel"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input 
                  v-model="editForm.location"
                  type="text"
                  placeholder="City, Country"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea 
                v-model="editForm.bio"
                rows="4"
                placeholder="Tell us about yourself and your travel interests..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <!-- Save Button -->
            <div class="flex justify-end">
              <button 
                type="submit"
                :disabled="updating"
                class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                <span v-if="updating">⏳</span>
                <span v-else>💾</span>
                <span>{{ updating ? 'Updating...' : 'Save Changes' }}</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Travel Preferences Tab -->
        <div v-if="activeTab === 'preferences'" class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Travel Preferences</h3>
          
          <form @submit.prevent="updatePreferences" class="space-y-6">
            <!-- Travel Style -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">Travel Style</label>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label 
                  v-for="style in travelStyles" 
                  :key="style.id"
                  class="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  :class="{ 'border-blue-500 bg-blue-50': preferencesForm.travelStyle === style.id }"
                >
                  <input 
                    v-model="preferencesForm.travelStyle"
                    :value="style.id"
                    type="radio"
                    class="sr-only"
                  >
                  <span class="text-xl">{{ style.icon }}</span>
                  <span class="text-sm font-medium">{{ style.label }}</span>
                </label>
              </div>
              <p class="text-xs text-gray-500 mt-2">Current selection: {{ preferencesForm.travelStyle || 'None selected' }}</p>
            </div>

            <!-- Budget Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">Typical Budget Range</label>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <label 
                  v-for="budget in budgetRanges" 
                  :key="budget.id"
                  class="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  :class="{ 'border-blue-500 bg-blue-50': preferencesForm.budgetRange === budget.id }"
                >
                  <input 
                    v-model="preferencesForm.budgetRange"
                    :value="budget.id"
                    type="radio"
                    class="sr-only"
                  >
                  <span class="text-xl">{{ budget.icon }}</span>
                  <span class="text-sm font-medium">{{ budget.label }}</span>
                </label>
              </div>
              <p class="text-xs text-gray-500 mt-2">Current selection: {{ preferencesForm.budgetRange || 'None selected' }}</p>
            </div>

            <!-- Interests -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">Travel Interests</label>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label 
                  v-for="interest in interests" 
                  :key="interest.id"
                  class="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  :class="{ 'border-blue-500 bg-blue-50': preferencesForm.interests.includes(interest.id) }"
                >
                  <input 
                    v-model="preferencesForm.interests"
                    :value="interest.id"
                    type="checkbox"
                    class="sr-only"
                  >
                  <span class="text-xl">{{ interest.icon }}</span>
                  <span class="text-sm font-medium">{{ interest.label }}</span>
                </label>
              </div>
              <p class="text-xs text-gray-500 mt-2">Selected: {{ preferencesForm.interests.length > 0 ? preferencesForm.interests.join(', ') : 'None selected' }}</p>
            </div>

            <!-- Travel Pace -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">Preferred Travel Pace</label>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <label 
                  v-for="pace in travelPaces" 
                  :key="pace.id"
                  class="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  :class="{ 'border-blue-500 bg-blue-50': preferencesForm.pace === pace.id }"
                >
                  <input 
                    v-model="preferencesForm.pace"
                    :value="pace.id"
                    type="radio"
                    class="sr-only"
                  >
                  <span class="text-xl">{{ pace.icon }}</span>
                  <div>
                    <p class="text-sm font-medium">{{ pace.label }}</p>
                    <p class="text-xs text-gray-600">{{ pace.description }}</p>
                  </div>
                </label>
              </div>
              <p class="text-xs text-gray-500 mt-2">Current selection: {{ preferencesForm.pace || 'None selected' }}</p>
            </div>

            <!-- Debug Info -->
            <div v-if="false" class="bg-gray-100 p-4 rounded text-xs">
              <strong>Debug - Preferences Form:</strong>
              <pre>{{ JSON.stringify(preferencesForm, null, 2) }}</pre>
            </div>

            <!-- Save Button -->
            <div class="flex justify-end">
              <button 
                type="submit"
                :disabled="updatingPreferences"
                class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                <span v-if="updatingPreferences">⏳</span>
                <span v-else>💾</span>
                <span>{{ updatingPreferences ? 'Updating...' : 'Save Preferences' }}</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Safety & Contacts Tab -->
        <div v-if="activeTab === 'safety'" class="space-y-6">
          <!-- Emergency Contacts Section -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900">Emergency Contacts</h3>
              <button 
                @click="addEmergencyContact"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <span>➕</span>
                <span>Add Contact</span>
              </button>
            </div>
            
            <div class="space-y-4">
              <div 
                v-for="(contact, index) in safetyForm.emergencyContacts" 
                :key="`contact-${index}`"
                class="border border-gray-200 rounded-lg p-4"
              >
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-2">
                    <span v-if="contact.isPrimary" class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                      🚨 Primary Contact
                    </span>
                    <span v-else class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      Emergency Contact {{ index + 1 }}
                    </span>
                  </div>
                  <button 
                    v-if="safetyForm.emergencyContacts.length > 1"
                    @click="removeEmergencyContact(index)"
                    class="text-red-600 hover:text-red-800 text-sm"
                    type="button"
                  >
                    🗑️ Remove
                  </button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input 
                      v-model="contact.name"
                      type="text"
                      required
                      placeholder="Contact name"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                    <select 
                      v-model="contact.relationship"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select relationship</option>
                      <option value="parent">Parent</option>
                      <option value="spouse">Spouse/Partner</option>
                      <option value="sibling">Sibling</option>
                      <option value="child">Child</option>
                      <option value="friend">Friend</option>
                      <option value="colleague">Colleague</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input 
                      v-model="contact.phone"
                      type="tel"
                      required
                      placeholder="+1 (555) 123-4567"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      v-model="contact.email"
                      type="email"
                      placeholder="contact@email.com"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                  </div>
                </div>
                
                <div class="mt-4">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input 
                      :checked="contact.isPrimary"
                      @change="handlePrimaryContactChange(index)"
                      type="checkbox"
                      class="rounded text-blue-600 focus:ring-blue-500"
                    >
                    <span class="text-sm text-gray-700">Set as primary emergency contact</span>
                  </label>
                </div>
                
                <!-- Debug info for this contact -->
                <div v-if="false" class="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
                  Debug: {{ JSON.stringify(contact, null, 2) }}
                </div>
              </div>
              
              <!-- Debug info for all contacts -->
              <div v-if="false" class="text-xs text-gray-500 bg-yellow-50 p-3 rounded">
                <strong>All Emergency Contacts:</strong>
                <pre>{{ JSON.stringify(safetyForm.emergencyContacts, null, 2) }}</pre>
              </div>
            </div>
          </div>

          <!-- Location Sharing Section -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Location Sharing & Safety</h3>
            
            <div class="space-y-6">
              <!-- Current Location Display -->
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="font-medium text-blue-900">Current Location</h4>
                    <p v-if="userLocation" class="text-sm text-blue-700">
                      📍 {{ userLocation.address || `${userLocation.latitude}, ${userLocation.longitude}` }}
                    </p>
                    <p v-else class="text-sm text-blue-600">Location not available</p>
                  </div>
                  <button 
                    @click="getCurrentLocation"
                    class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    📍 Update Location
                  </button>
                </div>
              </div>

              <!-- Location Sharing Settings -->
              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 class="font-medium text-gray-900">Enable Location Sharing</h4>
                    <p class="text-sm text-gray-600">Allow trusted contacts to see your location during trips</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input 
                      v-model="safetyForm.locationSharing.enabled"
                      type="checkbox"
                      class="sr-only peer"
                    >
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div v-if="safetyForm.locationSharing.enabled" class="ml-4 space-y-3">
                  <label class="flex items-center gap-2">
                    <input 
                      v-model="safetyForm.locationSharing.shareWithContacts"
                      type="checkbox"
                      class="rounded text-blue-600 focus:ring-blue-500"
                    >
                    <span class="text-sm text-gray-700">Share with emergency contacts</span>
                  </label>
                  
                  <label class="flex items-center gap-2">
                    <input 
                      v-model="safetyForm.locationSharing.shareWithTrustedCircle"
                      type="checkbox"
                      class="rounded text-blue-600 focus:ring-blue-500"
                    >
                    <span class="text-sm text-gray-700">Share with trusted travel circle</span>
                  </label>
                  
                  <label class="flex items-center gap-2">
                    <input 
                      v-model="safetyForm.locationSharing.allowEmergencyAccess"
                      type="checkbox"
                      class="rounded text-blue-600 focus:ring-blue-500"
                    >
                    <span class="text-sm text-gray-700">Allow emergency services access</span>
                  </label>
                </div>
              </div>

              <!-- Check-in Preferences -->
              <div class="space-y-4">
                <h4 class="font-medium text-gray-900">Check-in Preferences</h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Check-in Frequency</label>
                    <select 
                      v-model="safetyForm.travelPreferences.checkInFrequency"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="hourly">Every Hour</option>
                      <option value="4hours">Every 4 Hours</option>
                      <option value="daily">Daily</option>
                      <option value="manual">Manual Only</option>
                    </select>
                  </div>
                </div>
                
                <div class="space-y-3">
                  <label class="flex items-center gap-2">
                    <input 
                      v-model="safetyForm.travelPreferences.autoCheckIn"
                      type="checkbox"
                      class="rounded text-blue-600 focus:ring-blue-500"
                    >
                    <span class="text-sm text-gray-700">Enable automatic check-ins based on location</span>
                  </label>
                  
                  <label class="flex items-center gap-2">
                    <input 
                      v-model="safetyForm.travelPreferences.sosButtonEnabled"
                      type="checkbox"
                      class="rounded text-blue-600 focus:ring-blue-500"
                    >
                    <span class="text-sm text-gray-700">Enable SOS emergency button</span>
                  </label>
                </div>
              </div>

              <!-- Emergency SOS Button -->
              <div v-if="safetyForm.travelPreferences.sosButtonEnabled" class="bg-red-50 border border-red-200 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="font-medium text-red-900">Emergency SOS</h4>
                    <p class="text-sm text-red-700">Press and hold for 3 seconds to send emergency alert</p>
                  </div>
                  <button 
                    @click="showEmergencyModal = true"
                    class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-bold"
                  >
                    🚨 SOS
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Medical Information Section -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Medical Information</h3>
            <p class="text-sm text-gray-600 mb-4">This information will be shared with emergency services if needed</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
                <select 
                  v-model="safetyForm.medicalInfo.bloodType"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select blood type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
            
            <div class="space-y-4 mt-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
                <textarea 
                  v-model="safetyForm.medicalInfo.allergies"
                  rows="2"
                  placeholder="List any allergies..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
                <textarea 
                  v-model="safetyForm.medicalInfo.medications"
                  rows="2"
                  placeholder="List current medications..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
                <textarea 
                  v-model="safetyForm.medicalInfo.medicalConditions"
                  rows="2"
                  placeholder="List any medical conditions..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Emergency Medical Information</label>
                <textarea 
                  v-model="safetyForm.medicalInfo.emergencyMedicalInfo"
                  rows="3"
                  placeholder="Any additional medical information for emergency responders..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Save Safety Settings Button -->
          <div class="text-center">
            <button 
              @click="updateSafetySettings"
              :disabled="updatingSafety"
              class="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium flex items-center justify-center gap-2 mx-auto"
            >
              <span v-if="updatingSafety">⏳</span>
              <span v-else>🛡️</span>
              <span>{{ updatingSafety ? 'Updating...' : 'Save Safety Settings' }}</span>
            </button>
          </div>
        </div>
        <div v-if="activeTab === 'security'" class="space-y-6">
          <!-- Change Password -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Change Password</h3>
            
            <form @submit.prevent="changePassword" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input 
                  v-model="passwordForm.currentPassword"
                  type="password"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input 
                  v-model="passwordForm.newPassword"
                  type="password"
                  required
                  minlength="8"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input 
                  v-model="passwordForm.confirmPassword"
                  type="password"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
              
              <div class="flex justify-end">
                <button 
                  type="submit"
                  :disabled="changingPassword"
                  class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                >
                  <span v-if="changingPassword">⏳</span>
                  <span v-else>🔒</span>
                  <span>{{ changingPassword ? 'Updating...' : 'Change Password' }}</span>
                </button>
              </div>
            </form>
          </div>

          <!-- Two-Factor Authentication -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600">Add an extra layer of security to your account</p>
                <p class="text-sm text-gray-500">Status: {{ user.twoFactorEnabled ? 'Enabled' : 'Disabled' }}</p>
              </div>
              <button 
                @click="toggleTwoFactor"
                :class="[
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  user.twoFactorEnabled 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                ]"
              >
                {{ user.twoFactorEnabled ? 'Disable' : 'Enable' }} 2FA
              </button>
            </div>
          </div>

          <!-- Account Deletion -->
          <div class="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <h3 class="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
            <p class="text-gray-600 mb-4">Once you delete your account, all your data will be permanently removed.</p>
            <button 
              @click="showDeleteModal = true"
              class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>

        <!-- Travel History Tab -->
        <div v-if="activeTab === 'history'" class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Travel History</h3>
          
          <div v-if="travelHistory.length > 0" class="space-y-4">
            <div 
              v-for="trip in travelHistory" 
              :key="trip.id"
              class="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-900">{{ trip.title }}</h4>
                  <p class="text-gray-600">{{ trip.destination }}</p>
                  <div class="flex items-center gap-4 text-sm text-gray-500 mt-2">
                    <span>📅 {{ formatDate(trip.startDate) }} - {{ formatDate(trip.endDate) }}</span>
                    <span>💰 ${{ trip.totalCost || 0 }}</span>
                    <span>⭐ {{ trip.rating || 'Not rated' }}</span>
                  </div>
                </div>
                <div class="flex gap-2">
                  <router-link 
                    :to="`/itinerary/${trip.id}`"
                    class="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    View
                  </router-link>
                  <button 
                    @click="rateTrip(trip)"
                    class="text-green-600 hover:text-green-700 text-sm"
                  >
                    Rate
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else class="text-center py-12 text-gray-500">
            <div class="text-6xl mb-4">✈️</div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No travel history yet</h3>
            <p class="text-gray-600 mb-4">Your completed trips will appear here</p>
            <router-link 
              to="/dashboard"
              class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 inline-flex items-center gap-2"
            >
              <span>🗺️</span>
              <span>Plan Your First Trip</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Upload Modal -->
    <div v-if="showImageUpload" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showImageUpload = false">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4" @click.stop>
        <h3 class="text-lg font-semibold mb-4">Update Profile Picture</h3>
        <div class="space-y-4">
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input 
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="handleImageUpload"
              class="hidden"
            >
            <button 
              @click="$refs.fileInput.click()"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Choose Image
            </button>
            <p class="text-sm text-gray-500 mt-2">Max size: 5MB</p>
          </div>
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <button 
            @click="showImageUpload = false"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Emergency SOS Modal -->
    <div v-if="showEmergencyModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showEmergencyModal = false">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4" @click.stop>
        <h3 class="text-lg font-semibold text-red-600 mb-4">🚨 Emergency SOS</h3>
        <p class="text-gray-600 mb-6">This will immediately alert your emergency contacts and share your location. Use only in real emergencies.</p>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Emergency Type (Optional)</label>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
              <option value="">Select emergency type</option>
              <option value="medical">Medical Emergency</option>
              <option value="accident">Accident</option>
              <option value="crime">Crime/Security</option>
              <option value="natural">Natural Disaster</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Quick Message (Optional)</label>
            <textarea 
              rows="3"
              placeholder="Brief description of the situation..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            ></textarea>
          </div>
        </div>
        
        <div class="flex justify-end gap-2 mt-6">
          <button 
            @click="showEmergencyModal = false"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button 
            @click="sendEmergencyAlert"
            class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-bold"
          >
            🚨 Send Emergency Alert
          </button>
        </div>
      </div>
    </div>
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="showDeleteModal = false">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4" @click.stop>
        <h3 class="text-lg font-semibold text-red-600 mb-4">Delete Account</h3>
        <p class="text-gray-600 mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Type "DELETE" to confirm</label>
            <input 
              v-model="deleteConfirmation"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
          </div>
        </div>
        <div class="flex justify-end gap-2 mt-6">
          <button 
            @click="showDeleteModal = false"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button 
            @click="deleteAccount"
            :disabled="deleteConfirmation !== 'DELETE'"
            class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  data() {
    return {
      loading: true,
      activeTab: 'overview',
      updating: false,
      updatingPreferences: false,
      updatingSafety: false,
      changingPassword: false,
      showImageUpload: false,
      showDeleteModal: false,
      deleteConfirmation: '',
      userLocation: null,
      locationWatchId: null,
      showEmergencyModal: false,
      
      user: {
        name: '',
        email: '',
        phone: '',
        location: '',
        bio: '',
        profilePicture: '',
        createdAt: '',
        totalTrips: 0,
        countriesVisited: 0,
        daysTraveled: 0,
        avgRating: 0,
        twoFactorEnabled: false
      },
      
      editForm: {
        name: '',
        email: '',
        phone: '',
        location: '',
        bio: ''
      },
      
      safetyForm: {
        emergencyContacts: [
          {
            name: '',
            relationship: '',
            phone: '',
            email: '',
            isPrimary: true
          }
        ],
        locationSharing: {
          enabled: false,
          shareWithContacts: false,
          shareWithTrustedCircle: false,
          allowEmergencyAccess: false
        },
        medicalInfo: {
          allergies: '',
          medications: '',
          medicalConditions: '',
          bloodType: '',
          emergencyMedicalInfo: ''
        },
        travelPreferences: {
          checkInFrequency: 'daily',
          autoCheckIn: false,
          sosButtonEnabled: true
        }
      },
      
      preferencesForm: {
        travelStyle: '',
        budgetRange: '',
        interests: [],
        pace: ''
      },
      
      passwordForm: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      
      recentActivity: [],
      travelHistory: [],
      
      tabs: [
        { id: 'overview', label: 'Overview', icon: '👤' },
        { id: 'edit', label: 'Edit Profile', icon: '✏️' },
        { id: 'preferences', label: 'Travel Preferences', icon: '🎯' },
        { id: 'safety', label: 'Safety & Contacts', icon: '🚨' },
        { id: 'security', label: 'Security', icon: '🛡️' },
        { id: 'history', label: 'Travel History', icon: '📚' }
      ],
      
      travelStyles: [
        { id: 'budget', label: 'Budget', icon: '💰' },
        { id: 'luxury', label: 'Luxury', icon: '👑' },
        { id: 'adventure', label: 'Adventure', icon: '🏔️' },
        { id: 'cultural', label: 'Cultural', icon: '🏛️' }
      ],
      
      budgetRanges: [
        { id: 'low', label: 'Under $1,000', icon: '💵' },
        { id: 'medium', label: '$1,000 - $5,000', icon: '💳' },
        { id: 'high', label: 'Over $5,000', icon: '💎' }
      ],
      
      interests: [
        { id: 'culture', label: 'Culture', icon: '🎭' },
        { id: 'food', label: 'Food', icon: '🍕' },
        { id: 'nature', label: 'Nature', icon: '🌲' },
        { id: 'adventure', label: 'Adventure', icon: '🏃' },
        { id: 'history', label: 'History', icon: '🏛️' },
        { id: 'art', label: 'Art', icon: '🎨' },
        { id: 'shopping', label: 'Shopping', icon: '🛍️' },
        { id: 'nightlife', label: 'Nightlife', icon: '🌙' }
      ],
      
      travelPaces: [
        { id: 'relaxed', label: 'Relaxed', icon: '🏝️', description: 'Take it slow and enjoy' },
        { id: 'moderate', label: 'Moderate', icon: '🚶', description: 'Balanced pace' },
        { id: 'fast', label: 'Fast-paced', icon: '🏃', description: 'See as much as possible' }
      ]
    }
  },
  async mounted() {
    console.log('🚀 Profile component mounted, starting data fetch...');
    console.log('🔑 Auth token present:', !!localStorage.getItem('token'));
    
    await this.fetchUserData()
    await this.fetchRecentActivity()
    await this.fetchTravelHistory()
    
    console.log('📊 All data fetched. Current user:', this.user);
    
    // Initialize safety features after data is loaded
    this.$nextTick(() => {
      console.log('⚡ Initializing safety features...');
      this.initializeSafetyFeatures()
    })
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await fetch('${import.meta.env.VITE_API_BASE_URL}/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        
        if (response.ok) {
          this.user = await response.json()
          this.initializeForms()
        } else {
          console.error('Failed to fetch user data')
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        this.loading = false
      }
    },
    
    initializeForms() {
      console.log('🔧 Initializing forms with user data:', this.user);
      
      // Initialize edit form
      this.editForm = {
        name: this.user.name || '',
        email: this.user.email || '',
        phone: this.user.phone || '',
        location: this.user.location || '',
        bio: this.user.bio || ''
      }
      
      console.log('📝 Edit form initialized:', this.editForm);
      
      // Initialize preferences form
      this.preferencesForm = {
        travelStyle: this.user.preferences?.travelStyle || '',
        budgetRange: this.user.preferences?.budgetRange || '',
        interests: this.user.preferences?.interests || [],
        pace: this.user.preferences?.pace || ''
      }
      
      console.log('🎯 Preferences form initialized:', this.preferencesForm);
      
      // Initialize safety form with better error handling
      this.safetyForm = {
        emergencyContacts: (this.user.emergencyContacts && this.user.emergencyContacts.length > 0) 
          ? this.user.emergencyContacts 
          : [
              {
                name: '',
                relationship: '',
                phone: '',
                email: '',
                isPrimary: true
              }
            ],
        locationSharing: this.user.locationSharing || {
          enabled: false,
          shareWithContacts: false,
          shareWithTrustedCircle: false,
          allowEmergencyAccess: false
        },
        medicalInfo: this.user.medicalInfo || {
          allergies: '',
          medications: '',
          medicalConditions: '',
          bloodType: '',
          emergencyMedicalInfo: ''
        },
        travelPreferences: this.user.travelPreferences || {
          checkInFrequency: 'daily',
          autoCheckIn: false,
          sosButtonEnabled: true
        }
      }
      
      console.log('🛡️ Safety form initialized:', this.safetyForm);
      
      // Force Vue to update the UI
      this.$forceUpdate();
    },
    
    async fetchRecentActivity() {
      try {
        const response = await fetch('${import.meta.env.VITE_API_BASE_URL}/api/users/activity', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        
        if (response.ok) {
          this.recentActivity = await response.json()
        } else if (response.status === 404) {
          // API endpoint doesn't exist yet - use mock data
          console.warn('Activity API not implemented yet, using mock data')
          this.recentActivity = this.getMockActivityData()
        } else {
          this.recentActivity = this.getMockActivityData()
        }
      } catch (error) {
        console.error('Error fetching recent activity:', error)
        this.recentActivity = this.getMockActivityData()
      }
    },
    
    getMockActivityData() {
      return [
        {
          id: 1,
          icon: '✈️',
          title: 'Created new itinerary',
          description: 'Tokyo Adventure - 7 days',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 2,
          icon: '📍',
          title: 'Location shared',
          description: 'Shared location with emergency contacts',
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 3,
          icon: '✅',
          title: 'Trip completed',
          description: 'Paris City Break - Rated 5 stars',
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]
    },
    
    async fetchTravelHistory() {
      try {
        const response = await fetch('${import.meta.env.VITE_API_BASE_URL}/api/users/travel-history', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        
        if (response.ok) {
          this.travelHistory = await response.json()
        } else if (response.status === 404) {
          // API endpoint doesn't exist yet - use mock data
          console.warn('Travel history API not implemented yet, using mock data')
          this.travelHistory = this.getMockTravelHistory()
        } else {
          this.travelHistory = this.getMockTravelHistory()
        }
      } catch (error) {
        console.error('Error fetching travel history:', error)
        this.travelHistory = this.getMockTravelHistory()
      }
    },
    
    getMockTravelHistory() {
      return [
        {
          id: 1,
          title: 'Paris City Break',
          destination: 'Paris, France',
          startDate: '2024-03-15',
          endDate: '2024-03-20',
          totalCost: 2500,
          rating: 5
        },
        {
          id: 2,
          title: 'Tokyo Adventure',
          destination: 'Tokyo, Japan',
          startDate: '2024-01-10',
          endDate: '2024-01-17',
          totalCost: 3200,
          rating: 4
        },
        {
          id: 3,
          title: 'Barcelona Explorer',
          destination: 'Barcelona, Spain',
          startDate: '2023-11-05',
          endDate: '2023-11-12',
          totalCost: 1800,
          rating: null
        }
      ]
    },
    
    async updateProfile() {
      if (!this.validateProfileForm()) return
      
      this.updating = true
      
      try {
        const response = await fetch('${import.meta.env.VITE_API_BASE_URL}/api/users/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(this.editForm)
        })
        
        if (response.ok) {
          const updatedUser = await response.json()
          this.user = { ...this.user, ...updatedUser }
          this.showNotification('Profile updated successfully! 🎉', 'success')
          this.activeTab = 'overview'
        } else if (response.status === 404) {
          // API not implemented yet - simulate success
          console.warn('Profile update API not implemented yet, simulating update')
          this.user = { ...this.user, ...this.editForm }
          this.showNotification('Profile updated successfully! 🎉 (Demo mode)', 'success')
          this.activeTab = 'overview'
        } else {
          throw new Error('Failed to update profile')
        }
      } catch (error) {
        console.error('Error updating profile:', error)
        // In demo mode, still update locally
        this.user = { ...this.user, ...this.editForm }
        this.showNotification('Profile updated locally! 🎉 (Demo mode)', 'warning')
        this.activeTab = 'overview'
      } finally {
        this.updating = false
      }
    },
    
    async updatePreferences() {
      console.log('🎯 Updating preferences:', this.preferencesForm);
      this.updatingPreferences = true
      
      try {
        const response = await fetch('${import.meta.env.VITE_API_BASE_URL}/api/users/preferences', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(this.preferencesForm)
        })
        
        if (response.ok) {
          const updatedPreferences = await response.json()
          console.log('✅ Preferences updated:', updatedPreferences);
          this.user.preferences = updatedPreferences
          this.showNotification('Preferences updated successfully! 🎯', 'success')
        } else if (response.status === 404) {
          // API not implemented yet - simulate success
          console.warn('🎭 Preferences API not implemented, simulating update')
          this.user.preferences = { ...this.preferencesForm }
          this.showNotification('Preferences updated! 🎯 (Demo mode)', 'success')
        } else {
          throw new Error('Failed to update preferences')
        }
      } catch (error) {
        console.error('❌ Error updating preferences:', error)
        // In demo mode, still update locally
        this.user.preferences = { ...this.preferencesForm }
        this.showNotification('Preferences updated locally! 🎯 (Demo mode)', 'warning')
      } finally {
        this.updatingPreferences = false
      }
    },
    
    async changePassword() {
      if (!this.validatePasswordForm()) return
      
      this.changingPassword = true
      
      try {
        const response = await fetch('${import.meta.env.VITE_API_BASE_URL}/api/users/change-password', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            currentPassword: this.passwordForm.currentPassword,
            newPassword: this.passwordForm.newPassword
          })
        })
        
        if (response.ok) {
          this.passwordForm = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          }
          this.showNotification('Password changed successfully! 🔒', 'success')
        } else {
          const error = await response.json()
          throw new Error(error.message || 'Failed to change password')
        }
      } catch (error) {
        console.error('Error changing password:', error)
        this.showNotification(error.message || 'Failed to change password. Please try again.', 'error')
      } finally {
        this.changingPassword = false
      }
    },
    
    async toggleTwoFactor() {
      try {
        const response = await fetch('${import.meta.env.VITE_API_BASE_URL}/api/users/two-factor', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            enabled: !this.user.twoFactorEnabled
          })
        })
        
        if (response.ok) {
          this.user.twoFactorEnabled = !this.user.twoFactorEnabled
          this.showNotification(
            `Two-factor authentication ${this.user.twoFactorEnabled ? 'enabled' : 'disabled'}! 🛡️`, 
            'success'
          )
        } else {
          throw new Error('Failed to toggle two-factor authentication')
        }
      } catch (error) {
        console.error('Error toggling 2FA:', error)
        this.showNotification('Failed to update two-factor authentication. Please try again.', 'error')
      }
    },
    
    async handleImageUpload(event) {
      const file = event.target.files[0]
      if (!file) return
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        this.showNotification('Image must be smaller than 5MB', 'error')
        return
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.showNotification('Please select a valid image file', 'error')
        return
      }
      
      const formData = new FormData()
      formData.append('profilePicture', file)
      
      try {
        const response = await fetch('${import.meta.env.VITE_API_BASE_URL}/api/users/profile-picture', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: formData
        })
        
        if (response.ok) {
          const result = await response.json()
          this.user.profilePicture = result.profilePicture
          this.showImageUpload = false
          this.showNotification('Profile picture updated successfully! 📸', 'success')
        } else {
          throw new Error('Failed to upload image')
        }
      } catch (error) {
        console.error('Error uploading image:', error)
        this.showNotification('Failed to upload image. Please try again.', 'error')
      }
    },
    
    async deleteAccount() {
      if (this.deleteConfirmation !== 'DELETE') return
      
      try {
        const response = await fetch('${import.meta.env.VITE_API_BASE_URL}/api/users/delete-account', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        
        if (response.ok) {
          localStorage.removeItem('token')
          this.$router.push('/login')
          this.showNotification('Account deleted successfully', 'info')
        } else {
          throw new Error('Failed to delete account')
        }
      } catch (error) {
        console.error('Error deleting account:', error)
        this.showNotification('Failed to delete account. Please try again.', 'error')
      }
    },
    
    async rateTrip(trip) {
      const rating = prompt(`Rate your trip to ${trip.destination} (1-5 stars):`)
      if (!rating || rating < 1 || rating > 5) return
      
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/itineraries/${trip.id}/rate`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ rating: parseInt(rating) })
        })
        
        if (response.ok) {
          trip.rating = parseInt(rating)
          this.showNotification('Trip rated successfully! ⭐', 'success')
          await this.fetchUserData() // Refresh average rating
        } else {
          throw new Error('Failed to rate trip')
        }
      } catch (error) {
        console.error('Error rating trip:', error)
        this.showNotification('Failed to rate trip. Please try again.', 'error')
      }
    },
    
    validateProfileForm() {
      if (!this.editForm.name.trim()) {
        this.showNotification('Name is required', 'error')
        return false
      }
      
      if (!this.editForm.email.trim()) {
        this.showNotification('Email is required', 'error')
        return false
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(this.editForm.email)) {
        this.showNotification('Please enter a valid email address', 'error')
        return false
      }
      
      return true
    },
    
    validatePasswordForm() {
      if (!this.passwordForm.currentPassword) {
        this.showNotification('Current password is required', 'error')
        return false
      }
      
      if (!this.passwordForm.newPassword) {
        this.showNotification('New password is required', 'error')
        return false
      }
      
      if (this.passwordForm.newPassword.length < 8) {
        this.showNotification('New password must be at least 8 characters long', 'error')
        return false
      }
      
      if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
        this.showNotification('New passwords do not match', 'error')
        return false
      }
      
      return true
    },
    
    getInitials(name) {
      if (!name || typeof name !== 'string') return '?'
      return name.split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
    },
    
    handleImageError(event) {
      console.warn('🖼️ Profile image failed to load:', event.target.src);
      // Hide the broken image and show initials instead
      event.target.style.display = 'none';
    },
    
    formatDate(dateString) {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
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
        notification.style.transform = 'translateX(100%)'
        setTimeout(() => {
          if (notification.parentElement) {
            notification.remove()
          }
        }, 300)
      }, 5000)
    }
  },
  
  // Lifecycle hooks for location tracking
  created() {
    // Component created - data initialization will happen in mounted
  },
  
  async mounted() {
    await this.fetchUserData()
    await this.fetchRecentActivity()
    await this.fetchTravelHistory()
  },
  
  beforeUnmount() {
    // Clean up location tracking
    if (typeof this.stopLocationTracking === 'function') {
      this.stopLocationTracking()
    }
  }
}
</script>
        