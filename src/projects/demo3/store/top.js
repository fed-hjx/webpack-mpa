useStrict(true);
import {
	observable,
	action,
	useStrict,
	computed,
	runInAction
} from 'mobx';
import axios from '~/public/axios';
// require("babel-core/register");
require("babel-polyfill");
//
export class List {
	// state为实例变量，可参考ruby，java
	// 活动列表的数据存在data数组里，分页信息在meta里
	// observable是一个装饰器，可以参考python，java的语法。
	// 这个装饰器把state添加get和set访问器属性
	@observable state = {
		todos: [{
			id: 1
		}, {
			id: 2
		}, {
			id: 3
		}, {
			id: 4
		}, {
			id: 5
		}],
		unfinishedTodoCount: 66
	}
	@observable ss = 1;

	@action
	async fetchActivities() {
			// axios.get('/lotto/pc/gd11x5/info?t=1511250035271')
			// 	.then(rs => {
			// 		console.log(rs);
			// 	})
			// 	.catch(function(error) {
			// 		console.log(error);
			// 	});

		try {
			const {
				data
			} = await axios.get(`/lotto/pc/gd11x5/info?t=1511250035271`);
			console.log(data)
			runInAction(() => {
				console.log(data,4444);
				// this.allCollections = data.data;
				// this.collections = this.allCollections.slice(0, this.limit);
				// this.page = 0;
				// this.loading = this.reachEnd = false;
				this.state.unfinishedTodoCount = 13;
			});
		} finally {
			// status.setLoading(false);
		}
	}
	@computed get total() {
		// console.log(66)
		return this.state.unfinishedTodoCount*13;
	}
}