from PIL import Image
import sys
import numpy as np

def make_transparent(input_path, output_path):
    print(f"Processing {input_path} for transparency...")
    try:
        # Load image and ensure RGBA
        img = Image.open(input_path).convert('RGBA')
        data = np.array(img)
        
        # We look for very dark pixels (e.g. R<20, G<25, B<35)
        # to identify the dark blue background #060a13
        r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
        mask = (r < 25) & (g < 30) & (b < 40)
        
        # Set alpha to 0 (transparent) for the background pixels
        data[mask, 3] = 0
        
        # Save the result
        result = Image.fromarray(data)
        result.save(output_path)
        print(f"Successfully saved transparent image to {output_path}")
    except Exception as e:
        print(f"Error processing image: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python make_transparent.py <input> <output>")
        sys.exit(1)
    make_transparent(sys.argv[1], sys.argv[2])
