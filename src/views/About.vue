<template>
  <div class="about">
    <div class="about-header">
      <h1>소개</h1>
      <p>개발자로서의 여정과 이 블로그에 대해 소개합니다</p>
    </div>
    
    <div class="about-content">
      <section class="about-section">
        <h2>안녕하세요! 👋</h2>
        <p>
          저는 프론트엔드 개발에 열정을 가진 개발자입니다. 
          Vue.js, TypeScript, 그리고 최신 웹 기술들을 활용하여 
          사용자 경험을 향상시키는 애플리케이션을 개발하고 있습니다.
        </p>
      </section>
      
      <section class="about-section">
        <h2>기술 스택</h2>
        <div class="skills-grid">
          <div class="skill-item" v-for="skill in skills" :key="skill.name">
            <h3>{{ skill.name }}</h3>
            <p>{{ skill.description }}</p>
            <div class="skill-level">
              <div class="skill-bar" :style="{ width: skill.level + '%' }"></div>
            </div>
          </div>
        </div>
      </section>
      
      <section class="about-section">
        <h2>이 블로그에 대하여</h2>
        <p>
          이 블로그는 제가 개발 과정에서 배운 것들을 정리하고 공유하는 공간입니다. 
          Vue3, TypeScript, Vite 등 최신 기술들을 활용한 개발 경험과 
          실무에서 얻은 인사이트들을 담아내고 있습니다.
        </p>
        <p>
          개발자 커뮤니티와 함께 성장하고, 지식을 나누며 
          더 나은 개발 문화를 만들어가고 싶습니다.
        </p>
      </section>
      
      <section class="about-section">
        <h2>연락처</h2>
        <div class="contact-info">
          <div class="contact-item">
            <strong>이메일:</strong> 
            <a href="mailto:dev@example.com">dev@example.com</a>
          </div>
          <div class="contact-item">
            <strong>GitHub:</strong> 
            <a href="https://github.com/yourusername" target="_blank">github.com/yourusername</a>
          </div>
          <div class="contact-item">
            <strong>LinkedIn:</strong> 
            <a href="https://linkedin.com/in/yourusername" target="_blank">linkedin.com/in/yourusername</a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Skill {
  name: string
  description: string
  level: number
}

const skills: Skill[] = [
  {
    name: "Vue.js",
    description: "Vue3 Composition API, Vuex, Vue Router",
    level: 90
  },
  {
    name: "TypeScript",
    description: "타입 안전성과 개발 생산성 향상",
    level: 85
  },
  {
    name: "JavaScript",
    description: "ES6+, 모던 JavaScript 패턴",
    level: 95
  },
  {
    name: "CSS/SCSS",
    description: "반응형 디자인, CSS Grid, Flexbox",
    level: 80
  },
  {
    name: "Node.js",
    description: "서버 사이드 개발, Express.js",
    level: 70
  },
  {
    name: "Git",
    description: "버전 관리, 협업 워크플로우",
    level: 85
  }
]
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
}

.about-header {
  text-align: center;
  padding: 3rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 3rem;
}

.about-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.about-header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.about-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.about-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.about-section p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.skill-item {
  padding: 1.5rem;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fafafa;
}

.skill-item h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.skill-item p {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.skill-level {
  height: 8px;
  background: #eee;
  border-radius: 4px;
  overflow: hidden;
}

.skill-bar {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.contact-item strong {
  color: #2c3e50;
  min-width: 80px;
}

.contact-item a {
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s;
}

.contact-item a:hover {
  color: #5a6fd8;
  text-decoration: underline;
}
</style> 