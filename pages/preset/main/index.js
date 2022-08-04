import {MiniPage} from "../../../lib/index";

MiniPage({
    data: {
        miniIgnore: 'this is view data',
        _miniIgnore: 'this is pure data'
    },
    onLoad(query) {
        console.log(this.data.miniIgnore);
        console.log(this.data._miniIgnore);
    }
});
