<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 bg-gray-50">
        <div class="absolute inset-0 bg-white/40"></div>
        <svg class="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgb(229, 231, 235)" stroke-width="1" opacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div class="relative pt-16 pb-32 sm:pt-24 sm:pb-40 lg:pt-32 lg:pb-48">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <!-- Logo/Brand -->
            <div class="flex justify-center mb-8">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h1 class="text-4xl font-bold tracking-tight text-gray-900">AvenTra</h1>
              </div>
            </div>

            <!-- Main Headline -->
            <h2 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl mb-6">
              Plan Your Perfect
              <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Travel Experience
              </span>
            </h2>

            <!-- Subheadline -->
            <p class="mx-auto max-w-2xl text-lg text-gray-600 sm:text-xl lg:text-2xl mb-12 leading-relaxed">
              AI-powered travel planning that creates personalized itineraries, ensures your safety, and adapts to your preferences in real-time.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <router-link 
                to="/register" 
                class="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white text-lg font-semibold rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                Get Started Free
              </router-link>
              <router-link 
                to="/login" 
                class="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 text-lg font-semibold rounded-xl hover:border-gray-900 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign In
              </router-link>
            </div>

            <!-- Trust Indicators -->
            <div class="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-500">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>Free to start</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <span>Setup in minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-24 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-20">
          <h3 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Why Choose AvenTra?
          </h3>
          <p class="mx-auto max-w-2xl text-lg text-gray-600">
            Experience the future of travel planning with our intelligent platform designed for modern travelers.
          </p>
        </div>

        <!-- Features Grid -->
        <div class="grid md:grid-cols-3 gap-8 lg:gap-12">
          <!-- Feature 1 -->
          <div class="relative group">
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300 group-hover:-translate-y-1">
              <div class="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors duration-300">
                <svg class="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 class="text-xl font-semibold text-gray-900 mb-3">AI-Powered Planning</h4>
              <p class="text-gray-600 leading-relaxed">
                Get personalized itineraries generated by advanced AI based on your preferences, budget, and travel style.
              </p>
              <div class="mt-6 flex items-center text-sm text-blue-600 font-medium">
                <span>Learn more</span>
                <svg class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Feature 2 -->
          <div class="relative group">
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300 group-hover:-translate-y-1">
              <div class="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors duration-300">
                <svg class="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 class="text-xl font-semibold text-gray-900 mb-3">Real-time Updates</h4>
              <p class="text-gray-600 leading-relaxed">
                Stay informed with live location data, weather updates, and dynamic recommendations that adapt to changing conditions.
              </p>
              <div class="mt-6 flex items-center text-sm text-emerald-600 font-medium">
                <span>Learn more</span>
                <svg class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Feature 3 -->
          <div class="relative group">
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300 group-hover:-translate-y-1">
              <div class="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-100 transition-colors duration-300">
                <svg class="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 class="text-xl font-semibold text-gray-900 mb-3">Safety First</h4>
              <p class="text-gray-600 leading-relaxed">
                Emergency contacts, location sharing, and safety alerts ensure peace of mind for you and your loved ones.
              </p>
              <div class="mt-6 flex items-center text-sm text-purple-600 font-medium">
                <span>Learn more</span>
                <svg class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Secondary Features Section -->
    <div class="py-24 bg-gray-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <!-- Content -->
          <div>
            <h3 class="text-3xl font-bold tracking-tight text-gray-900 mb-6">
              Travel Planning Made Simple
            </h3>
            <p class="text-lg text-gray-600 mb-8 leading-relaxed">
              From initial inspiration to booking confirmations, AvenTra streamlines your entire travel planning process. Our intelligent platform learns from your preferences and creates experiences tailored just for you.
            </p>
            
            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 mb-1">Personalized Recommendations</h4>
                  <p class="text-gray-600">AI analyzes your travel history and preferences to suggest perfect destinations and activities.</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <div class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 mb-1">Collaborative Planning</h4>
                  <p class="text-gray-600">Share itineraries with travel companions and plan together in real-time.</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 mb-1">Smart Budget Management</h4>
                  <p class="text-gray-600">Track expenses, set budgets, and get cost-effective alternatives automatically.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Visual -->
          <div class="relative">
            <div class="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-2xl">
              <div class="h-full w-full bg-white rounded-2xl shadow-lg p-6 flex items-center justify-center">
                <div class="text-center">
                  <div class="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900 mb-2">Ready to explore?</h4>
                  <p class="text-gray-600 text-sm">Join thousands of travelers planning their perfect trips</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Final CTA Section -->
    <div class="py-24 bg-white">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h3 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
          Start Planning Your Next Adventure
        </h3>
        <p class="text-lg text-gray-600 mb-10 leading-relaxed">
          Join thousands of travelers who trust AvenTra to create unforgettable experiences. 
          Your perfect trip is just a few clicks away.
        </p>
        <router-link 
          to="/register" 
          class="inline-flex items-center gap-2 px-10 py-4 bg-gray-900 text-white text-lg font-semibold rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Get Started for Free
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>