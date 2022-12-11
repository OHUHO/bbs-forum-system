<template>
	<div class="information-wrapper">
		<div class="information">
			<h2 class="title">我的消息</h2>
			<div v-for="information in informationList" :key="information.id" class="information-box">
				<div class="userinfo">
					<img :src="information.portrait" alt="" class="portrait">
					<div class="info">
						<h4>{{information.nickName}}</h4>
						<h5>收藏了：</h5>
					</div>
				</div>
				<div class="bottom">
					<h4 class="article-name">《 {{information.articleName}} 》</h4>
					<h6 class="time">{{information.time}}</h6>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: "BBSInformation",
	
	data(){
		return{
			informationList:[],
		}
	},
	mounted() {
		this.getMyCollection()
	},
	methods:{
		getMyCollection(){
			const userId = JSON.parse(window.sessionStorage.getItem('user')).id
			this.getRequest("/article/getMyInformation?userId="+ userId).then(resp=>{
				if (resp){
					this.informationList = resp
				}
			})
		}
	}
}
</script>

<style scoped>
.information-wrapper {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	align-items: center;
}

.information {
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
.information-box{
	display: flex;
	flex-direction: column;
	height: 88px;
	width: 100%;
	/*background-color: green;*/
	margin-bottom: 10px;
	border-bottom: whitesmoke solid 2px;
}
.userinfo{
	padding: 6px;
	display: flex;
	flex-direction: row;
}
.portrait{
	width: 46px;
	height: 46px;
	border-radius: 50%;
}
.info{
	margin-left: 10px;
	color: #646363;
}
.bottom{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.article-name{
	margin-left: 54px;
}
.time{
	color: #cbcaca;
}
</style>