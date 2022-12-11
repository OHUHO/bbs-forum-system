<template>
	<div class="collection-wrapper">
		<div class="collection">
			<h2 class="title">我的收藏夹</h2>
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
	name: "BBSCollection",
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
			this.getRequest("/getMyCollection?userId="+ userId).then(resp=>{
				if (resp){
					this.articleList = resp
				}
			})
		}
	}
}
</script>

<style scoped>
.collection-wrapper {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin-bottom: 80px;
}

.collection {
	display: flex;
	flex-direction: column;
	width: 1200px;
	/*height: 100px;*/
	/*background-color: #55a532;*/
	margin-top: 4px;
}
.title{
	color: #8d8b8b;
	line-height: 60px;
}

</style>