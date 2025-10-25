emailjs.init("leitgG7E42UnSN-10"); // replace with your key

const form = document.getElementById('contact-form');
const message = document.getElementById('form-message'); // the <p> for feedback

form.addEventListener('submit', function(e){
  e.preventDefault(); // prevent page reload

  emailjs.sendForm('service_8x6ek6e', 'template_3ulh0ks', this)
    .then(() => {
      // Show thank you message
      message.textContent = "Thank you!";
      message.classList.add('show');

      // Clear the form
      form.reset();

      // Optional: hide message after 3 seconds
      setTimeout(() => {
        message.classList.remove('show');
        message.textContent = "";
      }, 3000);

    }, (err) => {
      // Show error message
      message.textContent = "Oops, something went wrong. Try again.";
      message.classList.add('show');
      console.error(err);
    });
});
