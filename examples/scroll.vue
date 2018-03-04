<template>
    <div class="wrap">
        <div class="list-container" id="scroll">
            <ul class="list-content">
                <li v-for="(item, index) in list" v-bind:key="index">
                    {{item}}
                </li>
            </ul>
        </div>
        <div class="loading" v-if="loading && text">
            {{text}}
        </div>
    </div>
</template>

<script>
    import BeautifyScrollbar from '../src/index';
    export default {
        data () {
            return {
                list: [],
                bs: null,
                total: 15,
                page: 1,
                loading: false,
                text: 'Loading more data....'
            }
        },

        watch: {
            list (val) {
                if (this.bs) {
                    this.$nextTick(() => {
                        this.bs.update();
                    })
                }
            }
        },

        methods: {
            getListData () {
                const arr = [];
                for(let i = 0; i < this.total; i++) {
                    arr.push(i);
                }

                this.list = [].concat(arr);
                this.page++;
            },

            appendData() {
                const arr = this.list;

                for(let i = (this.page - 1) * this.total, l = this.page * this.total; i < l; i++) {
                    arr.push(i);
                }

                this.list = [].concat(arr);
                this.page++;
            }
        },

        mounted () {
            const dom = this.$el.querySelector('#scroll');
            this.bs = new BeautifyScrollbar(dom, {
                threshold: 20
            });
            dom.addEventListener('bs-reach-threshold', () => {
                if (this.loading) {
                    return;
                }
                this.loading = true;
                setTimeout(() => {
                    if (this.page === 5) {
                        this.text = '';
                        this.list.push('No more data');
                        return;
                    }
                    this.appendData();
                    this.loading = false;
                    this.$nextTick(() => {
                        this.bs.update();
                    });
                }, 2000);
            }, false);

            setTimeout(() => {
                this.getListData();
            }, 10);
        }
    }
</script>

<style lang="less">
    .wrap {
         border: 1px solid #ccc;
         width: 600px;
         height: auto;
         box-sizing: border-box;
         .loading {
            height: 50px;
            line-height: 50px;
            border-top: 1px solid #ccc;
        }
    }
    .list-container {
        height: 500px;
        .list-content {
            list-style: none;
            margin: 0;
            padding: 0;
            li {
                height: 50px;
                line-height: 50px;
                text-align: center;
                border-bottom: 1px solid #ccc;
                box-sizing: border-box;
                &:last-child {
                    border: none;
                }
            }
        }
    }
</style>
