const {PresetParentChild} = require("../../../lib/relations");
const {parent, children: [child]} = PresetParentChild({name: 'parent-2'}, [{name: 'child-2-1'}]);

export {parent, child};
