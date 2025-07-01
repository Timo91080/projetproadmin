import axios from 'axios';

async function testAdminDashboard() {
  try {
    console.log('🔐 Testing admin dashboard authentication...');
    
    const API_URL = 'http://localhost:3002/api';
    
    // Test admin login
    console.log('\n📝 Testing admin login...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: 'admin@gamezone.com',
      password: 'admin123'
    });
    
    console.log('✅ Admin login successful!');
    console.log('👤 Admin:', loginResponse.data.admin);
    console.log('🎫 Token:', loginResponse.data.token ? 'Generated' : 'Missing');
    
    const token = loginResponse.data.token;
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    
    // Test admin routes
    console.log('\n📊 Testing dashboard stats...');
    const statsResponse = await axios.get(`${API_URL}/dashboard/stats`, { headers });
    console.log('✅ Dashboard stats accessible:', statsResponse.data);
    
    console.log('\n👥 Testing clients route...');
    const clientsResponse = await axios.get(`${API_URL}/clients`, { headers });
    console.log('✅ Clients route accessible, found', clientsResponse.data.length, 'clients');
    
    console.log('\n🖥️ Testing stations route...');
    const stationsResponse = await axios.get(`${API_URL}/stations`, { headers });
    console.log('✅ Stations route accessible, found', stationsResponse.data.length, 'stations');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testAdminDashboard();
