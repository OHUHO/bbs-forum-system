<template>
	<div class="card">
		<div>
			<img :src="community.communityImage">
			<h3>{{community.communityName}}</h3>
			<p>{{community.communityIntroduce}}</p>
		</div>
		<div class="card-bottom">
			<span>创立人：{{community.createUserNickname}}</span>
			<span class="look-community" @click="communityDetails(community.communityId)">查看社区 ></span>
		</div>
	</div>
</template>

<script>
export default {
	name: "BBSCommunityCard",
	
	props: {
		community:{
			type:Object,
			required:true
		}
	},
	methods:{
		communityDetails(e){
			const communityId = e;
			this.$router.push({path: `/communityDetails/communityId/${communityId}`})
		}
	}
}
</script>

<style scoped>

.card{
	
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 372px;
	height: 290px;
	/*background-color: green;*/
	padding: 4px;
	margin: 10px;
	border-radius: 6px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
	
}
.card img{
	width: 372px;
	height: 180px;
}
.card h3{
	font-weight: normal;
	margin: 6px 0;
}
.card p{
	color: #8d8b8b;
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-line-clamp: 2;
	word-break: break-all;
	display: -webkit-box;
	-webkit-box-orient: vertical;
}
.card-bottom{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 4px 0;
	color: #605d5d;
	font-size: 14px;
}
.look-community{
	color: skyblue;
	cursor: pointer;
}
</style>
