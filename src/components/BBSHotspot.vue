<template>
    <div class="hotspot">
        <h3>热榜 > </h3>
        <ul v-for="(h,index) in hotspotList" :key="index">
            <li @click="articleDetails(h.articleId)">
				<span>{{index+1}}</span> {{h.articleTitle}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "BBSHotspot",
    props:{
        hotspotList:{
            type:Array,
            required:true
        }
    },
	methods:{
		articleDetails(articleId){
			this.$router.push({path:`/articleDetails/articleId/${articleId}`})
		}
	}

}
</script>

<style scoped>
    .hotspot{
        display: flex;
        flex-direction: column;
        /*border: whitesmoke solid 2px;*/
    }
    .hotspot h3{
        padding: 6px 0;
        border-bottom:whitesmoke solid 1px;
    }
    .hotspot h3:hover{
        cursor: pointer;
        color: skyblue;
    }
    .hotspot ul{
        margin-left: 20px;
    }
    .hotspot ul li{
        list-style-type: none;
        padding: 10px 0;
        font-size: 15px;
        /*使li 标签文字换行时不与圆点对齐*/
        text-indent: -1.5em;
    }
    .hotspot ul li:hover{
        cursor: pointer;
        color: skyblue;
    }
    .hotspot ul li span{
        padding:0px 5px;
        border-radius: 4px;
        background-color: #a1daf1;
        color: white;
    }
</style>