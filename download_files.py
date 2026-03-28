#!/usr/bin/env python3
"""
Download all markdown and public files from fyhhub/fyhhub.github.io
and organize them into the docs/ directory structure.
"""
import os
import base64
import subprocess
import json
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.parse import quote

REPO = "fyhhub/fyhhub.github.io"
BRANCH = "main"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def gh_api(path: str) -> dict:
    """Call gh api and return parsed JSON."""
    cmd = f'gh api "repos/{REPO}/contents/{path}?ref={BRANCH}"'
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if result.returncode != 0:
        return None
    return json.loads(result.stdout)

def get_file_content(path: str) -> bytes | None:
    """Download file content, returns raw bytes."""
    data = gh_api(path)
    if not data:
        return None
    content = data.get("content", "")
    # Files are base64 encoded
    try:
        return base64.b64decode(content)
    except Exception:
        return None

def get_tree():
    """Get all tree entries from the repo."""
    cmd = f'gh api "repos/{REPO}/git/trees/main?recursive=1" --jq ".tree[] | \\"\\(.type) \\(.path)\\" "'
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error getting tree: {result.stderr}")
        return []
    lines = result.stdout.strip().split('\n')
    entries = []
    for line in lines:
        if not line.strip():
            continue
        parts = line.split(' ', 1)
        if len(parts) == 2:
            entries.append((parts[0], parts[1]))
    return entries

def should_migrate(src_path: str) -> bool:
    """Check if a file should be migrated to docs/."""
    # Skip .vitepress config directory
    if src_path.startswith('src/.vitepress'):
        return False
    # Skip package files (they'll be replaced)
    if src_path in ['package.json', 'pnpm-lock.yaml', 'package-lock.json', '.npmrc']:
        return False
    # Skip .github directory
    if src_path.startswith('.github'):
        return False
    # Include markdown files
    if src_path.startswith('src/') and src_path.endswith('.md'):
        return True
    # Include public assets
    if src_path.startswith('src/public/'):
        return True
    return False

def src_to_docs(src_path: str) -> str | None:
    """Convert src/ path to docs/ path."""
    if src_path.startswith('src/'):
        docs_path = os.path.join('docs', src_path[4:])  # Remove 'src/'
        return docs_path
    elif src_path.startswith('src/public/'):
        docs_path = os.path.join('docs', src_path[4:])  # Remove 'src/'
        return docs_path
    return None

def download_file(src_path: str) -> tuple[str, bool, bytes | None]:
    """Download a single file. Returns (src_path, success, content)."""
    content = get_file_content(src_path)
    return (src_path, content is not None, content)

def main():
    print("Fetching repository tree...")
    entries = get_tree()
    print(f"Total entries: {len(entries)}")

    # Filter files to migrate
    to_migrate = [(t, p) for t, p in entries if should_migrate(p)]
    print(f"Files to migrate: {len(to_migrate)}")

    # Separate blobs
    blobs = [p for t, p in to_migrate if t == 'blob']
    print(f"Blobs to download: {len(blobs)}")

    # Download in parallel
    print("Downloading files...")
    success_count = 0
    fail_count = 0

    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = {executor.submit(download_file, p): p for p in blobs}
        for i, future in enumerate(as_completed(futures), 1):
            src_path, success, content = future.result()
            if success:
                docs_path = src_to_docs(src_path)
                if docs_path:
                    os.makedirs(os.path.dirname(docs_path), exist_ok=True)
                    with open(docs_path, 'wb') as f:
                        f.write(content)
                    success_count += 1
            else:
                fail_count += 1
                print(f"  FAILED: {src_path}")
            if i % 50 == 0:
                print(f"  Progress: {i}/{len(blobs)} ({success_count} ok, {fail_count} failed)")

    print(f"\nDone! {success_count} files downloaded, {fail_count} failed.")

    # Verify docs structure
    md_count = sum(1 for _, _, files in os.walk('docs') for f in files if f.endswith('.md'))
    print(f"Total .md files in docs/: {md_count}")

if __name__ == '__main__':
    os.chdir(BASE_DIR)
    main()
