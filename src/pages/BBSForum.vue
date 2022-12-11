<template>
	<div class="forum">
		<div class="forum-box">
			<!--左侧-->
			<div class="forum-box-left">
				<div class="forum-box-left-header">
					<BBSSwiper :swiper-list="swiperList"/>
					<BBSRecommend :recommend-list="recommendList"/>
				</div>
				<div class="forum-box-left-area">
					<BBSArea
						areaHeader="推荐文章"
						:imageUrl="areaList[0].imageUrl"
						:imageTitle="areaList[0].imageTitle"
						:areaArticle="recommend"
						class="area"
					/>
					<BBSArea
						areaHeader="精品社区"
						:imageUrl="areaList[1].imageUrl"
						:imageTitle="areaList[1].imageTitle"
						:areaArticle="community"
						class="area"
					/>
					<BBSArea
						areaHeader="最新文章"
						:imageUrl="areaList[2].imageUrl"
						:imageTitle="areaList[2].imageTitle"
						:areaArticle="newest"
						class="area"
					/>
				</div>
				<div class="forum-box-left-article" v-for="a in articleList" :key="a.id">
					<BBSArticle
						:articleId="a.articleId"
						:title="a.articleTitle"
						:image-url="a.articleImage"
						:summary="a.articleSummary"
						:author="a.articleAuthor"
						:good-num="a.articleGoodNum"
						:view-num="a.articleViewNum"
					/>
				</div>
			</div>
			<!--右侧-->
			<div class="forum-box-right">
				<BBSBlock :advertising-image="advertisingImage" :grand-recommend="grandRecommend"/>
				<BBSHotspot :hotspot-list="hotspotList"/>
			</div>
		</div>
	</div>
</template>

<script>
import BBSSwiper from "@/components/BBSSwiper";
import BBSRecommend from "@/components/BBSRecommend";
import BBSBlock from "@/components/BBSBlock";
import BBSArea from "@/components/BBSArea";
import BBSHotspot from "@/components/BBSHotspot";
import BBSArticle from "@/components/BBSArticle";

export default {
	name: "BBSForum",
	components: {BBSArticle, BBSHotspot, BBSArea, BBSBlock, BBSRecommend, BBSSwiper},
	data() {
		return {
			// 轮播图
			swiperList: [],
			// 中间五条推荐区域
			recommendList: [],
			//右侧广告位和最重要的推荐
			advertisingImage: require('../assets/block.jpg'),
			grandRecommend: [
				{id: 1, title: 'Redis持久化的新解法', imageUrl: require('../assets/block1.jpg')}
			],
			
			// 三块推荐区域
			/*
			* 1、推荐文章：按照文章的点赞数量
			* 2、精品社区：按照社区人数
			* 3、最新文章：按照最新发布时间
			* */
			areaList:[],
			recommend:[],
			community: [
				{id: 1, articleId: 4, articleTitle: '开源领域事件不断  京茶吉鹿景超景超景超景超景超', articleAuthor: '京茶吉鹿'},
				{id: 2, articleId: 6, articleTitle: '人工智能开源录，深入对话OpenI启', articleAuthor: '景超'},
				{id: 3, articleId: 12, articleTitle: 'Python金融衍生品大数据分析 ', articleAuthor: 'JingChao'},
			],
			newest:[],
			
			// 文章列表
			articleList: [],
			// 热榜
			hotspotList: [
				{id: 0, title: '谷歌发布 AlloyDB 数据库服务，炙手可热的 PostgreSQL 成大厂首选'},
				{id: 1, title: '专访腾讯安全副总裁董志强：我们该如何应对愈演愈烈的安全威胁？'},
				{id: 2, title: '从工作了 10 年的谷歌辞职后，我更快乐了'},
				{id: 3, title: 'Twitter 算法开源究竟会是什么样的？'},
				{id: 4, title: '谷歌发布 AlloyDB 数据库服务，炙手可热的 PostgreSQL 成大厂首选'},
				{id: 5, title: 'Flutter 3.0 正式发布：稳定支持 6 大平台，字节跳动是主要用户'},
				{id: 6, title: '谷歌的「AI 帝国」'},
				{id: 7, title: '下月退役！27 年 IE 终落幕，再见 IE，你好 Edge'},
				{id: 8, title: '专访腾讯安全副总裁董志强：我们该如何应对愈演愈烈的安全威胁？'},
				{id: 9, title: '历史上的今天：Java 之父诞生'},
			],
			
		}
	},
	mounted() {
		this.getSlideshow()
		this.getHeaderRecommend()
		this.getArea()
		this.getRecommend()
		this.getCommunity()
		this.getNewest()
		this.getArticleList()
		this.getHotspot()
	},
	methods: {
		/* 轮播图 */
		getSlideshow() {
			this.getRequest("/getSlideshow").then(resp => {
				if (resp) {
					this.swiperList = resp
				}
			})
		},
		/*顶部五条推荐*/
		getHeaderRecommend(){
			this.getRequest("/article/getHeaderRecommend").then(resp =>{
				if (resp){
					this.recommendList = resp
				}
			})
		},
		/*中间三部分 推荐文章、精品社区、最新文章*/
		getArea(){
			this.getRequest("/getArea").then(resp =>{
				if (resp){
					this.areaList = resp
				}
			})
		},
		/*获取推荐文章*/
		getRecommend(){
			this.getRequest("/article/getRecommend").then(resp =>{
				if(resp){
					this.recommend = resp
				}
			})
		},
		/*获取精品社区*/
		getCommunity() {
			/*this.getRequest("").then(resp =>{
				if (resp){
					this.community = resp
				}
			})*/
		},
		/*获取最新文章*/
		getNewest(){
			this.getRequest("/article/getNewest").then(resp =>{
				if (resp){
					this.newest = resp
				}
			})
		},
		/*获取文章列表*/
		getArticleList(){
			this.getRequest("/article/getArticle").then(resp =>{
				if (resp){
					this.articleList = resp
				}
			})
		},
		/*获取热榜*/
		getHotspot(){
			this.getRequest("/article/getHot").then(resp =>{
				if (resp){
					this.hotspotList = resp
				}
			})
		}
	}
}
</script>

<style scoped>
.forum {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	align-items: center;
}

.forum-box {
	display: flex;
	flex-direction: row;
	width: 1200px;
	/*background-color: yellow;*/
	margin-top: 20px;
}

.forum-box-left {
	/*display: flex;
	flex-direction: column;
	justify-content: center;*/
	width: 75%;
	float: left;
	/*background-color: red;*/
}

.forum-box-right {
	/*display: flex;
	flex-direction: column;
	justify-content: center;*/
	
	width: 25%;
	/*background-color: green;*/
}

.forum-box-left-header {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding-bottom: 10px;
	border-bottom: whitesmoke solid 1px;
}

.forum-box-left-area {
	display: flex;
	flex-direction: row;
	margin: 20px 0;
}

.area {
	width: 33.333%;
}
</style>
