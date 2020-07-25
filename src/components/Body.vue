<template>
    <div>
        <img v-bind:src="require(`../assets/location.png`)" alt="">
    </div>
</template>

<script>
export default {
    
    data () {
        return {
            
        }
    }
    
}
</script>

<style scoped>

div{
    width: 100%;
    border: 1px solid #000;
    text-align: center;
    margin: 10px 0px;
    border: 0px solid #000;

}

img {
    width: 90%;
    margin: 10px 0px;
}

</style>