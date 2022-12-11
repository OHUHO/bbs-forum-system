<template>
	<div class="stat-wrapper">
		<div class="stat">
			<h2 class="title">我的动态</h2>
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
	name: "BBSStat",
	components:{BBSArticle},
	data(){
		return{
			articleList:[],
		}
	},
	mounted() {
		this.getMyCollection()
	},
	methods:{
		getMyCollection(){
			const userId = JSON.parse(window.sessionStorage.getItem('user')).id
			this.getRequest("/article/getArticleByUserId?userId="+ userId).then(resp=>{
				if (resp){
					this.articleList = resp
				}
			})
		}
	}
}
</script>

<style scoped>
.stat-wrapper {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	align-items: center;
}

.stat {
	display: flex;
	flex-direction: column;
	width: 1200px;
	/*background-color: yellow;*/
	margin-top: 20px;
}
.title{
	color: #8d8b8b;
	line-height: 60px;
}

</style>