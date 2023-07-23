import axios from 'axios';
import cheerio from 'cheerio';
import { ArticleModel } from '../models/article.js';
import { trainModel, classifyText } from './classify.js';

await trainModel();

async function fetchUrl(url) {
  const headers = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
  };
  const response = await axios.get(url, { headers });
  return response.data;
}
 
// 获取当日报纸版面链接
function getPageList(year, month, day) {
  const url = `http://paper.people.com.cn/rmrb/html/${year}-${month}/${day}/nbs.D110000renmrb_01.htm`;
  return fetchUrl(url)
    .then(html => {
      const $ = cheerio.load(html);
      const temp = $('#pageList');
      let pageList;
      if (temp.length > 0) {
        pageList = temp.find('ul > li > div.right_title-name');
      } else {
        pageList = $('.swiper-container').find('.swiper-slide');
      }
      const linkList = [];
      pageList.each((i, el) => {
        const link = $(el).find('a').attr('href');
        const url = `http://paper.people.com.cn/rmrb/html/${year}-${month}/${day}/${link}`;
        linkList.push(url);
      });
      return linkList;
    });
}



// 获取报纸某版面文章链接
function getTitleList(year, month, day, pageUrl) {
  return fetchUrl(pageUrl)
    .then(html => {
      const $ = cheerio.load(html);
      const temp = $('#titleList');
      let titleList;
      if (temp.length > 0) {
        titleList = temp.find('ul > li');
      } else {
        titleList = $('.news-list').find('li');
      }
      const linkList = [];
      titleList.each((i, el) => {
        const tempList = $(el).find('a');
        tempList.each((i, el) => {
          const link = $(el).attr('href');
          if (link.includes('nw.D110000renmrb')) {
            const url = `http://paper.people.com.cn/rmrb/html/${year}-${month}/${day}/${link}`;
            linkList.push(url);
          }
        });
      });
      return linkList;
    });
}

// 解析HTML网页，获取新闻的文章内容
async function getContent(html) {
  const $ = cheerio.load(html);
  const title = $('h3').text() + '\n' + $('h1').text() + '\n' + $('h2').text() + '\n';
  // const title =  $('h1').text() ;
  // console.log(title,'title')
  const pList = $('#ozoom').find('p');
  if(pList.text()==='')
  {
    return
  }
  let content = '';
  pList.each((i, el) => {
    content +='<p>'+ $(el).text() + '</p>';;
  });
  const category = await classifyText(title);
  const article = {
    title:title,
    content:content,
    tags:category||'综合'
  }
  return article;
}


function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return [year, month, day];
}



export async function crawler_rmrb() {
  const [year, month, day] = getCurrentDate();
  console.log('开始抓取');
  const pageList = await getPageList(year, month, day); // 获取当日版面
  const articleList = [];

  for (const page of pageList) {
    const titleList = await getTitleList(year, month, day, page);
    for (const title of titleList) {
      const article = await fetchUrl(title);
      let content = await getContent(article);
      // console.log(content.title)
      content && articleList.push(content);
    }
  }

  console.log("抓取完成，开始存储");

  const savePromises = articleList.map(async (article) => {
    const item = new ArticleModel({
      title: article.title,
      content: article.content,
      tags: article.tags
    });
    await item.save();
  });

  await Promise.all(savePromises);
  console.log("存储完成");

}
