const {createPresetComponent, createPresetPage} = require("./helper");
const {connectAncestorDescendant, connectParentChildren} = require("./connect");
const {MiniComponent, MiniPage} = require("./defaults");

module.exports = {
    createPresetPage,
    createPresetComponent,
    MiniPage,
    MiniComponent,
    connectParentChildren,
    connectAncestorDescendant,
}