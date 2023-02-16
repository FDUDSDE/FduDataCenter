import Mock from 'mockjs';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';
import { PostData } from '@/types/global';

setupMock({
  setup() {
    Mock.mock(
      new RegExp('/api/public-opinion-analysis'),
      (params: PostData) => {
        const { quota = 'visitors' } = JSON.parse(params.body);
        if (['visitors'].includes(quota)) {
          const year = new Date().getFullYear();
          const getLineData = (name: number) => {
            return new Array(12).fill(0).map((_item, index) => ({
              x: `${index + 1}月`,
              y: Mock.Random.natural(0, 100),
              name: String(name),
            }));
          };
          // console.log([...getLineData(year), ...getLineData(year - 1)])
          return successResponseWrap({
            count: 1896,
            growth: 16.32,
            chartData: [
              {
                  "x": "1月",
                  "y": 28,
                  "name": "2023"
              },
              {
                  "x": "2月",
                  "y": 25,
                  "name": "2023"
              },
              {
                  "x": "3月",
                  "y": 49,
                  "name": "2023"
              },
              {
                  "x": "4月",
                  "y": 56,
                  "name": "2023"
              },
              {
                  "x": "5月",
                  "y": 50,
                  "name": "2023"
              },
              {
                  "x": "6月",
                  "y": 66,
                  "name": "2023"
              },
              {
                  "x": "7月",
                  "y": 61,
                  "name": "2023"
              },
              {
                  "x": "8月",
                  "y": 60,
                  "name": "2023"
              },
              {
                  "x": "9月",
                  "y": 60,
                  "name": "2023"
              },
              {
                  "x": "10月",
                  "y": 85,
                  "name": "2023"
              },
              {
                  "x": "11月",
                  "y": 81,
                  "name": "2023"
              },
              {
                  "x": "12月",
                  "y": 96,
                  "name": "2023"
              },
              {
                  "x": "1月",
                  "y": 95,
                  "name": "2022"
              },
              {
                  "x": "2月",
                  "y": 131,
                  "name": "2022"
              },
              {
                  "x": "3月",
                  "y": 89,
                  "name": "2022"
              },
              {
                  "x": "4月",
                  "y": 104,
                  "name": "2022"
              },
              {
                  "x": "5月",
                  "y": 99,
                  "name": "2022"
              },
              {
                  "x": "6月",
                  "y": 82,
                  "name": "2022"
              },
              {
                  "x": "7月",
                  "y": 113,
                  "name": "2022"
              },
              {
                  "x": "8月",
                  "y": 133,
                  "name": "2022"
              },
              {
                  "x": "9月",
                  "y": 128,
                  "name": "2022"
              },
              {
                  "x": "10月",
                  "y": 133,
                  "name": "2022"
              },
              {
                  "x": "11月",
                  "y": 72,
                  "name": "2022"
              }
          ],
          });
        }
        if (['comment'].includes(quota)) {
          return successResponseWrap({
            count: 58.6,
            chartData: [{ name: '正高级', value: 100, itemStyle: { color: '#8D4EDA' } }]
          })
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
            count: 5200,
            growth: 10.00,
            chartData: [
              {
                  "x": "1月",
                  "y": 316,
                  "name": "2023"
              },
              {
                  "x": "2月",
                  "y": 355,
                  "name": "2023"
              },
              {
                  "x": "3月",
                  "y": 378,
                  "name": "2023"
              },
              {
                  "x": "4月",
                  "y": 337,
                  "name": "2023"
              },
              {
                  "x": "5月",
                  "y": 285,
                  "name": "2023"
              },
              {
                  "x": "6月",
                  "y": 269,
                  "name": "2023"
              },
              {
                  "x": "7月",
                  "y": 337,
                  "name": "2023"
              },
              {
                  "x": "8月",
                  "y": 327,
                  "name": "2023"
              },
              {
                  "x": "9月",
                  "y": 353,
                  "name": "2023"
              },
              {
                  "x": "10月",
                  "y": 390,
                  "name": "2023"
              },
              {
                  "x": "11月",
                  "y": 406,
                  "name": "2023"
              },
              {
                  "x": "12月",
                  "y": 457,
                  "name": "2023"
              },
              {
                  "x": "1月",
                  "y": 550,
                  "name": "2022"
              },
              {
                  "x": "2月",
                  "y": 434,
                  "name": "2022"
              }
          ],
          });
        }
        return successResponseWrap({
          count: 132,
          growth: 13.32,
          chartData: [
            // itemStyle for demo
            { name: '男', value: 84.8, itemStyle: { color: '#8D4EDA' } },
            { name: '女', value: 15.2, itemStyle: { color: '#065D0F' } },
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



    Mock.mock(new RegExp('/api/content-publish-copy'), () => {
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
        {
            "name": "纯文本",
            "x": [
            "2000", "2001", "2002", "2003", "2004",
            "2005", "2006", "2007", "2008",
            "2009","2010","2011","2012","2013","2014","2015","2016",
                "2017",
                "2018",
                "2019",
                "2020",
                "2021",
                "2022"
            ],
            "y": [
                19,
                16,
                26,
                28,
                34,45,32,41,43,54,58,60,65,84,58,76,70,52,77,87,79,89,44
            ]
        },
        {
            "name": "图文类",
            "x": [
              "2000", "2001", "2002", "2003", "2004",
              "2005", "2006", "2007", "2008",
              "2009","2010","2011","2012","2013","2014","2015","2016",
                  "2017",
                  "2018",
                  "2019",
                  "2020",
                  "2021",
                  "2022"
              ],
            "y": [
                9,9,23,28,16,21,29,19,17,31,23,36,39,47,31,28,29,30,36,46,44,44,28
            ]
        }
    ]);
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
      console.log([
        generateLineData('纯文本'),
        generateLineData('图文类'),
      ])
      return successResponseWrap([
        {
            "name": "纯文本",
            "x": [
            "2009","2010","2011","2012","2013","2014","2015","2016",
                "2017",
                "2018",
                "2019",
                "2020",
                "2021",
                "2022"
            ],
            "y": [
                200,
                192,
                191,
                175,
                151,
                163,
                200,
                186,
                193,
                189,
                240,
                257,
                358,
                272
            ]
        },
        {
            "name": "图文类",
            "x": [
            "2009","2010","2011","2012","2013","2014","2015","2016",
                "2017",
                "2018",
                "2019",
                "2020",
                "2021",
                "2022"
            ],
            "y": [
                116,
                163,
                187,
                162,
                134,
                106,
                137,
                141,
                160,
                201,
                166,
                200,
                192,
                162
            ]
        }
    ]);
    });

    Mock.mock(new RegExp('/api/popular-author/list'), () => {
      const generateData = () => {
        // const list = new Array(7).fill(0).map((_item, index) => ({
        //   ranking: index + 1,
        //   author: Mock.mock('@cname(3)'),
        //   contentCount: Mock.mock(/[0-9]{2}/),
        //   clickCount: Mock.mock(/[0-9]{3}/),
        // }));
        const list = [
          {
            ranking: 1,
            author: '张****',
            contentCount: 557,
          },
          {
            ranking: 2,
            author: '周****',
            contentCount: 325,
          },
          {
            ranking: 3,
            author: '叶****',
            contentCount: 253,
          },
          {
            ranking: 4,
            author: '黄****',
            contentCount: 248,
          },
          {
            ranking: 5,
            author: '丁****',
            contentCount: 244,
          },
          {
            ranking: 6,
            author: '薛****',
            contentCount: 235,
          },
          {
            ranking: 7,
            author: '周****',
            contentCount: 217,
          },
        ]
        return {
          list,
        };
      };
      return successResponseWrap({
        ...generateData(),
      });
    });

    Mock.mock(new RegExp('/api/popular-author-copy/list'), () => {
      const generateData = () => {
        // const list = new Array(7).fill(0).map((_item, index) => ({
        //   ranking: index + 1,
        //   author: Mock.mock('@cname(3)'),
        //   contentCount: Mock.mock(/[0-9]{2}/),
        //   clickCount: Mock.mock(/[0-9]{3}/),
        // }));
        const list = [
          {
            ranking: 1,
            author: '曾****',
            contentCount: 79,
          },
          {
            ranking: 2,
            author: '薛****',
            contentCount: 67,
          },
          {
            ranking: 3,
            author: '周****',
            contentCount: 58,
          },
          {
            ranking: 4,
            author: '肖****',
            contentCount: 51,
          },
          {
            ranking: 5,
            author: '金****',
            contentCount: 48,
          },
          {
            ranking: 6,
            author: '曾****',
            contentCount: 47,
          },
          {
            ranking: 7,
            author: '杨****',
            contentCount: 44,
          },
        ]
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
