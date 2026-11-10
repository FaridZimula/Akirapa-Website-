#!/usr/bin/env python3
"""
Generate complete favicon suite for Akirapa Home Care from public/akirapa-logo.png.
Generates:
  - favicon.ico (multi-resolution: 16x16, 32x32, 48x48)
  - favicon.png (192x192)
  - favicon-16x16.png (16x16)
  - favicon-32x32.png (32x32)
  - favicon-48x48.png (48x48 - Google Search SERP standard)
  - favicon-96x96.png (96x96 - Google Search desktop / high-DPI standard)
  - favicon-192x192.png (192x192 - Android Chrome homescreen standard)
  - favicon-512x512.png (512x512 - Android Chrome splash / PWA standard)
  - apple-touch-icon.png (180x180 - iOS Safari homescreen standard)
  - apple-touch-icon-precomposed.png (180x180 - Legacy iOS standard)
"""

import os
from PIL import Image

def generate_favicons():
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    public_dir = os.path.join(root_dir, 'public')
    source_path = os.path.join(public_dir, 'akirapa-logo.png')

    if not os.path.exists(source_path):
        raise FileNotFoundError(f"Source logo not found at {source_path}")

    print(f"Loading source logo from: {source_path}")
    src = Image.open(source_path).convert('RGBA')

    # Trim any excess transparent outer margins and get actual logo bounding box
    bbox = src.getbbox()
    crop = src.crop(bbox)
    cw, ch = crop.size
    print(f"Original size: {src.size}, cropped content: {cw}x{ch}")

    def create_icon(target_size, padding_pct=0.08):
        canvas = Image.new('RGBA', (target_size, target_size), (0, 0, 0, 0))
        usable = target_size * (1.0 - 2 * padding_pct)
        scale = min(usable / cw, usable / ch)
        nw = max(1, int(round(cw * scale)))
        nh = max(1, int(round(ch * scale)))
        resized = crop.resize((nw, nh), Image.Resampling.LANCZOS)
        x = (target_size - nw) // 2
        y = (target_size - nh) // 2
        canvas.paste(resized, (x, y), resized)
        return canvas

    # PNG icons to generate
    png_specs = [
        ('favicon-16x16.png', 16, 0.04),
        ('favicon-32x32.png', 32, 0.04),
        ('favicon-48x48.png', 48, 0.08),
        ('favicon-96x96.png', 96, 0.08),
        ('favicon-192x192.png', 192, 0.08),
        ('favicon-512x512.png', 512, 0.08),
        ('favicon.png', 192, 0.08),
        ('apple-touch-icon.png', 180, 0.09),
        ('apple-touch-icon-precomposed.png', 180, 0.09),
    ]

    for filename, size, pad in png_specs:
        out_path = os.path.join(public_dir, filename)
        icon_img = create_icon(size, padding_pct=pad)
        icon_img.save(out_path, format='PNG', optimize=True)
        print(f" Saved: {filename} ({size}x{size})")

    # Multi-resolution ICO: 16x16, 32x32, 48x48
    ico_path = os.path.join(public_dir, 'favicon.ico')
    ico_base = create_icon(48, padding_pct=0.08)
    ico_base.save(
        ico_path,
        format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48)]
    )
    print(f" Saved: favicon.ico (multi-resolution 16x16, 32x32, 48x48)")

    print("All favicons generated successfully from akirapa-logo.png!")

if __name__ == '__main__':
    generate_favicons()
