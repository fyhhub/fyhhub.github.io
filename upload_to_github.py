#!/usr/bin/env python3
"""
Upload all source files from rspress-fresh to GitHub main branch
using the GitHub Git Data API (Tree + Commit approach).
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
BATCH_SIZE = 50  # files per batch

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
            # Skip lock files
            if rel in {'package-lock.json', 'pnpm-lock.yaml'}:
                continue
            files.append((rel, full))
    return files

def create_blob(path):
    """Create a blob from a file path, return blob SHA."""
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

def create_tree(base_tree_sha, items):
    """Create a tree from items, inheriting from base_tree_sha."""
    data = {"base_tree": base_tree_sha, "tree": items}
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
    """Create a commit pointing to tree_sha."""
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
    """Update the branch ref to point to commit_sha."""
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
    print(f"   Found {len(files)} files to upload")

    # Get current branch HEAD SHA
    result = subprocess.run(
        ['gh', 'api', f'repos/{REPO}/git/ref/heads/{BRANCH}', '--jq', '.object.sha'],
        capture_output=True, text=True
    )
    parent_sha = result.stdout.strip()
    print(f"   Branch HEAD: {parent_sha[:8]}...")

    # Get base tree SHA
    result = subprocess.run(
        ['gh', 'api', f'repos/{REPO}/git/commits/{parent_sha}', '--jq', '.tree.sha'],
        capture_output=True, text=True
    )
    current_tree_sha = result.stdout.strip()
    print(f"   Base tree: {current_tree_sha[:8]}...")

    # Process in batches
    total_batches = (len(files) + BATCH_SIZE - 1) // BATCH_SIZE
    cumulative_tree_sha = current_tree_sha

    for batch_idx in range(total_batches):
        batch = files[batch_idx * BATCH_SIZE : (batch_idx + 1) * BATCH_SIZE]
        print(f"\n📦 Batch {batch_idx+1}/{total_batches} ({len(batch)} files)")

        # Create blobs for this batch
        items = []
        for rel_path, full_path in batch:
            try:
                blob_sha = create_blob(full_path)
                items.append({
                    "path": rel_path,
                    "mode": "100644",
                    "type": "blob",
                    "sha": blob_sha
                })
                print(f"   ✓ {rel_path}")
            except Exception as e:
                print(f"   ✗ {rel_path}: {e}")

        # Create tree (inherits all files from cumulative_tree_sha + new files)
        if items:
            new_tree_sha = create_tree(cumulative_tree_sha, items)
            print(f"   Tree: {new_tree_sha[:8]}...")
            cumulative_tree_sha = new_tree_sha
        time.sleep(0.5)  # Rate limit protection

    # Create commit
    commit_msg = """feat: migrate all 413 articles to Rspress

- Complete migration from VitePress to Rspress framework
- All 413 articles preserved unchanged in docs/ directory
- Full sidebar navigation configured for all categories
- Updated rspress.config.ts with complete nav and sidebar
- GitHub Actions CI/CD: npm install + rspress build docs
- Deploy to GitHub Pages via actions/deploy-pages
- Articles span: algorithm, frontend-basic/advanced/engineering,
  basic, backend, rust-learn, tools, informal, and more"""
    print(f"\n✏️  Creating commit...")
    commit_sha = create_commit(cumulative_tree_sha, parent_sha, commit_msg)
    print(f"   Commit: {commit_sha[:8]}...")

    # Update branch ref
    print(f"\n🚀 Updating branch ref...")
    if update_ref(commit_sha):
        print(f"✅ Successfully pushed to branch: {BRANCH}")
        print(f"   🔗 https://github.com/{REPO}/tree/{BRANCH}")
    else:
        print("❌ Failed to update branch ref")

if __name__ == '__main__':
    main()
