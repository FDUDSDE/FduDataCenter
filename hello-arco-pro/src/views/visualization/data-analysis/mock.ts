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
            count: 3492,
            growth: 16.32,
            chartData: [
              {
                  "x": "1月",
                  "y": 35,
                  "name": "2023"
              },
              {
                  "x": "2月",
                  "y": 31,
                  "name": "2023"
              },
              {
                  "x": "3月",
                  "y": 56,
                  "name": "2023"
              },
              {
                  "x": "4月",
                  "y": 74,
                  "name": "2023"
              },
              {
                  "x": "5月",
                  "y": 66,
                  "name": "2023"
              },
              {
                  "x": "6月",
                  "y": 93,
                  "name": "2023"
              },
              {
                  "x": "7月",
                  "y": 94,
                  "name": "2023"
              },
              {
                  "x": "8月",
                  "y": 98,
                  "name": "2023"
              },
              {
                  "x": "9月",
                  "y": 92,
                  "name": "2023"
              },
              {
                  "x": "10月",
                  "y": 152,
                  "name": "2023"
              },
              {
                  "x": "11月",
                  "y": 152,
                  "name": "2023"
              },
              {
                  "x": "12月",
                  "y": 168,
                  "name": "2023"
              },
              {
                  "x": "1月",
                  "y": 176,
                  "name": "2022"
              },
              {
                  "x": "2月",
                  "y": 215,
                  "name": "2022"
              },
              {
                  "x": "3月",
                  "y": 155,
                  "name": "2022"
              },
              {
                  "x": "4月",
                  "y": 179,
                  "name": "2022"
              },
              {
                  "x": "5月",
                  "y": 189,
                  "name": "2022"
              },
              {
                  "x": "6月",
                  "y": 160,
                  "name": "2022"
              },
              {
                  "x": "7月",
                  "y": 200,
                  "name": "2022"
              },
              {
                  "x": "8月",
                  "y": 247,
                  "name": "2022"
              },
              {
                  "x": "9月",
                  "y": 245,
                  "name": "2022"
              },
              {
                  "x": "10月",
                  "y": 280,
                  "name": "2022"
              },
              {
                  "x": "11月",
                  "y": 140,
                  "name": "2022"
              }
          ],
          });
        }
        if (['comment'].includes(quota)) {
          return successResponseWrap({
            count: 50.4,
            chartData: [{ name: '正高级', value: 15.9, itemStyle: { color: '#8D4EDA' } },
            { name: '副高级', value: 13.8, itemStyle: { color: '#065D0F' } },
            { name: '中级', value: 10.1, itemStyle: { color: '#FF5100' } },
            { name: '初级', value: 60.2, itemStyle: { color: '#825101' } }]
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
            count: 8906,
            growth: 10.00,
            chartData: [
              {
                  "x": "1月",
                  "y": 546,
                  "name": "2023"
              },
              {
                  "x": "2月",
                  "y": 607,
                  "name": "2023"
              },
              {
                  "x": "3月",
                  "y": 631,
                  "name": "2023"
              },
              {
                  "x": "4月",
                  "y": 603,
                  "name": "2023"
              },
              {
                  "x": "5月",
                  "y": 517,
                  "name": "2023"
              },
              {
                  "x": "6月",
                  "y": 482,
                  "name": "2023"
              },
              {
                  "x": "7月",
                  "y": 564,
                  "name": "2023"
              },
              {
                  "x": "8月",
                  "y": 526,
                  "name": "2023"
              },
              {
                  "x": "9月",
                  "y": 546,
                  "name": "2023"
              },
              {
                  "x": "10月",
                  "y": 695,
                  "name": "2023"
              },
              {
                  "x": "11月",
                  "y": 662,
                  "name": "2023"
              },
              {
                  "x": "12月",
                  "y": 759,
                  "name": "2023"
              },
              {
                  "x": "1月",
                  "y": 942,
                  "name": "2022"
              },
              {
                  "x": "2月",
                  "y": 810,
                  "name": "2022"
              }
          ],
          });
        }
        return successResponseWrap({
          count: 880,
          growth: 13.32,
          chartData: [
            // itemStyle for demo
            { name: '男', value: 62.6, itemStyle: { color: '#8D4EDA' } },
            { name: '女', value: 37.4, itemStyle: { color: '#065D0F' } },
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
                29,
                22,
                37,
                29,
                30,56,63,66,63,94,105,97,111,155,107,136,144,120,143,163,151,174,86
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
                5,9,16,23,21,27,13,141,17,32,26,38,31,33,24,18,27,20,36,44,69,84,45
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
                350,
                404,
                440,
                397,
                345,
                304,
                390,
                352,
                382,
                491,
                452,
                495,
                502,
                349
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
                74,
                79,
                80,
                99,
                82,
                78,
                98,
                91,
                99,
                136,
                139,
                214,
                370,
                394
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
            author: '孙****',
            contentCount: 69,
          },
          {
            ranking: 3,
            author: '薛****',
            contentCount: 67,
          },
          {
            ranking: 4,
            author: '周****',
            contentCount: 58,
          },
          {
            ranking: 5,
            author: '肖****',
            contentCount: 51,
          },
          {
            ranking: 6,
            author: '金****',
            contentCount: 48,
          },
          {
            ranking: 7,
            author: '曾****',
            contentCount: 47,
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
