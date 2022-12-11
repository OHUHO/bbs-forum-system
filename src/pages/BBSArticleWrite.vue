<template>
	<div id="write">
		<el-container>
			<el-container class="me-area me-write-box">
				<el-main class="me-write-main">
					<div class="me-write-title">
						<el-input
							resize="none"
							type="textarea"
							autosize
							v-model="articleForm.title"
							placeholder="请输入文章标题"
							class="me-write-input">
						</el-input>
					</div>
					<div id="placeholder" style="visibility: hidden;height: 89px;display: none;"></div>
					<BBSMarkdownEditor :editor="articleForm.editor" class="me-write-editor"></BBSMarkdownEditor>
				</el-main>
			</el-container>
			
			<!--  弹窗-->
			<el-dialog title="封面 摘要 类型 社区 标签" :visible.sync="publishVisible" :close-on-click-modal=false custom-class="me-dialog">
				
				<el-form :model="articleForm" ref="articleForm" :rules="rules">
					<div class="image-summary-row">
						<el-upload
							action="#"
							accept="'image/*'"
							list-type="picture-card"
							:on-upload="false"
							:limit="1"
							:show-file-list="true"
							:on-change="handleChange"
							:handle-remove="handleHideRemove"
							:before-upload="beforeAvatarUpload"
							:class="{hide:hideUpload}"
						>
							<img v-if="imageUrl" :src="imageUrl" class="avatar" />
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						<el-form-item prop="summary">
							<el-input
								class="el-input-summary"
								maxlength="250"
								show-word-limit
								type="textarea"
								v-model="articleForm.summary"
								:rows="5"
								placeholder="请输入文章摘要">
							</el-input>
						</el-form-item>
					</div>
					
					<el-form-item label="文章类型" prop="type">
						<el-select v-model="articleForm.type" value-key="id" placeholder="请选择文章类型">
							<el-option v-for="t in types" :key="t.typeId" :label="t.typeName" :value="t.typeId"></el-option>
						</el-select>
					</el-form-item>
					
					<el-form-item label="发布社区" prop="community">
						<el-select v-model="articleForm.community" value-key="id" placeholder="请选择要发布的社区">
							<el-option v-for="c in communities" :key="c.communityId" :label="c.communityName" :value="c.communityId"></el-option>
						</el-select>
					</el-form-item>
					
					<el-form-item label="文章标签" prop="label">
						<el-radio-group v-model="articleForm.label">
							<el-radio v-for="l in labels" :key="l.labelId" :label="l.labelId" name="labelName">
								{{ l.labelName }}
							</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="publishVisible = false">取 消</el-button>
					<el-button type="primary" @click="publish('articleForm')">发布</el-button>
				</div>
			</el-dialog>
		</el-container>
		<!--  底部发布与取消-->
		<div class="footer">
			<div class="footer-btn">
				<el-button type="primary" round size="medium" @click="publishShow">发布文章</el-button>
				<el-button type="danger" round size="medium" @click="cancel">取消发布</el-button>
			</div>
		</div>
	
	</div>
</template>

<script>
import BBSMarkdownEditor from "@/components/BBSMarkdownEditor";
import {Loading, Message, MessageBox} from "element-ui";

export default {
	name: 'BBSArticleWrite',
	
	data() {
		return {
			publishVisible: false,
			types: [],
			communities: [],
			labels: [],
			imageUrl:'',
			imageFile:{},
			hideUpload: false,
			articleForm: {
				title: '',
				summary: '',
				type: '',
				community: '',
				label: '',
				editor: {
					value: '',
					ref: '',//保存mavonEditor实例
					default_open: 'edit',
					toolbars: {
						bold: true, // 粗体
						italic: true, // 斜体
						header: true, // 标题
						underline: true, // 下划线
						strikethrough: true, // 中划线
						mark: true, // 标记
						superscript: true, // 上角标
						subscript: true, // 下角标
						quote: true, // 引用
						ol: true, // 有序列表
						ul: true, // 无序列表
						imagelink: true, // 图片链接
						code: true, // code
						fullscreen: true, // 全屏编辑
						readmodel: true, // 沉浸式阅读
						help: true, // 帮助
						undo: true, // 上一步
						redo: true, // 下一步
						trash: true, // 清空
						navigation: true, // 导航目录
						//subfield: true, // 单双栏模式
						preview: true, // 预览
						boxShadow: true,  //边框阴影
						ishljs: true, //代码高亮
						scrollStyle: false
					}
				}
			},
			rules: {
				summary: [
					{required: true, message: '请输入摘要', trigger: 'blur'},
					{max: 250, message: '不能大于80个字符', trigger: 'blur'}
				],
				type: [
					{required: true, message: '请选择文章类型', trigger: 'change'}
				],
				/*community: [
					{required: false, message: '请选择要发布的社区', trigger: 'change'}
				],
				label: [
					{required: false, message: '请选择标签', trigger: 'change'}
				]*/
			}
		}
	},
	mounted() {
		this.getArticleType()
		this.getCommunity()
		this.getArticleLabel()
	},
	methods: {
		/*获取文章类型*/
		getArticleType() {
			this.getRequest('/getArticleType').then(resp => {
				if (resp) {
					this.types = resp
				}
			})
		},
		/*获取社区名称*/
		getCommunity() {
			this.getRequest("/community/getCommunity").then(resp => {
				if (resp) {
					this.communities = resp
				}
			})
		},
		/*获取标签*/
		getArticleLabel() {
			this.getRequest('/getArticleLabel').then(resp => {
				if (resp) {
					this.labels = resp
				}
			})
		},
		
		publishShow() {
			if (!this.articleForm.title) {
				Message({
					message: '标题不能为空',
					type: 'warning',
					showClose: true,
					offset: 54
				})
				return
			}
			if (this.articleForm.title.length > 30) {
				Message({
					message: '标题最多30个字',
					type: 'warning',
					showClose: true,
					offset: 54
				})
				return
			}
			if (!this.articleForm.editor.ref.d_render) {
				Message({
					message: '内容不能为空',
					type: 'warning',
					showClose: true,
					offset: 54
				})
				return
			}
			
			this.publishVisible = true;
		},
		handleChange(file,fileList) {
			// file指的就是选择的文件对象
			this.imageFile = file;
			this.hideUpload = fileList.length >= 1
		},
		handleHideRemove(file,fileList){
			this.hideUpload = fileList.length >= 1
		},
		//判断图片格式和类型
		beforeAvatarUpload(file) {
			const isJPG = file.type === "image/jpeg";
			const isPNG = file.type === "image/png";
			const isLt2M = file.size / 1024 / 1024 < 2;
			
			if (!isJPG && !isPNG) {
				Message({
					type: "error",
					message: "文件类型只能是JPG, PNG!",
					offset: 54
				})
			}
			if (!isLt2M) {
				Message({
					type: "error",
					message: "文件大小不能超过 2MB!",
					offset: 54
				})
			}
			return (isJPG || isPNG) && isLt2M;
		},
		publish(articleForm) {
			const that = this
			this.$refs[articleForm].validate((valid) => {
				if (valid) {
					/*let labels = this.articleForm.label.map(function (item) {
						return {id: item};
					});*/
					const article = {
						articleTitle: this.articleForm.title,
						articleContent: this.articleForm.editor.value,
						articleContentHtml: this.articleForm.editor.ref.d_render,
						articleSummary: this.articleForm.summary,
						articleTypeId: parseInt(this.articleForm.type),
						articleCommunityId: this.articleForm.community = isNaN(parseInt(this.articleForm.community)) ? 0 : parseInt(this.articleForm.community),
						articleLabelId: this.articleForm.label = isNaN(parseInt(this.articleForm.label)) ? 0 : parseInt(this.articleForm.label),
						userId:JSON.parse(window.sessionStorage.getItem('user')).id,
						articleAuthor:JSON.parse(window.sessionStorage.getItem('user')).nickname,
						articleImage:''
					}
					
					this.publishVisible = false;
					
					const loading = Loading.service({
						lock:true,
						text:'发布中，请稍后...'
					})
					// 发送请求给后端（如果有封面图片，先保存图片再保存文章数据）
					
					/*获取封面图片*/
					const file = this.imageFile.raw
					const userId = JSON.parse(window.sessionStorage.getItem('user')).id
					if(file != undefined){
						const formData = new FormData()
						formData.append("userId",userId)
						formData.append("image",file)
						this.postRequest("/article/coverImg",formData).then(resp =>{
							if (resp){
								article.articleImage = resp
								this.postRequest('/article/publish',article).then(resp=>{
									if(resp){
										loading.close()
										that.$router.push('/forum')
									}
								})
							}
						})
					}else{
						this.postRequest('/article/publish',article).then(resp=>{
							if(resp){
								loading.close()
								that.$router.push('/forum')
							}
						})
					}
					console.log(article)
					
				}
			})
		},
		cancel() {
			MessageBox({
				message: '文章将不会保存, 是否继续?',
				title: '提示',
				showCancelButton: true,
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				this.$router.push('/forum')
			})
		},
		
	},
	components: {BBSMarkdownEditor},
	//组件内的守卫 调整body的背景色
	beforeRouteEnter(to, from, next) {
		window.document.body.style.backgroundColor = '#fff';
		next();
	},
	beforeRouteLeave(to, from, next) {
		window.document.body.style.backgroundColor = '#f5f5f5';
		next();
	}
}
</script>

<style>
	
	.me-write-box {
		max-width: 1000px;
		margin: 8px auto 0;
		border: #efeded solid 2px;
	}
	
	.me-write-main {
		padding: 0;
	}
	
	.me-write-title {
	}
	
	.me-write-input textarea {
		font-size: 32px;
		font-weight: 600;
		height: 10px;
		border: none;
	}
	
	.me-write-editor {
		min-height: 650px !important;
	}
	
	.me-header-left {
		margin-top: 10px;
	}
	
	.me-title img {
		max-height: 2.4rem;
		max-width: 100%;
	}
	
	.me-write-toolbar-fixed {
		position: fixed;
		width: 700px !important;
		top: 60px;
	}
	
	.v-note-op {
		box-shadow: none !important;
	}
	
	.auto-textarea-input, .auto-textarea-block {
		font-size: 18px !important;
	}
	
	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 1000;
		padding: 5px;
		background-color: white;
		border-top: #e8e8ed solid 1px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	
	.footer-btn {
		display: flex;
		flex-direction: row;
		justify-content: right;
		width: 1000px;
	}
	
	.image-summary-row{
		display: flex;
		flex-direction: row;
		width: 100%;
	}
	.el-upload--picture-card{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-right: 15px;
		height: 117px;
	}
	.el-upload-list--picture-card .el-upload-list__item{
		height: 117px;
	}
	
	.el-input-summary{
		width: 520px;
	}

	.hide .el-upload--picture-card {
		display: none;
	}
</style>
