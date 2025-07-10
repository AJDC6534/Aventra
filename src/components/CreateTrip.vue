<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto">
        
        <!-- Header Section -->
        <div class="text-center mb-12">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
            <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 class="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Create Your Perfect Trip
          </h1>
          <p class="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Design your next adventure with our intelligent travel planner or craft your own unique journey
          </p>
        </div>
        
        <!-- Main Form Card -->
        <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          <div class="p-8 lg:p-12">
            <form @submit.prevent="handleSubmit" class="space-y-10">
              
              <!-- Trip Basics Section -->
              <div class="space-y-8">
                <div class="border-l-4 border-blue-500 pl-6">
                  <h2 class="text-xl font-semibold text-slate-900 mb-2">Trip Essentials</h2>
                  <p class="text-slate-600 text-sm">Let's start with the basics of your journey</p>
                </div>
                
                <!-- Trip Title -->
                <div class="group">
                  <label class="block text-sm font-medium text-slate-700 mb-3 group-focus-within:text-blue-600 transition-colors">
                    Trip Title <span class="text-red-400">*</span>
                  </label>
                  <div class="relative">
                    <input 
                      v-model="form.title"
                      type="text" 
                      required
                      class="w-full px-4 py-4 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-slate-300"
                      placeholder="My Amazing Adventure to Paris"
                    >
                    <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                  </div>
                  <p class="text-xs text-slate-500 mt-2 ml-1">Give your trip a memorable name that captures its essence</p>
                </div>
                
                <!-- Destination -->
                <div class="group">
                  <label class="block text-sm font-medium text-slate-700 mb-3 group-focus-within:text-blue-600 transition-colors">
                    Destination <span class="text-red-400">*</span>
                  </label>
                  <div class="relative">
                    <input 
                      v-model="form.destination"
                      type="text" 
                      required
                      class="w-full px-4 py-4 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-slate-300"
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
                    <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <p class="text-xs text-slate-500 mt-2 ml-1">Where would you like to explore and create memories?</p>
                </div>
                
                <!-- Date and Time Range -->
                  <div class="space-y-6">
                      <!-- Departure -->
                      <div class="grid md:grid-cols-2 gap-6">
                          <div class="group">
                              <label class="block text-sm font-medium text-slate-700 mb-3 group-focus-within:text-blue-600 transition-colors">
                                  Departure Date <span class="text-red-400">*</span>
                              </label>
                              <div class="relative">
                                  <input 
                                      v-model="form.startDate"
                                      type="date" 
                                      required
                                      :min="minDate"
                                      class="w-full px-4 py-4 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-slate-300"
                                  >
                              </div>
                          </div>
                          <div class="group">
                              <label class="block text-sm font-medium text-slate-700 mb-3 group-focus-within:text-blue-600 transition-colors">
                                  Departure Time
                              </label>
                              <div class="relative">
                                  <input 
                                      v-model="form.departureTime"
                                      type="time" 
                                      class="w-full px-4 py-4 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-slate-300"
                                  >
                                  <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                      <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                  </div>
                              </div>
                              <p class="text-xs text-slate-500 mt-2 ml-1">When do you plan to leave?</p>
                          </div>
                      </div>
                      
                      <!-- Return -->
                      <div class="grid md:grid-cols-2 gap-6">
                          <div class="group">
                              <label class="block text-sm font-medium text-slate-700 mb-3 group-focus-within:text-blue-600 transition-colors">
                                  Return Date <span class="text-red-400">*</span>
                              </label>
                              <div class="relative">
                                  <input 
                                      v-model="form.endDate"
                                      type="date" 
                                      required
                                      :min="form.startDate || minDate"
                                      class="w-full px-4 py-4 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-slate-300"
                                  >
                              </div>
                          </div>
                          <div class="group">
                              <label class="block text-sm font-medium text-slate-700 mb-3 group-focus-within:text-blue-600 transition-colors">
                                                    Arrival Time
                              </label>
                              <div class="relative">
                                  <input 
                                      v-model="form.arrivalTime"
                                      type="time" 
                                      class="w-full px-4 py-4 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-slate-300"
                                  >
                                  <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                      <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                  </div>
                              </div>
                              <p class="text-xs text-slate-500 mt-2 ml-1">When do you plan to return?</p>
                          </div>
                      </div>
                  </div>
                  
                  <!-- Trip Duration Display -->
                  <div v-if="tripDuration > 0" class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6">
                      <div class="flex items-center justify-between">
                          <div class="flex items-center space-x-3">
                              <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                  <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                              </div>
                                                <div>
                                  <h3 class="font-semibold text-slate-900">Trip Duration</h3>
                                  <p class="text-sm text-slate-600">{{ tripDuration }} {{ tripDuration === 1 ? 'day' : 'days' }} of adventure</p>
                                  <div v-if="form.departureTime && form.arrivalTime" class="text-xs text-slate-500 mt-1">
                                      {{ formatTime(form.departureTime) }} - {{ formatTime(form.arrivalTime) }}
                                  </div>
                              </div>
                          </div>
                          <div class="text-2xl font-bold text-blue-600">{{ tripDuration }}</div>
                      </div>
                  </div>
              </div>
              
              <!-- Interests Section -->
              <div class="space-y-6">
                <div class="border-l-4 border-purple-500 pl-6">
                  <h2 class="text-xl font-semibold text-slate-900 mb-2">Your Interests</h2>
                  <p class="text-slate-600 text-sm">What makes your heart race? <span class="text-red-400">*</span></p>
                </div>
                
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <label 
                    v-for="interest in availableInterests" 
                    :key="interest.value"
                    class="group relative flex flex-col items-center p-6 bg-white border border-slate-200 rounded-2xl cursor-pointer hover:border-purple-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    :class="{ 
                      'border-purple-400 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 ring-2 ring-purple-100': form.interests.includes(interest.value)
                    }"
                  >
                    <input 
                      type="checkbox" 
                      :value="interest.value"
                      v-model="form.interests"
                      class="sr-only"
                    >
                    <div class="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110">
                      {{ interest.icon }}
                    </div>
                    <span class="text-sm font-medium text-slate-700 text-center group-hover:text-purple-700 transition-colors">
                      {{ interest.label }}
                    </span>
                    <div v-if="form.interests.includes(interest.value)" class="absolute top-3 right-3">
                      <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </label>
                </div>
                <p class="text-xs text-slate-500 ml-1">Select your passions to receive personalized recommendations</p>
              </div>
              
              <!-- Budget Section -->
              <div class="space-y-6">
                <div class="border-l-4 border-emerald-500 pl-6">
                  <h2 class="text-xl font-semibold text-slate-900 mb-2">Budget Preference</h2>
                  <p class="text-slate-600 text-sm">How would you like to experience your destination?</p>
                </div>
                
                <div class="grid md:grid-cols-3 gap-6">
                  <label 
                    class="relative group flex flex-col p-6 bg-white border-2 border-slate-200 rounded-2xl cursor-pointer hover:border-emerald-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    :class="{ 
                      'border-emerald-400 shadow-lg bg-gradient-to-br from-emerald-50 to-green-50 ring-2 ring-emerald-100': form.budget === 'budget'
                    }"
                  >
                    <input 
                      type="radio" 
                      value="budget"
                      v-model="form.budget"
                      class="sr-only"
                    >
                    <div class="flex items-center justify-between mb-4">
                      <div class="flex items-center space-x-3">
                        <div class="text-2xl">💰</div>
                        <span class="font-semibold text-emerald-700">Budget</span>
                      </div>
                      <div v-if="form.budget === 'budget'" class="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div class="text-left">
                      <div class="text-lg font-bold text-slate-900 mb-2">$500 - $1,000</div>
                      <div class="text-sm text-slate-600 leading-relaxed">Smart travel with hostels, local food, and public transport</div>
                    </div>
                  </label>
                  
                  <label 
                    class="relative group flex flex-col p-6 bg-white border-2 border-slate-200 rounded-2xl cursor-pointer hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    :class="{ 
                      'border-blue-400 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 ring-2 ring-blue-100': form.budget === 'mid-range'
                    }"
                  >
                    <input 
                      type="radio" 
                      value="mid-range"
                      v-model="form.budget"
                      class="sr-only"
                    >
                    <div class="flex items-center justify-between mb-4">
                      <div class="flex items-center space-x-3">
                        <div class="text-2xl">🏨</div>
                        <span class="font-semibold text-blue-700">Mid-Range</span>
                      </div>
                      <div v-if="form.budget === 'mid-range'" class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div class="text-left">
                      <div class="text-lg font-bold text-slate-900 mb-2">$1,000 - $2,500</div>
                      <div class="text-sm text-slate-600 leading-relaxed">Comfortable hotels, great restaurants, and guided tours</div>
                    </div>
                  </label>
                  
                  <label 
                    class="relative group flex flex-col p-6 bg-white border-2 border-slate-200 rounded-2xl cursor-pointer hover:border-purple-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    :class="{ 
                      'border-purple-400 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 ring-2 ring-purple-100': form.budget === 'luxury'
                    }"
                  >
                    <input 
                      type="radio" 
                      value="luxury"
                      v-model="form.budget"
                      class="sr-only"
                    >
                    <div class="flex items-center justify-between mb-4">
                      <div class="flex items-center space-x-3">
                        <div class="text-2xl">✨</div>
                        <span class="font-semibold text-purple-700">Luxury</span>
                      </div>
                      <div v-if="form.budget === 'luxury'" class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div class="text-left">
                      <div class="text-lg font-bold text-slate-900 mb-2">$2,500+</div>
                      <div class="text-sm text-slate-600 leading-relaxed">Premium experiences, fine dining, and luxury accommodations</div>
                    </div>
                  </label>
                </div>
              </div>
              
              <!-- Travel Pace Section -->
              <div class="space-y-6">
                <div class="border-l-4 border-orange-500 pl-6">
                  <h2 class="text-xl font-semibold text-slate-900 mb-2">Travel Pace</h2>
                  <p class="text-slate-600 text-sm">How do you prefer to explore?</p>
                </div>
                
                <div class="grid md:grid-cols-3 gap-6">
                  <label 
                    class="relative group flex flex-col p-6 bg-white border-2 border-slate-200 rounded-2xl cursor-pointer hover:border-green-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    :class="{ 
                      'border-green-400 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 ring-2 ring-green-100': form.pace === 'relaxed'
                    }"
                  >
                    <input 
                      type="radio" 
                      value="relaxed"
                      v-model="form.pace"
                      class="sr-only"
                    >
                    <div class="flex items-center justify-between mb-4">
                      <div class="flex items-center space-x-3">
                        <div class="text-2xl">🌿</div>
                        <span class="font-semibold text-green-700">Relaxed</span>
                      </div>
                      <div v-if="form.pace === 'relaxed'" class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div class="text-left">
                      <div class="text-lg font-bold text-slate-900 mb-2">Take it easy</div>
                      <div class="text-sm text-slate-600 leading-relaxed">2-3 activities per day with plenty of downtime</div>
                    </div>
                  </label>
                  
                  <label 
                    class="relative group flex flex-col p-6 bg-white border-2 border-slate-200 rounded-2xl cursor-pointer hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    :class="{ 
                      'border-blue-400 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 ring-2 ring-blue-100': form.pace === 'moderate'
                    }"
                  >
                    <input 
                      type="radio" 
                      value="moderate"
                      v-model="form.pace"
                      class="sr-only"
                    >
                    <div class="flex items-center justify-between mb-4">
                      <div class="flex items-center space-x-3">
                        <div class="text-2xl">⚖️</div>
                        <span class="font-semibold text-blue-700">Moderate</span>
                      </div>
                      <div v-if="form.pace === 'moderate'" class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div class="text-left">
                      <div class="text-lg font-bold text-slate-900 mb-2">Balanced schedule</div>
                      <div class="text-sm text-slate-600 leading-relaxed">3-4 activities per day with good variety</div>
                    </div>
                  </label>
                  
                  <label 
                    class="relative group flex flex-col p-6 bg-white border-2 border-slate-200 rounded-2xl cursor-pointer hover:border-orange-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    :class="{ 
                      'border-orange-400 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 ring-2 ring-orange-100': form.pace === 'active'
                    }"
                  >
                    <input 
                      type="radio" 
                      value="active"
                      v-model="form.pace"
                      class="sr-only"
                    >
                    <div class="flex items-center justify-between mb-4">
                      <div class="flex items-center space-x-3">
                        <div class="text-2xl">⚡</div>
                        <span class="font-semibold text-orange-700">Active</span>
                      </div>
                      <div v-if="form.pace === 'active'" class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div class="text-left">
                      <div class="text-lg font-bold text-slate-900 mb-2">Pack it all in</div>
                      <div class="text-sm text-slate-600 leading-relaxed">4-5 activities per day for maximum adventure</div>
                    </div>
                  </label>
                </div>
              </div>
              
              <!-- Additional Notes -->
              <div class="space-y-6">
                <div class="border-l-4 border-slate-400 pl-6">
                  <h2 class="text-xl font-semibold text-slate-900 mb-2">Additional Notes</h2>
                  <p class="text-slate-600 text-sm">Anything else we should know?</p>
                </div>
                
                <div class="group">
                  <div class="relative">
                    <textarea 
                      v-model="form.notes"
                      rows="4"
                      class="w-full px-4 py-4 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-slate-300 resize-none"
                      placeholder="Share any special requirements, dietary restrictions, accessibility needs, or specific preferences that will help us create your perfect itinerary..."
                    ></textarea>
                    <div class="absolute bottom-4 right-4 pointer-events-none">
                      <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </div>
                  </div>
                  <p class="text-xs text-slate-500 mt-2 ml-1">Help us personalize your experience with any special details</p>
                </div>
              </div>
              
              <!-- Error Message -->
              <div v-if="error" class="bg-red-50 border border-red-200 rounded-xl p-4">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <p class="text-red-800 text-sm font-medium">{{ error }}</p>
                </div>
              </div>
              
              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-4 pt-8">
                <button 
                  type="button"
                  @click="generateWithAI"
                  :disabled="loading || !isFormValid"
                  class="flex-1 group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-5 px-8 rounded-2xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="relative flex items-center justify-center space-x-3">
                    <div v-if="loading" class="animate-spin">
                      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                    <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span class="text-lg">{{ loading ? 'Crafting Your Perfect Journey...' : 'Generate with AI Magic' }}</span>
                  </div>
                </button>
                
                <button 
                  type="submit"
                  :disabled="!isFormValid"
                  class="flex-1 group relative overflow-hidden bg-slate-800 text-white py-5 px-8 rounded-2xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div class="absolute inset-0 bg-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="relative flex items-center justify-center space-x-3">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <span class="text-lg">Create Manual Trip</span>
                  </div>
                </button>
              </div>
            </form>
          </div>
          
          <!-- Tips Section -->
          <div class="border-t border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 p-8">
            <div class="flex items-start space-x-6">
              <div class="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-slate-900 mb-4">Expert Tips</h3>
                <div class="grid md:grid-cols-2 gap-6">
                  <div class="flex items-start space-x-3">
                    <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 class="font-medium text-slate-900 mb-1">AI Generation</h4>
                      <p class="text-sm text-slate-600 leading-relaxed">Get a complete, personalized itinerary crafted by our intelligent travel assistant</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <div class="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 class="font-medium text-slate-900 mb-1">Manual Creation</h4>
                      <p class="text-sm text-slate-600 leading-relaxed">Start with a clean template and build your adventure from scratch</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <div class="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 class="font-medium text-slate-900 mb-1">Full Flexibility</h4>
                      <p class="text-sm text-slate-600 leading-relaxed">Edit, customize, and perfect any itinerary to match your exact preferences</p>
                    </div>
                  </div>
                  <div class="flex items-start space-x-3">
                    <div class="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 class="font-medium text-slate-900 mb-1">24/7 Support</h4>
                      <p class="text-sm text-slate-600 leading-relaxed">Our AI travel assistant is always ready to help with recommendations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
      try {
        console.log('Generating AI itinerary with:', this.form)
        
        const response = await fetch(`${API_BASE_URL}/api/generate-itinerary`, {
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
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aventra-backend.onrender.com'
      try {
        const itinerary = {
          ...this.form,
          days: this.generateEmptyDays()
        }
        
        console.log('Creating manual itinerary:', itinerary)
        
        const response = await fetch(`${API_BASE_URL}/api/itineraries`, {
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
/* Custom scroll behavior for smooth interactions */
html {
  scroll-behavior: smooth;
}

/* Enhanced focus states */
input:focus,
textarea:focus,
select:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

/* Smooth transitions for all interactive elements */
.group:hover input,
.group:hover textarea {
  transform: translateY(-1px);
}

/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out;
}

/* Glass morphism effect */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* Enhanced shadows for depth */
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Subtle gradient overlays */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}
</style>