import re

def group_media_queries(css):
    # Find all media queries and their contents
    # This assumes well-formatted CSS where top-level @media blocks close with '}' at the start of a line or similar,
    # but regular expressions for nested braces are tricky.
    # Since the CSS is well-formatted, we can split by '@media'
    
    parts = css.split('@media')
    base_css = parts[0]
    
    mqs = {}
    
    for part in parts[1:]:
        # Find the media condition
        condition_match = re.match(r'\s*([^{]+)\{', part)
        if condition_match:
            condition = condition_match.group(1).strip()
            # Find the matching closing brace for the @media block
            # We count braces to find the end
            content_start = condition_match.end()
            brace_count = 1
            content_end = content_start
            for i, char in enumerate(part[content_start:]):
                if char == '{':
                    brace_count += 1
                elif char == '}':
                    brace_count -= 1
                if brace_count == 0:
                    content_end = content_start + i
                    break
                    
            content = part[content_start:content_end].strip()
            remainder = part[content_end+1:].strip()
            
            # Group by condition
            # Normalizing condition (e.g. max-width: 992px vs 991px)
            if condition == '(max-width: 992px)': condition = '(max-width: 991px)'
            
            if condition not in mqs:
                mqs[condition] = []
            mqs[condition].append(content)
            
            if remainder:
                base_css += "\n" + remainder
                
    # Reassemble CSS
    final_css = base_css.strip() + "\n\n/* ==========================================\n   Media Queries (Grouped)\n   ========================================== */\n"
    
    # Sort conditions (just an arbitrary order or based on max-width decreasing)
    order = ['(max-width: 991px)', '(max-width: 768px)', '(max-width: 576px)', '(max-width: 480px)']
    for cond in order:
        if cond in mqs:
            final_css += f"\n@media {cond} {{\n"
            for content in mqs[cond]:
                final_css += "    " + content.replace("\n", "\n    ") + "\n"
            final_css += "}\n"
            del mqs[cond]
            
    # Add any remaining mqs
    for cond, contents in mqs.items():
        final_css += f"\n@media {cond} {{\n"
        for content in contents:
            final_css += "    " + content.replace("\n", "\n    ") + "\n"
        final_css += "}\n"
        
    return final_css

def process_css(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        css = f.read()

    # 1. Group Media Queries
    css = group_media_queries(css)

    # 2. Add Accessibility (prefers-reduced-motion and focus-visible)
    access_rules = """
/* Acessibilidade & Movimento */
:focus-visible {
    outline: 2px dashed var(--primary-gold);
    outline-offset: 4px;
}

@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
"""
    css = css.replace('/* Custom Scrollbar */', access_rules + '\n/* Custom Scrollbar */')

    # 3. Backdrop Filter with @supports
    # Replace backdrop-filter: xxx; with @supports (backdrop-filter: blur(1px)) { backdrop-filter: xxx; }
    # Using regex to find them, but ensuring we don't nest them twice
    css = re.sub(r'(?<!&\s\{\s)backdrop-filter:\s*([^;]+);', r'@supports (backdrop-filter: blur(1px)) { backdrop-filter: \1; }', css)

    # 4. Specific Transitions
    # Instead of replacing all generic transitions which might be dangerous, we will explicitly define transitions for main elements
    css = css.replace('transition: var(--transition-smooth);', 'transition: transform var(--transition-smooth), opacity var(--transition-smooth), background-color var(--transition-smooth), border-color var(--transition-smooth), box-shadow var(--transition-smooth), color var(--transition-smooth);')
    css = css.replace('transition: var(--transition-fast);', 'transition: transform var(--transition-fast), opacity var(--transition-fast), background-color var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast), color var(--transition-fast);')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(css)

if __name__ == "__main__":
    process_css(r'c:\Users\deved\OneDrive\Eldorado\css\style.css')
    print("CSS refactored successfully.")
