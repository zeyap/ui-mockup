let constants = require('../core/constants');
constants = constants.default;
var yaml = require('js-yaml');

module.exports.addStandardControlFamilies = function(standards){
    return standards.reduce((p, _, i) => {
        return new Promise((resolve,reject) =>{
            fetch(constants.standards_url[_.id]).then(r=>{
                if(r.url.indexOf('undefined')===-1){
                    return r.json();
                }else{
                    return null;
                }
            })
            .then(data=>{
                _=Object.assign(_,{
                    controlFamilies: 0, totalControls: 0, inheritedCompliance: 0, proceduralControls: 0, technicalControls: 0,
                    satisfied: 0, partially:0, noncompliant:0
                });
                if(data !== null) {
                    let prevControl = undefined;
                    for(let control in data){
                        if(control==='name'||control==='description'||control==='id')continue;
                        if(data[control].family!==prevControl){
                            _.controlFamilies++;
                            prevControl = data[control].family;
                        }
                        _.totalControls++;
                    }

                }
                resolve(standards);
            }).catch(e=>{
                console.log(e)
                reject('There are issues when fetching standards');
            })
        }
    );
    }, Promise.resolve())
    // .then(standards=>{
    //     standards.forEach((s)=>{
    //         console.log(s);
    //     })
        
    // })
}

module.exports.getUserComplianceData = function(standards){
    return new Promise((resolve,reject)=>{
        fetch(constants.get_users_url).then(r=>r.json())
        .then(users=>fetch('userdata/'+users[constants.current_user_id].compliance_url))
        .then(r=>r.json())
        .then(data=>{
            for(let i=0;i<standards.length;i++){
                let id = standards[i].id;
                standards[i] = Object.assign(standards[i],{
                    satisfied:data[id]===undefined? 'N/A':data[id].satisfied,
                    partially:data[id]===undefined? 'N/A':data[id].partially,
                    noncompliant:data[id]===undefined? 'N/A':(standards[i].totalControls - data[id].satisfied+data[id].partially)
                })
            }
            resolve(standards);
        })
    })
    
}

