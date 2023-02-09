import Mock from 'mockjs';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';
import { PostData } from '@/types/global';

setupMock({
  setup() {
    Mock.mock(
      new RegExp('/api/public-opinion-analysis'),
      (params: PostData) => {
        const { quota = 'visitors' } = JSON.parse(params.body);
        if (['visitors', 'comment'].includes(quota)) {
          const year = new Date().getFullYear();
          const getLineData = (name: number) => {
            return new Array(12).fill(0).map((_item, index) => ({
              x: `${index + 1}月`,
              y: Mock.Random.natural(0, 100),
              name: String(name),
            }));
          };
          return successResponseWrap({
            count: 562,
            growth: 16.32,
            chartData: [...getLineData(year), ...getLineData(year - 1)],
          });
        }
        if (['published'].includes(quota)) {
          const year = new Date().getFullYear();
          const getLineData = (name: number) => {
            return new Array(12).fill(0).map((_item, index) => ({
              x: `${index + 1}日`,
              y: Mock.Random.natural(20, 100),
              name: String(name),
            }));
          };
          return successResponseWrap({
            count: 60,
            growth: 10.00,
            chartData: [...getLineData(year)],
          });
        }
        return successResponseWrap({
          count: 170,
          growth: 13.32,
          chartData: [
            // itemStyle for demo
            { name: '计算机学院', value: 25, itemStyle: { color: '#8D4EDA' } },
            { name: '数学学院', value: 35, itemStyle: { color: '#165DFF' } },
            { name: '物理学院', value: 40, itemStyle: { color: '#00B2FF' } },
          ],
        });
      }
    );

    Mock.mock(new RegExp('/api/content-period-analysis'), () => {
      const getLineData = (name: string) => {
        return {
          name,
          value: new Array(5).fill(0).map(() => Mock.Random.natural(30, 90)),
        };
      };
      return successResponseWrap({
        xAxis: new Array(6).fill(0).map((_item, index) => `${index +2017}`),
        data: [
          getLineData('纯文本'),
          getLineData('图文类'),
          getLineData('视频类'),
        ],
      });
    });

    Mock.mock(new RegExp('/api/content-publish'), () => {
      const generateLineData = (name: string) => {
        const result = {
          name,
          x: [] as string[],
          y: [] as number[],
        };
        new Array(6).fill(0).forEach((_item, index) => {
          result.x.push(`${index + 2017}`);
          result.y.push(Mock.Random.natural(300, 800));
        });
        return result;
      };
      return successResponseWrap([
        generateLineData('纯文本'),
        generateLineData('图文类'),
        generateLineData('视频类'),
      ]);
    });

    Mock.mock(new RegExp('/api/popular-author/list'), () => {
      const generateData = () => {
        const list = new Array(7).fill(0).map((_item, index) => ({
          ranking: index + 1,
          author: Mock.mock('@cname(3)'),
          contentCount: Mock.mock(/[0-9]{2}/),
          clickCount: Mock.mock(/[0-9]{3}/),
        }));
        return {
          list,
        };
      };
      return successResponseWrap({
        ...generateData(),
      });
    });
  },
});
