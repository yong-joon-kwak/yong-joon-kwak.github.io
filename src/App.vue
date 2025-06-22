<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="nav-brand">Dev Blog</router-link>
        <div class="nav-links">
          <router-link to="/" class="nav-link">홈</router-link>
          <router-link to="/blog" class="nav-link">블로그</router-link>
          <router-link to="/about" class="nav-link">소개</router-link>
        </div>
      </div>
    </nav>
    
    <main class="main-content">
      <router-view />
    </main>
    
    <footer class="footer">
      <p>&copy; 2024 Dev Blog. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 컴포넌트 로직이 필요하면 여기에 작성
</script>

<style scoped>
.navbar {
  background-color: #2c3e50;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #34495e;
}

.main-content {
  min-height: calc(100vh - 140px);
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.footer {
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 1rem 0;
  margin-top: auto;
}
</style> 