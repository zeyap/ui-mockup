let constants = require('../core/constants');
constants = constants.default;

/**
* A helper function to loop through an array and output Promise object
* @author zeyap
*/


Array.prototype.forEachConsecutively = function(fn){
    let that = this;
    let callback = function(arr,i,callback,memo){
        if(i<arr.length-1){
            return fn(arr, i+1,callback);
        }else{
            return memo;
        }
    }
    return fn(that,0,callback);
}

/**
* Request controls of all standards and add to 'standards' array
* @author zeyap
*/
module.exports.addStandardsControlFamilies = function(standards){
    return standards.forEachConsecutively(function(arr,i,callback){
        let _ = arr[i];
        return fetch(constants.standards_url[_.key]).then(r=>{
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
                // console.log(i, arr.length-1)
                return callback(arr, i,callback,standards);
                
            })
    })
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
module.exports.getStandardsComplianceData = function(standards){
    // console.log(standards)
    // return new Promise((_resolve,_reject)=>{
        var standardMap={} //standard_key to index in array 'standards'
        for(let i=0;i<standards.length;i++){
            if(standardMap[standards[i].key]!==undefined)continue;
            standardMap[standards[i].key] = i;
        }
        return fetch(constants.get_components_url).then(r=>r.json())
        .then(components=>{
            return components.forEachConsecutively(function(arr,i,callback){
                let _ = arr[i];
                return fetch(_.url).then(r=>{
                    if(r.url.indexOf('undefined') >=0) return null;
                    else{
                        return r.json()
                    }
                })
                .then((doc)=>{
                    if(doc !== null)
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
                    
                    return callback(arr, i,callback,standards);
                    
                })
                
            })
    })
        // .catch(e=>{
        //     console.log(e)
        //     _reject('There are issues when fetching components');
        // })
    // })
}

const [COMPLETE, PARTIAL, NONCOMPLIANT] = [1,2,3];
module.exports.getCertificationCompliance = function(certifications){
    let standardsCompliance={};
    // return new Promise((_resolve,_reject)=>{
        return fetch(constants.get_components_url).then(r=>r.json())
        .then(components=>{
            return components.forEachConsecutively(function(arr,i,callback){
                let _ = arr[i];
                return fetch(_.url).then(r=>{
                    if(r.url.indexOf('undefined') >=0) return null;
                    else{
                        return r.json()
                    }
                })
                .then((doc)=>{
                    if(doc !== null)
                    doc.satisfies.forEach((item)=>{
                        standardsCompliance[item["standard_key"]] = standardsCompliance[item["standard_key"]]||{};
                        let standard = standardsCompliance[item["standard_key"]];
                        let control = item["control_key"];
                        let status = item["implementation_status"];
                        switch(status){
                            case 'complete':
                            standard[control]=COMPLETE;
                            break;
                            case 'partial':
                            if(!standard[control]||standard[control]>PARTIAL){
                                standard[control]=PARTIAL;
                            }
                            break;
                            default:
                            if(!standard[control]){
                                standard[control]=NONCOMPLIANT;
                            }
                            break;
                        }
                    })
                    // console.log(1)
                    
                    return callback(arr, i,callback,standardsCompliance);
                    
                })
            })
        
        })
        .then(standardsCompliance=>{
            return certifications.forEachConsecutively(function(arr,i,callback){
                let _ = arr[i];
                if(_.satisfied===undefined){
                    _ = Object.assign(_,{
                        controlFamilies: 0, totalControls: 0, inheritedCompliance: 0, proceduralControls: 0, technicalControls: 0,

                        satisfied: 0,
                        partial: 0,
                        noncompliant: 0
                    })
                }
                return fetch(_.url).then(r=>{
                    if(r.url.indexOf('undefined') >=0) return null;
                    else{
                        return r.json()
                    }
                }).then((doc)=>{
                    if(doc !== null)
                    for(let standardKey in doc.standards){
                        
                        // console.log(standardsCompliance, standardKey)
                        if(standardsCompliance[standardKey]===undefined) break;
                        for(let controlKey in doc.standards[standardKey]){
                            _.totalControls++;
                            switch(standardsCompliance[standardKey][controlKey]){
                                case COMPLETE:
                                _.satisfied++;
                                break;
                                case PARTIAL:
                                _.partial++;
                                break;
                                default:
                                _.noncompliant++;
                                break;
                            }
                        }
                    }
                    return callback(arr, i+1,callback,certifications);
                })
        });
    })
    
}
