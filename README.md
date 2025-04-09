# Full Stack Developer Portfolio

A professional portfolio website built with HTML, CSS, and JavaScript to showcase your skills and projects as a full stack web developer.

## Features

- Modern and responsive design
- Animated elements for better user experience
- Project showcasing with filtering capability
- Skills section with categorized skills
- Contact form for potential clients or employers
- Mobile-friendly navigation
- Smooth scrolling
- Cross-browser compatibility

## Structure

- `index.html` - The main HTML file containing the structure of the portfolio
- `css/styles.css` - CSS file with all the styling for the portfolio
- `js/script.js` - JavaScript file for interactivity and functionality
- `images/` - Directory for storing portfolio images

## How to Use

1. Clone or download this repository to your local machine
2. Customize the content in `index.html` to reflect your own information:
   - Update your name, job title, and introduction in the hero section
   - Add your own skills in the skills section
   - Replace the project placeholders with your actual projects
   - Update contact information
3. Replace placeholder images in the `images/` directory with your own
4. Modify the CSS in `styles.css` if you want to change colors, fonts, or layout
5. Deploy the website to your preferred hosting platform

## Customization

### Changing Colors

The website uses CSS variables for easy color customization. In the `styles.css` file, locate the `:root` selector at the top and modify the color values:

```css
:root {
    --primary-color: #4a6cf7; /* Main color */
    --primary-dark: #3a56c5; /* Darker shade for hover states */
    --secondary-color: #6c757d; /* Secondary color for subtle elements */
    --text-color: #333; /* Main text color */
    --light-text: #fff; /* Light text color */
    --dark-bg: #111827; /* Dark background color (footer) */
    --light-bg: #f9f9f9; /* Light background color */
    --border-color: #e5e7eb; /* Border color */
    /* ... other variables ... */
}
```

### Adding Projects

To add a new project to your portfolio:

1. In the `index.html` file, locate the projects section
2. Copy an existing project card structure
3. Update the project information (title, description, technologies)
4. Add corresponding project image to the `images/` directory
5. Update the image path in the HTML

Example project card structure:

```html
<div class="project-card" data-category="frontend">
    <div class="project-img">
        <img src="images/your-project-image.jpg" alt="Project Name">
    </div>
    <div class="project-info">
        <h3>Project Name</h3>
        <p>Project description goes here...</p>
        <div class="project-tech">
            <span>Technology 1</span>
            <span>Technology 2</span>
            <span>Technology 3</span>
        </div>
        <div class="project-links">
            <a href="#" target="_blank" class="btn small-btn">Live Demo</a>
            <a href="#" target="_blank" class="btn small-btn outline-btn">GitHub</a>
        </div>
    </div>
</div>
```

## Browser Compatibility

This portfolio website is compatible with:
- Google Chrome
- Mozilla Firefox
- Safari
- Microsoft Edge
- Opera

## Credits

- Font Awesome - for the icons
- Google Fonts - for the typography
- Poppins - main font family used

## License

This project is open source and available under the [MIT License](LICENSE). # Waseemadil
