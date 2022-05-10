let hover_observer = null;
let global_animation = null;
function unhover(element) {
  element.classList.add('unhover');
  var global_animation = setTimeout(() => {
    clearTimeout(global_animation);
    global_animation = null;
    element.classList.remove('unhover');
  }, 500);
};
/* 導覽列變色 */
(function(){
  function trans10to16(num) {
    const txt = "0123456789abcdef";
    return `${txt[Math.floor(num / 16)]}${txt[Math.floor(num % 16)]}`
  }
  document.querySelectorAll('div[df="nvb"]').forEach((e) => {
    const col     = `#${e.getAttribute('col')}`;
    const start_y = Number(e.getAttribute('st'));
    const end_y   = Number(e.getAttribute('ed'));
    document.body.addEventListener('scroll', function(){
      let percent = (this.scrollTop - start_y) / (end_y - start_y);
      if (this.scrollTop < start_y) {
        e.style['background-color'] = `${col}00`;
        e.style['-webkit-backdrop-filter'] = `blur(0px)`;
        e.style['backdrop-filter'] = `blur(0px)`;
      } else if (this.scrollTop >= start_y && this.scrollTop <= end_y) {
        e.style['background-color'] = `${col}${trans10to16(255 * percent * 0.5)}`;
        e.style['-webkit-backdrop-filter'] = `blur(${10 * percent}px)`;
        e.style['backdrop-filter'] = `blur(${10 * percent}px)`;
      } else if (this.scrollTop > end_y) {
        e.style['background-color'] = `${col}${trans10to16(255 * 0.5)}`
        e.style['-webkit-backdrop-filter'] = `blur(10px)`;
        e.style['backdrop-filter'] = `blur(10px)`;
      }
    })
  })
}());
/* 展開導覽列 */
(function(){
  document.querySelector('img[df*=nvb]').onclick = () => {
    const elm_nav_bar     = document.createElement('div');
    const elm_body_clone  = document.querySelector('nav[df*=nvb]').querySelector('div').cloneNode(true);
    const elm_btn         = document.createElement('p');
    const animation       = document.querySelector('nav[df*=nvb]').getAttribute('dir');
    /* 設定元件 */
    elm_btn.innerText = "▴ 收起列表";
    elm_nav_bar.id    = "navbar";
    elm_nav_bar.classList.add(animation);
    document.body.appendChild(elm_nav_bar);
    /* 加入導覽列 */
    let timer = setTimeout(() => {
      clearTimeout(timer);
      /* 鎖定滑動 */
      document.body.style["overflow"] = "hidden";
      elm_nav_bar.appendChild(elm_body_clone);
      elm_nav_bar.appendChild(elm_btn);
      /* 添加點選動作 */
      elm_body_clone.querySelectorAll('div[df=li]').forEach(($1) => {
        $1.onclick = function(){
          if (this.classList.contains('act')) {
            this.classList.remove('act');
          } else {
            if (document.querySelectorAll('.act')) document.querySelectorAll('.act').forEach(($2) => {
              $2.classList.remove('act')
            });
            this.classList.add('act');
          }
        }
      });
    }, 500);
    /* 添加關閉動作 */
    elm_btn.onclick = function(){
      document.body.style["overflow"] = "scroll";
      if (document.querySelectorAll('.act')) document.querySelectorAll('.act').forEach((e) => {
        e.classList.remove('act');
      });
      elm_body_clone.querySelectorAll('div[df=li]').forEach((e) => {
        e.onclick = null
      });
      document.querySelector('nav[df*=nvb]').appendChild(elm_body_clone);
      this.parentElement.classList.add('hide');
      let timer = setTimeout(() => {
        clearTimeout(timer);
        this.parentElement.remove();
      }, 500);
    };
  };
}());
document.addEventListener("DOMContentLoaded", () => {
  const is_fine   = matchMedia('(pointer:fine)').matches;
  const is_coarse = matchMedia('(pointer:coarse)').matches;

  let mis = [].slice.call(document.querySelectorAll("a[mi='1'], div[mi='1'], a[wh='1'], div[wh='1']"));
  let btns = [].slice.call(document.querySelectorAll('.btn'));

  if ("IntersectionObserver" in window) {
    (function hover() {
      hover_observer = new IntersectionObserver((entries, observer) => {
        for (i = 0; i < entries.length; i++) {
          const e = entries[i];
          if (e.isIntersecting) {
            if (is_fine) {
              e.target.addEventListener('mouseout', (e) => {
                unhover(e.target);
              });
            } else {
              e.target.addEventListener('click', (e) => {
                if (e.target.classList.contains('act')) e.target.classList.remove('act');
                else {
                  if (document.querySelectorAll('.act')) document.querySelectorAll('.act').forEach((e) => {
                    e.classList.remove('act');
                  });
                  e.target.classList.add('act');
                }
              });
            }
          };
        };
      });
      mis.forEach((element) => {
        hover_observer.observe(element);
      });
      btns.forEach((element) => {
        hover_observer.observe(element);
      });
    }());
    // lazyloadObserver = new IntersectionObserver((entries, observer) => {
    //   for (i = 0; i < entries.length; i++) {
    //     const e = entries[i];
    //     if (e.isIntersecting) {
    //       let lazyImage = e.target;
    //       lazyImage.dataset.src.is200().then((r) => {
    //         lazyloadObserver.unobserve(lazyImage);
    //         lazyImage.src = lazyImage.dataset.src;
    //         lazyImage.classList.remove("lazyload");
    //         lazyImage.classList.remove('loading');
    //         lazyImage.removeAttribute("data-src");
    //       }).catch((err) => {
    //         lazyloadObserver.unobserve(lazyImage);
    //         lazyImage.src = '/icon/default/v.svg';
    //         lazyImage.classList.remove("lazyload");
    //         lazyImage.classList.remove('loading');
    //         lazyImage.removeAttribute("data-src");
    //       });
    //     };
    //   };
    // });
    // lazyloadImages.forEach(function (lazyImage) {
    //   lazyloadObserver.observe(lazyImage);
    // });
  };
});