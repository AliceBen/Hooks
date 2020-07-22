// react Hooks 写法
import React, { useState, useEffect, createContext, useContext, useReducer } from 'react'

const CountContext = createContext()

function Example() {
    // useState hooks函数，声明状态变量
    // react Hooks 不能出现在条件判断语句中，因为它必须有完全一样的渲染顺序
    // 解构赋值
    const [count, setCount] = useState(0) // (0)初始值
    const [age, setAge] = useState(18)
    const [sex, setSex] = useState('女')

    // 每次状态更新时执行   userEffect(副作用)
    // react首次渲染和之后的每次渲染都会调用一遍 userEffect 函数，而之前我们要用两个生命周期函数分别表示首次渲染(componentDidMount)和更新导致的重新渲染(componentDidUpdate)
    // useEffect中定义的函数的执行不会阻碍浏览器更新视图，也就是说这些函数都是异步执行的，而componentDidMount 和 componentDidUpdate 中的代码都是同步执行的

    // useEffect第二个参数是一个数组，数组中可以写入很多状态对应的变量，意思是当状态值发生变化时，我们才能进行解绑，但是，当传空数组时，就是当组件被销毁时才进行解绑


    useEffect(() => {
        console.log(`useEffect => You clicked ${count} times`)
        return () => {
            console.log('===========')
        }
    }, [count])  // 每次 count 发生变化都进行解绑,实现componentWillUnmount的效果


    // 父子组件传值 useContext // 对它所包含的组件树提供全局共享数据的技术
    // 跨越组件层级直接传递变量，实现共享
    // useContext 和 redux 的区别
    // 解决组件之间传递的问题 / 统一管理状态
    // useContext 配合 useReducer 可以实现类似 Redux 的作用

    // 1. 引入createContext，赋值 createContext 为一个常量 const CountContext = createContext()
    // 2. 创建 CountContext.provider标签，设置value元素赋值，标签内引入需要获取数据的组件，继而上下文可用
    // 3. 引入 useContext
    // 4. 创建需要使用变量的组件，useContext(countContext) 取值

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => { setCount(count + 1) }}>click me</button>
            {/* 把count变量允许跨层级实现传递和使用 */}
            <CountContext.Provider value={count}>
                <Counter />
            </CountContext.Provider>
        </div>
    )
}

// useContext 接收上下文变量
function Counter() {
    const count = useContext(CountContext)
    return (<h2>{count}</h2>)
}

// 原始写法
// import React, { Component } from 'react'

// class Example extends Component {
//     constructor(props) {
//         super(props)
//         this.state = { count: 0 }
//     }

// componentDidMount(){
//     console.log(`ComponentDidMount=>You clicked ${this.state.count} times`)
// }
// componentDidUpdate(){
//     console.log(`componentDidUpdate=>You clicked ${this.state.count} times`)
// }

//     render() {
//         return (
//             <div>
//                 <p>You clicked {this.state.count} times</p>
//                 {/* bind改变this指向 */}
//                 <button onClick={this.addCount.bind(this)}>Chlick me</button>
//             </div>
//         )
//     }
//     addCount() {
//         this.setState({
//             count: this.state.count + 1
//         })
//     }
// }

// export default Example




// useReducer
function ReducerDemo() {
    const [count, dispatch] = useReducer((state, action) => {
        switch (action) {
            case 'add':
                return state + 1
            case 'sub':
                return state - 1
            default:
                return state
        }
    },0)
    return (
        <div>
            <h2>现在的分数是{count}</h2>
            <button onClick={() => dispatch('add')}>Increment</button>
            <button onClick={() => dispatch('sub')}>Decrement</button>
        </div>
    )
}

export default ReducerDemo