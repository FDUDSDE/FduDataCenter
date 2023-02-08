<template>
    <div class="container">
        <Breadcrumb :items="['数据查询', '高级查询']" />
        <a-card class="general-card" :style="{ marginBottom: '20px', height: '600px' }" :title="$t('高级查询')">
            <a-row style="margin-top: -15px">
                <span style="margin-left: 30px">
                    <a-image width="1100"  height="500"
                        src="../src/assets/images/高级查询.png" />
                </span>
            </a-row>
        </a-card>
    </div>
</template>





<style scoped lang="less">
.container {
    padding: 0 20px 20px 20px;
}
</style>