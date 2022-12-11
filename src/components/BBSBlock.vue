<template>
    <div class="image">
        <img :src="advertisingImage">
        <div class="image-text">
            <img :src="grandRecommend[0].imageUrl">
            <h4>{{grandRecommend[0].title}}</h4>
        </div>
    </div>
</template>

<script>
export default {
    name: "BBSBlock",
    props:{
        advertisingImage:{
            type:String,
            required:true
        },
        grandRecommend:{
            type:Array,
            required:true
        }
    }
}
</script>

<style scoped>
    .image img{
        width: 300px;
        border-radius: 10px;
    }
    .image-text{
        border-bottom: whitesmoke solid 2px;
        margin: 10px 0px;
    }
    h4{
        margin: 8px 0;
        color: #757474;
    }
    h4:hover{
        cursor: pointer;
        color: skyblue;
    }
</style>