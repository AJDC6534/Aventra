<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        
        <!-- Enhanced Header -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4">
            <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-slate-900 mb-2">AI Travel Assistant</h1>
          <p class="text-slate-600 text-lg">Your intelligent companion for perfect travel planning</p>
        </div>
        
        <!-- Main Chat Interface -->
        <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden h-[70vh] flex flex-col">
          
          <!-- Chat Header -->
          <div class="px-8 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h2 class="text-xl font-semibold">Travel Expert</h2>
                  <p class="text-white/80 text-sm">Ready to help plan your perfect journey</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span class="text-sm text-white/80">Online</span>
              </div>
            </div>
          </div>
          
          <!-- Messages Container -->
          <div class="flex-1 overflow-y-auto p-6 space-y-6 chat-container" ref="chatContainer">
            
            <!-- Welcome Message -->
            <div v-if="messages.length === 0" class="text-center py-12">
              <div class="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-slate-900 mb-3">Welcome to Your AI Travel Assistant!</h3>
              <p class="text-slate-600 max-w-md mx-auto leading-relaxed">
                I'm here to help you discover amazing destinations, plan perfect itineraries, and answer all your travel questions. 
                What would you like to explore today?
              </p>
            </div>
            
            <!-- Chat Messages -->
            <div 
              v-for="(message, index) in messages" 
              :key="index"
              :class="['flex', message.role === 'user' ? 'justify-end' : 'justify-start']"
            >
              <div class="flex items-end space-x-2 max-w-2xl">
                
                <!-- Assistant Avatar -->
                <div v-if="message.role === 'assistant'" class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mb-1">
                  <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                
                <!-- Message Bubble -->
                <div 
                  :class="[
                    'px-6 py-4 rounded-2xl shadow-sm',
                    message.role === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md' 
                      : 'bg-white border border-slate-200 text-slate-900 rounded-bl-md'
                  ]"
                >
                  <!-- Assistant Message with Markdown -->
                  <div 
                    v-if="message.role === 'assistant'"
                    v-html="renderMarkdown(message.content)"
                    class="prose prose-sm max-w-none text-slate-700 leading-relaxed"
                  ></div>
                  
                  <!-- User Message -->
                  <p v-else class="leading-relaxed">{{ message.content }}</p>
                  
                  <!-- Timestamp -->
                  <p class="text-xs mt-2 opacity-60">
                    {{ formatTime(message.timestamp) }}
                  </p>
                </div>
                
                <!-- User Avatar -->
                <div v-if="message.role === 'user'" class="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center flex-shrink-0 mb-1">
                  <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <!-- Loading State -->
            <div v-if="loading" class="flex justify-start">
              <div class="flex items-end space-x-2">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mb-1">
                  <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div class="bg-white border border-slate-200 px-6 py-4 rounded-2xl rounded-bl-md shadow-sm">
                  <div class="flex items-center space-x-3">
                    <div class="flex space-x-1">
                      <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div class="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                      <div class="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                    </div>
                    <span class="text-sm text-slate-600">AI is crafting your response...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Input Area -->
          <div class="px-6 py-4 bg-slate-50/50 border-t border-slate-200">
            <form @submit.prevent="sendMessage" class="flex items-center space-x-4">
              <div class="flex-1 relative">
                <input 
                  v-model="currentMessage"
                  type="text" 
                  placeholder="Ask about destinations, activities, or travel tips..."
                  class="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 hover:border-slate-300"
                  :disabled="loading"
                >
                <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>
              <button 
                type="submit" 
                :disabled="loading || !currentMessage.trim()"
                class="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="relative flex items-center space-x-2">
                  <span>Send</span>
                  <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
              </button>
            </form>
          </div>
        </div>
        
        <!-- Enhanced Suggestions -->
        <div class="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-2xl p-6">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-900">Try these popular questions</h3>
              <p class="text-sm text-slate-600">Click any suggestion to get started</p>
            </div>
          </div>
          
          <div class="grid md:grid-cols-2 gap-3">
            <button 
              v-for="(suggestion, index) in suggestions" 
              :key="index"
              @click="currentMessage = suggestion"
              class="group text-left p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 hover:border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div class="flex items-center space-x-3">
                <div class="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <span class="text-sm text-slate-700 group-hover:text-blue-600 transition-colors">{{ suggestion }}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import markdown parser
import { marked } from 'marked'

export default {
  name: 'Chatbot',
  data() {
    return {
      messages: [],
      currentMessage: '',
      loading: false,
      suggestions: [
        "What are the best attractions in Paris?",
        "Suggest a 3-day itinerary for Tokyo",
        "What's the best time to visit Italy?",
        "Recommend budget-friendly activities in New York",
        "What should I pack for a trip to Thailand?",
        "How much should I budget for a week in London?",
        "Best local food experiences in Barcelona",
        "Hidden gems in Amsterdam to visit"
      ]
    }
  },
  async mounted() {
    await this.loadChatHistory()
  },
  methods: {
    // Enhanced markdown rendering method
    renderMarkdown(content) {
      // Configure marked for safe rendering
      marked.setOptions({
        breaks: true, // Convert line breaks to <br>
        gfm: true, // GitHub flavored markdown
        sanitize: false, // Allow HTML but be careful with user input
        smartLists: true,
        smartypants: true
      })
      
      return marked(content)
    },
    
    async loadChatHistory() {
      try {
        const itineraryId = this.$route.params.itineraryId || ''
        const response = await fetch(`https://aventra-backend.onrender.com/api/chat-history/${itineraryId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        
        if (response.ok) {
          this.messages = await response.json()
          this.scrollToBottom()
        }
      } catch (error) {
        console.error('Error loading chat history:', error)
      }
    },
    
    async sendMessage() {
      if (!this.currentMessage.trim()) return
      
      const message = this.currentMessage.trim()
      this.currentMessage = ''
      
      // Add user message
      this.messages.push({
        role: 'user',
        content: message,
        timestamp: new Date()
      })
      
      this.loading = true
      this.scrollToBottom()
      
      try {
        const response = await fetch('https://aventra-backend.onrender.com/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            message,
            itineraryId: this.$route.params.itineraryId
          })
        })
        
        const data = await response.json()
        
        // Add AI response
        this.messages.push({
          role: 'assistant',
          content: data.response,
          timestamp: new Date()
        })
        
      } catch (error) {
        console.error('Error sending message:', error)
        this.messages.push({
          role: 'assistant',
          content: 'I apologize, but I encountered an error. Please try asking your question again, and I\'ll be happy to help!',
          timestamp: new Date()
        })
      } finally {
        this.loading = false
        this.scrollToBottom()
      }
    },
    
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.chatContainer
        if (container) {
          container.scrollTop = container.scrollHeight
        }
      })
    },
    
    formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString([], {
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
      })
    }
  }
}
</script>

<style scoped>
/* Enhanced markdown content styling */
.prose {
  color: #475569;
  line-height: 1.7;
}

.prose h1, .prose h2, .prose h3 {
  font-weight: 600;
  margin-top: 1.5em;
  margin-bottom: 0.75em;
  color: #1e293b;
}

.prose h1 { 
  font-size: 1.25em;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5em;
}

.prose h2 { 
  font-size: 1.15em;
  color: #334155;
}

.prose h3 { 
  font-size: 1.05em;
  color: #475569;
}

.prose strong {
  font-weight: 600;
  color: #1e293b;
}

.prose em {
  font-style: italic;
  color: #64748b;
}

.prose ul, .prose ol {
  margin: 1em 0;
  padding-left: 2em;
}

.prose ul {
  list-style-type: disc;
}

.prose ol {
  list-style-type: decimal;
}

.prose li {
  margin: 0.5em 0;
  line-height: 1.6;
}

.prose li::marker {
  color: #3b82f6;
}

.prose p {
  margin: 1em 0;
}

.prose p:first-child {
  margin-top: 0;
}

.prose p:last-child {
  margin-bottom: 0;
}

.prose code {
  background-color: #f1f5f9;
  color: #0f172a;
  padding: 0.125em 0.375em;
  border-radius: 0.375em;
  font-size: 0.875em;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
}

.prose pre {
  background-color: #0f172a;
  color: #f8fafc;
  padding: 1em;
  border-radius: 0.5em;
  overflow-x: auto;
  margin: 1em 0;
}

.prose pre code {
  background-color: transparent;
  color: inherit;
  padding: 0;
}

.prose blockquote {
  border-left: 4px solid #3b82f6;
  padding-left: 1em;
  margin: 1em 0;
  font-style: italic;
  color: #64748b;
}

.prose a {
  color: #3b82f6;
  text-decoration: underline;
  font-weight: 500;
}

.prose a:hover {
  color: #1d4ed8;
}

/* Enhanced chat container styling */
.chat-container {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;
}

.chat-container::-webkit-scrollbar {
  width: 8px;
}

.chat-container::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.chat-container::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.chat-container::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Smooth animations */
.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translateY(0);
  }
  40%, 43% {
    transform: translateY(-8px);
  }
  70% {
    transform: translateY(-4px);
  }
  90% {
    transform: translateY(-2px);
  }
}

/* Enhanced focus states */
input:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

/* Glass morphism effects */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* Enhanced hover effects */
.group:hover {
  transform: translateY(-2px);
}

/* Message animations */
.messages-enter-active, .messages-leave-active {
  transition: all 0.3s ease;
}

.messages-enter-from, .messages-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>