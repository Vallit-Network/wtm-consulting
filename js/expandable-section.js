/**
 * Expandable Section Logic for "Haltung" & Success Stories
 * Handles the "Mehr lesen" / "Weniger anzeigen" toggle.
 */

document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.btn-text-expand');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('aria-controls');
            const content = document.getElementById(targetId);
            const buttonText = button.querySelector('.btn-text');

            if (!content) return;

            const isExpanded = button.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                // Collapse
                content.classList.remove('expanded');
                content.classList.add('collapsed');
                button.setAttribute('aria-expanded', 'false');
                buttonText.textContent = 'Mehr lesen';
                button.classList.remove('active');
            } else {
                // Expand
                content.classList.remove('collapsed');
                content.classList.add('expanded');
                button.setAttribute('aria-expanded', 'true');
                buttonText.textContent = 'Weniger anzeigen';
                button.classList.add('active');
            }

            // Notify carousel to recalculate height
            document.dispatchEvent(new CustomEvent('story-expand-toggle'));
        });
    });
});
