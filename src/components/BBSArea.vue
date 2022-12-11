<template>
	<div class="area">
		<div class="area-header">
            <span>
                <i class="el-icon-caret-right"></i>
                <h3>{{ areaHeader }}</h3>
            </span>
			<h6>查看更多</h6>
		</div>
		<div class="area-image">
			<img :src="imageUrl">
			<span>{{ imageTitle }}</span>
		</div>
		<div class="area-article">
			<ul v-for="a in areaArticle" :key="a.id">
				<li @click="articleDetails(a.articleId)">{{ a.articleTitle }}</li>
				<p>作者：{{ a.articleAuthor }}</p>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: "BBSArea",
	props: {
		areaHeader: {
			type: String,
			required: true
		},
		imageUrl: {
			type: String,
			required: true
		},
		imageTitle: {
			type: String,
			required: true
		},
		areaArticle: {
			type: Array,
			required: true
		}
	},
	methods:{
		articleDetails(articleId){
			this.$router.push({path:`/articleDetails/articleId/${articleId}`})
		}
	}
}
</script>

<style scoped>
.icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}

.area {
	display: flex;
	flex-direction: column;
	padding-bottom: 10px;
	border-bottom: whitesmoke solid 2px;
	margin-right: 40px;
}

.area-header {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-right: 40px;
	align-items: center;
	text-align: center;
	width: 100%;
}

.area-header span {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.area-header span i {
	margin-right: 4px;
}

.area-header h6 {
	color: #838181;
}

.area-header h3 {
	margin: 6px 0;
}

.area-header h6:hover {
	cursor: pointer;
	color: skyblue;
}

.area-image {
	position: relative;
	float: left;
}

.area-image img {
	width: 260px;
	height: 140px;
	border-radius: 8px;
}

.area-image span {
	width: 260px;
	display: block;
	line-height: 30px;
	background-color: rgba(255, 255, 255, 0.2);
	background-color: black;
	opacity: 0.5;
	position: absolute;
	bottom: 0;
	color: white;
	text-align: center;
	font-size: 15px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.area-article{

}

.area-article ul li {
	list-style-type: none;
	padding: 5px 0;
	overflow: hidden;
	text-overflow: ellipsis;
	-o-text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1; /* 这里设定行数 */
	-webkit-box-orient: vertical;
	
}

.area-article ul li:hover {
	cursor: pointer;
	color: skyblue;
}

.area-article ul p {
	font-size: 12px;
	padding-bottom: 5px;
	color: #838282;
}
</style>