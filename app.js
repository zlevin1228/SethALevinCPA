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

(function () {
  "use strict";
  /*
   * Form Validation
   */

  // Fetch all the forms we want to apply custom validation styles to
  const forms = document.querySelectorAll(".needs-validation");
  const result = document.getElementById("result");
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();

          form.querySelectorAll(":invalid")[0].focus();
        } else {
          /*
           * Form Submission using fetch()
           */

          const formData = new FormData(form);
          event.preventDefault();
          event.stopPropagation();
          const object = {};
          formData.forEach((value, key) => {
            object[key] = value;
          });
          const json = JSON.stringify(object);
          result.innerHTML = "Please wait...";

          fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: json
          })
            .then(async (response) => {
              let json = await response.json();
              if (response.status == 200) {
                result.innerHTML = json.message;
                result.classList.remove("text-gray-500");
                result.classList.add("text-green-500");
              } else {
                console.log(response);
                result.innerHTML = json.message;
                result.classList.remove("text-gray-500");
                result.classList.add("text-red-500");
              }
            })
            .catch((error) => {
              console.log(error);
              result.innerHTML = "Something went wrong!";
            })
            .then(function () {
              form.reset();
              form.classList.remove("was-validated");
              setTimeout(() => {
                result.style.display = "none";
              }, 5000);
            });
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();
