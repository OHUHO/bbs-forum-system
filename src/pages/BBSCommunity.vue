<template>
	<div class="community">
		<div class="community-box">
			<div class="community-header">
				<h2>社区</h2>
				<h4 @click="createCommunity">申请创建社区</h4>
			</div>
			<div class="community-cards">
				<div  v-for="c in communityList" :key="c.communityId">
					<BBSCommunityCard :community="c"></BBSCommunityCard>
				</div>
				
			</div>
			
		</div>
	</div>
</template>

<script>

import BBSCommunityCard from "@/components/BBSCommunityCard";
export default {
	name: "BBSCommunity",
	components: {BBSCommunityCard},
	data() {
		return {
			communityList:[],
		}
	},
	
	mounted() {
		this.getCommunityList()
	},
	methods:{
		getCommunityList(){
			this.getRequest("/community/getCommunityList").then(resp =>{
				if (resp){
					this.communityList = resp
				}
			})
		},
		createCommunity(){
			this.$router.push("/tabs/"+'3')
		}
	}
}
</script>

<style scoped>
.community {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	align-items: center;
}
.community-box {
	display: flex;
	flex-direction: column;
	width: 1200px;
	/*background-color: yellow;*/
	margin-top: 10px;
	height: 100px;
}
.community-header{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 0px 12px;
}
.community-header h4{
	color: white;
	font-weight: lighter;
	border: #d5d1d1 solid 1px;
	padding: 3px 10px;
	background-color: #aeddef;
	border-radius: 4px;
	cursor: pointer;
}
.community-cards{
	display: flex;
	flex-wrap: wrap;
}
</style>