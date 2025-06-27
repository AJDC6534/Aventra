<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow h-screen flex flex-col">
        <div class="px-6 py-4 border-b bg-blue-600 text-white rounded-t-lg">
          <h2 class="text-xl font-semibold">AI Travel Assistant</h2>
          <p class="text-blue-100 text-sm">Ask me anything about your travel plans!</p>
        </div>
        
        <div class="flex-1 overflow-y-auto p-6 space-y-4 chat-container" ref="chatContainer">
          <div v-if="messages.length === 0" class="text-center text-gray-500 mt-8">
            <div class="text-4xl mb-4">🤖</div>
            <p>Hello! I'm your AI travel assistant. How can I help you plan your trip?</p>
          </div>
          
          <div 
            v-for="(message, index) in messages" 
            :key="index"
            :class="['flex', message.role === 'user' ? 'justify-end' : 'justify-start']"
          >
            <div 
              :class="[
                'max-w-xs lg:max-w-md px-4 py-2 rounded-lg',
                message.role === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-900'
              ]"
            >
              <!-- FIXED: Render markdown as HTML for assistant messages -->
              <div 
                v-if="message.role === 'assistant'"
                v-html="renderMarkdown(message.content)"
                class="text-sm prose prose-sm max-w-none"
              ></div>
              <!-- Keep plain text for user messages -->
              <p v-else class="text-sm">{{ message.content }}</p>
              
              <p class="text-xs opacity-70 mt-1">
                {{ formatTime(message.timestamp) }}
              </p>
            </div>
          </div>
          
          <div v-if="loading" class="flex justify-start">
            <div class="bg-gray-200 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
              <div class="flex items-center space-x-2">
                <div class="flex space-x-1">
                  <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                  <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
                <span class="text-sm">AI is thinking...</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="px-6 py-4 border-t">
          <form @submit.prevent="sendMessage" class="flex space-x-3">
            <input 
              v-model="currentMessage"
              type="text" 
              placeholder="Ask about destinations, activities, or travel tips..."
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              :disabled="loading"
            >
            <button 
              type="submit" 
              :disabled="loading || !currentMessage.trim()"
              class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      </div>
      
      <div class="mt-6 bg-blue-50 rounded-lg p-4">
        <h3 class="font-semibold text-blue-900 mb-2">💡 Try asking:</h3>
        <div class="grid md:grid-cols-2 gap-2 text-sm">
          <button 
            v-for="suggestion in suggestions" 
            :key="suggestion"
            @click="currentMessage = suggestion"
            class="text-left p-2 bg-white rounded border hover:bg-gray-50"
          >
            {{ suggestion }}
          </button>
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
        "How much should I budget for a week in London?"
      ]
    }
  },
  async mounted() {
    await this.loadChatHistory()
  },
  methods: {
    // NEW: Markdown rendering method
    renderMarkdown(content) {
      // Configure marked for safe rendering
      marked.setOptions({
        breaks: true, // Convert line breaks to <br>
        gfm: true, // GitHub flavored markdown
      })
      
      return marked(content)
    },
    
    async loadChatHistory() {
      try {
        const itineraryId = this.$route.params.itineraryId || ''
        const response = await fetch(`http://localhost:5000/api/chat-history/${itineraryId}`, {
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
        const response = await fetch('http://localhost:5000/api/chat', {
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
          content: 'Sorry, I encountered an error. Please try again.',
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
      return new Date(timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }
  }
}
</script>

<style>
/* Enhanced styling for markdown content */
.prose {
  line-height: 1.6;
}

.prose h1, .prose h2, .prose h3 {
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 0.5em;
}

.prose h1 { font-size: 1.2em; }
.prose h2 { font-size: 1.1em; }
.prose h3 { font-size: 1em; }

.prose strong {
  font-weight: bold;
}

.prose em {
  font-style: italic;
}

.prose ul, .prose ol {
  margin: 0.5em 0;
  padding-left: 1.5em;
}

.prose li {
  margin: 0.25em 0;
}

.prose p {
  margin: 0.5em 0;
}

.prose code {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0.125em 0.25em;
  border-radius: 0.25em;
  font-size: 0.875em;
}

/* Chat container styling */
.chat-container::-webkit-scrollbar {
  width: 6px;
}

.chat-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.chat-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.chat-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>