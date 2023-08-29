import path from 'path';
import fs from 'fs';

const nav = [{ text: '指南', link: '/guide' }];

let sideBarConfigArr: any[] = [];
function generateSideBar(pathline, isRoot, paths: string[] = []) {
  // 获取路径下的所有文件和文件夹名称
  let mdDirs = fs.readdirSync(pathline);
  mdDirs = mdDirs.filter(dir => !dir.startsWith('.') && dir !== 'public');

  let root: any = isRoot ? {} : undefined;
  let children: Array<{
    text: string;
    link: string;
    items?: any[]
  }> = [];

  mdDirs.sort((a, b) => {
    const numA = parseInt(a.match(/^\d+\./)?.[0] || '0');
    const numB = parseInt(b.match(/^\d+\./)?.[0] || '0');
    // 比较数字前缀并返回比较结果
    return numA - numB;
});

  mdDirs.forEach(dir => {
    const fullpath = path.resolve(pathline, dir);
    const stats = fs.statSync(fullpath);
    if (stats.isDirectory()) {
      if (isRoot) {
        root[`/${dir}/`] = generateSideBar(fullpath, false, paths.concat(dir))
      } else {
        children.push({
          text: dir,
          link: `/${paths.concat(dir).join('/')}/`,
          items: generateSideBar(fullpath, false, paths.concat(dir))
        })
      }
    } else if (stats.isFile()) {
      dir !== 'index.md' && children.push({
        text: dir.replace('.md', ''),
        link: `/${paths.concat(dir.replace('.md', '')).join('/')}`,
      })
    }
  });
  return isRoot ? root : children;
}

// 单独处理最顶层分类
export default generateSideBar(path.resolve(__dirname, '../../src'), true);
