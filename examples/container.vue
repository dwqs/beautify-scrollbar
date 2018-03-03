<template>
    <div class="container" id="container">
        <div class="content">
            <img src="http://img02.tooopen.com/images/20160427/tooopen_sy_160785253195.jpg" alt="">
        </div>
    </div>
</template>

<script>
    import BeautifyScrollbar from '../src/index';
    export default {
        mounted () {
            const bs = new BeautifyScrollbar('#container');
        }
    }
</script>

<style lang="less">
    .container {
        width: 600px;
        height: 500px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        .content {
            // background-image: url(http://img02.tooopen.com/images/20160427/tooopen_sy_160785253195.jpg);
            // background-repeat: no-repeat;
            width: 1024px;
            height: 694px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
