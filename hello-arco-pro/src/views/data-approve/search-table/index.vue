<template>
  <div class="container">
    <Breadcrumb :items="['数据查询', '便捷查询']" />

    <a-card class="general-card" :style="{ marginBottom: '20px', height: '200px' }" :title="$t('一、数据源选择')">
      <a-row style="margin-top: -15px">
        <span style="margin-left: 30px">
          从以下您已获得的数据集中选择查询的数据源
        </span>
      </a-row>
      <div :style="{ marginTop: '16px', marginLeft: '23px' }">
        <a-checkbox-group :default-value="[1]">
          <template
            v-for="item in [['教师基本信息', 'T_GXJG_JZGJBXX'], ['论文发表信息', 'TGXJG_JSLWFBXX'], ['基金项目信息', 'TGXXMJJXMXX']]"
            :key="item">
            <a-checkbox :value="item">
              <template #checkbox="{ checked }">
                <a-space align="start" class="custom-checkbox-card"
                  :class="{ 'custom-checkbox-card-checked': checked }">
                  <div className="custom-checkbox-card-mask">
                    <div className="custom-checkbox-card-mask-dot" />
                  </div>
                  <div>
                    <div className="custom-checkbox-card-title">
                      {{ item[0]}}
                    </div>
                    <a-typography-text type="secondary">
                      {{ item[1]}}
                    </a-typography-text>
                  </div>
                </a-space>
              </template>
            </a-checkbox>
          </template>
        </a-checkbox-group>
      </div>
    </a-card>


    <a-card class="general-card" :style="{ marginBottom: '20px', height: '150px' }" :title="$t('二、全局搜索')">
      <a-row style="margin-top: -15px">
        <span style="margin-left: 30px">
          从数据源中全局搜素，留空默认获取全部数据
        </span>
      </a-row>

      <a-row style="margin-top: 12px">
        <span style="margin-left: 30px">
          <a-input-search @search="onSearch" :style="{ width: '480px', height: '35px', }" placeholder="张三"
            search-button>
            <template #button-icon>
              <icon-search />
            </template>
            <template #button-default>
              获取数据
            </template>
          </a-input-search>
        </span>
      </a-row>
    </a-card>



    <a-card class="general-card" :style="{ height: '1560px' }" :title="$t('三、数据浏览与筛选')">
      <a-row style="margin-top: -15px">
        <span style="margin-left: 30px">
          可以任意规则进行数据筛选，可对结果数据进行下载或进一步分析
        </span>
      </a-row>

      <a-row style="margin-top: 5px">
        <span style="margin-left: 25px">
          <a-image width="500" height="170" src="../src/assets/images/数据筛选.png" />
        </span>
      </a-row>

      <a-tabs v-model:active-key="tabKey" @tab-click="tabChange">
        <a-tab-pane v-for="key in ['1', '2', '3']" :key="key" :title="titles[key]">
          <a-table row-key="id" :loading="loading" :pagination="pagination"
            :columns="(cloneColumns as TableColumnData[])" :data="renderData" :bordered="false" :size="size"
            @page-change="onPageChange">
          </a-table>
        </a-tab-pane>
      </a-tabs>

      <a-row style="margin-top: 30px">
        
        <span style="margin-left: 1070px">
          
          <router-link style="text-decoration: none" to='/data-approve/data-analysis'>
            <a-button type="outline">下一步分析</a-button>
          </router-link>

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

type SizeProps = 'mini' | 'small' | 'medium' | 'large';
type Column = TableColumnData & { checked?: true };
const tabKey = ref('1')
const titles = reactive({
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


const size = ref<SizeProps>('medium');

const basePagination: Pagination = {
  current: 1,
  pageSize: 15,
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
  await fetchData({ current: 1, pageSize: 15, key })
}

const onSearch = async (value: any) => {
  console.log(tabKey.value, value)
  await fetchData({ current: 1, pageSize: 15, key: tabKey.value, value })
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
  params: any = { current: 1, pageSize: 15, key: 1, value: '' }
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
    renderData.value = list.slice(1, list.length - 1).map((row: { [x: string]: any; }, index: any) => {
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


.custom-checkbox-card {
  padding: 10px 16px;
  border: 1px solid var(--color-border-2);
  border-radius: 4px;
  width: 250px;
  box-sizing: border-box;
}

.custom-checkbox-card-mask {
  height: 14px;
  width: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  border: 1px solid var(--color-border-2);
  box-sizing: border-box;
}

.custom-checkbox-card-mask-dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
}

.custom-checkbox-card-title {
  color: var(--color-text-1);
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
}

.custom-checkbox-card:hover,
.custom-checkbox-card-checked,
.custom-checkbox-card:hover .custom-checkbox-card-mask,
.custom-checkbox-card-checked .custom-checkbox-card-mask {
  border-color: rgb(var(--primary-6));
}

.custom-checkbox-card-checked {
  background-color: var(--color-primary-light-1);
}

.custom-checkbox-card:hover .custom-checkbox-card-title,
.custom-checkbox-card-checked .custom-checkbox-card-title {
  color: rgb(var(--primary-6));
}

.custom-checkbox-card-checked .custom-checkbox-card-mask-dot {
  background-color: rgb(var(--primary-6));
}
</style>