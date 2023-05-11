import { _decorator, Component, director, Input, input, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('gameOver')
export class gameOver extends Component {
    start() {
        input.on(Input.EventType.TOUCH_START, this.back, this);
    }

    update(deltaTime: number) {
        
    }

    back(){
        director.loadScene('game')
    }
}

