let constants = require('../core/constants');
constants = constants.default;
var yaml = require('js-yaml');

/**
* A helper function to loop through an array and output Promise object
* @author zeyap
*/
Array.prototype.forEachConsecutively = function(fn){
    return this.reduce((p, _, i) => {
        return new Promise((resolve,reject) =>{
            fn(p,_,i,resolve, reject);
        }
    );
    }, Promise.resolve())
}

/**
* Request controls of all standards and add to 'standards' array
* @author zeyap
*/
module.exports.addStandardControlFamilies = function(standards){
    return standards.forEachConsecutively(function(p,_,i,resolve,reject){
        fetch(constants.standards_url[_.key]).then(r=>{
                if(r.url.indexOf('undefined')===-1){
                    return r.json();
                }else{
                    return null;
                }
            })
            .then(data=>{
                _=Object.assign(_,{
                    controlFamilies: 0, totalControls: 0, inheritedCompliance: 0, proceduralControls: 0, technicalControls: 0
                });
                if(data !== null) {
                    let prevControl = undefined;
                    for(let control in data){
                        if(control==='name'||control==='description'||control==='key')continue;
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
    })
    // .then(standards=>{
    //     standards.forEach((s)=>{
    //         console.log(s);
    //     })
        
    // })
}


/**
* For standards.json and components files having keys that are slightly different but referring to the same standard
* TODO: complete this function
*/

var caseHyphenInsensitive = function(key){
    if(key == 'NIST-800-53'){
        return 'NIST 800-53';
    }
    // if(key == )
    return key;
}

/**
* Request compliance data from components and add to 'standards' array
* @author zeyap
*/
module.exports.getComplianceData = function(standards){
    return new Promise((_resolve,_reject)=>{
        var standardMap={} //standard_key to index in array 'standards'
        for(let i=0;i<standards.length;i++){
            if(standardMap[standards[i].key]!==undefined)continue;
            standardMap[standards[i].key] = i;
        }
        fetch(constants.get_components_url).then(r=>r.json())
        .then(components=>components.forEachConsecutively(function(p,_,i,resolve,reject){
            fetch(_.url).then(r=>{
                if(r.url.indexOf('undefined') >=0) return null;
                else{
                    return r.json()
                }
            })
            .then((doc)=>{
                // console.log(doc)
                if(doc === null) return null;
                doc.satisfies.forEach((item)=>{
                    let targetStandard = standards[standardMap[caseHyphenInsensitive(item.standard_key)]];
                    if(targetStandard.satisfied===undefined){
                        targetStandard = Object.assign(targetStandard,{
                            satisfied: 0,
                            partial: 0,
                            noncompliant: targetStandard.totalControls
                        })
                    }
                    switch(item.implementation_status){
                        case 'complete':
                        targetStandard.satisfied++;
                        targetStandard.noncompliant--;
                        break;
                        case 'partial':
                        targetStandard.partial++;
                        targetStandard.noncompliant--;
                        break;
                        default: //'unknown', 'planned', 'not applicable'
                        break;
                    }
                })
                resolve(standards);
            })
            _resolve(standards);
        })
        ).catch(e=>{
            console.log(e)
            _reject('There are issues when fetching components');
        })
    })
}
