module.exports = {
    run: function(creep) {
        if(creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true
        }
        //logic for creeps finding controller
        if(creep.memory.working == true) {
           if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
            }
        }
        //logic for creeps getting energy from the spawn
        else {
            //var spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
            //if (Game.spawns.Spawn1.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
            //creep.moveTo(spawn);
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
            }
        }
    }
};
