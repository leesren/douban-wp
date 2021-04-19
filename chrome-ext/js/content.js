function resetBtn(btn) {
  btn &&
    setTimeout(() => {
      btn.innerText = '切换用户';
    }, 1000);
}
function buildDom(isStartTimer = 0) {
  let button = document.createElement('button');
  button.innerText = isStartTimer == 1 ? '收集中...' : '收集';
  button.setAttribute('class', 'changeTokenBtn');
  button.setAttribute(
    'style',
    `font-size:10px; margin-bottom:5px; padding:5px;color:white;background-color: #ec7259c2; border: 0;border-radius: 15px; cursor: pointer;`,
  );
  var container = document.createElement('div');
  container.classList.add('ulist-box');
  container.setAttribute(
    'style',
    'display:inline-block;max-width: 70px;text-align:right; padding:2px;position:fixed;z-index:9999; top:8px;right:8px;border-radius: 4px; background-color: #d0cece54; box-shadow: 1px 4px 8px #eaeaea;',
  );
  container.appendChild(button);

  button.addEventListener('click', function(e) {
    let that = this;
    let latestStartTimer = +sessionStorage.getItem('isStartTimer');
    latestStartTimer = latestStartTimer || 0; // 默认0
    let resultT = latestStartTimer == 1 ? 0 : 1;
    that.innerText = resultT == 1 ? '收集中...' : '收集';
    sessionStorage.setItem('isStartTimer', resultT);
    if (resultT === 1) {
      start();
    }
  });

  let btnBox = document.createElement('div');
  btnBox.setAttribute('style', 'display: flex;');
  container.appendChild(btnBox);
  toggleUser(btnBox);
  resetBtn(container);
  document.body.appendChild(container);
}

async function upload(params) {
  try {
    const groupInfo = getGroupInfo();
    if (groupInfo.name) {
      await send({
        message: 'Upload',
        data: {
          groupInfo,
          list: getData(groupInfo.name, []),
        },
      });
      console.info('上传完成.');
    }
  } catch (error) {
    console.info('!!!上传失败.');
  }
  window.isUp = false;
}

function resetBtn(container) {
  let button = document.createElement('button');
  button.innerText = '重置';
  button.setAttribute(
    'style',
    `font-size:12px;margin-top:5px;color:white;background-color: #5078ffba;border:0;margin-bottom:8px;line-height:15px;border-radius: 4px;cursor: pointer; padding:4px`,
  );
  container.appendChild(button);
  const groupInfo = getGroupInfo();
  const storeKey = groupInfo.name;
  button.addEventListener('click', function(e) {
    localStorage.removeItem(storeKey);
    reload(0);
  });
}
function toggleUser(btnBox) {
  let button = document.createElement('button');
  button.innerText = '上传';
  button.classList.add('more-user');
  button.setAttribute(
    'style',
    `font-size: 12px;margin-top:5px;color:white;background-color: #ff5050ba;border:0;margin-bottom:8px;line-height:15px;padding:2px 8px;border-radius: 15px;cursor: pointer;`,
  );

  btnBox.appendChild(button);
  window.isUp = false;
  button.addEventListener('click', function(e) {
    console.log('000');
    if (window.isUp) {
      console.warn('上传中请稍后...');
      return;
    }
    window.isUp = true;
    upload();
  });
}
function getGroupInfo() {
  try {
    const groupDom = document.getElementById('g-side-info-member');
    const groupInfo = {
      name: groupDom.querySelector('.title').innerText,
      url: groupDom.querySelector('.title a').getAttribute('href'),
      pic: groupDom.querySelector('.pic img').getAttribute('src'),
    };
    return groupInfo;
  } catch (error) {
    reload(0);
  }
}
function getData(storeKey, defaultData = []) {
  const cache = localStorage.getItem(storeKey);
  const cacheData =
    cache && typeof cache == 'string' ? JSON.parse(cache) : defaultData;
  return cacheData;
}
function start() {
  const groupInfo = getGroupInfo();
  const storeKey = groupInfo.name;
  if (storeKey) {
    const cacheData = getData(storeKey, []);
    const dataMap = cacheData.reduce((acc, value) => {
      acc[value.url] = value;
      return acc;
    }, {});
    if (cacheData.length >= 4000) {
      console.log('存储超过4000条了');
      upload();
      setTimeout(() => {
        reload(0);
      }, 3000);
      return;
    }
    const query = (location.search || '')
      .slice(1)
      .split('&')
      .reduce((acc, query) => {
        const [name, value] = query.split('=');
        acc[name] = value;
        return acc;
      }, {});
    if (query.start === undefined) {
      query.start = 0;
    }
    if (query.start >= 0) {
      getPost({ query, cacheData, dataMap, storeKey });
    }
  }
}
window.addEventListener('load', () => {
  console.log('from content');
  const isStartTimer = +sessionStorage.getItem('isStartTimer');
  buildDom(isStartTimer);
  if (isStartTimer == 1) {
    setTimeout(start, 300);
  }
});

function delay(time = 100) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}
async function getPost({ cacheData, query, dataMap, storeKey }) {
  const loop = () => {
    const list = Array.from(document.querySelectorAll('.olt tr'))
      .slice(1)
      .map(tr => {
        const lastDate = tr.querySelector('[nowrap].time').innerText;
        let transformDate = lastDate.match(/(\d+)-(\d+)\s+(\d+):(\d+)/);
        let tmpDate = null;
        if (transformDate) {
          const [mon, date, hour, min] = transformDate.slice(1, 5).map(e => +e);
          tmpDate = new Date();
          tmpDate.setMonth(mon - 1);
          tmpDate.setDate(date);
          tmpDate.setHours(hour);
          tmpDate.setMinutes(min);
        }
        return {
          url: tr.querySelector('.title a').getAttribute('href'),
          title: tr.querySelector('.title a').getAttribute('title'),
          auth: tr.querySelector('[nowrap] a').innerText,
          authUrl: tr.querySelector('[nowrap] a').getAttribute('href'),
          commentCount: +(tr.querySelector('[nowrap].r-count ').innerText || 0),
          lastDate: lastDate,
          lastDateTime: tmpDate ? tmpDate.getTime() : 0,
        };
      });
    return list;
  };
  const pageData = loop();
  if (pageData.length === 0) {
  } else {
    saveData({ cacheData, dataMap, list: pageData, storeKey });
    await delay(3500 + Math.ceil(Math.random() * 1000));
    const count = +query.start + 25;
    reload(count);
  }
}
function reload(count) {
  const next = +(sessionStorage.getItem('isStartTimer') || 0);
  if (next == 1) {
    location.href = location.href
      .split('?')
      .slice(0, 1)
      .concat(['start=' + count])
      .join('?');
  }
}

function saveData({ cacheData, dataMap, list, storeKey }) {
  list.map(post => {
    if (!dataMap[post.url]) {
      cacheData.push(post);
    } else {
      const idx = cacheData.findIndex(e => e.url === post.url);
      if (idx != -1) {
        const activeItem = cacheData[idx];
        if (post.lastDateTime > activeItem.lastDateTime) {
          cacheData[idx] = post;
        }
      }
    }
  });
  cacheData.sort((a, b) => b.lastDateTime - a.lastDateTime);
  localStorage.setItem(storeKey, JSON.stringify(cacheData.slice(0, 4000)));
}

function send(data) {
  return new Promise((resolve, reject) => {
    // content_scripts ----- msg --> bg
    chrome.runtime.sendMessage(data, function(response) {
      response && response.error
        ? reject(response.error)
        : resolve(response.data);
    });
  });
}
// content_scripts get msg from bg
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  const message = request.message || {};
  const fn = Handlers.get(message);
  fn && fn(request.data, sender, sendResponse);
  console.log(
    'onRequest==>',
    sender.tab ? '来自内容脚本：' + sender.tab.url : '来自应用',
  );
});

var Handlers = new Map().set('Upload1', (data, sender, sendResponse) => {
  console.log(data);
});
