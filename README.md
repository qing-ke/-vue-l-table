# vue-l-table

整合iview table和page组件

使用方法:


```
// 需先引入
iviewimport "iview/dist/styles/iview.css"
import iView from 'iview';
Vue.use(iView);

import LTable from '@hellosnowyy/vue-l-table';
Vue.use(LTable);
```

### options ###

| 参数名称 | 说明 | 类型 |
| --- | --- | --- |
| table | 表格参数 | object |
| page | 分页参数 | object |


table额外参数

| 参数名称 | 说明 | 类型 |
| --- | --- | --- |
| index | 开启序号 | boolean |
| indexLabel | 序号抬头,默认为序号 | string |


###example###

```
<LTable :table="table" :page="page"></LTable>


// 参数同iview,采用小驼峰命名key值
// 支持Table  slot-scope

let table = {
	data: [],
    columns: [
		{
            title: '名称',
            slot: 'name'
        },
        {
            title: '描述',
            key: 'des'
        }
    ],
	showHeader: true
}

let page = {
    total: 100,
    current: 1,
    pageSize: 10,
    showTotal: true
}

```

### solt ###

| 名称 | 说明 |
| --- | --- | 
| header | Table header|
| footer | Table footer |
| loading | Table loading |
| total | Page 默认solt,用于自定义total|

### methods ###
用法与Table相同
