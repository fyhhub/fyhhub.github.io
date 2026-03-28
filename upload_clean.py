#!/usr/bin/env python3
"""
Upload minimal rspress project to GitHub, effectively deleting old articles.
Creates a fresh tree with only the current local files.
"""
import os
import base64
import time
import subprocess
import json
import tempfile

REPO = "fyhhub/fyhhub.github.io"
BRANCH = "main"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def get_files(base_dir):
    """Walk directory and return list of (rel_path, full_path)."""
    skip = {'.git', 'node_modules', 'doc_build', '.rspress', '.cache'}
    files = []
    for root, dirs, filenames in os.walk(base_dir):
        dirs[:] = [d for d in dirs if d not in skip and not d.startswith('.')]
        for fn in filenames:
            if fn.startswith('.'):
                continue
            full = os.path.join(root, fn)
            rel = os.path.relpath(full, base_dir)
            if rel in {'package-lock.json', 'pnpm-lock.yaml'}:
                continue
            files.append((rel, full))
    return files

def create_blob(path):
    with open(path, 'rb') as f:
        content = f.read()
    encoded = base64.b64encode(content).decode('utf-8')
    data = {"content": encoded, "encoding": "base64"}
    with tempfile.NamedTemporaryFile('w', suffix='.json', delete=False) as f:
        json.dump(data, f)
        f.flush()
        result = subprocess.run(
            ['gh', 'api', f'repos/{REPO}/git/blobs', '--input', f.name],
            capture_output=True, text=True
        )
    os.unlink(f.name)
    resp = json.loads(result.stdout)
    return resp['sha']

def create_tree(items):
    """Create a brand new tree (no base_tree = fresh tree)."""
    data = {"tree": items}
    with tempfile.NamedTemporaryFile('w', suffix='.json', delete=False) as f:
        json.dump(data, f)
        f.flush()
        result = subprocess.run(
            ['gh', 'api', f'repos/{REPO}/git/trees', '--input', f.name],
            capture_output=True, text=True
        )
    os.unlink(f.name)
    resp = json.loads(result.stdout)
    return resp.get('sha', '')

def create_commit(tree_sha, parent_sha, msg):
    data = {"message": msg, "tree": tree_sha, "parents": [parent_sha]}
    with tempfile.NamedTemporaryFile('w', suffix='.json', delete=False) as f:
        json.dump(data, f)
        f.flush()
        result = subprocess.run(
            ['gh', 'api', f'repos/{REPO}/git/commits', '--input', f.name],
            capture_output=True, text=True
        )
    os.unlink(f.name)
    resp = json.loads(result.stdout)
    return resp.get('sha', '')

def update_ref(commit_sha):
    data = {"sha": commit_sha}
    with tempfile.NamedTemporaryFile('w', suffix='.json', delete=False) as f:
        json.dump(data, f)
        f.flush()
        result = subprocess.run(
            ['gh', 'api', f'repos/{REPO}/git/refs/heads/{BRANCH}', '--input', f.name, '-X', 'PATCH'],
            capture_output=True, text=True
        )
    os.unlink(f.name)
    return result.returncode == 0

def main():
    os.chdir(BASE_DIR)

    print("📁 Scanning files...")
    files = get_files(BASE_DIR)
    print(f"   Found {len(files)} files")

    result = subprocess.run(
        ['gh', 'api', f'repos/{REPO}/git/ref/heads/{BRANCH}', '--jq', '.object.sha'],
        capture_output=True, text=True
    )
    parent_sha = result.stdout.strip()
    print(f"   Parent commit: {parent_sha[:8]}...")

    print("\n📦 Creating blobs...")
    items = []
    for rel_path, full_path in files:
        blob_sha = create_blob(full_path)
        items.append({
            "path": rel_path,
            "mode": "100644",
            "type": "blob",
            "sha": blob_sha
        })
        print(f"   ✓ {rel_path}")
        time.sleep(0.1)

    print(f"\n🌳 Creating tree ({len(items)} files)...")
    tree_sha = create_tree(items)
    print(f"   Tree: {tree_sha[:8]}...")

    commit_sha = create_commit(tree_sha, parent_sha, """chore: use auto-nav-sidebar plugin, clear articles

- Add @rspress/plugin-auto-nav-sidebar for automatic route generation
- Nav reduced to only home page and GitHub link
- All 413 articles removed from docs/ (ready for re-addition)
- Sidebar now auto-generated from docs/ directory structure
- Public assets (images, icons) preserved""")
    print(f"   Commit: {commit_sha[:8]}...")

    print(f"\n🚀 Pushing to {BRANCH}...")
    if update_ref(commit_sha):
        print(f"✅ Done! https://github.com/{REPO}/tree/{BRANCH}")
    else:
        print("❌ Failed")

if __name__ == '__main__':
    main()
