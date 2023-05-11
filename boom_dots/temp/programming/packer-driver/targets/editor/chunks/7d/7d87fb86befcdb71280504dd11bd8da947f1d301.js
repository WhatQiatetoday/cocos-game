System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Contact2DType, director, Input, input, Label, Node, ParticleSystem2D, PhysicsSystem2D, RigidBody2D, Sprite, tween, UITransform, v3, Vec2, view, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, NewComponent;

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
      Contact2DType = _cc.Contact2DType;
      director = _cc.director;
      Input = _cc.Input;
      input = _cc.input;
      Label = _cc.Label;
      Node = _cc.Node;
      ParticleSystem2D = _cc.ParticleSystem2D;
      PhysicsSystem2D = _cc.PhysicsSystem2D;
      RigidBody2D = _cc.RigidBody2D;
      Sprite = _cc.Sprite;
      tween = _cc.tween;
      UITransform = _cc.UITransform;
      v3 = _cc.v3;
      Vec2 = _cc.Vec2;
      view = _cc.view;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6d49eUK3qJFkoa9kta+GLIW", "game", undefined);

      __checkObsolete__(['_decorator', 'Canvas', 'Color', 'Component', 'Contact2DType', 'director', 'find', 'Input', 'input', 'Label', 'Node', 'ParticleSystem', 'ParticleSystem2D', 'PhysicsSystem2D', 'RigidBody2D', 'Sprite', 'sys', 'Tween', 'tween', 'TweenAction', 'TweenSystem', 'UITransform', 'v2', 'v3', 'Vec2', 'Vec3', 'view']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("NewComponent", NewComponent = (_dec = ccclass('NewComponent'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Node
      }), _dec4 = property({
        type: Node
      }), _dec5 = property({
        type: Label
      }), _dec(_class = (_class2 = class NewComponent extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "playerNode", _descriptor, this);

          _initializerDefineProperty(this, "boomNode", _descriptor2, this);

          _initializerDefineProperty(this, "enemyNode", _descriptor3, this);

          _initializerDefineProperty(this, "labelNode", _descriptor4, this);

          this.height = 0;
          this.fireStatus = false;
          this.fallSlowly = null;
          this.fireTo = null;
          this.score = 0;
        }

        // onLoad(){
        //     this.enemyNode = find('Canvas/enemy')
        // }
        start() {
          this.placePlayer();
          this.placeEnemy();
          this.fireStatus = false; // 绑定点击事件

          input.on(Input.EventType.TOUCH_START, this.fire, this); // 注册全局碰撞回调函数

          if (PhysicsSystem2D.instance) {
            PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
          }
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
        }

        placeEnemy() {
          this.enemyNode.active = true;
          let x = view.getVisibleSize().width / 2 - this.enemyNode.getComponent(UITransform).contentSize.x / 2;
          let y = Math.random() * view.getVisibleSize().height / 4;
          let duration = 0.6 + Math.random() * 0.5;
          this.enemyNode.setPosition(0, view.getVisibleSize().height / 3);
          let t1 = tween(this.enemyNode).to(duration, {
            position: v3(-x, y)
          });
          let t2 = tween(this.enemyNode).to(duration, {
            position: v3(x, y)
          }); // 整合t1，t2两个缓动

          tween(this.enemyNode).sequence(t1, t2).repeatForever().start();
        } // 发射


        fire() {
          console.log('点击了屏幕');
          if (this.fireStatus) return;
          this.fireStatus = true; // 停止掉落动画

          this.fallSlowly.stop();
          let tweenDuration = 0.6;
          this.fireTo = tween(this.playerNode).to(tweenDuration, {
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

          this.scheduleOnce(() => {
            director.loadScene('gameOver');
          }, 1);
        } // 撞击爆炸操作


        boom(pos, color) {
          console.log(this.boomNode + "boomnode");
          this.boomNode.setPosition(pos);
          let particle = this.boomNode.getComponent(ParticleSystem2D);

          if (color !== undefined) {
            particle.startColor = color;
          }

          particle.resetSystem();
          console.log('爆炸了');
        } // 碰撞后触发函数


        onBeginContact() {
          console.log('开始碰撞');
          this.fireTo.stop();
          this.boom(this.enemyNode.position, this.enemyNode.getComponent(Sprite).color);
          this.enemyNode.active = false;
          let result = ++this.score;
          this.labelNode.string = result.toString(); // this.placeEnemy()

          this.scheduleOnce(() => {
            let rigidBody = this.playerNode.getComponent(RigidBody2D); // 设置刚体的线速度和角速度为0，使其进入睡眠状态

            rigidBody.linearVelocity = Vec2.ZERO;
            rigidBody.angularVelocity = 0;
            this.placePlayer();
            this.placeEnemy();
            this.fireStatus = false;
          }, 1);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "playerNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "boomNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "enemyNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "labelNode", [_dec5], {
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
//# sourceMappingURL=7d87fb86befcdb71280504dd11bd8da947f1d301.js.map