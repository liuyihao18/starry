这是一个可以自定义选项的抽签小工具，请随意使用！

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
             <button class="draw-delete-button" :data-index="index" @click="deleteItem"><img src='../../assets/images/delete.svg' alt='delete'></button>
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
                items: [],
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
            deleteItem(e) {
                this.items.splice(e.target.dataset.index, 1)
            },
            draw() {
                if (this.items.length < 1) {
                    alert('请添加抽签选项！')
                    return
                }
                this.isDrawing = true
                let randomIndex = Math.floor(Math.random() * this.items.length) * 3 + 1
                const fn = () => {
                    if (randomIndex > 0) {
                        this.drawnIndex = (this.drawnIndex + 1) % this.items.length
                        randomIndex--
                        setTimeout(fn, 200)
                    } else {
                        setTimeout(() => {
                            alert('抽中了：' + this.items[this.drawnIndex])
                            this.isDrawing = false
                        }, 200)
                    }
                }
                fn()
            }
        }
    }).mount('#app')
</script>
