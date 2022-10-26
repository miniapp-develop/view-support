const be = require('../../DemoBehavior');
Page({
    data: {
        __name__: 'relation',
        viewModel: {
            name: {
                name: '姓名',
                value: 'xpy',
                placeholder: '请输入姓名'
            },
            rule: {
                name: '录入规则',
                value: '按照菜单的5折录入，然后不足5元的，按照5元录入',
                placeholder: '请输入录入规则'
            }
        }
    },
    behaviors: [be]
});
