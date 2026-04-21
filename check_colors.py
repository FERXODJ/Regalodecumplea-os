import os
from PIL import Image

blank_files = []
for f in os.listdir('img'):
    if f.endswith('.mp4'): continue
    path = os.path.join('img', f)
    try:
        with Image.open(path) as img:
            extrema = img.convert("RGB").getextrema()
            # extrema forma: ((min_R, max_R), (min_G, max_G), (min_B, max_B))
            # Si todos los min y max son 255, es blanca. Si todos son 0, es negra.
            is_white = all(min_val == 255 and max_val == 255 for min_val, max_val in extrema)
            is_black = all(min_val == 0 and max_val == 0 for min_val, max_val in extrema)
            if is_white or is_black:
                print(f"Blank image detected: {f} (White: {is_white}, Black: {is_black})")
                blank_files.append(f)
    except Exception as e:
        print(f"Error opening {f}: {e}")

print("Total blank/broken visually:", blank_files)
