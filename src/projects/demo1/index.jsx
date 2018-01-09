// import './css/css.css'
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import {List} from'./store/top'

@observer
class TodoListView extends Component { //一般组件
    componentDidMount(){
        store.fetchActivities()
    }
    render() {
        console.log(this.props)
        return <div>
           <ul>
                {this.props.todoList.todos.map((todo,i) =>
                    <TodoView todo={store.state.unfinishedTodoCount} key={+new Date + i} />
                )}
            </ul>
            Tasks left: {this.props.todoList.unfinishedTodoCount}
        </div>
    }
}

const TodoView = observer(({todo}) => //无状态组件
    <li>
        <input
            type="checkbox"
            defaultChecked={todo}
        />{todo}
    </li>
)

const store = new List();
ReactDOM.render(<TodoListView todoList={store.state} up={store.total}/>, document.getElementById('app'));