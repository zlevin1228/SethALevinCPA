const { createApp } = Vue;

createApp({
  data() {
    return {
      infoItems: [],
      currentIndex: 0
    };
  },
  mounted() {
    fetch('info.json')
      .then(response => response.json())
      .then(data => {
        this.infoItems = data;
        this.autoRotate();
      });
  },
  methods: {
    autoRotate() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.infoItems.length;
      }, 5000); // every 5 seconds
    }
  }
}).mount('#app');