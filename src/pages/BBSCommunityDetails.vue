<template>
	<div class="community-wrapper">
		<div class="community">
			<el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
				<el-tab-pane label="最新发布" name="first">
					<div class="content">
						<div class="article-wrapper">
							<div class="article" v-for="a in newArticleList" :key="a.id">
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
				</el-tab-pane>
				<el-tab-pane label="最热文章" name="third">
					<div class="content">
						<div class="article-wrapper">
							<div class="article" v-for="a in hotArticleList" :key="a.id">
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
				</el-tab-pane>
			</el-tabs>
			<el-button class="join-btn" size="small" @click="joinCommunity">加入社区</el-button>
		</div>
	</div>
</template>

<script>
import BBSArticle from "@/components/BBSArticle";
export default {
	name: "BBSCommunityDetails",
	components: {BBSArticle},
	data(){
		return{
			communityId:this.$route.params.communityId,
			activeName: 'first',
			newArticleList:[],
			hotArticleList:[],
		}
	},
	mounted() {
		this.getArticleByCommunityIdAndOrderByDesc(this.$route.params.communityId)
	},
	
	methods:{
		
		handleClick(tab, event) {
			//console.log(tab, event);
			if (this.activeName === 'first'){
				console.log('1')
				this.getArticleByCommunityIdAndOrderByDesc(this.communityId)
			} else{
				console.log('2')
				this.getArticleByHotAndOrderByDesc(this.communityId)
			}
		},
		getArticleByCommunityIdAndOrderByDesc(communityId){
			this.getRequest(`/article/getArticleByCommunityId/${communityId}`).then(resp=>{
				if (resp){
					this.newArticleList = resp
				}
			})
		},
		getArticleByHotAndOrderByDesc(communityId){
			this.getRequest(`/article/getArticleByHotAndOrderByDesc/${communityId}`).then(resp=>{
				if (resp){
					this.hotArticleList = resp
				}
			})
		},
		joinCommunity(){
			const communityId = this.communityId
			const userId = JSON.parse(window.sessionStorage.getItem('user')).id
			this.postRequest("/saveCommunityUser?communityId="+communityId + "&userId="+ userId).then(resp=>{
				if (resp){
				
				}
			})
		}
		
	}
}
</script>

<style scoped>
.community-wrapper {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	align-items: center;
}

.community {
	display: flex;
	flex-direction: row;
	width: 1200px;
	/*background-color: yellow;*/
	margin-top: 20px;
}
.tabs{
	/*background-color: #55a532;*/
	width: 100%;
}
.content{
	/*background-color: red;*/
}
.join-btn{
	height: 40px;
}

</style>