这是一个可以自定义选项的抽签小工具，请随意使用！

<style>
.draw-input-group {
    display: flex;
    max-width: 24em;
}

.draw-input-item {
    width: 60%;
    padding: 0 5px;
    border: 1px var(--md-typeset-color) solid;
    border-radius: 4px;
    margin-right: 10px;
    font-size: 16px;
}

.draw-button {
    min-width: 64px;
    padding: 4px 15px;
    color: var(--md-primary-fg-color--light);
    background: var(--md-primary-bg-color);
    border: 1px var(--md-primary-fg-color) solid;
    border-radius: 4px;
    cursor: pointer;
    transition: color 0.25s, background-color 0.25s, border-color 0.25s;
}

.draw-button:hover {
    color: var(--md-primary-bg-color);
    background: var(--md-primary-fg-color--light);
    border: 1px var(--md-primary-fg-color) solid;
}

.draw-button:not(:last-child) {
    margin-right: 10px;
}

.draw-delete-button svg {
    position: relative;
    top: 2.5px;
    margin-left: 20px;
    width: 16px;
    height: 16px;
}

.draw-delete-button svg path {
    stroke: var(--md-typeset-color);
}

.draw-items {
    padding: 1px;
}

.draw-drawn {
    background-color: var(--md-primary-fg-color--light);
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
             <button class="draw-delete-button" @click="deleteItem(index)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32zm448-64v-64H416v64zM224 896h576V256H224zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32m192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32"></path></svg>
             </button>
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
