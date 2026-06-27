#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Starting rendering of all Quarto (.qmd) files to PDF..."

# Keep LuaLaTeX font/cache writes inside writable locations for sandboxed runs.
export TEXMFOUTPUT="${TEXMFOUTPUT:-/tmp}"
export TEXMFVAR="${TEXMFVAR:-/tmp/texmf-var}"
export TEXMFCONFIG="${TEXMFCONFIG:-/tmp/texmf-config}"
export TEXMFCACHE="${TEXMFCACHE:-/tmp/texmf-cache}"
export OSFONTDIR="${OSFONTDIR:-/usr/share/fonts}"
mkdir -p "$TEXMFVAR" "$TEXMFCONFIG" "$TEXMFCACHE"

# Find all .qmd files in the current directory
qmd_files=(*.qmd)
total_files=${#qmd_files[@]}
current=0

if [ "$total_files" -eq 0 ] || [ ! -e "${qmd_files[0]}" ]; then
    echo "No .qmd files found in this directory."
    exit 0
fi

for file in "${qmd_files[@]}"; do
    current=$((current + 1))
    echo "[$current/$total_files] Rendering $file to PDF..."
    quarto render "$file" --to pdf
done

echo "Successfully rendered all $total_files files!"
