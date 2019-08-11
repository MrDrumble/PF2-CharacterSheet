Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
})

var app = new Vue({
    el:'#app',
    data: {
        pc:{ 
            name: 'Name', 
            ancestry: 'Ancestry',
            background: 'Background',
            class: 'Class', 
            heritage: 'Heritage', 
            size: 'Medium',
            alignment: '',
            deity: 'Deity',
            languages: 'Common',
            xp: 0,
            level: 1, 
            hp: 18, hpMax: 18,
            dying: 0, dyingMax: 4,

            str: 10, 
            dex: 10, 
            con: 10, 
            int: 10, 
            wis: 10, 
            cha: 10, 
            
            perception: 9,
            ac: 15, 
            fort: 12, 
            reflex: 10, 
            will: 8, 
            spd: 25,
            cdc: 17,
            hero: 1
        },
        tab: 1,
        modalAbility: false,
        modalHealth: false,
        modalName: false,
        num:''
        
    },
    computed: {
        str: function(){ return Math.floor((this.pc.str-10)*0.5); },
        dex: function(){ return Math.floor((this.pc.dex-10)*0.5); },
        con: function(){ return Math.floor((this.pc.con-10)*0.5); },
        int: function(){ return Math.floor((this.pc.int-10)*0.5); },
        wis: function(){ return Math.floor((this.pc.wis-10)*0.5); },
        cha: function(){ return Math.floor((this.pc.cha-10)*0.5); }
    },
    methods: {
        updateHealth: function(isDmg){
            if(isDmg){
                this.pc.hp = Math.max(this.pc.hp-this.num,0);
            }else{
                this.pc.hp = Math.min(this.pc.hp+this.num,this.pc.hpMax);
            }
            this.modalHealth=false;
            this.num='';
        }
    },
    mounted() {
        if(typeof localStorage.my_data !== 'undefined') this.pc = JSON.parse(localStorage.getItem('my_data'));;
    },
    watch: {
        pc: { handler: function(val, oldVal) { localStorage.setItem('my_data', JSON.stringify(val)); }, deep: true }
    }
});
