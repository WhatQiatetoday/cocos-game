System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, find, Input, input, Node, ParticleSystem2D, Sprite, tween, UITransform, v3, view, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, NewComponent;

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
      director = _cc.director;
      find = _cc.find;
      Input = _cc.Input;
      input = _cc.input;
      Node = _cc.Node;
      ParticleSystem2D = _cc.ParticleSystem2D;
      Sprite = _cc.Sprite;
      tween = _cc.tween;
      UITransform = _cc.UITransform;
      v3 = _cc.v3;
      view = _cc.view;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6d49eUK3qJFkoa9kta+GLIW", "game", undefined);

      __checkObsolete__(['_decorator', 'Color', 'Component', 'director', 'find', 'Input', 'input', 'Node', 'ParticleSystem', 'ParticleSystem2D', 'Sprite', 'Tween', 'tween', 'TweenAction', 'TweenSystem', 'UITransform', 'v3', 'Vec3', 'view']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("NewComponent", NewComponent = (_dec = ccclass('NewComponent'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Node
      }), _dec(_class = (_class2 = class NewComponent extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "playerNode", _descriptor, this);

          _initializerDefineProperty(this, "boomNode", _descriptor2, this);

          this.height = 0;
          this.fireStatus = false;
          this.fallSlowly = null;
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

          this.fallSlowly = tween(this.playerNode).to(10, {
            position: v3(0, -this.height / 2 + this.playerNode.getComponent(UITransform).contentSize.y)
          }).call(() => {
            this.die();
          }).start();
        } // 发射


        fire() {
          if (this.fireStatus) return;
          this.fireStatus = true; // 停止掉落动画

          this.fallSlowly.stop();
          var tweenDuration = 0.6;
          tween(this.playerNode).to(tweenDuration, {
            position: v3(0, this.height / 2)
          }, {
            onComplete: () => {
              this.die();
            }
          }).start();
        }

        die() {
          console.log('游戏结束!!!');
          this.playerNode.active = false;
          this.boom(this.playerNode.position, this.playerNode.getComponent(Sprite).color); // 延时1s后执行,且只执行一次
          // 重新加载游戏场景，游戏重新开始
          // this.scheduleOnce(()=> {
          // 这里的 this 指向 component

          director.loadScene('game', () => {
            // 重新绑定需要保留的节点
            var newNode1 = find("Canvas/bg/boom");
            console.log(newNode1);
            console.log("新绑定的节点"); // 进行节点绑定的判断和处理

            if (newNode1 && this.boomNode) {
              this.boomNode.parent = newNode1.parent;
              this.boomNode.position = newNode1.position;
            }
          }); // }, 1)
        } // 爆炸操作


        boom(pos, color) {
          console.log(this.boomNode + "boomnode");
          this.boomNode.setPosition(pos);
          var particle = this.boomNode.getComponent(ParticleSystem2D);

          if (color !== undefined) {
            particle.startColor = color;
          }

          this.boomNode.active = true;
          console.log('爆炸了');
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "playerNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "boomNode", [_dec3], {
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
//# sourceMappingURL=e0b7a59831cc439009a3461dcdbfc7bfc2f7ee54.js.map