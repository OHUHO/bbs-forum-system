<template>
    <div>
        <BBSHeader/>
        <!--<BBSLogin/>-->
    </div>
</template>

<script>
    import './assets/iconfont/iconfont.js'
    import BBSHeader from "@/components/BBSHeader";
    export default {
        name: 'App',
        components: {BBSHeader},
    }
</script>

<style>
    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }

    /*设置el-cascader的高度*/
    .el-cascader-panel{
        height: 200px;
    }

</style>
