不用再烦恼今天吃什么哪个食堂啦！

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
                items: ['紫荆园', '桃李园', '丁香园', '听涛园', '清芬园', '澜园'],
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
                let randomIndex = Math.floor(Math.random() * this.items.length) * 3 + 1
                const interval = Math.min(2000 / this.items.length, 200)
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

