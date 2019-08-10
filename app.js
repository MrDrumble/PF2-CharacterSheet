Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
})

var app = new Vue({
    el:'#app',
    data: {
        pc:{ 
            name: '', 
            ancestry: '',
            background: '',
            class: '', 
            heritage: '', 
            size: '',
            alignment: '',
            deity: '',
            languages: 'Common',
            xp: 100,
            level: 1, 
            hp: 18, hpMax: 18,
            dying: 0, dyingMax: 4,

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
            cdc: 17,
            hero: 1
        },
        tab: 1,
        modalHealth: false,
        modalName: false,
        num:''
        
    },
    computed: {
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
