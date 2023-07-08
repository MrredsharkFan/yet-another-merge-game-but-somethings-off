class Molecule {
    constructor(name, image, moleculesNeeded, mergesNeeded, getBoostPerLevel) {
        this.name = name;
        this.image = image;
        this.merges = 0;
        this.baseMergesNeeded = mergesNeeded;
        this.getBoostPerLevel = getBoostPerLevel;
        this.moleculesNeeded = moleculesNeeded;
        this.level = 0;
    }

    isUnlocked() {
        return game.molecules.amount.gte(this.moleculesNeeded);
    }

    addMerges(merges) {
        this.merges += merges;
        let lvlups = Math.floor(this.merges / this.getMergesNeeded());
        this.level += lvlups;
        this.merges -= this.getMergesNeeded() * lvlups;
    }

    //includes any upgrade effects
    getMergesNeeded() {
        let b = Math.round(this.baseMergesNeeded * game.molecules.getMergeReduction());
        if (b < 1){
            return 1
        }
        else return b
    }

    getPower() {
        return Math.min(10, 1 + Math.sqrt(this.level));
    }

    getValue() {
        return this.getBoostPerLevel(this.level).pow(game.molecules.getMoleculePower());
    }
}