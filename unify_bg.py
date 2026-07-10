from PIL import Image
import numpy as np
import sys

def unify_background(input_path, output_path):
    print(f"Processing {input_path}...")
    try:
        # Load image and ensure RGB
        img = Image.open(input_path).convert('RGB')
        data = np.array(img)
        
        # Define the target hex color #060a13
        target_color = [6, 10, 19]
        
        # Define a tolerance for what is considered "background"
        # We look for very dark pixels (e.g. R<15, G<15, B<25)
        # Or we can just calculate color distance. Let's use simple thresholding.
        r, g, b = data[:,:,0], data[:,:,1], data[:,:,2]
        mask = (r < 20) & (g < 25) & (b < 35)
        
        # Apply target color to the background mask
        data[mask] = target_color
        
        # Save the result
        result = Image.fromarray(data)
        result.save(output_path)
        print(f"Successfully unified background to #060a13 for {output_path}")
    except Exception as e:
        print(f"Error processing image: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python unify_bg.py <input> <output>")
        sys.exit(1)
    unify_background(sys.argv[1], sys.argv[2])
