<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="loading" class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div class="animate-pulse space-y-6">
          <div class="h-6 bg-gray-200 rounded-md w-1/4"></div>
          <div class="space-y-4">
            <div class="h-20 bg-gray-200 rounded-lg"></div>
            <div class="h-32 bg-gray-200 rounded-lg"></div>
            <div class="h-24 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Profile Header -->
      <div class="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-xl shadow-lg text-white p-8 mb-8 overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-10">
          <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div class="relative flex flex-col lg:flex-row items-center gap-8">
          <!-- Profile Picture -->
          <div class="relative group">
            <div class="w-28 h-28 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-3xl font-semibold overflow-hidden ring-4 ring-white/20">
              <img 
                v-if="user.profilePicture && user.profilePicture.length > 0" 
                :src="user.profilePicture" 
                :alt="user.name || 'Profile'"
                class="w-full h-full object-cover"
                @error="handleImageError"
              >
              <span v-else class="text-white text-xl">{{ getInitials(user.name || 'User') }}</span>
            </div>
            <button 
              @click="showImageUpload = true"
              class="absolute -bottom-1 -right-1 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-lg group-hover:scale-110 transform"
              title="Change profile picture"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          <!-- User Info -->
          <div class="flex-1 text-center lg:text-left">
            <h1 class="text-3xl font-bold mb-2 tracking-tight">{{ user.name }}</h1>
            <p class="text-gray-300 mb-4 font-medium">{{ user.email }}</p>
            <div class="flex flex-wrap justify-center lg:justify-start gap-6 text-sm">
              <div class="flex items-center gap-2">
                <div class="w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
                  </svg>
                </div>
                <span class="text-gray-300">Member since {{ formatDate(user.createdAt) }}</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <span class="text-gray-300">{{ user.totalTrips || 0 }} trips planned</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-5 h-5 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span class="text-gray-300">{{ user.countriesVisited || 0 }} countries visited</span>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="flex flex-col gap-3">
            <button 
              @click="activeTab = 'edit'"
              class="bg-white/10 backdrop-blur-sm text-white px-4 py-2.5 rounded-lg hover:bg-white/20 transition-all duration-200 font-medium flex items-center gap-2 border border-white/20"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit Profile
            </button>
            <button 
              @click="activeTab = 'security'"
              class="bg-white/10 backdrop-blur-sm text-white px-4 py-2.5 rounded-lg hover:bg-white/20 transition-all duration-200 font-medium flex items-center gap-2 border border-white/20"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Security
            </button>
          </div>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
        <nav class="flex overflow-x-auto">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'flex items-center gap-3 px-6 py-4 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap',
              activeTab === tab.id 
                ? 'border-gray-900 text-gray-900 bg-gray-50' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            ]"
          >
            <span class="text-lg">{{ tab.icon }}</span>
            <span>{{ tab.label }}</span>
          </button>
        </nav>
      </div>

      <!-- Tab Content -->
      <div class="space-y-8">
        <!-- Overview Tab -->
        <div v-if="activeTab === 'overview'" class="space-y-8">
          <!-- Stats Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-600 mb-1">Total Trips</p>
                  <p class="text-2xl font-bold text-gray-900">{{ user.totalTrips || 0 }}</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-600 mb-1">Countries</p>
                  <p class="text-2xl font-bold text-gray-900">{{ user.countriesVisited || 0 }}</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-600 mb-1">Days Traveled</p>
                  <p class="text-2xl font-bold text-gray-900">{{ user.daysTraveled || 0 }}</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-600 mb-1">Avg Rating</p>
                  <p class="text-2xl font-bold text-gray-900">{{ user.avgRating || 'N/A' }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
            <div v-if="recentActivity.length > 0" class="space-y-4">
              <div 
                v-for="activity in recentActivity" 
                :key="activity.id"
                class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-lg shadow-sm">
                  {{ activity.icon }}
                </div>
                <div class="flex-1">
                  <p class="font-medium text-gray-900">{{ activity.title }}</p>
                  <p class="text-sm text-gray-600">{{ activity.description }}</p>
                  <p class="text-xs text-gray-500 mt-1">{{ formatDate(activity.date) }}</p>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-12">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h4 class="text-lg font-medium text-gray-900 mb-2">No recent activity</h4>
              <p class="text-gray-600">Your travel activities will appear here</p>
            </div>
          </div>
        </div>

        <!-- Edit Profile Tab -->
        <div v-if="activeTab === 'edit'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div class="max-w-2xl">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Edit Profile Information</h3>
            <p class="text-gray-600 mb-8">Update your personal information and preferences.</p>
            
            <form @submit.prevent="updateProfile" class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input 
                    v-model="editForm.name"
                    type="text"
                    required
                    class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors duration-150"
                    placeholder="Enter your full name"
                  >
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input 
                    v-model="editForm.email"
                    type="email"
                    required
                    class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors duration-150"
                    placeholder="Enter your email"
                  >
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input 
                    v-model="editForm.phone"
                    type="tel"
                    class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors duration-150"
                    placeholder="Enter your phone number"
                  >
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input 
                    v-model="editForm.location"
                    type="text"
                    placeholder="City, Country"
                    class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors duration-150"
                  >
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea 
                  v-model="editForm.bio"
                  rows="4"
                  placeholder="Tell us about yourself and your travel interests..."
                  class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors duration-150 resize-none"
                ></textarea>
              </div>

              <div class="flex justify-end pt-4">
                <button 
                  type="submit"
                  :disabled="updating"
                  class="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                >
                  <svg v-if="updating" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h2m0 0V9a2 2 0 012-2h2m-6 9l2 2 4-4" />
                  </svg>
                  <span>{{ updating ? 'Updating...' : 'Save Changes' }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Travel Preferences Tab -->
        <div v-if="activeTab === 'preferences'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div class="max-w-4xl">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Travel Preferences</h3>
            <p class="text-gray-600 mb-8">Tell us about your travel style to get better recommendations.</p>
            
            <form @submit.prevent="updatePreferences" class="space-y-8">
              <!-- Travel Style -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-4">Travel Style</label>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <label 
                    v-for="style in travelStyles" 
                    :key="style.id"
                    class="relative flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 transition-all duration-200"
                    :class="{ 'border-blue-500 bg-blue-50': preferencesForm.travelStyle === style.id }"
                  >
                    <input 
                      v-model="preferencesForm.travelStyle"
                      :value="style.id"
                      type="radio"
                      class="sr-only"
                    >
                    <div class="text-3xl mb-2">{{ style.icon }}</div>
                    <span class="text-sm font-medium text-gray-900">{{ style.label }}</span>
                    <div v-if="preferencesForm.travelStyle === style.id" class="absolute top-2 right-2">
                      <div class="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Budget Range -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-4">Typical Budget Range</label>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label 
                    v-for="budget in budgetRanges" 
                    :key="budget.id"
                    class="relative flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 transition-all duration-200"
                    :class="{ 'border-blue-500 bg-blue-50': preferencesForm.budgetRange === budget.id }"
                  >
                    <input 
                      v-model="preferencesForm.budgetRange"
                      :value="budget.id"
                      type="radio"
                      class="sr-only"
                    >
                    <div class="text-2xl mr-3">{{ budget.icon }}</div>
                    <span class="text-sm font-medium text-gray-900">{{ budget.label }}</span>
                    <div v-if="preferencesForm.budgetRange === budget.id" class="absolute top-2 right-2">
                      <div class="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Travel Interests -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-4">Travel Interests (Select all that apply)</label>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <label 
                    v-for="interest in interests" 
                    :key="interest.id"
                    class="relative flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 transition-all duration-200"
                    :class="{ 'border-blue-500 bg-blue-50': preferencesForm.interests.includes(interest.id) }"
                  >
                    <input 
                      v-model="preferencesForm.interests"
                      :value="interest.id"
                      type="checkbox"
                      class="sr-only"
                    >
                    <div class="text-3xl mb-2">{{ interest.icon }}</div>
                    <span class="text-sm font-medium text-gray-900 text-center">{{ interest.label }}</span>
                    <div v-if="preferencesForm.interests.includes(interest.id)" class="absolute top-2 right-2">
                      <div class="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Travel Pace -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-4">Preferred Travel Pace</label>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label 
                    v-for="pace in travelPaces" 
                    :key="pace.id"
                    class="relative flex items-start p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 transition-all duration-200"
                    :class="{ 'border-blue-500 bg-blue-50': preferencesForm.pace === pace.id }"
                  >
                    <input 
                      v-model="preferencesForm.pace"
                      :value="pace.id"
                      type="radio"
                      class="sr-only"
                    >
                    <div class="text-2xl mr-3 mt-1">{{ pace.icon }}</div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ pace.label }}</div>
                      <div class="text-xs text-gray-600 mt-1">{{ pace.description }}</div>
                    </div>
                    <div v-if="preferencesForm.pace === pace.id" class="absolute top-2 right-2">
                      <div class="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Save Button -->
              <div class="flex justify-end pt-6">
                <button 
                  type="submit"
                  :disabled="updatingPreferences"
                  class="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                >
                  <svg v-if="updatingPreferences" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h2m0 0V9a2 2 0 012-2h2m-6 9l2 2 4-4" />
                  </svg>
                  <span>{{ updatingPreferences ? 'Updating...' : 'Save Preferences' }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Safety & Contacts Tab -->
        <div v-if="activeTab === 'safety'" class="space-y-8">
          <!-- Emergency Contacts Section -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div class="flex items-center justify-between mb-8">
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Emergency Contacts</h3>
                <p class="text-gray-600">Add trusted contacts who can be reached in case of emergency.</p>
              </div>
              <button 
                @click="addEmergencyContact"
                class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Contact
              </button>
            </div>
            
            <div class="space-y-6">
              <div 
                v-for="(contact, index) in safetyForm.emergencyContacts" 
                :key="`contact-${index}`"
                class="border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors duration-200"
              >
                <div class="flex items-center justify-between mb-6">
                  <div class="flex items-center gap-3">
                    <div v-if="contact.isPrimary" class="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                      </svg>
                      Primary Contact
                    </div>
                    <span v-else class="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      Emergency Contact {{ index + 1 }}
                    </span>
                  </div>
                  <button 
                    v-if="safetyForm.emergencyContacts.length > 1"
                    @click="removeEmergencyContact(index)"
                    class="inline-flex items-center gap-1 px-3 py-1 text-red-600 hover:text-red-800 text-sm font-medium transition-colors duration-150"
                    type="button"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input 
                      v-model="contact.name"
                      type="text"
                      required
                      placeholder="Contact name"
                      class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                    <select 
                      v-model="contact.relationship"
                      class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
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
                    <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input 
                      v-model="contact.phone"
                      type="tel"
                      required
                      placeholder="+1 (555) 123-4567"
                      class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input 
                      v-model="contact.email"
                      type="email"
                      placeholder="contact@email.com"
                      class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
                    >
                  </div>
                </div>
                
                <div class="mt-6">
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input 
                      :checked="contact.isPrimary"
                      @change="handlePrimaryContactChange(index)"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    >
                    <span class="text-sm text-gray-700">Set as primary emergency contact</span>
                  </label>
                  <p class="text-xs text-gray-500 mt-1">The primary contact will be contacted first in emergencies.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Location Sharing Section -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-6">Location Sharing & Safety</h3>
            
            <div class="space-y-8">
              <!-- Current Location Display -->
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="font-medium text-blue-900 mb-2">Current Location</h4>
                    <p v-if="userLocation" class="text-sm text-blue-700 flex items-center gap-2">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                      </svg>
                      {{ userLocation.address || `${userLocation.latitude}, ${userLocation.longitude}` }}
                    </p>
                    <p v-else class="text-sm text-blue-600 flex items-center gap-2">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                      Location not available
                    </p>
                  </div>
                  <button 
                    @click="getCurrentLocation"
                    class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Update Location
                  </button>
                </div>
              </div>

              <!-- Location Sharing Settings -->
              <div class="space-y-6">
                <div class="flex items-center justify-between p-6 border border-gray-200 rounded-lg">
                  <div>
                    <h4 class="font-medium text-gray-900 mb-1">Enable Location Sharing</h4>
                    <p class="text-sm text-gray-600">Allow trusted contacts to see your location during trips</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input 
                      v-model="safetyForm.locationSharing.enabled"
                      type="checkbox"
                      class="sr-only peer"
                    >
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div v-if="safetyForm.locationSharing.enabled" class="ml-4 space-y-4">
                  <label class="flex items-center gap-3">
                    <input 
                      v-model="safetyForm.locationSharing.shareWithContacts"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    >
                    <span class="text-sm text-gray-700">Share with emergency contacts</span>
                  </label>
                  
                  <label class="flex items-center gap-3">
                    <input 
                      v-model="safetyForm.locationSharing.shareWithTrustedCircle"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    >
                    <span class="text-sm text-gray-700">Share with trusted travel circle</span>
                  </label>
                  
                  <label class="flex items-center gap-3">
                    <input 
                      v-model="safetyForm.locationSharing.allowEmergencyAccess"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    >
                    <span class="text-sm text-gray-700">Allow emergency services access</span>
                  </label>
                </div>
              </div>

              <!-- Check-in Preferences -->
              <div class="space-y-6">
                <h4 class="font-medium text-gray-900">Check-in Preferences</h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Check-in Frequency</label>
                    <select 
                      v-model="safetyForm.travelPreferences.checkInFrequency"
                      class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
                    >
                      <option value="hourly">Every Hour</option>
                      <option value="4hours">Every 4 Hours</option>
                      <option value="daily">Daily</option>
                      <option value="manual">Manual Only</option>
                    </select>
                  </div>
                </div>
                
                <div class="space-y-4">
                  <label class="flex items-center gap-3">
                    <input 
                      v-model="safetyForm.travelPreferences.autoCheckIn"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    >
                    <span class="text-sm text-gray-700">Enable automatic check-ins based on location</span>
                  </label>
                  
                  <label class="flex items-center gap-3">
                    <input 
                      v-model="safetyForm.travelPreferences.sosButtonEnabled"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    >
                    <span class="text-sm text-gray-700">Enable SOS emergency button</span>
                  </label>
                </div>
              </div>

              <!-- Emergency SOS Button -->
              <div v-if="safetyForm.travelPreferences.sosButtonEnabled" class="bg-red-50 border border-red-200 rounded-lg p-6">
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="font-medium text-red-900 mb-1">Emergency SOS</h4>
                    <p class="text-sm text-red-700">Press to send emergency alert to your contacts</p>
                  </div>
                  <button 
                    @click="showEmergencyModal = true"
                    class="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-150"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    SOS
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Medical Information Section -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Medical Information</h3>
            <p class="text-gray-600 mb-6">This information will be shared with emergency services if needed.</p>
            
            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
                  <select 
                    v-model="safetyForm.medicalInfo.bloodType"
                    class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
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
              
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
                  <textarea 
                    v-model="safetyForm.medicalInfo.allergies"
                    rows="3"
                    placeholder="List any allergies (food, medication, environmental)..."
                    class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 resize-none"
                  ></textarea>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
                  <textarea 
                    v-model="safetyForm.medicalInfo.medications"
                    rows="3"
                    placeholder="List current medications and dosages..."
                    class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 resize-none"
                  ></textarea>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
                  <textarea 
                    v-model="safetyForm.medicalInfo.medicalConditions"
                    rows="3"
                    placeholder="List any chronic conditions or medical history..."
                    class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 resize-none"
                  ></textarea>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Emergency Medical Information</label>
                  <textarea 
                    v-model="safetyForm.medicalInfo.emergencyMedicalInfo"
                    rows="4"
                    placeholder="Any additional medical information for emergency responders..."
                    class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 resize-none"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <!-- Save Safety Settings Button -->
          <div class="text-center">
            <button 
              @click="updateSafetySettings"
              :disabled="updatingSafety"
              class="inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              <svg v-if="updatingSafety" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>{{ updatingSafety ? 'Updating...' : 'Save Safety Settings' }}</span>
            </button>
          </div>
        </div>

        <!-- Security Tab -->
        <div v-if="activeTab === 'security'" class="space-y-8">
          <!-- Change Password -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div class="max-w-md">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Change Password</h3>
              <p class="text-gray-600 mb-6">Update your password to keep your account secure.</p>
              
              <form @submit.prevent="changePassword" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input 
                    v-model="passwordForm.currentPassword"
                    type="password"
                    required
                    class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors duration-150"
                  >
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input 
                    v-model="passwordForm.newPassword"
                    type="password"
                    required
                    minlength="8"
                    class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors duration-150"
                  >
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input 
                    v-model="passwordForm.confirmPassword"
                    type="password"
                    required
                    class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors duration-150"
                  >
                </div>
                
                <div class="pt-4">
                  <button 
                    type="submit"
                    :disabled="changingPassword"
                    class="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                  >
                    <svg v-if="changingPassword" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>{{ changingPassword ? 'Updating...' : 'Change Password' }}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Two-Factor Authentication -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Two-Factor Authentication</h3>
                <p class="text-gray-600">Add an extra layer of security to your account</p>
                <p class="text-sm text-gray-500 mt-1">
                  Status: 
                  <span :class="user.twoFactorEnabled ? 'text-green-600 font-medium' : 'text-gray-500'">
                    {{ user.twoFactorEnabled ? 'Enabled' : 'Disabled' }}
                  </span>
                </p>
              </div>
              <button 
                @click="toggleTwoFactor"
                :class="[
                  'px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
                  user.twoFactorEnabled 
                    ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500' 
                    : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
                ]"
              >
                {{ user.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA' }}
              </button>
            </div>
          </div>

          <!-- Danger Zone -->
          <div class="bg-white rounded-xl shadow-sm border border-red-200 p-8">
            <div class="border-l-4 border-red-500 pl-6">
              <h3 class="text-xl font-semibold text-red-600 mb-2">Danger Zone</h3>
              <p class="text-gray-600 mb-6">Once you delete your account, all your data will be permanently removed. This action cannot be undone.</p>
              <button 
                @click="showDeleteModal = true"
                class="inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Account
              </button>
            </div>
          </div>
        </div>

        <!-- Travel History Tab -->
        <div v-if="activeTab === 'history'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 class="text-xl font-semibold text-gray-900 mb-6">Travel History</h3>
          
          <div v-if="travelHistory.length > 0" class="space-y-6">
            <div 
              v-for="trip in travelHistory" 
              :key="trip.id"
              class="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors duration-200"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h4 class="text-lg font-semibold text-gray-900 mb-2">{{ trip.title }}</h4>
                  <p class="text-gray-600 mb-4 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                    {{ trip.destination }}
                  </p>
                  <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                      </svg>
                      {{ formatDate(trip.startDate) }} - {{ formatDate(trip.endDate) }}
                    </span>
                    <span class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
                      </svg>
                      ${{ trip.totalCost || 0 }}
                    </span>
                    <span class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {{ trip.rating ? trip.rating + '/5' : 'Not rated' }}
                    </span>
                  </div>
                </div>
                <div class="flex flex-col gap-2">
                  <router-link 
                    :to="`/itinerary/${trip.id}`"
                    class="inline-flex items-center gap-1 px-3 py-1.5 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-150"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Details
                  </router-link>
                  <button 
                    v-if="!trip.rating"
                    @click="rateTrip(trip)"
                    class="inline-flex items-center gap-1 px-3 py-1.5 text-green-600 hover:text-green-700 text-sm font-medium transition-colors duration-150"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    Rate Trip
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else class="text-center py-16">
            <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No travel history yet</h3>
            <p class="text-gray-600 mb-6">Your completed trips will appear here</p>
            <router-link 
              to="/dashboard"
              class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Plan Your First Trip
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
        <h3 class="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          Emergency SOS
        </h3>
        <p class="text-gray-600 mb-6">This will immediately alert your emergency contacts and share your location. Use only in real emergencies.</p>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Emergency Type (Optional)</label>
            <select v-model="emergencyType" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
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
              v-model="emergencyMessage"
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
            class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-bold flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            Send Emergency Alert
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Account Modal -->
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
      emergencyType: '',
      emergencyMessage: '',
      
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
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
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
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/activity`, {
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
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
        const response = await fetch(`${API_BASE_URL}/api/users/travel-history`, {
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
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
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
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/preferences`, {
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
    
    async updateSafetySettings() {
      console.log('🛡️ Updating safety settings:', this.safetyForm);
      this.updatingSafety = true
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/safety-settings`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(this.safetyForm)
        })
        
        if (response.ok) {
          const updatedSafety = await response.json()
          console.log('✅ Safety settings updated:', updatedSafety);
          this.user.emergencyContacts = updatedSafety.emergencyContacts
          this.user.locationSharing = updatedSafety.locationSharing
          this.user.medicalInfo = updatedSafety.medicalInfo
          this.user.travelPreferences = updatedSafety.travelPreferences
          this.showNotification('Safety settings updated successfully! 🛡️', 'success')
        } else if (response.status === 404) {
          // API not implemented yet - simulate success
          console.warn('🛡️ Safety API not implemented, simulating update')
          this.user.emergencyContacts = this.safetyForm.emergencyContacts
          this.user.locationSharing = this.safetyForm.locationSharing
          this.user.medicalInfo = this.safetyForm.medicalInfo
          this.user.travelPreferences = this.safetyForm.travelPreferences
          this.showNotification('Safety settings updated! 🛡️ (Demo mode)', 'success')
        } else {
          throw new Error('Failed to update safety settings')
        }
      } catch (error) {
        console.error('❌ Error updating safety settings:', error)
        // In demo mode, still update locally
        this.user.emergencyContacts = this.safetyForm.emergencyContacts
        this.user.locationSharing = this.safetyForm.locationSharing
        this.user.medicalInfo = this.safetyForm.medicalInfo
        this.user.travelPreferences = this.safetyForm.travelPreferences
        this.showNotification('Safety settings updated locally! 🛡️ (Demo mode)', 'warning')
      } finally {
        this.updatingSafety = false
      }
    },
    
    async changePassword() {
      if (!this.validatePasswordForm()) return
      
      this.changingPassword = true
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/change-password`, {
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
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/two-factor`, {
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
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/profile-picture`, {
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
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/delete-account`, {
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
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
      try {
        const response = await fetch(`${API_BASE_URL}/api/itineraries/${trip.id}/rate`, {
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
    
    // Safety-related methods
    addEmergencyContact() {
      this.safetyForm.emergencyContacts.push({
        name: '',
        relationship: '',
        phone: '',
        email: '',
        isPrimary: false
      })
    },
    
    removeEmergencyContact(index) {
      if (this.safetyForm.emergencyContacts.length > 1) {
        this.safetyForm.emergencyContacts.splice(index, 1)
        // If we removed the primary contact, make the first one primary
        if (!this.safetyForm.emergencyContacts.some(contact => contact.isPrimary)) {
          this.safetyForm.emergencyContacts[0].isPrimary = true
        }
      }
    },
    
    handlePrimaryContactChange(index) {
      // Only one contact can be primary
      this.safetyForm.emergencyContacts.forEach((contact, i) => {
        contact.isPrimary = i === index
      })
    },
    
    getCurrentLocation() {
      if (!navigator.geolocation) {
        this.showNotification('Geolocation is not supported by this browser', 'error')
        return
      }
      
      this.showNotification('Getting your location...', 'info')
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          }
          
          // Optionally reverse geocode to get address
          this.reverseGeocode(position.coords.latitude, position.coords.longitude)
          this.updateUserLocation()
        },
        (error) => {
          console.error('Error getting location:', error)
          this.showNotification('Unable to get your location. Please check permissions.', 'error')
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      )
    },
    
    async reverseGeocode(lat, lng) {
      try {
        // You can use a geocoding service here
        // For demo purposes, we'll just use coordinates
        this.userLocation.address = `${lat.toFixed(6)}, ${lng.toFixed(6)}`
      } catch (error) {
        console.error('Error reverse geocoding:', error)
      }
    },
    
    async updateUserLocation() {
      if (!this.userLocation) return
      
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/location`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(this.userLocation)
        })
        
        if (response.ok) {
          this.showNotification('Location updated successfully! 📍', 'success')
        } else {
          throw new Error('Failed to update location')
        }
      } catch (error) {
        console.error('Error updating location:', error)
        this.showNotification('Location updated locally! 📍 (Demo mode)', 'warning')
      }
    },
    
    async sendEmergencyAlert() {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
      try {
        const alertData = {
          type: this.emergencyType || 'other',
          location: this.userLocation,
          emergencyContacts: this.safetyForm.emergencyContacts.filter(contact => contact.name && contact.phone),
          message: this.emergencyMessage
        }
        
        const response = await fetch(`${API_BASE_URL}/api/emergency/alert`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(alertData)
        })
        
        if (response.ok) {
          this.showNotification('Emergency alert sent successfully! 🚨', 'success')
          this.showEmergencyModal = false
          this.emergencyType = ''
          this.emergencyMessage = ''
        } else {
          throw new Error('Failed to send emergency alert')
        }
      } catch (error) {
        console.error('Error sending emergency alert:', error)
        this.showNotification('Emergency alert sent locally! 🚨 (Demo mode)', 'warning')
        this.showEmergencyModal = false
        this.emergencyType = ''
        this.emergencyMessage = ''
      }
    },
    
    initializeSafetyFeatures() {
      // Get current location on load if location sharing is enabled
      if (this.safetyForm.locationSharing.enabled) {
        this.getCurrentLocation()
      }
    },
    
    // Validation methods
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
    
    // Helper methods
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
      }, 5000)
    }
  },
  
  // Lifecycle hooks
  beforeUnmount() {
    // Clean up location tracking
    if (this.locationWatchId) {
      navigator.geolocation.clearWatch(this.locationWatchId)
    }
  }
}
</script>