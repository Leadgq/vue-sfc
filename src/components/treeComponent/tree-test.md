# tree 测试

tree-children 为 element-ui自带
<span style='color:yellowgreen'>tree-father</span> <span style='color:yellowgreen'>tree-option</span>为自己实现
<div style="color: red"> 目前自带反选、正选、提供显示checkBox </div>

### treeLib提供函数

<ul>
    <li style="color: violet">flattenArray、压平树</li>
    <li style="color: aliceblue">toFlatArray、压平树、添加父亲节点</li>
    <li style="color: red">findTreeChildrenNode、寻找子节点</li>
    <li style="color: aliceblue">findTreeParentNode、寻找父节点</li>
    <li style="color: red">findParentNodeKey、寻找所有key</li>
    <li style="color: violet ;">findMaxTreeNode、返回路径和深度</li>
</ul>

<h3>思考：</h3>
<div>如何不通过修改数据也能改变状态</div>
<div>如何不通过<i style="color: red">eventBus</i>通知数据改变</div>
<div>通过实例?</div>

<h3>收获：</h3>
<div><i style="color: red">while</i>也可以进行递归</div>
<div>vue3中的响应式数据非常容易被我们<i style="color: red">"弄坏"</i>、使用的时候一定要注意</div>
<div>watchEffect可以收集的依赖、是当前作用的所有范围<span style="color:yellow;">函数、ref、计算属性等注意非惰性的特性</span></div>

