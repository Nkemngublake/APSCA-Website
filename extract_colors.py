from PIL import Image
from collections import Counter

def get_dominant_colors(image_path, num_colors=3):
    try:
        image = Image.open(image_path)
        image = image.convert('RGB')
        image = image.resize((150, 150))  # Resize for speed
        pixels = list(image.getdata())
        
        # Filter out white/near-white and black/near-black backgrounds if possible
        # This is a heuristic
        filtered_pixels = [
            p for p in pixels 
            if not (p[0] > 240 and p[1] > 240 and p[2] > 240) # Ignore white
            and not (p[0] < 15 and p[1] < 15 and p[2] < 15)   # Ignore black
        ]
        
        if not filtered_pixels:
            filtered_pixels = pixels

        counts = Counter(filtered_pixels)
        most_common = counts.most_common(num_colors)
        
        return [f"#{c[0][0]:02x}{c[0][1]:02x}{c[0][2]:02x}" for c in most_common]
    except Exception as e:
        print(f"Error: {e}")
        return []

colors = get_dominant_colors('public/logo.jpeg')
print("Dominant Colors:", colors)
