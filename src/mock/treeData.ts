export default [{
    key: '1',
    title: 'Parent 1',
    check: false,
    indeterminate: false,
    children: [{
        key: '1-1',
        title: 'child 1',
        check: false,
        indeterminate: false,
    }, {
        key: '1-2',
        title: 'child 2',
        check: false,
        children: [{
            key: '1-2-1',
            title: 'grandchild 1',
            check: false,
            indeterminate: false,
        }, {
            key: '1-2-2',
            title: 'grandchild 2',
            check: false,
            indeterminate: false,
        },]
    },]
}, {
    key: '2',
    title: 'Parent 2',
    check: false,
    indeterminate: false,
    children: [{
        key: '2-1',
        title: 'child 1',
        check: false,
        indeterminate: false,
        children: [{
            key: '2-1-1',
            title: 'grandchild 1',
            check: false,
            indeterminate: false,
        }, {
            key: '2-1-2',
            title: 'grandchild 2',
            check: false,
            indeterminate: false,
        },]
    }, {
        key: '2-2',
        title: 'child 2',
        check: false,
        indeterminate: false,
    },]
}]
