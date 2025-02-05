document.addEventListener('DOMContentLoaded', function () {
  const sizeButtons = document.querySelectorAll('.size-button');
  const selectedSizeText = document.getElementById('selected-size');

  sizeButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Remove active class from all buttons
      sizeButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to the clicked button
      this.classList.add('active');

      // Update the selected size text
      selectedSizeText.textContent = `Selected Size: ${this.getAttribute('data-size')}`;
    });
  });
});