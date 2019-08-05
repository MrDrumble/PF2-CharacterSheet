var app = new Vue({
    el:'#app',
    data: {
        pc:{ 
            name: 'Lyndis', 
            ancestry: 'Human',
            background: 'Nomad',
            class: 'Fighter', 
            level: 1, 
            hp: 18, hpMax: 18,
            dying: 0, dyingMax: 3,

            str: 16, 
            dex: 12, 
            con: 12, 
            int: 8, 
            wis: 12, 
            cha: 12, 
            
            perception: 9,
            ac: 15, 
            fort: 12, 
            reflex: 10, 
            will: 8, 
            spd: 25,
            cdc: 17
        },
        tab: 1
    },
    computed: {
    },
    methods: {
        generateRoom: function(){
            this.room.shape = ['Square','Rectangle','Square','Rectangle','Cross','T-Shape','U-Shape'].sample();
            this.room.width = Math.ceil(Math.random()*12)+3;
            this.room.length = Math.ceil(Math.random()*12)+3;
            this.room.addition = ['None','None','None','None','None','None','Rectangle','Square','Square','Rectangle','Cross','L-Shape','T-Shape','U-Shape'].sample();
            this.room.filler = ['None','None','None','None','None','Square','Rectangle','Cross','L-Shape','T-Shape','U-Shape'].sample();
            this.room.feature = ['None','None','None','None','None','None','None','Pillars','Boxes/Barrels','Pit','Statues','Foliage','Water','Rubble','None','Chasm','Spikes'].sample();
        }
    }
});