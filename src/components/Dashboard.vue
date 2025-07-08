<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header Section -->
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
        <div>
          <h1 class="text-3xl font-bold tracking-tight text-gray-900 mb-2">
            Welcome back, <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{{ user?.name || 'Traveler' }}</span>!
          </h1>
          <p class="text-gray-600 text-lg">Ready to plan your next adventure?</p>
        </div>
        <router-link 
          to="/create-trip" 
          class="inline-flex items-center gap-3 px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>New Trip</span>
        </router-link>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <!-- Total Trips Card -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 mb-2">Total Trips</p>
              <p class="text-3xl font-bold text-gray-900">{{ itineraries.length }}</p>
              <p class="text-xs text-gray-500 mt-1">All your adventures</p>
            </div>
            <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- AI Generated Card -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 mb-2">AI Generated</p>
              <p class="text-3xl font-bold text-gray-900">{{ aiGeneratedCount }}</p>
              <p class="text-xs text-gray-500 mt-1">Powered by AI</p>
            </div>
            <div class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Upcoming Trips Card -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 mb-2">Upcoming</p>
              <p class="text-3xl font-bold text-gray-900">{{ upcomingTrips }}</p>
              <p class="text-xs text-gray-500 mt-1">Ready to explore</p>
            </div>
            <div class="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Trips Section -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <!-- Section Header -->
        <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900">Your Trips</h2>
            <div class="flex items-center gap-3">
              <select class="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500">
                <option>All Trips</option>
                <option>Upcoming</option>
                <option>Completed</option>
                <option>AI Generated</option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- Loading State -->
        <div v-if="loading" class="p-12">
          <div class="text-center">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
            <p class="text-gray-600">Loading your trips...</p>
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-else-if="itineraries.length === 0" class="p-12 text-center">
          <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No trips yet</h3>
          <p class="text-gray-600 mb-6 max-w-sm mx-auto">Start planning your first adventure and let our AI help you create the perfect itinerary!</p>
          <router-link 
            to="/create-trip" 
            class="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-150"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Create Your First Trip
          </router-link>
        </div>
        
        <!-- Trips List -->
        <div v-else class="divide-y divide-gray-200">
          <div 
            v-for="trip in itineraries" 
            :key="trip._id"
            class="p-6 hover:bg-gray-50 cursor-pointer transition-colors duration-150 group"
            @click="viewTrip(trip._id)"
          >
            <div class="flex items-center justify-between">
              <div class="flex-1 min-w-0">
                <!-- Trip Title and Badge -->
                <div class="flex items-center gap-3 mb-3">
                  <h3 class="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-150 truncate">
                    {{ trip.title }}
                  </h3>
                  <span v-if="trip.aiGenerated" class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded-full font-medium border border-emerald-200">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                    AI Generated
                  </span>
                  <span v-if="getTripStatus(trip) === 'upcoming'" class="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full font-medium border border-blue-200">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                    </svg>
                    Upcoming
                  </span>
                </div>

                <!-- Trip Details -->
                <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                    <span class="font-medium">{{ trip.destination }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
                    </svg>
                    <span>{{ formatDate(trip.startDate) }} - {{ formatDate(trip.endDate) }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                    </svg>
                    <span>{{ getTripDuration(trip) }} days</span>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <button 
                  @click.stop="chatWithTrip(trip._id)"
                  class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-150"
                  title="Chat about this trip"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
                <button 
                  @click.stop="shareTrip(trip._id)"
                  class="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-150"
                  title="Share trip"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
                <button 
                  @click.stop="deleteTrip(trip._id)"
                  class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-150"
                  title="Delete trip"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions Section -->
      <div class="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <router-link 
          to="/chat"
          class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
              <svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">AI Assistant</h3>
              <p class="text-sm text-gray-600">Get travel recommendations</p>
            </div>
            <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </router-link>

        <router-link 
          to="/profile"
          class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group block focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors duration-200">
              <svg class="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors duration-200">Profile Settings</h3>
              <p class="text-sm text-gray-600">Manage your account</p>
            </div>
            <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </router-link>

        <div 
          @click="showTravelInsights"
          class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          tabindex="0"
          @keydown.enter="showTravelInsights"
          @keydown.space.prevent="showTravelInsights"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center group-hover:bg-purple-100 transition-colors duration-200">
              <svg class="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-200">Travel Insights</h3>
              <p class="text-sm text-gray-600">View your travel stats</p>
            </div>
            <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Travel Insights Modal -->
      <div v-if="showInsightsModal" class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click="closeInsightsModal">
        <div class="bg-white rounded-xl shadow-xl border border-gray-200 p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto" @click.stop>
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold text-gray-900">Travel Insights</h3>
            <button 
              @click="closeInsightsModal"
              class="text-gray-400 hover:text-gray-600 transition-colors duration-150"
            >
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <!-- Total Distance -->
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Total Distance</p>
                  <p class="text-2xl font-bold text-gray-900">{{ totalDistance }} km</p>
                </div>
                <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Favorite Destination -->
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Favorite Destination</p>
                  <p class="text-2xl font-bold text-gray-900">{{ favoriteDestination }}</p>
                </div>
                <div class="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Average Trip Duration -->
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Avg Trip Duration</p>
                  <p class="text-2xl font-bold text-gray-900">{{ averageTripDuration }} days</p>
                </div>
                <div class="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Total Savings -->
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">AI Savings</p>
                  <p class="text-2xl font-bold text-gray-900">${{ aiSavings }}</p>
                </div>
                <div class="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Travel Timeline -->
          <div class="mb-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Travel Timeline</h4>
            <div class="space-y-3">
              <div v-for="trip in recentTrips" :key="trip._id" class="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="font-medium text-gray-900">{{ trip.destination }}</p>
                  <p class="text-sm text-gray-600">{{ formatDate(trip.startDate) }}</p>
                </div>
                <span v-if="trip.aiGenerated" class="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">AI</span>
              </div>
            </div>
          </div>

          <div class="flex justify-end">
            <button 
              @click="closeInsightsModal"
              class="px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-150"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
export default {
  name: 'Dashboard',
  
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      itineraries: [],
      loading: true,
      showInsightsModal: false
    }
  },

  computed: {
    aiGeneratedCount() {
      return this.itineraries.filter(trip => trip.aiGenerated).length
    },

    upcomingTrips() {
      const now = new Date()
      return this.itineraries.filter(trip => new Date(trip.startDate) > now).length
    },

    totalDistance() {
      // Mock calculation - you can implement actual distance calculation
      return this.itineraries.length * 850 // Assuming average 850km per trip
    },

    favoriteDestination() {
      if (this.itineraries.length === 0) return 'None yet'
      
      // Count destinations
      const destinations = {}
      this.itineraries.forEach(trip => {
        const dest = trip.destination.split(',')[0] // Get city name
        destinations[dest] = (destinations[dest] || 0) + 1
      })
      
      // Find most frequent
      let maxCount = 0
      let favorite = 'None yet'
      Object.entries(destinations).forEach(([dest, count]) => {
        if (count > maxCount) {
          maxCount = count
          favorite = dest
        }
      })
      
      return favorite
    },

    averageTripDuration() {
      if (this.itineraries.length === 0) return 0
      
      const totalDays = this.itineraries.reduce((sum, trip) => {
        return sum + this.getTripDuration(trip)
      }, 0)
      
      return Math.round(totalDays / this.itineraries.length)
    },

    aiSavings() {
      // Mock calculation - estimate savings from AI optimization
      return this.aiGeneratedCount * 150 // Assuming $150 savings per AI trip
    },

    recentTrips() {
      return this.itineraries
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
        .slice(0, 5)
    }
  },

  async mounted() {
    await this.fetchItineraries()
    
    // Close modal on escape key
    document.addEventListener('keydown', this.handleEscape)
  },

  beforeUnmount() {
    document.removeEventListener('keydown', this.handleEscape)
  },

  methods: {
    async fetchItineraries() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/itineraries`, {
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

    shareTrip(tripId) {
      // Create share URL
      const shareUrl = `${window.location.origin}/itinerary/${tripId}`
      
      // Try to use Web Share API if available
      if (navigator.share) {
        navigator.share({
          title: 'Check out my travel itinerary!',
          text: 'I wanted to share my travel plans with you.',
          url: shareUrl
        }).catch(console.error)
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareUrl).then(() => {
          alert('Share link copied to clipboard!')
        }).catch(() => {
          // Final fallback: show URL in prompt
          prompt('Copy this link to share:', shareUrl)
        })
      }
    },

    async deleteTrip(id) {
      if (confirm('Are you sure you want to delete this trip?')) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/itineraries/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
          
          if (response.ok) {
            this.itineraries = this.itineraries.filter(trip => trip._id !== id)
          } else {
            throw new Error('Failed to delete trip')
          }
        } catch (error) {
          console.error('Error deleting trip:', error)
          alert('Failed to delete trip. Please try again.')
        }
      }
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    },

    getTripStatus(trip) {
      const now = new Date()
      const start = new Date(trip.startDate)
      const end = new Date(trip.endDate)
      
      if (now < start) return 'upcoming'
      if (now > end) return 'completed'
      return 'in-progress'
    },

    getTripDuration(trip) {
      const start = new Date(trip.startDate)
      const end = new Date(trip.endDate)
      return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1
    },

    showTravelInsights() {
      this.showInsightsModal = true
    },

    closeInsightsModal() {
      this.showInsightsModal = false
    },

    handleEscape(event) {
      if (event.key === 'Escape' && this.showInsightsModal) {
        this.closeInsightsModal()
      }
    }
  }
}
</script>