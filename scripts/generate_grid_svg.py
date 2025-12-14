import os

def generate_svg(grid, filename, cell_size=50, gap=2):
    rows = len(grid)
    cols = len(grid[0])
    width = cols * (cell_size + gap) + gap
    height = rows * (cell_size + gap) + gap
    
    svg_content = f'<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg">\n'
    
    # Background
    svg_content += f'  <rect x="0" y="0" width="{width}" height="{height}" fill="#f0f0f0" />\n'
    
    colors = {
        'X': '#64748b', # Slate 500
        'O': '#ffffff', # White
        'S': '#22c55e', # Green 500 (Safe)
        'F': '#ef4444'  # Red 500 (Flipped/Captured)
    }
    
    text_colors = {
        'X': '#ffffff',
        'O': '#000000',
        'S': '#ffffff',
        'F': '#ffffff'
    }

    for r in range(rows):
        for c in range(cols):
            x = gap + c * (cell_size + gap)
            y = gap + r * (cell_size + gap)
            val = grid[r][c]
            
            fill_color = colors.get(val, '#cccccc')
            text_color = text_colors.get(val, '#000000')
            
            # Draw cell rect
            svg_content += f'  <rect x="{x}" y="{y}" width="{cell_size}" height="{cell_size}" rx="4" fill="{fill_color}" />\n'
            
            # Draw text
            # Center text: x + cell_size/2, y + cell_size/2 + adjustment
            text_x = x + cell_size / 2
            text_y = y + cell_size / 2 + 5 # approximate vertical centering
            
            # Map internal values to display characters
            display_char = 'X' if val == 'F' else ('O' if val == 'S' else val)
            
            svg_content += f'  <text x="{text_x}" y="{text_y}" font-family="Arial, sans-serif" font-size="20" fill="{text_color}" text-anchor="middle" font-weight="bold">{display_char}</text>\n'

    svg_content += '</svg>'
    
    output_dir = 'src/content/problems/set1/images'
    os.makedirs(output_dir, exist_ok=True)
    
    filepath = os.path.join(output_dir, filename)
    with open(filepath, 'w') as f:
        f.write(svg_content)
    print(f"Generated {filepath}")

# Example 1
ex1_before = [
    ["X","X","X","X","O"],
    ["X","X","O","X","X"],
    ["X","X","O","X","O"],
    ["X","O","X","X","X"],
    ["X","O","X","X","X"]
]

ex1_after = [
    ["X","X","X","X","O"], # S
    ["X","X","X","X","X"], # F
    ["X","X","X","X","O"], # S
    ["X","O","X","X","X"], # S
    ["X","O","X","X","X"]  # S
]
# For visualization purposes, let's make the 'After' image show the distinction better
# or just match the problem output exactly. The user wants "Before" and "After".
# The output shows all X's and O's.
# To make it nice, maybe I'll stick to the strict Output format but distinct colors 'S' and 'F' logic 
# might be confusing if not explained.
# Let's stick to strict X and O output for correctness, but maybe 'O's in the output that survived are visually distinct?
# No, problem says "replace... with X". The output is just X and O.
# Let's simple produce X and O grids corresponding strictly to input/output.

ex1_after_strict = [
    ["X","X","X","X","O"],
    ["X","X","X","X","X"],
    ["X","X","X","X","O"],
    ["X","O","X","X","X"],
    ["X","O","X","X","X"]
]

# Example 2
ex2_before = [
    ["O","O"],
    ["O","X"]
]

ex2_after = [
    ["O","O"],
    ["O","X"]
]

if __name__ == "__main__":
    generate_svg(ex1_before, "surrounded_regions_ex1_before.svg")
    generate_svg(ex1_after_strict, "surrounded_regions_ex1_after.svg")
    generate_svg(ex2_before, "surrounded_regions_ex2_before.svg")
    generate_svg(ex2_after, "surrounded_regions_ex2_after.svg")
