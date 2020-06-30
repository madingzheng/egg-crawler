import { Controller } from 'egg';
import { resultJson } from '../util/returnjson';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }

  public async getArticleList() {
    const { ctx } = this;
    const data = await ctx.service.test.getArticleList();
    ctx.body = resultJson.success(data);
  }

  public async getArticleInfos() {
    const { ctx } = this;
    const data = await ctx.service.test.getArticleInfos();
    ctx.body = resultJson.success(data);
  }
}
