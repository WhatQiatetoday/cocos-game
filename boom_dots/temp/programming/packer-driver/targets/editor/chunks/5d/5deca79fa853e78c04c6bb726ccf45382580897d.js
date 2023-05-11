System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, Input, input, _dec, _class, _crd, ccclass, property, gameOver;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      director = _cc.director;
      Input = _cc.Input;
      input = _cc.input;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "616cdXJg2NPYZB4E9KYK9rp", "gameOver", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'Input', 'input', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("gameOver", gameOver = (_dec = ccclass('gameOver'), _dec(_class = class gameOver extends Component {
        start() {
          input.on(Input.EventType.TOUCH_START, this.back, this);
        }

        update(deltaTime) {}

        back() {
          director.loadScene('game');
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5deca79fa853e78c04c6bb726ccf45382580897d.js.map