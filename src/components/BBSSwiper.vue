<template>
    <div class="block">
        <el-carousel height="292px">
            <el-carousel-item v-for="s in swiperList" :key="s.slideshowId">
                <img class="small" :src="s.imageUrl">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    name: "BBSSwiper",
    props:{
        swiperList:{
            type:Array,
            required:true
        },
    },
}
</script>

<style scoped>
    .block{
        width: 520px;
        height: 292px;
    }
    .small{
        width: 520px;
        height: 292px;
        border-radius: 8px;
    }

</style>