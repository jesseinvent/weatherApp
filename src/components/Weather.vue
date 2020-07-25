<template>
    <div>
        <div class="locationBox" v-if="weather.location !== null">
            <div class="location">{{weather.location}}</div>
            <div class="date">{{date()}}</div>
        </div>
        <div class="temp">{{Math.round(weather.temp)}}°c</div>
        <div class="weather">{{weather.weather}}</div>
        <div class="description">Weather description: {{weather.description}}</div>
    </div>
</template>

<script>
export default {

    props : {
        weather: Object
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
    text-align: center;
}

.locationBox{
    margin: 10px;
}

.location {

    color: #fff;
    font-size: 30px;
    font-weight: 800;
    text-align: center;
    text-shadow: 1px 3px rgba(0, 0, 0, 0.25);

}

.date{
    color: #fff;
    font-size: 17px;
    font-weight: bold;
    text-align: center;
    font-style: italic;
   text-shadow: 1px 2px rgba(0, 0, 0, 0.25);
}

.temp{
    display: inline-block;
    padding: 10px 20px;
    color: #fff;
    font-size: 80px;
    font-weight: 900;
    text-shadow: 3px 6px rgba(0, 0, 0, 0.27);
    background-color: rgba(255, 255, 255, 0.25);
    box-shadow: 3px 3px rgba(0, 0, 0, 0.27);
    border-radius: 20px;
}

.weather{
    color: #fff;
    font-size: 45px;
    font-weight: 600;
    text-shadow: 2px 5px 2px rgba(0, 0, 0, 0.27);
    font-style: italic;
}

.description{
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
    font-style: italic;
}

</style>