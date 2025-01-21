// a11y-checker.js

// Function to check if images have alt attributes
function checkImageAltText() {
    const images = document.querySelectorAll('img');
    const missingAlt = [];
  
    images.forEach((img, index) => {
      if (!img.hasAttribute('alt') || img.getAttribute('alt').trim() === '') {
        missingAlt.push(`Image at index ${index} is missing an alt attribute`);
      }
    });
  
    return missingAlt;
  }
  
  // Function to check if interactive elements (buttons, links) have aria-label attributes
  function checkAriaLabels() {
    const interactiveElements = document.querySelectorAll('button, a');
    const missingAriaLabels = [];
  
    interactiveElements.forEach((el, index) => {
      if (!el.hasAttribute('aria-label') || el.getAttribute('aria-label').trim() === '') {
        missingAriaLabels.push(`Interactive element at index ${index} is missing an aria-label attribute`);
      }
    });
  
    return missingAriaLabels;
  }
  
  // Function to check for low color contrast between text and background
  function checkColorContrast() {
    const elements = document.querySelectorAll('*');
    const lowContrastElements = [];
    const isDarkColor = (color) => {
      const rgb = color.match(/\d+/g);
      const r = rgb[0], g = rgb[1], b = rgb[2];
      return (r * 0.299 + g * 0.587 + b * 0.114) <= 128; // luminance formula for dark color
    };
  
    elements.forEach((el, index) => {
      const textColor = window.getComputedStyle(el).color;
      const bgColor = window.getComputedStyle(el).backgroundColor;
      
      if (textColor && bgColor && isDarkColor(textColor) && isDarkColor(bgColor)) {
        lowContrastElements.push(`Element at index ${index} has low contrast between text and background`);
      }
    });
  
    return lowContrastElements;
  }
  
  // Main accessibility check function
  function checkAccessibility() {
    const missingAlt = checkImageAltText();
    const missingAria = checkAriaLabels();
    const lowContrast = checkColorContrast();
  
    return {
      missingAlt,
      missingAria,
      lowContrast
    };
  }
  
  // Export the checkAccessibility function to be used by others
  module.exports = {
    checkAccessibility
  };
  
  