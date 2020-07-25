<template>
    <div>
        <input 
            type="text" 
            name="" 
            id="" 
            class="input"
            placeholder="Enter your Location..."
            v-model="location"
            v-on:input="$emit('input', $event.target.value)"
        >
        <button v-on:click="emit()"><img src="../assets/submit.png" width="35" alt=""></button>
    </div>
    
</template>

<script>
export default {

    data () {
        return {
            location: null
        }
    },

    methods: {
        emit () {
            if(this.location !== '' && this.location !== null){

                this.$emit('processWeather');

            } else {
                alert('Enter location');
            }
        }
    },
}
</script>

<style scoped>

div{
    width: 100%;
    border: 0px solid #000;
    text-align: center;
    margin: 10px 0px;
}

input{
    margin: 10px 0px;
    width: 70%;
    height: 9px;
    padding: 15px;
    border-radius: 0px 9px 0px 9px;
    outline: none;
    background: none;
    border: none;
    appearance: none;
    font-size: 13px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
   
    box-shadow: 0px 0px 8px rgb(0, 0, 0 ,0.25);
    background-color: rgba(255, 255, 255, 0.7);
    transition: 0.4s

}

img{
    width: 30px;
}
button{
    padding: 8px 10px;
    margin: 0 5px;
    background: none;
    border: none;
    outline: none;
}

button:hover{

    background: rgba(245, 244, 244, 0.452);
    border-radius: 35px;
}


img:hover, img:focus{
    width: 35px;

}



input:focus{
 box-shadow: 0px 0px 16px rgb(0, 0, 0 ,0.25);
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 6px 0px 6px 0px;
}

</style>