<template>
	<mavon-editor
		class="me-editor"
		ref="md"
		v-model="editor.value"
		@imgAdd="imgAdd"
		v-bind="editor">
	</mavon-editor>
</template>


<script>

import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
	name: 'BBSMarkdownEditor',
	props: {
		editor: Object
	},
	data() {
		return {}
	},
	mounted() {
		this.$set(this.editor, 'ref', this.$refs.md)
	},
	methods: {
		imgAdd(pos, $file) {
			let that = this
			let userId = JSON.parse(window.sessionStorage.getItem('user')).id;
			let formdata = new FormData();
			formdata.append('userId',userId);
			formdata.append('image', $file);
			
			this.postRequest("/article/articleImg",formdata).then(resp => {
				// 成功后返回图片的url替换到文本原位置
				if (resp) {
					that.$refs.md.$img2Url(pos, resp);
					console.log(resp)
				}
			})
			
		}
	},
	components: {
		mavonEditor
	}
}
</script>
<style scoped>

.me-editor {
	z-index: 6 !important;
}

.v-note-wrapper.fullscreen {
	top: 60px !important
}
</style>
