import { Service } from 'egg';
import SuperAgent from 'superagent';
import Cheerio from 'cheerio';

interface ListInfo {
  title: string;
  href: string;
}

interface ArticleInfo {
  info: string;
  title: string;
}
/**
 * Test Service
 */
export default class Test extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async sayHi(name: string) {
    return `hi, ${name}`;
  }

  public async getArticleList() {
    const url = 'https://cnodejs.org';
    const res = await SuperAgent.get(url);
    const $ = Cheerio.load(res.text);
    const list: ListInfo[] = [];
    $('#topic_list .topic_title').each((index, element) => {
      console.log(index);
      const el = $(element);
      list.push(
        {
          title: el.attr('title'),
          href: `${url}${el.attr('href')}`,
        },
      );
    });
    return list;
  }

  public async getArticleInfos() {
    const urls = await this.getArticleUrls();
    const atriclesInfo: ArticleInfo[] = [];
    for (let index = 0; index < urls.length / 2; index++) {
      const articleInfo = await this.getArticle(urls[index]);
      atriclesInfo.push(articleInfo);
    }
    return atriclesInfo;
  }

  public async getArticleUrls() {
    const url = 'https://cnodejs.org';
    const res = await SuperAgent.get(url);
    const $ = Cheerio.load(res.text);
    const urlList: string[] = [];
    $('#topic_list .topic_title').each((index, element) => {
      console.log(index);
      const el = $(element);
      urlList.push(
        `${url}${el.attr('href')}`,
      );
    });
    return urlList;
  }

  public async getArticle(url) {
    console.log('url', url);
    const res = await SuperAgent.get(url);
    const $ = Cheerio.load(res.text);
    const info: string = $('.topic_content').text();
    const title: string = $('.topic_full_title').text();
    const articleInfo: ArticleInfo = {
      info,
      title,
    };
    return articleInfo;
  }

  public async waitTime(senconds) {
    return new Promise(resolve => setTimeout(resolve, senconds * 1000));
  }
}
