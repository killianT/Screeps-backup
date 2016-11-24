var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
require("lodash")

module.exports.loop = function () {
    //deletes dead creeps memory
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }
    //For loop gets all creeps
    for (let name in Game.creeps) {
        var creep = Game.creeps[name];
        //logic for roles
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }  
    
    //spawn logic
    var maxHarvesters = 15
    var maxUpgraders = 15
    var maxBuilders = 15
    var numberOfHarvesters = _(Game.creeps).filter( { memory: { role: 'harvester' } } ).size();
    var numberOfUpgraders = _(Game.creeps).filter( { memory: { role: 'upgrader' } } ).size();
    var numberOfBuilders = _(Game.creeps).filter( { memory: { role: 'builder' } } ).size();
    var name = undefined;

    if (maxHarvesters > numberOfHarvesters) {
        name = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, { role: 'harvester', working: false});
    }
    else if(maxUpgraders > numberOfUpgraders) {
        name = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, { role: 'upgrader', working: false});
    }
    else if(maxBuilders > numberOfBuilders) {
        name = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, { role: 'builder', working: false});
    }
    if (!(name < 0)) {
        console.log("Spawned new creep: " + name);
    }

};
