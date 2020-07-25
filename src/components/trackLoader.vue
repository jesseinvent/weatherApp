<template>
    <div class="loader">

        <div>
            <div class="track">
                <img src="../assets/track.png" alt="">
            </div>
            <div class="lds-ripple">
                <div></div>
                <div></div>
            </div>
            <p>Tracking your Location...</p>
        </div>

    </div>
</template>

<script>
export default {
   
    data () {
        return {
            // message : msg
        }
    }
}
</script>

<style scoped>

    img{
        width: 47px;
        height: 70px;
        margin: 0px;
    }
    .track{
        text-align: center;
        bottom: 60px;
    }
    .loader{
        border: 0px solid #000;
        text-align: center;
        margin: 0px;
        padding-top: 20px;
        background-image: url('../assets/map2.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: fixed;
       
    }
 

    p{
        font-size: 20px;
        color: #000;
        font-weight: bold;
    }

/**************TRACKING ANIMATION**********/

        .lds-ripple {
            display: inline-block;
            position: relative;
            top: -40px;
            left: 4px;
            width: 90px;
            height: 90px;
        }
        .lds-ripple div {
            position: absolute;
            border: 2px solid #000000;
            opacity: 1;
            border-radius: 50%;
            animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }
        .lds-ripple div:nth-child(2) {
            animation-delay: -0.3s;
        }
        @keyframes lds-ripple {
        0% {
            top: 36px;
            left: 36px;
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            top: 0px;
            left: 0px;
            width: 72px;
            height: 72px;
            opacity: 0.4;
        }
    }

</style>