<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
            <div v-if="loading" class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <div class="animate-pulse space-y-6">
                        <div class="h-8 bg-gray-200 rounded-lg w-3/4"></div>
                        <div class="h-4 bg-gray-200 rounded-md w-1/2"></div>
                        <div class="space-y-4">
                            <div class="h-20 bg-gray-200 rounded-lg"></div>
                            <div class="h-20 bg-gray-200 rounded-lg"></div>
                            <div class="h-20 bg-gray-200 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div v-else-if="itinerary" class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <!-- Header Section -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                        <div class="flex-1">
                            <div class="flex items-center gap-3 mb-3">
                                <h1 class="text-3xl font-bold text-gray-900 tracking-tight">{{ itinerary.title }}</h1>
                                <span v-if="itinerary.aiGenerated" class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs px-3 py-1 rounded-full font-medium border border-emerald-200">
                                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                    </svg>
                                    AI Generated
                                </span>
                            </div>
                            
                            <div class="flex flex-wrap items-center gap-6 text-gray-600 mb-4">
                                <div class="flex items-center gap-2">
                                    <div class="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                                        <svg class="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <span class="font-medium">{{ itinerary.destination }}</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <div class="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg class="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
                                        </svg>
                                    </div>
                                    <span>{{ formatDate(itinerary.startDate) }} - {{ formatDate(itinerary.endDate) }}</span>
                                </div>
                                <div v-if="itinerary.departureTime && itinerary.arrivalTime" class="flex items-center gap-2">
                                    <div class="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center">
                                        <svg class="w-3 h-3 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <span>{{ formatTime(itinerary.departureTime) }} - {{ formatTime(itinerary.arrivalTime) }}</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <div class="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                                        <svg class="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <span>{{ tripDuration }} days</span>
                                </div>
                            </div>
                            
                            <!-- Trip Stats -->
                            <div class="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                                <div class="flex items-center gap-2">
                                    <div class="w-4 h-4 bg-yellow-100 rounded-full flex items-center justify-center">
                                        <svg class="w-2.5 h-2.5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <span>Budget: <span class="font-medium capitalize">{{ itinerary.budget || 'Not set' }}</span></span>
                                </div>
                                <div v-if="itinerary.interests?.length" class="flex items-center gap-2">
                                    <div class="w-4 h-4 bg-indigo-100 rounded-full flex items-center justify-center">
                                        <svg class="w-2.5 h-2.5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <span>{{ itinerary.interests.slice(0, 2).join(', ') }}{{ itinerary.interests.length > 2 ? ` +${itinerary.interests.length - 2}` : '' }}</span>
                                </div>
                                <div v-if="itinerary.pace" class="flex items-center gap-2">
                                    <div class="w-4 h-4 bg-orange-100 rounded-full flex items-center justify-center">
                                        <svg class="w-2.5 h-2.5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <span class="capitalize">{{ itinerary.pace }} pace</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Action Buttons -->
                        <div class="flex flex-wrap gap-3">
                            <button 
                                @click="toggleEditMode"
                                class="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150"
                            >
                                <svg v-if="editMode" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                {{ editMode ? 'View Mode' : 'Edit Trip Details' }}
                            </button>
                            
                            <button 
                                @click="exportItinerary"
                                class="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors duration-150"
                            >
                                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Export
                            </button>
                            
                            <button 
                                @click="shareItinerary"
                                class="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-150"
                            >
                                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                </svg>
                                Share
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Edit Trip Details Modal/Section -->
                <div v-if="editMode" class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                    <div class="border-l-4 border-blue-500 pl-6 mb-8">
                        <h2 class="text-xl font-semibold text-gray-900 mb-2">Edit Trip Details</h2>
                        <p class="text-gray-600 text-sm">Update your trip information and preferences</p>
                    </div>

                    <div class="space-y-8">
                        <!-- Date and Time Section -->
                        <div class="space-y-6">
                            <h3 class="text-lg font-medium text-gray-900">Trip Schedule</h3>
                            
                            <!-- Date Range -->
                            <div class="grid md:grid-cols-2 gap-6">
                                <div class="group">
                                    <label class="block text-sm font-medium text-gray-700 mb-3">
                                        Departure Date <span class="text-red-400">*</span>
                                    </label>
                                    <input 
                                        v-model="editForm.startDate"
                                        type="date" 
                                        required
                                        class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                                    >
                                </div>
                                <div class="group">
                                    <label class="block text-sm font-medium text-gray-700 mb-3">
                                        Return Date <span class="text-red-400">*</span>
                                    </label>
                                    <input 
                                        v-model="editForm.endDate"
                                        type="date" 
                                        required
                                        :min="editForm.startDate"
                                        class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                                    >
                                </div>
                            </div>

                            <!-- Time Range -->
                            <div class="grid md:grid-cols-2 gap-6">
                                <div class="group">
                                    <label class="block text-sm font-medium text-gray-700 mb-3">
                                        Departure Time
                                    </label>
                                    <input 
                                        v-model="editForm.departureTime"
                                        type="time" 
                                        class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                                    >
                                </div>
                                <div class="group">
                                    <label class="block text-sm font-medium text-gray-700 mb-3">
                                        Arrival Time
                                    </label>
                                    <input 
                                        v-model="editForm.arrivalTime"
                                        type="time" 
                                        class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                                    >
                                </div>
                            </div>
                        </div>

                        <!-- Interests Section -->
                        <div class="space-y-6">
                            <h3 class="text-lg font-medium text-gray-900">Your Interests</h3>
                            
                            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                <label 
                                    v-for="interest in availableInterests" 
                                    :key="interest.value"
                                    class="group relative flex flex-col items-center p-4 bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-purple-300 hover:shadow-md transition-all duration-300"
                                    :class="{ 
                                        'border-purple-400 shadow-md bg-gradient-to-br from-purple-50 to-pink-50 ring-2 ring-purple-100': editForm.interests.includes(interest.value)
                                    }"
                                >
                                    <input 
                                        type="checkbox" 
                                        :value="interest.value"
                                        v-model="editForm.interests"
                                        class="sr-only"
                                    >
                                    <div class="text-2xl mb-2">{{ interest.icon }}</div>
                                    <span class="text-sm font-medium text-gray-700 text-center">{{ interest.label }}</span>
                                    <div v-if="editForm.interests.includes(interest.value)" class="absolute top-2 right-2">
                                        <div class="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                                            <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <!-- Budget Section -->
                        <div class="space-y-6">
                            <h3 class="text-lg font-medium text-gray-900">Budget Preference</h3>
                            
                            <div class="grid md:grid-cols-3 gap-6">
                                <label 
                                    class="relative group flex flex-col p-6 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-emerald-300 hover:shadow-md transition-all duration-300"
                                    :class="{ 
                                        'border-emerald-400 shadow-md bg-gradient-to-br from-emerald-50 to-green-50 ring-2 ring-emerald-100': editForm.budget === 'budget'
                                    }"
                                >
                                    <input 
                                        type="radio" 
                                        value="budget"
                                        v-model="editForm.budget"
                                        class="sr-only"
                                    >
                                    <div class="flex items-center justify-between mb-4">
                                        <div class="flex items-center space-x-3">
                                            <div class="text-2xl">💰</div>
                                            <span class="font-semibold text-emerald-700">Budget</span>
                                        </div>
                                        <div v-if="editForm.budget === 'budget'" class="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                                            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="text-left">
                                        <div class="text-lg font-bold text-gray-900 mb-2">$500 - $1,000</div>
                                        <div class="text-sm text-gray-600">Smart travel with hostels, local food, and public transport</div>
                                    </div>
                                </label>
                                
                                <label 
                                    class="relative group flex flex-col p-6 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 hover:shadow-md transition-all duration-300"
                                    :class="{ 
                                        'border-blue-400 shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 ring-2 ring-blue-100': editForm.budget === 'mid-range'
                                    }"
                                >
                                    <input 
                                        type="radio" 
                                        value="mid-range"
                                        v-model="editForm.budget"
                                        class="sr-only"
                                    >
                                    <div class="flex items-center justify-between mb-4">
                                        <div class="flex items-center space-x-3">
                                            <div class="text-2xl">🏨</div>
                                            <span class="font-semibold text-blue-700">Mid-Range</span>
                                        </div>
                                        <div v-if="editForm.budget === 'mid-range'" class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="text-left">
                                        <div class="text-lg font-bold text-gray-900 mb-2">$1,000 - $2,500</div>
                                        <div class="text-sm text-gray-600">Comfortable hotels, great restaurants, and guided tours</div>
                                    </div>
                                </label>
                                
                                <label 
                                    class="relative group flex flex-col p-6 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-purple-300 hover:shadow-md transition-all duration-300"
                                    :class="{ 
                                        'border-purple-400 shadow-md bg-gradient-to-br from-purple-50 to-pink-50 ring-2 ring-purple-100': editForm.budget === 'luxury'
                                    }"
                                >
                                    <input 
                                        type="radio" 
                                        value="luxury"
                                        v-model="editForm.budget"
                                        class="sr-only"
                                    >
                                    <div class="flex items-center justify-between mb-4">
                                        <div class="flex items-center space-x-3">
                                            <div class="text-2xl">✨</div>
                                            <span class="font-semibold text-purple-700">Luxury</span>
                                        </div>
                                        <div v-if="editForm.budget === 'luxury'" class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                                            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="text-left">
                                        <div class="text-lg font-bold text-gray-900 mb-2">$2,500+</div>
                                        <div class="text-sm text-gray-600">Premium experiences, fine dining, and luxury accommodations</div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <!-- Travel Pace Section -->
                        <div class="space-y-6">
                            <h3 class="text-lg font-medium text-gray-900">Travel Pace</h3>
                            
                            <div class="grid md:grid-cols-3 gap-6">
                                <label 
                                    class="relative group flex flex-col p-6 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-green-300 hover:shadow-md transition-all duration-300"
                                    :class="{ 
                                        'border-green-400 shadow-md bg-gradient-to-br from-green-50 to-emerald-50 ring-2 ring-green-100': editForm.pace === 'relaxed'
                                    }"
                                >
                                    <input 
                                        type="radio" 
                                        value="relaxed"
                                        v-model="editForm.pace"
                                        class="sr-only"
                                    >
                                    <div class="flex items-center justify-between mb-4">
                                        <div class="flex items-center space-x-3">
                                            <div class="text-2xl">🌿</div>
                                            <span class="font-semibold text-green-700">Relaxed</span>
                                        </div>
                                        <div v-if="editForm.pace === 'relaxed'" class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="text-left">
                                        <div class="text-lg font-bold text-gray-900 mb-2">Take it easy</div>
                                        <div class="text-sm text-gray-600">2-3 activities per day with plenty of downtime</div>
                                    </div>
                                </label>
                                
                                <label 
                                    class="relative group flex flex-col p-6 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 hover:shadow-md transition-all duration-300"
                                    :class="{ 
                                        'border-blue-400 shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 ring-2 ring-blue-100': editForm.pace === 'moderate'
                                    }"
                                >
                                    <input 
                                        type="radio" 
                                        value="moderate"
                                        v-model="editForm.pace"
                                        class="sr-only"
                                    >
                                    <div class="flex items-center justify-between mb-4">
                                        <div class="flex items-center space-x-3">
                                            <div class="text-2xl">⚖️</div>
                                            <span class="font-semibold text-blue-700">Moderate</span>
                                        </div>
                                        <div v-if="editForm.pace === 'moderate'" class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="text-left">
                                        <div class="text-lg font-bold text-gray-900 mb-2">Balanced schedule</div>
                                        <div class="text-sm text-gray-600">3-4 activities per day with good variety</div>
                                    </div>
                                </label>
                                
                                <label 
                                    class="relative group flex flex-col p-6 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-orange-300 hover:shadow-md transition-all duration-300"
                                    :class="{ 
                                        'border-orange-400 shadow-md bg-gradient-to-br from-orange-50 to-red-50 ring-2 ring-orange-100': editForm.pace === 'active'
                                    }"
                                >
                                    <input 
                                        type="radio" 
                                        value="active"
                                        v-model="editForm.pace"
                                        class="sr-only"
                                    >
                                    <div class="flex items-center justify-between mb-4">
                                        <div class="flex items-center space-x-3">
                                            <div class="text-2xl">⚡</div>
                                            <span class="font-semibold text-orange-700">Active</span>
                                        </div>
                                        <div v-if="editForm.pace === 'active'" class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="text-left">
                                        <div class="text-lg font-bold text-gray-900 mb-2">Pack it all in</div>
                                        <div class="text-sm text-gray-600">4-5 activities per day for maximum adventure</div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <!-- Additional Notes -->
                        <div class="space-y-6">
                            <h3 class="text-lg font-medium text-gray-900">Additional Notes</h3>
                            
                            <div class="group">
                                <div class="relative">
                                    <textarea 
                                        v-model="editForm.notes"
                                        rows="4"
                                        class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none"
                                        placeholder="Share any special requirements, dietary restrictions, accessibility needs, or specific preferences..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
                            <button 
                                @click="saveChanges"
                                :disabled="saving"
                                class="flex-1 group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                            >
                                <div class="relative flex items-center justify-center space-x-2">
                                    <div v-if="saving" class="animate-spin">
                                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </div>
                                    <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h2m0 0V9a2 2 0 012-2h2m-6 9l2 2 4-4" />
                                    </svg>
                                    <span>{{ saving ? 'Saving Changes...' : 'Save Trip Details' }}</span>
                                </div>
                            </button>
                            
                            <button 
                                @click="cancelChanges"
                                class="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-150"
                            >
                                Cancel Changes
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Quick Summary Cards -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                                <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-600 mb-1">Total Days</p>
                                <p class="text-2xl font-bold text-gray-900">{{ tripDuration }}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                                <svg class="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-600 mb-1">Activities</p>
                                <p class="text-2xl font-bold text-gray-900">{{ totalActivities }}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
                                <svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <p class="text-sm font-medium text-gray-600 mb-1">Est. Cost</p>
                                <p class="text-2xl font-bold text-gray-900">${{ estimatedCost }}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                                <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
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
                        v-for="(day, dayIndex) in itinerary.days" 
                        :key="dayIndex" 
                        class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                    >
                        <!-- Day Header -->
                        <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h2 class="text-xl font-semibold text-gray-900 mb-1">
                                        Day {{ dayIndex + 1 }} - {{ formatDayDate(day.date) }}
                                    </h2>
                                    <div class="flex items-center gap-4 text-sm text-gray-600">
                                        <span>{{ day.activities?.length || 0 }} activities planned</span>
                                        <span v-if="getDayCost(day) > 0" class="flex items-center gap-1">
                                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
                                            </svg>
                                            Estimated cost: ${{ getDayCost(day) }}
                                        </span>
                                    </div>
                                </div>
                                <div class="text-3xl">{{ getDayIcon(dayIndex) }}</div>
                            </div>
                        </div>
                        
                        <!-- Activities -->
                        <div class="p-8">
                            <div v-if="day.activities && day.activities.length > 0" class="space-y-6">
                                <div 
                                    v-for="(activity, actIndex) in day.activities" 
                                    :key="actIndex"
                                    class="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all duration-200"
                                >
                                    <div class="space-y-4">
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
                                                        <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                                                        </svg>
                                                        <span>{{ activity.location }}</span>
                                                    </div>
                                                    <div class="flex items-center gap-2">
                                                        <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                                                        </svg>
                                                        <span>{{ activity.duration }}</span>
                                                    </div>
                                                    <div class="flex items-center gap-2">
                                                        <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                                                        </svg>
                                                        <span>{{ getActivityCategory(activity.activity) }}</span>
                                                    </div>
                                                </div>
                                                
                                                <div v-if="activity.notes" class="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                                                    <div class="flex items-start gap-2">
                                                        <svg class="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                                                        </svg>
                                                        <div>
                                                            <p class="text-sm font-medium text-amber-800">Note</p>
                                                            <p class="text-sm text-amber-700">{{ activity.notes }}</p>
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
                                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg class="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                </div>
                                <h3 class="text-lg font-medium text-gray-900 mb-2">No activities planned for this day</h3>
                                <p class="text-gray-600">This day is currently empty in your itinerary.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Error State -->
            <div v-else class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg class="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">Itinerary Not Found</h2>
                <p class="text-gray-600 mb-8 max-w-md mx-auto">The itinerary you're looking for doesn't exist or you don't have permission to view it.</p>
                <button 
                    onclick="window.history.back()" 
                    class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150"
                >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Go Back
                </button>
            </div>

            <!-- Share Modal -->
            <div v-if="showShareModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click="showShareModal = false">
                <div class="bg-white rounded-xl shadow-xl border border-gray-200 p-6 max-w-md w-full" @click.stop>
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-lg font-semibold text-gray-900">Share Itinerary</h3>
                        <button 
                            @click="showShareModal = false"
                            class="text-gray-400 hover:text-gray-600 transition-colors duration-150"
                        >
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
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
                                    class="px-4 py-2 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150"
                                >
                                    Copy
                                </button>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-3">
                            <button 
                                @click="shareViaEmail" 
                                class="flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors duration-150"
                            >
                                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Email
                            </button>
                            <button 
                                @click="shareViaWhatsApp" 
                                class="flex items-center justify-center gap-2 py-2.5 px-4 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors duration-150"
                            >
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.786"/>
                                </svg>
                                WhatsApp
                            </button>
                        </div>
                    </div>
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
      originalItinerary: null,
      editForm: {
        startDate: '',
        endDate: '',
        departureTime: '',
        arrivalTime: '',
        interests: [],
        budget: '',
        pace: '',
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
      ]
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
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
      try {
        const response = await fetch(`${API_BASE_URL}/api/itineraries/${this.$route.params.id}`, {
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
        this.editMode = !this.editMode;
        if (this.editMode) {
            // Convert numeric budget back to string preference for editing
            let budgetPreference = 'mid-range'; // default
            if (this.itinerary.budgetPreference) {
                budgetPreference = this.itinerary.budgetPreference;
            } else if (this.itinerary.budget) {
                // Convert numeric budget to string preference
                if (this.itinerary.budget <= 1500) {
                    budgetPreference = 'budget';
                } else if (this.itinerary.budget <= 3000) {
                    budgetPreference = 'mid-range';
                } else {
                    budgetPreference = 'luxury';
                }
            }
            
            // Populate edit form with current values
            this.editForm = {
                startDate: this.itinerary.startDate,
                endDate: this.itinerary.endDate,
                departureTime: this.itinerary.departureTime || '',
                arrivalTime: this.itinerary.arrivalTime || '',
                interests: [...(this.itinerary.interests || [])],
                budget: budgetPreference,
                pace: this.itinerary.pace || 'moderate',
                notes: this.itinerary.notes || ''
            };
        }
    },
    
    async saveChanges() {
      this.saving = true;
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com';
      
      try {
          // Update the itinerary with new values
          this.itinerary.startDate = this.editForm.startDate;
          this.itinerary.endDate = this.editForm.endDate;
          this.itinerary.departureTime = this.editForm.departureTime;
          this.itinerary.arrivalTime = this.editForm.arrivalTime;
          this.itinerary.interests = [...this.editForm.interests];
          this.itinerary.pace = this.editForm.pace;
          this.itinerary.notes = this.editForm.notes;
          
          // Convert budget string to number for server compatibility
          const budgetMap = {
              'budget': 1000,
              'mid-range': 2500,
              'luxury': 5000
          };
          this.itinerary.budget = budgetMap[this.editForm.budget] || 2500;
          
          // Store the budget preference as well (if your schema supports it)
          this.itinerary.budgetPreference = this.editForm.budget;
          
          console.log('Saving itinerary:', this.itinerary);
          console.log('API URL:', `${API_BASE_URL}/api/itineraries/${this.itinerary._id}`);
          console.log('Token:', localStorage.getItem('token') ? 'Present' : 'Missing');
          
          // Make API call to save changes
          const response = await fetch(`${API_BASE_URL}/api/itineraries/${this.itinerary._id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify(this.itinerary)
          });
          
          console.log('Response status:', response.status);
          console.log('Response headers:', response.headers);
          
          if (response.ok) {
              const updatedItinerary = await response.json();
              console.log('Updated itinerary received:', updatedItinerary);
              this.itinerary = updatedItinerary;
              this.originalItinerary = JSON.parse(JSON.stringify(updatedItinerary));
              this.editMode = false;
              
              this.showNotification('Trip details updated successfully! 🎉', 'success');
          } else {
              // Get error details from response
              const errorText = await response.text();
              console.error('API Error:', response.status, errorText);
              
              let errorMessage = 'Failed to save changes.';
              try {
                  const errorData = JSON.parse(errorText);
                  errorMessage = errorData.message || errorMessage;
              } catch (e) {
                  errorMessage = `Server error (${response.status}): ${errorText}`;
              }
              
              this.showNotification(errorMessage, 'error');
              throw new Error(`HTTP ${response.status}: ${errorText}`);
          }
          
      } catch (error) {
          console.error('Error saving changes:', error);
          
          // More specific error handling
          if (error.name === 'TypeError' && error.message.includes('fetch')) {
              this.showNotification('Network error. Please check your internet connection.', 'error');
          } else if (error.message.includes('401')) {
              this.showNotification('Authentication failed. Please log in again.', 'error');
              // Optionally redirect to login
              // window.location.href = '/login';
          } else if (error.message.includes('403')) {
              this.showNotification('You don\'t have permission to edit this itinerary.', 'error');
          } else if (error.message.includes('404')) {
              this.showNotification('Itinerary not found. It may have been deleted.', 'error');
          } else if (!error.message.includes('HTTP')) {
              this.showNotification('Failed to save changes. Please try again.', 'error');
          }
      } finally {
          this.saving = false;
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

    formatTime(timeString) {
      if (!timeString) return '';
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
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
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
      try {
        const response = await fetch(`${API_BASE_URL}/api/ai/suggest-activities`, {
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