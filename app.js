Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
})

Vue.component('teml-bar', {
    props: ['prof'],
    template: 
            `<div class="prof">
                <span v-bind:class="{ on: (prof >= 1) }">T</span>
                <span v-bind:class="{ on: (prof >= 1) }">E</span>
                <span v-bind:class="{ on: (prof >= 1) }">M</span>
                <span v-bind:class="{ on: (prof >= 1) }">L</span>
            </div>`
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
            alignment: 'True Neutral',
            deity: 'Deity',
            languages: 'Common',
            xp: 0,
            level: 1, 
            hp: 1,
            dying: 0, dyingMax: 4,

            str: 10, 
            dex: 10, 
            con: 10, 
            int: 10, 
            wis: 10, 
            cha: 10, 

            acrobatics: 0,
            arcana: 0,
            athletics: 0,
            crafting: 0,
            deception: 0,
            diplomacy: 0,
            intimidation: 0,
            lore1: 0, lore1Name: '',
            lore2: 0, lore2Name: '',
            medicine: 0,
            nature: 0,
            occultism: 0,
            performance: 0,
            religion: 0,
            society: 0,
            stealth: 0,
            survival: 0,
            thievery: 0,

            woreArmorType: 'none',
            armorDexCap: 99,
            armorItemBonus: 0,
            
            unarmored: 0,
            light: 0,
            medium: 0,
            heavy: 0,

            fort: 1, 
            reflex: 1, 
            will: 1, 

            resistances: '',

            focusPts: 1,
            heroPts: 1,

            perception: 0,
            vision: 'Normal',
            
            spdBurrow: 0,
            spdClimb: 0,
            spdFly: 0,
            spdSwim: 0,

            shield: { type:'', ac:0, hardness:0, hp:0, hpMax:0 },

            cdc: 17
        },
        tab: 2,
        modalAbility: false,
        modalArmor: false,
        modalHealth: false,
        modalHero: false,
        modalName: false,
        modalResist: false,
        modalSaves: false,
        modalSenses: false,
        modalShield: false,
        modalSkill: false,
        modalOther: false,
        num:''
        
    },
    computed: {
        str: function(){ return Math.floor((this.pc.str-10)*0.5); },
        dex: function(){ return Math.floor((this.pc.dex-10)*0.5); },
        con: function(){ return Math.floor((this.pc.con-10)*0.5); },
        int: function(){ return Math.floor((this.pc.int-10)*0.5); },
        wis: function(){ return Math.floor((this.pc.wis-10)*0.5); },
        cha: function(){ return Math.floor((this.pc.cha-10)*0.5); },

        hpMax: function(){ 
            var total = 0;
            
            switch (this.pc.class) {
                case 'Alchemist':   total = (8+this.con)*this.pc.level; break;
                case 'Barbarian':   total = (12+this.con)*this.pc.level; break;
                case 'Bard':        total = (8+this.con)*this.pc.level; break;
                case 'Champion':    total = (10+this.con)*this.pc.level; break;
                case 'Cleric':      total = (8+this.con)*this.pc.level; break;
                case 'Druid':       total = (8+this.con)*this.pc.level; break;
                case 'Fighter':     total = (10+this.con)*this.pc.level; break;
                case 'Monk':        total = (10+this.con)*this.pc.level; break;
                case 'Ranger':      total = (10+this.con)*this.pc.level; break;
                case 'Rogue':       total = (8+this.con)*this.pc.level; break;
                case 'Sorcerer':    total = (6+this.con)*this.pc.level; break;
                case 'Wizard':      total = (6+this.con)*this.pc.level; break;
            }

            return total;
        },
        size: function(){ 
            switch (this.pc.ancestry) {
                case 'Gnome': case 'Goblin': case 'Halfling':
                    return 'Small'; break;
                default: return 'Medium'; break;
            }
        },
        spd: function(){ 
            switch (this.pc.ancestry) {
                case 'Dwarf': return 20; break;
                case 'Elf': return 30; break;
                case 'Gnome': return 25; break;
                case 'Goblin': return 25; break;
                case 'Halfling': return 25; break;
                case 'Human': return 25; break;
            }
        },
        
        acrobatics: function(){ if(this.pc.acrobatics) return this.dex+this.pc.level+(this.pc.acrobatics*2); else return this.dex; },
        arcana: function(){ if(this.pc.arcana) return this.int+this.pc.level+(this.pc.arcana*2); else return this.int; },
        athletics: function(){ if(this.pc.athletics) return this.str+this.pc.level+(this.pc.athletics*2); else return this.str; },
        crafting: function(){ if(this.pc.crafting) return this.int+this.pc.level+(this.pc.crafting*2); else return this.int; },
        deception: function(){ if(this.pc.deception) return this.cha+this.pc.level+(this.pc.deception*2); else return this.cha; },
        diplomacy: function(){ if(this.pc.diplomacy) return this.cha+this.pc.level+(this.pc.diplomacy*2); else return this.cha; },
        intimidation: function(){ if(this.pc.intimidation) return this.cha+this.pc.level+(this.pc.intimidation*2); else return this.cha; },
        lore1: function(){ if(this.pc.lore1) return this.int+this.pc.level+(this.pc.lore1*2); else return this.int; },
        lore2: function(){ if(this.pc.lore2) return this.int+this.pc.level+(this.pc.lore2*2); else return this.int; },
        medicine: function(){ if(this.pc.medicine) return this.wis+this.pc.level+(this.pc.medicine*2); else return this.wis; },
        nature: function(){ if(this.pc.nature) return this.wis+this.pc.level+(this.pc.nature*2); else return this.wis; },
        occultism: function(){ if(this.pc.occultism) return this.int+this.pc.level+(this.pc.occultism*2); else return this.int; },
        performance: function(){ if(this.pc.performance) return this.cha+this.pc.level+(this.pc.performance*2); else return this.cha; },
        religion: function(){ if(this.pc.religion) return this.wis+this.pc.level+(this.pc.religion*2); else return this.wis; },
        society: function(){ if(this.pc.society) return this.int+this.pc.level+(this.pc.society*2); else return this.int; },
        stealth: function(){ if(this.pc.stealth) return this.dex+this.pc.level+(this.pc.stealth*2); else return this.dex; },
        survival: function(){ if(this.pc.survival) return this.wis+this.pc.level+(this.pc.survival*2); else return this.wis; },
        thievery: function(){ if(this.pc.thievery) return this.dex+this.pc.level+(this.pc.thievery*2); else return this.dex; },
        
        perception: function(){ if(this.pc.survival) return this.wis+this.pc.level+(this.pc.survival*2); else return this.wis; },

        ac: function(){ 
            var total = 10+Math.min(this.dex,this.pc.armorDexCap);
            
            switch (this.pc.woreArmorType) {
                case 'light': if(this.pc.light) total+=this.pc.level+(this.pc.light*2); break;
                case 'medium': if(this.pc.medium) total+=this.pc.level+(this.pc.medium*2); break;
                case 'heavy': if(this.pc.heavy) total+=this.pc.level+(this.pc.heavy*2); break;
                default: if(this.pc.unarmored) total+=this.pc.level+(this.pc.unarmored*2); break;
            }

            total+=this.pc.armorItemBonus; 
            //+ other bonuses
            return total;
        },

        fort: function(){ if(this.pc.fort) return this.con+this.pc.level+(this.pc.fort*2); else return this.con; },
        reflex: function(){ if(this.pc.reflex) return this.dex+this.pc.level+(this.pc.reflex*2); else return this.dex; },
        will: function(){ if(this.pc.will) return this.wis+this.pc.level+(this.pc.will*2); else return this.wis; }
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
        },
        useHero: function(n){
            this.pc.heroPts = Math.max(0,Math.min(this.pc.heroPts+n,3));
            this.modalHero=false;
        }
    },
    mounted() {
        if(typeof localStorage.my_data !== 'undefined') this.pc = JSON.parse(localStorage.getItem('my_data'));;
    },
    watch: {
        pc: { handler: function(val, oldVal) { localStorage.setItem('my_data', JSON.stringify(val)); }, deep: true }
    }
});
