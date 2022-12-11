<template>
	<div class="inventory-wrapper">
		<div class="inventory">
			<img src="../assets/bg.png" style="height: 250px">
			<div class="title">
				<h2>{{ introduce.title }}</h2>
			</div>
			<div class="content">{{ introduce.content }}</div>
			<div class="pick">
				<el-cascader
					class="pick-item"
					clearable
					separator="-"
					:options="options"
					placeholder="地区"
					v-model="selectedOptions"
					@change="handleChangeArea">
				</el-cascader>
				<el-select v-model="condition.time" clearable placeholder="时间" class="pick-item">
					<el-option
						v-for="item in time"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="condition.category" clearable placeholder="类别" class="pick-item">
					<el-option
						v-for="item in category"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="condition.type" clearable placeholder="类型" class="pick-item">
					<el-option
						v-for="item in types"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
				<el-input
					class="input"
					placeholder="请输入关键词"
					v-model="condition.keywords"
					clearable>
				</el-input>
				<el-button type="primary" @click="getAllListByCondition">搜索</el-button>
			</div>
			<h3 class="record">搜索结果：共条{{ articleList.length }}记录</h3>
			
			<el-table :data="articleList" show-header @current-change="handleCurrentChange" style="width: 100%; margin: 24px 0">
				<el-table-column type="index" label="序号" width="80"></el-table-column>
				<el-table-column prop="snumber" label="编号" width="100"></el-table-column>
				<el-table-column prop="name" label="名称" width="140"></el-table-column>
				<el-table-column prop="category" label="类别" width="140"></el-table-column>
				<el-table-column prop="time" label="时间" width="140"></el-table-column>
				<el-table-column prop="type" label="类型" width="140"></el-table-column>
				<el-table-column prop="area" label="地区"></el-table-column>
				<el-table-column prop="department" label="保护单位"></el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
import {CodeToText, provinceAndCityDataPlus} from "element-china-area-data";

export default {
	name: "BBSInventory",
	mounted() {
		this.getAllListByCondition();
	},
	data() {
		return {
			introduce: {
				title: '国家级非物质文化遗产代表性项目名录',
				content: '建立非物质文化遗产代表性项目名录，对保护对象予以确认，以便集中有限资源，对体现中华民族优秀传统文化，具有历史、文学、艺术、科学价值的非物质文化遗产项目进行重点保护，是非物质文化遗产保护的重要基础性工作之一。联合国教科文组织《保护非物质文化遗产公约》（以下简称《公约》）要求“各缔约国应根据自己的国情”拟订非物质文化遗产清单。建立国家级非物质文化遗产名录，是我国履行《公约》缔约国义务的必要举措。《中华人民共和国非物质文化遗产法》明确规定：“国家对非物质文化遗产采取认定、记录、建档等措施予以保存，对体现中华民族优秀传统文化，具有历史、文学、艺术、科学价值的非物质文化遗产采取传承、传播等措施予以保护。”“国务院建立国家级非物质文化遗产代表性项目名录，将体现中华民族优秀传统文化，具有重大历史、文学、艺术、科学价值的非物质文化遗产项目列入名录予以保护。”\n' +
					'\n' +
					'国务院先后于2006年、2008年、2011年、2014年和2021公布了五批国家级项目名录（前三批名录名称为“国家级非物质文化遗产名录”，《中华人民共和国非物质文化遗产法》实施后，第四批名录名称改为“国家级非物质文化遗产代表性项目名录”），共计1557个国家级非物质文化遗产代表性项目（以下简称“国家级项目”），按照申报地区或单位进行逐一统计，共计3610个子项。为了对传承于不同区域或不同社区、群体持有的同一项非物质文化遗产项目进行确认和保护，从第二批国家级项目名录开始，设立了扩展项目名录。扩展项目与此前已列入国家级非物质文化遗产名录的同名项目共用一个项目编号，但项目特征、传承状况存在差异，保护单位也不同。\n' +
					'\n' +
					'国家级名录将非物质文化遗产分为十大门类，其中五个门类的名称在2008年有所调整，并沿用至今。十大门类分别为：民间文学，传统音乐，传统舞蹈，传统戏剧，曲艺，传统体育、游艺与杂技，传统美术，传统技艺，传统医药，民俗。每个代表性项目都有一个专属的项目编号。编号中的罗马数字代表所属门类，如传统音乐类国家级项目“侗族大歌”的项目编号为“Ⅱ-28”。\n' +
					'\n',
			},
			options: provinceAndCityDataPlus,
			selectedOptions: [],
			input: '',
			time: [
				{
					value: null,
					label: '全部'
				}, {
					value: '2006(第一批)',
					label: '2006(第一批)'
				}, {
					value: '2008(第二批)',
					label: '2008(第二批)'
				}, {
					value: '2011(第三批)',
					label: '2011(第三批)'
				}, {
					value: '2014(第四批)',
					label: '2014(第四批)'
				}, {
					value: '2021(第五批)',
					label: '2021(第五批)'
				}],
			category: [
				{
					value: null,
					label: '全部'
				}, {
					value: '民间文学',
					label: '民间文学'
				}, {
					value: '传统音乐',
					label: '传统音乐'
				}, {
					value: '传统舞蹈',
					label: '传统舞蹈'
				}, {
					value: '传统戏曲',
					label: '传统戏曲'
				}],
			types: [
				{
					value: null,
					label: '全部'
				}, {
					value: '新增项目',
					label: '新增项目'
				}, {
					value: '扩展项目',
					label: '扩展项目'
				}],
			
			articleList: [],
			condition: {
				area: null,
				time: null,
				category: null,
				type: null,
				keywords: null,
			},
			//inventoryId:null,
		}
	},
	methods: {
		handleChangeArea(value) {
			const city = CodeToText[value[0]] + '-' + CodeToText[value[1]]
			this.condition.area = city
		},
		getAllListByCondition() {
			const condition = this.condition
			//console.log(condition)
			this.postRequest('/inventory/getAllInventory', condition).then(resp => {
				if (resp) {
					this.articleList = resp;
				}
			})
		},
		handleCurrentChange(val) {
			const inventoryId = val.id;
			this.$router.push({path:`/inventoryDetails/inventoryId/${inventoryId}`})
		}
	}
}
</script>

<style scoped>

.inventory-wrapper {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	align-items: center;
}

.inventory {
	display: flex;
	flex-direction: column;
	width: 1200px;
	/*background-color: yellow;*/
	margin-top: 20px;
}

.title {
	width: 100%;
	text-align: center;
	line-height: 66px;
	color: #4f4e4e;
	margin: 46px 0 10px 0;
}

.pick {
	margin: 24px 0;
	display: flex;
	flex-direction: row;
}

.pick-item {
	display: flex;
	flex-direction: row;
	text-align-last: left;
	width: 200px;
	margin-right: 40px;
}

.input {
	width: 200px;
}

.record {
	color: #797777;
}

</style>