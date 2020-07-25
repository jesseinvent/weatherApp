<template>
    <div>
            <div class="track">
                <img src="../assets/track.png" alt="">
            </div>
        <p class="state">{{location.state}}</p>
        <p class="full">{{location.full}} </p>
        <p class="date">{{date()}}</p>
    </div>
</template>

<script>
export default {
    
    props: {
        location: Object
    },

    data () {
        return {

        }
    },

    methods : {

        date () {

           const date = new Date();
           return date.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            })
        }
    }
}
</script>

<style scoped>

div{
    width: 100%;
    padding: 15px;
    top: 10px;
}

.state {
    color: #fff;
    font-size: 30px;
    font-weight: 800;
    text-align: center;
    text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}

.full{
    color: #fff;
    font-size: 20px;
    font-weight: 900;
    text-align: center;
   text-shadow: 1px 2px rgba(0, 0, 0, 0.25);
}

.date{
    color: #fff;
    font-size: 17px;
    font-weight: bold;
    text-align: center;
    font-style: italic;
   text-shadow: 1px 2px rgba(0, 0, 0, 0.25);
}

.track{
    margin: 0;
    padding: 0;
    width: 100%;
    text-align: center;
}

img {
    width: 30px;
    height: 45px;
}
</style>