/**
 * 青龙脚本任务
 * cron: 7 9 * * *
 */
import axios from 'axios';
import cheerio from 'cheerio';
import './utils/proxy';

const url = {
  missionDaily: 'https://www.v2ex.com/mission/daily',
  missionDailyRedeem: 'https://www.v2ex.com/mission/daily/redeem',
};

const RedeemRegExp = /\/mission\/daily\/redeem\?once=(\d+)/;

const { V2EX_COOKIE } = process.env;

async function main() {
  console.log('开始...');
  const { data } = await axios.get(url.missionDaily, {
    headers: {
      cookie: V2EX_COOKIE,
    },
  });

  const $ = cheerio.load(data);
  const $button = $('#Main input[type="button"][onclick]');
  const onclick = $button.attr('onclick');

  const [, once] = onclick?.match(RedeemRegExp) || [];

  if (!once) {
    throw new Error(
      '签到失败: 没有获取到once参数，请检查环境变量 V2EX_COOKIE 与脚本',
    );
  }

  const missionDailyRedeemUrl = `${url.missionDailyRedeem}?once=${once}`;

  console.log('missionDailyRedeemUrl:', missionDailyRedeemUrl);

  const { data: missionDailyRedeemResult } = await axios.get(
    missionDailyRedeemUrl,
    {
      headers: {
        cookie: V2EX_COOKIE,
      },
    },
  );

  const $2 = cheerio.load(missionDailyRedeemResult);

  if (!$2('#Main span.gray li.fa-ok-sign').parent().text().includes('每日登录奖励已领取')) {
    throw new Error('签到失败: 获取签到结果失败');
  }

  console.log('签到成功');
}

main();
