<template>
	<div class="dashboard-container">
		<component :is="currentRole" />
	</div>
</template>

<script>
import adminDashboard from './admin/index.vue'

export default {
	name: 'Dashboard',
	components: { adminDashboard },
	data() {
		return {
			currentRole: 'adminDashboard',
		}
	},

	created() {},
}
</script>
<style lang="scss" scoped>
.dashboard-container {
	overflow: scroll;
}
</style>
