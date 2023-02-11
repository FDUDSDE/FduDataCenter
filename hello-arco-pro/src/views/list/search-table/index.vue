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
          :style="{ display: 'flex', alignItems: 'center', color: '#1D2129', marginRight: '10px', fontSize: '24px', fontWeight: '500' }">
          <a-typography-text>数据智搜</a-typography-text>
        </span>
        <a-select :options="['全部', '字段', '部门', '类型']" :style="{ width: '80px' }" placeholder="全部" />
        <a-input-search @search="onSearch" :style="{ width: '620px', height: '50px', }" placeholder="职工号、姓名、籍贯" />
      </div>
    </a-card>

    <a-card class="general-card" :title="$t('数据预览')" :style="{ height: '850px' }">
      <a-row style="margin-bottom: 16px">
        以下数据表包含部门“人事处”的相关数据
      </a-row>

      <a-tabs v-model:active-key="tabKey" @tab-click="tabChange" >
        <a-tab-pane v-for="key in ['1', '2', '3']" :key="key" :title="titles[key]" >
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

type SizeProps = 'mini' | 'small' | 'medium' | 'large';
type Column = TableColumnData & { checked?: true };
const tabKey = ref('1')
const titles:any = reactive({
  1: '教师基本信息',
  2: '发表论文情况',
  3: '基金项目信息'
})
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
  console.log(key)
  await fetchData({ current: 1, pageSize: 10, key })
}

const onSearch = async (value: any) => {
  console.log(tabKey.value, value)
  await fetchData({ current: 1, pageSize: 10, key: tabKey.value, value })
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
    renderData.value = list.slice(1, 11).map((row: { [x: string]: any; }, index: any) => {
      const obj: any = {}
      for (let i = 0; i < list[0].length; i += 1) {
        const key = list[0][i]
        obj[key] = row[i]
      }
      return obj
    })
    console.log(renderData)
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
