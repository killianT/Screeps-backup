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
        //logic for creeps returning to spawn
        if(creep.memory.working == true) {
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            var roadToRepair = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function(object){
                    return object.structureType === STRUCTURE_ROAD && (object.hits > object.hitsMax / 3);
                }
            });
            if (constructionSite != undefined) {
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(ConstructionSite)
                }
            }
            else if (roadToRepair) {
                creep.moveTo(roadToRepair);
                creep.repair(roadToRepair);
            }
            else {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
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
