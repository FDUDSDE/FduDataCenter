<template>
  <div class="container">
    <Breadcrumb :items="['menu.list', 'menu.list.searchTable']" />
    <a-card class="general-card" :style="{ marginBottom: '20px', height: '150px' }" :body-style="{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }" :title="$t('menu.list.searchTable')">
      <div :style="{
        display: 'flex', marginLeft: '360px'
      }">
        <span
          :style="{ display: 'flex', alignItems: 'center', color: '#1D2129', marginRight: '20px', fontSize: '24px'}">
          <a-typography-text>数据智搜</a-typography-text>
        </span>
        <a-select v-model="typeOption" :options="['字段', '部门']" :style="{ width: '80px' }" placeholder="字段" />
        <a-input-search v-model="keywords" @search="onSearch" :style="{ width: '620px', height: '50px', }" placeholder="工号、姓名、国籍..." />
      </div>
    </a-card>

    <a-card class="general-card" :title="$t('数据预览')" :style="{ height: '850px' }">
      <a-row style="margin-bottom: 16px">
        {{tips}}
      </a-row>

      <a-tabs v-model:active-key="tabKey" @tab-click="tabChange" :key="tabsKey">
        <a-tab-pane v-for="key in titleKeys" :key="key" :title="titles[key]" >
          <a-table row-key="id" :loading="loading"
            :columns="(cloneColumns as TableColumnData[])" :data="renderData" :bordered="false" :size="size"
          >
          </a-table>
        </a-tab-pane>
      </a-tabs>

      <a-row style="margin-top: 30px">

        <span style="margin-left: 1320px">

          <router-link style="text-decoration: none" to='/list/success'>
            <a-button type="primary">提交申请</a-button>
          </router-link>

          <a-button type="outline" :style="{ marginLeft: '40px',}" >加入申请列表</a-button>

        </span>
      </a-row>

    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, watch, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import useLoading from '@/hooks/loading';
import { queryPolicyList, PolicyRecord, PolicyParams } from '@/api/list';
import { Pagination } from '@/types/global';
import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import cloneDeep from 'lodash/cloneDeep';
import Sortable from 'sortablejs';
import axios from 'axios';
import { isTemplateElement } from '@babel/types';
import qs from 'query-string';
import { color } from 'echarts';
import { isEmpty } from 'lodash';

type SizeProps = 'mini' | 'small' | 'medium' | 'large';
type Column = TableColumnData & { checked?: true };
const tabKey = ref('1')
const tabsKey = ref(0)
const tips = ref('以下展示所有可申请的数据表示例：')
const keywords = ref()
const typeOption = ref('字段')
let titles:any = reactive({
  1: '教师基本信息',
  2: '发表论文情况',
  3: '基金项目信息'
})
let titleKeys:any = reactive(['1', '2', '3'])
const allTitles:any = {
  1: '教师基本信息',
  2: '发表论文情况',
  3: '基金项目信息'
}
const cols = [
  ['工号', '姓名', '性别', '年龄', '国籍', '民族', '出生地', '单位名称', '专业技术职务名称', '职称级别'],
  ['论文标题', '期刊名称', '工号', '出版年份'],
  ['项目编号', '项目性质', '项目名称', '工号', '姓名', '项目分类', '履行合同金额', '立项时间']
]
const generateFormModel = () => {
  return {
    number: '',
    name: '',
    contentType: '',
    filterType: '',
    createdTime: [],
    status: '',
  };
};
const { loading, setLoading } = useLoading(true);
const { t } = useI18n();
const renderData = ref<PolicyRecord[]>([]);
const formModel = ref(generateFormModel());
const cloneColumns = ref<Column[]>([]);
const showColumns = ref<Column[]>([]);


const size = ref<SizeProps>('mini');

const basePagination: Pagination = {
  current: 1,
  pageSize: 10,
};
const pagination = reactive({
  ...basePagination,
});
const densityList = computed(() => [
  {
    name: t('searchTable.size.mini'),
    value: 'mini',
  },
  {
    name: t('searchTable.size.small'),
    value: 'small',
  },
  {
    name: t('searchTable.size.medium'),
    value: 'medium',
  },
  {
    name: t('searchTable.size.large'),
    value: 'large',
  },
]);

const tabChange = async (key: any) => {
  console.log('tabChange', key)
  await fetchData({ current: 1, pageSize: 10, key })
}

const onSearch = async (value: any) => {
  console.log(tabKey.value, value)
  console.log(typeOption, keywords)
  if (isEmpty(value)) {
    tips.value = '以下展示所有可申请的数据表示例：'
    titleKeys = ['1', '2', '3']
    titles = allTitles
    tabKey.value = '1'
    await fetchData({ current: 1, pageSize: 10, key: tabKey.value})
  } else {
    tips.value = `以下为包含${typeOption.value}为“${keywords.value}”的数据表示例：`
    if (typeOption.value === '字段') {
      const resList: number[] = []
      cols.forEach((element, index) => {
        element.forEach(e => {
          if (e === keywords.value) {
            resList.push(index+1)
          }
        })
      });
      console.log(resList)
      const tmpTitles: any = {}
      resList.forEach(e => {
        tmpTitles[e] = allTitles[e]
      })
      console.log(tmpTitles)
      titles = tmpTitles
      console.log(titles)
      titleKeys = Object.keys(titles)
      console.log(titleKeys)
      if (isEmpty(resList)) {
        renderData.value = []
      } else {
        await fetchData({ current: 1, pageSize: 10, key: resList[0]})
        tabKey.value = '1'
      }
    } else {
      titleKeys = ['1', '2', '3']
      titles = allTitles
      tabKey.value = '1'
      await fetchData({ current: 1, pageSize: 10, key: tabKey.value})
    }
  }
  tabsKey.value += 1
}

const columns = ref<TableColumnData[]>([])
const contentTypeOptions = computed<SelectOptionData[]>(() => [
  {
    label: t('searchTable.form.contentType.img'),
    value: 'img',
  },
  {
    label: t('searchTable.form.contentType.horizontalVideo'),
    value: 'horizontalVideo',
  },
  {
    label: t('searchTable.form.contentType.verticalVideo'),
    value: 'verticalVideo',
  },
]);
const nameOptions = computed<SelectOptionData[]>(() => [
  {
    label: t('searchTable.form.name.one'),
    value: '应用1',
  },
  {
    label: t('searchTable.form.name.two'),
    value: '应用2',
  },
  {
    label: t('searchTable.form.name.three'),
    value: '应用3',
  },
  {
    label: t('searchTable.form.name.four'),
    value: '应用4',
  },
]);
const statusOptions = computed<SelectOptionData[]>(() => [
  {
    label: t('searchTable.form.name.three'),
    value: '应用3',
  },
  {
    label: t('searchTable.form.name.four'),
    value: '应用4',
  },
]);
const fetchData = async (
  params: any = { current: 1, pageSize: 10, key: 1, value: '' }
) => {
  setLoading(true);
  try {
    const { data: { list, total } } = await axios.get('/api/search', {
      params,
      paramsSerializer: (obj) => {
        return qs.stringify(obj);
      },
    });
    console.log(list)
    renderData.value = list;

    pagination.current = params.current;
    pagination.total = total;

    columns.value = list[0].map((item: any) => ({ title: item, dataIndex: item, width: 140, }))

    let start = 30
    let end = 40
    if (typeOption.value==='部门' && keywords.value==='计算机科学技术学院') {
      start = 1
      end = 11
    }
    if (typeOption.value==='部门' && keywords.value==='微电子学院') {
      start = 11
      end = 21
    }
    renderData.value = list.slice(start, end).map((row: { [x: string]: any; }, index: any) => {
      const obj: any = {}
      for (let i = 0; i < list[0].length; i += 1) {
        const key = list[0][i]
        obj[key] = row[i]
      }
      return obj
    })
    // console.log(renderData)
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false);
  }
};

const search = () => {
  fetchData({
    ...basePagination,
    ...formModel.value,
  } as unknown as PolicyParams);
};
const onPageChange = (current: number) => {
  console.log('page change')
  fetchData({ ...basePagination, current });
};

fetchData();
const reset = () => {
  formModel.value = generateFormModel();
};

const handleSelectDensity = (
  val: string | number | Record<string, any> | undefined,
  e: Event
) => {
  size.value = val as SizeProps;
};

const handleChange = (
  checked: boolean | (string | boolean | number)[],
  column: Column,
  index: number
) => {
  if (!checked) {
    cloneColumns.value = showColumns.value.filter(
      (item) => item.dataIndex !== column.dataIndex
    );
  } else {
    cloneColumns.value.splice(index, 0, column);
  }
};

const exchangeArray = <T extends Array<any>>(
  array: T,
  beforeIdx: number,
  newIdx: number,
  isDeep = false
): T => {
  const newArray = isDeep ? cloneDeep(array) : array;
  if (beforeIdx > -1 && newIdx > -1) {
    // 先替换后面的，然后拿到替换的结果替换前面的
    newArray.splice(
      beforeIdx,
      1,
      newArray.splice(newIdx, 1, newArray[beforeIdx]).pop()
    );
  }
  return newArray;
};

const popupVisibleChange = (val: boolean) => {
  if (val) {
    nextTick(() => {
      const el = document.getElementById('tableSetting') as HTMLElement;
      const sortable = new Sortable(el, {
        onEnd(e: any) {
          const { oldIndex, newIndex } = e;
          exchangeArray(cloneColumns.value, oldIndex, newIndex);
          exchangeArray(showColumns.value, oldIndex, newIndex);
        },
      });
    });
  }
};

watch(
  () => columns.value,
  (val) => {
    cloneColumns.value = cloneDeep(val);
    cloneColumns.value.forEach((item, index) => {
      item.checked = true;
    });
    showColumns.value = cloneDeep(cloneColumns.value);
  },
  { deep: true, immediate: true }
);
</script>

<script lang="ts">
export default {
  name: 'SearchTable',
};

function getCurrentInstance(): { ctx: any; proxy: any; } {
throw new Error('Function not implemented.');
}
</script>


<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}

:deep(.arco-table-th) {
  &:last-child {
    .arco-table-th-item-title {
      margin-left: 16px;
    }
  }
}

.action-icon {
  margin-left: 12px;
  cursor: pointer;
}

.active {
  color: #0960bd;
  background-color: #e3f4fc;
}

.setting {
  display: flex;
  align-items: center;
  width: 200px;

  .title {
    margin-left: 12px;
    cursor: pointer;
  }
}
</style>
