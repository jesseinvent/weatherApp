<template>
    <div class="loader">
        
        <div>
            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            <p>Getting weather Information</p>
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

.loader{
    text-align: center;
}
 .loader#weather{
        border: 0px solid #000;
        text-align: center;
        margin: 0px;
        padding-top: 20px;
    }

    p{
        font-size: 20px;
        color: #000;
        font-weight: bold;
    }

/**************WEATHER ANIMATION**********/


    .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    }
    .lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #000;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }
    .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
    }
    @keyframes lds-ellipsis1 {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
    }
    @keyframes lds-ellipsis3 {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
    }
    }
    @keyframes lds-ellipsis2 {
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(24px, 0);
    }
    }

</style>