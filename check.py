import os

invalid = []
for f in os.listdir('img'):
    if not f.endswith('.mp4'):
        try:
            with open(os.path.join('img', f), 'rb') as fp:
                header = fp.read(4)
                # Jpeg magic: ff d8
                # Png magic: 89 50 4e 47
                # WebP magic: 52 49 46 46
                # Also HEIC / MP4 boxes: 00 00 00 ... 66 74 79 70 (ftyp)
                if not (header.startswith(b'\xff\xd8') or header.startswith(b'\x89PNG') or header.startswith(b'RIFF')):
                    print(f"File {f} header: {header.hex()}")
                    invalid.append(f)
        except Exception:
            invalid.append(f)

print("InvalidFilesFound:", invalid)
