<!--  -->
<template>
	<div class="app-container back-category">
		<div class="main-content-wrapper category">
			<el-row :gutter="10">
				<el-col :span="12">
					<category-card
						:level="1"
						:categoryList="categoryListLevelOne"
						@on-create="createCategory"
						@on-select="handleItemSelect"
						@on-edit="handleItemEdit"
						@on-delete="handleItemDelete"
						@on-end-sort="handleItemSort"
					></category-card>
				</el-col>
				<el-col :span="12">
					<category-card
						:level="2"
						:parentInfo="levelOne"
						:categoryList="categoryListLevelTwo"
						@on-select="handleItemSelect"
						@on-create="createCategory"
						@on-edit="handleItemEdit"
						@on-delete="handleItemDelete"
						@on-end-sort="handleItemSort"
					></category-card>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue'
import categoryCard from './components/CategoryCard.vue'
export default defineComponent({
	provide() {
		return {
			page: this.pageName,
		}
	},
	props: {
		pageName: {
			type: String,
			default: 'category',
		},
	},
	data() {
		return {
			count: [1],
			maxWidth: '',
			categoryListLevelOne: [
				{
					cateName: '111',
				},
			],
		}
	},
	components: {
		categoryCard,
	},

	computed: {},

	mounted() {},

	methods: {},
})
</script>
<style lang="scss" scoped>
.back-category {
	.search {
		margin: 0 auto;
		padding: 30px 0;
	}
	.category {
		width: 850px;
		margin: 0 auto;
		padding-top: 50px;
		box-sizing: border-box;
		.box-card {
			height: 510px;
			.category-list {
				height: 410px;
				padding: 20px;
				.list-group-item {
					height: 36px;
					line-height: 36px;
					cursor: pointer;
				}
				.active {
					background-color: #c6e5ff;
					color: #3a97ff;
				}
				.category-name {
					padding: 0 10px;
					display: inline-block;
					width: 82%;
				}
				.category-name:hover {
					color: #3a97ff;
				}
				.operate {
					display: inline-block;
				}
			}
		}
	}
	.add-category {
		text-align: center;
		border-top: 1px solid #ebeef5;
		.el-button {
			padding: 16px;
		}
	}
	:deep().el-card__body {
		padding: 0;
	}
}
</style>
