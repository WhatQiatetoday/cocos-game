System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, tween, v3, view, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, NewComponent;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      tween = _cc.tween;
      v3 = _cc.v3;
      view = _cc.view;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6d49eUK3qJFkoa9kta+GLIW", "game", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'tween', 'v3', 'view']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("NewComponent", NewComponent = (_dec = ccclass('NewComponent'), _dec2 = property({
        type: Node
      }), _dec(_class = (_class2 = class NewComponent extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "playerNode", _descriptor, this);

          this.height = 0;
        }

        start() {
          this.placePlayer();
          this.fire();
        }

        update(deltaTime) {}

        placePlayer() {
          // 获取屏幕可见区域的宽高
          this.height = view.getVisibleSize().height;
          console.log(this.height, "高度");
          this.playerNode.setPosition(v3(0, -this.height / 4));
        } // 发射


        fire() {
          var tweenDuration = 0.6;
          tween(this.playerNode).to(tweenDuration, {
            position: v3(0, this.height / 2)
          }).start();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "playerNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4b6b142842db28fe05148b5c449e9d88f6890cb8.js.map