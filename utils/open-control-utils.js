let constants = require('../core/constants');
constants = constants.default;
var yaml = require('js-yaml');

module.exports.addStandardControlFamilies = function(standards){
    return standards.reduce((p, _, i) => {
        return new Promise((resolve,reject) =>{
            if(constants.standards[_.id]!==undefined){
                fetch(constants.standards[_.id]).then(r=>r.json())
                .then(data=>{
                    _=Object.assign(_,{
                        controlFamilies: 0, totalControls: 0, inheritedCompliance: 0, proceduralControls: 0, technicalControls: 0
                    });
                    let prevControl = undefined;
                    for(let control in data){
                        if(control==='name'||control==='description'||control=='id')continue;
                        if(control.slice(0,2)!==prevControl){
                            _.controlFamilies++;
                            prevControl = control.slice(0,2);
                        }
                        _.totalControls++;
                    }
                    resolve(standards);
                }).catch(e=>{
                    console.log(e)
                    // reject(standards);
                })
            }else{
                _=Object.assign(_,{
                    controlFamilies: 0, totalControls: 0, inheritedCompliance: 0, proceduralControls: 0, technicalControls: 0
                });
                resolve(standards);
            }
        }
    );
    }, Promise.resolve());
    // .then((result)=>{
    //     return result;
    // });
}

