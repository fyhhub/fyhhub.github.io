import {
  nextTick,
  onMounted,
  watch
} from "./chunk-WCDSLHER.js";

// node_modules/vitepress-plugin-codeblocks-fold/lib/index.js
var themeChangeObserve = null;
var cbf = (frontmatter, defaultAllFold, height) => {
  let fm = true;
  if (frontmatter.value && frontmatter.value.cbf !== void 0) {
    fm = frontmatter.value.cbf;
  }
  const codeblocks = document.querySelectorAll('.vp-doc [class*="language-"]');
  codeblocks.forEach((el, index) => {
    const element = el;
    if (element.offsetHeight !== 0 && element.offsetHeight <= height) {
      return;
    }
    if (Array.isArray(fm)) {
      if (defaultAllFold) {
        if (fm.indexOf(index + 1) === -1) {
          judge(element, height);
        }
      } else {
        if (fm.indexOf(index + 1) !== -1) {
          judge(element, height);
        }
      }
    } else {
      if (defaultAllFold && fm) {
        judge(element, height);
      }
    }
  });
  !themeChangeObserve && themeChangeObserver();
};
var observer = (el, height) => {
  new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const _el = mutation.target;
      if (mutation.attributeName === "class" && _el.classList.contains("active") && _el.offsetHeight > height) {
        fold(el, height);
      }
    });
  }).observe(el, {
    attributeFilter: ["class"]
  });
};
var judge = (el, height) => {
  const displayStatus = window.getComputedStyle(el, null).getPropertyValue("display");
  const isDetailBlock = el.parentElement.classList.contains("details");
  if (displayStatus === "none" || isDetailBlock) {
    observer(el, height);
  } else {
    fold(el, height);
  }
};
var fold = (el, height) => {
  if (el.classList.contains("fold")) {
    return;
  }
  el.classList.add("fold");
  const pres = el.querySelectorAll("pre");
  pres.forEach((pre) => {
    pre.style.height = height + "px";
    pre.style.overflow = "hidden";
  });
  el.style.marginBottom = "48px";
  el.style.borderRadius = "8px 8px 0 0";
  const foldBtn = document.createElement("div");
  const mask = document.createElement("div");
  mask.style.backgroundImage = "linear-gradient(-180deg, rgba(0, 0, 0, 0) 0%, var(--vp-code-block-bg) 100%)";
  mask.className = "codeblocks-mask";
  foldBtn.style.backgroundColor = "var(--vp-code-block-bg)";
  foldBtn.className = "fold-btn";
  foldBtn.insertAdjacentHTML("afterbegin", `<svg t="1680893932803" class="fold-btn-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1473" width="16" height="16" style="fill: var(--vp-code-block-bg); filter: invert(100%)"><path d="M553.1392 778.88512l451.61472-451.61472c22.64576-22.64576 22.64576-59.4176 0-82.14016-22.64576-22.64576-59.4176-22.64576-82.14016 0l-410.5472 410.61888-410.61888-410.624c-22.64576-22.64576-59.4176-22.64576-82.14016 0-22.64576 22.64576-22.64576 59.4176 0 82.14016l451.69152 451.69152a58.08128 58.08128 0 0 0 82.14016-0.07168z" p-id="1474"></path></svg>`);
  el.appendChild(mask);
  el.appendChild(foldBtn);
  foldBtn.onclick = () => {
    const maskElement = el.querySelector(".codeblocks-mask");
    const iconElement = el.querySelector(".fold-btn-icon");
    pres.forEach((pre) => {
      foldBtnEvent({ pre, foldBtn, iconElement, maskElement }, height);
    });
  };
};
var foldBtnEvent = (els, height) => {
  const { pre, foldBtn, iconElement, maskElement } = els;
  if (pre.classList.contains("expand")) {
    const oldPos = foldBtn.getBoundingClientRect().top;
    pre.style.height = height + "px";
    pre.style.overflow = "hidden";
    pre.scrollTo(0, 0);
    pre.classList.remove("expand");
    maskElement.style.height = "48px";
    iconElement.classList.remove("turn");
    window.scrollTo(0, foldBtn.getBoundingClientRect().top + window.scrollY - oldPos);
  } else {
    pre.style.height = "auto";
    pre.style.overflow = "auto";
    pre.classList.add("expand");
    maskElement.style.height = "0";
    iconElement.classList.add("turn");
  }
};
var rebindListener = (height) => {
  const codeblocks = document.querySelectorAll('.vp-doc [class*="language-"]');
  codeblocks.forEach((el) => {
    const foldBtn = el.querySelector(".fold-btn");
    if (foldBtn && !foldBtn.onclick) {
      foldBtn.onclick = () => {
        const pre = el.querySelector("pre");
        const maskElement = el.querySelector(".codeblocks-mask");
        const iconElement = el.querySelector(".fold-btn-icon");
        foldBtnEvent({ pre, foldBtn, iconElement, maskElement }, height);
      };
    }
  });
};
function isRGBA(value) {
  const rgbaPattern = /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(0(\.\d+)?|1(\.0+)?)\s*\)$/i;
  return rgbaPattern.test(value);
}
var themeChangeObserver = () => {
  hideMask();
  themeChangeObserve = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "class") {
        hideMask();
      }
    });
  });
  themeChangeObserve.observe(document.querySelector("html"), {
    attributeFilter: ["class"]
  });
};
var hideMask = () => {
  if (document.querySelector('.vp-doc [class*="language-"]')) {
    let _isRGBA = isRGBA(window.getComputedStyle(document.querySelector('.vp-doc [class*="language-"]'), null).getPropertyValue("background-color"));
    if (_isRGBA) {
      nextTick(() => {
        document.querySelectorAll(".codeblocks-mask").forEach((item) => {
          item.style.display = "none";
        });
      }).then();
    } else {
      nextTick(() => {
        document.querySelectorAll(".codeblocks-mask").forEach((item) => {
          item.style.display = "";
        });
      }).then();
    }
  }
};
var codeblocksFold = (vitepressObj, defaultAllFold = true, height = 400) => {
  const { frontmatter, route } = vitepressObj;
  onMounted(() => {
    cbf(frontmatter, defaultAllFold, height);
    rebindListener(height);
  });
  watch(() => route.path, () => {
    nextTick(() => {
      cbf(vitepressObj.frontmatter, defaultAllFold, height);
      rebindListener(height);
    }).then();
  });
};
var lib_default = codeblocksFold;
export {
  lib_default as default
};
//# sourceMappingURL=vitepress-plugin-codeblocks-fold.js.map
