<template>
	<div class="search-wrapper">
		<div class="search">
			<div class="empty" v-if="articleList == null">
				<img class="empty-image" src="../assets/no.png">
			</div>
			<div v-for="a in articleList" :key="a.id">
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
	</div>
</template>

<script>
import BBSArticle from "@/components/BBSArticle";

export default {
	name: "BBSSearchPage",
	components:{BBSArticle},
	data(){
		return{
			keywords:this.$route.params.keywords,
			articleList:[],
		}
	},
	mounted() {
		this.getArticleByKeywords(this.keywords)
	},
	methods:{
		getArticleByKeywords(keywords){
			this.getRequest("/article/getArticleByKeywords?keywords=" + keywords).then(resp=>{
				if (resp){
					this.articleList = resp
				}
			})
		}
	}
}
</script>

<style scoped>

.search-wrapper {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	align-items: center;
}

.search {
	display: flex;
	flex-direction: column;
	width: 1200px;
	min-height: 600px;
	/*background-color: yellow;*/
	margin-top: 20px;
}
.empty{
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.empty-image{
	/*background-color: red;*/
}

</style>