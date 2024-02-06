// Function to prevent default scrolling behavior on the body without affecting modal scrolling
function preventBodyScroll(e) {
  // Check if the target of the touchmove event is within the modal
  if (!e.target.closest('.pricing-modal-wrapper')) {
    e.preventDefault();
  }
}

// Function to enable or disable body scrolling
  function toggleBodyScrolling(isEnabled) {
  if (isEnabled) {
    // Re-enable body scrolling
    document.body.classList.remove('overflow-lock');
    window.removeEventListener('touchmove', preventBodyScroll, { passive: false });
  } else {
    // Disable body scrolling
    document.body.classList.add('overflow-lock');
    window.addEventListener('touchmove', preventBodyScroll, { passive: false });
  }
}

// Function to update scroll locking based on modal visibility
function updateBodyScrollLockBasedOnModalVisibility() {
  const modalWrapper = document.querySelector('.pricing-modal-wrapper');
  if (!modalWrapper) return; // Exit if the modal isn't found

  const isVisible = getComputedStyle(modalWrapper).display !== 'none';
  toggleBodyScrolling(!isVisible); // Pass true to enable scrolling, false to disable
}

document.addEventListener('DOMContentLoaded', () => {
  const modalWrapper = document.querySelector('.pricing-modal-wrapper');
  
  if (modalWrapper) {
    const observer = new MutationObserver(() => {
      updateBodyScrollLockBasedOnModalVisibility();
    });

    observer.observe(modalWrapper, {
      attributes: true, // Monitor changes to attributes
      attributeFilter: ['style'] // Specifically for style changes
    });

    // Perform an initial check
    updateBodyScrollLockBasedOnModalVisibility();
  }
});