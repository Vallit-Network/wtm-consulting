/**
 * Expandable Section Logic for "Haltung"
 * Handles the "Mehr lesen" / "Weniger anzeigen" toggle.
 */

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('haltung-toggle');
    const content = document.getElementById('haltung-text');
    const buttonText = toggleButton.querySelector('.btn-text');

    if (!toggleButton || !content) return;

    toggleButton.addEventListener('click', () => {
        const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            // Collapse
            content.classList.remove('expanded');
            content.classList.add('collapsed');
            toggleButton.setAttribute('aria-expanded', 'false');
            buttonText.textContent = 'Mehr lesen';
            toggleButton.classList.remove('active');

            // Scroll back slightly if user is deep down? 
            // Optional: smooth scroll back to top of container if needed
            content.scrollIntoView({ behavior: 'smooth', block: 'center' });

        } else {
            // Expand
            content.classList.remove('collapsed');
            content.classList.add('expanded');
            toggleButton.setAttribute('aria-expanded', 'true');
            buttonText.textContent = 'Weniger anzeigen';
            toggleButton.classList.add('active');
        }
    });
});
