<template>
	<div class="article-details">
		<div class="article-details-box">
			<div class="article-details-box-left">
				<div class="userinfo">
					<div class="userinfo-header">
						<img class="userinfo-avtar" :src="userinfo.portrait">
						<h5>{{userinfo.nickname}}</h5>
					</div>
					<div class="userinfo-mid">
						<ul>
							<li><p>{{ userinfo.fans }}</p>粉丝</li>
							<li><p>{{userinfo.attention}}</p>关注</li>
							<li><p>{{userinfo.good}}</p>获赞</li>
						</ul>
					</div>
					<div class="userinfo-bottom">
						<el-button plain>私信</el-button>
						<el-button plain>关注</el-button>
					</div>
				</div>
				<div class="recommend">
					<div class="recommend-article">
						<h4>同类文章推荐</h4>
						
					</div>
				</div>
			</div>
			
			<div class="article-details-box-right">
				<div class="details-header-label">
					<h2>{{article.articleTitle}}</h2>
					<div class="details-header">
						<label>原创</label>
						<div class="time-author-label">
							<h6>发布时间：<span>{{article.createTime}}</span></h6>
							<h6>文章标签：<el-tag>搞笑</el-tag></h6>
						</div>
					</div>
				</div>
				
				<div class="details-community">
					<div class="details-community-left">
						<img src="../assets/block.jpg">
						<span>社区名称</span>
					</div>
					<div class="details-community-right">
						<span> 200 订阅</span>
						<span>98 篇文章</span>
						<el-button round>加入社区</el-button>
					</div>
				</div>
				<div class="article-detail-content">
					<!--<p>{{article.articleContent}}</p>-->
					<BBSMarkdownEditor :editor="editor"></BBSMarkdownEditor>
				</div>
				
				<!--评论内容-->
				
				<div class="article-details-comment-reply">
					<BBSComment></BBSComment>
				</div>
				
				<div class="article-details-box-right-footer">
					<div class="footer-userinfo">
						<img class="userinfo-avtar" :src="userinfo.portrait">
						<h5>{{userinfo.nickname}}</h5>
						<el-button >关注</el-button>
					</div>
					<div class="footer-right">
						<div class="footer-input">
							<el-input placeholder="请输入评论内容" v-model="commentContent">
								<el-button slot="append" @click="publishComment">发表</el-button>
							</el-input>
						</div>
						<div class="footer-other">
							<ul>
								<li><i class="el-icon-view"></i><P>{{article.articleViewNum}}</P></li>
								<li><i class="el-icon-chat-dot-square"></i><p>123</p></li>
								<li @click="collection"><i class="el-icon-star-off"></i>
									<p>{{article.articleGoodNum}}</p>
								</li>
							</ul>
						</div>
						<i class="el-icon-share share"></i>
					</div>
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
import {getArticleById, getUserinfoById} from "@/api/article";
import BBSMarkdownEditor from "@/components/BBSMarkdownEditor";
import BBSComment from "@/components/BBSComment";

export default {
	name: "BBSArticleDetails",
	components: {BBSComment, BBSMarkdownEditor},
	mounted() {
		this.getArticle(this.$route.params.articleId)
		
	},
	data(){
		return{
			article:{},
			userinfo:{},
			editor:{
				value:'',
				toolbarsFlag: false,
				subfield: false,
				defaultOpen: 'preview'
			},
			commentContent:'',
			
			
			isShowInput:true,
			replyContent:'',
			reminder:'回复',
			isShowReminder:false,
		}
	},
	methods:{
		getArticle(articleId){
			getArticleById(articleId).then(resp =>{
				if (resp){
					this.article = resp
					this.editor.value = this.article.articleContent
					this.getUserinfoById(this.article.userId)
				}
			})
		},
		getUserinfoById(id){
			getUserinfoById(id).then(resp =>{
				if (resp){
					this.userinfo = resp
				}
			})
		},
		publishComment(){
			const comment = {
				commentContent:this.commentContent,
				commentUserId:this.article.userId,
				commentArticleId:this.article.articleId,
			}
			//console.log(comment)
			this.putRequest("/comment/userComment",comment).then(resp =>{
				if (resp){
				
				}
			})
		},
		collection(){
			const userId = JSON.parse(window.sessionStorage.getItem('user')).id
			const articleId = this.article.articleId
			this.postRequest("/saveUserCollection?userId=" + userId + "&articleId=" + articleId).then(resp=>{
				if (resp){
					this.article.articleGoodNum = this.article.articleGoodNum + 1;
				}
			})
		}
		
	}
}
</script>

<style scoped>
.article-details {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	align-items: center;
	margin-bottom: 80px;
}

.article-details-box {
	display: flex;
	flex-direction: row;
	width: 1200px;
	/*background-color: #55a532;*/
	margin-top: 4px;
}
.article-details-box-left{
	width: 19%;
	float: left;
	margin-right: 1%;
	/*background-color: red;*/
}
.article-details-box-right{
	width: 80%;
	/*background-color: green;*/
}

.userinfo{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 6px 0;
	padding: 4px 0px;
	padding-bottom: 20px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.userinfo-header{
	display: flex;
	flex-direction: row;
	align-items: center;
	border-bottom: #efefef solid 2px;
	width: 200px;
	padding-bottom: 10px;
	/*background-color: #55a532;*/
}
.userinfo-avtar{
	width: 40px;
	height: 40px;
	border-radius: 50px;
	margin-right: 10px;
	margin-left: 16px;
}

.userinfo-mid{
	display: flex;
	flex-direction: row;
	/*border-bottom: 1px solid #e8e8ed;*/
	width: 200px;
	margin-top: 6px;
	/*background-color: red;*/
}
.userinfo-mid ul{
	display: flex;
	flex-direction: row;
	text-align: center;
	width: 100%;
}
.userinfo-mid ul li{
	position: relative;
	display: inline-block;
	width: 33.333%;
	line-height: 26px;
}

.userinfo-mid ul li p{
	font-size: medium;
}

.userinfo-bottom{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 180px;
	/*background-color: #55a532;*/
}
.userinfo-bottom .el-button{
	margin-top: 20px;
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 10px;
}
.recommend{
	display: flex;
	flex-direction: column;
	justify-items: center;
	align-items: center;
	margin-top: 26px;
}
.recommend-article{
	display: flex;
	flex-direction: column;
	width: 98%;
	min-height: 300px;
	padding: 4px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

.details-header-label{
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	padding: 6px;
}
.details-header{
	background-color: #f6f6f6;
	height: 50px;
	width: 100%;
	margin: 10px 0px;
	/*padding: 0px 23px;*/
	border-radius: 4px;
	display: flex;
	flex-direction: row;
	align-items: center;
}
.details-header label{
	background-color: #cce8f3;
	padding: 3px 10px;
	border-bottom-right-radius: 15px;
	border-top-right-radius: 15px;
}
.time-author-label{
	display: inline-flex;
	flex-direction: column;
	justify-content: space-between;
	font-size: 10px;
	color: gray;
	margin-left: 20px;
}
.time-author-label h6{
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 3px 0;
	color: #abaaaa;
	font-weight: normal;
}
.time-author-label .el-tag{
	display: flex;
	flex-direction: row;
	align-items: center;
	text-align: center;
	height: 20px;
	line-height: 20px;
}

.details-community{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 40px;
	box-shadow: 1px 2px 10px 1px rgba(0, 0, 0, 0.1);
	padding: 3px 23px;
}

.details-community-left{
	display: flex;
	flex-direction: row;
	align-items: center;
}
.details-community-left img{
	width: 34px;
	height: 34px;
	border-radius: 2px;
	margin-right: 10px;
}

.details-community-right{
	display: flex;
	flex-direction: row;
	align-items: center;
}
.details-community-right span{
	color: #969595;
	margin-right: 20px;
	font-size: 14px;
}
.details-community-right .el-button{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: 30px;
	width: 80px;
}

.article-details-box-right-footer{
	/*background-color: skyblue;*/
	background-color: white;
	height: 50px;
	width: 960px;
	position: fixed;
	bottom: 0;
	z-index: 9999;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}

.footer-userinfo{
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 100%;
	width: 20%;
}
.footer-userinfo .el-button{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: 8px;
	width: 30px;
	margin: 0px 10px;
}
.footer-userinfo .userinfo-avtar{
	width: 32px;
	height: 32px;
}
.footer-right{
	display: flex;
	flex-direction: row;
	align-items: center;
	
}
.footer-input{
	height: 10px;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-right: 20px;
}
.footer-input .el-input {
	width: 300px;
	height: 6px;
}
.footer-input .el-input .el-button {
	height: 6px;
}

.footer-other{
	display: flex;
	flex-direction: row;
	
}
.footer-other ul{
	display: flex;
	flex-direction: row;
	text-align: center;
	width: 260px;
}
.footer-other ul li{
	position: relative;
	display: flex;
	align-items: center;
	line-height: 26px;
	margin-right: 20px;
}
.footer-other ul li p{
	color: gray;
	margin-left: 4px;
}
.share{
	margin-right: 14px;
	font-size: 22px;
	color: gray;
}


.article-details-comment-reply{
	box-shadow: 1px 2px 10px 1px rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
	padding: 10px 23px;
	min-height: 100px;
	/*width: 100%;*/
}
.article-details-comment-reply h3{
	margin: 4px 0px;
}
.comment-box{
	display: flex;
	flex-direction: column;
}
.comment-userinfo-row{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.comment-userinfo-row i{
	display: flex;
	flex-direction: row;
	align-items: center;
	color: gray;
	font-size: 14px;
	cursor: pointer;
}
.comment-userinfo{
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 2px 0px;
}
.comment-userinfo img{
	width: 30px;
	height: 30px;
	border-radius: 20px;
	margin-right: 6px;
}
.comment-userinfo h6{
	margin-right: 6px;
	color: gray;
}
.comment-box{
	border-bottom: whitesmoke solid 2px;
	margin-bottom: 10px;
}
.span-comment{
	padding-left: 30px;
}
.span-reply{
	padding-left: 60px;
}
.reply-userinfo{
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 6px 0px;
	padding-left: 30px;
	
}
.reply-userinfo img{
	width: 26px;
	height: 26px;
	border-radius: 20px;
	margin-right: 6px;
}
.reply-userinfo h6{
	margin-right: 6px;
	color: gray;
}

</style>
