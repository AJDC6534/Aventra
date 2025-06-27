import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Dashboard from '../components/Dashboard.vue';
import Profile from '../components/Profile.vue';
import CreateTrip from '../components/CreateTrip.vue';
import ItineraryView from '../components/ItineraryView.vue';
import Chatbot from '../components/Chatbot.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/create-trip', name: 'CreateTrip', component: CreateTrip },
  { path: '/itinerary', name: 'ItineraryView', component: ItineraryView },
  { path: '/chat', name: 'Chatbot', component: Chatbot },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
