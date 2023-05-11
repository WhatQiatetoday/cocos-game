System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Input, input, Node, tween, UITransform, v3, view, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, NewComponent;

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
      Input = _cc.Input;
      input = _cc.input;
      Node = _cc.Node;
      tween = _cc.tween;
      UITransform = _cc.UITransform;
      v3 = _cc.v3;
      view = _cc.view;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6d49eUK3qJFkoa9kta+GLIW", "game", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Input', 'input', 'Node', 'tween', 'UITransform', 'v3', 'view']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("NewComponent", NewComponent = (_dec = ccclass('NewComponent'), _dec2 = property({
        type: Node
      }), _dec(_class = (_class2 = class NewComponent extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "playerNode", _descriptor, this);

          this.height = 0;
          this.fireStatus = false;
        }

        start() {
          this.placePlayer();
          this.fireStatus = false; // 绑定点击事件

          input.on(Input.EventType.TOUCH_START, this.fire, this);
        } // 销毁绑定事件


        onDestroy() {
          input.off(Input.EventType.TOUCH_START, this.fire, this);
        }

        update(deltaTime) {}

        placePlayer() {
          // 获取屏幕可见区域的宽高
          this.height = view.getVisibleSize().height;
          console.log(this.height, "高度");
          this.playerNode.setPosition(v3(0, -this.height / 4)); // 如果10s之后玩家还没有操作，那么英雄掉落，游戏结束

          tween(this.playerNode).to(10, {
            position: v3(0, -this.height / 2 + this.playerNode.getComponent(UITransform).contentSize.y)
          }).call(() => {
            console.log('游戏结束！！！');
          }).start();
        } // 发射


        fire() {
          if (this.fireStatus) return;
          this.fireStatus = true;
          let tweenDuration = 0.6;
          tween(this.playerNode).to(tweenDuration, {
            position: v3(0, this.height / 2)
          }).start();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "playerNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c7a9c0bff6023b54d055dca0d64d162bc6e86a9d.js.map