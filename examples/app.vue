<template>
    <div class='beautify-scrollbar-example'>
        <a href="https://github.com/dwqs/beautify-scrollbar" aria-label="View source on Github" class="github-corner"><svg width="80" height="80" viewBox="0 0 250 250" aria-hidden="true" style="fill: rgb(171, 211, 180); color: rgb(255, 255, 255); position: absolute; top: 0px; border: 0px; right: 0px;"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" class="octo-arm" style="transform-origin: 130px 106px 0px;"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a>
        <header>
            <h2>Beautify Scrollbar: Beautify browser's scrollbars</h2>
        </header>
        <div class="start">
            <h3>Quick Start/快速开始</h3> 
            <div class="install">
                <h4>Install/安装</h4> 
                <pre>npm i --save beautify-scrollbar</pre> 
                <p>Or</p> 
                <pre>yarn add beautify-scrollbar</pre>
            </div> 
            <div class="register">
                <h4>Basic Usage/基本使用</h4> 
                <pre>import 'beautify-scrollbar/dist/index.css';<br><br>import BeautifyScrollbar from 'beautify-scrollbar';<br><br>const bs = new BeautifyScrollbar('#container')</pre>
            </div>  
            <br>
        </div>
        <div class="demo-wrap">
            <h3 :style="{width: '600px'}">Basic</h3>
            <container></container>
            <h3 :style="{width: '600px'}">Infinite Scrolling</h3>
            <infinite-scrolling></infinite-scrolling>
            <p :style="{textAlign: 'left'}">See it in examples/scroll.vue</p>
        </div>
    </div>
</template>

<script>
    import Container from './container.vue';
    import InfiniteScrolling from './scroll';

    export default {
        components: {
            Container,
            InfiniteScrolling
        }
    }
</script>

<style lang="less">
    body {
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
    }

    .beautify-scrollbar-example {
        margin: 0 auto;
        padding-top: 40px;
        padding-bottom: 40px;
        width: 960px;
        background-color: #fff;
        text-align: center;
    }
    .demo-wrap {
        margin: 0 auto;
        width: 750px;
    }
    h2 {
        font-size: 27px;
        font-weight: 400;
    }
    a {
        position: fixed;
        right: 0;
        top: 0;
    }
    .start {
        margin-top: 40px;
        text-align: left;
        margin-left: 20px;
        margin-right: 20px;
        h3 {
            text-align: center;
            font-size: 25px;
            color: #6289ad;
        }
        h4 {
            font-size: 18px;
            color: #6289ad;
        }
        .install {
            margin-top: 20px;
            p {
                margin-top: 20px;
                margin-bottom: 20px;
            }
        }
        .register {
            margin-top: 20px;
        }
        pre {
            margin-top: 15px;
            background: #f8f8f8;
            padding: 15px 10px;
            color: #000;
            font-size: 16px;
            font-weight: 400;
        }
    }
</style>