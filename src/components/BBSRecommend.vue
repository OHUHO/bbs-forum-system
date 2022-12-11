<template>
	<div class="recommend">
		<ul v-for="r in recommendList" :key="r.articleId">
			<li>
				<h4 @click="articleDetails(r.articleId)">{{ r.articleTitle }}</h4>
				<p>{{ r.createTime }}</p>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: "BBSRecommend",
	props: {
		recommendList: {
			type: Array,
			required: true
		}
	},
	methods:{
		articleDetails(articleId){
			//console.log(articleId)
			this.$router.push({path:`/articleDetails/articleId/${articleId}`})
		}
	}
	
}
</script>

<style scoped>
.recommend {
	width: 316px;
	/*background-color: green;*/
	margin-right: 34px;
}

.recommend ul {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	height: 20%;
}

.recommend ul li {
	list-style-type: none;
}

.recommend ul li h4 {
	font-weight: 500;
	overflow: hidden;
	text-overflow: ellipsis;
	-o-text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1; /* 这里设定行数 */
	-webkit-box-orient: vertical;
	
}

.recommend ul li h4:hover {
	cursor: pointer;
	color: skyblue;
}

.recommend ul li p {
	font-size: 8px;
	font-weight: 500;
	color: #b0b0b0;
	margin: 6px 0px;
}

</style>