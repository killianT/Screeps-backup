module.exports = {
    run: function(creep) {
        //if creeps energy is 0 set creeps to find sources
        if(creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        //if creeps carry capacity is at max send creeps back to spawn
        else if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true
        }
        //logic for creeps storing resources
        if(creep.memory.working == true) {
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: function(object){
                    return (object.energy < object.energyCapacity);
                }
            });
            if(structure != undefined) {
                if(creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
        }
        //logic for creeps finding resources
        else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
            }
        }
    }
};
