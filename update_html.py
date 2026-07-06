import os
import re

html_path = r'c:\Users\deved\OneDrive\Eldorado\index.html'
images_dir = r'c:\Users\deved\OneDrive\Eldorado\assets\images'

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all webp references
webp_matches = set(re.findall(r'assets/images/([^"]+)\.webp', content))

print(f"Found {len(webp_matches)} unique webp references.")

for name in webp_matches:
    # Check what the actual extension is in the filesystem
    found_ext = None
    for ext in ['.jpg', '.jpeg', '.png']:
        if os.path.exists(os.path.join(images_dir, name + ext)):
            found_ext = ext
            break
            
    if found_ext:
        # Replace in HTML
        content = content.replace(f'assets/images/{name}.webp', f'assets/images/{name}{found_ext}')
        print(f"Replaced {name}.webp with {name}{found_ext}")
    else:
        print(f"WARNING: Could not find original file for {name}")

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("HTML updated.")
