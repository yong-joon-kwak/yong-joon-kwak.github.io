<template>
  <div class="blog">
    <h1>블로그</h1>
    
    <div class="blog-filters">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="포스트 검색..." 
        class="search-input"
      />
      <select v-model="selectedCategory" class="category-select">
        <option value="">모든 카테고리</option>
        <option value="vue">Vue.js</option>
        <option value="typescript">TypeScript</option>
        <option value="vite">Vite</option>
        <option value="frontend">프론트엔드</option>
      </select>
    </div>
    
    <div class="posts-list">
      <article 
        v-for="post in filteredPosts" 
        :key="post.id" 
        class="post-item"
      >
        <h2>{{ post.title }}</h2>
        <div class="post-meta">
          <span class="post-date">{{ post.date }}</span>
          <span class="post-category">{{ post.category }}</span>
        </div>
        <p>{{ post.excerpt }}</p>
        <button class="read-more-btn">더 보기</button>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  content: string
}

const searchQuery = ref('')
const selectedCategory = ref('')

const posts: BlogPost[] = [
  {
    id: 1,
    title: "Vue3 Composition API 완벽 가이드",
    excerpt: "Vue3의 새로운 Composition API를 활용한 컴포넌트 개발 방법을 알아봅니다. Options API와의 차이점과 실제 사용 사례를 통해 Composition API의 장점을 살펴보겠습니다.",
    date: "2024-01-15",
    category: "vue",
    content: "전체 내용..."
  },
  {
    id: 2,
    title: "TypeScript와 함께하는 안전한 개발",
    excerpt: "TypeScript를 활용하여 더 안전하고 유지보수하기 쉬운 코드를 작성하는 방법을 소개합니다. 타입 정의부터 고급 기능까지 실무에서 활용할 수 있는 팁들을 제공합니다.",
    date: "2024-01-10",
    category: "typescript",
    content: "전체 내용..."
  },
  {
    id: 3,
    title: "Vite로 빠른 개발 환경 구축하기",
    excerpt: "Vite를 사용하여 빠르고 효율적인 개발 환경을 구축하는 방법을 다룹니다. Webpack과의 비교를 통해 Vite의 장점을 확인해보세요.",
    date: "2024-01-05",
    category: "vite",
    content: "전체 내용..."
  },
  {
    id: 4,
    title: "모던 프론트엔드 개발 트렌드 2024",
    excerpt: "2024년 프론트엔드 개발 트렌드를 정리해봅니다. 새로운 기술과 도구들, 그리고 개발자들이 주목해야 할 변화들을 살펴보겠습니다.",
    date: "2024-01-01",
    category: "frontend",
    content: "전체 내용..."
  }
]

const filteredPosts = computed(() => {
  return posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = !selectedCategory.value || post.category === selectedCategory.value
    
    return matchesSearch && matchesCategory
  })
})
</script>

<style scoped>
.blog {
  max-width: 800px;
  margin: 0 auto;
}

.blog h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

.blog-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.search-input,
.category-select {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.search-input {
  flex: 1;
}

.category-select {
  min-width: 150px;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.post-item {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #667eea;
}

.post-item h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.post-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.post-date {
  color: #666;
}

.post-category {
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

.post-item p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.read-more-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.read-more-btn:hover {
  background: #5a6fd8;
}
</style> 