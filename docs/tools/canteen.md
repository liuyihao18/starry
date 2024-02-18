不用再烦恼今天吃什么哪个食堂啦！

<style>
.draw-input-group {
    display: flex;
    max-width: 24em;
}

.draw-input-item {
    width: 60%;
    padding: 0 5px;
    border: 1px #333 solid;
    border-radius: 4px;
    margin-right: 10px;
    font-size: 16px;
}

.draw-button {
    min-width: 64px;
    padding: 4px 15px;
    color: #409eff;
    background: #ecf5ff;
    border: 1px #a0cfff solid;
    border-radius: 4px;
    cursor: pointer;
    transition: color 0.25s, background-color 0.25s, border-color 0.25s;
}

.draw-button:hover {
    color: #ffffff;
    background: #409eff;
    border: 1px #409eff solid;
}

.draw-button:not(:last-child) {
    margin-right: 10px;
}

.draw-delete-button {
    position: relative;
    top: 2.5px;
    margin-left: 20px;
    width: 16px;
}

.draw-items {
    padding: 1px;
}

.draw-drawn {
    background-color: #a0cfff67;
    transition: background-color 0.05s;
}
</style>

<div id="app">
    <div class="draw-input-group">
        <input class="draw-input-item" v-model="inputValue" type="text"/>
        <button class="draw-button" @click="addItem">添加</button>
        <button class="draw-button" @click="draw">抽签</button>
    </div>
    <ul>
        <li v-for="(item, index) in items">
            <span :class="index === drawnIndex ? 'draw-items draw-drawn' : 'draw-items'">
                {{ item }}
            </span>
             <button class="draw-delete-button" @click="deleteItem(index)"><img src='../../assets/images/delete.svg' alt='delete'></button>
        </li>
        <li hidden>
            <span class="draw-items draw-drawn" hidden>

            </span>
        </li>
    </ul>
</div>

<script>
    const {createApp} = Vue

    createApp({
        data() {
            return {
                inputValue: '',
                items: ['紫荆园', '桃李园', '丁香园', '听涛园', '清芬园', '玉树园', '澜园'],
                drawnIndex: -1,
                isDrawing: false
            }
        },
        methods: {
            addItem() {
                if (!this.isDrawing && this.inputValue !== '') {
                    this.items.push(this.inputValue)
                }
            },
            deleteItem(index) {
                this.items.splice(index, 1)
            },
            draw() {
                if (this.items.length < 1) {
                    alert('请添加抽签选项！')
                    return
                }
                this.isDrawing = true
                let randomIndex = Math.floor(Math.random() * this.items.length) * 2 + this.items.length
                const interval = Math.min(1666 / this.items.length, 166)
                const fn = () => {
                    if (randomIndex > 0) {
                        this.drawnIndex = (this.drawnIndex + 1) % this.items.length
                        randomIndex--
                        setTimeout(fn, interval)
                    } else {
                        setTimeout(() => {
                            alert('抽中了：' + this.items[this.drawnIndex])
                            this.isDrawing = false
                        }, interval)
                    }
                }
                fn()
            }
        }
    }).mount('#app')
</script>

