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

 // When the user clicks on the button, scroll to the top of the document
 function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}