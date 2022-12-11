<template>
	<div class="article" @click="articleDetails(articleId)">
		<h4>{{ title }}</h4>
		<div class="article-contents">
			<img :src="imageUrl" v-if="imageUrl === '' ? false:true">
			<span>
                <p>{{ summary }}</p>
                <span>
                    <h5>作者：{{ author }}</h5>
                    <span><i class="el-icon-magic-stick"></i>{{ goodNum }}</span>
                    <span><i class="el-icon-view"></i>{{ viewNum }}</span>
                </span>
            </span>
		
		</div>
	</div>
</template>

<script>
export default {
	name: "BBSArticle",
	props: {
		articleId: {
			type:Number,
			required:true
		},
		title: {
			type: String,
			required: true
		},
		imageUrl: {
			type: String,
			required: true
		},
		summary: {
			type: String,
			required: true
		},
		author: {
			type: String,
			required: true
		},
		goodNum: {
			type: Number,
			required: true
		},
		viewNum: {
			type: Number,
			required: true
		}
		
	},
	data() {
		return {}
	},
	methods:{
		articleDetails(articleId){
			this.$router.push({path:`/articleDetails/articleId/${articleId}`})
		}
	}
}
</script>

<style scoped>
.article {
	width: 860px;
	margin-bottom: 14px;
	padding-bottom: 10px;
	border-bottom: whitesmoke solid 2px;
}

.article h4 {
	font-weight: 500;
	margin-bottom: 5px;
}

.article h4:hover {
	cursor: pointer;
	color: skyblue;
}

.article-contents {
	display: flex;
	flex-direction: row;
}

.article-contents img {
	width: 140px;
	border: 2px;
	margin-right: 5px;
}

.article-contents span {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.article-contents span span {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	margin-top: 14px;
}

.article-contents span span h5 {
	font-weight: 500;
	color: #605d5d;
}

.article-contents span span span {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 0px 40px;
	font-size: 14px;
	color: #646262;
}

.article-contents span span span i {
	margin-right: 4px;
}

.article-contents p {
	font-size: 14px;
	color: #646262;
	height: 40px;
	/*width: 710px;*/
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-line-clamp: 2;
	word-break: break-all;
	display: -webkit-box;
	-webkit-box-orient: vertical;
}

.article-contents p:hover {
	cursor: pointer;
}


</style>