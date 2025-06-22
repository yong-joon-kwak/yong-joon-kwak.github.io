<template>
  <div class="home">
    <div class="hero">
      <h1>개발자 블로그에 오신 것을 환영합니다</h1>
      <p>기술과 개발에 대한 생각을 나누는 공간입니다</p>
    </div>
    
    <div class="featured-posts">
      <h2>최근 포스트</h2>
      <div class="posts-grid">
        <div class="post-card" v-for="post in featuredPosts" :key="post.id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.excerpt }}</p>
          <span class="post-date">{{ post.date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Post {
  id: number
  title: string
  excerpt: string
  date: string
}

const featuredPosts: Post[] = [
  {
    id: 1,
    title: "Vue3 Composition API 완벽 가이드",
    excerpt: "Vue3의 새로운 Composition API를 활용한 컴포넌트 개발 방법을 알아봅니다.",
    date: "2024-01-15"
  },
  {
    id: 2,
    title: "TypeScript와 함께하는 안전한 개발",
    excerpt: "TypeScript를 활용하여 더 안전하고 유지보수하기 쉬운 코드를 작성하는 방법을 소개합니다.",
    date: "2024-01-10"
  },
  {
    id: 3,
    title: "Vite로 빠른 개발 환경 구축하기",
    excerpt: "Vite를 사용하여 빠르고 효율적인 개발 환경을 구축하는 방법을 다룹니다.",
    date: "2024-01-05"
  }
]
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.featured-posts h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.post-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.post-card:hover {
  transform: translateY(-4px);
}

.post-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.post-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.post-date {
  color: #999;
  font-size: 0.9rem;
}
</style> 