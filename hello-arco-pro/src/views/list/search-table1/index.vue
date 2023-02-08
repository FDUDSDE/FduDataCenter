<template>
    <div class="container">
        <Breadcrumb :items="['数据检索', '高级检索']" />
        <a-card class="general-card" :style="{ marginBottom: '20px', height: '1000px' }" :title="$t('高级检索')">
            <a-row style="margin-top: -15px">
                <span style="margin-left: 30px">
                    <a-image width="1100"  height="900"
                        src="../src/assets/images/高级检索.png" />
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