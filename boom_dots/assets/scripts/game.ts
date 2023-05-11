import { _decorator, Canvas, Collider2D, Color, Component, Contact2DType, director, find, Input, input, Label, Node, ParticleSystem, ParticleSystem2D, PhysicsSystem2D, RigidBody2D, Sprite, sys, Tween, tween, TweenAction, TweenSystem, UITransform, v2, v3, Vec2, Vec3, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class NewComponent extends Component {
    // 绑定玩家节点
    @property({type: Node})
    playerNode: Node = null
    @property({type: Node})
    boomNode: Node = null
    @property({type: Node})
    enemyNode: Node = null
    @property({type: Label})
    labelNode: Label = null
    height: number = 0
    fireStatus: boolean = false
    fallSlowly: Tween<Node> = null
    fireTo: Tween<Node> = null
    score: number = 0


    start() {
        this.placePlayer()
        this.placeEnemy()
        this.fireStatus = false
        // 绑定点击事件
        input.on(Input.EventType.TOUCH_START, this.fire, this);
        

    }
    // 销毁绑定事件
    onDestroy () {
        input.off(Input.EventType.TOUCH_START, this.fire, this);
    }
    update(deltaTime: number) {
        // 注册全局碰撞回调函数
        if (PhysicsSystem2D.instance) {
            PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    placePlayer(){
        // 获取屏幕可见区域的高
        this.height = view.getVisibleSize().height
        console.log(this.height,"高度")
        this.playerNode.setPosition(v3(0,-this.height/4))

        // 如果10s之后玩家还没有操作，那么英雄掉落，游戏结束
        this.fallSlowly = tween(this.playerNode).to(10,{
            position:v3(0,-this.height/2+this.playerNode.getComponent(UITransform).contentSize.y)
        }).call(()=>{
            this.die()
        }).start()
    }

    placeEnemy(){
        this.enemyNode.active = true
        let x = view.getVisibleSize().width/2 - this.enemyNode.getComponent(UITransform).contentSize.x/2
        let y = Math.random() * view.getVisibleSize().height/4
        let duration = 0.6 + Math.random() * 0.5
        this.enemyNode.setPosition(0,view.getVisibleSize().height/2)
        let t1 = tween(this.enemyNode).to(duration,{
            position: v3(-x,y)
        })
        let t2 = tween(this.enemyNode).to(duration,{
            position: v3(x,y)
        })
        // 整合t1，t2两个缓动
        tween(this.enemyNode).sequence(t1,t2).repeatForever().start()
    }

    // 发射
    fire(){
        if(this.fireStatus) return
        this.fireStatus = true
        // 停止掉落动画
        this.fallSlowly.stop()
        let tweenDuration = 0.6
        this.fireTo = tween(this.playerNode).to(tweenDuration,{
            position:v3(0,this.height/2)
        },{
            onComplete:()=>{
                this.die()
            }
        }).start()
    }

    die(){
        console.log('游戏结束!!!')
        this.playerNode.active = false
        this.boom(this.playerNode.position,this.playerNode.getComponent(Sprite).color)
        // 延时1s后执行,且只执行一次
        // 重新加载游戏场景，游戏重新开始
        this.scheduleOnce(()=> {
            director.loadScene('gameOver')
        }, 1)
    }

    // 撞击爆炸操作
    boom(pos: Vec3,color: Color){
        console.log(this.boomNode + "boomnode")
        console.log(pos)
        this.boomNode.setPosition(pos)
        let particle = this.boomNode.getComponent(ParticleSystem2D)
        if(color !== undefined){
            particle.startColor = color
        }
        particle.resetSystem()
    }
    sleep(roleNode: Node){
        let rigidBody = roleNode.getComponent(RigidBody2D)
        // 设置刚体的线速度和角速度为0，使其进入睡眠状态
        rigidBody.linearVelocity = Vec2.ZERO;
        rigidBody.angularVelocity = 0;
    }
    // 碰撞后触发函数
    onBeginContact(){
        console.log('开始碰撞')
        this.fireTo.stop()
        this.boom(this.enemyNode.position,this.enemyNode.getComponent(Sprite).color)
        this.enemyNode.active = false
        let result = ++this.score
        this.labelNode.string = result.toString()

        this.scheduleOnce(()=>{
            this.sleep(this.playerNode)
            this.sleep(this.enemyNode)
            this.placePlayer()
            this.placeEnemy()
            this.fireStatus = false
        },1)
    }
}

