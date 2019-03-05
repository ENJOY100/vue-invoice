<template>
    <div id="app">

        <div class="c">
            <Invoice />
        </div>

    </div>
</template>

<script>
    import Invoice from './components/Invoice';

    export default {
        name: 'app',
        components: {
            Invoice
        }
    }
</script>

<style>
    @import "~aline.css/dist/aline.min.css";
    @import "~font-awesome/css/font-awesome.min.css";
    @import "assets/css/vars.css";
    @import "assets/css/btn.css";
    body {
        min-width: 320px;
        font-family: sans-serif;
        font-size: 14px;
    }
    .error {
        color: var(--color-red);
    }
</style>
