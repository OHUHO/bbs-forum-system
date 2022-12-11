<template>
	<div class="article-details">
		<div class="article-details-box">
			
			<div class="details-header-label">
				<h2>{{inventory.name}}</h2>
				<div class="details-header">
					<label>最新</label>
					<div class="time-author-label">
						<div class="labels">
							<h6>类别：<el-tag>{{inventory.category}}</el-tag></h6>
							<h6>类型：<el-tag>{{inventory.type}}</el-tag></h6>
						</div>
						<div class="labels">
							<h6>地区：<span>{{inventory.area}}</span></h6>
							<h6>时间：<span>{{inventory.time}}</span></h6>
						</div>
					</div>
				</div>
			</div>
			
			<div class="details-community">
				<div class="details-community-left">
					<img src="../assets/block.jpg">
					<span>{{inventory.department}}</span>
				</div>
				<div class="details-community-right">
					<span> 200 订阅</span>
					<span>98 篇文章</span>
					<el-button round>了解更多</el-button>
				</div>
			</div>
			<div class="article-detail-content">
				<!--<p>{{article.articleContent}}</p>-->
				<BBSMarkdownEditor :editor="editor"></BBSMarkdownEditor>
			</div>
		</div>
		
	</div>
</template>

<script>

import BBSMarkdownEditor from "@/components/BBSMarkdownEditor";

export default {
	name: "BBSInventoryDetails",
	components:{BBSMarkdownEditor},
	mounted() {
		this.getInventoryById(this.$route.params.inventoryId)
	},
	data(){
		return{
			inventoryId:this.$route.params.inventoryId,
			inventory:{},
			editor:{
				value:'',
				toolbarsFlag: false,
				subfield: false,
				defaultOpen: 'preview'
			},
		}
	},
	methods:{
		getInventoryById(id){
			//getInventoryById/{id}
			this.getRequest("/inventory/getInventoryById?id="+ id).then(resp=>{
				if (resp){
					//console.log(resp)
					this.inventory = resp;
					this.editor.value = resp.content
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
	flex-direction: column;
	width: 1200px;
	/*background-color: #55a532;*/
	margin-top: 4px;
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
.labels{
	display: flex;
	flex-direction: row;
}
.time-author-label h6{
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 3px 0;
	color: #abaaaa;
	font-weight: normal;
	margin-right: 20px;
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
