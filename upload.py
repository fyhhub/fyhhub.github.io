#!/usr/bin/env python3
"""Upload rspress project to GitHub main branch."""
import os, base64, time, subprocess, json, tempfile

REPO = "fyhhub/fyhhub.github.io"
BRANCH = "main"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def get_files(base_dir):
    skip_dirs = {'.git', 'node_modules', 'doc_build', '.rspress', '.cache'}
    skip_files = {'package-lock.json', 'pnpm-lock.yaml', '.rspress'}
    files = []
    for root, dirs, filenames in os.walk(base_dir):
        dirs[:] = [d for d in dirs if d not in skip_dirs]
        for fn in filenames:
            if fn in skip_files:
                continue
            full = os.path.join(root, fn)
            rel = os.path.relpath(full, base_dir)
            files.append((rel, full))
    return files

def blob(path):
    with open(path, 'rb') as f:
        enc = base64.b64encode(f.read()).decode()
    data = json.dumps({"content": enc, "encoding": "base64"})
    with tempfile.NamedTemporaryFile('w', suffix='.json', delete=False) as f:
        f.write(data); f.flush()
        r = subprocess.run(['gh', 'api', f'repos/{REPO}/git/blobs', '--input', f.name], capture_output=True, text=True)
    os.unlink(f.name)
    return json.loads(r.stdout)['sha']

def tree(items):
    with tempfile.NamedTemporaryFile('w', suffix='.json', delete=False) as f:
        json.dump({"tree": items}, f); f.flush()
        r = subprocess.run(['gh', 'api', f'repos/{REPO}/git/trees', '--input', f.name], capture_output=True, text=True)
    os.unlink(f.name)
    return json.loads(r.stdout)['sha']

def commit(tsha, psha, msg):
    with tempfile.NamedTemporaryFile('w', suffix='.json', delete=False) as f:
        json.dump({"message": msg, "tree": tsha, "parents": [psha]}, f); f.flush()
        r = subprocess.run(['gh', 'api', f'repos/{REPO}/git/commits', '--input', f.name], capture_output=True, text=True)
    os.unlink(f.name)
    return json.loads(r.stdout)['sha']

def ref(sha):
    with tempfile.NamedTemporaryFile('w', suffix='.json', delete=False) as f:
        json.dump({"sha": sha}, f); f.flush()
        r = subprocess.run(['gh', 'api', f'repos/{REPO}/git/refs/heads/{BRANCH}', '--input', f.name, '-X', 'PATCH'], capture_output=True, text=True)
    os.unlink(f.name)
    return r.returncode == 0

def main():
    os.chdir(BASE_DIR)
    files = get_files(BASE_DIR)
    print(f"📁 {len(files)} files")

    psha = subprocess.run(['gh', 'api', f'repos/{REPO}/git/ref/heads/{BRANCH}', '--jq', '.object.sha'], capture_output=True, text=True).stdout.strip()
    print(f"   Parent: {psha[:8]}...")

    items = []
    for rel, full in files:
        sha = blob(full)
        items.append({"path": rel, "mode": "100644", "type": "blob", "sha": sha})
        print(f"   ✓ {rel}")
        time.sleep(0.1)

    tsha = tree(items)
    csha = commit(tsha, psha, "chore: use auto-nav-sidebar plugin, clear articles\n\n- Add @rspress/plugin-auto-nav-sidebar for automatic route generation\n- Nav reduced to only home page and GitHub link\n- All 413 articles removed from docs/ (ready for re-addition)\n- Sidebar now auto-generated from docs/ directory structure\n- Public assets (images, icons) preserved\n- Workflow files included in upload")

    print(f"   Commit: {csha[:8]}...")
    if ref(csha):
        print(f"✅ https://github.com/{REPO}/tree/{BRANCH}")
    else:
        print("❌ Failed")

if __name__ == '__main__':
    main()
